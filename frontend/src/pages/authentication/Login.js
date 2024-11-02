import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);

    setUser({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    });

    localStorage.setItem('token', token);
    navigate('/'); // Redirect to home after login
  };

  const handleLoginError = () => {
    console.error('Login Failed');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Logging in with:', { email, password });
  };

  const handleSignupRedirect = () => {
    navigate('/signup'); // Navigate to /signup
  };

  return (
    <div className="login-container">
      <div className="banner">NutriTerrier</div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
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
          Login
        </button>
      </form>
      <div className="divider">or</div>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
      <button onClick={handleSignupRedirect} className="toggle-button">
        Don’t have an account? Sign Up
      </button>
    </div>
  );
}

export default Login;
