import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import { useState } from "react";
import Header from "./Header";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      {/* Sidebar hamesha yahan rahega */}
      <Sidebar open={open} setOpen={setOpen} />
      
      {/* Content Area - Outlet ka matlab hai "yahan child route load hoga" */}
      <main className="flex-1 h-screen overflow-y-auto">
        <Header setOpen={setOpen} />
        <Outlet context={{ setOpen }} />
      </main>
    </div>
  );
};
export default Layout;