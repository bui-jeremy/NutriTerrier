import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // You can create this CSS file for styling the navbar

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/mealgeneration">Meal Generation</Link>
        <Link to="/settings">Settings</Link>
      </div>
    </nav>
  );
}

export default Navbar;
