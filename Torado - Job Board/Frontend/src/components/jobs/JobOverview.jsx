import React from "react";
import {
  Calendar,
  MapPin,
  CircleDollarSign,
  Hourglass,
  Briefcase,
  Layers,
  Award,
  User,
  FileText,
} from "lucide-react";

const JobOverview = ({ job }) => {
  if (!job?.jobOverview) return null;

  const {
    datePosted,
    location,
    offeredSalary,
    expirationDate,
    experience,
    industry,
    qualification,
    careerLevel,
    jobType,
  } = job.jobOverview;

  const items = [
    {
      icon: Calendar,
      label: "Date Posted",
      value: datePosted,
    },
    {
      icon: MapPin,
      label: "Location",
      value: location,
    },
    {
      icon: CircleDollarSign,
      label: "Offered Salary",
      value: offeredSalary,
    },
    {
      icon: Hourglass,
      label: "Expiration Date",
      value: expirationDate,
    },
    {
      icon: Briefcase,
      label: "Experience",
      value: experience,
    },
    {
      icon: Layers,
      label: "Industry",
      value: industry,
    },
    {
      icon: Award,
      label: "Qualification",
      value: qualification,
    },
    {
      icon: User,
      label: "Career Level",
      value: careerLevel,
    },
    {
      icon: FileText,
      label: "Job Type",
      value: jobType,
    },
  ];

  return (
    <div className="bg-[#F5F7FC] rounded-lg p-8">
      <h4 className="text-[18px] font-bold text-[#002333] mb-6">
        Job Overview
      </h4>

      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-4 group">
            <div className="shrink-0 mt-1 transition-transform group-hover:scale-110 duration-300">
              <item.icon
                className="text-[#5BBB7B]"
                size={22}
                strokeWidth={1.5}
              />
            </div>
            <div>
              <h5 className="font-bold text-[#002333] text-[15px] mb-1 group-hover:text-[#5BBB7B] transition-colors">
                {item.label}
              </h5>
              <p className="text-slate-500 text-[14px]">
                {item.value || "Not Specified"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobOverview;
