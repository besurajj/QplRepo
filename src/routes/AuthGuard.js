import React from "react";
import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../customHooks/useAuth";
import { ROUTES } from "../utils/constants";

const AuthGuard = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (!auth) {
      <Navigate to="/" />;
    }
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("storage", () => {
      if (localStorage.getItem("token") === null) navigate(ROUTES?.ROOT);
    });
  }, []);

  return auth ? children : <Navigate to={ROUTES?.ROOT} />;
};

export default AuthGuard;
