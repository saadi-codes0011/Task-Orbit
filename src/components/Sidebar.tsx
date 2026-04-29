import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, CheckSquare, Folder, MessageCircle, X, LogOut 
} from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { message } from "antd";

const Sidebar = ({ open, setOpen }: { open: boolean; setOpen: (val: boolean) => void }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    message.success("Logged out successfully");
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", icon: Home, path: "/dashboard" },
    { name: "My Tasks", icon: CheckSquare, path: "/Mytask" },
    { name: "Projects", icon: Folder, path: "/Projects" },
    { name: "Messages", icon: MessageCircle, path: "/Messages" },
  ];

  return (
    <>
      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed top-0 left-0 w-72 h-full bg-slate-950 p-6 z-50 md:hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-bold text-xl text-blue-400">Task Orbit</h2>
                <X onClick={() => setOpen(false)} className="cursor-pointer" />
              </div>
              
              <nav className="flex-1 space-y-3">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <div 
                      key={link.name} 
                      onClick={() => { navigate(link.path); setOpen(false); }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
                        isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-slate-800"
                      }`}
                    >
                      <link.icon size={18} /> {link.name}
                    </div>
                  );
                })}
              </nav>

              <button onClick={handleLogout} className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all">
                <LogOut size={18} /> Logout
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-72 bg-slate-950 p-6 flex-col border-r border-slate-800/50">
        <h2 className="font-bold text-2xl mb-10 text-blue-400 tracking-tight">Task Orbit</h2>
        
        <nav className="flex-1 space-y-3">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.div
                whileHover={{ x: 6 }}
                key={link.name}
                onClick={() => navigate(link.path)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${
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
          className="mt-auto flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium"
        >
          <LogOut size={18} /> Logout
        </button>
      </aside>
    </>
  );
};

export default Sidebar;