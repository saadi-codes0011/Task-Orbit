import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Menu, Search, Plus, Layout, Bell, Settings} from "lucide-react";
//import Sidebar from "../components/Sidebar"; // Check karein path sahi ho
import { api } from "../api/api";
import AddTaskModal from "../components/AddTaskModal";
import StatsCard from "../components/StatsCard";
import TaskItem from "../components/TaskItem";
import { useNavigate, useOutletContext } from "react-router";
import ActivitySection from "../components/activity/ActivitySection";

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
// const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const { setOpen } = useOutletContext<{ setOpen: (val: boolean) => void }>();

   const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/api/tasks", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(res.data); // Data save ho gaya
      } catch (err) {
        console.log("Error fetching tasks:", err);
      }
    };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Return se pehle ye calculations add karein
  const completedTasks = tasks.filter((t: any) => t.status === "completed").length;

  return (
    <div className="flex min-h-screen bg-gray-950 text-white overflow-hidden">

      {/* 1. Sidebar Component (Mobile & Desktop handle karega) */}
      {/* <Sidebar open={open} setOpen={setOpen} /> */}

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
          <StatsCard
            title="Assignee Tasks"
            value="05"
            color="from-purple-600 to-pink-500"
            onClick={() => navigate('/tasks/assignee')}
          />
          <StatsCard
            title="Total Tasks"
            value={tasks.length}
            color="bg-indigo-600"
            onClick={() => navigate('/tasks/all')}
          />
          <StatsCard
            title="Overdue"
            value="12"
            color="bg-rose-500"
            onClick={() => navigate('/tasks/overdue')}
          />
          <StatsCard
            title="Completed"
            value={completedTasks}
            color="bg-emerald-500"
            onClick={() => navigate('/tasks/completed')}
          />
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
                {tasks.length > 0 ? (
                  tasks.map((task: any) => (
                    <TaskItem
                      key={task._id} // MongoDB ka unique ID use karein
                      title={task.title}
                      date={new Date(task.createdAt).toLocaleDateString()}
                      icon={Layout}
                      color="bg-blue-500" onEdit={function (): void {
                        throw new Error("Function not implemented.");
                      } } onDelete={function (): void {
                        throw new Error("Function not implemented.");
                      } }                    />
                  ))
                ) : (
                  <p className="text-gray-500 text-center">No tasks found</p>
                )}
              </div>

            </motion.div>
          </div>

          {/* Right Column (Actions & Users) */}
          <div className="space-y-6">
            <ActivitySection />
            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold transition-all group">
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
      <AddTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={async (title: string) => {
         try {
      const token = localStorage.getItem("token");
      
      // 1. Task POST request bhejein
      await api.post("/api/tasks", { title }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 2. Refresh karein (Naya data fetch karein)
      fetchTasks(); 

      // 3. Modal band karein
      setIsModalOpen(false);
      
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task");
    }
        }} 
      />
    </div>
  );
};
export default Dashboard;