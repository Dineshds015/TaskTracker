// src/App.js

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Sample Task", priority: "High", completed: false, dueDate: "2024-11-20" },
    // Add more task data here for testing
  ]);

  return (
    <Router>
      <Navbar />
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Dashboard tasks={tasks} />} />
          <Route path="/tasks" element={<Tasks tasks={tasks} setTasks={setTasks} />} />
          <Route path="/tasks/completed" element={<Tasks tasks={tasks} setTasks={setTasks} filter="completed" />} />
          <Route path="/tasks/pending" element={<Tasks tasks={tasks} setTasks={setTasks} filter="pending" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
