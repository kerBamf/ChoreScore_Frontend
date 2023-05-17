import { useEffect, useState } from 'react'
import { taskLoader, putTask, valueGenerator } from '../apiCalls'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'

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
        // setTask((baseState) => ({
        //     ...baseState,
        //     [e.target.name]: e.target.value
        // }))
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            console.log(task)
            await putTask(task);
            showSent()
            console.log(sentState)
            getTask()
            setTimeout(function() {
                navigate(`/task/${id}`)
            }, 5000)
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

    // function optionPreSelect(dif) {
    //     if (dif === 1) {
    //         return (
    //             <>
    //             <option value="1" selected>1</option>
    //             <option value="2">2</option>
    //             <option value="3">3</option>
    //             <option value="4">4</option>
    //             </>
    //         )
    //     } else if (dif === 2) {
    //         return (
    //             <>
    //             <option value="1">1</option>
    //             <option value="2" selected>2</option>
    //             <option value="3">3</option>
    //             <option value="4">4</option>
    //             </>
    //         )
    //     } else if (dif === 3) {
    //         return (
    //             <>
    //             <option value="1">1</option>
    //             <option value="2">2</option>
    //             <option value="3" selected>3</option>
    //             <option value="4">4</option>
    //             </>
    //         )
    //     } else if (dif === 4) {
    //         return (
    //             <>
    //             <option value="1">1</option>
    //             <option value="2">2</option>
    //             <option value="3">3</option>
    //             <option value="4" selected>4</option>
    //             </>
    //         )
    //     }
        
    // }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Name: <input type='text' name="name" placeholder={task.name} onChange={handleChange}></input></label>
            <label>Duration: <input type='number' name="duration" placeholder={task.duration} onChange={handleChange}></input></label>
            <label>Info: <input type='text' name="info" placeholder={task.info} onChange={handleChange}></input></label>
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
        {sentState ? <h2>Updated! Rerouting to show page...</h2> : null}
        <Link to="/"><h4>Home</h4></Link>
        </>
    )
}


export default EditTask