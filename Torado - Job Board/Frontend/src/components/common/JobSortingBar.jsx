import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const JobSortingBar = ({
  totalResults,
  sortBy,
  setSortBy,
  perPage,
  setPerPage,
}) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isPageOpen, setIsPageOpen] = useState(false);

  const sortRef = useRef(null);
  const pageRef = useRef(null);

  const sortOptions = ["Default", "Highest Salary", "Newest", "Top Rated"];
  const pageOptions = ["06", "08", "09", "10", "16", "18", "20"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
      if (pageRef.current && !pageRef.current.contains(event.target)) {
        setIsPageOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white px-6 py-4 rounded-xl border border-slate-100 shadow-sm mb-8 gap-4">
      <div className="text-slate-500 font-medium">
        Showing{" "}
        <span className="text-slate-900">
          1 – {Math.min(perPage, totalResults)}
        </span>{" "}
        of <span className="text-slate-900">{totalResults}</span> Results
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="relative" ref={sortRef}>
          <div
            onClick={() => setIsSortOpen(!isSortOpen)}
            className={`flex items-center justify-between px-4 py-2 bg-slate-50 rounded-lg border cursor-pointer transition-colors w-[220px] ${
              isSortOpen ? "border-torado-brand-primary" : "border-slate-200"
            }`}
          >
            <span className="text-slate-600 text-sm">
              Sort by <span className="text-slate-400">({sortBy})</span>
            </span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                isSortOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isSortOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden">
              {sortOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setIsSortOpen(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                    sortBy === option
                      ? "bg-torado-brand-primary text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {option === "Default" ? "Sort by (Default)" : option}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative" ref={pageRef}>
          <div
            onClick={() => setIsPageOpen(!isPageOpen)}
            className={`flex items-center justify-between px-4 py-2 bg-slate-50 rounded-lg border cursor-pointer transition-colors w-[180px] ${
              isPageOpen ? "border-torado-brand-primary" : "border-slate-200"
            }`}
          >
            <span className="text-slate-600 text-sm">{perPage} Per Pages</span>
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                isPageOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {isPageOpen && (
            <div className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl z-50 overflow-hidden">
              {pageOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setPerPage(parseInt(option));
                    setIsPageOpen(false);
                  }}
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors ${
                    perPage.toString().padStart(2, "0") === option
                      ? "bg-torado-brand-primary text-white"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {option} Per Pages
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSortingBar;
