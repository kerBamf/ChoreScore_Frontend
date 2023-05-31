import { useEffect, useState } from 'react'
import { taskLoader, deleteTask } from '../apiCalls'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

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
        <Container className="text-left">
                <Link to={`/task/edit/${task._id}`}><Button variant="primary" className="showButtons">Edit</Button></Link>
                <Button variant="danger" onClick={handleClick}className="showButtons">Delete</Button>
                <Link to="/">
                    <Button variant="secondary" className="showButtons">Cancel</Button>
                </Link>
        </Container>
        </>
    ) } else {
        return(<h2>Loading...</h2>)
    }
}

export default ShowTask