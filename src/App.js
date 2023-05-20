import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { setUserToken, clearUserToken } from './utils/authToken'
import TaskList from './pages/taskList'
import ShowTask from './pages/showTask'
import NewTask from './pages/newTask'
import EditTask from './pages/editTask'
import Rewards from './pages/rewardList'
import NewReward from './pages/newReward'
import ShowReward from './pages/showReward'
import EditReward from './pages/editReward';
import Footer from './components/footer'
import Header from './components/header'
import Container from 'react-bootstrap/Container'

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState({})
  const [score, setScore] = useState(0)
  const [tasksDone, setTasksDone] = useState(0)

  const registerUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      }

      const newUser = awaitFetch('http://localhost:400/auth/register',
      configs)

      const parsedUser = await newUser.json()
      console.log(parsedUser)

      setUserToken(parsedUser.token)
      setCurrentUser(parsedUser.currentUser)
      setIsAuthenticated(parsedUser.loggedIn)
      return parsedUser
    } catch(err) {
      console.log(err)
      clearUserToken();
      setIsAuthenticated(false)
  }
}

  const loginUser = async (data) => {
    try {
      const configs = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "applications/json"
        }
      }

      const response = await fetch(
        "http://localhost:4000/auth/login", configs
      )

      const user = await response.json()
      console.log(user)

      setUserToken(user.token)
      setCurrentUser(user.currentUser)
      setIsAuthenticated(user.loggedI)

      return user
    } catch(err) {
      console.log(err)
      clearUserToken()
      setIsAuthenticated(false)
    }
  }

  return (
    <div className="App">
      <div className="appContainer">
      <Container fluid="xs">
        <Header mods={{score, tasksDone, currentUser}}/>
      <Routes>
        <Route path="/" element={<TaskList mods={{score, setScore, tasksDone, setTasksDone}} />} />
        <Route path="/task">
          <Route path="new" element={<NewTask />} />
          <Route path="edit/:id" element={<EditTask />} />
          <Route path=":id" element={<ShowTask />} />
        </Route>
        <Route path="/rewards">
          <Route path="" element={<Rewards mods={{score, setScore}} />} />
          <Route path="new" element={<NewReward />} />
          <Route path="edit/:id" element={<EditReward />} />
          <Route path=":id" element={<ShowReward />} /> 
        </Route>
      </Routes>
      <Footer />
      </Container>
      </div>
    </div>
  );
}

export default App;
