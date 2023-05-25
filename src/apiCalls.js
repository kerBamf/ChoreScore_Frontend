import { getUserToken } from "./utils/authToken"

const URL = "http://localhost:4000"


//Task Calls
export const tasksLoader = async () => {
    try {
        let tasks = await fetch(URL + "/tasks", {
            method: "GET",
            headers: {
                'Authorization': `bearer ${getUserToken()}`,
                'Content-Type': 'application/json'
            }
        })
        console.log(tasks)
        tasks = await tasks.json()
        console.log(tasks)
        return tasks
    } catch (err) {
        console.log(err)
        return []
    }
}

export const taskLoader = async (id) => {
    try {
        let task = await fetch(URL + `/tasks/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `bearer ${getUserToken()}`,
                'Content-Type': 'application/json'
            }
        })
        task = await task.json()
        return task
    } catch (err) {
        console.log(err)
        return {}
    }
}

export function valueGenerator(dif, dur) {
    const durationMod = Math.floor(dur / 15)
    let difficultyMod = () => {
        if (dif === 1) {
            return 1
        } else if (dif === 2) {
            return 1.25
        } else if (dif === 3) {
            return 1.5
        } else {
            return 1.75
        }
    }
    return Math.floor(durationMod * difficultyMod()) + 1
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
        newObject.value = valueGenerator(newObject.difficulty, newObject.duration)

        await fetch(URL + '/tasks', {
            method: 'POST',

            headers: {
                'Authorization': `bearer ${getUserToken()}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        })
    } catch (err) {
        console.log(err)
    }
}

export const putTask = async (object) => {
    try {
        console.log(object._id)
        let newObject = {
            _id: object._id,
            name: object.name,
            duration: parseInt(object.duration),
            difficulty: parseInt(object.difficulty),
            info: object.info,
            value: 1
        }
        newObject.value = valueGenerator(newObject.difficulty, newObject.duration)
        await fetch(URL + `/tasks/${object._id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `bearer ${getUserToken()}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        })
    } catch (err) {
        console.log(err)
    }
}

export const deleteTask = async (id) => {
    try {
        await fetch(URL + `/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `bearer ${getUserToken()}`,
            }
        })
    } catch (err) {
        console.log(err)
    }
}

//Reward Calls
export const rewardsLoader = async () => {
    try {
        let rewards = await fetch(URL + "/rewards", {
            method: "GET",
            headers: {
                'Authorization': `bearer ${getUserToken()}`,
                "Content-Type": "application/json"
            }
        })
        rewards = await rewards.json()
        return rewards
    } catch (err) {
        console.log(err)
        return []
    }
}

export const rewardLoader = async (id) => {
    try {
        let reward = await fetch(URL + `/rewards/${id}`, {
            method: "GET",
            headers: {
                'Authorization': `bearer ${getUserToken()}`,
                'Content-Type': 'application/json'
            }
        })
        reward = await reward.json()
        return reward
    } catch (err) {
        return {}
        console.log(err)
    }
}

export const postReward = async (object) => {
    try {
        await fetch(URL + '/rewards', {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${getUserToken()}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
    } catch (err) {
        console.log(err)
    }
}

export const putReward = async (object) => {
    try {
        await fetch(URL + `/rewards/${object._id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `bearer ${getUserToken()}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(object)
        })
    } catch (err) {
        console.log(err)
    }
}

export const deleteReward = async (id) => {
    try {
        await fetch(URL + `/rewards/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `bearer ${getUserToken()}`
            }
        })
    } catch (err) {
        console.log(err)
    }
}

//Quotes Call

export const quotesLoader = async () => {
    try {
        let quote = await fetch('http://localhost:4000/quotes')
        quote = quote.json()
        return quote
    } catch (err) {
        console.log(err)
    }
}

//User Score and Tasks Completed Updates

export const userUpdate = async (data) =>  {
    try{
        let userData = data.user
        let updateStatus = await fetch('http://localhost:4000/auth/update', {
            method: "PUT",
            body: JSON.stringify(userData),
            headers: {
                'Authorization': `bearer ${getUserToken()}`,
                "Content-Type": "application/json"
            }
            }
        )
        updateStatus = updateStatus.json()
        console.log(updateStatus)
    } catch(err) {
        console.log(err)
    }
}