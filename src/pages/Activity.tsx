import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  Trash2,
  MoreVertical,
  Clock,
  Pencil,
} from "lucide-react";
import { api } from "../api/api";
import { message } from "antd";

const ActivityPage = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const fetchLogs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/api/activity-logs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLogs(res.data);
    } catch (err) {
      console.error("Activity fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);
  const handleDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/api/activity-logs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLogs((prev) => prev.filter((item) => item._id !== id));

    } catch (err) {
      message.error("Failed To Delete Activity");
    }
  };

  const getIcon = (action: string) => {
    switch (action) {
      case "created":
        return <Activity className="text-blue-400" size={18} />;

      case "completed":
        return <CheckCircle2 className="text-emerald-400" size={18} />;

      case "updated":
        return <Pencil className="text-yellow-400" size={18} />;

      case "deleted":
        return <Trash2 className="text-red-400" size={18} />;

      default:
        return <Clock className="text-purple-400" size={18} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-8">

      <div className="mb-10">

        <div className="flex items-center gap-3 mb-3">

          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Activity size={22} />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Activity Feed
            </h1>

            <p className="text-gray-400 text-sm mt-1">
              Recent updates from your workspace
            </p>
          </div>

        </div>
      </div>
      {loading ? (
        <div className="space-y-4">

          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-24 rounded-3xl bg-slate-900 animate-pulse border border-slate-800"
            />
          ))}

        </div>
      ) : logs.length === 0 ? (

        <div className="h-[60vh] flex flex-col items-center justify-center text-center">

          <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mb-5">
            <Activity className="text-slate-700" size={32} />
          </div>

          <h2 className="text-xl font-semibold text-gray-300">
            No Activity Yet
          </h2>

          <p className="text-gray-500 text-sm mt-2 max-w-sm">
            Your recent task and workspace activities will appear here.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {logs.map((log, index) => (

            <motion.div
              key={log._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="group relative rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-5 hover:border-blue-500/40 hover:bg-slate-900 transition-all duration-300 shadow-xl"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/5 to-purple-500/5" />

              <div className="relative flex items-start gap-4">

                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                  {getIcon(log.action)}
                </div>
                <div className="flex-1">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p className="text-sm md:text-base text-gray-200 leading-relaxed">

                        <span className="font-semibold text-white">
                          {log.user || "You"}
                        </span>

                        <span className="mx-1 text-gray-400">
                          {log.action || "performed"}
                        </span>

                        <span className="text-blue-400 font-medium">
                          {log.taskTitle || "Untitled Task"}
                        </span>

                      </p>

                      <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">

                        <Clock size={13} />

                        <span>
                          {log.timestamp
                            ? new Date(log.timestamp).toLocaleString()
                            : "Just now"}
                        </span>

                      </div>

                    </div>
                    <div className="relative">

                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu === log._id ? null : log._id
                          )
                        }
                        className="p-2 rounded-xl hover:bg-slate-800 transition"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openMenu === log._id && (
                        <div className="absolute right-0 mt-2 w-40 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden z-50">

                          <button
                            onClick={() => handleDelete(log._id)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition"
                          >
                            <Trash2 size={16} />
                            Delete Activity
                          </button>

                        </div>
                      )}

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>
          ))}

        </div>
      )}
    </div>
  );
};

export default ActivityPage;