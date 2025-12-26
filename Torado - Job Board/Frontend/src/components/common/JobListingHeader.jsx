import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  LayoutGrid,
  Layers,
  ChevronDown,
  Monitor,
  DollarSign,
  Palette,
  Megaphone,
  Heart,
  Briefcase,
} from "lucide-react";
// Assuming this path exists in your project, otherwise replace with a placeholder URL
import jobsBannerImg from "../../assets/Jobs/jobsBannerImg.png";

const JobListingHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dropdownRef = useRef(null);

  const categories = [
    { id: "tech", label: "Technology", icon: Monitor },
    { id: "finance", label: "Finance", icon: DollarSign },
    { id: "design", label: "Design", icon: Palette },
    { id: "marketing", label: "Marketing", icon: Megaphone },
    { id: "health", label: "Health", icon: Heart },
    { id: "others", label: "Others", icon: Briefcase },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (category) => {
    setSelectedCategory(category.label);
    setIsOpen(false);
  };

  return (
    <section className="bg-[#f3f6fd] py-16 md:py-24 relative font-sans z-30">
      {/* Background Decorative Blobs - Contained to prevent overflow clipping */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-10 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-10 w-48 h-48 bg-green-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="space-y-4 text-left">
              <h1 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-[#002333] leading-tight tracking-tight">
                Find Jobs
              </h1>
              <p className="text-gray-500 text-base md:text-lg max-w-lg leading-relaxed">
                Every month, more than 3 million job seekers visit our website
                to search for jobs, with more than 130,000 applications per day.
              </p>
            </div>

            {/* Advanced Search Bar */}
            <div className="w-full bg-white rounded-lg shadow-xl shadow-gray-200/60 p-2 flex flex-col md:flex-row items-center">
              {/* Job Title Input */}
              <div className="flex-1 w-full relative group">
                <div className="flex items-center px-4 py-3">
                  <LayoutGrid
                    className="text-gray-400 shrink-0 mr-3"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Job Title"
                    className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400 font-medium text-sm"
                  />
                </div>
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-8 w-[1px] bg-gray-200"></div>
              </div>

              {/* Location Input */}
              <div className="flex-1 w-full relative group">
                <div className="flex items-center px-4 py-3">
                  <MapPin className="text-gray-400 shrink-0 mr-3" size={20} />
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400 font-medium text-sm"
                  />
                </div>
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-8 w-[1px] bg-gray-200"></div>
              </div>

              {/* Custom Category Dropdown */}
              <div className="flex-1 w-full relative" ref={dropdownRef}>
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center px-4 py-3 cursor-pointer group"
                >
                  <Layers
                    className={`shrink-0 mr-3 transition-colors ${
                      isOpen ? "text-torado-green-600" : "text-gray-400"
                    }`}
                    size={20}
                  />
                  <div className="flex-1 text-sm font-medium text-gray-700">
                    {selectedCategory || (
                      <span className="text-gray-400">Category</span>
                    )}
                  </div>
                  <ChevronDown
                    className={`text-gray-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={14}
                  />
                </div>

                {/* Dropdown Menu - Refined width and positioning */}
                <div
                  className={`absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-full mt-4 min-w-[240px] bg-white rounded-2xl shadow-2xl border border-slate-50 overflow-hidden z-[100] transition-all duration-300 origin-top
                  ${
                    isOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="p-2 space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleSelect(cat)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all group/item
                          ${
                            selectedCategory === cat.label
                              ? "bg-slate-50 text-torado-green-600 shadow-sm"
                              : "text-slate-600 hover:bg-slate-50 hover:text-torado-green-600"
                          }`}
                      >
                        <div
                          className={`p-2 rounded-lg transition-colors ${
                            selectedCategory === cat.label
                              ? "bg-white text-torado-green-600 shadow-sm"
                              : "bg-slate-100 text-slate-400 group-hover/item:text-torado-green-600 group-hover/item:bg-white group-hover/item:shadow-sm"
                          }`}
                        >
                          <cat.icon className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-[13px] tracking-tight">
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Search Button */}
              <button className="w-full md:w-auto relative overflow-hidden group bg-[#5BBB7B] text-white font-bold px-8 py-3.5 rounded-md transition-all duration-300 shadow-md shadow-green-500/20 whitespace-nowrap text-sm mt-2 md:mt-0 md:ml-2">
                <span className="absolute inset-0 w-full h-full bg-[#002333] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
                <span className="relative z-10">Find A Job</span>
              </button>
            </div>
          </div>

          {/* Right Image/Illustration */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Optional background cloud element behind image */}
              <div className="hidden md:block absolute -top-12 right-0 w-24 h-12 bg-white rounded-full blur-xl opacity-80" />

              <img
                src={jobsBannerImg}
                alt="Job Search Illustration"
                className="w-full max-w-[450px] lg:max-w-[550px] h-auto object-contain drop-shadow-sm"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/500x400?text=Job+Search+Illustration"; // Fallback
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobListingHeader;
