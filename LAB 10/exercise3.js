import React, { useState, useEffect } from 'react';

const Exercise3 = () => {
  // Manage data, loading, and error states 
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Perform API calls using useEffect [cite: 72]
  useEffect(() => {
    // Fetch data asynchronously [cite: 73]
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs only once on load [cite: 77]

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>External User Data</h2>
      
      {/* Show loading indicator [cite: 75] */}
      {loading && <p>Loading data, please wait...</p>}
      
      {/* Handle API errors [cite: 76] */}
      {error && <p style={{ color: 'red' }}>Error fetching data: {error}</p>}
      
      {/* Display retrieved data dynamically [cite: 74] */}
      {!loading && !error && (
        <ul style={{ paddingLeft: '20px' }}>
          {users.map((user) => (
            <li key={user.id} style={{ marginBottom: '10px' }}>
              <strong>{user.name}</strong> <br/>
              <span style={{ color: '#555', fontSize: '14px' }}>{user.email}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Exercise3;