import { postReward } from "../apiCalls";
import { useState } from "react"
import { Link } from 'react-router-dom'


const NewReward = () => {
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

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Name: <input type='text' name="name" onChange={handleChange}></input></label>
            <label>Cost: <input type='number' name="cost" onChange={handleChange}></input></label>
            <label>Description: <input type='text' name="description" onChange={handleChange}></input></label>
            <button type="submit">Send It</button>
        </form>
        {sentState ? <h2>Sent!</h2> : null}
        <Link to="/rewards"><h4>Home</h4></Link>
        </>
    )

}

export default NewReward