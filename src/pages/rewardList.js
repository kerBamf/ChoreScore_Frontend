import { rewardsLoader, rewardLoader } from "../apiCalls";
import { useState, useEffect} from "react"
import { Link } from 'react-router-dom'

const Rewards = (props) => {
    const [rewards, setRewards] = useState([])
    const currentScore = props.mods.currentScore
    const setScore = props.mods.setScore()

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
            if(value.cost <= currentScore){
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
                        <Link to
                    </div>
                )
            }
        })
        return rewardArr
    }

    function handleClick(e) {
        setScore(currentScore - e.target.value)
    }
}