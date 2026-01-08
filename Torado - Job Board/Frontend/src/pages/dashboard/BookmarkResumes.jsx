import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Bookmark,
  ChevronDown,
  Globe,
  Briefcase,
  UserCheck,
  Meh,
  Eye,
  Trash2,
  Search,
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

const BookmarkResumes = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const resumes = [
    {
      id: 1,
      title: "Fresher UI/UX Designer",
      location: "London, UK",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Job1",
      iconBg: "bg-[#F0F5FF]",
    },
    {
      id: 2,
      title: "Advance Magento Developer",
      location: "London, UK",
      type: "Part Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Job2",
      iconBg: "bg-[#FDF2F2]",
    },
    {
      id: 3,
      title: "Senior IOS App Developer",
      location: "London, UK",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Job3",
      iconBg: "bg-[#F0FDF4]",
    },
    {
      id: 4,
      title: "Basic WordPress Developer",
      location: "London, UK",
      type: "Part Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Job4",
      iconBg: "bg-[#FFF7ED]",
    },
    {
      id: 5,
      title: "Technical Content Writer",
      location: "London, UK",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Job5",
      iconBg: "bg-[#F5F3FF]",
    },
    {
      id: 6,
      title: "Senior Product Designer",
      location: "London, UK",
      type: "Part Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Job6",
      iconBg: "bg-[#FFF1F2]",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[22px] font-bold text-[#002333]">
          Bookmark Resumes
        </h2>
        <div className="text-[13px] text-slate-400">
          <span className="hover:text-[#5BBB7B] cursor-pointer font-medium">
            Home
          </span>
          <span className="mx-2">/</span>
          <span className="hover:text-[#5BBB7B] cursor-pointer font-medium">
            Dashboard
          </span>
          <span className="mx-2">/</span>
          <span className="text-[#5BBB7B] font-medium">Bookmark Resumes</span>
        </div>
      </div>

      {/* Info & Filters Bar */}
      <div className="bg-white rounded-xl p-4 md:px-6 md:py-5 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <p className="text-[#64748B] text-sm font-medium">
          You have bookmarked{" "}
          <span className="text-[#1967D2] font-bold">{resumes.length}</span>{" "}
          resumes
        </p>

        <div className="flex flex-wrap items-center gap-3">
          {/* Filter Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "filter" ? null : "filter")
              }
              className="flex items-center gap-6 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm text-[#002333] font-medium hover:border-[#5BBB7B] transition-all min-w-[140px] justify-between"
            >
              <span>All Jobs</span>
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform ${
                  activeDropdown === "filter" ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          {/* Show Count Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "show" ? null : "show")
              }
              className="flex items-center gap-6 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm text-[#002333] font-medium hover:border-[#5BBB7B] transition-all min-w-[120px] justify-between"
            >
              <span>Show 20</span>
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform ${
                  activeDropdown === "show" ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Resumes Table Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-slate-50/40 text-left border-b border-slate-100">
                <th className="px-6 py-5 text-[15px] font-bold text-[#002333]">
                  Candidate
                </th>
                <th className="px-6 py-5 text-[15px] font-bold text-[#002333]">
                  Status
                </th>
                <th className="px-6 py-5 text-[15px] font-bold text-[#002333]">
                  Applied Date
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
                      {/* Job Icon/Image */}
                      <div
                        className={`w-12 h-12 ${resume.iconBg} rounded-full flex items-center justify-center shrink-0`}
                      >
                        <img
                          src={resume.image}
                          alt={resume.title}
                          className="w-8 h-8 rounded-full"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[15px] font-bold text-[#002333] group-hover:text-[#5BBB7B] transition-colors cursor-pointer mb-1 tracking-tight">
                          {resume.title}
                        </h4>
                        <div className="flex items-center gap-4 text-[13px] text-slate-400 font-medium">
                          <div className="flex items-center gap-1.5">
                            <Globe size={14} className="text-[#5BBB7B]" />
                            <span>{resume.location}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Briefcase size={14} className="text-[#5BBB7B]" />
                            <span>{resume.type}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[14px] text-[#5BBB7B] font-medium">
                      {resume.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[14px] text-[#64748B] font-medium">
                      {resume.date}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <Tooltip text="View">
                        <button className="text-[#5BBB7B] hover:scale-110 transition-transform">
                          <UserCheck size={20} strokeWidth={1.8} />
                        </button>
                      </Tooltip>
                      <Tooltip text="Remove">
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

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 pt-4">
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-[#5BBB7B] text-white font-bold text-sm shadow-md shadow-[#5BBB7B]/20">
          01
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-100 text-slate-600 font-bold text-sm hover:border-[#5BBB7B] hover:text-[#5BBB7B] transition-all">
          02
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-100 text-slate-600 font-bold text-sm hover:border-[#5BBB7B] hover:text-[#5BBB7B] transition-all">
          03
        </button>
        <button className="w-10 h-10 rounded-full flex items-center justify-center bg-white border border-slate-100 text-slate-600 transition-all hover:border-[#5BBB7B] hover:text-[#5BBB7B]">
          <ChevronDown size={18} className="-rotate-90" />
        </button>
      </div>
    </div>
  );
};

export default BookmarkResumes;
