import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X, AlertCircle } from "lucide-react";

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#002333]/60 backdrop-blur-sm"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-[440px] bg-white rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.25)] overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-2 text-slate-400 hover:text-[#002333] hover:bg-slate-50 rounded-xl transition-all z-10"
          >
            <X size={20} />
          </button>

          <div className="p-8 sm:p-10 text-center">
            {/* Icon */}
            <div className="w-20 h-20 rounded-[28px] bg-red-50 flex items-center justify-center text-red-500 mx-auto mb-8 relative">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 bg-red-100/50 rounded-[28px] -z-10"
              />
              <LogOut size={32} strokeWidth={2.5} />
            </div>

            {/* Title & Description */}
            <h3 className="text-[24px] font-bold text-[#002333] mb-3">
              Logging Out?
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed px-4">
              Are you sure you want to end your session? You'll need to log in
              again to access your dashboard.
            </p>

            {/* Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onClose}
                className="flex-1 h-14 rounded-2xl border-2 border-slate-100 text-slate-400 font-bold hover:bg-slate-50 hover:border-slate-200 hover:text-slate-600 transition-all text-[15px]"
              >
                No, Keep me in
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 h-14 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 shadow-lg shadow-red-500/25 transition-all text-[15px] flex items-center justify-center gap-2 group"
              >
                <LogOut
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
                Yes, Log Out
              </button>
            </div>
          </div>

          {/* Bottom Alert bar */}
          <div className="bg-slate-50 py-4 px-8 flex items-center justify-center gap-2">
            <AlertCircle size={14} className="text-slate-400" />
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Securely ending your session
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LogoutModal;
