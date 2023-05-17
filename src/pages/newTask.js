import { useEffect, useState } from 'react'
import { postTask } from '../apiCalls'
import { Link, useNavigate } from 'react-router-dom'

const NewTask = () => {
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
            setSentState(true)
            console.log(sentState)
        } catch(err) {
            console.log(err)
        }
    }

    const [sentState, setSentState] = useState(false)
    function showSent() {
        setTimeout(function() {
            return (
                <p>Sent!</p>
            )
        }, 5000)
        setSentState(false)

    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Name: <input type='text' name="name" onChange={handleChange}></input></label>
            <label>Duration: <input type='text' name="duration" onChange={handleChange}></input></label>
            <label>Info: <input type='text' name="info" onChange={handleChange}></input></label>
            <label>Difficulty: 
                <select name="difficulty" onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </label>
            <button type='submit'>Send It</button>
        </form>
        {/* {sentState ? {showSent} : <></>} */}
        <Link to="/"><h4>Home</h4></Link>
        </>
    )
}

export default NewTask