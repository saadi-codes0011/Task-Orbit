import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Menu, Search, Plus, Smartphone, Layout, Bell, Settings, 
  CheckSquare
} from "lucide-react";
import Sidebar from "../components/Sidebar"; // Check karein path sahi ho

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-950 text-white overflow-hidden">
      
      {/* 1. Sidebar Component (Mobile & Desktop handle karega) */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* 2. Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto p-4 md:p-8 space-y-8 custom-scrollbar">
        
        {/* --- HEADER --- */}
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Menu 
              className="md:hidden cursor-pointer text-gray-400 hover:text-white" 
              onClick={() => setOpen(true)} 
            />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-sm text-gray-500 hidden md:block">Welcome back, Saad Ahmed!</p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                placeholder="Search anything..."
                className="w-48 lg:w-80 pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
              />
            </div>
            
            <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-gray-400 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
            </button>
          </div>
        </header>

        {/* --- STATS SECTION --- */}
        <motion.div 
          variants={container} 
          initial="hidden" 
          animate="show" 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatsCard title="Assignee Tasks" value="05" color="from-purple-600 to-pink-500" />
          <StatsCard title="Total Tasks" value="45" color="bg-indigo-600" />
          <StatsCard title="Overdue" value="12" color="bg-rose-500" />
          <StatsCard title="Completed" value="38" color="bg-emerald-500" />
        </motion.div>

        {/* --- BOTTOM GRID (Tasks & Right Panel) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Welcome & Task List) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Welcome Banner */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-900 overflow-hidden shadow-2xl shadow-blue-500/10"
            >
              <div className="absolute w-64 h-64 bg-blue-400 blur-[100px] opacity-20 -right-20 -top-20" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold">Boost your productivity 🚀</h2>
                <p className="text-blue-100 mt-2 max-w-md">
                  You have 5 tasks to complete today. Stay focused and reach your goals.
                </p>
                <button className="mt-6 px-6 py-2.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                  View Tasks
                </button>
              </div>
            </motion.div>

            {/* Task List Container */}
            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Current Projects</h3>
                <button className="text-sm text-blue-400 hover:underline">View All</button>
              </div>

              <div className="space-y-4">
                <TaskItem title="Saadi Codes Portfolio" date="Apr 15" icon={Layout} color="bg-blue-500" />
                <TaskItem title="Task Orbit Backend" date="Apr 18" icon={Smartphone} color="bg-purple-500" />
                <TaskItem title="SMIT Assignment" date="Apr 20" icon={CheckSquare} color="bg-emerald-500" />
              </div>
            </motion.div>
          </div>

          {/* Right Column (Actions & Users) */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
               <button className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold transition-all group">
                <Plus size={20} className="group-hover:rotate-90 transition-transform" /> New Task
              </button>
              <button className="w-full bg-slate-800 hover:bg-slate-700 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold transition-all">
                <Settings size={20} /> Settings
              </button>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl">
              <h3 className="font-semibold mb-6">Active Team</h3>
              <div className="space-y-5">
                {["Saad Ahmed", "Ali Khan", "Sara Smith"].map((user, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 border-2 border-slate-800" />
                      <div>
                        <p className="font-medium text-sm">{user}</p>
                        <p className="text-xs text-green-400">Online</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const StatsCard = ({ title, value, color }: any) => (
  <motion.div 
    variants={item} 
    whileHover={{ y: -5 }}
    className={`p-6 rounded-3xl ${color.includes('from') ? `bg-gradient-to-r ${color}` : color} shadow-lg`}
  >
    <p className="text-sm font-medium opacity-80 uppercase tracking-wider">{title}</p>
    <div className="flex items-end justify-between mt-2">
      <h2 className="text-4xl font-bold">{value}</h2>
      <div className="h-2 w-16 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white/40 w-2/3" />
      </div>
    </div>
  </motion.div>
);

const TaskItem = ({ title, date, icon: Icon, color }: any) => (
  <motion.div
    variants={item}
    whileHover={{ x: 10 }}
    className="flex items-center justify-between p-4 bg-slate-950/50 hover:bg-slate-800 rounded-2xl border border-slate-800/50 cursor-pointer transition-all"
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl ${color} shadow-lg`}>
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-xs text-gray-500">Deadline: {date}</p>
      </div>
    </div>
    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]" />
  </motion.div>
);

export default Dashboard;