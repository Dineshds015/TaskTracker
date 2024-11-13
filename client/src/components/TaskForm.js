import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, closeModal, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setDueDate(task.dueDate);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { id: task ? task.id : Date.now(), title, description, priority, dueDate, completed: task ? task.completed : false };
    onSubmit(newTask);

    setTitle('');
    setDescription('');
    setPriority('Medium');
    setDueDate('');
    closeModal();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Task Title" className="border p-2 w-full rounded-md" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Task Description" className="border p-2 w-full rounded-md" rows="4" />
      <select value={priority} onChange={(e) => setPriority(e.target.value)} className="border p-2 w-full rounded-md">
        <option>High</option>
        <option>Medium</option>
        <option>Low</option>
      </select>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="border p-2 w-full rounded-md" />

      <div className="flex flex-col sm:flex-row sm:justify-between">
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 sm:mb-0 sm:w-auto">
          {task ? 'Update Task' : 'Add Task'}
        </button>
        <button type="button" onClick={closeModal} className="bg-red-500 text-white py-2 px-4 rounded-md sm:w-auto">
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
