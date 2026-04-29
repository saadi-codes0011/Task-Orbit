import { motion } from "framer-motion";
import { Clock, CheckCircle2, Pencil, Trash2 } from "lucide-react";

const getIcon = (action: string) => {
  switch (action) {
    case "completed": return <CheckCircle2 size={16} className="text-emerald-500" />;
    case "updated": return <Pencil size={16} className="text-blue-500" />;
    case "deleted": return <Trash2 size={16} className="text-red-500" />;
    default: return <Clock size={16} className="text-gray-500" />;
  }
};

const ActivityItem = ({ log }: any) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    className="flex items-center gap-3 p-3 border-b border-slate-800 last:border-none"
  >
    <div className="p-2 bg-slate-800 rounded-lg">
      {getIcon(log.action)}
    </div>
    <div className="flex-1">
      <p className="text-sm text-gray-300">
        <span className="font-semibold text-white">{log.user || "You"}</span> {log.action} task 
        <span className="text-blue-400"> {log.taskTitle}</span>
      </p>
      <p className="text-[10px] text-gray-500">{new Date(log.timestamp).toLocaleTimeString()}</p>
    </div>
  </motion.div>
);

export default ActivityItem;