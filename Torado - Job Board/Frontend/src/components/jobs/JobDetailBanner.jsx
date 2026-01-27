import React from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  Clock,
  MapPin,
  Beer,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Grid,
  Banknote,
  Calendar,
} from "lucide-react";

/**
 * JobDetailBanner Component
 * Renders the main floating card with job title, metadata, and action buttons.
 */
const JobDetailBanner = ({ job }) => {
  const { isAuthenticated, isRecruiter } = useOutletContext() || {};

  // Consolidating display data with fallbacks
  const displayData = {
    title: job?.title || "The Complete Bookkeeping & Bank Economic Job 2025",
    date: job?.postedAt || "4 months ago",
    company: job?.company || "Anibal Crist",
    location: job?.location || "London, UK",
    salary: job?.salaryRange || job?.salary || "$35k - $45k",
    bannerImage:
      job?.bannerImage ||
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1470&auto=format&fit=crop",
  };

  return (
    <section className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 mt-12 relative z-10 pb-20">
      <div className="bg-white rounded-lg shadow-xl shadow-slate-200/60 overflow-hidden flex flex-col lg:flex-row">
        {/* Left Side: Image */}
        <div className="w-full lg:w-[350px] xl:w-[400px] h-[300px] lg:h-auto lg:min-h-[350px] shrink-0 relative bg-slate-100 group">
          <img
            src={displayData.bannerImage}
            alt="Job Context"
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1471&auto=format&fit=crop"; // Default fallback
            }}
          />
        </div>

        {/* Right Side: Content */}
        <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
          {/* Top Row: Title & Action Buttons */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
            <h2 className="text-xl md:text-[22px] font-bold text-[#004A61] leading-tight max-w-2xl">
              {displayData.title}
            </h2>

            {/* Action Buttons (Apply & Icon) */}
            <div className="flex items-center gap-4 shrink-0">
              {/* Bookmark Button */}
              <button className="group/btn relative w-12 h-12 flex items-center justify-center rounded-full bg-[#EBF1F5] text-[#002333] hover:bg-[#004658] hover:text-white transition-all duration-300">
                {/* Tooltip */}
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-20">
                  Bookmark
                  <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></span>
                </span>

                <span className="relative z-10">
                  <Beer size={20} strokeWidth={2} />
                </span>
              </button>

              {/* Apply Button Logic */}
              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="group relative px-10 py-3.5 bg-[#002333] text-white font-bold rounded-md transition-all duration-500 overflow-hidden shadow-lg shadow-blue-900/20 text-sm inline-flex items-center justify-center hover:bg-[#003B47]"
                >
                  <span className="relative z-10">Login to Apply</span>
                </Link>
              ) : isRecruiter ? (
                <button
                  disabled
                  className="group relative px-10 py-3.5 bg-slate-200 text-slate-500 font-bold rounded-md cursor-not-allowed text-sm inline-flex items-center justify-center"
                >
                  <span className="relative z-10">Recruiters Cannot Apply</span>
                </button>
              ) : (
                <Link
                  to={`/apply-job/${job?.id || 1}`}
                  className="group relative px-10 py-3.5 bg-[#5BBB7B] text-white font-bold rounded-md transition-all duration-500 overflow-hidden shadow-lg shadow-green-500/20 text-sm inline-flex items-center justify-center"
                >
                  <span className="absolute inset-0 bg-[#002333] transition-transform duration-700 ease-in-out scale-x-0 group-hover:scale-x-100 origin-center" />
                  <span className="relative z-10">Apply Now</span>
                </Link>
              )}
            </div>
          </div>

          {/* Middle Row: Meta Data */}
          <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-[#A0ABB8] text-[15px] mb-6 font-medium">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center border-2 border-[#5BBB7B]/40 rounded-sm">
                <div className="w-1.5 h-1.5 bg-[#5BBB7B]" />
              </div>
              <span className="text-[#A0ABB8]">{displayData.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Grid size={18} className="text-[#5BBB7B]/60" strokeWidth={2.5} />
              <span className="text-[#A0ABB8]">{displayData.company}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#5BBB7B]" strokeWidth={2.5} />
              <span className="text-[#A0ABB8]">{displayData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Banknote
                size={18}
                className="text-[#5BBB7B]"
                strokeWidth={2.5}
              />
              <span className="text-[#A0ABB8]">{displayData.salary}</span>
            </div>
          </div>

          {/* Bottom Row: Tags & Social Share */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-4">
              <span className="px-6 py-2 rounded-md bg-[#EFF2FC] text-[#5569CC] text-sm font-semibold">
                Full Time
              </span>
              <span className="px-6 py-2 rounded-md bg-[#EBF9F1] text-[#5BBB7B] text-sm font-semibold">
                Private
              </span>
              <span className="px-6 py-2 rounded-md bg-[#F2F5F7] text-[#7F8B99] text-sm font-semibold">
                Urgent
              </span>
            </div>

            {/* Social Share */}
            <div className="flex items-center gap-5">
              <span className="text-[#002333] font-bold text-[15px]">
                Share With Us
              </span>
              <div className="flex gap-2.5">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f0f5fa] text-[#002333] hover:bg-[#5BBB7B] hover:text-white transition-all duration-300"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobDetailBanner;
