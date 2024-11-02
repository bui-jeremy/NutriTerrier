import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Logout from './components/Logout';
import { jwtDecode } from 'jwt-decode';


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
        <Login setUser={setUser} />
      ) : (
        <div>
          <h1>Welcome, {user.name}!</h1>
          <img src={user.picture} alt="User Profile" />
          <Logout setUser={setUser} />
        </div>
      )}
    </div>
  );
}

export default App;
