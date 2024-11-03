import React from 'react';
import { FaUtensils } from 'react-icons/fa'; // Add icons for better visuals
import './MealGeneration.css';

function MealGeneration() {
  const meals = [
    { name: 'Meal 1', calories: '600 kcal' },
    { name: 'Meal 2', calories: '750 kcal' },
    { name: 'Meal 3', calories: '500 kcal' },
  ];

  return (
    <div className="meal-generation">
      <h2>
        <FaUtensils style={{ marginRight: '10px', color: '#ff6b6b' }} />
        Active Meals
      </h2>
      {meals.map((meal, index) => (
        <div key={index} className="meal-card">
          <div className="meal-details">
            <h3>{meal.name}</h3>
            <p>{meal.calories}</p>
          </div>
          <div className="meal-menu">
            <div className="menu-icon">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MealGeneration;
