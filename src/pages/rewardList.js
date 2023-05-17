import { rewardsLoader, rewardLoader } from "../apiCalls";
import { useState, useEffect} from "react"
import { Link } from 'react-router-dom'

const Rewards = (props) => {
    const [rewards, setRewards] = useState([])
    const score = props.mods.score
    console.log(score)

    async function getRewards() {
        try{
            let myRewards = await rewardsLoader()
            setRewards(myRewards)
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        getRewards()
    }, [])

    function getList() {
        const rewardArr = rewards.map((value, idx) => {
            if(value.cost <= props.mods.score){
            return(
                <div key={idx}>
                    <Link to={`/rewards/${value._id}`}>
                        <h3>{value.name}</h3>
                    </Link>
                    <h4>Cost: {value.cost}</h4>
                    <button onClick={handleClick} value={value.cost}>Purchase</button>
                </div>
            )} else {
                return (
                    <div key={idx}>
                        <Link to={`/rewards/${value._id}`}>
                            <h3>{value.name}</h3>
                        </Link>
                        <h4>Cost: {value.cost}</h4>
                        <p>You do not have enough credits for this reward</p>
                    </div>
                )
            }
        })
        return rewardArr
    }

    function handleClick(e) {
        props.mods.setScore(score - e.target.value)
    }

    return (
        <>
            <h3>Credits: {score}</h3>
            {getList()}
            <Link to="/"><h4>Home</h4></Link>
        </>
    )
}

export default Rewards