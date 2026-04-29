import { useState } from "react";
import { CheckCircle, Clock, Filter } from "lucide-react";
import TaskItem from "../components/TaskItem"; // Apna purana component reuse karein
import { Layout } from "antd";

const MyTasks = () => {
  const [filter, setFilter] = useState("all"); // all, pending, completed

  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <p className="text-gray-400">Manage your daily workflow</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-xl hover:bg-slate-700">
          <Filter size={18} /> Filter
        </button>
      </div>

      {/* Task List */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
        <div className="space-y-4">
           {/* Yahan aap .map() karke apne tasks list karenge */}
           <TaskItem title="Design Login Page" date="Today" color="bg-blue-500" icon={Layout} />
           <TaskItem title="Fix API Routing" date="Tomorrow" color="bg-purple-500" icon={Layout} />
        </div>
      </div>
    </div>
  );
};

export default MyTasks;