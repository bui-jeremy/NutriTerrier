// Login.js
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Leaving the import statement as is


function Login({ setUser }) {
  const handleGoogleLoginSuccess = (credentialResponse) => {
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

  const handleGoogleLoginError = () => {
    console.error('Login Failed');
  };

  return (
    <div className="login-content">
      <h1 className="login-heading">Welcome to NutriTerrier</h1>
      <div className="login-alternative">
        <p>Login with Google to continue</p>
      </div>
      <GoogleLogin
        onSuccess={handleGoogleLoginSuccess}
        onError={handleGoogleLoginError}
        render={(renderProps) => (
          <button
            className="google-login-button"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google Icon"
            />
            Login with Google
          </button>
        )}
      />
    </div>
  );
}

export default Login;
