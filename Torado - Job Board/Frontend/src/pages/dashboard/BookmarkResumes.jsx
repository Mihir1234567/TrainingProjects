import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
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

const BookmarkResumes = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedSort, setSelectedSort] = useState("Default");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const allResumes = [
    // ... (rest of initialResumes array remains the same)
    // Development
    {
      id: 1,
      title: "Fresher UI/UX Designer",
      location: "London, UK",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev1",
      iconBg: "bg-[#F0F5FF]",
      category: "Web Design",
    },
    {
      id: 2,
      title: "Advance Magento Developer",
      location: "London, UK",
      type: "Part Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev2",
      iconBg: "bg-[#FDF2F2]",
      category: "Development",
    },
    {
      id: 3,
      title: "Senior IOS App Developer",
      location: "London, UK",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev3",
      iconBg: "bg-[#F0FDF4]",
      category: "Development",
    },
    {
      id: 7,
      title: "Full Stack Engineer",
      location: "Berlin, DE",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dev4",
      iconBg: "bg-[#FDF2F2]",
      category: "Development",
    },

    // Web Design
    {
      id: 4,
      title: "Basic WordPress Developer",
      location: "London, UK",
      type: "Part Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Web1",
      iconBg: "bg-[#FFF7ED]",
      category: "Web Design",
    },
    {
      id: 8,
      title: "UI/UX Visual Artist",
      location: "Paris, FR",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Web2",
      iconBg: "bg-[#F0F5FF]",
      category: "Web Design",
    },
    {
      id: 9,
      title: "Frontend Stylist",
      location: "Milan, IT",
      type: "Contract",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Web3",
      iconBg: "bg-[#FDF2F2]",
      category: "Web Design",
    },

    // Multimedia
    {
      id: 6,
      title: "Senior Product Designer",
      location: "London, UK",
      type: "Part Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Multi1",
      iconBg: "bg-[#FFF1F2]",
      category: "Multimedia",
    },
    {
      id: 10,
      title: "Motion Graphics Expert",
      location: "Tokyo, JP",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Multi2",
      iconBg: "bg-[#FFF7ED]",
      category: "Multimedia",
    },
    {
      id: 11,
      title: "Video Content Editor",
      location: "Seoul, KR",
      type: "Part Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Multi3",
      iconBg: "bg-[#F5F3FF]",
      category: "Multimedia",
    },

    // Marketing
    {
      id: 5,
      title: "Technical Content Writer",
      location: "London, UK",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark1",
      iconBg: "bg-[#F5F3FF]",
      category: "Marketing",
    },
    {
      id: 12,
      title: "Digital Strategy Lead",
      location: "New York, US",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark2",
      iconBg: "bg-[#FDF2F2]",
      category: "Marketing",
    },
    {
      id: 13,
      title: "SEO Specialist",
      location: "Sydney, AU",
      type: "Contract",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mark3",
      iconBg: "bg-[#F0FDF4]",
      category: "Marketing",
    },

    // Resources
    {
      id: 14,
      title: "HR Business Partner",
      location: "Toronto, CA",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Res1",
      iconBg: "bg-[#F0F5FF]",
      category: "Resources",
    },
    {
      id: 15,
      title: "Talent Acquisition Manager",
      location: "Austin, US",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Res2",
      iconBg: "bg-[#F5F3FF]",
      category: "Resources",
    },
    {
      id: 16,
      title: "Employee Exp. Designer",
      location: "London, UK",
      type: "Part Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Res3",
      iconBg: "bg-[#FFF1F2]",
      category: "Resources",
    },

    // Financing & Finance
    {
      id: 17,
      title: "Credit Risk Analyst",
      location: "Zurich, CH",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fin1",
      iconBg: "bg-[#FDF2F2]",
      category: "Financing",
    },
    {
      id: 18,
      title: "Loan Officer",
      location: "Singapore, SG",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fin2",
      iconBg: "bg-[#F0FDF4]",
      category: "Financing",
    },
    {
      id: 19,
      title: "Investment Banker",
      location: "Hong Kong, HK",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fin3",
      iconBg: "bg-[#F0F5FF]",
      category: "Finance",
    },
    {
      id: 20,
      title: "Tax Consultant",
      location: "Dubai, AE",
      type: "Contract",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fin4",
      iconBg: "bg-[#F5F3FF]",
      category: "Finance",
    },
    {
      id: 21,
      title: "Financial Planner",
      location: "London, UK",
      type: "Part Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Fin5",
      iconBg: "bg-[#FFF7ED]",
      category: "Finance",
    },

    // Software & Programming
    {
      id: 22,
      title: "Backend Systems Architect",
      location: "Seattle, US",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Soft1",
      iconBg: "bg-[#F0F5FF]",
      category: "Software",
    },
    {
      id: 23,
      title: "QA Automation Engineer",
      location: "Dublin, IE",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Soft2",
      iconBg: "bg-[#F0FDF4]",
      category: "Software",
    },
    {
      id: 24,
      title: "Kubernetes Admin",
      location: "Remote",
      type: "Contract",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Soft3",
      iconBg: "bg-[#F5F3FF]",
      category: "Software",
    },
    {
      id: 25,
      title: "Python Developer",
      location: "Amsterdam, NL",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Prog1",
      iconBg: "bg-[#FDF2F2]",
      category: "Programming",
    },
    {
      id: 26,
      title: "Go Specialist",
      location: "San Francisco, US",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Prog2",
      iconBg: "bg-[#FFF7ED]",
      category: "Programming",
    },
    {
      id: 27,
      title: "Rust Embedded Engineer",
      location: "Boston, US",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Prog3",
      iconBg: "bg-[#F0F5FF]",
      category: "Programming",
    },

    // Accounting
    {
      id: 28,
      title: "Certified Public Accountant",
      location: "Chicago, US",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Acc1",
      iconBg: "bg-[#F5F3FF]",
      category: "Accounting",
    },
    {
      id: 29,
      title: "Senior Auditor",
      location: "Paris, FR",
      type: "Full Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Acc2",
      iconBg: "bg-[#FFF1F2]",
      category: "Accounting",
    },
    {
      id: 30,
      title: "Payroll Manager",
      location: "London, UK",
      type: "Part Time",
      status: "Active",
      date: "31 Jan 2025",
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Acc3",
      iconBg: "bg-[#FDF2F2]",
      category: "Accounting",
    },
  ];

  const categories = [
    "All Categories",
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

  const filteredResumes = useMemo(() => {
    let result =
      selectedCategory === "All Categories"
        ? allResumes
        : allResumes.filter((resume) => resume.category === selectedCategory);

    if (selectedSort === "Newest") {
      result = [...result].sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (selectedSort === "Oldest") {
      result = [...result].sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return result;
  }, [selectedCategory, selectedSort, allResumes]);

  const totalPages = Math.ceil(filteredResumes.length / itemsPerPage);

  const paginatedResumes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredResumes.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredResumes, currentPage, itemsPerPage]);

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
          Bookmark Resumes
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
          <span className="text-[#5BBB7B]">Bookmark Resumes</span>
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
            You have bookmarked{" "}
            <span className="text-[#002333] font-bold">
              {filteredResumes.length} resumes
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
                  Candidate
                </th>
                <th className="px-3 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider text-center">
                  Status
                </th>
                <th className="px-3 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider text-center">
                  Applied Date
                </th>
                <th className="px-5 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider text-right pr-4">
                  Action
                </th>
              </tr>
            </thead>
            <AnimatePresence mode="wait">
              <motion.tbody
                key={`${selectedCategory}-${currentPage}-${itemsPerPage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="divide-y divide-slate-100 min-h-[400px]"
              >
                {paginatedResumes.length > 0 ? (
                  paginatedResumes.map((resume) => (
                    <tr
                      key={resume.id}
                      className="group hover:bg-slate-50/30 transition-all duration-300"
                    >
                      <td className="px-5 py-6">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-12 h-12 rounded-2xl ${resume.iconBg} flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 shadow-sm border border-white overflow-hidden`}
                          >
                            <img
                              src={resume.image}
                              alt={resume.title}
                              className="w-8 h-8 rounded-full"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-[16px] font-bold text-[#002333] group-hover:text-[#5BBB7B] transition-colors leading-snug truncate">
                              {resume.title}
                            </h4>
                            <div className="flex items-center gap-3 text-[13px] text-slate-400 font-medium mt-1">
                              <span className="flex items-center gap-1.5">
                                <MapPin size={12} className="text-[#5BBB7B]" />
                                {resume.location}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Briefcase
                                  size={12}
                                  className="text-[#5BBB7B]"
                                />
                                {resume.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-6 text-center">
                        <span className="px-4 py-1.5 bg-green-50 text-[#5BBB7B] text-[13px] font-bold rounded-full border border-green-100 italic">
                          {resume.status}
                        </span>
                      </td>
                      <td className="px-3 py-6 text-center text-[14px] font-bold text-[#002333] italic">
                        {resume.date}
                      </td>
                      <td className="px-5 py-6 text-right pr-4">
                        <div className="flex items-center justify-end gap-2">
                          <Tooltip text="View Profile">
                            <button className="w-10 h-10 rounded-xl bg-[#5BBB7B]/10 text-[#5BBB7B] flex items-center justify-center transition-all duration-300 hover:bg-[#5BBB7B] hover:text-white hover:shadow-lg hover:shadow-[#5BBB7B]/30 active:scale-95 group/btn overflow-hidden relative">
                              <UserCheck
                                size={18}
                                className="relative z-10 transition-transform duration-500 group-hover/btn:scale-110"
                              />
                            </button>
                          </Tooltip>
                          <Tooltip text="Remove Bookmark">
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
                          No resumes found
                        </h5>
                        <p className="text-slate-400 mt-1">
                          Try changing your category filter
                        </p>
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
          {paginatedResumes.map((resume) => (
            <div key={resume.id} className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div
                  className={`w-14 h-14 rounded-2xl ${resume.iconBg} flex items-center justify-center shrink-0 shadow-sm border border-white overflow-hidden`}
                >
                  <img
                    src={resume.image}
                    alt={resume.title}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[16px] font-bold text-[#002333] leading-tight truncate">
                    {resume.title}
                  </h4>
                  <p className="text-[#5BBB7B] text-[13px] font-bold mt-1">
                    {resume.status}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-[13px] text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} className="text-[#5BBB7B]" />
                  {resume.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase size={12} className="text-[#5BBB7B]" />
                  {resume.type}
                </span>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <span className="text-[13px] text-slate-400 font-medium">
                  Applied:{" "}
                  <span className="text-[#002333] font-bold">
                    {resume.date}
                  </span>
                </span>
                <div className="flex gap-2">
                  <button className="p-2.5 bg-[#5BBB7B]/10 text-[#5BBB7B] rounded-lg hover:bg-[#5BBB7B] hover:text-white transition-all">
                    <UserCheck size={18} />
                  </button>
                  <button className="p-2.5 bg-orange-50 text-orange-500 rounded-lg hover:bg-orange-500 hover:text-white transition-all">
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

export default BookmarkResumes;
