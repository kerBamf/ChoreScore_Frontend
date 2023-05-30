import { loginUser } from "../components/authRoutes";
import { useNavigate } from "react-router";
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'

const LoginUser = (props) => {
    const currentUser = props.mods.currentUser
    const setCurrentUser = props.mods.setCurrentUser
    const isAuthenticated = props.mods.isAuthenticated
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
        const user = await loginUser(input)
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
            <Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text" onChange={handleChange} placeholder="Is Yours Clever?" name="username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="text" onChange={handleChange} placeholder="" name="password" />
            </Form.Group>
            </Row>
            <Row>
                <Col sm={2} className="justify-content-center">
                    <Button variant="primary" type="submit">Login</Button>
                </Col>
                <Col sm={2} className="justify-content-center">
                    <Link to="/auth/register"><Button variant="secondary">Sign Up</Button></Link>
                </Col>
            </Row>    
        </Form>
        {(errorState == true) ? <p>There was an error. Please try again</p> : null}
        </Container>
    )
}

export default LoginUser