import { useState } from 'react'
import { postTask } from '../apiCalls'
import { Link } from 'react-router-dom'

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
        {sentState ? <h4>Task Added</h4> : null}
        {/* <Link to="/"><h4>Home</h4></Link> */}
        <button onClick={handleClose}>Close</button>
        </>
    )
}

export default NewTask