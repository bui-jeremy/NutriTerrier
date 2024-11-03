import React, { useEffect, useState } from "react";
import axios from "axios";
import "../App.css";
import "./HomePage.css";

function HomePage({ user }) {
  const [userData, setUserData] = useState({
    currentCalories: 0,
    goalCalories: 2500, // Default values; replace with fetched data
    currentProtein: 0,
    goalProtein: 100,
    currentFat: 0,
    goalFat: 70,
    currentCarbs: 0,
    goalCarbs: 300,
  });
  const [circularProgress, setCircularProgress] = useState(0);
  const [motivation, setMotivation] = useState("");

  const motivationalMessages = [
    "Consistency is key. Keep pushing!",
    "You're stronger than you think!",
    "Every rep brings you closer to your goal.",
    "Believe in yourself and all that you are.",
    "Progress, not perfection. Keep going!",
  ];

  const calculatePercentage = (current, goal) => (current / goal) * 100;

  // Fetch user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/${user.email}`
        );
        const data = response.data;

        // Update user data with values from backend
        setUserData({
          currentCalories: 1500,
          goalCalories: data.calories,
          currentProtein: 50,
          goalProtein: data.protein,
          currentFat: 50, 
          goalFat: data.fat,
          currentCarbs: 100,
          goalCarbs: data.carbs, 
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user && user.email) fetchUserData();
  }, [user]);

  useEffect(() => {
    // Set random motivational message
    setMotivation(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);

    // Animate the circular progress for calories
    const targetCaloriesProgress = calculatePercentage(
      userData.currentCalories,
      userData.goalCalories
    );
    const interval = setInterval(() => {
      setCircularProgress((prev) => {
        if (prev >= targetCaloriesProgress) {
          clearInterval(interval);
          return targetCaloriesProgress;
        }
        return prev + 0.33;
      });
    }, 10);

    return () => clearInterval(interval);
  }, [userData]);

  // Greeting message based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return { message: "Good morning", icon: "☀️" };
    if (hour >= 12 && hour < 18) return { message: "Good afternoon", icon: "🌞" };
    return { message: "Good evening", icon: "🌙" };
  };

  const greeting = getGreeting();

  return (
    <div>
      <div className="content">
        {/* Personalized Greeting */}
        <div className="greeting">
          <span style={{ color: "red" }}>{greeting.message}, {user?.name || "User"}!</span>
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
              "--progress": (circularProgress / 100) * 360,
            }}
          >
            <span className="calories-text">
              {userData.currentCalories}
              <span className="calories-small">
                calories <br /> out of {userData.goalCalories} calories
              </span>
            </span>
          </div>
        </div>

        {/* Protein Progress */}
        <div className="progress-bar-container">
          <div className="progress-bar-label">Protein</div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${calculatePercentage(userData.currentProtein, userData.goalProtein)}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {userData.currentProtein}g / {userData.goalProtein}g (
            {calculatePercentage(userData.currentProtein, userData.goalProtein).toFixed(1)}%)
          </div>
        </div>

        {/* Fat Progress */}
        <div className="progress-bar-container">
          <div className="progress-bar-label">Fat</div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${calculatePercentage(userData.currentFat, userData.goalFat)}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {userData.currentFat}g / {userData.goalFat}g (
            {calculatePercentage(userData.currentFat, userData.goalFat).toFixed(1)}%)
          </div>
        </div>

        {/* Carbs Progress */}
        <div className="progress-bar-container">
          <div className="progress-bar-label">Carbs</div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${calculatePercentage(userData.currentCarbs, userData.goalCarbs)}%` }}
            ></div>
          </div>
          <div className="progress-text">
            {userData.currentCarbs}g / {userData.goalCarbs}g (
            {calculatePercentage(userData.currentCarbs, userData.goalCarbs).toFixed(1)}%)
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
