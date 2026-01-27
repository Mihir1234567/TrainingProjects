import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check } from "lucide-react";

/**
 * Reusable Dashboard Button with "Door" Animation and Status States.
 *
 * @param {Object} props
 * @param {Function} props.onClick - Click handler
 * @param {'idle' | 'loading' | 'success'} props.status - Current state
 * @param {string} [props.defaultText="Save Changes"] - Text to show in idle state
 * @param {string} [props.successText="Saved!"] - Text to show in success state
 * @param {string} [props.className] - Optional class overrides
 */
const DashboardButton = ({
  onClick,
  status = "idle",
  defaultText = "Save Changes",
  successText = "Saved!",
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={status !== "idle"}
      className={`relative w-full sm:min-w-[200px] sm:w-auto h-14 font-bold rounded-[14px] overflow-hidden shadow-lg transition-all duration-300 flex items-center justify-center group/btn-main ${
        status !== "idle"
          ? "bg-slate-400 text-white cursor-default"
          : "bg-[#EFF2FC] text-[#5569CC] group-hover/section:bg-[#5BBB7B] group-hover/section:text-white group-hover/section:shadow-[#5BBB7B]/40 translate-y-0 hover:-translate-y-1"
      } ${className}`}
    >
      <AnimatePresence mode="wait">
        {status === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-2 relative z-10"
          >
            <span className="text-[15px] tracking-wide">{defaultText}</span>
          </motion.div>
        )}
        {status === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="relative z-10"
          >
            <Loader2 className="animate-spin" size={22} strokeWidth={3} />
          </motion.div>
        )}
        {status === "success" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex items-center gap-2 relative z-10"
          >
            <Check size={22} strokeWidth={3} />
            <span className="text-[15px] tracking-wide">{successText}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Door Animation Background */}
      <span className="absolute inset-0 bg-[#083E47] scale-x-0 group-hover/btn-main:scale-x-100 transition-transform duration-500 ease-in-out origin-center -z-0"></span>
      <span className="absolute inset-0 border-2 border-white/20 rounded-[14px] -z-0"></span>
    </button>
  );
};

export default DashboardButton;
