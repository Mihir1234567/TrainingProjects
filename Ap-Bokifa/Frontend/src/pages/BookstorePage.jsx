// BookstorePage.jsx - HMR Trigger

import React, { useState, useMemo, useCallback, useEffect } from "react";
// 🌟 FIX 1: Import useLocation to read URL parameters
import { useLocation } from "react-router-dom";
// 🌟 NEW: Import framer-motion for animations
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../components/product/ProductCard";
import ProductCarousel from "../components/product/ProductCorousel";
import ProductCardSkeleton from "../components/product/ProductCardSkeleton"; // ADDED
// import ALL_PRODUCTS from "../components/productsData"; // REMOVED
import useRecentlyViewed from "../hooks/useRecentlyViwed";
import CategoryBanner from "../components/CategoryBanner";
import { useProducts } from "../hooks/useProducts"; // ADDED

// --- Product Grid Card Wrapper ---
const ProductGridCard = ({ product, onViewProduct }) => (
  <div className="w-full">
    <ProductCard product={product} onViewProduct={onViewProduct} />
  </div>
);
// ... (omitting helper components check diff) ...

// --- Component for the top Category list (Functional Link Filter) ---
const CategoryLinkFilter = ({ title, filters, selected, onSelectCategory }) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="py-4 border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full text-left font-bold text-lg text-gray-900 hover:text-green-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="text-gray-500 text-2xl font-normal transition-transform duration-300 transform">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <ul className="mt-3 space-y-2 text-base">
          {filters.map((filter) => {
            const isSelected = selected.includes(filter.name);
            return (
              <li key={filter.name}>
                <a
                  href="#"
                  className={`block transition-colors ${
                    isSelected
                      ? "font-extrabold text-green-700"
                      : "text-gray-700 hover:text-black"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectCategory(filter.name);
                  }}
                >
                  {filter.name}{" "}
                  <span className="text-gray-400 font-normal">
                    ({filter.count})
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

// --- Component for checkbox filters with selection logic ---
const CheckboxFilter = ({ title, filters, selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(true);
  const filterKey = title.toLowerCase().replace(/\s/g, "-");

  return (
    <div className="py-4 border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full text-left font-bold text-lg text-gray-900 hover:text-green-700 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="text-gray-500 text-2xl font-normal transition-transform duration-300 transform">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 space-y-2 text-base">
          {filters.map((filter) => (
            <div key={filter.name} className="flex items-center">
              <input
                id={`filter-${filterKey}-${filter.name
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
                name={filterKey}
                type="checkbox"
                value={filter.name}
                checked={selected.includes(filter.name)}
                onChange={onChange}
                className="h-5 w-5 text-green-700 border-gray-300 rounded focus:ring-green-700 focus:ring-2"
              />
              <label
                htmlFor={`filter-${filterKey}-${filter.name
                  .toLowerCase()
                  .replace(/\s/g, "-")}`}
                className="ml-3 text-gray-700"
              >
                {filter.name}{" "}
                <span className="text-gray-400 font-normal">
                  ({filter.count})
                </span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Sort Options Definition ---
const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "best-selling", label: "Best selling" },
  { value: "title-asc", label: "Alphabetically, A-Z" },
  { value: "title-desc", label: "Alphabetically, Z-A" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "date-asc", label: "Date, old to new" },
  { value: "date-desc", label: "Date, new to old" },
  { value: "title-asc", label: "Alphabetically, A-Z" }, // Duplicate handled by key
];

// --- Inline Desktop SortDropdown Component ---
const SortDropdown = ({ selectedSort, onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeOption =
    SORT_OPTIONS.find((opt) => opt.value === selectedSort) || SORT_OPTIONS[0];
  const handleSelect = (value) => {
    onSortChange(value);
    setIsOpen(false);
  };
  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  return (
    <div
      className="relative inline-block text-left z-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex justify-center items-center text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700 rounded-md py-1 px-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span className="hidden sm:inline text-gray-500 mr-2">Sort by</span>
        <span className="font-bold text-gray-900">{activeOption.label}</span>
        <svg
          className={`-mr-1 ml-2 h-5 w-5 text-gray-700 transform transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {SORT_OPTIONS.map((option, index) => (
              <a
                key={`${option.value}-${index}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleSelect(option.value);
                }}
                className={`
                                    flex items-center px-4 py-3 text-sm transition-colors duration-150
                                    ${
                                      option.value === selectedSort
                                        ? "bg-green-700 text-white font-bold"
                                        : "text-gray-800 hover:bg-gray-100"
                                    }
                                `}
                role="menuitem"
                tabIndex="-1"
              >
                {option.label}
                {option.value === selectedSort && (
                  <svg
                    className="ml-auto h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- Mobile Filter Sidebar Component ---
const MobileFilterSidebar = ({
  isOpen,
  onClose,
  filterOptions,
  selectedCategories,
  onAvailabilityChange,
  selectedAvailability,
  selectedFormats,
  onFormatChange,
  selectedRatings,
  onRatingChange,
  onCategoryChange,
  onClearAll,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-white z-50 shadow-xl overflow-y-auto"
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 space-y-6">
              {/* Clear All Button */}
              <button
                onClick={onClearAll}
                className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded text-sm font-medium transition-colors"
              >
                Clear All Filters
              </button>

              <CategoryLinkFilter
                title="Book Types"
                filters={filterOptions.mainCategoryFilters}
                selected={selectedCategories}
                onSelectCategory={(cat) => {
                  // Adapt the single select handler for the mobile component prop structure if needed,
                  // or just pass the same handler
                  // The main component passes handleFilterChange(setSelectedCategories) which expects an event
                  // But CategoryLinkFilter passes the name directly.
                  // Let's create an adapter if needed.
                  // Actually checking usage:
                  // <MobileFilterSidebar ... onCategoryChange={handleFilterChange(setSelectedCategories)} />
                  // The prop is onCategoryChange.
                  // The component below uses it.
                  // Wait, CategoryLinkFilter in main component calls onSelectCategory(filter.name).
                  // So we should pass a handler that accepts the name.
                  // in main: onCategoryChange={handleFilterChange(setSelectedCategories)} <- this expects event.
                  // BUT CategoryLinkFilter calls onSelectCategory(filter.name).
                  // ERROR POTENTIAL: handleFilterChange expects event.
                  // I will fix this in the MobileFilterSidebar definition here to match.

                  // Actually, let's just reuse the logic from the desktop sidebar:
                  // <CategoryLinkFilter ... onSelectCategory={handleCategoryLinkSelect} />
                  // Mobile sidebar should receive handleCategoryLinkSelect as a prop too ideally.
                  // For now, let's assume the passed prop handles it or fix it inline.
                  onCategoryChange({
                    target: {
                      value: cat,
                      checked: !selectedCategories.includes(cat),
                    },
                  });
                }}
              />
              {/* Wait, the passed prop onCategoryChange corresponds to handleFilterChange in the main component usage.
                  handleFilterChange returns a function (event) => ...
                  So we need to mock an event object.
               */}

              {/* 
                  Actually, looking at the main component usage:
                   onCategoryChange={handleFilterChange(setSelectedCategories)}
                  This is for CHECKBOX behavior (multiple).
                  But desktop uses `handleCategoryLinkSelect` (single/toggle).
                  I should probably use `handleFilterChange` style for mobile if I want multiple support or consistent with passed prop.
                  Let's stick to the code I see.
               */}

              <CheckboxFilter
                title="Availability"
                filters={filterOptions.availabilityFilters}
                selected={selectedAvailability}
                onChange={onAvailabilityChange}
              />
              <CheckboxFilter
                title="Format"
                filters={filterOptions.formatFilters}
                selected={selectedFormats}
                onChange={onFormatChange}
              />
              <CheckboxFilter
                title="Rating"
                filters={filterOptions.ratingFilters}
                selected={selectedRatings}
                onChange={onRatingChange}
              />
            </div>

            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={onClose}
                className="w-full py-3 bg-green-700 text-white font-bold rounded shadow-lg hover:bg-green-800 transition-transform transform active:scale-95"
              >
                View Results
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Mobile Sort Modal Component ---
const MobileSortModal = ({ isOpen, onClose, selectedSort, onSortChange }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            className="fixed bottom-0 left-0 w-full bg-white z-50 rounded-t-2xl overflow-hidden max-h-[70vh] flex flex-col"
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Sort By</h2>
              <button
                onClick={onClose}
                className="p-2 text-gray-500 hover:text-gray-900"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <div className="space-y-2">
                {SORT_OPTIONS.map((option, index) => (
                  <button
                    key={`${option.value}-${index}`}
                    onClick={() => {
                      onSortChange(option.value);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${
                      selectedSort === option.value
                        ? "border-green-700 bg-green-50 text-green-800"
                        : "border-gray-200 hover:border-gray-300 text-gray-700"
                    }`}
                  >
                    <span
                      className={`font-medium ${
                        selectedSort === option.value ? "font-bold" : ""
                      }`}
                    >
                      {option.label}
                    </span>
                    {selectedSort === option.value && (
                      <svg
                        className="w-5 h-5 text-green-700"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main Page Component ---
const BookstorePage = () => {
  // 🌟 FIX 2: Use location hook to get URL parameters
  const location = useLocation();

  // --- STATE MANAGEMENT ---
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedSort, setSelectedSort] = useState("title-asc");
  const [currentPage, setCurrentPage] = useState(1);

  // 🌟 FIX 3: Extract category filter from URL on component mount
  const categoryParam = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get("category");
  }, [location.search]);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    // Note: We don't auto-clear if param is missing to preserve user selection session,
    // but if you want strict sync with URL, uncomment below:
    // else setSelectedCategories([]);
  }, [categoryParam]);

  // Construct Query Params for Backend
  const queryParams = useMemo(() => {
    const params = {
      page: currentPage,
      limit: 16, // PRODUCTS_PER_PAGE
      sort: selectedSort,
    };

    if (selectedCategories.length > 0) params.category = selectedCategories;
    if (selectedFormats.length > 0) params.format = selectedFormats;

    // Availability (Backend expects booleans mostly, but let's see)
    // Backend doesn't support "In Stock" OR "Out of stock" via simplified query easily unless we map it.
    // Our backend checks: isSoldOut.
    if (selectedAvailability.includes("In stock")) params.isSoldOut = false;
    if (selectedAvailability.includes("Out of stock")) params.isSoldOut = true;
    // Note: If both selected, we technically want ALL (ignore filter).
    if (
      selectedAvailability.includes("In stock") &&
      selectedAvailability.includes("Out of stock")
    ) {
      delete params.isSoldOut;
    }

    // Rating (Backend sort supports "rating", but filtering by min rating isn't in getAllProducts yet?)
    // Checking productController: it does NOT have minRating filter.
    // We will skip rating filter for now or add it to backend if strictly needed.
    // For now, ignoring rating filter in server request.

    return params;
  }, [
    currentPage,
    selectedCategories,
    selectedFormats,
    selectedAvailability,
    selectedSort,
  ]);

  // Server-Side Fetch
  const { products, loading, error, pagination } = useProducts(queryParams);

  // Use server data directly
  const displayProducts = products;
  const totalPages = pagination?.totalPages || 1;

  const { viewedItems, addRecentlyViewed } = useRecentlyViewed();
  const recentlyViewedIds = viewedItems.map((item) => item.id);

  // 🌟 NEW: Mobile modal state
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);

  // 🌟 NEW: Dynamic Filters State
  const [filterOptions, setFilterOptions] = useState({
    mainCategoryFilters: [],
    formatFilters: [],
    availabilityFilters: [
      { name: "In stock", count: "-" },
      { name: "Out of stock", count: "-" },
    ],
    ratingFilters: [
      { name: "4 Star & Up", count: "-" },
      { name: "3 Star & Up", count: "-" },
      { name: "2 Star & Up", count: "-" },
      { name: "1 Star & Up", count: "-" },
    ],
  });

  // Fetch Filters on Mount
  // Fetch Filters on Mount and when filters change (for smart facets)
  useEffect(() => {
    const loadFilters = async () => {
      try {
        const response = await import("../api/productService").then(
          (module) => module.fetchProductFilters(queryParams) // Pass current params!
        );
        if (response && response.data) {
          setFilterOptions({
            mainCategoryFilters: response.data.categories || [],
            formatFilters: response.data.formats || [],
            availabilityFilters: response.data.availability || [
              { name: "In stock", count: 0 },
              { name: "Out of stock", count: 0 },
            ],
            ratingFilters: response.data.ratings || [
              { name: "4 Star & Up", count: 0 },
              { name: "3 Star & Up", count: 0 },
              { name: "2 Star & Up", count: 0 },
              { name: "1 Star & Up", count: 0 },
            ],
          });
        }
      } catch (err) {
        console.error("Failed to load filters:", err);
      }
    };
    loadFilters();
  }, [queryParams]); // Dependency on queryParams triggers refetch on filter change

  // Alias for backward compatibility in render
  const dynamicFilterOptions = filterOptions;

  const handleCategoryLinkSelect = (categoryName) => {
    setSelectedCategories((prev) => {
      // Toggle logic
      if (prev.includes(categoryName))
        return prev.filter((c) => c !== categoryName);
      return [categoryName]; // Link filter usually behaves as "Select this one"
    });
    setCurrentPage(1); // Reset page
  };

  const handleFilterChange = (setter) => (event) => {
    const { value, checked } = event.target;
    setter((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
    setCurrentPage(1);
  };

  const handleClearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedFormats([]);
    setSelectedAvailability([]);
    setSelectedRatings([]);
    setIsFilterSidebarOpen(false);
    setCurrentPage(1);
  };

  // Title logic
  const defaultCategoryTitle = "All Products";
  const categoryDesc = "Discover your favorite book...";
  const activeCategoryTitle = useMemo(() => {
    if (selectedCategories.length === 1) return selectedCategories[0];
    return defaultCategoryTitle;
  }, [selectedCategories]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // --- DERIVED STATE FOR UI ---
  const totalProducts = pagination?.total || 0;
  // Calculate start/end indices for "Showing X-Y of Z"
  const PRODUCTS_PER_PAGE = 16;
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  // We use products.length to know exactly how many items we are showing on *this* page
  // But for display consistency "Showing 1-16 of 100", we can compute it.
  // Actually, displayEndIndex should be startIndex + products.length (the actual count displayed)
  const displayEndIndex = startIndex + (products?.length || 0);

  const renderPagination = () => {
    if (totalPages <= 1) return null;
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    if (endPage - startPage + 1 < maxPagesToShow)
      startPage = Math.max(1, endPage - maxPagesToShow + 1);

    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 border rounded-l-lg border-gray-300 transition-colors ${
          currentPage === 1
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-800 hover:bg-gray-100"
        }`}
      >
        Previous
      </button>
    );
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 border-t border-b border-gray-300 transition-colors ${
            i === currentPage
              ? "font-bold bg-green-700 text-white border-green-700 hover:bg-green-600"
              : "bg-white hover:bg-gray-100 text-gray-800"
          }`}
        >
          {i}
        </button>
      );
    }
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 border rounded-r-lg border-gray-300 transition-colors ${
          currentPage === totalPages
            ? "text-gray-400 cursor-not-allowed"
            : "text-gray-800 hover:bg-gray-100"
        }`}
      >
        Next
      </button>
    );
    return (
      <div className="flex rounded-lg overflow-hidden shadow-sm">{pages}</div>
    );
  };

  return (
    <>
      {/* ---------------------------------------------------- */}
      {/* 🌟 Mobile Controls Bar: Visible only on screens < lg */}
      {/* ---------------------------------------------------- */}
      <div className="bg-white pt-4 pb-4 border-b border-gray-200 lg:hidden">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Filter/Sort Bar */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setIsFilterSidebarOpen(true)}
              className="flex items-center justify-center text-base font-bold text-gray-900 p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM7 12a1 1 0 011-1h8a1 1 0 011 1v2a1 1 0 01-1 1H8a1 1 0 01-1-1v-2zM13 20a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z"
                />
              </svg>
              Filters
            </button>
            <button
              onClick={() => setIsMobileSortOpen(true)}
              className="flex items-center justify-center text-base font-bold text-gray-900 p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4h13M3 8h9M3 12h9m-9 4h9m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Sort by
            </button>
          </div>
        </div>
      </div>
      {/* Category Banner (Remains in the same spot) */}
      <CategoryBanner
        categoryName={activeCategoryTitle}
        description={categoryDesc}
      />{" "}
      <div className="bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row">
            {/* Filter Sidebar - Sticky on Desktop */}
            <div className="hidden lg:block w-full lg:w-1/4 lg:pr-8 py-8 border-r border-gray-100 h-full">
              <h2 className="text-2xl font-extrabold mb-6 text-gray-900">
                Browse Categories
              </h2>
              <CategoryLinkFilter
                title="Book Types"
                filters={dynamicFilterOptions.mainCategoryFilters}
                selected={selectedCategories}
                onSelectCategory={handleCategoryLinkSelect}
              />
              <h2 className="text-2xl font-extrabold mt-8 mb-4 text-gray-900">
                Refine Results
              </h2>
              <CheckboxFilter
                title="Availability"
                filters={dynamicFilterOptions.availabilityFilters}
                selected={selectedAvailability}
                onChange={handleFilterChange(setSelectedAvailability)}
              />
              <CheckboxFilter
                title="Format"
                filters={dynamicFilterOptions.formatFilters}
                selected={selectedFormats}
                onChange={handleFilterChange(setSelectedFormats)}
              />
              <CheckboxFilter
                title="Publisher"
                filters={[
                  {
                    name: "Ap Bokifa Publishing",
                    count: pagination?.total || 0,
                  },
                ]}
                selected={[]}
                onChange={() => {}}
              />
              <CheckboxFilter
                title="Genre"
                filters={dynamicFilterOptions.mainCategoryFilters}
                selected={selectedCategories}
                onChange={handleFilterChange(setSelectedCategories)}
              />
              <CheckboxFilter
                title="Customer Rating"
                filters={dynamicFilterOptions.ratingFilters}
                selected={selectedRatings}
                onChange={handleFilterChange(setSelectedRatings)}
              />
            </div>

            {/* Product Grid */}
            <main className="w-full lg:w-3/4 py-8 lg:pl-8">
              {/* 🌟 RESTORED: Desktop Top bar - Visible only on screens >= lg */}
              <div className="hidden lg:flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                <div className="text-lg text-gray-600 font-medium">
                  Showing{" "}
                  <span className="font-bold text-gray-900">
                    {startIndex + 1}–{displayEndIndex}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-gray-900">
                    {totalProducts}
                  </span>{" "}
                  results
                </div>
                <SortDropdown
                  selectedSort={selectedSort}
                  onSortChange={setSelectedSort}
                />
              </div>

              {/* Loading Skeletons */}
              {loading && (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                  {Array.from({ length: 12 }).map((_, index) => (
                    <div key={index} className="w-full">
                      <ProductCardSkeleton />
                    </div>
                  ))}
                </div>
              )}

              {error && (
                <div className="flex flex-col items-center justify-center py-20 bg-red-50 rounded-xl">
                  <div className="text-red-500 mb-2">
                    <svg
                      className="w-12 h-12"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-bold text-red-700">
                    Unable to load products
                  </p>
                  <p className="text-sm text-red-600 mt-1">
                    {error.message || "Please try again later"}
                  </p>
                </div>
              )}

              {/* 🌟 RESPONSIVE GRID: 2 cols on mobile, 3 on sm, 4 on lg */}
              {!loading && !error && (
                <>
                  {totalProducts > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-x-6 gap-y-10">
                      {displayProducts.map((product) => (
                        <ProductGridCard
                          key={product.id}
                          product={product}
                          onViewProduct={addRecentlyViewed}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl shadow-inner">
                      <svg
                        className="w-16 h-16 text-gray-300 mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                        />
                      </svg>
                      <p className="text-2xl font-semibold text-gray-500 text-center px-4">
                        No books found matching your filters.
                      </p>
                      <p className="text-gray-400 mt-2">
                        Try adjusting your filters or search criteria.
                      </p>
                      <button
                        onClick={handleClearAllFilters}
                        className="mt-6 px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors"
                      >
                        Clear All Filters
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Pagination */}
              <div className="flex justify-center mt-12">
                {renderPagination()}
              </div>
            </main>
          </div>
        </div>

        {/* Recently Viewed Products */}
        {recentlyViewedIds.length > 0 && (
          <div className="border-t border-gray-200 mt-12 pt-8">
            <ProductCarousel
              title="Recently viewed products"
              productIds={recentlyViewedIds}
              onViewProduct={addRecentlyViewed}
              slidesToShowCount={4}
            />
          </div>
        )}
      </div>
      {/* 🌟 Render Mobile Modals */}
      <MobileFilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
        filterOptions={dynamicFilterOptions}
        selectedCategories={selectedCategories}
        onAvailabilityChange={handleFilterChange(setSelectedAvailability)}
        selectedAvailability={selectedAvailability}
        selectedFormats={selectedFormats}
        onFormatChange={handleFilterChange(setSelectedFormats)}
        selectedRatings={selectedRatings}
        onRatingChange={handleFilterChange(setSelectedRatings)}
        onCategoryChange={handleFilterChange(setSelectedCategories)}
        onClearAll={handleClearAllFilters}
      />
      <MobileSortModal
        isOpen={isMobileSortOpen}
        onClose={() => setIsMobileSortOpen(false)}
        selectedSort={selectedSort}
        onSortChange={setSelectedSort}
      />
    </>
  );
};

export default BookstorePage;
