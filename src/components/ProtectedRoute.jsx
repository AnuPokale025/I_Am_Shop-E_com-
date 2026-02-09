import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, role, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If role is specified and doesn't match, redirect to appropriate dashboard
  if (requiredRole && role !== requiredRole) {
    if (role === 'USER') {
      return <Navigate to="/" replace />;
    } else if (role === 'VENDOR') {
      return <Navigate to="/vendor/dashboard/stats" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;