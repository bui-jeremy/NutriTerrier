import React, { useEffect, useState } from "react";
import "../App.css";
import "./HomePage.css";

function HomePage() {
  const currentCalories = 1900;
  const goalCalories = 2500;
  const currentProtein = 60;
  const goalProtein = 100;
  const currentFat = 30;
  const goalFat = 70;
  const currentCarbs = 150;
  const goalCarbs = 300;

  const calculatePercentage = (current, goal) => (current / goal) * 100;

  // States to control animated progress
  const [circularProgress, setCircularProgress] = useState(0);
  const [proteinProgress, setProteinProgress] = useState(0);
  const [fatProgress, setFatProgress] = useState(0);
  const [carbsProgress, setCarbsProgress] = useState(0);

  useEffect(() => {
    // Animate the circular progress for calories
    const targetCaloriesProgress = calculatePercentage(currentCalories, goalCalories);
    const interval = setInterval(() => {
      setCircularProgress((prev) => {
        if (prev >= targetCaloriesProgress) {
          clearInterval(interval);
          return targetCaloriesProgress;
        }
        return prev + 0.33; // Adjust the increment to control speed
      });
    }, 10); // Adjust the interval to control speed

    // Animate the linear progress for each nutrient
    setTimeout(() => setProteinProgress(calculatePercentage(currentProtein, goalProtein)), 200);
    setTimeout(() => setFatProgress(calculatePercentage(currentFat, goalFat)), 400);
    setTimeout(() => setCarbsProgress(calculatePercentage(currentCarbs, goalCarbs)), 600);

    return () => clearInterval(interval);
  }, []);

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

        {/* Circular Progress for Calories */}
        <div className="user-profile">
          <div
            className="circular-progress"
            style={{
              "--progress": (circularProgress / 100) * 360
            }}
          >
            <span className="calories-text">
              {currentCalories} / {goalCalories} <br />
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
              style={{ width: `${proteinProgress}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {currentProtein}g / {goalProtein}g ({proteinProgress.toFixed(1)}%)
          </div>
        </div>

        {/* Fat Progress */}
        <div className="progress-bar-container">
          <div className="progress-bar-label">Fat</div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${fatProgress}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {currentFat}g / {goalFat}g ({fatProgress.toFixed(1)}%)
          </div>
        </div>

        {/* Carbs Progress */}
        <div className="progress-bar-container">
          <div className="progress-bar-label">Carbs</div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${carbsProgress}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {currentCarbs}g / {goalCarbs}g ({carbsProgress.toFixed(1)}%)
          </div>
        </div>

        {/* Additional Content */}
        <p className="text">Track your daily calorie and macro intake!</p>
      </div>
    </div>
  );
}

export default HomePage;
