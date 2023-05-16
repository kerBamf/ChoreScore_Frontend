const URL = "http://localhost:4000"

export const tasksLoader = async () => {
    const tasks = await fetch(URL + "/tasks")
    tasks = await tasks.json()
    return tasks
}

export const rewardsLoader = async () => {
    const rewards = await fetch(URL + "/rewards")
    rewards = await rewards.json()
    return rewards
}