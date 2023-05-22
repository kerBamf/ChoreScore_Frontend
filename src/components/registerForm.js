import {useNavigate} from 'react-router-dom'
import {useState} from 'react'

const RegisterForm = ({signup}) => {
    const initialState = { username: "", password: ""}
    const [input, setInput] = useState(initialState)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefaut()
        const createdUserToken = await signup(input)

        //This needs to be verified
        if (createdUserToken) {
            navigate("/")

        } else {
            navigate("/auth/register")
        }
        setInput(initialState);
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Name: <input id="username" name="username" value={input.username} onChange={handleChange}></input></label>
            
            <br />
            <br />
            <label htmlFor="password">Password: </label>
            <input id="password" name="password" value={input.password} onChange={handleChange}></input>
            <br />
            <br />
            <input type="submit" value="Sign Up"></input>
            </form>
        </>
    )
}

export default RegisterForm