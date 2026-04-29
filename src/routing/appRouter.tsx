import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoutes from "../components/ProtectedRoute";
import PublicRoutes from "../components/PublicRoutes";
import Messages from "../pages/Messages";
import MyTasks from "../pages/MyTasks";
import Layout from "../components/Layout";
import Projects from "../pages/Projects";
import TasksPage from "../pages/TasksPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Messages" element={<Messages />} />
            <Route path="/Mytask" element={<MyTasks />} />
            <Route path="/Projects" element={<Projects />} />
            // Router mein ye add karein
           <Route path="/tasks/:status" element={<TasksPage />} />
          </Route>
        </Route>

        {/* 404 Page (Optional): Agar koi galat URL dale */}
        <Route path="*" element={<div className="text-white text-center mt-20">404 - Orbit Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}