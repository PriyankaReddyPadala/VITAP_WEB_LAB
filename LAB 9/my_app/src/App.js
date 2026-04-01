// src/App.js
import React from 'react';
import './App.css';

function App() {
  // Student details stored in JavaScript variables
  const studentName = "Dakhita Mathur";
  const department = "Computer Science and Engineering";
  const year = "3rd Year";
  const section = "A";

  return (
    <div className="App">
      <div className="profile-container">
        <h1>Student Profile</h1>
        
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar">
              👨‍🎓
            </div>
            <h2>{studentName}</h2>
          </div>

          <div className="profile-details">
            <div className="detail-item">
              <strong>Department:</strong>
              <span>{department}</span>
            </div>
            
            <div className="detail-item">
              <strong>Year:</strong>
              <span>{year}</span>
            </div>
            
            <div className="detail-item">
              <strong>Section:</strong>
              <span>{section}</span>
            </div>
          </div>
        </div>

        <footer className="footer">
          Built with React using Functional Component & JSX
        </footer>
      </div>
    </div>
  );
}

export default App;