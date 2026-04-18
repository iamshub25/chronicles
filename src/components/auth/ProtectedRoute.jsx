import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('admin_token');

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/admin/login" replace />;
  }

  // If token exists, render the child component (e.g., Admin Dashboard)
  return children;
};

export default ProtectedRoute;
