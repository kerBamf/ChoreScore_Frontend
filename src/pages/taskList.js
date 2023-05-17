import { tasksLoader, taskLoader, deleteTask } from "../apiCalls"
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'


const TaskList = (props) => {
    const [tasks, setTasks] = useState([])

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
                <div key={idx}>
                    <Link to={`/task/${value._id}`}>
                        <h3>{value.name}</h3>
                    </Link>
                    <h4>Value: {value.value}</h4>
                    <button onClick={handleClick} value={value._id}>Completed</button>
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
        await deleteTask(task._id)
        getTasks()
    }

    return(
        <div>
            <h3>Credits Available: {props.mods.score}</h3>
            <h3>Tasks Completed: {props.mods.tasksDone}</h3>
            <Link to="/task/new"><button>New Task</button></Link>
            {tasks.length ? getList() : <h2>No Tasks Listed</h2>}
        </div>
    )
}

export default TaskList