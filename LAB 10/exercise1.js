import React, { useState } from 'react';

const Exercise1 = () => {
  // Manage form input fields and validation errors using useState [cite: 44, 48]
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Capture user input changes [cite: 46]
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate input fields [cite: 47]
  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  // Handle form submission [cite: 50]
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default submission [cite: 49]
    const validationErrors = validate();
    
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
      setErrors({});
      // Reset form fields after successful submission [cite: 51]
      setFormData({ name: '', email: '', password: '' });
      setTimeout(() => setSubmitted(false), 3000);
    } else {
      setErrors(validationErrors);
      setSubmitted(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Registration Form</h2>
      {submitted && <p style={{ color: 'green' }}>Form submitted successfully!</p>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
          {/* Bind input to state [cite: 45] */}
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px' }}
          />
          {/* Display validation errors dynamically [cite: 48] */}
          {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            style={{ width: '100%', padding: '8px' }}
          />
          {errors.password && <span style={{ color: 'red', fontSize: '12px' }}>{errors.password}</span>}
        </div>

        <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Exercise1;