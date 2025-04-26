import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleBasedRoute = ({ children,allowedRoles }) => {
  const { isLoggedIn, user } = useAuth();
  
  // Check if user is logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  // Fetch existing sermons

  // Check if user has the required role
  const userData = JSON.parse(localStorage.getItem("user"))
  const userRole = userData.role;
  console.log(userRole,allowedRoles.includes(userRole))
  console.log(user)

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

export default RoleBasedRoute;