import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading, initialized } = useAuth();

  console.log('ProtectedRoute - user:', user, 'loading:', loading, 'initialized:', initialized);

  // Wait for auth initialization to complete
  if (!initialized) {
    console.log('ProtectedRoute - auth not initialized, showing loading');
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (!user) {
    console.log('ProtectedRoute - no user, redirecting to /login');
    return <Navigate to="/login" replace />;
  }

  console.log('ProtectedRoute - user found, rendering children');
  return children;
};

export default ProtectedRoute;