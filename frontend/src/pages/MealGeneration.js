import React, { useState } from 'react';
import { FaUtensils } from 'react-icons/fa'; // Add icons for better visuals
import './MealGeneration.css';

function MealGeneration() {
  // Placeholder meal data for breakfast, lunch, and dinner
  const mealCategories = [
    {
      title: 'Breakfast',
      meals: [
        { name: 'Oatmeal with Berries', calories: '250 kcal' },
        { name: 'Scrambled Eggs', calories: '200 kcal' },
      ],
    },
    {
      title: 'Lunch',
      meals: [
        { name: 'Grilled Chicken Salad', calories: '450 kcal' },
        { name: 'Turkey Sandwich', calories: '300 kcal' },
      ],
    },
    {
      title: 'Dinner',
      meals: [
        { name: 'Steak and Vegetables', calories: '600 kcal' },
        { name: 'Salmon with Rice', calories: '500 kcal' },
      ],
    },
  ];

  return (
    <div className="meal-generation">
      <h2>
        <FaUtensils style={{ marginRight: '10px', color: '#ff6b6b' }} />
        Active Meals
      </h2>
      {mealCategories.map((category, index) => (
        <div key={index} className="meal-category">
          <div className="meal-title">
            <h3>{category.title}</h3>
          </div>
          <div className="meal-card-container">
            {category.meals.map((meal, mealIndex) => (
              <div key={mealIndex} className="meal-card">
                <div className="meal-details">
                  <h4>{meal.name}</h4>
                  <p>{meal.calories}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MealGeneration;
