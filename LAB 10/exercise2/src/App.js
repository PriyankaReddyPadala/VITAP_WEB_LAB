import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [nextId, setNextId] = useState(1);

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    
    if (inputValue.trim() === '') return;

    const newTask = {
      id: nextId,
      text: inputValue.trim(),
      date: new Date().toLocaleDateString()
    };

    setTasks(prev => [newTask, ...prev]);
    setNextId(prev => prev + 1);
    setInputValue('');
  };

  // Remove task
  const removeTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  return (
    <div className="app-container">
      <div className="list-card">
        <h1>Task Manager</h1>
        <p className="subtitle">Add and manage your tasks</p>

        {/* Add Task Form */}
        <form onSubmit={addTask} className="add-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a new task..."
            className="task-input"
          />
          <button type="submit" className="add-btn">
            Add Task
          </button>
        </form>

        {/* Task Count */}
        <div className="task-count">
          {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} added
        </div>

        {/* Task List */}
        <div className="task-list">
          {tasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks yet. Add your first task above! ✅</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div key={task.id} className="task-item">
                <div className="task-content">
                  <span className="task-text">{task.text}</span>
                  <small className="task-date">{task.date}</small>
                </div>
                <button
                  onClick={() => removeTask(task.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;