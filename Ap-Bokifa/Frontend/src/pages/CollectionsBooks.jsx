import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom"; // <--- ADDED: Must be imported to read the URL

// --- Original External Imports ---
import ProductCard from "../components/product/ProductCard";
import ProductCarousel from "../components/product/ProductCorousel";
import CategoryBanner from "../components/CategoryBanner";

// Importing data and hooks
import ALL_PRODUCTS from "../components/productsData";
import useRecentlyViewed from "../hooks/useRecentlyViwed";

// =================================================================
// 1. COMPONENTS WRITTEN FROM BOOKSTORE PAGE LOGIC
//    (Including RatingStars, CheckboxFilter, Mobile* modals, and the Grid)
// =================================================================

// Utility for displaying star ratings (Needed by ProductCard)
const RatingStars = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    const renderStar = (type, index) => {
        const starClass = "w-4 h-4";
        const color =
            type === "full"
                ? "text-yellow-400"
                : type === "half"
                ? "text-yellow-400"
                : "text-gray-300";
        return (
            <svg
                key={index}
                className={`${starClass} ${color} fill-current`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
            >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.487 7.71l6.561-.955L10 1l2.952 5.755 6.56.955-4.758 4.835 1.122 6.545z" />
                {type === "half" && (
                    <defs>
                        <linearGradient
                            id="half-star-gradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                        >
                            <stop
                                offset="50%"
                                style={{ stopColor: "#facc15" }}
                            />
                            <stop
                                offset="50%"
                                style={{ stopColor: "#d1d5db" }}
                            />
                        </linearGradient>
                    </defs>
                )}
                {type === "half" && (
                    <path
                        fill="url(#half-star-gradient)"
                        d="M10 15l-5.878 3.09 1.123-6.545L.487 7.71l6.561-.955L10 1l2.952 5.755 6.56.955-4.758 4.835 1.122 6.545z"
                    />
                )}
            </svg>
        );
    };

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, i) => renderStar("full", `f-${i}`))}
            {hasHalfStar && renderStar("half", "h-0")}
            {[...Array(emptyStars)].map((_, i) =>
                renderStar("empty", `e-${i}`)
            )}
            <span className="ml-1 text-sm text-gray-500">
                ({rating.toFixed(1)})
            </span>
        </div>
    );
};

