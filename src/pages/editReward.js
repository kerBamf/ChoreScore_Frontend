import { useState, useEffect } from 'react'
import { rewardLoader, putReward } from '../apiCalls'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'

function EditReward() {
    const navigate = useNavigate()
    const [reward, setReward] = useState({})
    const { id } = useParams()

    const getReward = async () => {
        try {
            const rawReward = await rewardLoader(id)
            setReward(rawReward)
        } catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getReward()
    }, [])

    const handleChange = (e) => {
        setReward((baseState) => ({
            ...baseState,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit= async (e) => {
        try {
            e.preventDefault()
            console.log(reward)
            await putReward(reward)
            showSent()
            getReward()
            setTimeout(function() {
                navigate(`/rewards/${id}`)
            }, 4000)
        } catch(err) {
            console.log(err)
        }
    }

    const [sentState, setSentState] = useState(false)
    function showSent() {
        setSentState(true)
        setTimeout(function() {
            setSentState(false)
        }, 4000)
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
            <label>Name: <input type="text" name="name" placeholder={reward.name} onChange={handleChange}></input></label>
            <label>Cost: <input type="number" name="cost" placeholder={reward.cost} onChange={handleChange}></input></label>
            <label>Description: <input type="text" name="description" placeholder={reward.description} onChange={handleChange}></input></label>
            <button type='submit'>Send It</button>
        </form>
        {sentState ? <h2>Updated! Rerouting to rewards page...</h2> : null}
        <Link to="/rewards"><h4>Back to Rewards List</h4></Link>
        </>
    )
}

export default EditReward