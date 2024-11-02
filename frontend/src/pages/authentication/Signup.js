import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

function Signup({ setUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for signing up a new user
    console.log('Signing up with:', { name, email, password });
    // Here you could set the user and save token if needed
    // After signup, navigate to login
    navigate('/login'); // Redirect to the login screen after signing up
  };

  return (
    <div className="signup-container">
      <div className="banner">NutriTerrier</div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
      <button onClick={() => navigate('/login')} className="toggle-button">
        Already have an account? Login
      </button>
    </div>
  );
}

export default Signup;
