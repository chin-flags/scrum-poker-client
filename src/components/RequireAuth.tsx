import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/auth";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};

export default RequireAuth;
