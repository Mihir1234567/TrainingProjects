import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { jobsAPI } from "../../services/api";
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
  ChevronDown,
  MapPin,
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

const ManageJobs = () => {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedSort, setSelectedSort] = useState("Default");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Jobs on Mount
  useEffect(() => {
    const fetchMyJobs = async () => {
      try {
        const data = await jobsAPI.getMyJobs();
        setJobs(data);
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyJobs();
  }, []);

  const handleDeleteJob = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await jobsAPI.delete(id);
        setJobs((prev) => prev.filter((job) => job._id !== id));
      } catch (error) {
        console.error("Failed to delete job", error);
        alert("Failed to delete job");
      }
    }
  };

  const handleEditJob = (id) => {
    navigate(`/user-dashboard/post-job?id=${id}`);
  };

  const handleViewApplicants = (id) => {
    navigate(`/job/${id}`);
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "Closed" ? "Active" : "Closed";
    try {
      // Optimistic update
      setJobs((prev) =>
        prev.map((job) =>
          job._id === id ? { ...job, status: newStatus } : job,
        ),
      );
      await jobsAPI.update(id, { status: newStatus });
    } catch (error) {
      console.error("Failed to update status", error);
      // Revert if failed
      setJobs((prev) =>
        prev.map((job) =>
          job._id === id ? { ...job, status: currentStatus } : job,
        ),
      );
      alert("Failed to update status");
    }
  };

  const allJobs = useMemo(() => {
    return jobs.map((job) => {
      let Icon = Briefcase;
      let iconColor = "text-slate-600";
      let iconBg = "bg-slate-100/50";

      if (job.category === "Design") {
        Icon = Layout;
        iconColor = "text-[#5BBB7B]";
        iconBg = "bg-green-100/50";
      } else if (job.category === "Technology") {
        Icon = Smartphone;
        iconColor = "text-blue-600";
        iconBg = "bg-blue-100/50";
      } else if (job.category === "Marketing") {
        Icon = Search;
        iconColor = "text-orange-600";
        iconBg = "bg-orange-100/50";
      }

      // Calculate expiry date (30 days from creation)
      const createdDate = new Date(job.createdAt);
      const expiryDate = new Date(createdDate);
      expiryDate.setDate(createdDate.getDate() + 30);

      return {
        id: job._id,
        title: job.title,
        status: job.status || "Active",
        filled: job.status === "Closed",
        postedDate: createdDate.toLocaleDateString(),
        expiredDate: expiryDate.toLocaleDateString(),
        applications: job.applicationsCount || 0,
        icon: Icon,
        iconBg: iconBg,
        iconColor: iconColor,
      };
    });
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    let result =
      selectedStatus === "All Status"
        ? allJobs
        : allJobs.filter((job) => job.status === selectedStatus);

    if (selectedSort === "Newest") {
      result = [...result].sort(
        (a, b) => new Date(b.postedDate) - new Date(a.postedDate),
      );
    } else if (selectedSort === "Oldest") {
      result = [...result].sort(
        (a, b) => new Date(a.postedDate) - new Date(b.postedDate),
      );
    }

    return result;
  }, [selectedStatus, selectedSort, allJobs]);

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
        <div>
          <h2 className="text-[22px] font-bold text-[#002333]">Manage Jobs</h2>
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
            <span className="text-[#5BBB7B]">Manage Jobs</span>
          </div>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-white rounded-[20px] p-5 shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100">
        <p className="text-pink-500 font-bold text-center md:text-left text-[15px]">
          Your listings will be automatically removed after 30 days.
        </p>
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[20px] shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden"
      >
        {/* Table Filter Header */}
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-[15px] font-medium text-slate-500">
            You have posted{" "}
            <span className="text-[#002333] font-bold">
              {allJobs.length} jobs
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-slate-50 border-none rounded-xl px-5 py-2.5 pr-10 text-[14px] font-bold text-[#002333] cursor-pointer focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none w-[140px]"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Pending</option>
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

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-slate-50/50 text-left border-b border-slate-100">
                <th className="px-5 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider">
                  Title
                </th>
                <th className="px-3 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider text-center">
                  Filled
                </th>
                <th className="px-3 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider text-center">
                  Posted Date
                </th>
                <th className="px-3 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider text-center">
                  Expired
                </th>
                <th className="px-3 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider text-center">
                  Applications
                </th>
                <th className="px-5 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider text-right pr-4">
                  Action
                </th>
              </tr>
            </thead>
            <AnimatePresence mode="wait">
              <motion.tbody
                key={`${selectedStatus}-${currentPage}-${itemsPerPage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="divide-y divide-slate-100 min-h-[400px]"
              >
                {currentJobs.length > 0 ? (
                  currentJobs.map((job) => (
                    <tr
                      key={job.id}
                      className="group hover:bg-slate-50/30 transition-all duration-300"
                    >
                      <td className="px-4 py-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-11 h-11 rounded-2xl ${job.iconBg} ${job.iconColor} flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-sm border border-white`}
                          >
                            <job.icon size={20} />
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-[15px] font-bold text-[#002333] group-hover:text-[#5BBB7B] transition-colors leading-snug truncate">
                              {job.title}
                            </h4>
                            <div className="flex items-center gap-2 text-[12px] text-slate-400 font-medium mt-1">
                              <span className="flex items-center gap-1.5">
                                <MapPin size={12} className="text-[#5BBB7B]" />
                                London, UK
                              </span>
                              {job.status && (
                                <span
                                  className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase transition-colors ${
                                    job.status === "Pending"
                                      ? "bg-amber-50 text-amber-500"
                                      : "bg-green-50 text-[#5BBB7B]"
                                  }`}
                                >
                                  {job.status}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <div className="flex justify-center">
                          {job.filled ? (
                            <Tooltip text="Mark as Vacant">
                              <button
                                onClick={() =>
                                  handleToggleStatus(job.id, "Closed")
                                }
                                className="w-10 h-10 bg-green-50 text-[#5BBB7B] rounded-xl flex items-center justify-center border border-green-100 shadow-sm hover:scale-110 transition-transform"
                              >
                                <CheckCircle size={20} />
                              </button>
                            </Tooltip>
                          ) : (
                            <Tooltip text="Mark as Filled">
                              <button
                                onClick={() =>
                                  handleToggleStatus(job.id, job.status)
                                }
                                className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center border border-slate-100 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                              >
                                <PhoneCall size={18} />
                              </button>
                            </Tooltip>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-5 text-center text-[13px] font-bold text-[#002333]">
                        {job.postedDate}
                      </td>
                      <td className="px-3 py-5 text-center text-[13px] font-bold text-[#002333]">
                        {job.expiredDate}
                      </td>
                      <td className="px-3 py-5 text-center">
                        {job.applications === 0 ? (
                          <span className="text-slate-300 font-bold text-[13px]">
                            00
                          </span>
                        ) : (
                          <span className="px-3 py-1.5 bg-[#F0F5FF] text-[#1967D2] rounded-full text-[12px] font-bold border border-blue-50 hover:border-[#1967D2]/20 transition-all whitespace-nowrap inline-flex items-center justify-center gap-1.5">
                            {job.applications < 10
                              ? `0${job.applications}`
                              : job.applications}{" "}
                            Applications
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-5 text-right pr-4">
                        <div className="flex items-center justify-end gap-2">
                          <Tooltip text="View Applicants">
                            <button
                              onClick={() => handleViewApplicants(job.id)}
                              className="w-10 h-10 rounded-xl bg-[#5BBB7B]/10 text-[#5BBB7B] flex items-center justify-center transition-all duration-300 hover:bg-[#5BBB7B] hover:text-white hover:shadow-lg hover:shadow-[#5BBB7B]/30 active:scale-95 group/btn overflow-hidden relative"
                            >
                              <Users
                                size={18}
                                className="relative z-10 transition-transform duration-500 group-hover/btn:scale-110"
                              />
                            </button>
                          </Tooltip>
                          <Tooltip text="Edit Job">
                            <button
                              onClick={() => handleEditJob(job.id)}
                              className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/30 active:scale-95 group/btn overflow-hidden relative"
                            >
                              <Database
                                size={18}
                                className="relative z-10 transition-transform duration-500 group-hover/btn:scale-110"
                              />
                            </button>
                          </Tooltip>
                          <Tooltip text="Delete Job">
                            <button
                              onClick={() => handleDeleteJob(job.id)}
                              className="w-10 h-10 rounded-xl bg-red-50 text-red-500 flex items-center justify-center transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/30 active:scale-95 group/btn overflow-hidden relative"
                            >
                              <Trash2
                                size={18}
                                className="relative z-10 transition-transform duration-500 group-hover/btn:scale-110"
                              />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-20 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                          <Search size={40} />
                        </div>
                        <h5 className="text-[18px] font-bold text-[#002333]">
                          No jobs found
                        </h5>
                        <p className="text-slate-400 mt-1">
                          Try changing your status filter
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </motion.tbody>
            </AnimatePresence>
          </table>
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

export default ManageJobs;
