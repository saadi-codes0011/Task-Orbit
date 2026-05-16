import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import Header from "./Header";
import { api } from "../api/api";

const Layout = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null); 

useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await api.get("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(res.data);
    } catch (err) {
      console.error("User fetch error:");
      setUser(null);
    }
  };

  fetchUser();
}, []);

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
     <Sidebar open={open} setOpen={setOpen} />

      <main className="flex-1 h-screen overflow-y-auto">
        <Header setOpen={setOpen} />
        <Outlet context={{ setOpen, user }} />
      </main>
    </div>
  );
};

export default Layout;