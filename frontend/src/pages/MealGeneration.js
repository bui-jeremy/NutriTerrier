import React, { useState } from 'react';
import { FaUtensils } from 'react-icons/fa'; // Add icons for better visuals
import './MealGeneration.css';

function MealGeneration() {
  // Placeholder meal data for breakfast, lunch, and dinner with macro information
  const mealCategories = [
    {
      title: 'Breakfast',
      meals: [
        { name: 'Oatmeal with Berries', calories: '250 kcal', protein: '5g', carbs: '45g', fat: '3g' },
        { name: 'Scrambled Eggs', calories: '200 kcal', protein: '12g', carbs: '2g', fat: '14g' },
      ],
    },
    {
      title: 'Lunch',
      meals: [
        { name: 'Grilled Chicken Salad', calories: '450 kcal', protein: '35g', carbs: '20g', fat: '15g' },
        { name: 'Turkey Sandwich', calories: '300 kcal', protein: '20g', carbs: '30g', fat: '10g' },
      ],
    },
    {
      title: 'Dinner',
      meals: [
        { name: 'Steak and Vegetables', calories: '600 kcal', protein: '40g', carbs: '25g', fat: '30g' },
        { name: 'Salmon with Rice', calories: '500 kcal', protein: '35g', carbs: '40g', fat: '20g' },
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
                  <p>1 serving</p>
                  <div className="meal-macros">
                    <div className="macro-item">
                      <span className="macro-dot macro-calories-dot"></span>
                      <span>{meal.calories}</span>
                    </div>
                    <div className="macro-item">
                      <span className="macro-dot macro-protein-dot"></span> {/* Ensure this is correct */}
                      <span>{meal.protein}</span>
                    </div>
                    <div className="macro-item">
                      <span className="macro-dot macro-carbs-dot"></span>
                      <span>{meal.carbs}</span>
                    </div>
                    <div className="macro-item">
                      <span className="macro-dot macro-fat-dot"></span>
                      <span>{meal.fat}</span>
                    </div>
                  </div>
                </div>
                <div className="meal-add-icon">+</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MealGeneration;
