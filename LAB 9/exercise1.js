import React from 'react';

const Exercise1 = () => {
  // Store student details inside the component using JavaScript variables
  const name = "Priyanka Reddy";
  const department = "Computer Science Engineering";
  const year = "3rd Year";
  const section = "A";

  return (
    // Group the profile details inside suitable HTML elements
    <div style={{ border: '2px solid #2c3e50', padding: '20px', borderRadius: '8px', maxWidth: '300px' }}>
      <h2 style={{ color: '#2c3e50', borderBottom: '2px solid #3498db', paddingBottom: '10px' }}>
        Student Profile
      </h2>
      {/* Render the variable values dynamically using JSX */}
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Department:</strong> {department}</p>
      <p><strong>Year:</strong> {year}</p>
      <p><strong>Section:</strong> {section}</p>
    </div>
  );
};

// Export the component
export default Exercise1;