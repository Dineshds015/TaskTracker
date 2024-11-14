1. How long did you spend on the coding test? 
-> I spent approximately 24 to 30 hours on this project. While the initial development was completed relatively quickly, I made further improvements and refinements based on feedback received during the deployment phase.
   
----------------------------------------------------------------
2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.
-> Automatic Batching: Your app can perform multiple state updates simultaneously, such as when marking a task as completed and updating the task list, without triggering excessive renders.
   Example-
   const toggleCompletion = (taskId) => {
  const updatedTasks = tasks.map((task) =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  
  setTasks(updatedTasks);  // Updates task list
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));  // Updates local storage
};

Concurrent Mode: By enabling Concurrent Mode, React can prioritize critical updates (such as marking a task as completed) and ensure smooth transitions for the user, even during background operations.
Example- 
  import ReactDOM from 'react-dom/client';

// Enabling Concurrent Mode when rendering the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

Suspense for Data Fetching: If you fetch tasks from an API, you can use Suspense to keep your UI responsive while waiting for data to load.
Example-
  import React, { Suspense } from 'react';

// Simulated function to fetch tasks
const fetchTasks = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve([{ id: 1, title: 'Task 1', completed: false }]), 2000);
  });
};

const TasksList = React.lazy(() => fetchTasks());

const App = () => {
  return (
    <div>
      <h1>Task List</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <TasksList />
      </Suspense>
    </div>
  );
};

export default App;

---------------------------------------------------------------------------------------------
3. How would you track down a performance issue in production? Have you ever had to do this?
-> I would start by examining browser console logs for errors, using console.time and console.timeEnd to measure function execution times, and then check the network tab for slow API requests or large bundle sizes. Additionally, implementing performance monitoring through custom logging or analytics can help pinpoint the root cause.

---------------------------------------------------------------------------------------------
4. If you had more time, what additional features or improvements would you consider adding to the task management application?
-> If I had more time, I would add the following features:

Task Reminders: Implement notifications for upcoming or overdue tasks.
Task Categories/Labels: Allow users to categorize tasks for better organization.
Enhanced Sorting: Improve sorting by combining priority and due dates.
User Authentication: Enable secure login so users can manage their tasks individually.
Collaboration Features: Allow task sharing, assigning, and team tracking.
