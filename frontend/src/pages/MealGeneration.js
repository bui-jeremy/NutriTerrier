import React, { useState, useEffect } from 'react';
import { FaUtensils } from 'react-icons/fa';
import axios from 'axios';
import './MealGeneration.css';

function calculateTotalMacros(mealCategories) {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  mealCategories.forEach(category => {
    if (Array.isArray(category.meals)) {
      category.meals.forEach(meal => {
        totalCalories += parseInt(meal.calories) || 0;
        totalProtein += parseInt(meal.protein) || 0;
        totalCarbs += parseInt(meal.carbs) || 0;
        totalFat += parseInt(meal.fat) || 0;
      });
    }
  });

  return {
    calories: totalCalories,
    protein: totalProtein,
    carbs: totalCarbs,
    fat: totalFat,
  };
}

export function MealGeneration({ user }) {
  const [mealCategories, setMealCategories] = useState([]);
  const [totalMacros, setTotalMacros] = useState({ calories: 0, protein: 0, carbs: 0, fat: 0 });
  const [addedMeals, setAddedMeals] = useState({}); // Track added meals by meal name

  useEffect(() => {
    const fetchMealPlan = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/generate-meal-plan', {
          params: { email: user.email },
        });

        if (Array.isArray(response.data)) {
          const normalizedData = response.data.map(category => ({
            period: category.period,
            meals: [...(category.meals.main_meals || []), ...(category.meals.low_calorie_items || [])]
          }));

          setMealCategories(normalizedData);
          setTotalMacros(calculateTotalMacros(normalizedData));
        } else {
          console.error("Unexpected data structure:", response.data);
        }
      } catch (error) {
        console.error('Failed to fetch meal plan:', error);
      }
    };

    if (user && user.email) {
      fetchMealPlan();
    }
  }, [user.email]);

  const handleAddMeal = async (meal) => {
    try {
      // API request to add the meal to user's data in the database
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/add-meal`, {
        email: user.email,
        meal: {
          name: meal.name,
          calories: parseInt(meal.calories),
          protein: parseInt(meal.protein),
          carbs: parseInt(meal.carbs),
          fat: parseInt(meal.fat),
        }
      });

      // Update the addedMeals state to mark this meal as added
      setAddedMeals((prevState) => ({
        ...prevState,
        [meal.name]: true,
      }));
    } catch (error) {
      console.error('Failed to add meal:', error);
    }
  };

  return (
    <div className="meal-generation">
      <h2>
        <FaUtensils style={{ marginRight: '10px', color: '#ff6b6b' }} />
        Daily Meal Plan
      </h2>
      {mealCategories.length > 0 ? (
        mealCategories.map((category, index) => (
          <div key={index} className="meal-category">
            <div className="meal-title">
              <h3>{category.period ? category.period.charAt(0).toUpperCase() + category.period.slice(1) : "Meal Period"}</h3>
            </div>
            <div className="meal-card-container">
              {Array.isArray(category.meals) && category.meals.length > 0 ? (
                category.meals.map((meal, mealIndex) => (
                  <div key={mealIndex} className="meal-card">
                    <div className="meal-details">
                      <h4>{meal.name || "Unnamed Item"}</h4>
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
                    <div
                      className="meal-add-icon"
                      onClick={() => handleAddMeal(meal)} // Call handleAddMeal on click
                    >
                      {addedMeals[meal.name] ? '×' : '+'}
                    </div>
                  </div>
                ))
              ) : (
                <p>No meals available for this category.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <p>Loading meal plan...</p>
      )}
    </div>
  );
}

export default MealGeneration;
export { calculateTotalMacros };
