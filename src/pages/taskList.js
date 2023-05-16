const taskList = (props) => {
    
    let tasks = props.tasks
    const setTasks = props.setAllTasks
    function getList() {
        tasks.map((value, idx) => {
            return(
                <div>
                    <h3>{value.name}</h3>
                    <h4>{value.value}</h4>
                    <button>Completed</button>
                    <button>Edit</button>
                    <button onClick={handleDelete(value._id)}>Delete</button>
                </div>
            )
        })
    }
    
    async function handleDelete(id) {
        try {
            e.preventDefault();
            await fetch(`http://localhost:4000/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })


        } catch(err) {
            console.log(err)
        }
    }

    
    return(
        <></>
    )
}