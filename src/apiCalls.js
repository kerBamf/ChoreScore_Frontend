const URL = "http://localhost:4000"


//Task Calls
export const tasksLoader = async () => {
    try {
    let tasks = await fetch(URL + "/tasks")
    tasks = await tasks.json()
    return tasks } catch(err) {
        console.log(err)
    }
}

export const taskLoader = async (id) => {
    try {
        let task = await fetch(URL + `/tasks/${id}`)
        task = await task.json()
        return task
    } catch(err){
        console.log(err)
    }
}

export const postTask = async (object) => {
    try {
        
        let newObject = {
            name: object.name,
            duration: parseInt(object.duration),
            difficulty: parseInt(object.difficulty),
            info: object.info,
            value: 1
        }
        console.log(`Duration: ${newObject.duration}`)
        let durationMod = null
        durationMod = Math.floor(newObject.duration / 15)
        console.log(`Duration mod: ${durationMod}`)
        const dif = parseInt(object.difficulty)
        let difficultyMod = () => {
            if (dif == 1) {
                return 1
            } else if (dif == 2) {
                return 1.25
            } else if (dif == 3) {
                return 1.5
            } else {
                return 1.75
            }
        }
        console.log(`Combo ${Math.floor(durationMod * difficultyMod())}`)
        newObject.value = Math.floor(durationMod * difficultyMod())
        console.log(newObject)
        await fetch(URL + '/tasks', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        })
    } catch(err) {
        console.log(err)
    }
}

export const putTask = async (object) => {
    try{
        await fetch(URL + `/tasks/${object._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
    } catch(err) {
        console.log(err)
    }
}

export const deleteTask = async (id) => {
    try{
        await fetch(URL + `/tasks/${id}`, { 
            method: 'DELETE'
        })
    } catch(err) {
        console.log(err)
    }
}

//Reward Calls
export const rewardsLoader = async () => {
    try {let rewards = await fetch(URL + "/rewards")
    rewards = await rewards.json()
    return rewards } catch(err) {
        console.log(err)
    }
}

export const rewardLoader = async (id) => {
    try {
        let reward = await fetch(URL + `/rewards/${id}`)
        reward = await reward.json()
        return reward
    } catch(err) {
        console.log(err)
    }
}

export const postReward = async (object) => {
    try {
        await fetch(URL + '/rewards', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
    } catch(err) {
        console.log(err)
    }
}

export const putReward = async (object) => {
    try{
        await fetch(URL + `/rewards/${object._id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
    } catch(err) {
        console.log(err)
    }
}

export const deleteReward = async (id) => {
    try{
        await fetch(URL + `/rewards/${id}`, { 
            method: 'DELETE'
        })
    } catch(err) {
        console.log(err)
    }
}