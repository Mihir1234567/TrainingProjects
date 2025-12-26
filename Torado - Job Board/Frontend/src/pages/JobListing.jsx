import React, { useState, useMemo, useEffect } from "react";
import JobListingHeader from "../components/common/JobListingHeader";
import JobSortingBar from "../components/common/JobSortingBar";
import JobSidebar from "../components/common/JobSidebar";
import JobCard from "../components/common/JobCard";
import Footer from "../components/layout/Footer";
import JobCardSkeleton from "../components/common/JobCardSkeleton";
import jobsData from "../data/jobs.json";
import { X, Search } from "lucide-react";

const JobListing = () => {
  // --- States ---
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("Default");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSortBarOpen, setIsSortBarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [filters, setFilters] = useState({
    searchQuery: "",
    locationQuery: "",
    radius: 50,
    selectedCategory: "",
    selectedJobTypes: [],
    selectedDatePost: "all",
    selectedEmployment: [],
    selectedExperience: [],
    salary: 10000,
    selectedTags: [],
  });

  const clearFilters = () => {
    setFilters({
      searchQuery: "",
      locationQuery: "",
      radius: 50,
      selectedCategory: "",
      selectedJobTypes: [],
      selectedDatePost: "all",
      selectedEmployment: [],
      selectedExperience: [],
      salary: 10000,
      selectedTags: [],
    });
    setCurrentPage(1);
  };

  // Trigger loading state for better UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 400);
    return () => clearTimeout(timer);
  }, [filters, sortBy, perPage]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isSidebarOpen || isSortBarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen, isSortBarOpen]);

  // --- Filtering & Sorting Logic ---
  const processedJobs = useMemo(() => {
    let result = [...jobsData];

    // 1. Searching by Keywords
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(q) ||
          job.company.toLowerCase().includes(q) ||
          job.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // 2. Searching by Location
    if (filters.locationQuery) {
      const q = filters.locationQuery.toLowerCase();
      result = result.filter((job) => job.location.toLowerCase().includes(q));
    }

    // 3. Category Filter
    if (filters.selectedCategory) {
      result = result.filter(
        (job) => job.category === filters.selectedCategory
      );
    }

    // 4. Job Type Filter
    if (filters.selectedJobTypes.length > 0) {
      result = result.filter((job) => {
        const jobType = job.type.toLowerCase();
        return filters.selectedJobTypes.some((selected) => {
          const s = selected.toLowerCase().replace(" jobs", "");
          return jobType.includes(s) || s.includes(jobType);
        });
      });
    }

    // 5. Date Posted Filter
    if (filters.selectedDatePost !== "all") {
      const q = filters.selectedDatePost.toLowerCase();
      result = result.filter((job) => {
        const posted = job.postedAt.toLowerCase();
        if (q === "hour") return posted.includes("hour");
        if (q === "24h")
          return (
            posted.includes("hour") ||
            (posted.includes("day") && posted.includes("1 "))
          );
        if (q === "7d")
          return !posted.includes("month") && !posted.includes("year");
        return posted.includes(q) || posted.includes("hour"); // Default/Fallback
      });
    }

    // 6. Experience Level Filter
    if (filters.selectedExperience.length > 0) {
      result = result.filter((job) =>
        filters.selectedExperience.includes(job.experience)
      );
    }

    // 7. Salary Filter
    result = result.filter((job) => job.salary <= filters.salary);

    // 8. Tags Filter
    if (filters.selectedTags.length > 0) {
      result = result.filter((job) =>
        filters.selectedTags.some((tag) => job.tags.includes(tag))
      );
    }

    // 9. Employment Type Filter
    if (filters.selectedEmployment.length > 0) {
      result = result.filter((job) =>
        filters.selectedEmployment.includes(job.employmentType)
      );
    }

    // --- Sorting ---
    switch (sortBy) {
      case "Highest Salary": // Salary High to Low
        result.sort((a, b) => b.salary - a.salary);
        break;
      case "Newest": // Newest First (Mock based on parsing strings like "4 months ago")
        // Lexicographical/simple mock sort for now
        result.sort((a, b) => a.postedAt.localeCompare(b.postedAt));
        break;
      case "Top Rated": // Best Rated
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "Default":
      default:
        // Already in default order
        break;
    }

    return result;
  }, [filters, sortBy, jobsData]);

  // --- Pagination Logic ---
  const totalResults = processedJobs.length;
  const totalPages = Math.ceil(totalResults / perPage);

  // Calculate dynamic counts for Job Types
  const jobTypeCounts = useMemo(() => {
    const counts = {
      "Full Time": 0,
      "Part Time": 0,
      Remote: 0,
      Internship: 0,
      Contract: 0,
      Training: 0,
    };
    jobsData.forEach((job) => {
      if (counts.hasOwnProperty(job.type)) {
        counts[job.type]++;
      }
    });
    return counts;
  }, [jobsData]);

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return processedJobs.slice(start, start + perPage);
  }, [processedJobs, currentPage, perPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy, perPage]);

  // --- Active Filter Chips Logic ---
  const activeChips = useMemo(() => {
    const chips = [];
    if (filters.searchQuery)
      chips.push({
        label: `"${filters.searchQuery}"`,
        key: "searchQuery",
        value: "",
      });
    if (filters.selectedCategory)
      chips.push({
        label: filters.selectedCategory,
        key: "selectedCategory",
        value: "",
      });
    filters.selectedJobTypes.forEach((t) =>
      chips.push({
        label: t.replace(" Jobs", ""),
        key: "selectedJobTypes",
        value: t,
      })
    );
    filters.selectedExperience.forEach((e) =>
      chips.push({ label: e, key: "selectedExperience", value: e })
    );
    filters.selectedEmployment.forEach((em) =>
      chips.push({ label: em, key: "selectedEmployment", value: em })
    );
    filters.selectedTags.forEach((tag) =>
      chips.push({ label: tag, key: "selectedTags", value: tag })
    );
    if (filters.salary < 10000)
      chips.push({
        label: `< $${filters.salary}`,
        key: "salary",
        value: 10000,
      });
    return chips;
  }, [filters]);

  const removeChip = (chip) => {
    if (Array.isArray(filters[chip.key])) {
      setFilters((prev) => ({
        ...prev,
        [chip.key]: prev[chip.key].filter((v) => v !== chip.value),
      }));
    } else {
      setFilters((prev) => ({ ...prev, [chip.key]: chip.value }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative">
      <JobListingHeader />

      {/* Secondary Mobile Navbar */}
      <div className="sticky top-[72px] z-30 lg:hidden bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between shadow-sm">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 text-slate-700 font-bold text-sm bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-torado-green-600 hover:text-torado-green-600 transition-all"
        >
          <X
            className={`w-4 h-4 transition-transform ${
              filters.selectedCategory || filters.selectedJobTypes.length > 0
                ? "rotate-45"
                : ""
            }`}
          />
          Filter
          {(filters.selectedJobTypes.length > 0 ||
            filters.selectedCategory ||
            filters.selectedExperience.length > 0) && (
            <span className="w-5 h-5 bg-torado-green-600 text-white rounded-full flex items-center justify-center text-[10px]">
              {filters.selectedJobTypes.length +
                filters.selectedExperience.length +
                (filters.selectedCategory ? 1 : 0)}
            </span>
          )}
        </button>
        <button
          onClick={() => setIsSortBarOpen(true)}
          className="flex items-center gap-2 text-slate-700 font-bold text-sm bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200 hover:border-torado-green-600 hover:text-torado-green-600 transition-all"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m21 16-4 4-4-4" />
            <path d="M17 20V4" />
            <path d="m3 8 4-4 4 4" />
            <path d="M7 4v16" />
          </svg>
          Sort
        </button>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-20 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Column: Sorting Bar & Results */}
          <div className="lg:col-span-3">
            {/* Active Filter Chips */}
            {activeChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
                  Active Filters:
                </span>
                {activeChips.map((chip, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-100 rounded-full shadow-sm text-sm text-slate-600 animate-in fade-in slide-in-from-left-2 duration-300"
                  >
                    <span className="font-medium">{chip.label}</span>
                    <button
                      onClick={() => removeChip(chip)}
                      className="p-0.5 hover:bg-slate-100 rounded-full transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={clearFilters}
                  className="text-xs font-bold text-torado-brand-primary hover:underline ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            <div className="hidden lg:block">
              <JobSortingBar
                totalResults={totalResults}
                sortBy={sortBy}
                setSortBy={setSortBy}
                perPage={perPage}
                setPerPage={setPerPage}
              />
            </div>

            {/* Job Cards Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {[...Array(perPage)].map((_, i) => (
                  <JobCardSkeleton key={i} />
                ))}
              </div>
            ) : paginatedJobs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {paginatedJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[40px] border border-slate-100 p-12 md:p-20 text-center shadow-sm animate-in fade-in zoom-in duration-500">
                <div className="max-w-md mx-auto">
                  <div className="mb-8 relative inline-block">
                    <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
                      <Search
                        className="w-12 h-12 text-slate-300"
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-torado-green-600 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                      <X className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    No matching jobs found
                  </h3>
                  <p className="text-slate-500 mb-10 leading-relaxed">
                    We couldn't find any jobs matching your current filters. Try
                    adjusting your search or clearing all filters to see more
                    results.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="px-10 py-4 bg-[#083e47] text-white font-bold rounded-xl hover:bg-torado-green-600 transition-all duration-300 shadow-xl shadow-slate-200"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-12 flex flex-wrap justify-center items-center gap-3">
                {[...Array(totalPages)].map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all ${
                      currentPage === idx + 1
                        ? "bg-torado-green-600 text-white shadow-lg shadow-green-500/20"
                        : "bg-white border border-slate-100 text-slate-400 hover:bg-torado-green-600 hover:text-white"
                    }`}
                  >
                    {(idx + 1).toString().padStart(2, "0")}
                  </button>
                ))}

                {currentPage < totalPages && (
                  <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="w-10 h-10 rounded-full bg-white border border-slate-100 text-slate-400 font-bold flex items-center justify-center hover:bg-torado-green-600 hover:text-white transition-all cursor-pointer"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Sidebar Filters (Desktop) */}
          <div className="hidden lg:block lg:col-span-1">
            <JobSidebar
              filters={filters}
              setFilters={setFilters}
              clearFilters={clearFilters}
              jobTypeCounts={jobTypeCounts}
            />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 lg:hidden ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
        <div
          className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-slate-50 shadow-2xl transition-transform duration-300 p-6 overflow-y-auto ${
            isSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900">Filters</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 bg-white rounded-full text-slate-500 shadow-sm border border-slate-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <JobSidebar
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
            jobTypeCounts={jobTypeCounts}
          />
          <div className="mt-8 sticky bottom-0 bg-slate-50 pt-4 pb-2">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="w-full py-4 bg-torado-green-600 text-white font-bold rounded-xl shadow-lg shadow-green-500/20"
            >
              Show Results ({totalResults})
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sorting Drawer (Bottom Sheet) */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-300 lg:hidden ${
          isSortBarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={() => setIsSortBarOpen(false)}
        ></div>
        <div
          className={`absolute bottom-0 left-0 w-full bg-white rounded-t-[32px] shadow-2xl transition-transform duration-300 p-8 ${
            isSortBarOpen ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8"></div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-900">Sorting & View</h2>
            <button
              onClick={() => setIsSortBarOpen(false)}
              className="p-2 bg-slate-50 rounded-full text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-6">
            <JobSortingBar
              totalResults={totalResults}
              sortBy={sortBy}
              setSortBy={setSortBy}
              perPage={perPage}
              setPerPage={setPerPage}
            />
          </div>
          <button
            onClick={() => setIsSortBarOpen(false)}
            className="w-full mt-8 py-4 bg-torado-green-600 text-white font-bold rounded-xl"
          >
            Apply Sorting
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default JobListing;
