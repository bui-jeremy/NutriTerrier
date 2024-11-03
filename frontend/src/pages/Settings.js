import React, { useState } from 'react';
import axios from 'axios';
import { googleLogout } from '@react-oauth/google';
import './Settings.css';
import Logout from './authentication/Logout';

function Settings({ user, setUser, updateUser }) {
  const [name, setName] = useState(user?.name || '');
  const [email] = useState(user?.email || ''); // Read-only email from user object
  const [gender, setGender] = useState(user?.gender || '');
  const [age, setAge] = useState(user?.age || '');
  const [weight, setWeight] = useState(user?.weight || '');
  const [height, setHeight] = useState(user?.height || '');
  const [activityLevel, setActivityLevel] = useState(user?.activityLevel || '');
  const [goal, setGoal] = useState(user?.goal || '');
  const [weightChange, setWeightChange] = useState(user?.weightChange || ''); // New state for weight change amount
  const [diningHall, setDiningHall] = useState(user?.diningHall || '');

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem('token');
  };

  const handleSave = async () => {
    const updatedUser = {
      name,
      email, // Add email to payload
      age,
      gender,
      weight,
      height,
      activityLevel,
      goal,
      weightChange, // Include weight change in the payload
      diningHall,
    };

    try {
      // Send POST request to backend API
      await axios.post('http://localhost:8000/api/user/settings', updatedUser);
      setUser(updatedUser);
      updateUser(updatedUser); // Optionally update user locally
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings.');
    }
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

        {/* Email (read-only) */}
        <label>
          Email:
          <input
            type="email"
            value={email}
            readOnly // Make the email read-only
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
          />
        </label>

        {/* Weight */}
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>

        {/* Height */}
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>

        {/* Amount of Weight to Gain/Lose */}
        <label>
          Amount of Weight to Gain/Lose (kg):
          <input
            type="number"
            value={weightChange}
            onChange={(e) => setWeightChange(e.target.value)}
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
            <option value="Intense exercise 6-7 times/week">Intense exercise 6-7 times/week</option>
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