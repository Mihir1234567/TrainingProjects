import React from "react";
import { motion } from "framer-motion";
import {
  UserCheck,
  Database,
  Meh,
  Globe,
  Briefcase,
  ChevronDown,
} from "lucide-react";

const Tooltip = ({ children, text }) => (
  <div className="relative group/tooltip w-fit">
    {children}
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3.5 py-2 bg-black text-white text-[12px] font-bold rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 whitespace-nowrap z-20 pointer-events-none shadow-[0_4px_25px_rgba(0,0,0,0.4)] transform scale-95 group-hover/tooltip:scale-100 origin-bottom">
      {text}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-black"></div>
    </div>
  </div>
);

const ManageResumes = () => {
  const resumes = [
    {
      id: 1,
      name: "Tyrone Lowe",
      title: "Software Engineer",
      location: "United States",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tyrone",
      iconBg: "bg-[#F0F5FF]",
    },
    {
      id: 2,
      name: "Brielle Mante",
      title: "Web Developer",
      location: "Denver, USA",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Brielle",
      iconBg: "bg-[#FDF2F2]",
    },
    {
      id: 3,
      name: "Ben Hegmann",
      title: "Technical Architect",
      location: "Mailbourn, AU",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ben",
      iconBg: "bg-[#F0FDF4]",
    },
    {
      id: 4,
      name: "Kristin Haag",
      title: "Senior Designer",
      location: "Liverpool, CA",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kristin",
      iconBg: "bg-[#FFF7ED]",
    },
    {
      id: 5,
      name: "Terrell Nolan",
      title: "Software Engineer",
      location: "Mailbourn, AU",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Terrell",
      iconBg: "bg-[#F5F3FF]",
    },
    {
      id: 6,
      name: "Bret Okuneva",
      title: "Android Developer",
      location: "Barlin Canda",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bret",
      iconBg: "bg-[#FFF1F2]",
    },
    {
      id: 7,
      name: "Hillary Wisozk",
      title: "Shopify Develope",
      location: "United States",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hillary",
      iconBg: "bg-[#FDF2F2]",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[22px] font-bold text-[#002333]">Manage Resumes</h2>
        <div className="text-[13px] text-slate-400">
          <span className="hover:text-[#5BBB7B] cursor-pointer font-medium">
            Home
          </span>
          <span className="mx-2">/</span>
          <span className="hover:text-[#5BBB7B] cursor-pointer font-medium">
            Dashboard
          </span>
          <span className="mx-2">/</span>
          <span className="text-[#5BBB7B] font-medium">Manage Resumes</span>
        </div>
      </div>

      {/* Table Section (Visible on LG and above) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hidden lg:block max-w-[1440px] mx-auto w-full"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-slate-50/40 text-left border-b border-slate-100">
                <th className="px-6 py-5 text-[15px] font-bold text-[#002333]">
                  Full Name
                </th>
                <th className="px-6 py-5 text-[15px] font-bold text-[#002333]">
                  Job Title
                </th>
                <th className="px-6 py-5 text-[15px] font-bold text-[#002333]">
                  Location
                </th>
                <th className="px-6 py-5 text-[15px] font-bold text-[#002333]">
                  Post Date
                </th>
                <th className="px-6 py-5 text-[15px] font-bold text-[#002333]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {resumes.map((resume) => (
                <tr
                  key={resume.id}
                  className="hover:bg-slate-50/30 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 ${resume.iconBg} rounded-full flex items-center justify-center shrink-0 transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)] group-hover:delay-100 [perspective:1000px]`}
                      >
                        <img
                          src={resume.image}
                          alt={resume.name}
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                      <span className="text-[15px] font-bold text-[#002333] group-hover:text-[#5BBB7B] transition-colors cursor-pointer">
                        {resume.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-[14px] text-[#64748B] font-medium">
                    {resume.title}
                  </td>
                  <td className="px-6 py-5 text-[14px] text-[#64748B] font-medium">
                    {resume.location}
                  </td>
                  <td className="px-6 py-5 text-[14px] text-[#64748B] font-medium">
                    {resume.date}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <Tooltip text="View">
                        <button className="text-[#5BBB7B] hover:scale-110 transition-transform">
                          <UserCheck size={20} strokeWidth={1.8} />
                        </button>
                      </Tooltip>
                      <Tooltip text="Edit">
                        <button className="text-[#1967D2] hover:scale-110 transition-transform">
                          <Database size={20} strokeWidth={1.8} />
                        </button>
                      </Tooltip>
                      <Tooltip text="Delete">
                        <button className="text-orange-500 hover:scale-110 transition-transform">
                          <Meh size={20} strokeWidth={1.8} />
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

      {/* Mobile/Tablet View (Hidden on LG and above) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
        {resumes.map((resume, index) => (
          <motion.div
            key={resume.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-3 group hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
              <div
                className={`w-14 h-14 ${resume.iconBg} rounded-full flex items-center justify-center shrink-0 transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)] group-hover:delay-100 [perspective:1000px]`}
              >
                <img
                  src={resume.image}
                  alt={resume.name}
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="min-w-0">
                <h4 className="text-[16px] font-bold text-[#002333] mb-1 leading-tight">
                  {resume.name}
                </h4>
                <p className="text-[13px] text-[#5BBB7B] font-medium">
                  {resume.title}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-[13px] text-slate-500 font-medium pt-1">
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-[#5BBB7B]" />
                <span>{resume.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={14} className="text-[#5BBB7B]" />
                <span>Posted {resume.date}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50 gap-3">
              <button className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-[#5BBB7B]/10 text-[#5BBB7B] rounded-lg font-bold text-sm hover:bg-[#5BBB7B] hover:text-white transition-all">
                <UserCheck size={18} />
                <span>View</span>
              </button>
              <button className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-[#1967D2]/10 text-[#1967D2] rounded-lg font-bold text-sm hover:bg-[#1967D2] hover:text-white transition-all">
                <Database size={18} />
                <span>Edit</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center bg-orange-50 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
                <Meh size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManageResumes;
