import React from "react";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";

const AlertJobs = () => {
  return (
    <div className="space-y-6">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[22px] font-bold text-[#002333]">Job Alerts</h2>
        <div className="text-[13px] text-slate-400 font-medium">
          <Link to="/" className="hover:text-[#5BBB7B] transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            to="/user-dashboard"
            className="hover:text-[#5BBB7B] transition-colors"
          >
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#5BBB7B]">Job Alerts</span>
        </div>
      </div>

      <div className="bg-white rounded-[20px] p-12 text-center shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100 min-h-[400px] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
          <Bell size={40} />
        </div>
        <h3 className="text-xl font-bold text-[#002333] mb-2">Coming Soon</h3>
        <p className="text-slate-500 max-w-md mx-auto">
          We are currently working on this feature. You will soon be able to set
          up alerts for new job postings.
        </p>
      </div>
    </div>
  );
};

export default AlertJobs;
