import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Filter,
  ChevronDown,
  Check,
  X,
  Search,
  MapPin,
  Heart,
  Star,
  ArrowRight,
} from "lucide-react";
import candidates from "../data/Candidates.json";

const Candidates = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("default");

  // Filter States
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Derived Data for Filter Options
  const categories = [...new Set(candidates.map((c) => c.category))];
  const locations = [
    ...new Set(candidates.map((c) => c.location.split(",")[0].trim())),
  ];

  // Tag Styling
  const tagStyles = {
    // Design & Creative (Greens, Pinks, Purples)
    Figma: "bg-[#EAFBF3] text-[#4DCF8F]",
    Sketch: "bg-[#FFF4E5] text-[#FF9B26]",
    "Adobe XD": "bg-[#FFECF3] text-[#F44B7E]",
    PSD: "bg-[#F3F4FB] text-[#697CDF]",
    Photoshop: "bg-[#EDF7FF] text-[#31A8FF]",
    Illustrator: "bg-[#FFF2E0] text-[#FF9A00]",
    "UX/UI": "bg-[#E6EBEE] text-[#002B44]",
    Design: "bg-[#EAFBF3] text-[#4DCF8F]",
    "Digital Art": "bg-[#F3F4FB] text-[#697CDF]",
    Illustration: "bg-[#FFF0F0] text-[#FF6B6B]",
    Branding: "bg-[#F0FDF4] text-[#22C55E]",
    Prototyping: "bg-[#F3E8FF] text-[#A855F7]",

    // Development (Blues, Indigos, Cyans)
    React: "bg-[#eafbfd] text-[#0ea5e9]",
    "React Native": "bg-[#eafbfd] text-[#0ea5e9]",
    "Vue.js": "bg-[#effef5] text-[#10b981]",
    "Nuxt.js": "bg-[#effef5] text-[#10b981]",
    Angular: "bg-[#FFF0F0] text-[#DD0031]",
    "Node.js": "bg-[#F0FDF4] text-[#41B883]",
    Python: "bg-[#EFF8FF] text-[#172B4D]",
    Django: "bg-[#E6F4EA] text-[#092E20]",
    Java: "bg-[#FFF4E5] text-[#F89820]",
    Swift: "bg-[#FFF0EB] text-[#F05138]",
    Kotlin: "bg-[#F3E8FF] text-[#7F52FF]",
    JavaScript: "bg-[#FFFBEB] text-[#F59E0B]",
    TypeScript: "bg-[#EFF6FF] text-[#3B82F6]",
    "HTML/CSS": "bg-[#EFF6FF] text-[#3B82F6]",
    MongoDB: "bg-[#ECFDF5] text-[#059669]",
    PostgreSQL: "bg-[#EFF6FF] text-[#336791]",
    Programming: "bg-[#F3F4FB] text-[#697CDF]",
    APP: "bg-[#E6EBEE] text-[#002B44]",
    HTML: "bg-[#EAFBF3] text-[#4DCF8F]",
    CSS: "bg-[#EFF6FF] text-[#3B82F6]",
    PHP: "bg-[#F3F4FB] text-[#697CDF]",

    // Marketing & Content (Yellows, Oranges, Teals)
    SEO: "bg-[#ECFEFF] text-[#06B6D4]",
    Marketing: "bg-[#FFF7ED] text-[#EA580C]",
    "Content Strategy": "bg-[#FDF2F8] text-[#DB2777]",
    Copywriting: "bg-[#F0F9FF] text-[#0284C7]",
    Analytics: "bg-[#FFFBEB] text-[#D97706]",
    "Social Media": "bg-[#EFF6FF] text-[#2563EB]",
    Instagram: "bg-[#FDF2F8] text-[#DB2777]",
    Blogging: "bg-[#ECFDF5] text-[#059669]",
    Digital: "bg-[#F3F4FB] text-[#697CDF]",
  };

  // Processing Logic
  const processedCandidates = useMemo(() => {
    let result = [...candidates];

    // Filter by Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.specialization.toLowerCase().includes(query) ||
          c.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by Category
    if (selectedCategory) {
      result = result.filter((c) => c.category === selectedCategory);
    }

    // Filter by Location
    if (selectedLocation) {
      result = result.filter((c) =>
        c.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Sort
    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "rate_low") {
      result.sort(
        (a, b) =>
          parseFloat(a.rate.replace("$", "")) -
          parseFloat(b.rate.replace("$", ""))
      );
    } else if (sortBy === "rate_high") {
      result.sort(
        (a, b) =>
          parseFloat(b.rate.replace("$", "")) -
          parseFloat(a.rate.replace("$", ""))
      );
    }

    return result;
  }, [candidates, searchQuery, selectedCategory, selectedLocation, sortBy]);

  // Pagination
  const indexOfLastCandidate = currentPage * perPage;
  const indexOfFirstCandidate = indexOfLastCandidate - perPage;
  const currentCandidates = processedCandidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );
  const totalPages = Math.ceil(processedCandidates.length / perPage);

  // Reset page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedLocation, sortBy]);

  // Scroll to top on page change
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F9FBFC] relative">
      {/* Banner Section */}
      <div className="bg-[#F2F7FA] py-16 md:py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-[#002333] mb-3">
            Browse All Candidates
          </h1>
          <nav className="flex justify-center items-center gap-2 text-sm text-[#5E6670]">
            <Link to="/" className="hover:text-[#004D6D] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#004D6D] font-medium">
              Browse All Candidates
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 lg:py-16 max-w-[1600px]">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-slate-100 mb-8 gap-4">
          <p className="text-sm text-slate-500 font-medium whitespace-nowrap">
            Showing{" "}
            {processedCandidates.length > 0 ? indexOfFirstCandidate + 1 : 0} –{" "}
            {Math.min(indexOfLastCandidate, processedCandidates.length)} of{" "}
            {processedCandidates.length} Results
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

        {/* Filter Drawer */}
        <>
          <div
            className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
              isFilterOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            onClick={() => setIsFilterOpen(false)}
          />

          <div
            className={`fixed inset-y-0 right-0 z-50 w-[320px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col ${
              isFilterOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-[#002333]">Filters</h3>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="p-2 bg-slate-50 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

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

            {/* Drawer Footer */}
            <div className="p-6 border-t border-slate-100">
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("");
                  setSelectedLocation("");
                  setIsFilterOpen(false);
                }}
                className="w-full py-3 bg-[#5BBB7B] text-white font-semibold rounded-md transition-all relative overflow-hidden z-10 before:absolute before:inset-0 before:bg-[#002333] before:origin-center before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 before:-z-10"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </>

        {/* List of Candidates (New Grid Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentCandidates.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white rounded-lg p-6 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow group flex flex-col h-full"
            >
              {/* Header: Img + Info + View Profile */}
              <div className="flex justify-between items-start gap-4 mb-4">
                <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
                  <div className="relative shrink-0">
                    <img
                      src={candidate.image}
                      alt={candidate.name}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#5BBB7B] border-2 border-white rounded-full"></span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base md:text-[17px] font-bold text-[#002333] group-hover:text-[#5BBB7B] transition-colors leading-tight truncate">
                      {candidate.name}
                    </h3>
                    <p className="text-[#5E6670] text-sm font-medium mt-1 truncate">
                      {candidate.specialization}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/candidate-details/${candidate.id}`}
                  className="shrink-0 text-sm font-medium text-[#004D6D] underline decoration-slate-300 hover:text-[#5BBB7B] hover:decoration-[#5BBB7B] transition-all whitespace-nowrap mt-1"
                >
                  View Profile
                </Link>
              </div>

              {/* Description */}
              <p className="text-[#5E6670] text-[15px] leading-relaxed mb-5 line-clamp-3">
                Every month, more than 3 million job seekers visit our website
                to search for jobs, with more than 130,000 applications per day.
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {candidate.tags.slice(0, 4).map((tag, idx) => {
                  const currentStyle =
                    tagStyles[tag] ||
                    "bg-[#F0F5F7] text-[#5E6670] hover:bg-[#5BBB7B] hover:text-white";
                  return (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all duration-300 ${currentStyle}`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="border-t border-slate-100 mt-auto mb-4 w-full"></div>

              {/* Footer: Rating, Location, Rate */}
              <div className="flex flex-wrap items-center justify-between gap-y-3 gap-x-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={
                        i < Math.floor(candidate.rating) ? "#FFB800" : "none"
                      }
                      className={
                        i < Math.floor(candidate.rating)
                          ? "text-[#FFB800]"
                          : "text-slate-200"
                      }
                    />
                  ))}
                  <span className="text-sm text-[#5E6670] ml-1">
                    {candidate.rating.toFixed(1)} ({candidate.reviews} Review)
                  </span>
                </div>

                <div className="flex items-center gap-3 md:gap-4 text-sm text-[#5E6670]">
                  <div className="flex items-center gap-1.5">
                    <MapPin size={16} className="text-[#5BBB7B]" />
                    <span className="hidden sm:inline">Location</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 flex items-center justify-center rounded-sm bg-[#5BBB7B]/10 text-[#5BBB7B] font-bold text-xs">
                      $
                    </span>
                    <span>{candidate.rate} / hour</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {currentCandidates.length === 0 && (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20">
              <h3 className="text-xl font-bold text-[#002333] mb-2">
                No Candidates Found
              </h3>
              <p className="text-[#5E6670]">
                Try adjusting your search criteria
              </p>
            </div>
          )}
        </div>

        {/* Pagination (Same as before) */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:border-[#5BBB7B] hover:bg-[#5BBB7B] hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-500 disabled:hover:border-slate-200 transition-all shadow-sm"
            >
              {"<"}
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-full font-medium transition-all shadow-sm ${
                  currentPage === i + 1
                    ? "bg-[#5BBB7B] text-white border border-[#5BBB7B]"
                    : "bg-white border border-slate-200 text-slate-500 hover:border-[#5BBB7B] hover:bg-[#5BBB7B] hover:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:border-[#5BBB7B] hover:bg-[#5BBB7B] hover:text-white disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-slate-500 disabled:hover:border-slate-200 transition-all shadow-sm"
            >
              {">"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Candidates;
