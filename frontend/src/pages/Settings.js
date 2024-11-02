// Settings.js
import React, { useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import './Settings.css';

import Logout from './Logout';

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

  const handleSave = () => {
    const updatedUser = {
      ...user,
      name,
      diningHall,
      weight,
      height,
      mealPlan,
    };
    setUser(updatedUser);
    updateUser(updatedUser); // You can store the updates in localStorage or send them to a server
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
