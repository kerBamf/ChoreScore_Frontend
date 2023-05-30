import { rewardLoader, rewardsLoader, userUpdate } from "../apiCalls";
import { useState, useEffect} from "react"
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import NewReward from './newReward'


const Rewards = (props) => {
    const [rewards, setRewards] = useState([])
    const [newTab, setNewTab] = useState(false)
    const score = props.mods.score
    const setScore = props.mods.setScore
    const currentUser = props.mods.currentUser
    const setCurrentUser = props.mods.setCurrentUser


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
            if(value.cost <= score){
            return(
                <div className="bg-light border taskItem" key={idx}>
                    <Link to={`/rewards/${value._id}`}>
                        <h3>{value.name}</h3>
                    </Link>
                    <h4>Cost: {value.cost}</h4>
                    <Button className="btn completeButton" variant="secondary" onClick={handleClick} value={value._id}>Purchase</Button>
                </div>
            )} else {
                return (
                    <div className="bg-light border taskItem" key={idx}>
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

    async function handleClick(e) {
        e.preventDefault()
        const reward = await rewardLoader(e.target.value)
        const updateData = userObjectUpdate(currentUser, reward)
        const newUser = await userUpdate(updateData)
        setScore(newUser.credits)
        setCurrentUser({
            ...currentUser,
            user: newUser
        })
    }

    //Function creating new user object for update

    function userObjectUpdate(user, reward) {
        let userData = user.user
        userData.credits = userData.credits - reward.cost
        return userData
    }

    //Controls state showing new reward subwindow
    function openNewReward() {
        if(newTab) {
            setNewTab(false)
        } else {
            setNewTab(true)
        }
    }

    if (props.mods.isAuthenticated == true) {
        return (
            <Container>
            <Row className="taskRewardButtons align-items-center">
            <Col xs={2} className="text-align-bottom">
                    <h2 className="align-bottom"><u>Rewards</u></h2>
                </Col>
                <Col xs={{span: 3, offset: 5}}>
                    <Button variant="primary" onClick={openNewReward}>New Reward</Button>
                </Col>
                <Col xs={2}>
                    <Link to="/"><Button variant="info">Tasks</Button></Link>
                </Col>
            </Row>
            <Stack gap={2}>
                {newTab ? <NewReward mods={{setNewTab, getRewards}} /> : null}
                {rewards.length ? getList() : <h2>No Rewards Listed</h2>}
            </Stack>
        </Container>
    )
    } else {
        return (
            <Container>
                <h2>Please Login to Use App</h2>
            </Container>
        )
    }
}

export default Rewards