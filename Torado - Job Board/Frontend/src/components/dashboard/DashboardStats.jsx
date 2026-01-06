import React from "react";
import { Briefcase, FileText, MessageSquare, Bookmark } from "lucide-react";

const StatCard = ({ label, count, icon: Icon, colorClass, iconClass }) => (
  <div
    className={`rounded-lg p-6 relative overflow-hidden flex items-center justify-between ${colorClass} transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl hover:brightness-90 cursor-pointer`}
  >
    <div className="relative z-10 text-white">
      <h4 className="text-3xl font-bold mb-1">{count}</h4>
      <p className="text-sm font-medium opacity-90">{label}</p>
    </div>
    <div className={`p-3 rounded-lg bg-white/20 backdrop-blur-sm ${iconClass}`}>
      <Icon size={32} className="text-white" strokeWidth={1.5} />
    </div>
  </div>
);

const DashboardStats = () => {
  const stats = [
    {
      label: "Submit Jobs",
      count: "100K",
      icon: Briefcase,
      colorClass: "bg-[#5BBB7B]", // Custom Green
    },
    {
      label: "Application",
      count: "5432+",
      icon: FileText,
      colorClass: "bg-[#003B47]", // Dark Teal
    },
    {
      label: "Message",
      count: "241+",
      icon: MessageSquare,
      colorClass: "bg-[#5B6CF6]", // Blue
    },
    {
      label: "Shortlisted",
      count: "350+",
      icon: Bookmark,
      colorClass: "bg-[#002333]", // Dark Blue
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
