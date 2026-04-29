import { useEffect, useState } from "react";
import { api } from "../../api/api"; // Path fix: 2 levels up
import ActivityItem from "./ActivityItem";
import { motion } from "framer-motion";

// Interface for type safety
interface Log {
  _id: string;
  action: string;
  taskTitle: string;
  timestamp: string;
  user?: string;
}

const ActivitySection = () => {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/api/activity-logs", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLogs(res.data);
      } catch (err) {
        console.error("Logs fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 h-[400px] overflow-y-auto custom-scrollbar">
      <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
      
      {loading ? (
        <p className="text-gray-500 text-sm">Loading logs...</p>
      ) : logs.length > 0 ? (
        logs.map((log) => <ActivityItem key={log._id} log={log} />)
      ) : (
        <p className="text-gray-500 text-sm">No activity recorded yet.</p>
      )}
    </div>
  );
};

export default ActivitySection;