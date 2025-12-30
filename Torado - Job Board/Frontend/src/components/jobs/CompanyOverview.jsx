import React from "react";

const CompanyOverview = ({ job }) => {
  if (!job?.companyDetails) return null;

  const { category, established, employees, location, phone, email } =
    job.companyDetails;

  const items = [
    { label: "Categories:", value: category },
    { label: "Established:", value: established },
    { label: "Employees:", value: employees },
    { label: "Location:", value: location },
    { label: "Phone Number:", value: phone },
    { label: "Email:", value: email },
  ];

  return (
    <div className="bg-[#F5F7FC] rounded-lg p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center p-2 shadow-sm">
          <img
            src={job.logo}
            alt={job.company}
            className="w-full h-full object-contain"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
        <div>
          <h4 className="text-[18px] font-bold text-[#002333]">
            {job.company}
          </h4>
          <a
            href="#"
            className="text-[#5BBB7B] text-sm font-medium hover:underline"
          >
            View Company Profile
          </a>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center text-[15px]">
          <span className="font-semibold text-[#002333]">
            Primary Industry:
          </span>
          <span className="text-slate-500 text-right">
            {category || "Software"}
          </span>
        </div>
        <div className="flex justify-between items-center text-[15px]">
          <span className="font-semibold text-[#002333]">Established:</span>
          <span className="text-slate-500 text-right">
            {established || "2018"}
          </span>
        </div>
        <div className="flex justify-between items-center text-[15px]">
          <span className="font-semibold text-[#002333]">Employees:</span>
          <span className="text-slate-500 text-right">
            {employees || "50-100"}
          </span>
        </div>
        <div className="flex justify-between items-center text-[15px]">
          <span className="font-semibold text-[#002333]">Location:</span>
          <span className="text-slate-500 text-right">{location}</span>
        </div>
        <div className="flex justify-between items-center text-[15px]">
          <span className="font-semibold text-[#002333]">Phone:</span>
          <span className="text-slate-500 text-right">{phone || "N/A"}</span>
        </div>
        <div className="flex justify-between items-center text-[15px]">
          <span className="font-semibold text-[#002333]">Email:</span>
          <span className="text-slate-500 text-right">
            {email || "info@example.com"}
          </span>
        </div>
      </div>

      <div className="mt-8">
        <button className="w-full relative overflow-hidden py-4 bg-[#EBF1F5] text-[#002333] font-bold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group">
          <span className="absolute inset-0 bg-[#5BBB7B] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-center"></span>
          <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors">
            <span className="group-hover:translate-x-1 transition-transform">
              Visit Website
            </span>
            <span className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              →
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default CompanyOverview;
