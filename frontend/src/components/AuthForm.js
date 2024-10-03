import React from 'react';
import './AuthForm.css';

function AuthForm({ handleAuth }) {
    return (
        <div className="auth-container">
            <h1>Login / Sign up</h1>
            <button className="email-btn" onClick={() => handleAuth('email')}>Sign up with email</button>
            <div className="social-signup-text">or use social sign up</div>
            <button className="social-btn google" onClick={() => handleAuth('google')}>
                Continue with Google
            </button>
            <button className="social-btn facebook" onClick={() => handleAuth('facebook')}>
                Continue with Facebook
            </button>
            <button className="social-btn apple" onClick={() => handleAuth('apple')}>
                Continue with Apple
            </button>
            <div className="login-link">
                Already have an account? <span onClick={() => handleAuth('login')}>Log In</span>
            </div>
        </div>
    );
}

export default AuthForm;
