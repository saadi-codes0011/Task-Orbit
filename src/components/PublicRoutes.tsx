import { Navigate, Outlet } from "react-router";

const PublicRoutes = () => {
  const token = localStorage.getItem("token");

  // Agar token hai, toh Login/Signup mat dikhao, dashboard par bhej do
  // Agar token nahi hai, toh Outlet (Login/Signup) dikhao
  return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoutes;