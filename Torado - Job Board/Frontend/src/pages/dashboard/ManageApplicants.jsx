import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
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
                <span className="truncate max-w-[100px] md:max-w-none">{applicant.location}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#5BBB7C] text-[13px] md:text-[13px] font-bold">
                <FlaskConical size={15} strokeWidth={2.5} />
                <span className="truncate max-w-[120px] md:max-w-none">{applicant.jobTitle}</span>
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
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
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
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
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

  const [applicants, setApplicants] = useState(initialApplicants);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Sort by (Default)");
  const sortRef = useRef(null);

  const sortOptions = [
    { label: "Sort by (Default)", value: "Default" },
    { label: "Newest", value: "Newest" },
    { label: "Oldest", value: "Oldest" },
    { label: "Highest Rating", value: "Rating" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSort = (option) => {
    setSelectedSort(option.label);
    setIsSortOpen(false);

    let sorted = [...applicants];
    if (option.value === "Newest") {
      sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (option.value === "Oldest") {
      sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (option.value === "Rating") {
      sorted.sort((a, b) => b.rating - a.rating);
    } else {
      sorted = [...initialApplicants];
    }
    setApplicants(sorted);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#002333] mb-1">
            Manage Applicants
          </h2>
          <div className="text-sm text-slate-500">
            <span className="font-semibold text-[#002333]">Home</span> /{" "}
            <span>Dashboard</span> /{" "}
            <span className="text-[#5BBB7B]">Manage Applicants</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <p className="text-[#1967D2] font-semibold text-sm">
          {applicants.length} New Applicants Found
        </p>
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <span className="text-sm text-slate-500 font-medium whitespace-nowrap">
            Sort by:
          </span>
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-4 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-[#002333] font-medium hover:border-[#5BBB7B] transition-all min-w-[170px] justify-between shadow-sm"
            >
              <span className="truncate">{selectedSort}</span>
              <ChevronDown
                size={14}
                className={`text-slate-400 shrink-0 transition-transform ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`absolute right-0 top-full mt-2 w-full min-w-[200px] bg-white rounded-xl shadow-xl border border-slate-100 py-2 z-[100] transition-all duration-200 origin-top
              ${
                isSortOpen
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
              }`}
            >
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSort(option)}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                    ${
                      selectedSort === option.label
                        ? "bg-[#1967D2] text-white font-bold"
                        : "text-slate-600 hover:bg-slate-50 hover:text-[#5BBB7B]"
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 pb-8">
        {applicants.map((applicant) => (
          <ApplicantCard key={applicant.id} applicant={applicant} />
        ))}
      </div>
    </div>
  );
};

export default ManageApplicants;
