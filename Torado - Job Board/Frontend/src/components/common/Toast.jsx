import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

const Toast = ({
  message,
  type = "success",
  isVisible,
  onClose,
  duration = 3000,
}) => {
  useEffect(() => {
    if (isVisible && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[9999] w-[calc(100%-2rem)] max-w-[400px]"
        >
          <div
            className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] border bg-white ${
              type === "success" ? "border-[#5BBB7B]" : "border-red-200"
            }`}
          >
            {type === "success" ? (
              <CheckCircle className="text-[#5BBB7B]" size={24} />
            ) : (
              <XCircle className="text-red-500" size={24} />
            )}

            <div className="flex flex-col">
              <span className="text-[15px] font-bold text-[#002333]">
                {type === "success" ? "Success!" : "Error"}
              </span>
              <span className="text-[14px] text-slate-500">{message}</span>
            </div>

            <button
              onClick={onClose}
              className="ml-4 p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
            >
              <X size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
