import React from 'react';
import { googleLogout } from '@react-oauth/google';

function Logout({ setUser }) {
  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem('token');
    // Clear any other application-specific data
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
