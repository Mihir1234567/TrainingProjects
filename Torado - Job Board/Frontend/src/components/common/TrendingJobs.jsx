import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Briefcase, Star } from "lucide-react";
import jobsData from "../../data/trendingJobs.json";

// Dynamic asset loading using Vite's glob import
const jobImages = import.meta.glob(
  "../../assets/Home/JobImgs/*.{jpg,png,jpeg}",
  { eager: true },
);

const categories = [
  "Content Writer,",
  "Finance,",
  "Human Resource,",
  "Market Research,",
  "Retail & Products,",
  "Software & Developer",
];

const TrendingJobs = () => {
  const [activeCategory, setActiveCategory] = useState("Content Writer");

  const filteredJobs =
    activeCategory === "Content Writer"
      ? jobsData.slice(0, 6)
      : jobsData.filter((job) => job.category === activeCategory);

  return (
    <section className="py-12 md:py-24 bg-[#F9FBFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-[#083e47] mb-6 md:mb-10 leading-tight">
            Trending Jobs Of The Everyday
          </h2>

          {/* Categories Filter - Enhanced scrolling for mobile */}
          <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-4 md:gap-6 overflow-x-auto pb-4 md:pb-0 no-scrollbar mask-fade-right md:mask-none">
            {categories.map((cat, idx) => {
              const cleanCat = cat.replace(",", "").trim();
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategory(cleanCat)}
                  className={`whitespace-nowrap text-sm md:text-[15px] font-medium transition-all pb-1 border-b-2 ${
                    activeCategory === cleanCat
                      ? "text-[#5BBB7B] border-[#5BBB7B]"
                      : "text-slate-500 border-transparent hover:text-[#5BBB7B]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Jobs Grid - Better Column Scaling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-[20px] overflow-hidden border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.08)] transition-all duration-500 group flex flex-col"
            >
              {/* Image Container - Aspect ratio controlled */}
              <div className="relative aspect-[4/3] sm:h-[220px] md:h-[240px] overflow-hidden">
                <img
                  src={jobImages[job.image]?.default}
                  alt={job.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 md:p-8 flex flex-col flex-grow">
                {/* Meta Info - Responsive spacing */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-slate-400 text-[12px] md:text-[13px] mb-4 md:mb-6 font-medium">
                  <div className="flex items-center gap-1.5">
                    <MapPin
                      size={14}
                      className="text-[#5BBB7B]"
                      strokeWidth={2.5}
                    />
                    <span>Location</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock
                      size={14}
                      className="text-[#5BBB7B]"
                      strokeWidth={2.5}
                    />
                    <span>{job.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase
                      size={14}
                      className="text-[#5BBB7B]"
                      strokeWidth={2.5}
                    />
                    <span>{job.jobType}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg md:text-xl font-bold text-[#083e47] mb-4 md:mb-6 group-hover:text-[#5BBB7B] transition-colors cursor-pointer leading-tight line-clamp-2">
                  {job.title}
                </h3>

                {/* Salary and Tags */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-8 mt-auto">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg md:text-xl font-extrabold text-[#083e47]">
                      {job.salary}
                    </span>
                    <span className="text-xs md:text-sm text-slate-400">
                      /Hour
                    </span>
                  </div>

                  <div className="flex gap-2">
                    {job.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-2.5 py-1 rounded-lg text-[10px] md:text-[11px] font-bold uppercase tracking-wider ${
                          tag === "PSD"
                            ? "bg-[#F2F1FF] text-[#5D50F1]"
                            : tag === "Figma"
                              ? "bg-[#EAF9F0] text-[#5BBB7B]"
                              : "bg-[#F2F2F2] text-[#083e47]"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="h-[1px] bg-slate-100 w-full mb-6 md:mb-8"></div>

                {/* Footer */}
                <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-4">
                  <div className="flex flex-col">
                    <div className="flex gap-0.5 mb-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={12}
                          fill={
                            s <= Math.floor(job.rating) ? "#FFA800" : "none"
                          }
                          className={
                            s <= Math.floor(job.rating)
                              ? "text-[#FFA800]"
                              : "text-slate-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[12px] md:text-[13px] text-slate-400 font-medium">
                      {job.rating.toFixed(1)} ({job.reviews} Review)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 md:gap-3 w-full xs:w-auto">
                    <button className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#083e47] hover:text-white transition-all">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
                        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
                        <line x1="6" x2="6" y1="2" y2="4"></line>
                        <line x1="10" x2="10" y1="2" y2="4"></line>
                        <line x1="14" x2="14" y1="2" y2="4"></line>
                      </svg>
                    </button>

                    <Link
                      to={`/apply-job/${job.id}`}
                      className="flex-grow xs:flex-grow-0 group/btn relative px-4 md:px-8 py-2.5 md:py-3.5 bg-white border border-[#5BBB7B] text-[#5BBB7B] rounded-xl text-xs md:text-sm font-bold overflow-hidden transition-all duration-300 inline-flex items-center justify-center"
                    >
                      <span className="absolute inset-0 bg-[#5BBB7B] scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 origin-center"></span>
                      <span className="relative z-10 group-hover/btn:text-white transition-colors duration-500">
                        Apply Now
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingJobs;
