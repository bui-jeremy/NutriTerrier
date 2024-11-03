import React, { useState } from 'react';
import axios from 'axios';
import { googleLogout } from '@react-oauth/google';
import './Settings.css';
import Logout from './authentication/Logout';

function Settings({ user, setUser, updateUser }) {
  const [name, setName] = useState(user?.name || '');
  const [diningHall, setDiningHall] = useState(user?.diningHall || '');
  const [weight, setWeight] = useState(user?.weight || '');
  const [height, setHeight] = useState(user?.height || '');
  const [mealPlan, setMealPlan] = useState(user?.mealPlan || '');

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem('token');
  };

  const handleSave = async () => {
    const updatedUser = {
      name,
      diningHall,
      weight,
      height,
      mealPlan,
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

        {/* Desired Meal Plan */}
        <label>
          Desired Meal Plan:
          <select
            value={mealPlan}
            onChange={(e) => setMealPlan(e.target.value)}
          >
            <option value="">Select a meal plan</option>
            <option value="Bulk">Bulk</option>
            <option value="Cut">Cut</option>
            <option value="Maintain">Maintain</option>
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
