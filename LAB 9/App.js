import React from 'react';
import Exercise1 from './exercise1';
import Exercise2 from './exercise2';
import Exercise3 from './exercise3';

function App() {
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React JS Basics - Lab 9</h1>
      <hr style={{ margin: '20px 0' }} />
      
      <Exercise1 />
      
      <hr style={{ margin: '40px 0' }} />
      
      <Exercise2 />
      
      <hr style={{ margin: '40px 0' }} />
      
      <Exercise3 />
      
    </div>
  );
}

export default App;