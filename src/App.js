import './App.css';
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import TaskList from './pages/taskList'
import ShowTask from './pages/showTask'
import NewTask from './pages/newTask'
import EditTask from './pages/editTask'

function App() {
  const [score, setScore] = useState(0)
  const [tasksDone, setTasksDone] = useState(0)

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TaskList mods={{score, setScore, tasksDone, setTasksDone}} />} />
        <Route path="/task">
          <Route path="new" element={<NewTask />} />
          <Route path="edit/:id" element={<EditTask />} />
          <Route path=":id" element={<ShowTask />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
