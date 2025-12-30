import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import jobsData from "../data/jobs.json";
import {
  Search,
  MapPin,
  Briefcase,
  Star,
  ChevronDown,
  Grid,
  List,
  Filter,
  Beer,
} from "lucide-react";
import RecruitersBanner from "../assets/Recruiters-banner.png";

const Recruiters = () => {
  // State for Filters
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState(50);
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [perPage, setPerPage] = useState(10);

  // Use recruiters from JSON directly
  const recruiters = jobsData.recruiters;
  const filteredRecruiters = recruiters.filter((recruiter) => {
    const matchesKeyword = recruiter.name
      .toLowerCase()
      .includes(keyword.toLowerCase());
    const matchesLocation = recruiter.location
      .toLowerCase()
      .includes(location.toLowerCase());
    return matchesKeyword && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header Section */}
      <section className="bg-[#f0f5fa] py-16 relative overflow-visible">
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="w-full md:w-1/2 text-left">
              <h1 className="text-[30px] md:text-[35px] font-bold text-[#002333] mb-4">
                Browse All Recruiters
              </h1>
              <p className="text-slate-500 mb-8 max-w-lg">
                Every month, more than 3 million job seekers visit our website
                to search for jobs, with more than 130,000 applications per day.
              </p>

              <div className="bg-white p-2 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-2 max-w-2xl">
                <div className="flex-1 flex items-center px-4 w-full md:w-auto h-12 md:h-auto border-b md:border-b-0 border-r-0 md:border-r border-slate-100">
                  <Briefcase className="text-slate-400 mr-3" size={20} />
                  <input
                    type="text"
                    placeholder="Company title, keywords"
                    className="w-full outline-none text-slate-700 placeholder:text-slate-400"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </div>
                <div className="flex-1 flex items-center px-4 w-full md:w-auto h-12 md:h-auto">
                  <MapPin className="text-slate-400 mr-3" size={20} />
                  <div className="w-full relative">
                    <select
                      className="w-full outline-none text-slate-700 bg-transparent appearance-none cursor-pointer"
                      onChange={(e) => setLocation(e.target.value)}
                    >
                      <option value="">City, state, or zip</option>
                      {/* Mock options */}
                      <option value="New York">New York</option>
                      <option value="USA">USA</option>
                    </select>
                    <ChevronDown
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      size={16}
                    />
                  </div>
                </div>
                <button className="bg-[#5BBB7B] text-white px-8 py-3 rounded-md font-bold hover:bg-[#4ea86e] transition-colors w-full md:w-auto">
                  Search
                </button>
              </div>
            </div>

            {/* Banner Image */}
            <div className="hidden md:block w-1/2 relative h-full min-h-[300px]">
              <img
                src={RecruitersBanner}
                alt="Recruiters Banner"
                className="absolute right-0 bottom-[-64px] max-w-full h-auto object-contain"
                style={{ maxHeight: "400px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main List */}
          <div className="w-full lg:w-3/4 order-2 lg:order-1">
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-sm border border-slate-100">
              <span className="text-slate-500 text-sm mb-4 md:mb-0">
                Showing 1 – {Math.min(filteredRecruiters.length, perPage)} of{" "}
                {filteredRecruiters.length} Results
              </span>
              <div className="flex gap-4">
                <div className="relative">
                  <select
                    className="appearance-none bg-[#F5F7FC] border border-slate-200 rounded px-4 py-2 pr-10 text-sm text-slate-600 focus:outline-none focus:border-[#5BBB7B] cursor-pointer"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="default">Sort by (Default)</option>
                    <option value="name">Name</option>
                    <option value="rating">Rating</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={14}
                  />
                </div>
                <div className="relative">
                  <select
                    className="appearance-none bg-[#F5F7FC] border border-slate-200 rounded px-4 py-2 pr-10 text-sm text-slate-600 focus:outline-none focus:border-[#5BBB7B] cursor-pointer"
                    value={perPage}
                    onChange={(e) => setPerPage(Number(e.target.value))}
                  >
                    <option value={6}>06 Per Pages</option>
                    <option value={10}>10 Per Pages</option>
                    <option value={20}>20 Per Pages</option>
                  </select>
                  <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={14}
                  />
                </div>
              </div>
            </div>

            {/* Recruiters List */}
            <div className="space-y-4">
              {filteredRecruiters.slice(0, perPage).map((recruiter) => (
                <div
                  key={recruiter.id}
                  className="bg-white border border-slate-100 rounded-lg p-8 hover:shadow-lg hover:shadow-slate-100 hover:-translate-y-1 transition-all duration-300 flex flex-col md:flex-row items-center gap-6"
                >
                  {/* Logo */}
                  <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 bg-slate-50">
                    <img
                      src={recruiter.logo}
                      alt={recruiter.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>

                  {/* Info Grid */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 w-full items-center text-center md:text-left">
                    {/* Name & Posted By */}
                    <div className="md:col-span-4 flex flex-col">
                      <h3 className="text-lg font-bold text-[#002333] mb-1">
                        {recruiter.name}
                      </h3>
                      <span className="text-sm text-slate-500">
                        by {recruiter.postedBy}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="md:col-span-3 flex flex-col items-center md:items-start gap-1">
                      <span className="text-[#F5C046] text-sm tracking-tighter flex gap-1">
                        {"★".repeat(Math.round(recruiter.rating))}
                        <span className="text-slate-200">
                          {"★".repeat(5 - Math.round(recruiter.rating))}
                        </span>
                      </span>
                      <span className="text-sm text-slate-400">
                        {recruiter.rating}.0 ({recruiter.reviews} Review)
                      </span>
                    </div>

                    {/* Location */}
                    <div className="md:col-span-3 flex flex-col items-center md:items-start">
                      <span className="text-[15px] font-medium text-[#004D6D] mb-1">
                        Location
                      </span>
                      <span className="text-[15px] text-slate-400">
                        {recruiter.location}
                      </span>
                    </div>

                    {/* Open Jobs & Action */}
                    <div className="md:col-span-2 flex items-center justify-center md:justify-end gap-6">
                      <Link
                        to="#"
                        className="text-[#004658] text-[15px] font-medium underline decoration-1 underline-offset-4 decoration-[#004658] hover:text-[#5BBB7B] hover:decoration-[#5BBB7B] transition-all whitespace-nowrap"
                      >
                        Open Jobs - {recruiter.openJobs}
                      </Link>

                      <button className="relative w-12 h-12 rounded-full bg-[#EBF1F5] text-[#002333] hover:bg-[#002333] hover:text-white hover:scale-110 active:scale-95 flex items-center justify-center transition-all duration-300 group shrink-0">
                        <Beer size={20} strokeWidth={1.5} />
                        <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black text-white text-sm py-1.5 px-4 rounded-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 whitespace-nowrap pointer-events-none before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-[6px] before:border-transparent before:border-t-black">
                          Bookmark
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/4 order-1 lg:order-2 space-y-8">
            {/* Search by Keywords */}
            <div className="bg-[#fcfdff] p-6 rounded-lg border border-slate-100">
              <h4 className="font-bold text-[#002333] mb-4">
                Search by Keywords
              </h4>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Job title, keywords..."
                  className="w-full pl-4 pr-10 py-3 rounded bg-white border border-slate-200 text-sm focus:outline-none focus:border-[#5BBB7B]"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center text-slate-400">
                  <Search size={18} />
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-[#fcfdff] p-6 rounded-lg border border-slate-100">
              <h4 className="font-bold text-[#002333] mb-4">Location</h4>
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="City or postcode"
                  className="w-full pl-4 pr-10 py-3 rounded bg-white border border-slate-200 text-sm focus:outline-none focus:border-[#5BBB7B]"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className="absolute right-0 top-0 h-full w-10 flex items-center justify-center text-slate-400">
                  <MapPin size={18} />
                </div>
              </div>

              <div className="mb-2 flex justify-between text-sm text-slate-500">
                <span>Radius around selected destination</span>
              </div>
              <input
                type="range"
                className="w-full accent-[#5BBB7B]"
                min="0"
                max="100"
                value={radius}
                onChange={(e) => setRadius(e.target.value)}
              />
              <div className="mt-2 text-sm text-slate-500 text-right">
                {radius} Km
              </div>
            </div>

            {/* Category */}
            <div className="bg-[#fcfdff] p-6 rounded-lg border border-slate-100">
              <h4 className="font-bold text-[#002333] mb-4">Category</h4>
              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-3 rounded bg-white border border-slate-200 text-sm focus:outline-none focus:border-[#5BBB7B] appearance-none text-slate-500 cursor-pointer"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose a category</option>
                  <option value="Development">Development</option>
                  <option value="Marketing">Marketing</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>

            {/* Founded Date */}
            <div className="bg-[#fcfdff] p-6 rounded-lg border border-slate-100">
              <h4 className="font-bold text-[#002333] mb-4">Founded Date</h4>
              <input
                type="range"
                className="w-full accent-[#5BBB7B]"
                min="1990"
                max="2030"
                defaultValue="2010"
              />
              <div className="mt-2 text-sm text-slate-500 text-right">2010</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruiters;
