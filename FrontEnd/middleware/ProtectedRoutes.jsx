import { Outlet } from "react-router-dom";
import Login from "../src/pages/Login";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = () => {
  const isAuthorized = useAuth();

  return isAuthorized ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
