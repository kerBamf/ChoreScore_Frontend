import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import { logoutUser } from './authRoutes'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router'

function Header(props) {
    const score = props.mods.score
    const tasksDone = props.mods.tasksDone
    const currentUser = props.mods.currentUser
    const setCurrentUser = props.mods.setCurrentUser
    const setIsAuthenticated = props.mods.setIsAuthenticated
    const isAuthenticated = props.mods.isAuthenticated
    const navigate = useNavigate()

    const handleClick = async () => {
        if (isAuthenticated == true) {
        setCurrentUser(null)
        setIsAuthenticated(false)
        logoutUser()
        navigate('/auth/login')
        } else {
            navigate('/auth/login')
        }

    }

    return(
        
            <Container>
                <Row className="justify-content-start align-items-center">
                    <Col sm={2} >
                        <h1 className="headerTitle">Joyern</h1>
                        <br />
                        {currentUser ? <h4>{currentUser.name}</h4> : null}
                    </Col>
                    <Col sm={4}>
                        <h5>Credits Available: {score}</h5>
                    </Col>
                    <Col sm={4}>
                        <h5>Tasks Completed: {tasksDone}</h5>
                    </Col>
                    <Col> 
                        {isAuthenticated == true ? <Button onClick={handleClick}>Logout</Button> : <Button onClick={handleClick}>Login</Button>}
                    </Col>
                </Row>
            </Container>
    )
}

export default Header