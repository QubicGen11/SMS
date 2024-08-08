// src/config/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const role = Cookies.get('role');
  const authToken = Cookies.get('authToken');
  // If there's no role or authToken, redirect to login
  if (!role && !authToken) {
    return <Navigate to="/" />;
  }
  // If role or authToken exists, render the Component
  return Component;
};

export default ProtectedRoute;
