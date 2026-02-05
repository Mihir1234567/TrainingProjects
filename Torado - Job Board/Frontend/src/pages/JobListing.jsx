import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import JobListingHeader from "../components/common/JobListingHeader";
import JobSortingBar from "../components/common/JobSortingBar";
import JobSidebar from "../components/common/JobSidebar";
import JobCard from "../components/common/JobCard";
import Footer from "../components/layout/Footer";
import JobCardSkeleton from "../components/common/JobCardSkeleton";
import { X, Search } from "lucide-react";
import { jobsAPI } from "../services/api";

const JobListing = () => {
  // --- States ---
  const [jobs, setJobs] = useState([]);
  const [searchParams] = useSearchParams();
  const recruiterIdParam = searchParams.get("recruiterId");
  const keywordParam = searchParams.get("keyword");
  const locationParam = searchParams.get("location");
  const categoryParam = searchParams.get("category");

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("Default");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSortBarOpen, setIsSortBarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const [filters, setFilters] = useState({
    searchQuery: keywordParam || "",
    locationQuery: locationParam || "",
    radius: 50,
    selectedCategory: categoryParam || "",
    selectedJobTypes: [],
    selectedDatePost: "all",
    selectedEmployment: [],
    selectedExperience: [],
    salary: 10000,
    selectedTags: [],
    recruiterId: recruiterIdParam ? parseInt(recruiterIdParam) : null,
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
      recruiterId: null,
    });
    setCurrentPage(1);
  };

  // Fetch Jobs from API based on Filters
  useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        // Map state filters to API params
        const apiParams = {
          page: currentPage,
          limit: perPage,
        };
        if (filters.searchQuery) apiParams.keyword = filters.searchQuery;
        if (filters.locationQuery) apiParams.location = filters.locationQuery;
        if (filters.selectedCategory)
          apiParams.category = filters.selectedCategory;
        if (filters.recruiterId) apiParams.recruiterId = filters.recruiterId;
        if (filters.selectedJobTypes.length > 0)
          apiParams.type = filters.selectedJobTypes.join(",");

        if (filters.salary < 10000) {
          apiParams.minSalary = filters.salary;
        }
        if (filters.selectedTags.length > 0) {
          apiParams.tags = filters.selectedTags.join(",");
        }

        const response = await jobsAPI.getAll(apiParams);

        // Handle Paginated Response
        if (response.jobs) {
          setJobs(response.jobs);
          setTotalResults(response.total);
          // If current page > total pages (e.g. filtered result shrinks), reset to 1
          if (response.pages < currentPage && response.pages > 0) {
            setCurrentPage(1);
          }
        } else {
          // Fallback for array response if API mismatch
          setJobs(response);
          setTotalResults(response.length);
        }
      } catch (error) {
        console.error("Failed to fetch jobs", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce
    const timer = setTimeout(() => fetchJobs(), 500);
    return () => clearTimeout(timer);
  }, [filters, sortBy, currentPage, perPage]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isSidebarOpen || isSortBarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSidebarOpen, isSortBarOpen]);

  // --- Server Side Pagination ---
  // jobs is now the current page chunk
  const paginatedJobs = jobs;
  const totalPages = Math.ceil(totalResults / perPage);

  // Calculate dynamic counts?
  // With server pagination, we can't easily count ALL types client side without a separate stats API.
  // We will memoize existing jobs type counts just for the *visible* page, which isn't great but safe fallback.
  const jobTypeCounts = useMemo(() => {
    // Ideally we fetch stats from backend. For now, zero out or use minimal.
    return {
      "Full Time": 0,
      "Part Time": 0,
      Remote: 0,
      Internship: 0,
      Contract: 0,
      Training: 0,
    };
  }, []);

  /*
  const paginatedJobs = useMemo(() => {
     // No slicing needed
     return jobs;
  }, [jobs]);
  */

  // NOTE: removeResetEffect as it's now in dependency
  // useEffect(() => { setCurrentPage(1); }, [filters, ...]); // Handled in main effect dependency or separate?
  // We should reset page to 1 when FILTERS change, but NOT when currentPage changes.

  useEffect(() => {
    // When filters change (excluding page), reset to page 1
    setCurrentPage(1);
  }, [
    filters.searchQuery,
    filters.locationQuery,
    filters.selectedCategory,
    filters.selectedJobTypes,
    filters.salary,
    filters.selectedTags,
    filters.recruiterId,
  ]);

  // --- Active Filter Chips Logic ---
  const activeChips = useMemo(() => {
    const chips = [];
    if (filters.recruiterId) {
      // Find recruiter name for chip
      const job = jobs.find((j) => j.recruiterId === filters.recruiterId);
      const name = job ? job.recruiterName : "Recruiter";
      chips.push({
        label: `Recruiter: ${name}`,
        key: "recruiterId",
        value: filters.recruiterId,
      });
    }
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
      }),
    );
    filters.selectedExperience.forEach((e) =>
      chips.push({ label: e, key: "selectedExperience", value: e }),
    );
    filters.selectedEmployment.forEach((em) =>
      chips.push({ label: em, key: "selectedEmployment", value: em }),
    );
    filters.selectedTags.forEach((tag) =>
      chips.push({ label: tag, key: "selectedTags", value: tag }),
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
      setFilters((prev) => ({
        ...prev,
        [chip.key]: chip.value === filters[chip.key] ? "" : chip.value,
      }));
      // Special handling for recruiterId: null it out
      if (chip.key === "recruiterId") {
        setFilters((prev) => ({ ...prev, recruiterId: null }));
      }
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
                  <JobCard key={job._id || job.id} job={job} />
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
