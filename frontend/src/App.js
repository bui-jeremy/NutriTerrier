import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 124aea9 (rebase: files)
=======
>>>>>>> b2f94fa (rebase: files)
=======
>>>>>>> 40230a8 (rebase: files)
=======
>>>>>>> 407551f (rebase: files)
=======
>>>>>>> b7b5e39 (rebase: files)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import Login from './components/Login';
import Logout from './components/Logout';
import HomePage from './pages/HomePage';
import MealGeneration from './pages/MealGeneration';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import {jwtDecode} from 'jwt-decode';
=======
=======
>>>>>>> ea30318 (fix)
=======
>>>>>>> 13b60af (fix: rebase)
=======
>>>>>>> e06b45a (fix: rebase)
import Login from './pages/Login';
import Logout from './pages/Logout';
import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import { jwtDecode } from 'jwt-decode';
<<<<<<< HEAD
>>>>>>> 786294e (stash)
=======
=======
=======
>>>>>>> ea905d5 (fix: rebase)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import HomePage from './pages/HomePage';
import MealGeneration from './pages/MealGeneration';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import {jwtDecode} from 'jwt-decode';
<<<<<<< HEAD
>>>>>>> 8ab7809 (navbar)
<<<<<<< HEAD
>>>>>>> ea30318 (fix)
=======
=======
=======
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
>>>>>>> 4f63f89 (fix)
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
>>>>>>> e7cf4a5 (fix: rebase)
=======
<<<<<<< HEAD
>>>>>>> 6ab0837 (fix: rebase)
import Login from './pages/Login';
import Logout from './pages/Logout';
import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import MealGeneration from './pages/MealGeneration';
import Navbar from './components/Navbar'; // Ensure this component exists
import { jwtDecode } from 'jwt-decode';
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 786294e (stash)
>>>>>>> ea905d5 (fix: rebase)
<<<<<<< HEAD
>>>>>>> 13b60af (fix: rebase)
=======
=======
>>>>>>> 4f63f89 (fix)
>>>>>>> e06b45a (fix: rebase)
=======
>>>>>>> e7cf4a5 (fix: rebase)
=======
=======
import Login from './components/Login';
import Logout from './components/Logout';
import HomePage from './pages/HomePage';
import MealGeneration from './pages/MealGeneration';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import {jwtDecode} from 'jwt-decode';
<<<<<<< HEAD
>>>>>>> 8ab7809 (navbar)
<<<<<<< HEAD
>>>>>>> 6ab0837 (fix: rebase)
=======
=======
=======
=======
>>>>>>> ea30318 (fix)
=======
>>>>>>> 13b60af (fix: rebase)
=======
>>>>>>> e06b45a (fix: rebase)
import Login from './pages/Login';
import Logout from './pages/Logout';
import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import { jwtDecode } from 'jwt-decode';
<<<<<<< HEAD
>>>>>>> 786294e (stash)
<<<<<<< HEAD
>>>>>>> 8da6f48 (rebase)
<<<<<<< HEAD
>>>>>>> 124aea9 (rebase: files)
=======
=======
=======
=======
=======
>>>>>>> ea905d5 (fix: rebase)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import HomePage from './pages/HomePage';
import MealGeneration from './pages/MealGeneration';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import {jwtDecode} from 'jwt-decode';
<<<<<<< HEAD
>>>>>>> 8ab7809 (navbar)
<<<<<<< HEAD
>>>>>>> ea30318 (fix)
<<<<<<< HEAD
>>>>>>> fdd5a97 (fix)
<<<<<<< HEAD
>>>>>>> b2f94fa (rebase: files)
=======
=======
=======
=======
=======
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
>>>>>>> 4f63f89 (fix)
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
>>>>>>> e7cf4a5 (fix: rebase)
import Login from './pages/Login';
import Logout from './pages/Logout';
import HomePage from './pages/HomePage';
import Settings from './pages/Settings';
import MealGeneration from './pages/MealGeneration';
import Navbar from './components/Navbar'; // Ensure this component exists
import { jwtDecode } from 'jwt-decode';
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 786294e (stash)
>>>>>>> ea905d5 (fix: rebase)
<<<<<<< HEAD
>>>>>>> 13b60af (fix: rebase)
<<<<<<< HEAD
>>>>>>> 99abbce (fix: rebase)
<<<<<<< HEAD
>>>>>>> 40230a8 (rebase: files)
=======
=======
=======
=======
>>>>>>> 4f63f89 (fix)
>>>>>>> e06b45a (fix: rebase)
<<<<<<< HEAD
>>>>>>> 3df8649 (fix: rebase)
<<<<<<< HEAD
>>>>>>> 407551f (rebase: files)
=======
=======
=======
>>>>>>> e7cf4a5 (fix: rebase)
>>>>>>> 7466bcb (fix: rebase)
>>>>>>> b7b5e39 (rebase: files)

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
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
=======
>>>>>>> ea30318 (fix)
=======
>>>>>>> 13b60af (fix: rebase)
=======
>>>>>>> e06b45a (fix: rebase)
    <div className="App">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div>
          <Logout setUser={setUser} />
          <h1>Welcome, {user.name}!</h1>
          <img src={user.picture} alt="User Profile" />
          <button onClick={toggleSettings}>
            {showSettings ? "Back to Home" : "Settings"}
          </button>
          {showSettings ? (
            <Settings user={user} setUser={setUser} />
          ) : (
            <HomePage />
          )}
        </div>
      )}
    </div>
