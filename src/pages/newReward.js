import { postReward } from "../apiCalls";
import { useState } from "react"
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


const NewReward = (props) => {
    const setNewTab = props.mods.setNewTab
    const getRewards = props.mods.getRewards

    const [rewardForm, setRewardForm] = useState({
        name: "",
        cost: 0,
        description: ""
    })

    const handleChange = (e) => {
        setRewardForm((baseState) => ({
            ...baseState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            await postReward(rewardForm)
            e.target.reset();
            showSent()
            getRewards()
        } catch(err) {
            console.log(err)
        }
    }

    const [sentState, setSentState] = useState(false)
    function showSent() {
        setSentState(true)
        setTimeout(function() {
            setSentState(false)
        }, 5000)
    }

    function handleClose() {
        setNewTab()
    }

    return (

        <div className="newItemForm">
        <Form onSubmit={handleSubmit}>
            <Form.Group className="sm-2" controlId="newRewardName">
                <Form.Label>Name: </Form.Label>
                <Form.Control type='text' name="name" onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="sm-2" controlId="newRewardCost">
                <Form.Label>Cost: </Form.Label>
                <Form.Control type='number' name="cost" onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="sm-2" controlId="newRewardDescription">
                <Form.Label>Description: </Form.Label>
                <Form.Control type='text' name="description" onChange={handleChange}></Form.Control>
            </Form.Group>
        {sentState ? <h5>Reward Added!</h5> : null}
        <Row className="inputButtonRow">
            <Col sm={2}>
                <Button variant="primary" type='submit'>Create</Button>
            </Col>
            <Col sm={2}>
                <Button variant="light" onClick={handleClose}>Close</Button>
            </Col>
        </Row>
        </Form>
        </div>
    )

}

export default NewReward