// App.js
import React from 'react';
import './App.css';

// Reusable StudentCard Component (defined here as functional component)
const StudentCard = ({ name, department, marks }) => {
  const getStatus = (marks) => {
    if (marks >= 75) return { text: "Excellent", class: "excellent" };
    if (marks >= 60) return { text: "Good", class: "good" };
    return { text: "Needs Improvement", class: "average" };
  };

  const status = getStatus(marks);

  return (
    <div className="student-card">
      <h2>{name}</h2>
      <p className="department">Department: {department}</p>
      <p className="marks">Marks: <strong>{marks}</strong>/100</p>
      
      <div className="marks-bar">
        <div 
          className="marks-fill" 
          style={{ 
            width: `${marks}%`,
            backgroundColor: marks >= 75 ? '#4caf50' : marks >= 60 ? '#ff9800' : '#f44336'
          }}
        />
      </div>
      
      <p className={`status ${status.class}`}>{status.text}</p>
    </div>
  );
};

function App() {
  const students = [
    { name: "Aarav Sharma", department: "Computer Science & Engineering", marks: 92 },
    { name: "Priya Patel", department: "Electronics & Communication", marks: 78 },
    { name: "Rahul Verma", department: "Mechanical Engineering", marks: 65 },
    { name: "Sneha Reddy", department: "Computer Science & Engineering", marks: 88 },
    { name: "Vikram Singh", department: "Civil Engineering", marks: 45 }
  ];

  return (
    <div className="App">
      <div className="header">
        <h1>VIT-AP UNIVERSITY</h1>
        <h2>Andhra Pradesh</h2>
      </div>

      <h3 className="title">
        Lab Sheet 9: React Basics - Exercise 2<br />
        Reusable Student Card using Props
      </h3>

      <div className="cards-container">
        {students.map((student, index) => (
          <StudentCard 
            key={index}
            name={student.name}
            department={student.department}
            marks={student.marks}
          />
        ))}
      </div>
    </div>
  );
}

export default App;