import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/login"} state={{ from: location }} />;
    //it keeps track of the route they were trying to access before being redirected to the login page.
  }
  return children;
};

export default ProtectedRoute;
