import React, { useEffect, useState } from "react";
import { Briefcase, FileText, MessageSquare, Bookmark } from "lucide-react";
import { dashboardAPI } from "../../services/api";

const StatCard = ({ label, count, icon: Icon, colorClass, iconClass }) => (
  <div
    className={`rounded-[20px] p-8 relative overflow-hidden flex items-center justify-between ${colorClass} transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-2xl hover:brightness-105 cursor-pointer group`}
  >
    <div className="relative z-10 text-white">
      <h4 className="text-[32px] font-bold mb-0.5 tracking-tight group-hover:scale-105 transition-transform duration-300 origin-left">
        {count}
      </h4>
      <p className="text-[14px] font-bold opacity-80 uppercase tracking-widest leading-none">
        {label}
      </p>
    </div>
    <div
      className={`p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${iconClass}`}
    >
      <Icon size={32} className="text-white" strokeWidth={2} />
    </div>
    {/* Subtle Background Pattern */}
    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors"></div>
  </div>
);

const DashboardStats = ({ isRecruiter, stats, loading }) => {
  const employerStats = [
    {
      label: "Posted Jobs",
      count: stats?.postedJobs || 0,
      icon: Briefcase,
      colorClass: "bg-[#5BBB7B]", // Custom Green
    },
    {
      label: "Applications",
      count: stats?.applications || 0,
      icon: FileText,
      colorClass: "bg-[#003B47]", // Dark Teal
    },
    {
      label: "Messages",
      count: stats?.messages || 0,
      icon: MessageSquare,
      colorClass: "bg-[#5B6CF6]", // Blue
    },
    {
      label: "Shortlisted",
      count: stats?.shortlisted || 0,
      icon: Bookmark,
      colorClass: "bg-[#002333]", // Dark Blue
    },
  ];

  const candidateStats = [
    {
      label: "Applied Jobs",
      count: stats?.appliedJobs || 0,
      icon: Briefcase,
      colorClass: "bg-[#5B6CF6]", // Blue
    },
    {
      label: "Interviews",
      count: stats?.interviews || 0,
      icon: FileText,
      colorClass: "bg-[#5BBB7B]", // Green
    },
    {
      label: "Messages",
      count: stats?.messages || 0,
      icon: MessageSquare,
      colorClass: "bg-[#002333]", // Dark Blue
    },
    {
      label: "Saved Jobs",
      count: stats?.savedJobs || 0,
      icon: Bookmark,
      colorClass: "bg-[#003B47]", // Dark Teal
    },
  ];

  const currentStats = isRecruiter ? employerStats : candidateStats;

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-32 bg-slate-100 rounded-[20px] animate-pulse"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {currentStats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
