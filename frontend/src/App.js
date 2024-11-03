import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';
import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import MealGeneration from './pages/MealGeneration';
import CatalogPage from './pages/CatalogPage';
import Navbar from './components/Navbar';
import {jwtDecode} from 'jwt-decode';

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
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={showSettings ? <Settings user={user} setUser={setUser} /> : <HomePage />} />
              <Route path="/mealgeneration" element={<MealGeneration />} />
              <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
              <Route path="/catalog" element={<CatalogPage />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
