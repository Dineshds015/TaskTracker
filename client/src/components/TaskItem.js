import React from 'react';

const TaskItem = ({ task, deleteTask, toggleCompletion, updateTask }) => {
  const { id, title, description, priority, dueDate, completed } = task;

  const currentDate = new Date();
  const taskDueDate = new Date(dueDate);
  let bgColor = completed ? 'bg-green-100' : taskDueDate < currentDate ? 'bg-red-100' : 'bg-yellow-100';

  // Function to truncate text to 20 characters and append '...' if necessary
  const truncateText = (text) => {
    if (text && text.length > 20) {
      return text.substring(0, 20) + '...';
    }
    return text;
  };

  return (
    <tr className={`${bgColor} text-black`}>
      {/* Task Title */}
      <td className="px-4 py-2">{truncateText(title)}</td>

      {/* Task Description */}
      <td className="px-4 py-2 break-words">{truncateText(description)}</td>

      {/* Task Priority */}
      <td className="px-4 py-2">{truncateText(priority)}</td>

      {/* Task Due Date */}
      <td className="px-4 py-2">{truncateText(dueDate)}</td>

      {/* Action Buttons */}
      <td className="px-4 py-2 flex space-x-2 justify-center">
        <button
          onClick={() => toggleCompletion(id)}
          className={`py-1 px-3 rounded-md ${completed ? 'bg-gray-400' : 'bg-blue-500'} text-white`}
        >
          {completed ? 'Undo' : 'Completed'}
        </button>
        <button
          onClick={() => updateTask(task)}
          className="bg-yellow-500 text-white py-1 px-3 rounded-md"
        >
          Update
        </button>
        <button
          onClick={() => deleteTask(id)}
          className="bg-red-500 text-white py-1 px-3 rounded-md"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TaskItem;
