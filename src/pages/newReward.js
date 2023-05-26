import { postReward } from "../apiCalls";
import { useState } from "react"
import { Link } from 'react-router-dom'


const NewReward = (props) => {
    const setNewTab = props.mods.setNewTab
    const getRewards = props.mods.getRewards

    const [rewardForm, setRewardForm] = useState({
        name: "",
        cost: 0,
        description: ""
    })

    const handleChange = (e) => {
        setRewardForm((baseState) => ({
            ...baseState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            await postReward(rewardForm)
            e.target.reset();
            showSent()
            getRewards()
        } catch(err) {
            console.log(err)
        }
    }

    const [sentState, setSentState] = useState(false)
    function showSent() {
        setSentState(true)
        setTimeout(function() {
            setSentState(false)
        }, 5000)
    }

    function handleClose() {
        setNewTab()
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Name: <input type='text' name="name" onChange={handleChange}></input></label>
            <label>Cost: <input type='number' name="cost" onChange={handleChange}></input></label>
            <label>Description: <input type='text' name="description" onChange={handleChange}></input></label>
            <button type="submit">Send It</button>
        </form>
        {sentState ? <h2>Sent!</h2> : null}
        <button onClick={handleClose}>Close</button>
        </>
    )

}

export default NewReward