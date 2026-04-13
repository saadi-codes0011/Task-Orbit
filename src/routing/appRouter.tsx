import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoutes from "../components/ProtectedRoute";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
      
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<Dashboard/> } />
        </Route>

        {/* 404 Page (Optional): Agar koi galat URL dale */}
        <Route path="*" element={<div className="text-white text-center mt-20">404 - Orbit Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}