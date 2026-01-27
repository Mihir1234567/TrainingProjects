import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardWidgets from "../../components/dashboard/DashboardWidgets";

const DashboardHome = () => {
  const { isRecruiter } = useOutletContext();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[24px] md:text-[28px] font-bold text-[#002333]">
            {greeting},{" "}
            <span className="text-[#5BBB7B]">
              {isRecruiter ? "Recruiter!" : "Candidate!"}
            </span>
          </h2>
          <div className="text-[13px] text-slate-400 font-medium mt-1.5 flex items-center gap-2">
            <span className="bg-slate-50 px-2 py-0.5 rounded text-slate-500 border border-slate-100 italic">
              {isRecruiter ? "Employer Dashboard" : "Candidate Dashboard"}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <Link to="/" className="hover:text-[#5BBB7B] transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <span className="text-[#5BBB7B]">Dashboard</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats isRecruiter={isRecruiter} />

      {/* Widgets (Notifications & Invoices) */}
      <DashboardWidgets isRecruiter={isRecruiter} />
    </div>
  );
};

export default DashboardHome;
