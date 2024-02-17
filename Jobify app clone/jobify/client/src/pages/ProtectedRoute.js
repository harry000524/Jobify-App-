import React from 'react';
import { useAppContext } from '../context/appContext';
import { Navigate } from 'react-router-dom';
import { Loader } from '../components';

function ProtectedRoute({ children }) {
  const { user, userLoading } = useAppContext();

  if (userLoading) {
    return <Loader />;
  }
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
}

export default ProtectedRoute;
