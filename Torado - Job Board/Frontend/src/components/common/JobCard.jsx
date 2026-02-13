import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Briefcase, Star, Beer, ExternalLink } from "lucide-react";

const FALLBACK_LOGO =
  "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3e%3crect width='40' height='40' fill='%23f1f5f9'/%3e%3ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='10' fill='%2364748b'%3eLogo%3c/text%3e%3c/svg%3e";

const JobCard = ({ job }) => {
  const [isPopping, setIsPopping] = useState(false);

  const handleBookmark = (e) => {
    e.preventDefault();
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 300);
    // Logic for saving/unsaving would go here
  };

  const jobId = job._id || job.id;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center overflow-hidden">
            <img
              src={(() => {
                const logoPath = job.companyId?.logo || job.logo;
                if (!logoPath) return FALLBACK_LOGO;
                if (logoPath.startsWith("http") || logoPath.startsWith("data:"))
                  return logoPath;
                return `http://localhost:5001${logoPath}`;
              })()}
              alt={job.companyId?.name || job.company}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null; // Prevent looping
                e.target.src = FALLBACK_LOGO;
              }}
            />
          </div>
          <div>
            <h4 className="text-[#002333] font-bold text-lg leading-tight">
              {job.companyId?.name || job.company || "Unknown Company"}
            </h4>
            <p className="text-slate-400 text-sm">
              by{" "}
              <span className="text-slate-500 font-medium">
                {job.postedBy || "Recruiter"}
              </span>
            </p>
          </div>
        </div>
        <Link
          to={`/job/${jobId}`}
          className="text-torado-brand-primary font-bold text-sm hover:underline flex items-center gap-1"
        >
          View Job
        </Link>
      </div>

      {/* Meta Info */}
      <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm font-medium">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-torado-green-600" />
          <span>{job.postedAt}</span>
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="w-4 h-4 text-torado-green-600" />
          <span>{job.type}</span>
        </div>
      </div>

      {/* Title */}
      <Link to={`/job/${jobId}`}>
        <h3 className="text-xl md:text-2xl font-extrabold text-[#002333] hover:text-torado-brand-primary transition-colors cursor-pointer">
          {job.title}
        </h3>
      </Link>

      {/* Separator */}
      <div className="h-[1px] bg-slate-100 w-full"></div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <span className="text-slate-400 text-sm block">Salary</span>
          <p className="text-[#002333] font-bold">
            {job.salaryRange
              ? `$${job.salaryRange.min} - $${job.salaryRange.max}`
              : job.salary || "$0"}{" "}
            <span className="text-slate-400 font-medium font-sans">
              /{(job.salaryType || job.salaryPeriod || "Yearly").toLowerCase()}
            </span>
          </p>
        </div>
        <div className="space-y-1">
          <span className="text-slate-400 text-sm block">Location</span>
          <p className="text-[#002333] font-bold truncate">{job.location}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="h-[1px] bg-slate-100 w-full mb-1"></div>
      <div className="flex items-center justify-between gap-4 mt-auto">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3.5 h-3.5 ${
                  s <= Math.floor(job.rating || 0)
                    ? "text-orange-400 fill-orange-400"
                    : "text-slate-200 fill-slate-200"
                }`}
              />
            ))}
          </div>
          <span className="text-slate-400 text-[13px] font-medium">
            {(job.rating || 0).toFixed(1)} ({job.reviewsCount || 0} Review)
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Bookmark Button with Beer Icon and Tooltip */}
          <button
            onClick={handleBookmark}
            className={`relative w-11 h-11 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition-all duration-300 group/btn ${
              isPopping
                ? "scale-125 rotate-12"
                : "hover:bg-[#004658] hover:text-white"
            }`}
          >
            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-20">
              Bookmark
              {/* Arrow */}
              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></span>
            </span>

            <Beer
              className={`w-5 h-5 relative z-10 transition-all duration-300 ${
                isPopping ? "text-white fill-white" : "text-current"
              }`}
            />
          </button>

          {/* Apply Now Button with Door Effect */}
          <Link
            to={`/job/${jobId}`}
            className="relative px-8 py-3 bg-torado-green-600 text-white font-bold text-sm rounded-lg overflow-hidden group shadow-sm shadow-green-500/20"
          >
            <span className="absolute inset-0 w-full h-full bg-[#002333] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-center"></span>
            <span className="relative z-10">Apply Now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
