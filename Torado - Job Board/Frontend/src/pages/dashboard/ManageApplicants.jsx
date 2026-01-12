import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Calendar,
  Star,
  Download,
  MessageCircle,
  Edit,
  FileText,
  Bookmark,
  ChevronDown,
  Globe,
  Users,
  FlaskConical,
  Eye,
  FileSearch,
} from "lucide-react";

// The "Door" effect button component
const DoorButton = ({ children, className = "", hoverBg = "bg-[#002333]" }) => {
  return (
    <button
      className={`relative overflow-hidden group/btn transition-all duration-500 ease-in-out ${className}`}
    >
      <span
        className={`absolute inset-0 w-full h-full ${hoverBg} scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) origin-center`}
      ></span>
      <span className="relative z-10 flex items-center justify-center gap-2 group-hover/btn:text-white transition-colors duration-500 ease-in-out">
        {children}
      </span>
    </button>
  );
};

const ApplicantCard = ({ applicant }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl p-4 md:p-6 shadow-[0_1px_5px_rgba(0,0,0,0.05)] border border-slate-100 hover:shadow-xl transition-all"
    >
      <div className="flex flex-col md:flex-row gap-5 md:gap-6">
        {/* Profile Image - Centered on mobile */}
        <div className="relative w-20 h-20 md:w-20 md:h-20 lg:w-24 lg:h-24 shrink-0 self-center md:self-start mb-2 md:mb-0">
          <img
            src={applicant.image}
            alt={applicant.name}
            className="w-full h-full rounded-full object-cover ring-4 ring-slate-50 shadow-sm"
          />
        </div>

        {/* Content Area */}
        <div className="flex-1 w-full">
          {/* Identity Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left mb-4">
            <h3 className="text-[19px] md:text-[18px] font-bold text-[#004F6D] mb-1 hover:text-[#5BBB7B] transition-colors cursor-pointer leading-tight">
              {applicant.name}
            </h3>
            <p className="text-[#64748B] text-[14px] md:text-[14px] mb-3 font-medium opacity-90">
              {applicant.category}
            </p>

            {/* Location & Job Title - Side by side on mobile */}
            <div className="flex flex-row items-center justify-center md:justify-start gap-4 md:gap-6">
              <div className="flex items-center gap-1.5 text-[#5BBB7C] text-[13px] md:text-[13px] font-bold">
                <Globe size={15} strokeWidth={2.5} />
                <span className="truncate max-w-[100px] md:max-w-none">
                  {applicant.location}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[#5BBB7C] text-[13px] md:text-[13px] font-bold">
                <FlaskConical size={15} strokeWidth={2.5} />
                <span className="truncate max-w-[120px] md:max-w-none">
                  {applicant.jobTitle}
                </span>
              </div>
            </div>
          </div>

          {/* Primary Actions (Mobile Only - Middle Row) */}
          <div className="flex flex-row gap-3 mb-5 md:hidden">
            <DoorButton
              hoverBg="bg-[#6A7BFE]"
              className="flex-1 px-4 py-2 bg-[#F0F5FF] text-[#6A7BFE] rounded-lg text-[12px] font-extrabold shadow-sm whitespace-nowrap"
            >
              Download CV
            </DoorButton>
            <DoorButton
              hoverBg="bg-[#5BBB7B]"
              className="flex-1 px-4 py-2 bg-[#EAF7ED] text-[#5BBB7B] rounded-lg text-[12px] font-extrabold shadow-sm whitespace-nowrap"
            >
              Message
            </DoorButton>
          </div>

          {/* Date & Rating Row (Side by side on mobile) */}
          <div className="flex flex-row items-center justify-between md:justify-start gap-4 mb-5 md:mb-6">
            <div className="flex flex-row items-center gap-2 text-[#64748B] text-[13px] md:text-[14px] font-medium opacity-80">
              <div className="text-[#5BBB7C]">
                <Users size={18} strokeWidth={2} />
              </div>
              <span>{applicant.date}</span>
            </div>

            <div className="flex flex-col items-end md:items-start md:ml-auto">
              <div className="flex text-orange-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill={i < Math.floor(applicant.rating) ? "#FFA500" : "none"}
                    className={
                      i < Math.floor(applicant.rating)
                        ? "text-[#FFA500]"
                        : "text-[#E5E7EB]"
                    }
                    strokeWidth={i < Math.floor(applicant.rating) ? 0 : 2}
                  />
                ))}
              </div>
              <span className="text-[12px] text-[#64748B] font-bold mt-0.5 opacity-80">
                {applicant.rating.toFixed(1)} ({applicant.reviews} Review)
              </span>
            </div>
          </div>

          {/* Mobile Secondary Actions (Bottom Row) */}
          <div className="flex flex-row gap-2.5 pt-4 border-t border-slate-50 md:hidden">
            <DoorButton
              hoverBg="bg-[#8E7E7E]"
              className="flex-1 px-2 py-2 bg-[#F3EEEE] text-[#8E7E7E] rounded-lg font-bold text-[12px] whitespace-nowrap"
            >
              <div className="flex items-center justify-center gap-1.5">
                <div className="p-0.5 rounded bg-[#8E7E7E]/10">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
                <span>Edit</span>
              </div>
            </DoorButton>
            <DoorButton
              hoverBg="bg-[#5BBB7B]"
              className="flex-1 px-2 py-2 bg-[#EAF7ED] text-[#5BBB7B] rounded-lg font-bold text-[12px] whitespace-nowrap"
            >
              <div className="flex items-center justify-center gap-1.5">
                <div className="p-0.5 rounded bg-[#5BBB7B]/10">
                  <FileText size={12} strokeWidth={2.5} />
                </div>
                <span>Note</span>
              </div>
            </DoorButton>
            <DoorButton
              hoverBg="bg-[#6A7BFE]"
              className="flex-1 px-2 py-2 bg-[#F0F5FF] text-[#6A7BFE] rounded-lg font-bold text-[12px] whitespace-nowrap"
            >
              <div className="flex items-center justify-center gap-1.5">
                <div className="p-0.5 rounded bg-[#6A7BFE]/10">
                  <Bookmark size={12} strokeWidth={2.5} />
                </div>
                <span>Save</span>
              </div>
            </DoorButton>
          </div>

          {/* Desktop Actions Area (Hidden on mobile) */}
          <div className="hidden md:flex pt-6 border-t border-slate-50 flex-row items-center gap-5">
            <div className="flex flex-row gap-3">
              <DoorButton
                hoverBg="bg-[#6A7BFE]"
                className="px-8 py-2.5 bg-[#F0F5FF] text-[#6A7BFE] rounded-lg text-[13px] font-bold shadow-sm whitespace-nowrap"
              >
                Download CV
              </DoorButton>
              <DoorButton
                hoverBg="bg-[#5BBB7B]"
                className="px-8 py-2.5 bg-[#EAF7ED] text-[#5BBB7B] rounded-lg text-[13px] font-bold shadow-sm whitespace-nowrap"
              >
                Message
              </DoorButton>
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <DoorButton
                hoverBg="bg-[#8E7E7E]"
                className="px-4 py-2.5 bg-[#F3EEEE] text-[#8E7E7E] rounded-lg font-bold text-[13px] whitespace-nowrap"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-[#8E7E7E]/10">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  </div>
                  <span>Edit</span>
                </div>
              </DoorButton>
              <DoorButton
                hoverBg="bg-[#5BBB7B]"
                className="px-4 py-2.5 bg-[#EAF7ED] text-[#5BBB7B] rounded-lg font-bold text-[13px] whitespace-nowrap"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-[#5BBB7B]/10">
                    <FileText size={14} strokeWidth={2.5} />
                  </div>
                  <span>Note</span>
                </div>
              </DoorButton>
              <DoorButton
                hoverBg="bg-[#6A7BFE]"
                className="px-4 py-2.5 bg-[#F0F5FF] text-[#6A7BFE] rounded-lg font-bold text-[13px] whitespace-nowrap"
              >
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-[#6A7BFE]/10">
                    <Bookmark size={14} strokeWidth={2.5} />
                  </div>
                  <span>Save</span>
                </div>
              </DoorButton>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ManageApplicants = () => {
  const initialApplicants = [
    // ... (rest of initialApplicants array remains the same)
    {
      id: 1,
      name: "Maève Parisian",
      category: "Creative",
      location: "London, UK",
      jobTitle: "Web Designer",
      date: "31-Jan-2025",
      rating: 4.8,
      reviews: 12,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Bernardo Hermiston",
      category: "Creative",
      location: "London, UK",
      jobTitle: "Web Developer",
      date: "15-Jan-2025",
      rating: 4.5,
      reviews: 8,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Lindsay Schiller",
      category: "Creative",
      location: "London, UK",
      jobTitle: "Marketing Manager",
      date: "20-Jan-2025",
      rating: 4.2,
      reviews: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
      id: 4,
      name: "Bernita Mitchell",
      category: "Creative",
      location: "London, UK",
      jobTitle: "Web Designer",
      date: "05-Jan-2025",
      rating: 4.9,
      reviews: 15,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
      id: 5,
      name: "Vernice Reinger",
      category: "Creative",
      location: "London, UK",
      jobTitle: "Software Engineer",
      date: "10-Jan-2025",
      rating: 4.0,
      reviews: 3,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
      id: 6,
      name: "Esteban Bednar",
      category: "UI/UX Designer",
      location: "London, UK",
      jobTitle: "Technical Architect",
      date: "25-Jan-2025",
      rating: 4.7,
      reviews: 10,
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop",
    },
    {
      id: 7,
      name: "Lillie Goodwin",
      category: "Creative",
      location: "London, UK",
      jobTitle: "UX/UI Designer",
      date: "28-Jan-2025",
      rating: 4.6,
      reviews: 7,
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&h=200&auto=format&fit=crop",
    },
  ];

  const allApplicants = useMemo(() => {
    const apps = [...initialApplicants];
    for (let i = 1; i <= 23; i++) {
      apps.push({
        ...initialApplicants[i % initialApplicants.length],
        id: initialApplicants.length + i,
        name: `${initialApplicants[i % initialApplicants.length].name} ${i}`,
      });
    }
    return apps;
  }, []);

  const [selectedSort, setSelectedSort] = useState("Default");
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  const sortedApplicants = useMemo(() => {
    let sorted = [...allApplicants];
    if (selectedSort === "Newest") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (selectedSort === "Oldest") {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (selectedSort === "Rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    }
    return sorted;
  }, [selectedSort, allApplicants]);

  const totalPages = Math.ceil(sortedApplicants.length / itemsPerPage);

  const currentApplicants = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedApplicants.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedApplicants, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-bold text-[#002333]">
            Manage Applicants
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
            <span className="text-[#5BBB7B]">Manage Applicants</span>
          </div>
        </div>
      </div>

      {/* Filter Header */}
      <div className="bg-white rounded-[20px] p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <p className="text-[15px] font-medium text-slate-500">
          Showing{" "}
          <span className="text-[#002333] font-bold">
            {allApplicants.length} applicants
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <select
              value={selectedSort}
              onChange={(e) => {
                setSelectedSort(e.target.value);
                setCurrentPage(1);
              }}
              className="appearance-none bg-slate-50 border-none rounded-xl px-5 py-2.5 pr-10 text-[14px] font-bold text-[#002333] cursor-pointer focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none w-[180px]"
            >
              <option value="Default">Sort by (Default)</option>
              <option value="Newest">Newest</option>
              <option value="Oldest">Oldest</option>
              <option value="Rating">Highest Rating</option>
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

      <div className="space-y-6 min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedSort}-${currentPage}-${itemsPerPage}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {currentApplicants.map((applicant) => (
              <ApplicantCard key={applicant.id} applicant={applicant} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
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

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
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
            ))}

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
    </div>
  );
};

export default ManageApplicants;
