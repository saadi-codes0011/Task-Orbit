import { motion, AnimatePresence } from "framer-motion";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
}: ConfirmModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-slate-900 border border-slate-700 p-6 rounded-2xl w-full max-w-sm z-10"
          >
            <h3 className="text-xl font-bold text-white mb-2">
              Delete Task?
            </h3>

            <p className="text-gray-400 mb-6">
              Are you sure you want to delete "{title}"? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 rounded-lg bg-slate-800 text-white"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={onConfirm}
                className="flex-1 py-2 rounded-lg bg-red-600 text-white font-bold"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;