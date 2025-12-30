import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, CircleDollarSign, Bookmark } from "lucide-react";
import jobsData from "../../data/jobs.json";

const RelatedJobs = ({ currentJobId, category }) => {
  // Filter jobs by category and exclude current job
  // Limiting to 4 jobs for display
  const relatedJobs = jobsData.jobs
    .filter((job) => job.id !== currentJobId && job.category === category)
    .slice(0, 4);

  // Fallback if no related jobs found, show random jobs
  const displayJobs =
    relatedJobs.length > 0
      ? relatedJobs
      : jobsData.jobs.filter((j) => j.id !== currentJobId).slice(0, 4);

  return (
    <div className="mt-12">
      <h3 className="text-[22px] font-bold text-[#002333] mb-6">
        Related Jobs
      </h3>

      <div className="space-y-6">
        {displayJobs.map((job) => (
          <div
            key={job.id}
            className="group flex flex-col md:flex-row gap-6 p-6 border border-slate-100 rounded-lg hover:border-transparent hover:shadow-lg transition-all duration-300 bg-white relative"
          >
            {/* Banner Image */}
            <div className="w-full md:w-[200px] h-[140px] shrink-0 bg-slate-50 rounded-lg overflow-hidden">
              <img
                src={job.bannerImage}
                alt={job.company}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1471&auto=format&fit=crop";
                }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-center">
              {/* Top: Metadata */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-[13px] text-slate-500 mb-2">
                <span className="flex items-center gap-1.5">
                  <Clock size={16} className="text-[#5BBB7B]" />
                  {job.postedAt}
                </span>
                <span className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full border border-[#5BBB7B] flex items-center justify-center">
                    <div className="w-1 h-1 bg-[#5BBB7B] rounded-full"></div>
                  </div>
                  {job.company}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} className="text-[#5BBB7B]" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <CircleDollarSign size={16} className="text-[#5BBB7B]" />
                  {job.salaryRange || "$35k - $45k"}
                </span>
              </div>

              {/* Middle: Title */}
              <h4 className="text-[20px] font-bold text-[#002333] group-hover:text-[#5BBB7B] transition-colors mb-4">
                <Link to={`/job/${job.id}`}>{job.title}</Link>
              </h4>

              {/* Bottom: Tags */}
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-4 py-1.5 rounded text-sm font-semibold 
                           ${
                             tag === "Full Time"
                               ? "bg-[#EFF2FC] text-[#5569CC]"
                               : tag === "Private"
                               ? "bg-[#EBF9F1] text-[#5BBB7B]"
                               : tag === "Urgent"
                               ? "bg-[#EBF1F5] text-[#002333]"
                               : "bg-slate-100 text-slate-500"
                           }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Button (Absolute or Flex) */}
            <div className="absolute top-6 right-6 md:static md:self-center">
              <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[#EBF1F5] text-[#002333] hover:text-white overflow-hidden group transition-all">
                <span className="absolute inset-0 w-full h-full bg-[#5BBB7B] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-center"></span>
                <Bookmark size={18} strokeWidth={2} className="relative z-10" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedJobs;
