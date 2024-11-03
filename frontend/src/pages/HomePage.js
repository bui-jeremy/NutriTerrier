import React, { useState, useEffect } from "react";
import "../App.css"; // Import App.css for the navbar styling
import "./HomePage.css"; // Import HomePage-specific styles
import { googleLogout } from '@react-oauth/google';
import axios from "axios";

function HomePage() {
  const [calories, setCalories] = useState(0);
  const [macros, setMacros] = useState({ protein: 0, carbs: 0, fat: 0 });
  const userEmail = localStorage.getItem("userEmail")
  const calculatePercentage = (current, goal) => (current / goal) * 100;

  // Fetch nutrition data from the backend on component mount
  useEffect(() => {
    const fetchNutritionPlan = async () => {
      try {
        if (userEmail) {
          const response = await axios.post("http://localhost:8000/run-python", {
            email: userEmail  // Send email as an identifier
          });

          const { calories, macros } = response.data.nutrition_plan;
          setCalories(calories);
          setMacros(macros);
        }
      } catch (error) {
        console.error("Error fetching nutrition plan:", error);
      }
    };

    fetchNutritionPlan();
  }, [userEmail]);

  // Greeting message based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      return { message: "Good morning!", icon: "☀️" };
    } else if (hour >= 12 && hour < 18) {
      return { message: "Good afternoon!", icon: "🌞" };
    } else {
      return { message: "Good night!", icon: "🌙" };
    }
  };

  const greeting = getGreeting();

  return (
    <div>
      <div className="content">
        {/* Greeting Message */}
        <div className="greeting">
          {greeting.message}
          <span className="greeting-icon">{greeting.icon}</span>
        </div>

        {/* User Profile and Circular Progress */}
        <div className="user-profile">
          <div
            className="circular-progress"
            style={{
              background: `conic-gradient(#FF6347 ${
                (calories / 2500) * 360
              }deg, #ddd 0deg)`,
            }}
          >
            <span className="calories-text">
              {calories.toFixed(0)} / 2500
              <br />
              calories
            </span>
          </div>
        </div>

        {/* Protein Progress */}
        <div className="progress-bar-container">
          <div className="progress-bar-label">Protein</div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${calculatePercentage(macros.protein, 100)}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {macros.protein.toFixed(1)}g / 100g (
            {calculatePercentage(macros.protein, 100).toFixed(1)}%)
          </div>
        </div>

        {/* Carbs Progress */}
        <div className="progress-bar-container">
          <div className="progress-bar-label">Carbs</div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${calculatePercentage(macros.carbs, 300)}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {macros.carbs.toFixed(1)}g / 300g (
            {calculatePercentage(macros.carbs, 300).toFixed(1)}%)
          </div>
        </div>

        {/* Fat Progress */}
        <div className="progress-bar-container">
          <div className="progress-bar-label">Fat</div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${calculatePercentage(macros.fat, 70)}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {macros.fat.toFixed(1)}g / 70g (
            {calculatePercentage(macros.fat, 70).toFixed(1)}%)
          </div>
        </div>

        {/* Additional Content */}
        <p className="text">Track your daily calorie and macro intake!</p>
      </div>
    </div>
  );
}

export default HomePage;
