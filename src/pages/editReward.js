import { useState, useEffect } from 'react'
import { rewardLoader, putReward } from '../apiCalls'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function EditReward() {
    const navigate = useNavigate()
    const [reward, setReward] = useState({})
    const { id } = useParams()

    const getReward = async () => {
        try {
            const rawReward = await rewardLoader(id)
            setReward(rawReward)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getReward()
    }, [])

    const handleChange = (e) => {
        setReward((baseState) => ({
            ...baseState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit= async (e) => {
        try {
            e.preventDefault()
            console.log(reward)
            await putReward(reward)
            showSent()
            getReward()
            setTimeout(function() {
                navigate(`/rewards/${id}`)
            }, 1500)
        } catch(err) {
            console.log(err)
        }
    }

    const [sentState, setSentState] = useState(false)
    function showSent() {
        setSentState(true)
        setTimeout(function() {
            setSentState(false)
        }, 4000)
    }

    return (

        <div className="newItemForm">
        <h2>Task Edit</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="sm-2" controlId="newTaskName">
                <Form.Label>Name: </Form.Label>
                <Form.Control type='text' name="name" onChange={handleChange} placeholder={reward.name}></Form.Control>
            </Form.Group>
            <Form.Group className="sm-2" controlId="newTaskDuration">
                <Form.Label>Cost: </Form.Label>
                <Form.Control type='number' name="cost" onChange={handleChange} placeholder={reward.cost}></Form.Control>
            </Form.Group>
            <Form.Group className="sm-2" controlId="newTaskInfo">
                <Form.Label>Description: </Form.Label>
                <Form.Control type='text' name="description" onChange={handleChange} placeholder={reward.description}></Form.Control>
            </Form.Group>
        {sentState ? <h2>Updated! Rerouting to show page...</h2> : null}
        <Row className="inputButtonRow">
            <Col sm={2}>
                <Button variant="primary" type='submit'>Update</Button>
            </Col>
            <Col>
            <Link to={`/rewards/${id}`}><Button variant='secondary'>Cancel</Button></Link>
            </Col>
        </Row>
        </Form>
        </div>
    )
}

export default EditReward