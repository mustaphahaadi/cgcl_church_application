import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, userData } = useAuth();
  
  // Check if user is logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has the required role
  const userRole = userData?.role || "user";
  
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

export default RoleBasedRoute;