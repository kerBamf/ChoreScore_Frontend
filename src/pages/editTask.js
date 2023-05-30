import { useEffect, useState } from 'react'
import { taskLoader, putTask } from '../apiCalls'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

function EditTask() {
    const navigate = useNavigate()
    const [task, setTask] = useState({})
    const { id } = useParams()
    const getTask = async () => {
        try {
        const rawTask = await taskLoader(id)
        setTask(rawTask)
        } catch(err) {
            console.log(err)
        }
    }
    
    useEffect(() => {
        getTask()
    }, [])

    const handleChange = (e) => {
        setTask((baseState) => ({
            ...baseState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            await putTask(task);
            showSent()
            getTask()
            setTimeout(function() {
                navigate(`/task/${id}`)
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
                <Form.Control type='text' name="name" onChange={handleChange} placeholder={task.name}></Form.Control>
            </Form.Group>
            <Form.Group className="sm-2" controlId="newTaskDuration">
                <Form.Label>Duration: </Form.Label>
                <Form.Control type='number' name="duration" onChange={handleChange} placeholder={task.duration}></Form.Control>
            </Form.Group>
            <Form.Group className="sm-2" controlId="newTaskDifficulty">
                <Form.Label>Difficulty: </Form.Label>
                    <Form.Select name="difficulty" onChange={handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </Form.Select>
            </Form.Group>
            <Form.Group className="sm-2" controlId="newTaskInfo">
                <Form.Label>Info: </Form.Label>
                <Form.Control type='text' name="info" onChange={handleChange}></Form.Control>
            </Form.Group>
        {sentState ? <h2>Updated! Rerouting to show page...</h2> : null}
        <Row className="inputButtonRow">
            <Col sm={2}>
                <Button variant="primary" type='submit'>Update</Button>
            </Col>
            <Col>
            <Link to={`/task/${id}`}><Button variant='secondary'>Cancel</Button></Link>
            </Col>
        </Row>
        </Form>
        </div>
    )
}


export default EditTask