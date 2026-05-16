import { useEffect, useState } from "react";
import { api } from "../../api/api"; 
import ActivityItem from "./ActivityItem";
import { Trash2 } from "lucide-react"; 
import { message } from "antd";

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

  const handleClearLogs = async () => {
    if (window.confirm("Are you sure you want to clear all history?")) {
      try {
        const token = localStorage.getItem("token");
        await api.delete("/api/activity-logs/clear", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLogs([]);
        message.success("Activity History Cleared");
      } catch (err) {
        console.error("Failed to clear logs:", err);
       message.error("Failed To Clear History");
      }
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 h-[450px] flex flex-col shadow-xl">

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-white tracking-tight">Recent Activity</h3>
        
        {logs.length > 0 && (
          <button 
            onClick={handleClearLogs}
            className="flex items-center gap-1.5 text-xs font-medium text-red-400 hover:text-red-300 transition-colors bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20"
          >
            <Trash2 size={14} />
            Clear All
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar space-y-1">
        {loading ? (
          <div className="flex flex-col gap-3">
             {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-12 w-full bg-slate-900 animate-pulse rounded-xl" />
             ))}
          </div>
        ) : logs.length > 0 ? (
          logs.map((log) => <ActivityItem key={log._id} log={log} />)
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center mb-3">
               <Trash2 className="text-slate-700" size={20} />
            </div>
            <p className="text-gray-500 text-sm">No history found.</p>
            <p className="text-gray-600 text-[10px] mt-1">Your task activities will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivitySection;