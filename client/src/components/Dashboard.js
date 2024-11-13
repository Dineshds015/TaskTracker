import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const today = new Date().toISOString().split("T")[0];

  // Overdue Tasks
  const overdueTasks = tasks.filter(
    task => !task.completed && task.dueDate && task.dueDate < today
  );

  // Upcoming Tasks
  const upcomingTasks = tasks.filter(
    task => !task.completed && task.dueDate && task.dueDate >= today
  ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  // Completed Tasks
  const completedTasksList = tasks.filter(
    task => task.completed
  ).sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));

  const topOverdueTasks = overdueTasks.slice(0, 3);
  const topUpcomingTasks = upcomingTasks.slice(0, 3);
  const topCompletedTasks = completedTasksList.slice(0, 3);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  // Handle Manage Task Button Click with redirection
  const handleManageTasks = () => {
    navigate('/tasks');  // Redirect to /tasks page
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-600 to-blue-500 min-h-screen">
      {/* Manage Task Button */}
      <button
        onClick={handleManageTasks}
        className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition-colors duration-300 mb-6"
      >
        Manage Task
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
  {/* Top 3 Upcoming Tasks */}
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <div className="flex items-center mb-4">
      <span className="text-3xl text-blue-500 mr-3"><i className="fas fa-calendar-alt"></i></span>
      <h3 className="text-2xl font-semibold text-blue-500">Top 3 Upcoming Tasks</h3>
    </div>
    <ul className="space-y-4">
      {topUpcomingTasks.map((task) => (
        <li
          key={task.id}
          className="cursor-pointer text-lg font-medium text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300 flex justify-between items-center"
          onClick={() => handleTaskClick(task)}
        >
          <div>
            <strong>{task.title}</strong>
            <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
          </div>
          <span className="bg-blue-100 text-blue-600 py-1 px-3 text-xs rounded-full">Upcoming</span>
        </li>
      ))}
    </ul>
  </div>

  {/* Top 3 Overdue Tasks */}
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <div className="flex items-center mb-4">
      <span className="text-3xl text-red-500 mr-3"><i className="fas fa-exclamation-triangle"></i></span>
      <h3 className="text-2xl font-semibold text-red-500">Top 3 Overdue Tasks</h3>
    </div>
    <ul className="space-y-4">
      {topOverdueTasks.map((task) => (
        <li
          key={task.id}
          className="cursor-pointer text-lg font-medium text-red-600 hover:text-red-800 hover:underline transition-colors duration-300 flex justify-between items-center"
          onClick={() => handleTaskClick(task)}
        >
          <div>
            <strong>{task.title}</strong>
            <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
          </div>
          <span className="bg-red-100 text-red-600 py-1 px-3 text-xs rounded-full">Overdue</span>
        </li>
      ))}
    </ul>
  </div>

  {/* Top 3 Completed Tasks */}
  <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <div className="flex items-center mb-4">
      <span className="text-3xl text-green-500 mr-3"><i className="fas fa-check-circle"></i></span>
      <h3 className="text-2xl font-semibold text-green-500">Top 3 Completed Tasks</h3>
    </div>
    <ul className="space-y-4">
      {topCompletedTasks.map((task) => (
        <li
          key={task.id}
          className="cursor-pointer text-lg font-medium text-green-600 hover:text-green-800 hover:underline transition-colors duration-300 flex justify-between items-center"
          onClick={() => handleTaskClick(task)}
        >
          <div>
            <strong>{task.title}</strong>
            <p className="text-sm text-gray-500">Completed on: {task.dueDate}</p>
          </div>
          <span className="bg-green-100 text-green-600 py-1 px-3 text-xs rounded-full">Completed</span>
        </li>
      ))}
    </ul>
  </div>
</div>


      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50 transition-opacity duration-300">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-lg w-full transform transition-transform duration-300 scale-100 hover:scale-105">
            <h3 className="text-3xl font-semibold text-blue-600 mb-4">{selectedTask.title}</h3>
            <p className="text-lg mb-2"><strong>Description:</strong> {selectedTask.description}</p>
            <p className="text-lg mb-2"><strong>Priority:</strong> {selectedTask.priority}</p>
            <p className="text-lg mb-2"><strong>Due Date:</strong> {selectedTask.dueDate}</p>
            <p className="text-lg mb-4"><strong>Status:</strong> {selectedTask.completed ? 'Completed' : 'Pending'}</p>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={closeModal}
                className="bg-gray-400 text-white py-2 px-6 rounded-md hover:bg-gray-500 transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">Total Tasks</h3>
          <p className="text-4xl font-bold">{tasks.length}</p>
        </div>
        <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-green-700 mb-4">Completed Tasks</h3>
          <p className="text-4xl font-bold">{completedTasksList.length}</p>
        </div>
        <div className="bg-yellow-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-yellow-700 mb-4">Pending Tasks</h3>
          <p className="text-4xl font-bold">{tasks.filter(task => !task.completed).length}</p>
        </div>
        <div className="bg-red-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-red-700 mb-4">Overdue Tasks</h3>
          <p className="text-4xl font-bold">{overdueTasks.length}</p>
        </div>
        <div className="bg-purple-100 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-purple-700 mb-4">High Priority</h3>
          <p className="text-4xl font-bold">{tasks.filter(task => task.priority === 'High').length}</p>
        </div>
        <div className="bg-gray-200 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Low Priority</h3>
          <p className="text-4xl font-bold">{tasks.filter(task => task.priority === 'Low').length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
