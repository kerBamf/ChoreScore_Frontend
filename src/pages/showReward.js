import { useEffect, useState } from 'react'
import { rewardLoader, deleteReward } from '../apiCalls'
import { useParams } from 'react-router'
import { Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

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
            <h4>Cost: {reward.cost}</h4>
            <p>{reward.description}</p>
            <Container className="text-left">
            <Link to={`/rewards/edit/${id}`}>
                <Button variant="primary" className="showButtons">Edit</Button>
            </Link>
            <Button variant="danger" className="showButtons" onClick={handleClick}>Delete</Button>
            <Link to="/rewards"><Button variant="secondary" className="showButtons">Cancel</Button></Link>
            </Container>
            </>
        )
    } else {return <h2>Loading...</h2>}
}

export default ShowReward