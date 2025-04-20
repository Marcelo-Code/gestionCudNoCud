import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";

export const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(GeneralContext);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};
