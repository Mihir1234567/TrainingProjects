import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Eye, EyeOff, XCircle, Check } from "lucide-react";
import { motion } from "framer-motion";
import DashboardButton from "../../components/common/DashboardButton";
import Toast from "../../components/common/Toast";
import { authAPI } from "../../services/api";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validatePasswordComplexity = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[^A-Za-z0-9]/.test(password),
    };
    return checks;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.currentPassword) {
      newErrors.currentPassword = "Required";
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "Required";
    } else {
      const complexity = validatePasswordComplexity(formData.newPassword);
      if (!complexity.length) {
        newErrors.newPassword = "Minimum 8 characters";
      } else if (
        !complexity.uppercase ||
        !complexity.lowercase ||
        !complexity.number ||
        !complexity.special
      ) {
        newErrors.newPassword = "Password too weak";
      } else if (formData.newPassword === formData.currentPassword) {
        newErrors.newPassword = "Cannot be same as current";
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Required";
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords don't match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (status !== "idle") return;
    if (!validateForm()) return;

    setStatus("loading");
    try {
      await authAPI.changePassword(
        formData.currentPassword,
        formData.newPassword,
      );
      setStatus("success");
      setToast({
        isVisible: true,
        message: "Password changed successfully!",
        type: "success",
      });
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("idle");
      setToast({
        isVisible: true,
        message: error.message || "Failed to change password",
        type: "error",
      });
    }
  };

  const renderInput = (id, label, fieldType) => {
    const isVisible = showPasswords[fieldType];
    return (
      <div className="relative group/field">
        <input
          id={id}
          type={isVisible ? "text" : "password"}
          placeholder=" "
          value={formData[id]}
          onChange={(e) => handleChange(id, e.target.value)}
          className={`peer w-full h-[60px] pl-16 pr-14 bg-white border ${
            errors[id]
              ? "border-red-500 ring-1 ring-red-500/20"
              : "border-slate-100 ring-4 ring-transparent"
          } rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow`}
        />
        <div
          className={`absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
            errors[id]
              ? "bg-red-50 text-red-400"
              : "bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B]"
          }`}
        >
          <Lock size={18} strokeWidth={2.5} />
        </div>

        <button
          type="button"
          onClick={() => togglePasswordVisibility(fieldType)}
          className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#5BBB7B] transition-colors p-1"
        >
          {isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>

        <label
          htmlFor={id}
          className={`absolute left-16 top-1/2 -translate-y-1/2 ${
            errors[id] ? "text-red-400" : "text-slate-400"
          } text-[15px] font-bold transition-all pointer-events-none
                     peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider`}
        >
          {label}
        </label>
        {errors[id] && (
          <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1 animate-fade-in">
            <XCircle size={12} /> {errors[id]}
          </p>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 w-full max-w-5xl mx-auto px-4 md:px-0">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[22px] font-bold text-[#002333]">
          Change Password
        </h2>
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
          <span className="text-[#5BBB7B]">Change Password</span>
        </div>
      </div>

      {/* Main Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[24px] md:rounded-[30px] border border-slate-50 shadow-[0_0_80px_rgba(0,0,0,0.03)] p-6 sm:p-10 xl:p-14 hover:shadow-[0_30px_100px_rgba(0,0,0,0.08)] transition-all group/section"
      >
        <div className="max-w-2xl">
          <h3 className="text-[18px] font-bold text-[#002333] mb-8 pb-2 border-b-2 border-[#5BBB7B] inline-block">
            Change Your Password
          </h3>

          <div className="space-y-6">
            {renderInput("currentPassword", "Current Password", "current")}

            <div className="space-y-4">
              {renderInput("newPassword", "New Password", "new")}

              {/* Complexity Checklist */}
              {formData.newPassword && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4"
                >
                  {[
                    { key: "length", label: "8+ characters" },
                    { key: "uppercase", label: "Uppercase letter" },
                    { key: "lowercase", label: "Lowercase letter" },
                    { key: "number", label: "Number" },
                    { key: "special", label: "Special character" },
                  ].map((rule) => {
                    const isMet = validatePasswordComplexity(
                      formData.newPassword,
                    )[rule.key];
                    return (
                      <div key={rule.key} className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                            isMet
                              ? "bg-[#5BBB7B]/10 text-[#5BBB7B]"
                              : "bg-slate-100 text-slate-300"
                          }`}
                        >
                          <Check size={10} strokeWidth={4} />
                        </div>
                        <span
                          className={`text-[12px] font-bold transition-colors ${
                            isMet ? "text-slate-600" : "text-slate-400"
                          }`}
                        >
                          {rule.label}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </div>

            {renderInput("confirmPassword", "Confirm New Password", "confirm")}

            <div className="pt-4">
              <DashboardButton
                onClick={handleSave}
                status={status}
                defaultText="Save Changes"
                className="!w-auto px-10"
              />
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

export default ChangePassword;
