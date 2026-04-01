import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refresh]); // Re-fetch when refresh button is clicked

  const handleRefresh = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div className="app-container">
      <div className="card">
        <div className="header">
          <h1>User Directory</h1>
          <button onClick={handleRefresh} className="refresh-btn">
            🔄 Refresh
          </button>
        </div>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading users...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
            <button onClick={handleRefresh} className="retry-btn">
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <p className="count">Showing {users.length} users</p>
            
            <div className="user-list">
              {users.map(user => (
                <div key={user.id} className="user-card">
                  <div className="user-info">
                    <h3>{user.name}</h3>
                    <p className="email">📧 {user.email}</p>
                    <p className="company">🏢 {user.company.name}</p>
                    <p className="address">
                      📍 {user.address.city}, {user.address.zipcode}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;