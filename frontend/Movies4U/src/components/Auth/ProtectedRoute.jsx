import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const user = useSelector(state => state.auth.user);
  
  // If there's no user, redirect to the login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If there is a user, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;