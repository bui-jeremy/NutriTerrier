import React from "react";
import "../App.css"; // Import App.css for the navbar styling
import "./HomePage.css"; // Import HomePage-specific styles

function HomePage() {
  const currentCalories = 1900;
  const goalCalories = 2500;
  const currentProtein = 60; // current grams of protein
  const goalProtein = 100; // goal grams of protein
  const currentFat = 30; // current grams of fat
  const goalFat = 70; // goal grams of fat

  const calculatePercentage = (current, goal) => (current / goal) * 100;

  // Greeting message based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      return { message: "Good morning!", icon: "☀️" }; // Rising sunshine icon
    } else if (hour >= 12 && hour < 18) {
      return { message: "Good afternoon!", icon: "🌞" }; // Sunshine icon
    } else {
      return { message: "Good night!", icon: "🌙" }; // Moon icon
    }
  };

  const greeting = getGreeting();

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <h1>Nutrition Tracker</h1>
      </div>

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
                (currentCalories / goalCalories) * 360
              }deg, #ddd 0deg)`,
            }}
          >
            <span className="calories-text">
              {currentCalories} / {goalCalories}
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
              style={{ width: `${calculatePercentage(currentProtein, goalProtein)}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {currentProtein}g / {goalProtein}g (
            {calculatePercentage(currentProtein, goalProtein).toFixed(1)}%)
          </div>
        </div>

        {/* Fat Progress */}
        <div className="progress-bar-container">
          <div className="progress-bar-label">Fat</div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${calculatePercentage(currentFat, goalFat)}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {currentFat}g / {goalFat}g (
            {calculatePercentage(currentFat, goalFat).toFixed(1)}%)
          </div>
        </div>

        {/* Additional Content */}
        <p className="text">Track your daily calorie and macro intake!</p>
      </div>
    </div>
  );
}

export default HomePage;
