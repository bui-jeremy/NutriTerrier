// src/components/HomePage.js

import React from 'react';
import './HomePage.css';

const HomePage = () => {
  // Sample data (you can replace this with props or state)
  const caloriesEaten = 1500;
  const calorieGoal = 2000;
  const proteinEaten = 80;
  const proteinGoal = 100;
  const fatEaten = 50;
  const fatGoal = 70;

  // Calculate percentages
  const caloriePercentage = (caloriesEaten / calorieGoal) * 100;
  const proteinPercentage = (proteinEaten / proteinGoal) * 100;
  const fatPercentage = (fatEaten / fatGoal) * 100;

  return (
    <div className="homepage">
      {/* User profile section */}
      <div className="user-profile">
        <img src="/path-to-user-image.jpg" alt="User" className="profile-image" />
        <h2>User Name</h2>
      </div>

      {/* Circular progress bar for calories */}
      <div className="calorie-progress">
        <svg className="circle" width="100" height="100">
          <circle cx="50" cy="50" r="45" className="circle-bg" />
          <circle
            cx="50"
            cy="50"
            r="45"
            className="circle-fg"
            strokeDasharray="282.6" // Circumference of circle = 2 * π * r
            strokeDashoffset={282.6 - (282.6 * caloriePercentage) / 100}
          />
        </svg>
        <div className="calorie-text">
          <p>{caloriesEaten} / {calorieGoal} kcal</p>
        </div>
      </div>

      {/* Progress bars for protein and fat */}
      <div className="nutrient-progress">
        <div className="progress-container">
          <p>Protein: {proteinEaten}g / {proteinGoal}g</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${proteinPercentage}%` }}></div>
          </div>
        </div>
        <div className="progress-container">
          <p>Fat: {fatEaten}g / {fatGoal}g</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${fatPercentage}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
