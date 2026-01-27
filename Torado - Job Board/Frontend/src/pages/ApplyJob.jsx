import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  FileText,
  Upload,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useMockData } from "../context/MockDataContext";
import Toast from "../components/common/Toast";

const ApplyJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { applyToJob } = useMockData();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle, loading, success
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "loading") return;

    // Simple validation
    if (!formData.name || !formData.email) {
      setToast({
        isVisible: true,
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    setStatus("loading");

    // Simulate API call
    setTimeout(() => {
      applyToJob(parseInt(id), formData);
      setStatus("success");
      setToast({
        isVisible: true,
        message: "Application submitted successfully!",
        type: "success",
      });

      // Redirect after success
      setTimeout(() => {
        navigate("/user-dashboard");
      }, 2000);
    }, 1500);
  };

  const renderInput = (id, label, Icon, type = "text", props = {}) => (
    <div className="relative group/field">
      <input
        id={id}
        type={type}
        placeholder=" "
        value={formData[id]}
        onChange={(e) => handleChange(id, e.target.value)}
        className="peer w-full h-[60px] pl-16 pr-5 bg-white border border-slate-100 ring-4 ring-transparent rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow"
        {...props}
      />
      <div className="absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B] transition-all duration-300">
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <label
        htmlFor={id}
        className="absolute left-16 top-1/2 -translate-y-1/2 text-slate-400 text-[15px] font-bold transition-all pointer-events-none
                   peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                   peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider"
      >
        {label}
      </label>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      {/* Header Section */}
      <section className="bg-[#f0f5fa] py-20 text-center border-b border-slate-100">
        <h1 className="text-[30px] md:text-[35px] font-bold text-[#002333] mb-3">
          Apply For A Job
        </h1>
        <div className="text-[15px] font-medium text-slate-500">
          <Link to="/" className="text-slate-500 hover:text-[#5BBB7B]">
            Home
          </Link>{" "}
          / <span className="text-[#5BBB7B]">Apply For A Job</span>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[800px] mx-auto px-4 md:px-0 mt-10 md:mt-20 relative z-10">
        <div className="bg-white rounded-2xl shadow-[0_0_50px_0_rgba(0,0,0,0.08)] p-6 sm:p-8 md:p-12 border border-slate-100/50 transition-all hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
          <h3 className="text-[18px] md:text-[20px] font-bold text-[#002333] mb-6 md:mb-8 pb-3 border-b-2 border-[#5BBB7B] inline-block">
            Apply Now
          </h3>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name Input */}
            {renderInput("name", "Your Name", User)}

            {/* Email Input */}
            {renderInput("email", "Email Address", Mail, "email")}

            {/* Message Textarea */}
            <div className="relative group/field">
              <textarea
                id="message"
                placeholder=" "
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                className="peer w-full h-44 pl-16 pr-5 py-6 bg-white border border-slate-100 ring-4 ring-transparent rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow resize-none"
              ></textarea>
              <div className="absolute left-5 top-6 w-8 h-8 rounded-lg flex items-center justify-center bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B] transition-all duration-300">
                <FileText size={18} strokeWidth={2.5} />
              </div>
              <label
                htmlFor="message"
                className="absolute left-16 top-6 text-slate-400 text-[15px] font-bold transition-all pointer-events-none
                           peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                           peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider"
              >
                Message
              </label>
            </div>

            {/* Upload Resume */}
            <div>
              <h4 className="text-[16px] font-bold text-[#002333] mb-4">
                Upload Resume
              </h4>
              <div className="border-2 border-dashed border-[#5BBB7B]/30 bg-[#5BBB7B]/5 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#5BBB7B] hover:bg-[#5BBB7B]/10 transition-all group/upload relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover/upload:scale-110 transition-transform">
                  <Upload className="text-[#5BBB7B]" size={28} />
                </div>
                <p className="text-[#002333] font-bold text-lg mb-1">
                  Click to upload or drop files
                </p>
                <p className="text-slate-500 text-sm">
                  Max file size: 2MB (PDF, DOCX)
                </p>
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-[15px] text-slate-500 leading-relaxed font-medium">
              If you do not have a resume document, you may write your brief
              professional profile{" "}
              <Link
                to="#"
                className="text-[#5BBB7B] underline decoration-1 underline-offset-2 hover:text-[#40a362] font-bold"
              >
                here
              </Link>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className={`relative px-10 py-4 bg-[#5BBB7B] text-white font-bold rounded-xl overflow-hidden shadow-lg shadow-[#5BBB7B]/30 text-[15px] group w-full sm:w-auto ${status === "loading" ? "opacity-75 cursor-not-allowed" : ""}`}
              >
                <span className="absolute inset-0 bg-[#002333] transition-transform duration-700 ease-in-out scale-x-0 group-hover:scale-x-100 origin-center" />
                <span className="relative z-10">
                  {status === "loading" ? "Sending..." : "Send Application"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((prev) => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
};

export default ApplyJob;
