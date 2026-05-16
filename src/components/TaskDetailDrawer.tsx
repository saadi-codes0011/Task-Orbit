import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Tag } from "lucide-react";

const TaskDetailDrawer = ({ task, isOpen, onClose }: any) => {
  if (!task) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-slate-900 border-l border-slate-800 z-50 p-8 shadow-2xl overflow-y-auto"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-white">
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-6 text-white pr-8">{task.title}</h2>
            
            <div className="space-y-6">
              <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <h4 className="text-sm text-gray-400 mb-1">Description</h4>
                <p className="text-gray-200">{task.description || "No description provided for this task."}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-xl flex items-center gap-3">
                  <Calendar className="text-blue-500" size={20} />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Deadline</p>
                    <p className="text-sm">{new Date(task.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl flex items-center gap-3">
                  <Tag className="text-emerald-500" size={20} />
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Status</p>
                    <p className="text-sm capitalize">{task.status || "Pending"}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TaskDetailDrawer;