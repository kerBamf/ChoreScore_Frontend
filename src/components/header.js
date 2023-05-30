import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { logoutUser } from './authRoutes'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'

function Header(props) {
    const currentUser = props.mods.currentUser
    const setCurrentUser = props.mods.setCurrentUser
    const setIsAuthenticated = props.mods.setIsAuthenticated
    const isAuthenticated = props.mods.isAuthenticated
    const score = props.mods.score
    const setScore = props.mods.setScore
    const tasksDone = props.mods.tasksDone
    const setTasksDone = props.mods.setTasksDone
    const username = props.mods.username
    const setUsername = props.mods.setUsername
    const [logoutText, setLogoutText] = useState(false)
    const navigate = useNavigate()

    function showLogout() {
        setLogoutText(true)
        setTimeout (() => {
            setLogoutText(false)
        }, 2500)
    }

    const handleClick = async () => {
        if (isAuthenticated == true) {
        setCurrentUser({})
        setIsAuthenticated(false)
        setUsername("")
        setScore(0)
        setTasksDone(0)
        logoutUser()
        showLogout()
        navigate('/auth/login')
        } else {
            navigate('/auth/login')
        }

    }

    return(
        
            <Container className="headerContainer">
                <Row>
                    <Col sm={{offset: 1}}><h1 className="appTitle">JOYERN</h1></Col>
                    <Col sm="auto"> 
                        {(isAuthenticated == true) ? <Button onClick={handleClick}>Logout</Button> : <Button onClick={handleClick}>Login</Button>}
                    </Col>
                </Row>
                <Row>
                    <Col sm={3} >
                        {username ? <h4 className="headerText">{username}</h4> : null}
                        {logoutText ? <Col><p>Logged Out!</p></Col> : null}
                    </Col>
                    <Col sm={4} className="justify-content-sm-center">
                        <h5 className="headerText">Credits Available: {score}</h5>
                    </Col>
                    <Col sm={4} className="justify-content-sm-center">
                        <h5 className="headerText">Tasks Completed: {tasksDone}</h5>
                    </Col>
                </Row>
            </Container>
    )
}

export default Header