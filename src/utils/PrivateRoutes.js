import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
  const isAuthenticated = localStorage.getItem("ACCESS_TOKEN");
  return isAuthenticated ? <Outlet /> : <Navigate to="/unauthorizedPage" />;
}

export default PrivateRoutes;
