import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useMockData } from "../../context/MockDataContext";
import {
  MapPin,
  Briefcase,
  UserCheck,
  Meh,
  ChevronDown,
  Layout,
  Globe,
  Smartphone,
  Database,
  Search,
  Zap,
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

const AppliedJobs = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Jobs");
  const [selectedSort, setSelectedSort] = useState("Default");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const { applications, jobs } = useMockData();

  const allJobs = useMemo(() => {
    return applications.map((app) => {
      const job = jobs.find((j) => j.id === app.jobId);

      let Icon = Briefcase;
      let iconColor = "text-slate-600";
      let iconBg = "bg-slate-100/50";

      if (job?.category === "Design") {
        Icon = Layout;
        iconColor = "text-blue-500";
        iconBg = "bg-blue-50";
      } else if (job?.category === "Technology") {
        Icon = Smartphone;
        iconColor = "text-purple-500";
        iconBg = "bg-purple-50";
      } else if (job?.category === "Marketing") {
        Icon = Zap;
        iconColor = "text-yellow-600";
        iconBg = "bg-yellow-50";
      }

      return {
        id: app.id,
        title: job?.title || "Unknown Job",
        location: job?.location || "Remote",
        type: job?.type || "Full Time",
        status: app.status || "Active",
        appliedDate: app.date
          ? new Date(app.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "N/A",
        category: job?.category || "General",
        icon: Icon,
        iconBg: iconBg,
        iconColor: iconColor,
      };
    });
  }, [applications, jobs]);

  const categories = [
    "All Jobs",
    "Development",
    "Web Design",
    "Multimedia",
    "Marketing",
    "Resources",
    "Financing",
    "Software",
    "Programming",
    "Accounting",
    "Finance",
  ];

  const showOptions = [20, 30, 50, 100];

  const filteredJobs = useMemo(() => {
    let result =
      selectedCategory === "All Jobs"
        ? allJobs
        : allJobs.filter((job) => job.category === selectedCategory);

    if (selectedSort === "Newest") {
      result = [...result].sort(
        (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate),
      );
    } else if (selectedSort === "Oldest") {
      result = [...result].sort(
        (a, b) => new Date(a.appliedDate) - new Date(b.appliedDate),
      );
    }

    return result;
  }, [selectedCategory, selectedSort, allJobs]);

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const currentJobs = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredJobs.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredJobs, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[22px] font-bold text-[#002333]">
          My Applied Jobs
        </h2>
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
          <span className="text-[#5BBB7B]">Applied Jobs</span>
        </div>
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[20px] shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden"
      >
        {/* Table Filter Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-[15px] font-medium text-slate-500">
            You have applied{" "}
            <span className="text-[#002333] font-bold">
              {allJobs.length} jobs
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-slate-50 border-none rounded-xl px-5 py-2.5 pr-10 text-[14px] font-bold text-[#002333] cursor-pointer focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none w-[160px]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={14}
              />
            </div>
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
                {showOptions.map((opt) => (
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

        {/* Table Header */}
        <div className="hidden md:grid grid-cols-12 px-4 py-4 bg-slate-50/50 border-b border-slate-100 text-[12px] font-bold text-[#002333] uppercase tracking-wider">
          <div className="col-span-6">Job Title</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Applied Date</div>
          <div className="col-span-2 text-right pr-4">Action</div>
        </div>

        {/* Job List */}
        <div className="divide-y divide-slate-100 min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${currentPage}-${itemsPerPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {currentJobs.length > 0 ? (
                currentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="group grid grid-cols-1 md:grid-cols-12 px-4 md:px-4 py-5 items-center hover:bg-slate-50/30 transition-all duration-300"
                  >
                    <div className="col-span-12 md:col-span-6 flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl ${job.iconBg} flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-sm border border-white`}
                      >
                        <job.icon className={job.iconColor} size={24} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-[16px] font-bold text-[#002333] group-hover:text-[#5BBB7B] transition-colors line-clamp-1">
                          {job.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-slate-400 font-medium">
                          <span className="flex items-center gap-1.5 whitespace-nowrap">
                            <MapPin size={14} className="text-[#5BBB7B]" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5 whitespace-nowrap">
                            <Briefcase size={14} className="text-[#5BBB7B]" />
                            {job.category} • {job.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-6 md:col-span-2 mt-4 md:mt-0 flex md:justify-center items-center">
                      <span className="text-[13px] font-bold text-slate-400 md:hidden mr-2">
                        Status:{" "}
                      </span>
                      <span className="px-4 py-1.5 bg-green-50 text-[#5BBB7B] text-[13px] font-bold rounded-full border border-green-100">
                        {job.status}
                      </span>
                    </div>

                    <div className="col-span-6 md:col-span-2 mt-4 md:mt-0 flex md:justify-center items-center">
                      <span className="text-[13px] font-bold text-slate-400 md:hidden mr-2">
                        Applied:{" "}
                      </span>
                      <div className="flex items-center gap-2 text-[14px] font-bold text-[#002333]">
                        {job.appliedDate}
                      </div>
                    </div>

                    <div className="col-span-12 md:col-span-2 mt-6 md:mt-0 flex justify-end items-center pr-4">
                      <div className="flex items-center gap-2">
                        <Tooltip text="View Details">
                          <button className="w-10 h-10 rounded-xl bg-[#5BBB7B]/10 text-[#5BBB7B] flex items-center justify-center transition-all duration-300 hover:bg-[#5BBB7B] hover:text-white hover:shadow-lg hover:shadow-[#5BBB7B]/30 active:scale-95 group/btn overflow-hidden relative">
                            <UserCheck
                              size={18}
                              className="relative z-10 transition-transform duration-500 group-hover/btn:scale-110"
                            />
                          </button>
                        </Tooltip>
                        <Tooltip text="Delete Application">
                          <button className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/30 active:scale-95 group/btn overflow-hidden relative">
                            <Meh
                              size={18}
                              className="relative z-10 transition-transform duration-500 group-hover/btn:[transform:rotateY(180deg)]"
                            />
                          </button>
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                    <Search size={40} />
                  </div>
                  <h5 className="text-[18px] font-bold text-[#002333]">
                    No jobs found
                  </h5>
                  <p className="text-slate-400 mt-1">
                    Try changing your category filter
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
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
                ),
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

export default AppliedJobs;
