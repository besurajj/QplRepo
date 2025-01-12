import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../customHooks/useAuth";
import { ROUTES } from "../utils/constants";

const NoAuthGaurd = ({ children }) => {
  const auth = useAuth();
  return !auth ? children : <Navigate to={ROUTES.EXAM_MANAGEMENT} />;
};

export default NoAuthGaurd;
