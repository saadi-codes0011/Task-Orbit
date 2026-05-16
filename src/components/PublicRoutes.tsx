import { Navigate, Outlet } from "react-router";

const PublicRoutes = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoutes;