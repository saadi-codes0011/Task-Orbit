import { useState } from "react";

const AddTaskModal = ({ isOpen, onClose, onAdd }: any) => {
  const [title, setTitle] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl w-96 shadow-2xl">
        <h2 className="text-xl font-bold mb-4 text-white">Add New Task</h2>
        <input 
          type="text" 
          placeholder="Task title..."
          className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl mb-4 text-white outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 bg-slate-800 rounded-xl text-white">Cancel</button>
          <button 
            onClick={() => { onAdd(title); setTitle(""); }} 
            className="flex-1 py-2 bg-blue-600 rounded-xl text-white"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;