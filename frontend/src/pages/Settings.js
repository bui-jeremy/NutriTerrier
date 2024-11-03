// src/pages/Settings.js
import React, { useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import './Settings.css';

import Logout from '../pages/authentication/Logout';

function Settings({ user, setUser, updateUser }) {
  // State variables for user inputs
  const [name, setName] = useState(user?.name || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [age, setAge] = useState(user?.age || '');
  const [weight, setWeight] = useState(user?.weight || '');
  const [height, setHeight] = useState(user?.height || '');
  const [activityLevel, setActivityLevel] = useState(user?.activityLevel || '');
  const [goal, setGoal] = useState(user?.goal || '');
  const [targetWeight, setTargetWeight] = useState(user?.targetWeight || ''); // New target weight field
  const [diningHall, setDiningHall] = useState(user?.diningHall || '');

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  };

  const handleSave = () => {
    // Input validation
    if (!name || !gender || !age || !weight || !height || !activityLevel || !goal || !targetWeight) {
      alert('Please fill in all required fields.');
      return;
    }

    // Additional validation based on API requirements
    if (age < 1 || age > 80) {
      alert('Age must be between 1 and 80.');
      return;
    }
    if (weight < 40 || weight > 160) {
      alert('Weight must be between 40 kg and 160 kg.');
      return;
    }
    if (height < 130 || height > 230) {
      alert('Height must be between 130 cm and 230 cm.');
      return;
    }

    const updatedUser = {
      ...user,
      name,
      gender,
      age,
      weight,
      height,
      activityLevel,
      goal,
      targetWeight, // Include the new field
      diningHall,
    };

    setUser(updatedUser);
    updateUser(updatedUser); // Updates user data and persists it
    alert('Settings saved!');
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <form>
        {/* Name */}
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        {/* Gender */}
        <label>
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        {/* Age */}
        <label>
          Age (years):
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            max="80"
          />
        </label>

        {/* Weight */}
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            min="40"
            max="160"
          />
        </label>

        {/* Height */}
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            min="130"
            max="230"
          />
        </label>

        {/* Target Weight */}
        <label>
          Target Weight (kg):
          <input
            type="number"
            value={targetWeight}
            onChange={(e) => setTargetWeight(e.target.value)}
            min="40"
            max="160"
          />
        </label>

        {/* Activity Level */}
        <label>
          Activity Level:
          <select
            value={activityLevel}
            onChange={(e) => setActivityLevel(e.target.value)}
          >
            <option value="">Select activity level</option>
            <option value="Sedentary">Sedentary: little or no exercise</option>
            <option value="Exercise 1-3 times/week">Exercise 1-3 times/week</option>
            <option value="Exercise 4-5 times/week">Exercise 4-5 times/week</option>
            <option value="Daily exercise or intense exercise 3-4 times/week">
              Daily exercise or intense exercise 3-4 times/week
            </option>
            <option value="Intense exercise 6-7 times/week">
              Intense exercise 6-7 times/week
            </option>
            <option value="Very intense exercise daily, or physical job">
              Very intense exercise daily, or physical job
            </option>
          </select>
        </label>

        {/* Fitness Goal */}
        <label>
          Fitness Goal:
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          >
            <option value="">Select your goal</option>
            <option value="Maintain">Maintain</option>
            <option value="Cut">Cut</option>
            <option value="Bulk">Bulk</option>
          </select>
        </label>

        {/* Preferred Dining Hall */}
        <label>
          Preferred Dining Hall:
          <select
            value={diningHall}
            onChange={(e) => setDiningHall(e.target.value)}
          >
            <option value="">Select a dining hall</option>
            <option value="Warren Dining Hall">Warren Dining Hall</option>
            <option value="Marciano Dining Hall">Marciano Dining Hall</option>
            <option value="West Dining Hall">West Dining Hall</option>
          </select>
        </label>

        {/* Save Changes Button */}
        <button type="button" onClick={handleSave}>
          Save Changes
        </button>
      </form>

      {/* Logout Button */}
      <Logout setUser={setUser} />
    </div>
  );
}

export default Settings;