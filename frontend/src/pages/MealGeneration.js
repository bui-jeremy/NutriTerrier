import React from 'react';
import { FaUtensils } from 'react-icons/fa';
import './MealGeneration.css';

const mealCategories = [
  {
    title: 'Breakfast',
    meals: [
      { name: 'Oatmeal with Berries', calories: '250', protein: '5', carbs: '45', fat: '3' },
      { name: 'Scrambled Eggs', calories: '200', protein: '12', carbs: '2', fat: '14' },
    ],
  },
  {
    title: 'Lunch',
    meals: [
      { name: 'Grilled Chicken Salad', calories: '450', protein: '35', carbs: '20', fat: '15' },
      { name: 'Turkey Sandwich', calories: '300', protein: '20', carbs: '30', fat: '10' },
    ],
  },
  {
    title: 'Dinner',
    meals: [
      { name: 'Steak and Vegetables', calories: '600', protein: '40', carbs: '25', fat: '30' },
      { name: 'Salmon with Rice', calories: '500', protein: '35', carbs: '40', fat: '20' },
    ],
  },
];

function calculateTotalMacros(mealCategories) {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  mealCategories.forEach(category => {
    category.meals.forEach(meal => {
      totalCalories += parseInt(meal.calories);
      totalProtein += parseInt(meal.protein);
      totalCarbs += parseInt(meal.carbs);
      totalFat += parseInt(meal.fat);
    });
  });

  return {
    calories: totalCalories,
    protein: totalProtein,
    carbs: totalCarbs,
    fat: totalFat,
  };
}

export function MealGeneration() {
  const totalMacros = calculateTotalMacros(mealCategories);

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
                      <span>{meal.calories} kcal</span>
                    </div>
                    <div className="macro-item">
                      <span className="macro-dot macro-protein-dot"></span>
                      <span>{meal.protein}g protein</span>
                    </div>
                    <div className="macro-item">
                      <span className="macro-dot macro-carbs-dot"></span>
                      <span>{meal.carbs}g carbs</span>
                    </div>
                    <div className="macro-item">
                      <span className="macro-dot macro-fat-dot"></span>
                      <span>{meal.fat}g fat</span>
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
export { calculateTotalMacros, mealCategories };
