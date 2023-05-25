import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { logoutUser } from './authRoutes'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router'
import { useState } from 'react'

function Header(props) {

    const score = props.mods.score
    const tasksDone = props.mods.tasksDone
    const currentUser = props.mods.currentUser
    const setCurrentUser = props.mods.setCurrentUser
    const setIsAuthenticated = props.mods.setIsAuthenticated
    const isAuthenticated = props.mods.isAuthenticated
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
        logoutUser()
        showLogout()
        navigate('/auth/login')
        } else {
            navigate('/auth/login')
        }

    }

    return(
        
            <Container>
                <Row className="justify-content-sm-center">
                    <Col><h1 className="appTitle">JOYERN</h1></Col>
                </Row>
                <Row>
                    <Col sm={2} >
                        {currentUser ? <h4>{currentUser.name}</h4> : null}
                    </Col>
                    <Col sm={4} className="justify-content-sm-center">
                        <h5>Credits Available: {score}</h5>
                    </Col>
                    <Col sm={4} className="justify-content-sm-center">
                        <h5>Tasks Completed: {tasksDone}</h5>
                    </Col>
                    {logoutText ? <Col><p>Logged Out!</p></Col> : null}
                    <Col> 
                        {(isAuthenticated == true) ? <Button onClick={handleClick}>Logout</Button> : <Button onClick={handleClick}>Login</Button>}
                    </Col>
                </Row>
            </Container>
    )
}

export default Header