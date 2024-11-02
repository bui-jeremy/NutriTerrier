import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import HomePage from './pages/HomePage';
import MealGeneration from './pages/MealGeneration';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import {jwtDecode} from 'jwt-decode';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
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
    <Router>
      <div className="App">
        <Navbar />
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <div>
            <Logout setUser={setUser} />
            <h1>Welcome, {user.name}!</h1>
            <img src={user.picture} alt="User Profile" />
          </div>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mealgeneration" element={<MealGeneration />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
