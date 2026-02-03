import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Filter, ChevronDown, Check, X, Search, MapPin } from "lucide-react";
import { userAPI } from "../services/api";

const Freelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const data = await userAPI.getFreelancers();
        // Map DB fields to match component expectations
        const mapped = data.map((f) => ({
          id: f._id,
          name: f.name,
          image: f.image || "https://via.placeholder.com/200",
          specialization: f.jobTitle || f.specialization,
          location: f.location || "Remote",
          rate: f.rate?.replace("/hr", "") || "$50",
          rating: f.rating || 4.5,
          reviews: f.reviews || 0,
          tags: f.skills || [],
          category: f.specialization,
        }));
        setFreelancers(mapped);
      } catch (error) {
        console.error("Failed to fetch freelancers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancers();
  }, []);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("default");

  // Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Derived Data for Filter Options
  const categories = [
    ...new Set(freelancers.map((f) => f.category).filter(Boolean)),
  ];
  const locations = [
    ...new Set(
      freelancers
        .map((f) => (f.location ? f.location.split(",")[0].trim() : ""))
        .filter(Boolean),
    ),
  ];

  // Filtering & Sorting Logic
  const processedFreelancers = useMemo(() => {
    let result = [...freelancers];

    // 1. Filter by Search (Name or Tags)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (f) =>
          f.name.toLowerCase().includes(query) ||
          (f.specialization &&
            f.specialization.toLowerCase().includes(query)) ||
          f.tags.some((tag) => tag.toLowerCase().includes(query)),
      );
    }

    // 2. Filter by Category
    if (selectedCategory) {
      result = result.filter((f) => f.category === selectedCategory);
    }

    // 3. Filter by Location
    if (selectedLocation) {
      result = result.filter(
        (f) =>
          f.location &&
          f.location.toLowerCase().includes(selectedLocation.toLowerCase()),
      );
    }

    // 4. Sort
    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "rate_low") {
      result.sort(
        (a, b) =>
          parseFloat((a.rate || "0").replace("$", "")) -
          parseFloat((b.rate || "0").replace("$", "")),
      );
    } else if (sortBy === "rate_high") {
      result.sort(
        (a, b) =>
          parseFloat((b.rate || "0").replace("$", "")) -
          parseFloat((a.rate || "0").replace("$", "")),
      );
    }

    return result;
  }, [freelancers, searchQuery, selectedCategory, selectedLocation, sortBy]);

  // Pagination Logic
  const indexOfLastRecruiter = currentPage * perPage;
  const indexOfFirstRecruiter = indexOfLastRecruiter - perPage;
  const currentFreelancers = processedFreelancers.slice(
    indexOfFirstRecruiter,
    indexOfLastRecruiter,
  );
  const totalPages = Math.ceil(processedFreelancers.length / perPage);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLocation, sortBy]);

  return (
    <div className="min-h-screen bg-[#F9FBFC] relative">
      {/* Banner Section */}
      <div className="bg-[#F2F7FA] py-16 md:py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#002333] mb-3">
            Freelancer
          </h1>
          <nav className="flex justify-center items-center gap-2 text-sm text-[#5E6670]">
            <Link to="/" className="hover:text-[#004D6D] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#004D6D] font-medium">Freelancer</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16 max-w-[1600px]">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-100 mb-8 gap-4">
          <p className="text-sm text-slate-500 font-medium whitespace-nowrap">
            Showing{" "}
            {processedFreelancers.length > 0 ? indexOfFirstRecruiter + 1 : 0} –{" "}
            {Math.min(indexOfLastRecruiter, processedFreelancers.length)} of{" "}
            {processedFreelancers.length} Results
          </p>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Sort By */}
            <div className="relative group min-w-[140px] flex-1 md:flex-none">
              <select
                className="w-full appearance-none bg-[#F9FBFC] border border-slate-200 text-slate-600 text-sm rounded-md py-2.5 pl-4 pr-10 focus:outline-none focus:border-[#004D6D] cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort by (Default)</option>
                <option value="rating">Rating (High to Low)</option>
                <option value="name">Name (A-Z)</option>
                <option value="rate_low">Rate (Low to High)</option>
                <option value="rate_high">Rate (High to Low)</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={14}
              />
            </div>

            {/* Per Page */}
            <div className="relative group min-w-[130px] flex-1 md:flex-none">
              <select
                className="w-full appearance-none bg-[#F9FBFC] border border-slate-200 text-slate-600 text-sm rounded-md py-2.5 pl-4 pr-10 focus:outline-none focus:border-[#004D6D] cursor-pointer"
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={6}>06 Per Pages</option>
                <option value={12}>12 Per Pages</option>
                <option value={20}>20 Per Pages</option>
              </select>
              <ChevronDown
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={14}
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 bg-[#5BBB7B] text-white px-5 py-2.5 rounded-md text-sm font-medium transition-all shadow-sm shadow-green-100 flex-1 md:flex-none justify-center relative overflow-hidden z-10 before:absolute before:inset-0 before:bg-[#002333] before:origin-center before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 before:-z-10"
            >
              Filter
              <Filter size={14} />
            </button>
          </div>
        </div>

        {/* Filter Drawer (Slide-out) */}
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
              isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsFilterOpen(false)}
          />

          {/* Drawer */}
          <div
            className={`fixed inset-y-0 right-0 z-50 w-[320px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
              isFilterOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-[#002333]">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 bg-slate-50 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Search */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#002333]">
                  Search by Keyword
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search name, skills..."
                    className="w-full bg-[#F9FBFC] border border-slate-200 rounded-lg pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#5BBB7B] transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#002333]">
                  Location
                </label>
                <div className="relative">
                  <select
                    className="w-full appearance-none bg-[#F9FBFC] border border-slate-200 text-slate-600 text-sm rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-[#5BBB7B] cursor-pointer"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {locations.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <MapPin
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <ChevronDown
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={14}
                  />
                </div>
              </div>

              {/* Category */}
              <div className="space-y-3">
                <label className="text-sm font-bold text-[#002333]">
                  Category
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        selectedCategory === ""
                          ? "bg-[#5BBB7B] border-[#5BBB7B]"
                          : "border-slate-300 bg-white group-hover:border-[#5BBB7B]"
                      }`}
                    >
                      {selectedCategory === "" && (
                        <Check size={12} className="text-white" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="category"
                      className="hidden"
                      checked={selectedCategory === ""}
                      onChange={() => setSelectedCategory("")}
                    />
                    <span
                      className={`text-sm ${
                        selectedCategory === ""
                          ? "text-[#002333] font-medium"
                          : "text-slate-500 group-hover:text-[#002333]"
                      }`}
                    >
                      All Categories
                    </span>
                  </label>

                  {categories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          selectedCategory === cat
                            ? "bg-[#5BBB7B] border-[#5BBB7B]"
                            : "border-slate-300 bg-white group-hover:border-[#5BBB7B]"
                        }`}
                      >
                        {selectedCategory === cat && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                      <input
                        type="radio"
                        name="category"
                        className="hidden"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                      />
                      <span
                        className={`text-sm ${
                          selectedCategory === cat
                            ? "text-[#002333] font-medium"
                            : "text-slate-500 group-hover:text-[#002333]"
                        }`}
                      >
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 bg-slate-50">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setSelectedLocation("");
                  setIsFilterOpen(false);
                }}
                className="w-full bg-[#002333] text-white font-semibold py-3 rounded-lg transition-all relative overflow-hidden z-10 before:absolute before:inset-0 before:bg-[#5BBB7B] before:origin-center before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 before:-z-10"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </>

        {/* Freelancers Grid */}
        {processedFreelancers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {currentFreelancers.map((freelancer) => (
              <div
                key={freelancer.id}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col group hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                {/* Header: Name and Category */}
                <div className="text-center mb-6">
                  <h3 className="text-lg font-bold text-[#002B44] mb-1">
                    {freelancer.name}
                  </h3>
                  <p className="text-sm text-[#6170E6] italic font-medium">
                    {freelancer.category}
                  </p>
                </div>

                {/* Profile Image with Hover Overlay */}
                <div className="relative mb-6 overflow-hidden rounded-lg aspect-[4/3]">
                  <img
                    src={freelancer.image}
                    alt={freelancer.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Overlay: Door Effect */}
                  <div className="absolute inset-0 bg-[#05264e]/60 flex items-center justify-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center">
                    <Link
                      to={`/freelancer/${freelancer.id}`}
                      className="text-white text-lg font-semibold underline decoration-2 underline-offset-8 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 hover:text-[#56d8b1] transition-colors duration-300"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>

                {/* Info: Location and Specialization */}
                <div className="flex justify-between items-center mb-6 gap-2">
                  <div className="flex items-center text-[#666] text-xs font-medium">
                    <svg
                      className="w-3.5 h-3.5 mr-1 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                      />
                    </svg>
                    {freelancer.location.split(",")[0]}
                  </div>
                  <div className="flex items-center text-[#666] text-xs font-medium">
                    <svg
                      className="w-3.5 h-3.5 mr-1 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {freelancer.specialization}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {freelancer.tags.map((tag, idx) => {
                    // Simplified random looking tag logic
                    const tagStyles = {
                      // Design & Creative (Greens, Pinks, Purples)
                      Figma:
                        "bg-[#EAFBF3] text-[#4DCF8F] hover:bg-[#5BBB7B] hover:text-white",
                      Sketch:
                        "bg-[#FFF4E5] text-[#FF9B26] hover:bg-[#5BBB7B] hover:text-white",
                      "Adobe XD":
                        "bg-[#FFECF3] text-[#F44B7E] hover:bg-[#5BBB7B] hover:text-white",
                      PSD: "bg-[#F3F4FB] text-[#697CDF] hover:bg-[#5BBB7B] hover:text-white",
                      Photoshop:
                        "bg-[#EDF7FF] text-[#31A8FF] hover:bg-[#5BBB7B] hover:text-white",
                      Illustrator:
                        "bg-[#FFF2E0] text-[#FF9A00] hover:bg-[#5BBB7B] hover:text-white",
                      "UX/UI":
                        "bg-[#E6EBEE] text-[#002B44] hover:bg-[#5BBB7B] hover:text-white",
                      Design:
                        "bg-[#EAFBF3] text-[#4DCF8F] hover:bg-[#5BBB7B] hover:text-white",
                      "Digital Art":
                        "bg-[#F3F4FB] text-[#697CDF] hover:bg-[#5BBB7B] hover:text-white",
                      Illustration:
                        "bg-[#FFF0F0] text-[#FF6B6B] hover:bg-[#5BBB7B] hover:text-white",
                      Branding:
                        "bg-[#F0FDF4] text-[#22C55E] hover:bg-[#5BBB7B] hover:text-white",
                      Prototyping:
                        "bg-[#F3E8FF] text-[#A855F7] hover:bg-[#5BBB7B] hover:text-white",

                      // Development (Blues, Indigos, Cyans)
                      React:
                        "bg-[#eafbfd] text-[#0ea5e9] hover:bg-[#5BBB7B] hover:text-white",
                      "React Native":
                        "bg-[#eafbfd] text-[#0ea5e9] hover:bg-[#5BBB7B] hover:text-white",
                      "Vue.js":
                        "bg-[#effef5] text-[#10b981] hover:bg-[#5BBB7B] hover:text-white",
                      "Nuxt.js":
                        "bg-[#effef5] text-[#10b981] hover:bg-[#5BBB7B] hover:text-white",
                      Angular:
                        "bg-[#FFF0F0] text-[#DD0031] hover:bg-[#5BBB7B] hover:text-white",
                      "Node.js":
                        "bg-[#F0FDF4] text-[#41B883] hover:bg-[#5BBB7B] hover:text-white",
                      Python:
                        "bg-[#EFF8FF] text-[#172B4D] hover:bg-[#5BBB7B] hover:text-white",
                      Django:
                        "bg-[#E6F4EA] text-[#092E20] hover:bg-[#5BBB7B] hover:text-white",
                      Java: "bg-[#FFF4E5] text-[#F89820] hover:bg-[#5BBB7B] hover:text-white",
                      Swift:
                        "bg-[#FFF0EB] text-[#F05138] hover:bg-[#5BBB7B] hover:text-white",
                      Kotlin:
                        "bg-[#F3E8FF] text-[#7F52FF] hover:bg-[#5BBB7B] hover:text-white",
                      JavaScript:
                        "bg-[#FFFBEB] text-[#F59E0B] hover:bg-[#5BBB7B] hover:text-white",
                      TypeScript:
                        "bg-[#EFF6FF] text-[#3B82F6] hover:bg-[#5BBB7B] hover:text-white",
                      "HTML/CSS":
                        "bg-[#EFF6FF] text-[#3B82F6] hover:bg-[#5BBB7B] hover:text-white",
                      MongoDB:
                        "bg-[#ECFDF5] text-[#059669] hover:bg-[#5BBB7B] hover:text-white",
                      PostgreSQL:
                        "bg-[#EFF6FF] text-[#336791] hover:bg-[#5BBB7B] hover:text-white",
                      Programming:
                        "bg-[#F3F4FB] text-[#697CDF] hover:bg-[#5BBB7B] hover:text-white",
                      APP: "bg-[#E6EBEE] text-[#002B44] hover:bg-[#5BBB7B] hover:text-white",

                      // Marketing & Content (Yellows, Oranges, Teals)
                      SEO: "bg-[#ECFEFF] text-[#06B6D4] hover:bg-[#5BBB7B] hover:text-white",
                      Marketing:
                        "bg-[#FFF7ED] text-[#EA580C] hover:bg-[#5BBB7B] hover:text-white",
                      "Content Strategy":
                        "bg-[#FDF2F8] text-[#DB2777] hover:bg-[#5BBB7B] hover:text-white",
                      Copywriting:
                        "bg-[#F0F9FF] text-[#0284C7] hover:bg-[#5BBB7B] hover:text-white",
                      Analytics:
                        "bg-[#FFFBEB] text-[#D97706] hover:bg-[#5BBB7B] hover:text-white",
                      "Social Media":
                        "bg-[#EFF6FF] text-[#2563EB] hover:bg-[#5BBB7B] hover:text-white",
                      Instagram:
                        "bg-[#FDF2F8] text-[#DB2777] hover:bg-[#5BBB7B] hover:text-white",
                      Blogging:
                        "bg-[#ECFDF5] text-[#059669] hover:bg-[#5BBB7B] hover:text-white",
                      Digital:
                        "bg-[#F3F4FB] text-[#697CDF] hover:bg-[#5BBB7B] hover:text-white",
                    };
                    const currentStyle =
                      tagStyles[tag] ||
                      "bg-[#F0F5F7] text-[#5E6670] hover:bg-[#5BBB7B] hover:text-white";

                    return (
                      <span
                        key={idx}
                        className={`px-3 py-1.5 text-[11px] font-semibold rounded-md uppercase tracking-wide cursor-pointer transition-colors duration-200 ${currentStyle}`}
                      >
                        {tag}
                      </span>
                    );
                  })}
                </div>

                {/* Footer: Rating and Rate */}
                <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
                  <div className="flex flex-col">
                    <div className="flex text-yellow-400 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(freelancer.rating)
                              ? "fill-current"
                              : "fill-gray-200"
                          }`}
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium">
                      {freelancer.rating} ({freelancer.reviews} Review)
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[11px] text-gray-400 mb-0.5">
                      Rate:
                    </span>
                    <span className="text-base font-bold text-[#002B44]">
                      {freelancer.rate}
                      <span className="text-[11px] font-medium text-gray-400 ml-1">
                        /Hour
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-bold text-[#002333] mb-2">
              No Freelancers Found
            </h3>
            <p className="text-slate-500">
              Try adjusting your filters or search terms.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("");
                setSelectedLocation("");
              }}
              className="mt-4 text-[#5BBB7B] font-semibold hover:underline"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex justify-center mt-12 gap-2">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                currentPage === i + 1
                  ? "bg-[#002333] text-white shadow-lg"
                  : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Freelancers;
