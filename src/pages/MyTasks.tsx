import { useEffect, useState } from "react";
import TaskItem from "../components/TaskItem";
import { Layout } from "lucide-react";
import { api } from "../api/api";

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);


  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/api/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(res.data);

    } catch (error) {
      console.error("Error fetching tasks", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6 md:p-8 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-gray-400">Manage your daily workflow</p>
        </div>
      </div>
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
        <div className="space-y-4">

          {tasks.map((task: any) => (
            <TaskItem
              key={task._id}
              title={task.title}
              date={new Date(task.deadline).toLocaleDateString()}
              color="bg-blue-500"
              icon={Layout}
              onEdit={() => { }}
              onDelete={() => { }}
              onComplete={() => { }}
              isCompleted={task.status === "completed"}
              hideMenu={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyTasks;