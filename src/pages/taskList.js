import { tasksLoader, taskLoader } from "../apiCalls"
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'


const TaskList = (props) => {
    const [tasks, setTasks] = useState([])

    async function getTasks() {
        try{
        let myTasks = await tasksLoader();
        console.log(myTasks)
        setTasks(myTasks);
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getTasks()
        console.log(props.mods.currentUser)
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
        let currentScore = props.mods.score
        let currentTasksDone = props.mods.tasksDone
        props.mods.setScore(currentScore + task.value)
        props.mods.setTasksDone(currentTasksDone + 1)
        // await deleteTask(task._id)
        // getTasks()
    }

    return(
        <Container className>
            <Row >
                <Col xs={{span: 2, offset: 8}}>
                    <Link to="/task/new"><Button variant="primary">New Task</Button></Link>
                </Col>
                <Col xs={2}>
                    <Link to="/rewards"><Button variant="info">Rewards</Button></Link>
                </Col>
            </Row>
            <Stack gap={2}>
                {tasks.length ? getList() : <h2>No Tasks Listed</h2>}
            </Stack>
            
        </Container>
    )
}

export default TaskList