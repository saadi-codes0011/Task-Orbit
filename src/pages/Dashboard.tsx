import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Layout, Bell, CheckCircle } from "lucide-react";
import { api } from "../api/api";
import AddTaskModal from "../components/AddTaskModal";
import StatsCard from "../components/StatsCard";
import TaskItem from "../components/TaskItem";
import { useNavigate } from "react-router";
import ActivitySection from "../components/activity/ActivitySection";
import AnalyticsChart from "../components/AnalyticsChart";
import { message } from "antd";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

const Dashboard = () => {
  const [tasks, setTasks] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const navigate = useNavigate()
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:");
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const completedTasks = tasks.filter((t: any) => t.status === "completed").length;

  const overdueTasks = tasks.filter((task: any) => {
    return (
      task.deadline &&
      new Date(task.deadline).getTime() < Date.now() &&
      task.status !== "completed"
    );
  }).length;

  const filteredTasks = tasks.filter((task: any) => {

    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const isOverdue =
      task.deadline &&
      new Date(task.deadline).getTime() < Date.now() &&
      task.status !== "completed";

    if (filterStatus === "Completed") {
      return matchesSearch && task.status === "completed";
    }

    if (filterStatus === "Pending") {
      return matchesSearch && task.status === "pending";
    }

    if (filterStatus === "Overdue") {
      return matchesSearch && isOverdue;
    }

    return matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-gray-950 text-white overflow-hidden">
      <main className="flex-1 h-screen overflow-y-auto p-4 md:p-8 space-y-8 custom-scrollbar">

        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-sm text-gray-500 hidden md:block">Welcome back,</p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 lg:w-80 pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:ring-2 focus:ring-blue-500/50 outline-none transition-all"
              />
            </div>

            <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-gray-400 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
            </button>
          </div>
        </header>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <StatsCard
            title="Assignee Tasks"
            value={tasks.length}
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
            value={overdueTasks}
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <AnalyticsChart />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-700 to-indigo-900 overflow-hidden shadow-2xl shadow-blue-500/10"
            >
              <div className="absolute w-64 h-64 bg-blue-400 blur-[100px] opacity-20 -right-20 -top-20" />
              <div className="relative z-10">
                <h2 className="text-2xl font-bold">Boost your productivity</h2>
                <p className="text-blue-100 mt-2 max-w-md">
                  You have {tasks.length} tasks recorded. Keep pushing forward!
                </p>
                <button onClick={() => navigate("/Mytask")} className="mt-6 px-6 py-2.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors">
                  View Tasks
                </button>
              </div>
            </motion.div>
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl"
            >

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <h3 className="text-lg font-semibold">Current Projects</h3>
                <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                  {["All", "Pending", "Completed", "Overdue"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${filterStatus === status ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                        }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>


              <div className="space-y-4">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task: any) => (
                    <div
                      key={task._id}
                      className="relative"
                    >
                      <TaskItem
                        title={task.title}
                        date={new Date(task.deadline).toLocaleDateString()}
                        icon={Layout}

                        color={
                          task.status === "completed"
                            ? "bg-emerald-500"
                            : "bg-blue-500"
                        }

                        onEdit={() => { }}

                        onDelete={() => { }}

                        onComplete={() => { }}

                        isCompleted={task.status === "completed"}

                        hideMenu={true}
                      />
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center">
                    No tasks found
                  </p>
                )}
              </div>
            </motion.div>
          </div>
          <div className="space-y-8">
            <ActivitySection />

            <div className="grid grid-cols-1 gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-2xl flex items-center justify-center gap-3 font-semibold transition-all group"
              >
                <Plus size={20} className="group-hover:rotate-90 transition-transform" /> New Task
              </button>
            </div>
            <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-6 shadow-2xl">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl rounded-full" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">

                  <div>
                    <p className="text-sm text-gray-400">
                      Productivity Score
                    </p>

                    <h2 className="text-4xl font-bold mt-1">
                      92%
                    </h2>
                  </div>

                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <CheckCircle size={26} className="text-blue-400" />
                  </div>

                </div>
                <div className="mb-6">

                  <div className="flex justify-between text-xs text-gray-400 mb-2">
                    <span>Weekly Progress</span>
                    <span>92/100</span>
                  </div>

                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-[92%] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                  </div>

                </div>
                <div className="grid grid-cols-2 gap-4">

                  <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
                    <p className="text-xs text-gray-400 mb-1">
                      Tasks Done
                    </p>

                    <h3 className="text-2xl font-bold text-emerald-400">
                      {completedTasks}
                    </h3>
                  </div>

                  <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4">
                    <p className="text-xs text-gray-400 mb-1">
                      Pending
                    </p>

                    <h3 className="text-2xl font-bold text-yellow-400">
                      {tasks.length - completedTasks}
                    </h3>
                  </div>

                </div>
                <div className="mt-6 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/10">
                  <p className="text-sm text-blue-300 leading-relaxed">
                    Your productivity increased by <span className="font-bold text-white">18%</span> this week. Keep maintaining your workflow
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={async (taskData: any) => {
          try {
            const token = localStorage.getItem("token");

            await api.post(
              "/api/tasks",
              taskData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            fetchTasks();
            message.success("Task Added Successfully");

            setIsModalOpen(false);

          } catch (error) {
            console.error("Error adding task:", error);
            message.error("Failed to add task");
          }
        }}
      />
    </div>
  );
};

export default Dashboard;