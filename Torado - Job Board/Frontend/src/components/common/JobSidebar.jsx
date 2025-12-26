import React, { useState } from "react";
import {
  Search,
  MapPin,
  ListFilter,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

const AccordionSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center bg-white hover:bg-slate-50 transition-colors"
      >
        <h3 className="text-slate-900 font-bold text-sm uppercase tracking-wider">
          {title}
        </h3>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-slate-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-slate-400" />
        )}
      </button>
      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen
            ? "max-h-[1000px] opacity-100 p-6 pt-0"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

const JobSidebar = ({
  filters,
  setFilters,
  clearFilters,
  jobTypeCounts = {},
}) => {
  const {
    searchQuery,
    locationQuery,
    radius,
    selectedCategory,
    selectedJobTypes,
    selectedDatePost,
    selectedEmployment,
    selectedExperience,
    salary,
  } = filters;

  const jobTypes = [
    { label: "Full Time Jobs", count: jobTypeCounts["Full Time"] || 0 },
    { label: "Part Time Jobs", count: jobTypeCounts["Part Time"] || 0 },
    { label: "Remote Jobs", count: jobTypeCounts["Remote"] || 0 },
    { label: "Internship", count: jobTypeCounts["Internship"] || 0 },
    { label: "Contract", count: jobTypeCounts["Contract"] || 0 },
    { label: "Training Jobs", count: jobTypeCounts["Training"] || 0 },
  ];

  const datePosts = [
    { label: "Last hour", value: "hour" },
    { label: "Last 24 hours", value: "24h" },
    { label: "Last 7 days", value: "7d" },
    { label: "Last 14 days", value: "14d" },
    { label: "Last 30 days", value: "30d" },
    { label: "All", value: "all" },
  ];

  const employmentTypes = ["Freelance", "Full Time", "Internship", "Part Time"];
  const experienceLevels = [
    "Fresh",
    "1 Year",
    "2 Year",
    "3 Year",
    "4 Year",
    "5 Year",
  ];
  const tags = [
    "General",
    "Jobs",
    "Payment",
    "Application",
    "Work",
    "Income",
    "Recruiting",
    "Employer",
    "Tips",
  ];

  const updateFilters = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const toggleList = (item, list, key) => {
    if (list.includes(item)) {
      updateFilters(
        key,
        list.filter((i) => i !== item)
      );
    } else {
      updateFilters(key, [...list, item]);
    }
  };

  const DoorButton = ({ children, className = "", onClick }) => (
    <button
      onClick={onClick}
      className={`relative overflow-hidden group transition-all duration-300 ${className}`}
    >
      <span className="absolute inset-0 w-full h-full bg-[#002333] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-center"></span>
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </button>
  );

  return (
    <div className="flex flex-col gap-5">
      {/* Search by Keywords */}
      <AccordionSection title="Search by Keywords">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => updateFilters("searchQuery", e.target.value)}
            placeholder="Job title, keywords..."
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-torado-green-600 text-sm"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <DoorButton className="p-2 bg-torado-green-600 text-white rounded-lg">
              <Search className="w-4 h-4" />
            </DoorButton>
          </div>
        </div>
        <button
          onClick={clearFilters}
          className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1 mt-4 transition-colors font-bold"
        >
          <X className="w-3 h-3" /> Clear All Filters
        </button>
      </AccordionSection>

      {/* Location */}
      <AccordionSection title="Location" defaultOpen={false}>
        <div className="relative mb-6">
          <input
            type="text"
            value={locationQuery}
            onChange={(e) => updateFilters("locationQuery", e.target.value)}
            placeholder="City or postcode"
            className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-torado-green-600 text-sm"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <DoorButton className="p-2 text-torado-green-600 hover:text-white rounded-lg">
              <MapPin className="w-4 h-4" />
            </DoorButton>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
            <span>Radius around selected destination</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={radius}
            onChange={(e) => updateFilters("radius", parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-torado-green-600"
          />
          <div className="text-center text-slate-500 text-xs font-bold bg-slate-50 py-2 rounded-lg border border-slate-100">
            {radius} Km
          </div>
        </div>
      </AccordionSection>

      {/* Category */}
      <AccordionSection title="Category" defaultOpen={false}>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => updateFilters("selectedCategory", e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-torado-green-600 text-sm text-slate-600 appearance-none cursor-pointer"
          >
            <option value="">Choose a category</option>
            <option value="Technology">Technology</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
            <option value="Finance">Finance</option>
            <option value="Management">Management</option>
            <option value="Operations">Operations</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ListFilter className="w-4 h-4 text-torado-green-600" />
          </div>
        </div>
      </AccordionSection>

      {/* Job Type */}
      <AccordionSection title="Job Type">
        <div className="space-y-3">
          {jobTypes.map((type, index) => (
            <label
              key={index}
              className="flex items-center justify-between group cursor-pointer"
              onClick={() =>
                toggleList(type.label, selectedJobTypes, "selectedJobTypes")
              }
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                    selectedJobTypes.includes(type.label)
                      ? "border-torado-green-600 bg-torado-green-600"
                      : "border-slate-200 group-hover:border-torado-green-600"
                  }`}
                >
                  {selectedJobTypes.includes(type.label) && (
                    <div className="w-2.5 h-1.5 border-l-2 border-b-2 border-white -rotate-45 mb-1 text-white"></div>
                  )}
                </div>
                <span
                  className={`text-[13px] transition-colors ${
                    selectedJobTypes.includes(type.label)
                      ? "text-slate-900 font-bold"
                      : "text-slate-500 group-hover:text-slate-900"
                  }`}
                >
                  {type.label.replace(" Jobs", "")}
                </span>
              </div>
              <span className="text-slate-400 text-[10px] font-bold leading-none bg-slate-50 px-2 py-1 rounded">
                ({type.count})
              </span>
            </label>
          ))}
        </div>
      </AccordionSection>

      {/* Date Posts */}
      <AccordionSection title="Date Posted" defaultOpen={false}>
        <div className="space-y-3">
          {datePosts.map((date, index) => (
            <label
              key={index}
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() => updateFilters("selectedDatePost", date.value)}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 transition-colors flex items-center justify-center ${
                  selectedDatePost === date.value
                    ? "border-torado-green-600 bg-torado-green-600"
                    : "border-slate-200 group-hover:border-torado-green-600"
                }`}
              >
                {selectedDatePost === date.value && (
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                )}
              </div>
              <span
                className={`text-[13px] transition-colors ${
                  selectedDatePost === date.value
                    ? "text-slate-900 font-bold"
                    : "text-slate-500 group-hover:text-slate-900"
                }`}
              >
                {date.label}
              </span>
            </label>
          ))}
        </div>
      </AccordionSection>

      {/* Type of Employment */}
      <AccordionSection title="Type of Employment" defaultOpen={false}>
        <div className="space-y-3">
          {employmentTypes.map((item, index) => (
            <label
              key={index}
              className="flex items-center gap-3 group cursor-pointer"
              onClick={() =>
                toggleList(item, selectedEmployment, "selectedEmployment")
              }
            >
              <div
                className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
                  selectedEmployment.includes(item)
                    ? "border-torado-green-600 bg-torado-green-600"
                    : "border-slate-200 group-hover:border-torado-green-600"
                }`}
              >
                {selectedEmployment.includes(item) && (
                  <div className="w-2.5 h-1.5 border-l-2 border-b-2 border-white -rotate-45 mb-1 text-white"></div>
                )}
              </div>
              <span
                className={`text-[13px] transition-colors ${
                  selectedEmployment.includes(item)
                    ? "text-slate-900 font-bold"
                    : "text-slate-500 group-hover:text-slate-900"
                }`}
              >
                {item}
              </span>
            </label>
          ))}
        </div>
      </AccordionSection>

      {/* Experience Level */}
      <AccordionSection title="Experience Level" defaultOpen={true}>
        <div className="flex flex-wrap gap-3 mt-2">
          {experienceLevels.map((level, index) => {
            const isActive = selectedExperience.includes(level);
            return (
              <button
                key={index}
                onClick={() =>
                  toggleList(level, selectedExperience, "selectedExperience")
                }
                className={`flex-1 min-w-[100px] px-4 py-3 rounded-xl border-2 transition-all duration-300 text-center flex flex-col items-center gap-1 ${
                  isActive
                    ? "bg-torado-green-600 border-torado-green-600 text-white shadow-lg shadow-green-500/20 scale-105"
                    : "bg-white border-slate-100 text-slate-500 hover:border-torado-green-600 hover:text-torado-green-600 hover:bg-slate-50"
                }`}
              >
                <span
                  className={`text-[13px] font-bold ${
                    isActive ? "text-white" : "text-slate-900"
                  }`}
                >
                  {level}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase tracking-tighter ${
                    isActive ? "text-green-100" : "text-slate-400"
                  }`}
                >
                  Experience
                </span>
              </button>
            );
          })}
        </div>
      </AccordionSection>

      {/* Salary */}
      <AccordionSection title="Salary">
        <div className="space-y-4">
          <input
            type="range"
            min="0"
            max="10000"
            value={salary}
            step="100"
            onChange={(e) => updateFilters("salary", parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-torado-green-600"
          />
          <div className="text-center text-slate-500 text-xs font-bold bg-slate-50 py-2 rounded-lg border border-slate-100">
            ${salary.toLocaleString()} / Month
          </div>
        </div>
      </AccordionSection>

      {/* Tags */}
      <AccordionSection title="Tags" defaultOpen={false}>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <button
              key={index}
              onClick={() =>
                toggleList(tag, filters.selectedTags || [], "selectedTags")
              }
              className={`px-3 py-2 border text-[11px] font-bold rounded-lg transition-all ${
                (filters.selectedTags || []).includes(tag)
                  ? "bg-torado-green-600 border-torado-green-600 text-white shadow-md shadow-green-500/20"
                  : "bg-slate-50 border-slate-100 text-slate-500 hover:bg-white hover:shadow-md hover:border-torado-green-600 hover:text-torado-green-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </AccordionSection>
    </div>
  );
};

export default JobSidebar;
