import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Briefcase,
  UserCheck,
  Meh,
  Search,
  MapPin,
  Clock,
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

const AlertJobs = () => {
  const [selectedSort, setSelectedSort] = useState("Default");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const initialAlerts = [
    {
      id: 1,
      title: "Fresher UI/UX Designer",
      location: "London, UK",
      type: "Full Time",
      designation: "Manager",
      postedDate: "31 Jan 2025",
      iconBg: "bg-[#F0F5FF]",
    },
    {
      id: 2,
      title: "Advance Magento Developer",
      location: "London, UK",
      type: "Part Time",
      designation: "Team Leader",
      postedDate: "31 Jan 2025",
      iconBg: "bg-[#FDF2F2]",
    },
    {
      id: 3,
      title: "Senior IOS App Developer",
      location: "London, UK",
      type: "Full Time",
      designation: "CEO.Manager",
      postedDate: "31 Jan 2025",
      iconBg: "bg-[#F0FDF4]",
    },
    {
      id: 4,
      title: "Basic WordPress Developer",
      location: "London, UK",
      type: "Part Time",
      designation: "Manager",
      postedDate: "31 Jan 2025",
      iconBg: "bg-[#FFF7ED]",
    },
    {
      id: 5,
      title: "Technical Content Writer",
      location: "London, UK",
      type: "Full Time",
      designation: "Founder",
      postedDate: "31 Jan 2025",
      iconBg: "bg-[#F5F3FF]",
    },
    {
      id: 6,
      title: "Senior Product Designer",
      location: "London, UK",
      type: "Part Time",
      designation: "SEO Founders",
      postedDate: "31 Jan 2025",
      iconBg: "bg-[#FFF1F2]",
    },
  ];

  const allAlerts = useMemo(() => {
    const alerts = [...initialAlerts];
    for (let i = 1; i <= 24; i++) {
      alerts.push({
        ...initialAlerts[i % initialAlerts.length],
        id: initialAlerts.length + i,
        title: `${initialAlerts[i % initialAlerts.length].title} ${i}`,
      });
    }
    return alerts;
  }, []);

  const filteredAlerts = useMemo(() => {
    let result = [...allAlerts];

    if (selectedSort === "Newest") {
      result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    } else if (selectedSort === "Oldest") {
      result.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
    }

    return result;
  }, [allAlerts, selectedSort]);

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);

  const paginatedAlerts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAlerts.slice(startIndex, startIndex + itemsPerPage);
  }, [itemsPerPage, currentPage, filteredAlerts]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-bold text-[#002333]">
            My Alert Jobs
          </h2>
          <div className="text-[13px] text-slate-400 font-medium mt-1">
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
            <span className="text-[#5BBB7B]">Alert Jobs</span>
          </div>
        </div>
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[20px] shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden"
      >
        {/* Table Filter Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-[15px] font-medium text-slate-500">
            Showing{" "}
            <span className="text-[#002333] font-bold">
              {filteredAlerts.length}
            </span>{" "}
            alert jobs
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => {
                  setSelectedSort(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-slate-50 border-none rounded-xl px-5 py-2.5 pr-10 text-[14px] font-bold text-[#002333] cursor-pointer focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none w-[160px]"
              >
                <option value="Default">Sort by (Default)</option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={14}
              />
            </div>
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="appearance-none bg-slate-50 border-none rounded-xl px-5 py-2.5 pr-10 text-[14px] font-bold text-[#002333] cursor-pointer focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none w-[120px]"
              >
                {[20, 30, 50, 100].map((opt) => (
                  <option key={opt} value={opt}>
                    Show {opt}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={14}
              />
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[650px]">
            <thead>
              <tr className="bg-slate-50/50 text-left border-b border-slate-100">
                <th className="px-5 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider">
                  Title
                </th>
                <th className="px-3 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-3 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider">
                  Posted Date
                </th>
                <th className="px-5 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider text-right pr-4">
                  Action
                </th>
              </tr>
            </thead>
            <AnimatePresence mode="wait">
              <motion.tbody
                key={`${currentPage}-${itemsPerPage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="divide-y divide-slate-100 min-h-[400px]"
              >
                {paginatedAlerts.length > 0 ? (
                  paginatedAlerts.map((alert) => (
                    <tr
                      key={alert.id}
                      className="group hover:bg-slate-50/30 transition-all duration-300"
                    >
                      <td className="px-5 py-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-11 h-11 rounded-xl ${alert.iconBg} flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-sm border border-white`}
                          >
                            <Bell size={18} className="text-[#5BBB7B]" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[16px] font-bold text-[#002333] group-hover:text-[#5BBB7B] transition-colors leading-snug truncate">
                              {alert.title}
                            </h4>
                            <div className="flex items-center gap-3 text-[13px] text-slate-400 font-medium mt-1">
                              <span className="flex items-center gap-1.5">
                                <MapPin size={12} className="text-[#5BBB7B]" />
                                {alert.location}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Briefcase
                                  size={12}
                                  className="text-[#5BBB7B]"
                                />
                                {alert.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-6">
                        <span className="text-[14px] font-bold text-slate-600">
                          {alert.designation}
                        </span>
                      </td>
                      <td className="px-3 py-6">
                        <span className="flex items-center gap-2 text-[14px] font-bold text-[#002333] italic">
                          <Clock size={14} className="text-slate-400" />
                          {alert.postedDate}
                        </span>
                      </td>
                      <td className="px-5 py-6 text-right pr-4">
                        <div className="flex items-center justify-end gap-2">
                          <Tooltip text="View Details">
                            <button className="w-10 h-10 rounded-xl bg-[#5BBB7B]/10 text-[#5BBB7B] flex items-center justify-center transition-all duration-300 hover:bg-[#5BBB7B] hover:text-white hover:shadow-lg hover:shadow-[#5BBB7B]/30 active:scale-95 group/btn overflow-hidden relative">
                              <UserCheck
                                size={18}
                                className="relative z-10 transition-transform duration-500 group-hover/btn:scale-110"
                              />
                            </button>
                          </Tooltip>
                          <Tooltip text="Delete Alert">
                            <button className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center transition-all duration-300 hover:bg-orange-500 hover:text-white hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 group/btn overflow-hidden relative">
                              <Meh
                                size={18}
                                className="relative z-10 transition-transform duration-500 group-hover/btn:[transform:rotateY(180deg)]"
                              />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="py-20 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                          <Search size={40} />
                        </div>
                        <h5 className="text-[18px] font-bold text-[#002333]">
                          No alert jobs found
                        </h5>
                      </div>
                    </td>
                  </tr>
                )}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden divide-y divide-slate-100">
          {paginatedAlerts.map((alert) => (
            <div key={alert.id} className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-xl ${alert.iconBg} flex items-center justify-center shrink-0 shadow-sm border border-white`}
                >
                  <Bell size={20} className="text-[#5BBB7B]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[16px] font-bold text-[#002333] leading-tight truncate">
                    {alert.title}
                  </h4>
                  <p className="text-slate-500 text-[13px] font-bold mt-1">
                    {alert.designation}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[13px] text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-[#5BBB7B]" />
                  {alert.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase size={12} className="text-[#5BBB7B]" />
                  {alert.type}
                </span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-[13px] text-slate-400 font-medium">
                  Posted:{" "}
                  <span className="text-[#002333] font-bold">
                    {alert.postedDate}
                  </span>
                </span>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-[#5BBB7B]/10 text-[#5BBB7B] rounded-lg">
                    <UserCheck size={18} />
                  </button>
                  <button className="p-2.5 bg-orange-50 text-orange-500 rounded-lg">
                    <Meh size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination bar */}
        {totalPages > 1 && (
          <div className="p-8 flex justify-center border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <ChevronDown
                  className="rotate-90 group-hover:-translate-x-0.5 transition-transform"
                  size={16}
                />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold transition-all ${
                      num === currentPage
                        ? "bg-[#5BBB7B] text-white shadow-lg shadow-[#5BBB7B]/30 scale-110"
                        : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                    }`}
                  >
                    {num < 10 ? `0${num}` : num}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <ChevronDown
                  className="-rotate-90 group-hover:translate-x-0.5 transition-transform"
                  size={16}
                />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AlertJobs;
