import { motion } from "framer-motion";
import { type LucideIcon, MoreVertical, Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

interface TaskItemProps {
  title: string;
  date: string;
  icon: LucideIcon;
  color: string;
  onEdit: () => void;
  onDelete: () => void;
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const TaskItem = ({ title, date, icon: Icon, color, onEdit, onDelete }: TaskItemProps) => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div
      variants={item}
      whileHover={{ x: 5 }}
      className="flex items-center justify-between p-4 bg-slate-950/50 hover:bg-slate-800 rounded-2xl border border-slate-800/50 cursor-pointer transition-all"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-xl ${color} shadow-lg`}>
          <Icon size={20} className="text-white" />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-xs text-gray-500">Deadline: {date}</p>
        </div>
      </div>

      {/* Menu Icon */}
      <div className="relative">
        <button 
          onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }} 
          className="p-2 hover:bg-slate-800 rounded-full transition-colors"
        >
          <MoreVertical size={20} className="text-gray-400" />
        </button>
        
        {showMenu && (
          <div className="absolute right-0 top-8 bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-2 w-32 z-20" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => { onEdit(); setShowMenu(false); }} className="flex items-center gap-2 w-full p-2 hover:bg-slate-700 rounded text-sm"><Edit2 size={14}/> Edit</button>
            <button onClick={() => { onDelete(); setShowMenu(false); }} className="flex items-center gap-2 w-full p-2 hover:bg-slate-700 rounded text-sm text-red-400"><Trash2 size={14}/> Delete</button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TaskItem;