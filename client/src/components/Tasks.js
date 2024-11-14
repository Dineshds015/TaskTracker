import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [completionFilter, setCompletionFilter] = useState('All');
  const [sortBy, setSortBy] = useState('None');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const toggleCompletion = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const openUpdateModal = (task) => {
    setTaskToEdit(task);
    setShowModal(true);
  };

  const handleTaskSubmit = (task) => {
    let updatedTasks;
    if (taskToEdit) {
      updatedTasks = tasks.map((t) => (t.id === taskToEdit.id ? task : t));
    } else {
      updatedTasks = [...tasks, { ...task, status: 'pending', completed: false }];
    }

    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTaskToEdit(null);
    setShowModal(false);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    
    const today = new Date().toISOString().split("T")[0];
    const isOverdue = !task.completed && task.dueDate && task.dueDate < today;
  
    const matchesCompletion =
      completionFilter === 'All' ||
      (completionFilter === 'Completed' && task.completed) ||
      (completionFilter === 'Pending' && !task.completed && !isOverdue) ||
      (completionFilter === 'Overdue' && isOverdue);
  
    return matchesSearch && matchesPriority && matchesCompletion;
  });

  const sortTasks = (tasks) => {
    if (sortBy === 'Title') {
      return tasks.sort((a, b) => a.title.localeCompare(b.title));
    }
    if (sortBy === 'Due Date') {
      return tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }
    if (sortBy === 'Priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return tasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }
    return tasks; 
  };

  const sortedTasks = sortTasks(filteredTasks);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
      <button
        onClick={() => {
          setShowModal(true);
          setTaskToEdit(null); // Clear taskToEdit to ensure the form is empty
        }}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 sm:w-auto w-full"
      >
  Add Task
</button>


        <div className="flex space-x-4 w-full sm:w-auto sm:flex-row flex-col">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border border-gray-300 rounded-md flex-1"
          />

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="All">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select
            value={completionFilter}
            onChange={(e) => setCompletionFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="None">Sort By</option>
            <option value="Title">Title</option>
            <option value="Due Date">Due Date</option>
            <option value="Priority">Priority</option>
          </select>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md w-96">
            <TaskForm
              onSubmit={handleTaskSubmit}
              closeModal={() => setShowModal(false)}
              task={taskToEdit}
            />
          </div>
        </div>
      )}

      <TaskList
        tasks={sortedTasks}
        deleteTask={deleteTask}
        toggleCompletion={toggleCompletion}
        updateTask={openUpdateModal}
      />
    </div>
  );
};

export default Tasks;
