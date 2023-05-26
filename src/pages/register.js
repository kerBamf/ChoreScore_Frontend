import { getUserToken } from "../utils/authToken";
import { registerUser } from "../components/authRoutes";
import { useNavigate } from "react-router";
import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const RegisterUser = (props) => {
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
        <>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email: </Form.Label>
                <Form.Control type="text" onChange={handleChange} placeholder="email@email.com" name="username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="text" onChange={handleChange} placeholder="Make it a good'un" name="password" />
            </Form.Group>
            <Button variant="primary" type="submit">Sign Up!</Button>
        </Form>
        {errorState ? <p>There was an error. Please try again</p> : null}
        </>
    )
}

export default RegisterUser