import { motion, AnimatePresence } from "framer-motion";
import {
  Home, CheckSquare, Folder, MessageCircle, LogOut,
  User
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { message } from "antd";
import { useEffect, useState } from "react";
import { api } from "../api/api";

const Sidebar = ({ open, setOpen }: { open: boolean; setOpen: (val: boolean) => void }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<any>(null);
useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

    } catch (err) {
      console.error("Error fetching user:");
    }
  };

  fetchUser();

  const handleUpdate = () => {
    const updated = localStorage.getItem("user");

    if (updated) {
      setUser(JSON.parse(updated));
    }
  };

  window.addEventListener("userUpdated", handleUpdate);

  return () => {
    window.removeEventListener("userUpdated", handleUpdate);
  };

}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 
    message.success("Logged out successfully");
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", icon: Home, path: "/dashboard" },
    { name: "My Tasks", icon: CheckSquare, path: "/Mytask" },
    { name: "Projects", icon: Folder, path: "/Projects" },
    { name: "Activity", icon: MessageCircle, path: "/Activity" },
    { name: "Profile Settings", icon: User, path: "/profile-settings" }
  ];

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed top-0 left-0 w-72 h-full bg-slate-950 p-6 z-50 flex flex-col"
            >
              <div
                onClick={() => { navigate("/profile-settings"); setOpen(false); }}
                className="flex items-center gap-4 mb-8 cursor-pointer"
              >
                <img
                  src={user?.profilePic || "https://via.placeholder.com/50"}
                  className="w-12 h-12 rounded-full border border-slate-700"
                />
                <div>
                  <p className="text-sm font-medium">
                    {user?.FirstName} {user?.LastName}
                  </p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
              <nav className="flex-1 space-y-3">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <div
                      key={link.name}
                      onClick={() => { navigate(link.path); setOpen(false); }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer ${
                        isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800"
                      }`}
                    >
                      <link.icon size={18} /> {link.name}
                    </div>
                  );
                })}
              </nav>
              <button
                onClick={handleLogout}
                className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl"
              >
                <LogOut size={18} /> Logout
              </button>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
      <aside className="hidden md:flex w-72 bg-slate-950 p-6 flex-col border-r border-slate-800">
        <div
          onClick={() => navigate("/profile-settings")}
          className="flex items-center gap-4 mb-10 cursor-pointer"
        >
          <img
            src={user?.profilePic || "https://via.placeholder.com/50"}
            className="w-12 h-12 rounded-full border border-slate-700"
          />
          <div>
            <p className="text-sm font-medium">
              {user?.FirstName} {user?.LastName}
            </p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
        <nav className="flex-1 space-y-3">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.div
                whileHover={{ x: 5 }}
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer ${
                  isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800"
                }`}
              >
                <link.icon size={18} /> {link.name}
              </motion.div>
            );
          })}
        </nav>
        <button
          onClick={handleLogout}
          className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl"
        >
          <LogOut size={18} /> Logout
        </button>

      </aside>
    </>
  );
};

export default Sidebar;