<<<<<<< HEAD
>>>>>>> 786294e (stash)
=======
=======
=======
>>>>>>> ea905d5 (fix: rebase)
=======
>>>>>>> 4f63f89 (fix)
=======
>>>>>>> e7cf4a5 (fix: rebase)
=======
>>>>>>> 124aea9 (rebase: files)
=======
>>>>>>> b2f94fa (rebase: files)
=======
>>>>>>> 40230a8 (rebase: files)
=======
>>>>>>> 407551f (rebase: files)
=======
>>>>>>> b7b5e39 (rebase: files)
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
<<<<<<< HEAD
            <button onClick={toggleSettings}>
              {showSettings ? "Back to Home" : "Settings"}
            </button>
          </div>
        )}
        
        <Routes>
          <Route path="/" element={showSettings ? <Settings user={user} setUser={setUser} /> : <HomePage />} />
          <Route path="/mealgeneration" element={<MealGeneration />} />
          <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
=======
          </div>
        )}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mealgeneration" element={<MealGeneration />} />
          <Route path="/Settings" element={<Settings />} />
>>>>>>> 8ab7809 (navbar)
        </Routes>
      </div>
    </Router>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 8ab7809 (navbar)
<<<<<<< HEAD
>>>>>>> ea30318 (fix)
=======
=======
=======
>>>>>>> 124aea9 (rebase: files)
=======
=======
>>>>>>> ea30318 (fix)
=======
>>>>>>> 13b60af (fix: rebase)
=======
>>>>>>> e06b45a (fix: rebase)
    <div className="App">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div>
          <Logout setUser={setUser} />
          <h1>Welcome, {user.name}!</h1>
          <img src={user.picture} alt="User Profile" />
          <button onClick={toggleSettings}>
            {showSettings ? "Back to Home" : "Settings"}
          </button>
          {showSettings ? (
            <Settings user={user} setUser={setUser} />
          ) : (
            <HomePage />
          )}
        </div>
      )}
    </div>
<<<<<<< HEAD
>>>>>>> 786294e (stash)
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> ea905d5 (fix: rebase)
<<<<<<< HEAD
>>>>>>> 13b60af (fix: rebase)
=======
=======
>>>>>>> 4f63f89 (fix)
>>>>>>> e06b45a (fix: rebase)
=======
>>>>>>> e7cf4a5 (fix: rebase)
=======
>>>>>>> 124aea9 (rebase: files)
=======
=======
=======
=======
>>>>>>> ea905d5 (fix: rebase)
=======
>>>>>>> 4f63f89 (fix)
=======
>>>>>>> e7cf4a5 (fix: rebase)
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
            <button onClick={toggleSettings}>
              {showSettings ? "Back to Home" : "Settings"}
            </button>
          </div>
        )}
        
        <Routes>
          <Route path="/" element={showSettings ? <Settings user={user} setUser={setUser} /> : <HomePage />} />
          <Route path="/mealgeneration" element={<MealGeneration />} />
          <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
        </Routes>
      </div>
    </Router>
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 8ab7809 (navbar)
<<<<<<< HEAD
>>>>>>> ea30318 (fix)
<<<<<<< HEAD
>>>>>>> b2f94fa (rebase: files)
=======
=======
=======
=======
    <div className="App">
      {!user ? (
        <Login setUser={setUser} />
      ) : (
        <div>
          <Logout setUser={setUser} />
          <h1>Welcome, {user.name}!</h1>
          <img src={user.picture} alt="User Profile" />
          <button onClick={toggleSettings}>
            {showSettings ? "Back to Home" : "Settings"}
          </button>
          {showSettings ? (
            <Settings user={user} setUser={setUser} />
          ) : (
            <HomePage />
          )}
        </div>
      )}
    </div>
>>>>>>> 786294e (stash)
>>>>>>> ea905d5 (fix: rebase)
<<<<<<< HEAD
>>>>>>> 13b60af (fix: rebase)
<<<<<<< HEAD
>>>>>>> 40230a8 (rebase: files)
=======
=======
=======
>>>>>>> 4f63f89 (fix)
>>>>>>> e06b45a (fix: rebase)
<<<<<<< HEAD
>>>>>>> 407551f (rebase: files)
=======
=======
>>>>>>> e7cf4a5 (fix: rebase)
>>>>>>> b7b5e39 (rebase: files)
  );
}

export default App;
