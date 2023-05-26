import { tasksLoader, taskLoader, userUpdate } from "../apiCalls"
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import { Route, Routes } from 'react-router-dom'
import NewTask from "./newTask"


const TaskList = (props) => {
    const [tasks, setTasks] = useState([])
    const [newTab, setNewTab] = useState(false)
    const currentUser = props.mods.currentUser
    const setCurrentUser = props.mods.setCurrentUser
    const setScore = props.mods.setScore
    const setTasksDone = props.mods.setTasksDone

    async function getTasks() {
        try{
        let myTasks = await tasksLoader();
        setTasks(myTasks);
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTasks()
    }, []);

    function getList() {

        const taskArr = tasks.map((value, idx) => {
            return(
                <div className="bg-light border" key={idx}>
                    <div>
                        <Link to={`/task/${value._id}`}>
                            <h3>{value.name}</h3>
                        </Link>
                        <h6>Value: {value.value}</h6>
                        <Button className="btn completeButton" variant="secondary" onClick={handleClick} value={value._id}>Completed</Button>
                    </div>
                </div>
            )
        })
        return taskArr
    }

    async function handleClick(e) {
        e.preventDefault();
        const task = await taskLoader(e.target.value)
        console.log(task)
        const newUser = await userUpdate(currentUser, task)
        console.log(newUser)
        setScore(newUser.credits)
        setTasksDone(newUser.tasksDone)
        setCurrentUser({
            ...currentUser,
            user : newUser
        })
        // let currentScore = props.mods.score
        // let currentTasksDone = props.mods.tasksDone
        // props.mods.setScore(currentScore + task.value)
        // props.mods.setTasksDone(currentTasksDone + 1)
    }
    
    //Updates Current User state and uses data to make API update call 
    

    function openNewTask() {
        if(newTab) {
            setNewTab(false)
        } else {
            setNewTab(true)
        }
    }
    
    if (props.mods.isAuthenticated == true) {
    return(
        <Container>
            <Row >
                <Col xs={{span: 2, offset: 8}}>
                    {/* <Link to="/task/new"><Button variant="primary">New Task</Button></Link> */}
                    <Button variant="primary" onClick={openNewTask}>New Task</Button>
                </Col>
                <Col xs={2}>
                    <Link to="/rewards"><Button variant="info">Rewards</Button></Link>
                </Col>
            </Row>
            <Stack gap={2}>
                {newTab ? <NewTask mods={{setNewTab, getTasks}} /> : null}
                {tasks.length ? getList() : <h2>No Tasks Listed</h2>}
            </Stack>
        </Container>
    )
    } else {
        return (
            <Container>
                <h2>Please Login to Use App</h2>
            </Container>
        )
    }
}

export default TaskList