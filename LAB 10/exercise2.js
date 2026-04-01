import React, { useState } from 'react';

const Exercise2 = () => {
  // Store items in an array state 
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Add new items [cite: 61]
  const addItem = () => {
    if (inputValue.trim() !== '') {
      // Create a unique ID for the key
      const newItem = { id: Date.now(), text: inputValue };
      setItems([...items, newItem]);
      setInputValue('');
    }
  };

  // Remove items [cite: 62]
  const removeItem = (idToRemove) => {
    setItems(items.filter(item => item.id !== idToRemove));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Task List</h2>
      
      <div style={{ display: 'flex', marginBottom: '15px' }}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Enter a task..."
          style={{ flex: 1, padding: '8px', marginRight: '10px' }}
        />
        <button onClick={addItem} style={{ padding: '8px 15px', cursor: 'pointer' }}>Add</button>
      </div>

      {/* Handle empty list scenarios [cite: 64] */}
      {items.length === 0 ? (
        <p style={{ color: '#666', fontStyle: 'italic' }}>No tasks added yet.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {/* Render list dynamically using map() [cite: 59] */}
          {items.map((item) => (
            // Assign a unique identifier using the key attribute [cite: 60]
            <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee', alignItems: 'center' }}>
              <span>{item.text}</span>
              <button 
                onClick={() => removeItem(item.id)} 
                style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '3px', cursor: 'pointer' }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Exercise2;