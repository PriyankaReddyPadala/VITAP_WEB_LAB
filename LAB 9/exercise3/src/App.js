// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  // Initialize counter with default value using useState Hook
  const [count, setCount] = useState(0);

  // Increment function
  const increment = () => {
    setCount(count + 1);
  };

  // Decrement function
  const decrement = () => {
    setCount(count - 1);
  };

  // Reset function
  const reset = () => {
    setCount(0);
  };

  return (
    <div className="App">
      <div className="header">
        <h1>VIT-AP UNIVERSITY</h1>
        <h2>Andhra Pradesh</h2>
      </div>

      <h3 className="title">
        Lab Sheet 9: React Basics - Exercise 3<br />
        Simple Counter using useState Hook
      </h3>

      <div className="counter-container">
        <div className="counter-card">
          <h2>Counter</h2>
          
          <div className="counter-display">
            {count}
          </div>

          <div className="buttons">
            <button 
              className="btn decrement" 
              onClick={decrement}
            >
              - Decrement
            </button>

            <button 
              className="btn reset" 
              onClick={reset}
            >
              Reset
            </button>

            <button 
              className="btn increment" 
              onClick={increment}
            >
              Increment +
            </button>
          </div>

          <p className="info">
            Current Value: <strong>{count}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;