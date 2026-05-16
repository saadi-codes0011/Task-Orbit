import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { api } from "../api/api";
import TaskItem from "../components/TaskItem";
import TaskDetailDrawer from "../components/TaskDetailDrawer";
import ConfirmModal from "../components/ConfirmModal";
import { Layout } from "lucide-react";
import { message } from "antd";

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
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedTask, setSelectedTask] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<any>(null);
  const [editingTask, setEditingTask] = useState<any>(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.get("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      message.error("Error fetching tasks:")
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (task: any) => {
    const originalStatus = task.status;
    const newStatus = originalStatus === "completed" ? "pending" : "completed";

    setTasks((prev: any) =>
      prev.map((t: any) => (t._id === task._id ? { ...t, status: newStatus } : t))
    );

    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/api/tasks/${task._id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      message.success(
        newStatus === "completed"
          ? "Task Completed Successfully"
          : "Task Marked As Pending"
      );
    } catch (err) {
      message.error("Failed to update task:")
      setTasks((prev: any) =>
        prev.map((t: any) => (t._id === task._id ? { ...t, status: originalStatus } : t))
      );
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/tasks/${taskToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks((prev: any) =>
        prev.filter((t: any) => t._id !== taskToDelete._id)
      );
      setIsDeleteModalOpen(false);
      message.success("Task Deleted Successfully");
    } catch (err) {
      message.error("Delete Failed")
    }
  };

  const handleEdit = async () => {
    try {

      const token = localStorage.getItem("token");

      await api.put(
        `/api/tasks/${editingTask._id}`,
        {
          title: updatedTitle,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();

      setEditingTask(null);
      message.success("Task Updated Successfully");

    } catch (error) {
      message.error("Edit failed")
    }
  };



  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task: any) => {

    const isOverdue =
      new Date(task.deadline) < new Date() &&
      task.status !== "completed";

    if (status === "all") {
      return true;
    }

    if (status === "completed") {
      return task.status === "completed";
    }

    if (status === "overdue") {
      return isOverdue;
    }

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

                  date={new Date(task.deadline).toLocaleDateString()}

                  icon={Layout}

                  color={
                    task.status === "completed"
                      ? "bg-emerald-500"
                      : "bg-blue-500"
                  }

                  onDelete={() => {
                    setTaskToDelete(task);
                    setIsDeleteModalOpen(true);
                  }}

                  onEdit={() => {
                    setEditingTask(task);
                    setUpdatedTitle(task.title);
                  }}

                  onComplete={() => handleToggleTask(task)}

                  isCompleted={task.status === "completed"}
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

      {editingTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

          <div className="bg-slate-900 p-6 rounded-2xl w-[400px] border border-slate-700">

            <h2 className="text-xl font-semibold mb-4">
              Edit Task
            </h2>

            <input
              type="text"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 outline-none"
            />

            <div className="flex justify-end gap-3 mt-5">

              <button
                onClick={() => setEditingTask(null)}
                className="px-4 py-2 rounded-xl bg-slate-700"
              >
                Cancel
              </button>

              <button
                onClick={handleEdit}
                className="px-4 py-2 rounded-xl bg-blue-600"
              >
                Save
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default TasksPage;