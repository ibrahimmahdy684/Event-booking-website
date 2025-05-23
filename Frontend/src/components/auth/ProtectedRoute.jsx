import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import React from "react";
import LoadingSpinner from "../layout/LoadingSpinner";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
