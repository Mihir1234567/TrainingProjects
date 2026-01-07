import React from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Trash2,
  Calendar,
  Users,
  CheckCircle,
  Clock,
  Briefcase,
  Smartphone,
  Layout,
  Globe,
  Database,
  Search,
  Meh,
  PhoneCall,
} from "lucide-react";

const Tooltip = ({ children, text }) => (
  <div className="relative group/tooltip inline-flex">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3.5 py-2 bg-black text-white text-[12px] font-bold rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 whitespace-nowrap z-20 pointer-events-none shadow-[0_4px_25px_rgba(0,0,0,0.4)] transform scale-95 group-hover/tooltip:scale-100 origin-bottom">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-black"></div>
    </div>
  </div>
);

const ManageJobs = () => {
  const jobs = [
    {
      id: 1,
      title: "Senior Web Developer",
      status: "Pending",
      filled: true,
      postedDate: "31 Jan 2025",
      expiredDate: "31 Jan 2025",
      applications: 0,
      icon: Layout,
      iconBg: "bg-green-100/50",
      iconColor: "text-[#5BBB7B]",
    },
    {
      id: 2,
      title: "Experienced UI/UX Product Designer",
      status: "",
      filled: false,
      postedDate: "31 Jan 2025",
      expiredDate: "31 Jan 2025",
      applications: 2,
      icon: Smartphone,
      iconBg: "bg-blue-100/50",
      iconColor: "text-blue-600",
    },
    {
      id: 3,
      title: "Web developer - Front-End & PHP developer",
      status: "",
      filled: false,
      postedDate: "31 Jan 2025",
      expiredDate: "31 Jan 2025",
      applications: 8,
      icon: Globe,
      iconBg: "bg-slate-100/50",
      iconColor: "text-slate-600",
    },
    {
      id: 4,
      title: "WordPress Developer & Database Management System",
      status: "",
      filled: false,
      postedDate: "31 Jan 2025",
      expiredDate: "31 Jan 2025",
      applications: 15,
      icon: Database,
      iconBg: "bg-orange-100/50",
      iconColor: "text-orange-600",
    },
    {
      id: 5,
      title: "Senior Web Designer",
      status: "Pending",
      filled: false,
      postedDate: "31 Jan 2025",
      expiredDate: "31 Jan 2025",
      applications: 0,
      icon: Briefcase,
      iconBg: "bg-slate-100/50",
      iconColor: "text-slate-600",
    },
    {
      id: 6,
      title: "Experienced UI/UX Web Designer",
      status: "",
      filled: false,
      postedDate: "31 Jan 2025",
      expiredDate: "31 Jan 2025",
      applications: 20,
      icon: Search,
      iconBg: "bg-green-100/50",
      iconColor: "text-[#5BBB7B]",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1 md:px-0">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[#002333] mb-1">
            Manage Jobs
          </h2>
          <div className="text-sm text-slate-500">
            <span className="font-semibold text-[#002333]">Home</span> /{" "}
            <span>Dashboard</span> /{" "}
            <span className="text-[#5BBB7B]">Manage Jobs</span>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-slate-100 mx-1 md:mx-0">
        <p className="text-pink-500 font-medium text-center md:text-left text-sm md:text-base">
          Your listings will be automatically removed after 30 days.
        </p>
      </div>

      {/* Jobs Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mx-1 md:mx-0"
      >
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/50 text-left border-b border-slate-100">
                <th className="px-4 md:px-6 py-4 md:py-5 text-sm font-bold text-[#002333]">
                  Title
                </th>
                <th className="px-4 md:px-6 py-4 md:py-5 text-sm font-bold text-[#002333]">
                  Filled
                </th>
                <th className="px-4 md:px-6 py-4 md:py-5 text-sm font-bold text-[#002333]">
                  Posted Date
                </th>
                <th className="px-4 md:px-6 py-4 md:py-5 text-sm font-bold text-[#002333]">
                  Expired
                </th>
                <th className="px-4 md:px-6 py-4 md:py-5 text-sm font-bold text-[#002333]">
                  Applications
                </th>
                <th className="px-4 md:px-6 py-4 md:py-5 text-sm font-bold text-[#002333]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {jobs.map((job) => (
                <tr
                  key={job.id}
                  className="hover:bg-slate-50/30 transition-colors"
                >
                  <td className="px-4 md:px-6 py-4 md:py-5">
                    <div className="flex items-center gap-4">
                      <Tooltip text="View">
                        <div
                          className={`w-11 h-11 ${job.iconBg} ${job.iconColor} rounded-xl flex items-center justify-center shrink-0 cursor-pointer hover:scale-105 transition-transform`}
                        >
                          <job.icon size={22} />
                        </div>
                      </Tooltip>
                      <div className="min-w-0">
                        <h4
                          className="text-[15px] font-bold text-[#002333] hover:text-[#5BBB7B] transition-colors cursor-pointer leading-snug"
                          title={job.title}
                        >
                          {job.title}
                        </h4>
                        {job.status && (
                          <p className="text-sm text-slate-400 mt-0.5 font-medium whitespace-nowrap">
                            {job.status}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 md:py-5">
                    <div className="flex justify-start">
                      {job.filled ? (
                        <Tooltip text="View">
                          <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center cursor-pointer">
                            <CheckCircle size={16} />
                          </div>
                        </Tooltip>
                      ) : (
                        <Tooltip text="Approve">
                          <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center cursor-pointer">
                            <PhoneCall size={14} />
                          </div>
                        </Tooltip>
                      )}
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4 md:py-5 text-slate-500 text-sm whitespace-nowrap">
                    {job.postedDate}
                  </td>
                  <td className="px-4 md:px-6 py-4 md:py-5 text-slate-500 text-sm whitespace-nowrap">
                    {job.expiredDate}
                  </td>
                  <td className="px-4 md:px-6 py-4 md:py-5">
                    {job.applications === 0 ? (
                      <Tooltip text="View">
                        <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center cursor-pointer">
                          <Users size={16} />
                        </div>
                      </Tooltip>
                    ) : (
                      <span className="px-5 py-2 bg-[#F0F5FF] text-[#1967D2] rounded-lg text-sm font-semibold whitespace-nowrap leading-none border border-transparent hover:border-[#1967D2]/20 transition-all">
                        Total{" "}
                        {job.applications < 10
                          ? `0${job.applications}`
                          : job.applications}
                      </span>
                    )}
                  </td>
                  <td className="px-4 md:px-6 py-4 md:py-5">
                    <div className="flex items-center gap-3 whitespace-nowrap">
                      <Tooltip text="View">
                        <button className="p-2 transition-all">
                          <Users className="text-[#5BBB7B]" size={20} />
                        </button>
                      </Tooltip>
                      <Tooltip text="Edit">
                        <button className="p-2 transition-all">
                          <Database className="text-blue-600" size={20} />
                        </button>
                      </Tooltip>
                      <Tooltip text="Delete">
                        <button className="p-2 transition-all">
                          <Meh className="text-orange-500" size={20} />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ManageJobs;
