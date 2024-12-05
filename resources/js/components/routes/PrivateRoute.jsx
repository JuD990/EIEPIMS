import React from 'react';
import { Navigate } from 'react-router-dom';

// Handle Logout
const handleLogout = () => {
  localStorage.removeItem('authToken');
  window.location.href = '/'; // Redirect to login page after logout
};

// This component checks if the user is authenticated
const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); 

  return isAuthenticated ? children : <Navigate to="/" />;
};

export { handleLogout };
export default PrivateRoute;
