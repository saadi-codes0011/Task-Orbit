import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoutes from "../components/ProtectedRoute";
import PublicRoutes from "../components/PublicRoutes";
import MyTasks from "../pages/MyTasks";
import Layout from "../components/Layout";
import Projects from "../pages/Projects";
import TasksPage from "../pages/TasksPage";
import Profile from "../pages/Profile";
import ProfileSettings from "../pages/ProfileSettings";
import Activity from "../pages/Activity";
import NotFound from "../pages/Notfound";

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
            <Route path="/activity" element={<Activity />} />
            <Route path="/mytask" element={<MyTasks />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks/:status" element={<TasksPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}