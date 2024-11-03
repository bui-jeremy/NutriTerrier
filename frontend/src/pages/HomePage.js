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
  const userName = "Jeremy";

  const motivationalMessages = [
    "Consistency is key. Keep pushing!",
    "You're stronger than you think!",
    "Every rep brings you closer to your goal.",
    "Believe in yourself and all that you are.",
    "Progress, not perfection. Keep going!"
  ];

  const [circularProgress, setCircularProgress] = useState(0);
  const [proteinProgress, setProteinProgress] = useState(0);
  const [fatProgress, setFatProgress] = useState(0);
  const [carbsProgress, setCarbsProgress] = useState(0);
  const [motivation, setMotivation] = useState("");

  const calculatePercentage = (current, goal) => (current / goal) * 100;

  useEffect(() => {
    // Set random motivational message
    setMotivation(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);

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
    }, 10);

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
      return { message: "Good morning", icon: "☀️" };
    } else if (hour >= 12 && hour < 18) {
      return { message: "Good afternoon", icon: "🌞" };
    } else {
      return { message: "Good night", icon: "🌙" };
    }
  };

  const greeting = getGreeting();

  return (
    <div>
      <div className="content">
        {/* Personalized Greeting */}
        <div className="greeting">
          <span style={{ color: "red" }}>{greeting.message}, {userName}</span> 
          <span className="greeting-icon">{greeting.icon}</span>
        </div>
        <div className="motivational-message" style={{ color: "gray", fontSize: "14px", marginBottom: "20px" }}>
          {motivation}
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
              {currentCalories}<span className="calories-small"> calories <br /> out of  {goalCalories} calories</span>
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
      </div>
    </div>
  );
}

export default HomePage;
