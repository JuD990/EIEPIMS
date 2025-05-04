import React from 'react';
import { Navigate } from 'react-router-dom';

// Handle Logout
const handleLogout = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('student_id');
  localStorage.removeItem('employee_id');
  window.location.href = '/';
};

// Role-protected route component
const PrivateRoute = ({ children, roles = [] }) => {
  const token = localStorage.getItem('authToken');
  const rawRole = localStorage.getItem('userRole');
  const userRole = rawRole?.trim().toLowerCase();

  if (!token || !userRole) {
    return <Navigate to="/" />;
  }

  if (roles.length > 0 && !roles.includes(userRole)) {
    console.warn(`Unauthorized access attempt: ${userRole} not in [${roles.join(", ")}]`);
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export { handleLogout };
export default PrivateRoute;
