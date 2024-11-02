<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import React from 'react';

function Settings() {
  return <div><h1>Settings</h1></div>;
=======
=======
>>>>>>> ea30318 (fix)
=======
>>>>>>> 13b60af (fix: rebase)
import React, { useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import './Settings.css';

import Logout from './Logout';

function Settings({ user, setUser, updateUser }) {
  const [name, setName] = useState(user?.name || '');
  const [diningHall, setDiningHall] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [mealPlan, setMealPlan] = useState('');

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
    alert("Settings saved!");
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Preferred Dining Hall:
          <input
            type="text"
            value={diningHall}
            onChange={(e) => setDiningHall(e.target.value)}
          />
        </label>
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
        <label>
          Desired Meal Plan:
          <input
            type="text"
            value={mealPlan}
            onChange={(e) => setMealPlan(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleSave}>
          Save Changes
        </button>
      </form>
      <Logout setUser={setUser} />
    </div>
  );
<<<<<<< HEAD
>>>>>>> 786294e (stash)
=======
=======
import React from 'react';

function Settings() {
  return <div><h1>Settings</h1></div>;
>>>>>>> 8ab7809 (navbar)
<<<<<<< HEAD
>>>>>>> ea30318 (fix)
=======
=======
import React, { useState } from 'react';
import { googleLogout } from '@react-oauth/google';
import './Settings.css';

import Logout from './Logout';

function Settings({ user, setUser, updateUser }) {
  const [name, setName] = useState(user?.name || '');
  const [diningHall, setDiningHall] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [mealPlan, setMealPlan] = useState('');

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
    alert("Settings saved!");
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      <form>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Preferred Dining Hall:
          <input
            type="text"
            value={diningHall}
            onChange={(e) => setDiningHall(e.target.value)}
          />
        </label>
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <label>
          Height (cm):
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>
        <label>
          Desired Meal Plan:
          <input
            type="text"
            value={mealPlan}
            onChange={(e) => setMealPlan(e.target.value)}
          />
        </label>
        <button type="button" onClick={handleSave}>
          Save Changes
        </button>
      </form>
      <Logout setUser={setUser} />
    </div>
  );
>>>>>>> ea905d5 (fix: rebase)
>>>>>>> 13b60af (fix: rebase)
}

export default Settings;
