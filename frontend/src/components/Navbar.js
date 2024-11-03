import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUtensils, FaBook, FaCog } from 'react-icons/fa';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/" className="nav-icon">
          <FaHome />
          <span className="nav-text">Home</span>
        </Link>
        <Link to="/mealgeneration" className="nav-icon">
          <FaUtensils />
          <span className="nav-text">Food</span>
        </Link>
        <Link to="/catalog" className="nav-icon">
          <FaBook />
          <span className="nav-text">Catalog</span>
        </Link>
        <Link to="/settings" className="nav-icon">
          <FaCog />
          <span className="nav-text">Settings</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
