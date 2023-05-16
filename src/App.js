import './App.css';
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import TaskList from './pages/taskList'

function App() {
  const [score, setScore] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TaskList mods={{score, setScore}} />} />
      </Routes>
    </div>
  );
}

export default App;
