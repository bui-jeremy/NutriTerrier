// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Adjusted import
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';
import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import MealGeneration from './pages/MealGeneration';
import CatalogPage from './pages/CatalogPage';
import Navbar from './components/Navbar';
import './App.css'; // Assuming you have a CSS file for global styling

function App() {
  const [user, setUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  // Load the user from local storage if a token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          name: decoded.name,
          email: decoded.email,
          picture: decoded.picture,
        });
      } catch (error) {
        console.error("Invalid token", error);
        setUser(null);
        localStorage.removeItem('token'); // Remove invalid token
      }
    }
  }, []);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <Router>
      <div className="App">
        {!user ? (
          <Routes>
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Login setUser={setUser} />} />
          </Routes>
        ) : (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={showSettings ? <Settings user={user} setUser={setUser} /> : <HomePage user={user} />} />
              <Route path="/mealgeneration" element={<MealGeneration user={user} setUser={setUser} />} />
              <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
              <Route path="/catalog" element={<CatalogPage />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
