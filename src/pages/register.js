import { getUserToken } from "../utils/authToken";
import { registerUser } from "../components/authRoutes";
import { useNavigate } from "react-router";
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import { Link } from 'react-router-dom'

const RegisterUser = (props) => {
    const setCurrentUser = props.mods.setCurrentUser
    const setIsAuthenticated = props.mods.setIsAuthenticated
    const setScore = props.mods.setScore
    const setTasksDone = props.mods.setTasksDone
    const setUsername = props.mods.setUsername
    const initialState = { username: "", password: ""}
    const navigate = useNavigate()
    const [input, setInput] = useState(initialState)
    const [errorState, setErrorState] = useState(false)
    
    function errorMessage() {
        setErrorState(true)
        setTimeout(() => {
            setErrorState(false)
        }, 3000)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = await registerUser(input)
        console.log(user)
        if (user.isLoggedIn) {
            setCurrentUser(user)
            setIsAuthenticated(user.isLoggedIn)
            setScore(user.user.credits)
            setTasksDone(user.user.tasksDone)
            setUsername(user.user.username)
            navigate("/")
        } else {
            errorMessage()
        }
        setInput(initialState)
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value})
    }

    return (
        <Container>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text" onChange={handleChange} placeholder="Be Clever" name="username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="text" onChange={handleChange} placeholder="Make it a good'un" name="password" />
            </Form.Group>
            <Row>
                <Col md={2}>
                    <Button variant="primary" type="submit">Sign Up!</Button>
                </Col>
                <Col md={2}>
                    <Link to="/auth/login"><Button variant="secondary">Cancel</Button></Link>
                </Col>
            </Row>
        </Form>
        {errorState ? <p>There was an error. Please try again</p> : null}
        </Container>
    )
}

export default RegisterUser