import React from "react";
import { CheckCircle } from "lucide-react";

/**
 * JobDescription Component
 * Displays the full description, fundamental skills, and experience requirements.
 */
const JobDescription = ({ job }) => {
  if (!job) return null;

  return (
    <div className="space-y-12 text-slate-500">
      {/* Description Section */}
      <div className="space-y-6">
        <h3 className="text-[24px] font-bold text-[#002333]">
          Job Description And Job Specification
        </h3>
        <div className="space-y-6 text-[16px] leading- loose text-slate-600 font-light">
          {job.description ? (
            job.description.split("\n\n").map((paragraph, index) => (
              <p key={index} className="leading-7">
                {paragraph}
              </p>
            ))
          ) : (
            <p>
              No description available for this position. Please contact the
              company directly for more information.
            </p>
          )}
        </div>
      </div>

      {/* Fundamental Skills Section */}
      <div className="space-y-6">
        <h3 className="text-[22px] font-bold text-[#002333]">
          Fundamental Learning, Skills, & Knowledge
        </h3>
        <ul className="space-y-4">
          {job.fundamentalSkills?.map((skill, index) => (
            <li
              key={index}
              className="flex items-start gap-4 text-[15px] group"
            >
              <CheckCircle
                size={20}
                className="text-[#5BBB7B] mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                strokeWidth={2.5}
              />
              <span className="text-slate-600 leading-6">{skill}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Talent & Experience Section */}
      <div className="space-y-6">
        <h3 className="text-[22px] font-bold text-[#002333]">
          Talent & Experience
        </h3>
        <ul className="space-y-4">
          {job.talentExperience?.map((item, index) => (
            <li
              key={index}
              className="flex items-start gap-4 text-[15px] group"
            >
              <CheckCircle
                size={20}
                className="text-[#5BBB7B] mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                strokeWidth={2.5}
              />
              <span className="text-slate-600 leading-6">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default JobDescription;
