import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';


function Login({ setUser }) {
  const handleLoginSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = jwtDecode(token);

    // Update user state
    setUser({
      name: decoded.name,
      email: decoded.email,
      picture: decoded.picture,
    });

    // Optionally, store the token in localStorage or cookies
    localStorage.setItem('token', token);
  };

  const handleLoginError = () => {
    console.error('Login Failed');
  };

  return (
    <div>
      <h1>Login with Google</h1>
      <GoogleLogin onSuccess={handleLoginSuccess} onError={handleLoginError} />
    </div>
  );
}

export default Login;
