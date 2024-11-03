import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';
import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import MealGeneration from './pages/MealGeneration';
import Navbar from './components/Navbar';
import { jwtDecode } from 'jwt-decode'; // Correct import with curly braces

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
      localStorage.setItem('userEmail', decoded.email); // Store email in localStorage after decoding token
    }
  }, []);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  // Define updateUser as a function to pass it to Settings
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    if (updatedUser.email) {
      localStorage.setItem("userEmail", updatedUser.email); // Update localStorage with the new email
    }
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
          <div>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} /> {/* Render HomePage only at "/" */}
              <Route path="/mealgeneration" element={<MealGeneration />} />
              <Route path="/settings" element={<Settings user={user} setUser={setUser} updateUser={updateUser} />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;