// Checkbox Filter (Based on CheckboxFilter.jsx)
const CheckboxFilter = ({ title, filters, selected, onChange }) => {
    const id = title.toLowerCase().replace(/\s/g, "-");

    return (
        <div className="border-b border-gray-200 py-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {title}
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                {filters.map((filter) => (
                    <div key={filter.name} className="flex items-center">
                        <input
                            id={`${id}-${filter.name}`}
                            name={id}
                            value={filter.name}
                            type="checkbox"
                            checked={selected.includes(filter.name)}
                            onChange={onChange}
                            disabled={
                                filter.count === 0 &&
                                !selected.includes(filter.name)
                            }
                            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        />
                        <label
                            htmlFor={`${id}-${filter.name}`}
                            className={`ml-3 text-sm flex-1 ${
                                filter.count === 0 &&
                                !selected.includes(filter.name)
                                    ? "text-gray-400"
                                    : "text-gray-700"
                            }`}
                        >
                            {filter.name}
                            <span className="text-gray-500 ml-1">
                                ({filter.count})
                            </span>
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Mobile Sort Modal (Based on MobileSortModal.jsx)
const MobileSortModal = ({ isOpen, onClose, selectedSort, onSortChange }) => {
    const SORT_OPTIONS = [
        { value: "title-asc", label: "Title, A-Z" },
        { value: "title-desc", label: "Title, Z-A" },
        { value: "price-asc", label: "Price, Low to High" },
        { value: "price-desc", label: "Price, High to Low" },
        { value: "date-asc", label: "Date Added, Oldest" },
        { value: "date-desc", label: "Date Added, Newest" },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 overflow-y-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <motion.div
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                            aria-hidden="true"
                            onClick={onClose}
                        />

                        <motion.div
                            className="relative w-full bg-white rounded-t-2xl shadow-xl transform transition-all 
                                       sm:static sm:max-w-lg sm:w-full sm:mx-auto sm:rounded-xl sm:my-8"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="p-4 sm:p-6">
                                <div className="flex justify-between items-center mb-4 border-b pb-2">
                                    <h3 className="text-lg font-bold text-gray-900">
                                        Sort By
                                    </h3>
                                    <button
                                        onClick={onClose}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="sr-only">
                                            Close menu
                                        </span>
                                        <svg
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {SORT_OPTIONS.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                onSortChange(option.value);
                                                onClose();
                                            }}
                                            className={`w-full text-left p-3 rounded-lg transition ${
                                                selectedSort === option.value
                                                    ? "bg-indigo-50 text-indigo-700 font-semibold"
                                                    : "bg-white text-gray-700 hover:bg-gray-50"
                                            }`}
                                        >
                                            {option.label}
                                            {selectedSort === option.value && (
                                                <svg
                                                    className="h-5 w-5 float-right text-indigo-600"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Mobile Filter Sidebar (Based on MobileFilterSidebar.jsx)
const MobileFilterSidebar = ({
    isOpen,
    onClose,
    filterOptions,
    selectedCategories,
    selectedAvailability,
    onAvailabilityChange,
    selectedFormats,
    onFormatChange,
    selectedRatings,
    onRatingChange,
    onCategoryChange,
    onClearAll,
}) => {
    const {
        mainCategoryFilters,
        formatFilters,
        availabilityFilters,
        ratingFilters,
    } = filterOptions;

    const handleClear = () => {
        onClearAll();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-40 flex">
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-25"
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    {/* Panel */}
                    <motion.div
                        className="relative mr-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl"
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-between px-4">
                            <h2 className="text-xl font-bold text-gray-900">
                                Filters
                            </h2>
                            <button
                                type="button"
                                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:text-gray-500"
                                onClick={onClose}
                            >
                                <span className="sr-only">Close panel</span>
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        {/* Filter sections */}
                        <div className="mt-4 border-t border-gray-200 px-4">
                            <button
                                onClick={handleClear}
                                className="w-full text-center py-2 mt-4 text-sm font-semibold text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                Clear All Filters
                            </button>

                            <CheckboxFilter
                                title="Category"
                                filters={mainCategoryFilters}
                                selected={selectedCategories}
                                onChange={onCategoryChange}
                            />

                            <CheckboxFilter
                                title="Format"
                                filters={formatFilters}
                                selected={selectedFormats}
                                onChange={onFormatChange}
                            />

                            <CheckboxFilter
                                title="Availability"
                                filters={availabilityFilters}
                                selected={selectedAvailability}
                                onChange={onAvailabilityChange}
                            />

                            <CheckboxFilter
                                title="Customer Rating"
                                filters={ratingFilters}
                                selected={selectedRatings}
                                onChange={onRatingChange}
                            />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// Simple Product Grid
const SimpleProductGrid = ({
    products,
    totalProducts,
    selectedSort,
    onSortChange,
    onViewProduct,
    onOpenFilters,
}) => {
    // Sort options definition
    const SORT_OPTIONS = [
        { value: "title-asc", label: "Title, A-Z" },
        { value: "title-desc", label: "Title, Z-A" },
        { value: "price-asc", label: "Price, Low to High" },
        { value: "price-desc", label: "Price, High to Low" },
        { value: "date-asc", label: "Date Added, Oldest" },
        { value: "date-desc", label: "Date Added, Newest" },
    ];

    return (
        <div className="lg:py-8 w-full">
            {/* Header with Sort Control, Filter Button, and Product Count */}
            <div className="flex justify-between items-center mb-6 px-4 lg:px-0">
                {/* Left Side: Filter Button & Product Count */}
                <div className="flex items-center space-x-4">
                    {/* Filter Button (Desktop) */}
                    <button
                        onClick={onOpenFilters}
                        className="hidden lg:flex items-center text-sm font-bold text-gray-900 px-4 py-2    bg-white cursor-pointer "
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

                    <p className="text-sm font-medium text-gray-700">
                        {totalProducts} products
                    </p>
                </div>

                {/* Right Side: Sort Control */}
                <div className="flex items-center space-x-4">
                    {/* Desktop Sort Dropdown */}
                    <div className="relative hidden lg:block">
                        <label
                            htmlFor="sort-select"
                            className="text-sm font-medium text-gray-700 mr-2"
                        >
                            Sort by:
                        </label>
                        <select
                            id="sort-select"
                            value={selectedSort}
                            onChange={(e) => onSortChange(e.target.value)}
                            className="inline-block py-2 pl-3 pr-10 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-700"
                        >
                            {SORT_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Product Grid - Full Width, 4 products in a row on large screens */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 xl:gap-x-8 px-4 lg:px-0">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onViewProduct={onViewProduct}
                    />
                ))}
            </div>
        </div>
    );
};

// =================================================================
// 2. MAIN PAGE COMPONENT (CollectionsBooks.jsx)
// =================================================================

const CollectionsBooks = () => {
    const MOCK_PRODUCTS = ALL_PRODUCTS || [];

    // --- URL LOGIC (CRUCIAL FIX) ---
    const location = useLocation();
    // Decode the category name from the URL, e.g., 'Action%20Books' -> 'Action Books'
    const urlParams = new URLSearchParams(location.search);
    const initialCategory = urlParams.get("category");
    // --- END URL LOGIC ---

    const { viewedItems, addRecentlyViewed } = useRecentlyViewed();
    const recentlyViewedIds = viewedItems.map((item) => item.id);

    // --- STATE MANAGEMENT ---
    // 🛠️ MODIFIED: Initialize state using the category from the URL
    const [selectedCategories, setSelectedCategories] = useState(
        initialCategory ? [initialCategory] : []
    );
    const [selectedFormats, setSelectedFormats] = useState([]);
    const [selectedAvailability, setSelectedAvailability] = useState([]);
    const [selectedRatings, setSelectedRatings] = useState([]);
    const [selectedSort, setSelectedSort] = useState("title-asc");

    const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
    const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);

    // Sort options definition (omitted for brevity)

    // Find the label for the currently selected sort option
    const selectedSortLabel = useMemo(() => {
        const SORT_OPTIONS = [
            { value: "title-asc", label: "Title, A-Z" },
            { value: "title-desc", label: "Title, Z-A" },
            { value: "price-asc", label: "Price, Low to High" },
            { value: "price-desc", label: "Price, High to Low" },
            { value: "date-asc", label: "Date Added, Oldest" },
            { value: "date-desc", label: "Date Added, Newest" },
        ];
        const activeOption = SORT_OPTIONS.find(
            (option) => option.value === selectedSort
        );
        return activeOption ? activeOption.label : "Sort by";
    }, [selectedSort]);

    // Function to calculate all filter options and COUNTS (omitted for brevity)
    const getFilterData = useCallback((products, allProducts) => {
        const counts = {
            category: {},
            format: {},
            availability: { "In stock": 0, "Out of stock": 0 },
            rating: {
                "4 Star & Up": 0,
                "3 Star & Up": 0,
                "2 Star & Up": 0,
                "1 Star & Up": 0,
            },
        };
        allProducts.forEach((product) => {
            counts.category[product.category] =
                (counts.category[product.category] || 0) + 1;
            counts.format[product.format] =
                (counts.format[product.format] || 0) + 1;
            const statusKey = product.isSoldOut ? "Out of stock" : "In stock";
            counts.availability[statusKey] =
                (counts.availability[statusKey] || 0) + 1;
            if (Math.floor(product.rating) >= 4)
                counts.rating["4 Star & Up"] += 1;
            if (Math.floor(product.rating) >= 3)
                counts.rating["3 Star & Up"] += 1;
            if (Math.floor(product.rating) >= 2)
                counts.rating["2 Star & Up"] += 1;
            if (Math.floor(product.rating) >= 1)
                counts.rating["1 Star & Up"] += 1;
        });

        const uniqueCategories = [
            ...new Set(allProducts.map((p) => p.category)),
        ].sort();
        const mainCategoryFilters = uniqueCategories.map((name) => ({
            name,
            count: counts.category[name] || 0,
        }));
        const uniqueFormats = [
            ...new Set(allProducts.map((p) => p.format)),
        ].sort();
        const formatFilters = uniqueFormats.map((name) => ({
            name,
            count: counts.format[name] || 0,
        }));
        const availabilityFilters = [
            { name: "In stock", count: counts.availability["In stock"] || 0 },
            {
                name: "Out of stock",
                count: counts.availability["Out of stock"] || 0,
            },
        ];
        const ratingFilters = [
            { name: "4 Star & Up", count: counts.rating["4 Star & Up"] || 0 },
            { name: "3 Star & Up", count: counts.rating["3 Star & Up"] || 0 },
            { name: "2 Star & Up", count: counts.rating["2 Star & Up"] || 0 },
            { name: "1 Star & Up", count: counts.rating["1 Star & Up"] || 0 },
        ];

        return {
            mainCategoryFilters,
            formatFilters,
            availabilityFilters,
            ratingFilters,
        };
    }, []);

    // Combined Filtering and Sorting Logic
    const sortedAndFilteredProducts = useMemo(() => {
        let list = MOCK_PRODUCTS.filter((product) => {
            if (
                selectedCategories.length > 0 &&
                !selectedCategories.includes(product.category)
            )
                return false;
            if (
                selectedFormats.length > 0 &&
                !selectedFormats.includes(product.format)
            )
                return false;
            if (selectedAvailability.length > 0) {
                const isInStock = !product.isSoldOut;
                const matchesInStock =
                    selectedAvailability.includes("In stock") && isInStock;
                const matchesOutOfStock =
                    selectedAvailability.includes("Out of stock") && !isInStock;
                if (!matchesInStock && !matchesOutOfStock) return false;
            }
            if (selectedRatings.length > 0) {
                const minRating = selectedRatings.reduce((min, current) => {
                    const currentStar = parseInt(current.charAt(0));
                    return Math.max(min, currentStar);
                }, 0);
                if (Math.floor(product.rating) < minRating) return false;
            }
            return true;
        });

        const sortedList = [...list];
        // Sorting logic (omitted for brevity)
        switch (selectedSort) {
            case "title-asc":
                sortedList.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "title-desc":
                sortedList.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "price-asc":
                sortedList.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                sortedList.sort((a, b) => b.price - a.price);
                break;
            case "date-asc":
                sortedList.sort(
                    (a, b) => new Date(a.dateAdded) - new Date(b.dateAdded)
                );
                break;
            case "date-desc":
                sortedList.sort(
                    (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
                );
                break;
            default:
                break;
        }
        return sortedList;
    }, [
        selectedCategories,
        selectedFormats,
        selectedAvailability,
        selectedRatings,
        selectedSort,
        MOCK_PRODUCTS,
    ]);

    // Dynamic Filter Options
    const dynamicFilterOptions = useMemo(
        () => getFilterData(sortedAndFilteredProducts, MOCK_PRODUCTS),
        [sortedAndFilteredProducts, getFilterData, MOCK_PRODUCTS]
    );

    // Generic change handler for all checkbox filters
    const handleFilterChange = (setter) => (event) => {
        const { value, checked } = event.target;
        setter((prev) =>
            checked ? [...prev, value] : prev.filter((v) => v !== value)
        );
    };

    // Handler to clear all filters
    const handleClearAllFilters = () => {
        setSelectedCategories([]);
        setSelectedFormats([]);
        setSelectedAvailability([]);
        setSelectedRatings([]);
    };

    // Dynamic Category Banner Title Logic
    const defaultCategoryTitle = "Books";
    const categoryDesc =
        "Discover your favorite book: you will find a wide range of selected books from bestseller to newcomer, children's book to crime novel or thriller to science fiction novel.";
    const activeCategoryTitle = useMemo(() => {
        if (selectedCategories.length === 1) return selectedCategories[0];
        return defaultCategoryTitle;
    }, [selectedCategories]);

    return (
        <>
            {/* Mobile Filter/Sort Bar - Always shown (omitted for brevity) */}
            <div className="lg:hidden bg-white z-30 py-3 border-b border-gray-200 px-4">
                <div className="grid grid-cols-2 gap-4">
                    {/* Filter button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsFilterSidebarOpen(true);
                        }}
                        className="flex items-center justify-center text-base font-bold text-gray-900 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-sm"
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
                    {/* Sort button */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMobileSortOpen(true);
                        }}
                        className="flex items-center justify-center text-base font-bold text-gray-900 p-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-sm"
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
                        {selectedSortLabel}
                    </button>
                </div>
            </div>

            <CategoryBanner
                categoryName={activeCategoryTitle}
                description={categoryDesc}
            />

            <div className="bg-white">
                <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col">
                        {/* --- PRODUCT GRID (Full Width) --- */}
                        <SimpleProductGrid
                            products={sortedAndFilteredProducts}
                            totalProducts={sortedAndFilteredProducts.length}
                            selectedSort={selectedSort}
                            onSortChange={setSelectedSort}
                            onViewProduct={addRecentlyViewed}
                            onOpenFilters={() => setIsFilterSidebarOpen(true)}
                        />
                    </div>
                </div>

                {/* Recently Viewed Products (omitted for brevity) */}
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

            {/* Render MobileFilterSidebar (omitted for brevity) */}
            <MobileFilterSidebar
                isOpen={isFilterSidebarOpen}
                onClose={() => setIsFilterSidebarOpen(false)}
                filterOptions={dynamicFilterOptions}
                selectedCategories={selectedCategories}
                onAvailabilityChange={handleFilterChange(
                    setSelectedAvailability
                )}
                selectedAvailability={selectedAvailability}
                selectedFormats={selectedFormats}
                onFormatChange={handleFilterChange(setSelectedFormats)}
                selectedRatings={selectedRatings}
                onRatingChange={handleFilterChange(setSelectedRatings)}
                onCategoryChange={handleFilterChange(setSelectedCategories)}
                onClearAll={handleClearAllFilters}
            />
            {/* Render MobileSortModal (omitted for brevity) */}
            <MobileSortModal
                isOpen={isMobileSortOpen}
                onClose={() => setIsMobileSortOpen(false)}
                selectedSort={selectedSort}
                onSortChange={setSelectedSort}
            />
        </>
    );
};

export default CollectionsBooks;
