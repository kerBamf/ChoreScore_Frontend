import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'

function Header(props) {
    const score = props.mods.score
    const tasksDone = props.mods.tasksDone

    return(
        
            <Container>
                <Row className="justify-content-start align-items-center">
                    <Col sm={2} >
                        <h1 className="headerTitle">Joyern</h1>
                    </Col>
                    <Col sm={4}>
                        <h5>Credits Available: {score}</h5>
                    </Col>
                    <Col sm={4}>
                        <h5>Tasks Completed: {tasksDone}</h5>
                    </Col>
                </Row>
            </Container>
    )
}

export default Header