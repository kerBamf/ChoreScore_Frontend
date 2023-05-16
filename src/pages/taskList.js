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
                    <Link to={`/tasks/${value._id}`}>
                    <h3>{value.name}</h3>
                    </Link>
                    <h4>{value.value}</h4>
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
        props.mods.setScore(currentScore + task.value)
        await deleteTask(task._id)
        getTasks()
    }

    return(
        <div>
            <h3>{props.mods.score}</h3>
            {tasks.length ? getList() : <h2>No Tasks Listed</h2>}
        </div>
    )
}

export default TaskList