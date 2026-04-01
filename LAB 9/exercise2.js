import React from 'react';

// Reusable child component using props
const StudentCard = ({ name, department, marks }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{name}</h3>
      <p style={{ margin: '5px 0' }}><strong>Department:</strong> {department}</p>
      <p style={{ margin: '5px 0' }}><strong>Marks:</strong> {marks}</p>
    </div>
  );
};

// Parent component
const Exercise2 = () => {
  return (
    <div>
      <h2>Student Directory</h2>
      {/* Rendering multiple student cards with different values using reusability */}
      <StudentCard name="Alice Smith" department="Information Technology" marks="92" />
      <StudentCard name="Bob Jones" department="Computer Science" marks="85" />
      <StudentCard name="Charlie Brown" department="Electrical Engineering" marks="78" />
    </div>
  );
};

// Export properly using module-based structure
export default Exercise2;