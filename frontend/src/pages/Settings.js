<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
>>>>>>> e7cf4a5 (fix: rebase)
=======
>>>>>>> 6ab0837 (fix: rebase)
=======
>>>>>>> 124aea9 (rebase: files)
=======
>>>>>>> b2f94fa (rebase: files)
=======
>>>>>>> 40230a8 (rebase: files)
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
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 786294e (stash)
=======
=======
>>>>>>> 6ab0837 (fix: rebase)
=======
=======
>>>>>>> 8da6f48 (rebase)
=======
>>>>>>> fdd5a97 (fix)
=======
>>>>>>> 99abbce (fix: rebase)
import React from 'react';

function Settings() {
  return <div><h1>Settings</h1></div>;
<<<<<<< HEAD
>>>>>>> 8ab7809 (navbar)
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> ea30318 (fix)
=======
>>>>>>> 124aea9 (rebase: files)
=======
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
<<<<<<< HEAD
>>>>>>> ea905d5 (fix: rebase)
>>>>>>> 13b60af (fix: rebase)
=======
>>>>>>> e7cf4a5 (fix: rebase)
=======
>>>>>>> 6ab0837 (fix: rebase)
=======
=======
>>>>>>> b2f94fa (rebase: files)
>>>>>>> 786294e (stash)
<<<<<<< HEAD
>>>>>>> 8da6f48 (rebase)
<<<<<<< HEAD
>>>>>>> 124aea9 (rebase: files)
=======
=======
=======
=======
import React from 'react';

function Settings() {
  return <div><h1>Settings</h1></div>;
>>>>>>> 8ab7809 (navbar)
<<<<<<< HEAD
>>>>>>> ea30318 (fix)
<<<<<<< HEAD
>>>>>>> fdd5a97 (fix)
<<<<<<< HEAD
>>>>>>> b2f94fa (rebase: files)
=======
=======
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
>>>>>>> 99abbce (fix: rebase)
>>>>>>> 40230a8 (rebase: files)
}

export default Settings;
