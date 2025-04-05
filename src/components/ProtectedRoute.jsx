import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
  const { setIsLoggedIn, loading } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (!accessToken || !refreshToken) {
      setIsLoggedIn(false); // Update state here, outside the render phase
      setShouldRedirect(true); // Trigger a redirect flag
    }
  }, [setIsLoggedIn]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (shouldRedirect) {
    return <Navigate to="/login" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
