import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Logout from './pages/Logout';
import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import MealGeneration from './pages/MealGeneration';
import Navbar from './components/Navbar'; // Ensure this component exists
import { jwtDecode } from 'jwt-decode';

function App() {
  const [user, setUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

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

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <Router>
      <div className="App">
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={showSettings ? <Settings user={user} setUser={setUser} /> : <HomePage />} />
              <Route path="/mealgeneration" element={<MealGeneration />} />
              <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
            </Routes>
          </div>
        )}
        
        
      </div>
    </Router>
  );
}

export default App;
