import React from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "../store/store"; // Adjust the import based on your store setup
import { useSelector } from "react-redux";

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const token = useSelector((state: RootState) => state.user.token);

  const isAuthenticated = !!token;
  return isAuthenticated ? element : <Navigate to="/" />;
};

export default PrivateRoute;
