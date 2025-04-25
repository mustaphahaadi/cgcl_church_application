
import { createContext, useContext, useEffect } from "react";
import PropTypes from 'prop-types';
import { useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  // Define token storage keys
  const ACCESS_TOKEN_KEY = 'access_token';
  const REFRESH_TOKEN_KEY = 'refresh_token';
  const USER_KEY = 'user';

  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const checkAuth = () => {
      try{
        // Check for tokens
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
        const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

        if (!accessToken || !refreshToken) {
          setIsLoggedIn(false);
          setUser(null);
          return;
        }

        const userStr = localStorage.getItem(USER_KEY);
        if (userStr) {
          const _userData = JSON.parse(userStr);
          setUser(_userData);
          setIsLoggedIn(true);
        } else {
          // If no user data but tokens exist, could decode JWT here
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        // Clear potentially corrupted data
        logout();
      } 
    };

    checkAuth();
  },[])

  // Login function
  const login = (userdata, accessToken, refreshToken)  => {
    // Store tokens
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    
    // Store user data
    localStorage.setItem(USER_KEY, JSON.stringify(userdata));
    
    // Update state
    setUser(userdata);
    setIsLoggedIn(true);
    
  };

  // Logout function
  const logout = () => {
    // Clear storage
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    
    // Update state
    setUser(null);
    setIsLoggedIn(false);
    
    console.log("User logged out");
  };

  const value = {
    user,
    setUser,
    isLoggedIn,
    setIsLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};