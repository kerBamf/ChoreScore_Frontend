import { useState } from 'react'
import { postTask } from '../apiCalls'
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const NewTask = (props) => {
    const setNewTab = props.mods.setNewTab
    const getTasks = props.mods.getTasks

    const [taskForm, setTaskForm] = useState({
        name: "",
        duration: 0,
        info: "",
        difficulty: 1
    })

    const handleChange = (e) => {
        setTaskForm((baseState) => ({
            ...baseState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            console.log(taskForm)
            await postTask(taskForm)
            e.target.reset();
            showSent()
            console.log(sentState)
            getTasks()
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
            <Form.Group className="sm-2" controlId="newTaskName">
                <Form.Label>Name: </Form.Label>
                <Form.Control type='text' name="name" onChange={handleChange}></Form.Control>
            </Form.Group>
            <Form.Group className="sm-2" controlId="newTaskDuration">
                <Form.Label>Duration: </Form.Label>
                <Form.Control type='number' name="duration" onChange={handleChange}></Form.Control>
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
        {sentState ? <h5>Task Added!</h5> : null}
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

export default NewTask