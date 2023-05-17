import { useEffect, useState } from 'react'
import { rewardLoader, deleteReward } from '../apiCalls'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'

function ShowReward() {
    const [reward, setReward] = useState({})
    const navigate = useNavigate()
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

    async function handleClick(e) {
        try {
            await deleteReward(id)
            navigate('/rewards')
        } catch(err) {
            console.log(err)
        }
    }

    if(reward != null) {
        return (
            <>
            <h2>{reward.name}</h2>
            <h3>Cost: {reward.cost}</h3>
            <p>{reward.description}</p>
            <Link to={`/rewards/edit/${id}`}>
                <button>Edit</button>
            </Link>
            <button onClick={handleClick}>Delete</button>
            <Link to="/rewards"><h3>Rewards List</h3></Link>
            </>
        )
    } else {return <h2>Loading...</h2>}
}

export default ShowReward