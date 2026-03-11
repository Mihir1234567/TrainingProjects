import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  ShoppingBag,
  Eye,
  Star,
  ArrowLeftRight,
  List,
  LayoutGrid,
  Search,
  Minus,
  SlidersHorizontal,
  X,
} from "lucide-react";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { productsData } from "../data/products";

const ShopLeftSidebar = () => {
  // State
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Recommended");
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState(4); // 2, 3, 4 columns or 1 (list)
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const itemsPerPage = 12;

  // Scroll listener for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter Handlers
  const handleToggle = (setter, item) => {
    setter((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
    setCurrentPage(1); // Reset page on filter change
  };

  // Helper for Price Filtering
  const checkPrice = (priceStr, selectedRanges) => {
    if (selectedRanges.length === 0) return true;
    const price = parseFloat(priceStr.replace(/[^0-9.-]+/g, ""));
    return selectedRanges.some((range) => {
      if (range === "Under $100") return price < 100;
      if (range === "$101-$500") return price >= 101 && price <= 500;
      if (range === "$501-$1000") return price >= 501 && price <= 1000;
      if (range === "$1001-$3000") return price >= 1001 && price <= 3000;
      if (range === "$3001-$4000") return price >= 3001 && price <= 4000;
      if (range === "$4001-$5000") return price >= 4001 && price <= 5000;
      if (range === "Above $5000") return price > 5000;
      return true;
    });
  };

  // Sorting and Filtering Logic
  const sortedProducts = useMemo(() => {
    // 1. Filter
    let filtered = productsData.filter((product) => {
      // Search
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      // Category
      if (
        selectedCategories.length > 0 &&
        !product.categories.some((c) => selectedCategories.includes(c))
      )
        return false;
      // Availability
      if (selectedAvailability.length > 0) {
        const inStockMatch =
          selectedAvailability.includes("In Stock") && product.inStock;
        const outOfStockMatch =
          selectedAvailability.includes("Out of Stock") && !product.inStock;
        if (!inStockMatch && !outOfStockMatch) return false;
      }
      // Color
      if (selectedColors.length > 0 && !selectedColors.includes(product.color))
        return false;
      // Price
      if (!checkPrice(product.price, selectedPrices)) return false;

      return true;
    });

    // 2. Sort
    let sorted = [...filtered];
    switch (sortBy) {
      case "Price: High to Low":
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
          const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
          return priceB - priceA;
        });
        break;
      case "Price: Low to High":
        sorted.sort((a, b) => {
          const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
          const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
          return priceA - priceB;
        });
        break;
      case "Most Viewed":
      case "Recommended":
      case "Recently Added":
      default:
        // For these mock cases, we'll sort by ID or rating to simulate
        if (sortBy === "Recommended") {
          sorted.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === "Most Viewed") {
          sorted.sort((a, b) => b.reviewsCount - a.reviewsCount);
        } else {
          // Recently added (by ID descending)
          sorted.sort((a, b) => b.id - a.id);
        }
        break;
    }
    return sorted;
  }, [
    sortBy,
    searchQuery,
    selectedCategories,
    selectedPrices,
    selectedAvailability,
    selectedColors,
  ]);

  // Pagination Logic
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const renderProductCard = (product) => {
    // List View (Mode 1)
    if (viewMode === 1) {
      return (
        <div
          key={product.id}
          className="flex flex-col md:flex-row gap-8 group pb-8 border-b border-gray-100 last:border-0 cursor-pointer"
        >
          <div className="relative w-full md:w-[320px] h-[320px] bg-[#F7F6F5] overflow-hidden flex items-center justify-center p-6 shrink-0 group-hover:bg-[#f0efee] transition-colors">
            {product.badge && (
              <div className="absolute top-0 left-0 w-[84px] h-[84px] z-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[#C59B87] [clip-path:polygon(0_0,100%_0,0_100%)]"></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <span className="text-white text-[15px] font-medium tracking-wide -rotate-45 -translate-x-[12px] -translate-y-[12px] drop-shadow-sm">
                    {product.badge}
                  </span>
                </div>
              </div>
            )}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply [clip-path:inset(4px_1px)] transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center flex-1">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={`${i < product.rating ? "fill-[#C59B87] text-[#C59B87]" : "fill-gray-200 text-gray-200"}`}
                />
              ))}
            </div>
            <h3 className="font-serif text-[24px] text-[#222222] mb-1.5 transition-colors group-hover:text-[#D8A790]">
              {product.name}
            </h3>
            <p className="text-[#C59B87] text-[18px] font-medium mb-4">
              {product.price}
            </p>
            <p className="text-gray-600 text-[15px] leading-[1.8] mb-8 max-w-3xl">
              {product.description}
            </p>

            {/* Action Buttons for List View */}
            <div className="flex items-center w-fit border border-gray-100">
              <button className="flex items-center justify-center w-12 h-12 border-r border-gray-100 text-[#222222] hover:text-[#C59B87] transition-colors">
                <ShoppingBag size={18} strokeWidth={2} />
              </button>
              <button className="flex items-center justify-center w-12 h-12 border-r border-gray-100 text-[#222222] hover:text-[#C59B87] transition-colors">
                <Heart size={18} strokeWidth={2} />
              </button>
              <button className="flex items-center justify-center w-12 h-12 border-r border-gray-100 text-[#222222] hover:text-[#C59B87] transition-colors">
                <Eye size={18} strokeWidth={2} />
              </button>
              <button className="flex items-center justify-center w-12 h-12 text-[#222222] hover:text-[#C59B87] transition-colors">
                <ArrowLeftRight size={18} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Grid Views (Modes 2, 3, 4)
    return (
      <Link
        to={`/product/${product.id}`}
        key={product.id}
        className="flex flex-col group cursor-pointer"
      >
        <div
          className={`relative w-full ${viewMode === 2 ? "aspect-[4/3]" : "aspect-square"} bg-[#F7F6F5] mb-5 overflow-hidden flex items-center justify-center p-6 bg-[#FAF9F8] group-hover:bg-[#F2F1F0] transition-colors duration-300`}
        >
          {product.badge && (
            <div className="absolute top-0 left-0 w-[84px] h-[84px] z-10">
              <div className="absolute top-0 left-0 w-full h-full bg-[#C59B87] [clip-path:polygon(0_0,100%_0,0_100%)]"></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-white text-[15px] font-medium tracking-wide -rotate-45 -translate-x-[12px] -translate-y-[12px] drop-shadow-sm">
                  {product.badge}
                </span>
              </div>
            </div>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply [clip-path:inset(4px_1px)] transition-transform duration-700 group-hover:scale-105"
          />

          {/* Hover Action Overlay */}
          <div className="absolute top-1/2 -translate-y-1/2 right-4 flex flex-col items-center gap-2 z-20">
            <button className="bg-white hover:bg-[#C59B87] hover:text-white text-gray-800 w-[42px] h-[42px] rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.08)] opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out delay-0">
              <Heart size={16} strokeWidth={1.5} />
            </button>
            <button className="bg-white hover:bg-[#C59B87] hover:text-white text-gray-800 w-[42px] h-[42px] rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.08)] opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out delay-0 group-hover:delay-75">
              <ShoppingBag size={16} strokeWidth={1.5} />
            </button>
            <button className="bg-white hover:bg-[#C59B87] hover:text-white text-gray-800 w-[42px] h-[42px] rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.08)] opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-in-out delay-0 group-hover:delay-150">
              <Eye size={16} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-2.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={13}
              className={`${i < product.rating ? "fill-[#CB927A] text-[#CB927A]" : "fill-gray-200 text-gray-200"}`}
            />
          ))}
        </div>
        <h3 className="font-serif text-[18px] text-[#222222] mb-1.5 transition-colors group-hover:text-[#D8A790]">
          {product.name}
        </h3>
        <p className="text-[#C59B87] text-[15px] font-medium">
          {product.price}
        </p>
      </Link>
    );
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <TopBar />

      {/* Sticky Navbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transform transition-all ease-out ${
          isScrolled
            ? "translate-y-0 opacity-100 duration-1000"
            : "-translate-y-full opacity-0 duration-0"
        }`}
      >
        <Navbar isSticky={true} />
      </div>

      <div className="relative">
        {!isScrolled && <Navbar isSticky={false} />}
      </div>

      {/* Page Header */}
      <div className="bg-gradient-to-b from-[#F5F0EB] to-white pt-28 pb-14 md:pt-36 md:pb-20 text-center">
        <h1 className="font-serif text-3xl md:text-[42px] text-gray-900 mb-3 tracking-tight leading-tight">
          Shop Left Sidebar
        </h1>
        <div className="flex items-center justify-center gap-1.5 text-[14px] text-gray-500 font-medium">
          <Link to="/" className="hover:text-[#C59B87] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#C59B87]">Shop</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-7xl py-16 flex flex-col lg:flex-row gap-10">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:relative top-0 left-0 h-full lg:h-auto w-[300px] lg:w-[280px] shrink-0 flex flex-col gap-10 bg-white z-50 lg:z-auto p-6 lg:p-0 overflow-y-auto lg:overflow-visible transform transition-transform duration-300 ease-in-out lg:transform-none lg:sticky lg:self-start lg:transition-[top] lg:duration-300 ${isScrolled ? "lg:top-[80px]" : "lg:top-0"} ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          {/* Mobile Close Button */}
          <div className="flex items-center justify-between lg:hidden mb-2">
            <h2 className="font-serif text-[20px] text-[#222222]">Filters</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 text-gray-500 hover:text-gray-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#f9f9f9] border-none px-4 py-3 text-[13px] focus:outline-none placeholder-gray-400"
            />
            <Search
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800"
              size={16}
            />
          </div>

          {/* Product Categories */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-[18px] text-[#222222]">
                Product Categories
              </h3>
              <Minus size={14} className="text-gray-400" />
            </div>
            <div className="flex flex-col gap-3">
              {[
                "Rings",
                "Earrings",
                "Bracelets",
                "Necklaces",
                "Locket",
                "Bundle Set",
                "Accessories",
              ].map((cat) => {
                const isChecked = selectedCategories.includes(cat);
                return (
                  <label
                    key={cat}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isChecked}
                      onChange={() => handleToggle(setSelectedCategories, cat)}
                    />
                    <div
                      className={`w-3 h-3 border flex items-center justify-center ${isChecked ? "border-[#C59B87] bg-[#C59B87]" : "border-gray-300 bg-white group-hover:border-[#C59B87]"}`}
                    >
                      {isChecked && (
                        <div className="w-1.5 h-1.5 bg-white"></div>
                      )}
                    </div>
                    <span
                      className={`text-[13px] ${isChecked ? "text-[#C59B87]" : "text-gray-500 group-hover:text-[#C59B87] transition-colors"}`}
                    >
                      {cat}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Filter By Price */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-[18px] text-[#222222]">
                Filter By Price
              </h3>
              <Minus size={14} className="text-gray-400" />
            </div>
            <div className="flex flex-col gap-3">
              {[
                "Under $100",
                "$101-$500",
                "$501-$1000",
                "$1001-$3000",
                "$3001-$4000",
                "$4001-$5000",
                "Above $5000",
              ].map((price) => {
                const isChecked = selectedPrices.includes(price);
                return (
                  <label
                    key={price}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isChecked}
                      onChange={() => handleToggle(setSelectedPrices, price)}
                    />
                    <div
                      className={`w-3 h-3 border flex items-center justify-center ${isChecked ? "border-[#C59B87] bg-[#C59B87]" : "border-gray-300 bg-white group-hover:border-[#C59B87]"}`}
                    >
                      {isChecked && (
                        <div className="w-1.5 h-1.5 bg-white"></div>
                      )}
                    </div>
                    <span
                      className={`text-[13px] ${isChecked ? "text-[#C59B87]" : "text-gray-500 group-hover:text-[#C59B87] transition-colors"}`}
                    >
                      {price}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Availability */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-[18px] text-[#222222]">
                Availability
              </h3>
              <Minus size={14} className="text-gray-400" />
            </div>
            <div className="flex flex-col gap-3">
              {["In Stock", "Out of Stock"].map((item) => {
                const isChecked = selectedAvailability.includes(item);
                return (
                  <label
                    key={item}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isChecked}
                      onChange={() =>
                        handleToggle(setSelectedAvailability, item)
                      }
                    />
                    <div
                      className={`w-3 h-3 border flex items-center justify-center ${isChecked ? "border-[#C59B87] bg-[#C59B87]" : "border-gray-300 bg-white group-hover:border-[#C59B87]"}`}
                    >
                      {isChecked && (
                        <div className="w-1.5 h-1.5 bg-white"></div>
                      )}
                    </div>
                    <span
                      className={`text-[13px] ${isChecked ? "text-[#C59B87]" : "text-gray-500 group-hover:text-[#C59B87] transition-colors"}`}
                    >
                      {item}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Filter By Color */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-[18px] text-[#222222]">
                Filter By Color
              </h3>
              <Minus size={14} className="text-gray-400" />
            </div>
            <div className="flex flex-col gap-3">
              {[
                "Black",
                "Red",
                "Green",
                "Blue",
                "Yellow",
                "White",
                "Brown",
              ].map((color) => {
                const isChecked = selectedColors.includes(color);
                return (
                  <label
                    key={color}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isChecked}
                      onChange={() => handleToggle(setSelectedColors, color)}
                    />
                    <div
                      className={`w-3 h-3 border flex items-center justify-center ${isChecked ? "border-[#C59B87] bg-[#C59B87]" : "border-gray-300 bg-white group-hover:border-[#C59B87]"}`}
                    >
                      {isChecked && (
                        <div className="w-1.5 h-1.5 bg-white"></div>
                      )}
                    </div>
                    <span
                      className={`text-[13px] ${isChecked ? "text-[#C59B87]" : "text-gray-500 group-hover:text-[#C59B87] transition-colors"}`}
                    >
                      {color}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Best Selling Products */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-[18px] text-[#222222]">
                Best Selling Products
              </h3>
              <Minus size={14} className="text-gray-400" />
            </div>
            <div className="flex flex-col gap-6">
              {productsData.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 group cursor-pointer"
                >
                  <div className="w-20 h-20 bg-[#F7F6F5] flex items-center justify-center shrink-0 p-2 group-hover:bg-[#f0efee] transition-colors">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-serif text-[14px] text-[#222222] group-hover:text-[#C59B87] transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h4>
                    <p className="text-[#C59B87] text-[13px] font-medium">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[#222222] text-[13px] font-medium">
              Showing {startIndex + 1}-
              {Math.min(startIndex + itemsPerPage, sortedProducts.length)} of{" "}
              {sortedProducts.length} result
            </p>
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 text-[13px] text-gray-600 hover:border-[#C59B87] hover:text-[#C59B87] transition-colors"
            >
              <SlidersHorizontal size={14} />
              Filters
            </button>
          </div>

          {/* Toolbar */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6 border border-gray-100 bg-[#FAF9F8]">
            <div className="flex items-center w-full md:w-auto p-4 md:px-6 md:py-3 md:border-r border-gray-100 bg-white md:bg-transparent">
              <div className="flex items-center gap-4 bg-white border border-gray-200 px-3 py-2 shadow-sm rounded-sm shrink-0">
                <button
                  onClick={() => setViewMode(1)}
                  className={`p-1 transition-colors ${viewMode === 1 ? "text-[#C59B87]" : "text-gray-300 hover:text-gray-600"}`}
                >
                  <div className="flex flex-col gap-[2px]">
                    <div className="w-[14px] h-[2px] bg-current"></div>
                    <div className="w-[14px] h-[2px] bg-current"></div>
                    <div className="w-[14px] h-[2px] bg-current"></div>
                    <div className="w-[14px] h-[2px] bg-current"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode(2)}
                  className={`p-1 flex gap-[2px] transition-colors ${viewMode === 2 ? "text-[#C59B87]" : "text-gray-300 hover:text-gray-600"}`}
                >
                  <div className="w-[2px] h-[14px] bg-current"></div>
                  <div className="w-[2px] h-[14px] bg-current"></div>
                </button>
                <button
                  onClick={() => setViewMode(3)}
                  className={`p-1 hidden sm:flex gap-[2px] transition-colors ${viewMode === 3 ? "text-[#C59B87]" : "text-gray-300 hover:text-gray-600"}`}
                >
                  <div className="w-[2px] h-[14px] bg-current"></div>
                  <div className="w-[2px] h-[14px] bg-current"></div>
                  <div className="w-[2px] h-[14px] bg-current"></div>
                </button>
                <button
                  onClick={() => setViewMode(4)}
                  className={`p-1 hidden md:flex gap-[2px] transition-colors ${viewMode === 4 ? "text-[#C59B87]" : "text-gray-300 hover:text-gray-600"}`}
                >
                  <div className="w-[2px] h-[14px] bg-current"></div>
                  <div className="w-[2px] h-[14px] bg-current"></div>
                  <div className="w-[2px] h-[14px] bg-current"></div>
                  <div className="w-[2px] h-[14px] bg-current"></div>
                </button>
                <button
                  onClick={() => setViewMode(5)}
                  className={`p-1 hidden lg:flex gap-[2px] transition-colors ${viewMode === 5 ? "text-[#C59B87]" : "text-gray-300 hover:text-gray-600"}`}
                >
                  <div className="w-[2px] h-[14px] bg-current"></div>
                  <div className="w-[2px] h-[14px] bg-current"></div>
                  <div className="w-[2px] h-[14px] bg-current"></div>
                  <div className="w-[2px] h-[14px] bg-current"></div>
                  <div className="w-[2px] h-[14px] bg-current"></div>
                </button>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3 relative w-full md:w-auto justify-between md:justify-start px-4 md:px-6">
              <span className="text-gray-600 font-medium text-[13px]">
                Sort by
              </span>
              <div
                className="relative cursor-pointer min-w-[200px]"
                onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
              >
                <div className="flex items-center justify-between bg-white border border-gray-100 px-4 py-2 text-[13px] text-gray-700 hover:border-gray-200 transition-colors shadow-sm">
                  {sortBy}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${isSortDropdownOpen ? "rotate-180" : ""}`}
                  />
                </div>

                {isSortDropdownOpen && (
                  <div className="absolute top-[calc(100%+2px)] left-0 right-0 bg-white border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.12)] z-30 py-2">
                    {[
                      "Recommended",
                      "Price: High to Low",
                      "Price: Low to High",
                      "Most Viewed",
                      "Recently Added",
                    ].map((option) => (
                      <div
                        key={option}
                        className={`px-5 py-2 text-[13px] cursor-pointer hover:bg-blue-600 hover:text-white transition-colors ${sortBy === option ? "bg-blue-600 text-white font-medium" : "text-gray-600"}`}
                        onClick={() => setSortBy(option)}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dynamic Grid */}
          <div
            className={`grid gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 ${
              viewMode === 1
                ? "grid-cols-1"
                : viewMode === 2
                  ? "grid-cols-1 sm:grid-cols-2"
                  : viewMode === 3
                    ? "grid-cols-2 sm:grid-cols-3"
                    : viewMode === 4
                      ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                      : "grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            }`}
          >
            {currentProducts.map(renderProductCard)}
          </div>

          {/* Pagination Console */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-20">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-[#C59B87] hover:border-[#C59B87] hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 disabled:hover:border-gray-200"
              >
                <ChevronLeft size={16} />
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-medium transition-all ${
                    currentPage === i + 1
                      ? "bg-[#CB927A] text-white border border-[#CB927A]"
                      : "border border-gray-200 text-gray-700 hover:bg-[#C59B87] hover:border-[#C59B87] hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-[#C59B87] hover:border-[#C59B87] hover:text-white transition-all disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-gray-500 disabled:hover:border-gray-200"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default ShopLeftSidebar;
