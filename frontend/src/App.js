import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Logout from './components/Logout';
import HomePage from './pages/HomePage';
import { jwtDecode } from 'jwt-decode'; // If named export

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for token in localStorage on app load
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUser({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      });
    }
  }, []);

  return (
    <div className="App">
      {!user ? (
        // Show Login component if not logged in
        <Login setUser={setUser} />
      ) : (
        // Show HomePage and Logout components if logged in
        <div>
          <Logout setUser={setUser} />
          <h1>Welcome, {user.name}!</h1>
          <img src={user.picture} alt="User Profile" />
          <HomePage />
        </div>
      )}
    </div>
  );
}

export default App;
