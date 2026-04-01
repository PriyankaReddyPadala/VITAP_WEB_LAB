import React from 'react';
import Exercise1 from './exercise1';
import Exercise2 from './exercise2';
import Exercise3 from './exercise3';

function App() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>React JS Advanced - Lab 10</h1>
      
      <hr style={{ margin: '40px 0' }} />
      <h3 style={{ textAlign: 'center', color: '#666' }}>Exercise 1: Forms</h3>
      <Exercise1 />
      
      <hr style={{ margin: '40px 0' }} />
      <h3 style={{ textAlign: 'center', color: '#666' }}>Exercise 2: Lists</h3>
      <Exercise2 />
      
      <hr style={{ margin: '40px 0' }} />
      <h3 style={{ textAlign: 'center', color: '#666' }}>Exercise 3: API Fetching</h3>
      <Exercise3 />
      
    </div>
  );
}

export default App;