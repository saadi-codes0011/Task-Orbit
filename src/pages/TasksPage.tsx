import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { api } from "../api/api";
import TaskItem from "../components/TaskItem";
import TaskDetailDrawer from "../components/TaskDetailDrawer";
import ConfirmModal from "../components/ConfirmModal"; // Import ConfirmModal
import { Layout } from "lucide-react";

// VIP Loader Component
const Loader = () => (
  <div className="flex justify-center items-center h-[50vh]">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      className="w-12 h-12 border-4 border-transparent border-t-blue-500 border-b-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
    />
  </div>
);

const TasksPage = () => {
  const { status } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Drawer & Modal States
  const [selectedTask, setSelectedTask] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<any>(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.log("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  // 1. Status Toggle Logic (Optimistic UI)
  const handleToggleTask = async (task: any) => {
    const originalStatus = task.status;
    const newStatus = originalStatus === "completed" ? "pending" : "completed";

    setTasks((prev: any) =>
      prev.map((t: any) => (t._id === task._id ? { ...t, status: newStatus } : t))
    );

    try {
      const token = localStorage.getItem("token");
      await api.patch(`/api/tasks/${task._id}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("Failed to update task:", err);
      setTasks((prev: any) =>
        prev.map((t: any) => (t._id === task._id ? { ...t, status: originalStatus } : t))
      );
    }
  };

  // 2. Delete Logic
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/tasks/${taskToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter((t: any) => t._id !== taskToDelete._id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    fetchTasks();
  }, [status]);

  const filteredTasks = tasks.filter((task: any) => {
    if (status === "all") return true;
    if (status === "completed") return task.status === "completed";
    if (status === "overdue") return task.status === "overdue";
    return true;
  });

  return (
    <div className="p-8 text-white min-h-screen bg-slate-950">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 capitalize"
      >
        {status?.replace("-", " ")} Tasks
      </motion.h1>
      
      {loading ? (
        <Loader />
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task: any) => (
              <div 
                key={task._id} 
                onClick={() => handleTaskClick(task)} 
                className="cursor-pointer"
              >
                <TaskItem
                  title={task.title}
                  date={new Date(task.createdAt).toLocaleDateString()}
                  icon={Layout}
                  color="bg-blue-500"
                  status={task.status} // Pass status
                  onToggle={() => handleToggleTask(task)} // Pass toggle
                  onDelete={() => { setTaskToDelete(task); setIsDeleteModalOpen(true); }} // Pass delete
                  onEdit={() => console.log("Edit logic here")} // Placeholder for Edit
                />
              </div>
            ))
          ) : (
            <div className="text-center mt-20 text-gray-500">
              <p>No tasks found in this category.</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Drawers & Modals */}
      <TaskDetailDrawer 
        task={selectedTask} 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
      />

      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        title={taskToDelete?.title}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default TasksPage;