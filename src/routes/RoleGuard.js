import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { ROUTES } from "../utils/constants";

const RoleGuard = ({ allowedRoles, children }) => {
  const { role } = useSelector((state) => state.user);

  const isAllowed = allowedRoles?.includes(role);

  return isAllowed ? children : <Navigate to={ROUTES.DASHBOARD} />;
};

export default RoleGuard;
