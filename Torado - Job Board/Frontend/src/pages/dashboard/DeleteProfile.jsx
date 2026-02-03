import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  AlertTriangle,
  XCircle,
  CheckCircle2,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardButton from "../../components/common/DashboardButton";
import Toast from "../../components/common/Toast";
import { authAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const DeleteProfile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [confirmText, setConfirmText] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [reason, setReason] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const handleDelete = async () => {
    if (status !== "idle") return;

    if (!isChecked) {
      setError("Please confirm that you understand the consequences.");
      return;
    }

    if (confirmText.toUpperCase() !== "DELETE") {
      setError('Please type "DELETE" to confirm.');
      return;
    }

    if (!password) {
      setError("Please enter your password to confirm deletion.");
      return;
    }

    setError("");
    setStatus("loading");

    try {
      await authAPI.deleteAccount(password);
      setStatus("success");
      setToast({
        isVisible: true,
        message: "Account deleted successfully. Redirecting...",
        type: "success",
      });
      // Logout and redirect after short delay
      setTimeout(async () => {
        await logout();
        navigate("/");
      }, 2000);
    } catch (err) {
      setStatus("idle");
      setError(err.message || "Failed to delete account");
      setToast({
        isVisible: true,
        message: err.message || "Failed to delete account",
        type: "error",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full max-w-5xl mx-auto px-4 md:px-0">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[22px] font-bold text-[#002333]">Delete Profile</h2>
        <div className="flex items-center gap-2 text-[13px] text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#5BBB7B] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to="/user-dashboard"
            className="hover:text-[#5BBB7B] transition-colors"
          >
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-[#5BBB7B]">Delete Profile</span>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[24px] md:rounded-[30px] border border-red-50 shadow-[0_0_80px_rgba(255,0,0,0.02)] p-6 sm:p-10 xl:p-14 hover:shadow-[0_30px_100px_rgba(255,0,0,0.05)] transition-all"
      >
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500">
              <AlertTriangle size={24} />
            </div>
            <h3 className="text-[18px] font-bold text-[#002333]">
              Delete My Account
            </h3>
          </div>

          <div className="bg-red-50/50 border border-red-100 rounded-2xl p-6 mb-8 text-left">
            <p className="text-red-600 font-bold mb-2 flex items-center gap-2">
              <XCircle size={16} /> Warning: This action is permanent!
            </p>
            <p className="text-red-500/80 text-[14px] leading-relaxed">
              When you delete your account, you will lose access to all your
              saved jobs, posted resumes, and application history. This data
              cannot be recovered.
            </p>
          </div>

          <div className="space-y-6">
            {/* Reason */}
            <div className="relative group/field">
              <textarea
                placeholder=" "
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="peer w-full min-h-[120px] pl-5 pr-5 py-6 bg-white border border-slate-100 ring-4 ring-transparent rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-red-500/50 focus:ring-red-500/5 transition-all focus-glow resize-y"
              ></textarea>
              <label
                className="absolute left-5 top-6 text-slate-400 text-[15px] font-bold transition-all pointer-events-none
                           peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-red-500 peer-focus:bg-white peer-focus:px-2
                           peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider"
              >
                Why are you leaving? (Optional)
              </label>
            </div>

            {/* Confirmation Text */}
            <div className="relative group/field">
              <input
                type="text"
                placeholder=" "
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="peer w-full h-[60px] pl-5 pr-5 bg-white border border-slate-100 ring-4 ring-transparent rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-red-500/50 focus:ring-red-500/5 transition-all focus-glow"
              />
              <label
                className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 text-[13px] sm:text-[15px] font-bold transition-all pointer-events-none
                           peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-red-500 peer-focus:bg-white peer-focus:px-2
                           peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider"
              >
                Type <span className="text-red-500 font-extrabold">DELETE</span>{" "}
                to confirm
              </label>
            </div>

            {/* Password Confirmation */}
            <div className="relative group/field">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center bg-red-50 text-red-400">
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="peer w-full h-[60px] pl-16 pr-14 bg-white border border-slate-100 ring-4 ring-transparent rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-red-500/50 focus:ring-red-500/5 transition-all focus-glow"
              />
              <label
                className="absolute left-16 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] font-bold transition-all pointer-events-none
                           peer-focus:top-0 peer-focus:left-5 peer-focus:text-[11px] peer-focus:text-red-500 peer-focus:bg-white peer-focus:px-2
                           peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:left-5 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider"
              >
                Enter Password to Confirm
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-4 p-4 rounded-xl border border-slate-50 hover:border-red-100 transition-all cursor-pointer group/check">
              <div className="relative pt-1">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => setIsChecked(e.target.checked)}
                  className="peer appearance-none w-5 h-5 rounded-md border-2 border-slate-200 checked:bg-red-500 checked:border-red-500 transition-all cursor-pointer"
                />
                <CheckCircle2
                  size={14}
                  className="absolute left-0.5 top-1.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                />
              </div>
              <span className="text-[14px] text-slate-500 font-medium group-hover/check:text-[#002333] transition-colors leading-relaxed">
                I understand that account deletion is permanent and all my data
                will be removed from Torado servers.
              </span>
            </label>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-500 text-sm font-bold flex items-center gap-2 pl-1"
                >
                  <AlertTriangle size={14} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
              <DashboardButton
                onClick={handleDelete}
                status={status}
                defaultText="Delete My Account"
                className="!w-auto px-10 !bg-red-500 hover:!bg-red-600 shadow-red-500/20"
              />
              <Link
                to="/user-dashboard"
                className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Keep my account
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

export default DeleteProfile;
