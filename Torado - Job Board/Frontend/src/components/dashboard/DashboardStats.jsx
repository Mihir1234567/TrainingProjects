import { Briefcase, FileText, MessageSquare, Bookmark } from "lucide-react";

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
