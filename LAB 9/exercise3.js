import React, { useState } from 'react';

const Exercise3 = () => {
  // Initialize the counter with a default numeric value using useState
  const [count, setCount] = useState(0);

  // Update the counter value using the state updater function
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div style={{ padding: '20px', border: '2px dashed #999', borderRadius: '8px', maxWidth: '300px', textAlign: 'center' }}>
      <h2>Counter System</h2>
      {/* Display the current counter value dynamically */}
      <h1 style={{ fontSize: '48px', margin: '20px 0' }}>{count}</h1>
      
      <div>
        {/* Handle user interaction using onClick events */}
        <button 
          onClick={handleDecrement} 
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px' }}>
          Decrease
        </button>
        <button 
          onClick={handleIncrement} 
          style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Increase
        </button>
      </div>
    </div>
  );
};

export default Exercise3;