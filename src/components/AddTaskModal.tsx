import { useState } from "react";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (task: {
    title: string;
    deadline: string;
    status: string;
  }) => void;
}

const AddTaskModal = ({
  isOpen,
  onClose,
  onAdd,
}: AddTaskModalProps) => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");

  if (!isOpen) return null;

  const handleAdd = () => {
    if (!title.trim() || !deadline) return;

    onAdd({
      title,
      deadline: new Date(deadline).toISOString(),
      status: "pending",
    });

    setTitle("");
    setDeadline("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-900 border border-slate-700 p-8 rounded-3xl w-full max-w-md shadow-2xl">

        <h2 className="text-xl font-bold mb-5 text-white">
          Add New Task
        </h2>
        <input
          type="text"
          placeholder="Task title..."
          className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl mb-4 text-white outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          className="w-full bg-slate-800 border border-slate-700 p-3 rounded-xl mb-4 text-white outline-none"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 bg-slate-800 rounded-xl text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleAdd}
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