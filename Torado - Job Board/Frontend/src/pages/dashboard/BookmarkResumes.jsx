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
  const [selectedCategory, setSelectedCategory] = useState("All Jobs");
  const [itemsToDisplay, setItemsToDisplay] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef(null);
  const showDropdownRef = useRef(null);

  const initialResumes = [
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

    // Financing & Finance (separating them as per user image)
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

  const showCounts = [20, 30, 10, 8, 5, 2];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        showDropdownRef.current &&
        !showDropdownRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredResumes = initialResumes.filter(
    (resume) =>
      selectedCategory === "All Jobs" || resume.category === selectedCategory
  );

  const totalPages = Math.ceil(filteredResumes.length / itemsToDisplay);
  const paginatedResumes = filteredResumes.slice(
    (currentPage - 1) * itemsToDisplay,
    currentPage * itemsToDisplay
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, itemsToDisplay]);

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
      <div className="bg-white rounded-xl p-4 md:px-6 md:py-5 shadow-sm border border-slate-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative">
        <div className="flex flex-col gap-1">
          <p className="text-[#64748B] text-sm font-medium">
            You have bookmarked{" "}
            <span className="text-[#1967D2] font-bold">
              {filteredResumes.length}
            </span>{" "}
            resumes
          </p>
          {selectedCategory !== "All Jobs" && (
            <button
              onClick={() => {
                setSelectedCategory("All Jobs");
              }}
              className="text-[#1967D2] text-[13px] font-bold hover:underline w-fit"
            >
              Clear All Filters
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Filter Dropdown */}
          <div className="relative w-full sm:w-auto" ref={dropdownRef}>
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "filter" ? null : "filter")
              }
              className="flex items-center gap-6 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm text-[#002333] font-medium hover:border-[#5BBB7B] transition-all w-full sm:min-w-[200px] justify-between"
            >
              <span>{selectedCategory}</span>
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform ${
                  activeDropdown === "filter" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`absolute left-0 top-full mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl py-1 transform transition-all duration-200 z-[70] ${
                activeDropdown === "filter"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#1967D2] text-white font-bold"
                      : "text-[#64748B] hover:bg-slate-50 hover:text-[#5BBB7B]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Show Count Dropdown */}
          <div className="relative w-full sm:w-auto" ref={showDropdownRef}>
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "show" ? null : "show")
              }
              className="flex items-center gap-6 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-lg text-sm text-[#002333] font-medium hover:border-[#5BBB7B] transition-all w-full sm:min-w-[140px] justify-between"
            >
              <span>Show {itemsToDisplay}</span>
              <ChevronDown
                size={14}
                className={`text-slate-400 transition-transform ${
                  activeDropdown === "show" ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`absolute left-0 top-full mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl py-1 transform transition-all duration-200 z-[70] ${
                activeDropdown === "show"
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              {showCounts.map((count) => (
                <button
                  key={count}
                  onClick={() => {
                    setItemsToDisplay(count);
                    setActiveDropdown(null);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                    itemsToDisplay === count
                      ? "bg-[#1967D2] text-white font-bold"
                      : "text-[#64748B] hover:bg-slate-50 hover:text-[#5BBB7B]"
                  }`}
                >
                  Show {count}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Table View (Hidden on Mobile) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hidden sm:block"
      >
        <div className="overflow-x-auto">
          {filteredResumes.length > 0 ? (
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
                {paginatedResumes.map((resume) => (
                  <tr
                    key={resume.id}
                    className="hover:bg-slate-50/30 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        {/* Job Icon/Image */}
                        <div
                          className={`w-12 h-12 ${resume.iconBg} rounded-full flex items-center justify-center shrink-0 transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)] group-hover:delay-100 [perspective:1000px]`}
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
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <Search size={32} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-[#002333] mb-1">
                No Resumes Found
              </h3>
              <p className="text-slate-500 text-sm max-w-xs text-center mb-6">
                We couldn't find any bookmarks in this category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All Jobs");
                }}
                className="px-6 py-2 bg-[#1967D2] text-white rounded-lg text-sm font-bold hover:bg-[#1967D2]/90 transition-all shadow-md shadow-blue-500/20"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Mobile Card View (Hidden on Desktop/Tablet) */}
      <div className="flex flex-col gap-4 sm:hidden">
        {filteredResumes.length > 0 ? (
          paginatedResumes.map((resume) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 space-y-4 group"
            >
              <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
                <div
                  className={`w-14 h-14 ${resume.iconBg} rounded-full flex items-center justify-center shrink-0 transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)] group-hover:delay-100 [perspective:1000px]`}
                >
                  <img
                    src={resume.image}
                    alt={resume.title}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-[16px] font-bold text-[#002333] mb-1 leading-tight">
                    {resume.title}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[13px] text-[#5BBB7B] font-medium">
                    {resume.status}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[13px] text-slate-500 font-medium pt-1">
                <div className="flex items-center gap-2">
                  <Globe size={14} className="text-[#5BBB7B]" />
                  <span>{resume.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase size={14} className="text-[#5BBB7B]" />
                  <span>{resume.type}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                  <span className="text-slate-400">Bookmarked on:</span>
                  <span className="text-[#002333] font-bold">
                    {resume.date}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50 gap-3">
                <button className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-[#5BBB7B]/10 text-[#5BBB7B] rounded-lg font-bold text-sm hover:bg-[#5BBB7B] hover:text-white transition-all">
                  <UserCheck size={18} />
                  <span>View</span>
                </button>
                <button className="flex items-center justify-center gap-2 flex-1 py-2.5 bg-orange-50 text-orange-500 rounded-lg font-bold text-sm hover:bg-orange-500 hover:text-white transition-all">
                  <Meh size={18} />
                  <span>Remove</span>
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-slate-400" />
            </div>
            <h3 className="text-md font-bold text-[#002333] mb-1">
              No Results Found
            </h3>
            <button
              onClick={() => {
                setSelectedCategory("All Jobs");
              }}
              className="text-[#1967D2] text-sm font-bold hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-4">
          {[...Array(totalPages)].map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-[13px] sm:text-sm transition-all ${
                  currentPage === pageNum
                    ? "bg-[#5BBB7B] text-white shadow-md shadow-[#5BBB7B]/20"
                    : "bg-white border border-slate-100 text-slate-600 hover:border-[#5BBB7B] hover:text-[#5BBB7B]"
                }`}
              >
                {pageNum < 10 ? `0${pageNum}` : pageNum}
              </button>
            );
          })}
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center bg-white border border-slate-100 text-slate-600 transition-all hover:border-[#5BBB7B] hover:text-[#5BBB7B] ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <ChevronDown size={18} className="-rotate-90" />
          </button>
        </div>
      )}
    </div>
  );
};

export default BookmarkResumes;
