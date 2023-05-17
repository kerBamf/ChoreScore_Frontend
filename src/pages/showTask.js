import { useEffect, useState } from 'react'
import { taskLoader, deleteTask } from '../apiCalls'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'

function ShowTask() {
    const [task, setTask] = useState({})

    const navigate = useNavigate()
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

    async function handleClick(e) {
        try {
        e.preventDefault();
        await deleteTask(task._id)
        navigate('/')
        } catch(err) {
            console.log(err)
        }
        
    }

    if(task != null) {
    return (
        <>
        <h2>{task.name}</h2>
        <h3>Value: {task.value}</h3>
        <p>{task.info}</p>
        <Link to={`/task/edit/${task._id}`}><button>Edit</button></Link>
        <button onClick={handleClick}>Delete</button>
        <Link to="/">
            <h3>Home</h3>
        </Link>
        </>
    ) } else {
        return(<h2>Loading...</h2>)
    }
}

export default ShowTask