import './App.css';
import { Route, Routes } from 'react-router-dom'
import { tasksLoader, rewardsLoader } from './apiCalls';
import { useState, useEffect } from 'react';


function App() {
  const [allTasks, setAllTasks] = useState([])
  const [allRewards, setAllRewards] = useState([])

  useEffect(() => {
    const fetchTasks= async () => {
      try {
        const data = await tasksLoader()
        setAllTasks(data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchTasks()
  })

  useEffect(() => {
    const fetchRewards= async () => {
      try {
        const data = await rewardsLoader()
        setAllRewards(data)
      } catch(err) {
        console.log(err)
      }
    }
    fetchRewards()
  })

  return (
    <div className="App">
      <Routes>
        <Route></Route>
      </Routes>
    </div>
  );
}

export default App;
