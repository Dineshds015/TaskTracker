import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, deleteTask, toggleCompletion, updateTask }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-lg">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gradient-to-r from-blue-500 to-teal-500 text-white">
            <th className="border p-3 text-left">Title</th>
            <th className="border p-3 text-left">Description</th>
            <th className="border p-3 text-left">Priority</th>
            <th className="border p-3 text-left">Due Date</th>
            <th className="border p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleCompletion={toggleCompletion}
              updateTask={updateTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
