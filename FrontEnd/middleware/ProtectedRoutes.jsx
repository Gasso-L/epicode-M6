import { Outlet } from "react-router-dom";
import Login from "../src/pages/Login";

export const useAuth = () => {
  return localStorage.getItem("token");
};

const ProtectedRoutes = () => {
  const isAuthorized = useAuth();

  return isAuthorized ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
