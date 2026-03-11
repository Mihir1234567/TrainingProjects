import React, { useState, useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Star,
  Heart,
  Minus,
  Plus,
  ArrowUpRight,
  Maximize2,
  Truck,
  Eye,
  X,
  Move,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { productsData } from "../data/products";

const ProductBottomThumbnails = () => {
  const { id } = useParams();
  const [isScrolled, setIsScrolled] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("descriptions");
  const [reviewRating, setReviewRating] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const [slideIndex, setSlideIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Swipe logic state
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Reset on product change
  useEffect(() => {
    setIsTransitioning(false);
    setSlideIndex(1);
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setIsTransitioning(true)));
    return () => cancelAnimationFrame(raf);
  }, [id]);

  // Responsive items to show for the carousel
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Find the product by ID
  const product = productsData.find((p) => p.id === parseInt(id));

  // Generate thumbnails
  const thumbnailImages = useMemo(() => {
    if (!product) return [];
    return [
      product.image,
      ...productsData.filter(p => p.id !== product.id).slice(0, 3).map(p => p.image)
    ];
  }, [product]);

  const carouselImages = useMemo(() => {
    if (!thumbnailImages.length) return [];
    return [
      thumbnailImages[thumbnailImages.length - 1],
      ...thumbnailImages,
      thumbnailImages[0]
    ];
  }, [thumbnailImages]);

  const currentActualIndex = slideIndex === 0 ? thumbnailImages.length - 1 : slideIndex === thumbnailImages.length + 1 ? 0 : slideIndex - 1;
  const currentImage = thumbnailImages[currentActualIndex] || product?.image;

  // Infinite carousel logic
  useEffect(() => {
    if (slideIndex === 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setSlideIndex(thumbnailImages.length);
      }, 500);
      return () => clearTimeout(timer);
    }
    if (slideIndex === thumbnailImages.length + 1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setSlideIndex(1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [slideIndex, thumbnailImages.length]);

  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => setIsTransitioning(true));
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitioning]);

  // Swipe handlers
  const handleDragStart = (e) => {
    setTouchStartX(e.targetTouches ? e.targetTouches[0].clientX : e.clientX);
    setTouchEndX(0);
    setIsDragging(true);
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    setTouchEndX(e.targetTouches ? e.targetTouches[0].clientX : e.clientX);
  };

  const handleDragEnd = () => {
    if (!isDragging || touchEndX === 0) {
      setIsDragging(false);
      return;
    }

    const distance = touchStartX - touchEndX;

    // Swiped left
    if (distance > 50 && slideIndex < carouselImages.length - 1) {
      setIsTransitioning(true);
      setSlideIndex((prev) => prev + 1);
    } 
    // Swiped right
    else if (distance < -50 && slideIndex > 0) {
      setIsTransitioning(true);
      setSlideIndex((prev) => prev - 1);
    }

    setIsDragging(false);
    setTouchEndX(0);
  };

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

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-white">
        <TopBar />
        <div className="relative">
          <Navbar isSticky={false} />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-lg">Product not found.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate a random viewer count once per product load
  const viewerCount = useMemo(
    () => Math.floor(Math.random() * 15) + 5,
    [product.id],
  );

  // Generate estimated delivery date (7 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const formattedDelivery = deliveryDate.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

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
          Product Bottom Thumbnails
        </h1>
        <div className="flex items-center justify-center gap-1.5 text-[14px] text-gray-500 font-medium">
          <Link to="/" className="hover:text-[#C59B87] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link
            to="/shopDefault"
            className="hover:text-[#C59B87] transition-colors"
          >
            Shop
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#C59B87]">Product Bottom Thumbnails</span>
        </div>
      </div>

      {/* Product Content */}
      <main className="container mx-auto px-4 max-w-7xl py-8 md:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Product Image */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <div 
              className="relative w-full bg-[#F7F6F5] aspect-square flex items-center justify-center p-6 md:p-10 group overflow-hidden cursor-grab active:cursor-grabbing"
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
            >
              <div 
                className={`w-full h-full flex ${isTransitioning ? 'transition-transform duration-500 ease-in-out' : ''}`} 
                style={{ transform: `translateX(-${slideIndex * 100}%)` }}
              >
                {carouselImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} ${idx}`}
                    className="w-full h-full object-contain mix-blend-multiply shrink-0"
                  />
                ))}
              </div>

              {/* Previous Image Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (slideIndex <= 0) return;
                  setIsTransitioning(true);
                  setSlideIndex(prev => prev - 1);
                }}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 md:bg-white rounded-full flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 border border-[#D8A790]/60 text-[#C59B87] hover:bg-[#C59B87] hover:text-white hover:border-[#C59B87] z-10"
              >
                <ArrowLeft size={18} strokeWidth={1} />
              </button>

              {/* Next Image Arrow */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (slideIndex >= carouselImages.length - 1) return;
                  setIsTransitioning(true);
                  setSlideIndex(prev => prev + 1);
                }}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 md:bg-white rounded-full flex items-center justify-center md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 border border-[#D8A790]/60 text-[#C59B87] hover:bg-[#C59B87] hover:text-white hover:border-[#C59B87] z-10"
              >
                <ArrowRight size={18} strokeWidth={1} />
              </button>

              {/* Expand Icon */}
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="absolute top-5 right-5 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:bg-[#C59B87] hover:text-white text-gray-600 transition-colors"
              >
                <Maximize2 size={16} strokeWidth={1.5} />
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex flex-row gap-3 md:gap-4 w-full overflow-x-auto snap-x scrollbar-hide pb-2 md:pb-0">
              {thumbnailImages.map((img, idx) => (
                <div key={idx} onClick={() => { setIsTransitioning(true); setSlideIndex(idx + 1); }} className={`flex-1 min-w-[80px] aspect-square shrink-0 snap-start bg-[#F7F6F5] flex items-center justify-center p-2 cursor-pointer transition-all ${currentActualIndex === idx ? 'border border-[#C59B87]' : 'border border-transparent hover:border-gray-200'}`}>
                  <img src={img} alt={`${product.name} thumbnail ${idx}`} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2">
            {/* In Stock Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className={`w-2.5 h-2.5 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-400"}`}
              ></span>
              <span
                className={`text-[13px] font-medium ${product.inStock ? "text-green-600" : "text-red-500"}`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Product Name */}
            <h2 className="font-serif text-[32px] md:text-[38px] text-[#222222] mb-3 leading-tight">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={`${i < product.rating ? "fill-[#C59B87] text-[#C59B87]" : "fill-gray-200 text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-[13px] text-gray-500">
                {product.rating}.0 (
                {String(product.reviewsCount).padStart(2, "0")} Customer
                Reviews)
              </span>
            </div>

            {/* Price */}
            <p className="text-[#C59B87] text-[22px] font-medium mb-5">
              {product.price}
            </p>

            {/* Description */}
            <p className="text-gray-600 text-[15px] leading-[1.8] mb-5 max-w-xl">
              Pellentesque in ipsum id orci porta dapibus. Quisque velit nisi,
              pretium ut lacin in, elementum id enim. Curabitur arcu erat,
              accumsan id imperdiet et, porttior at sem.{" "}
              <span className="text-[#C59B87]">
                Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
              </span>
            </p>

            {/* Viewing Count */}
            <p className="text-[14px] text-gray-600 mb-6">
              <span className="font-bold text-[#222222]">
                {viewerCount} people
              </span>{" "}
              are currently viewing this item.
            </p>

            {/* Quantity + Add to Cart + Wishlist */}
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              {/* Quantity */}
              <div className="flex items-center">
                <span className="text-[14px] font-semibold text-[#222222] mr-3">
                  Quantity:
                </span>
                <div className="flex items-center border border-gray-200">
                  <button
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#C59B87] transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 h-10 flex items-center justify-center text-[14px] font-medium text-[#222222] border-x border-gray-200">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-[#C59B87] transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button className="group relative overflow-hidden bg-[#C59B87] text-white text-[14px] font-medium px-8 py-3 w-[180px] h-[45px] flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors">
                {/* Hover Background overlay */}
                <div className="absolute inset-0 bg-[#222222] opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-500 ease-in-out origin-center"></div>

                <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-500">
                  Add to Cart
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.5}
                    className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </button>

              {/* Add to Wishlist */}
              <button className="flex items-center gap-2 text-[14px] text-gray-600 hover:text-[#C59B87] transition-colors">
                <Heart size={16} strokeWidth={1.5} />
                Add To Wishlist
              </button>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100 pt-5 space-y-3">
              {/* Tags */}
              <div className="flex items-start gap-2 text-[14px]">
                <span className="font-semibold text-[#222222] shrink-0">
                  Tags:
                </span>
                <span className="text-gray-500 capitalize">
                  {product.tags
                    .map((tag) => tag.charAt(0).toUpperCase() + tag.slice(1))
                    .join(", ")}
                </span>
              </div>

              {/* SKU */}
              <div className="flex items-center gap-2 text-[14px]">
                <span className="font-semibold text-[#222222]">SKU:</span>
                <span className="text-gray-500">{product.sku}</span>
              </div>

              {/* Categories */}
              <div className="flex items-center gap-2 text-[14px]">
                <span className="font-semibold text-[#222222]">
                  Categories:
                </span>
                <span className="text-[#C59B87]">
                  {product.categories.join(", ")}
                </span>
              </div>

              {/* Share */}
              <div className="flex items-center gap-3 text-[14px]">
                <span className="font-semibold text-[#222222]">Share:</span>
                <div className="flex items-center gap-2.5">
                  <a
                    href="#"
                    className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#C59B87] hover:text-white transition-colors text-[12px]"
                  >
                    f
                  </a>
                  <a
                    href="#"
                    className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#C59B87] hover:text-white transition-colors"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#C59B87] hover:text-white transition-colors"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#C59B87] hover:text-white transition-colors"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Estimated Delivery */}
              <div className="flex items-center gap-2 text-[14px]">
                <span className="font-semibold text-[#222222]">
                  Estimated delivery:
                </span>
                <span className="text-gray-500">{formattedDelivery}</span>
              </div>

              {/* Free Shipping */}
              <div className="flex items-start gap-2 text-[14px]">
                <span className="font-semibold text-[#222222] shrink-0">
                  Free shipping:
                </span>
                <span className="text-[#C59B87]">
                  Free express shipping on orders over $150.00
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Tabs Section */}
      <section className="container mx-auto px-4 max-w-7xl pb-20">
        {/* Tab Headers */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8 md:mb-10">
          {[
            { key: "descriptions", label: "Descriptions" },
            { key: "additional", label: "Additional Information" },
            { key: "reviews", label: "Reviews" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 md:px-6 py-2 md:py-2.5 text-[13px] md:text-[14px] font-medium border transition-colors ${
                activeTab === tab.key
                  ? "bg-[#C59B87] text-white border-[#C59B87]"
                  : "bg-white text-gray-600 border-gray-200 hover:text-[#C59B87]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          className="border-t border-gray-100 pt-6 md:pt-10"
          key={activeTab}
          style={{ animation: "fadeInUp 0.4s ease-out" }}
        >
          {/* Descriptions Tab */}
          {activeTab === "descriptions" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <p className="text-gray-600 text-[14px] leading-[1.9]">
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia Curae; Donec velit neque, auctor sit amet
                aliquam vel, ullamcorper sit amet ligula. Proin eget tortor
                risus. Curabitur aliquet quam id dui posuere blandit. Quisque
                velit nisi, pretium ut lacinia in, elementum id enim. Praesent
                sapien massa, convallis a pellentesque nec, egestas non nisi.
                Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
                dui.
              </p>
              <p className="text-gray-600 text-[14px] leading-[1.9]">
                Vivamus suscipit tortor eget felis porttitor volutpat. Donec
                rutrum congue leo eget malesuada. Sed porttitor lectus nibh.
                Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
                Nulla porttitor accumsan tincidunt. Donec sollicitudin molestie
                malesuada. Mauris blandit aliquet elit, eget tincidunt nibh
                pulvinar a. Quisque velit nisi, pretium ut lacinia in, elementum
                id enim. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit. Curabitur arcu erat, accumsan id imperdiet et, porttitor
                at sem. Vestibulum ante ipsum primis in faucibus orci luctus et
                ultrices posuere cubilia Curae; Donec velit neque, auctor sit
                amet aliquam vel, ullamcorper sit amet ligula. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                Curae; Donec velit neque, auctor sit amet aliquam vel,
                ullamcorper sit amet ligula. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </p>
            </div>
          )}

          {/* Additional Information Tab */}
          {activeTab === "additional" && (
            <div className="max-w-6xl mx-auto">
              <p className="text-gray-600 text-[14px] leading-[1.9] mb-8">
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia Curae; Donec velit neque, auctor sit amet
                aliquam vel, ullamcorper sit amet ligula. Proin eget tortor
                risus. Curabitur aliquet quam id dui posuere blandit. Quisque
                velit nisi, pretium ut lacinia in, elementum id enim. Praesent
                sapien massa, convallis a pellentesque nec, egestas non nisi.
                Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.
                Vestibulum ac diam sit amet quam vehicula elementum sed sit amet
                dui.
              </p>
              {product.additionalInfo && (
                <div className="space-y-4">
                  {Object.entries(product.additionalInfo).map(
                    ([key, value]) => (
                      <div key={key} className="flex items-baseline gap-3">
                        <span className="text-[14px] font-bold text-[#222222] capitalize min-w-[100px]">
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </span>
                        <span className="text-[14px] text-gray-600">
                          {value}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
              {/* Existing Reviews */}
              <div className="flex-1">
                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-8">
                    {product.reviews.map((review, index) => (
                      <div key={index} className="flex gap-5">
                        <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden shrink-0">
                          <img
                            src={`https://i.pravatar.cc/80?img=${index + 10}`}
                            alt={review.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-0.5 mb-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={13}
                                className={`${
                                  i < review.rating
                                    ? "fill-[#C59B87] text-[#C59B87]"
                                    : "fill-gray-200 text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <h4 className="text-[15px] font-semibold text-[#222222] mb-0.5">
                            {review.author}
                          </h4>
                          <p className="text-[12px] text-[#C59B87] mb-1.5">
                            {review.date}
                          </p>
                          <p className="text-[14px] text-gray-600">
                            {review.title || review.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-[14px]">No reviews yet.</p>
                )}
              </div>

              {/* Write A Review Form */}
              <div className="flex-1">
                <h3 className="font-serif text-[32px] text-[#222222] mb-8">
                  Write A Review
                </h3>
                <form className="space-y-5">
                  <div>
                    <label className="block text-[14px] font-semibold text-[#222222] mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      placeholder="Beverly Gillies"
                      className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#C59B87] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-semibold text-[#222222] mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="gillies@torado.com"
                      className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#C59B87] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-semibold text-[#222222] mb-2">
                      Rating
                    </label>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`cursor-pointer transition-colors ${
                            i < reviewRating
                              ? "fill-[#C59B87] text-[#C59B87]"
                              : "fill-gray-200 text-gray-200 hover:fill-[#C59B87] hover:text-[#C59B87]"
                          }`}
                          onClick={() => setReviewRating(i + 1)}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[14px] font-semibold text-[#222222] mb-2">
                      Review Title
                    </label>
                    <input
                      type="text"
                      placeholder="Write your review title here..."
                      className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#C59B87] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-semibold text-[#222222] mb-2">
                      Write your review
                    </label>
                    <textarea
                      placeholder="Write your comment here..."
                      rows={5}
                      className="w-full border border-gray-200 px-4 py-3 text-[14px] text-gray-600 placeholder-gray-400 focus:outline-none focus:border-[#C59B87] transition-colors resize-none"
                    ></textarea>
                  </div>
                  <div className="relative inline-block group w-[180px] h-[45px] mt-2">
                    <div className="absolute top-1.5 left-1.5 w-full h-full border border-[#CB927A] transition-all duration-300 group-hover:top-0 group-hover:left-0 z-0"></div>
                    <button
                      type="submit"
                      className="relative z-10 w-full h-full bg-[#CB927A] text-white font-light tracking-wide flex items-center justify-center space-x-2 transition-all duration-300 group-hover:shadow-[0_15px_40px_rgba(203,146,122,.5)]"
                    >
                      <span className="text-[14px]">Submit Review</span>
                      <ArrowUpRight size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* You May Also Like Carousel */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-7xl relative">
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 tracking-tight text-center mb-16">
            You May Also Like
          </h2>

          {/* Navigation Arrows */}
          <button
            onClick={() =>
              setCarouselIndex((prev) =>
                prev === 0
                  ? productsData.filter((p) => p.id !== product.id).length - 1
                  : prev - 1,
              )
            }
            className="absolute left-[24px] md:left-[36px] top-[48%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-md text-[#D8A790] hover:bg-[#D8A790] hover:text-white transition-colors border border-[#F0EBE6] z-20"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
          </button>

          <button
            onClick={() =>
              setCarouselIndex((prev) =>
                prev ===
                productsData.filter((p) => p.id !== product.id).length - 1
                  ? 0
                  : prev + 1,
              )
            }
            className="absolute right-[24px] md:right-[36px] top-[48%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-md text-[#D8A790] hover:bg-[#D8A790] hover:text-white transition-colors border border-[#F0EBE6] z-20"
          >
            <ArrowRight size={16} strokeWidth={1.5} />
          </button>

          {/* Product Slider */}
          <div className="px-4 md:px-8">
            <div className="overflow-hidden p-1 -m-1">
              <div className="flex">
                {[
                  ...productsData.filter((p) => p.id !== product.id),
                  ...productsData.filter((p) => p.id !== product.id),
                ].map((item, index) => (
                  <Link
                    to={`/product/${item.id}`}
                    key={`${item.id}-${index}`}
                    className={`w-full flex flex-col group cursor-pointer transition-transform duration-500 ease-in-out px-3 flex-shrink-0`}
                    style={{
                      width: `${100 / itemsToShow}%`,
                      transform: `translateX(-${carouselIndex * 100}%)`,
                    }}
                  >
                    {/* Image Container */}
                    <div className="relative w-full aspect-square bg-[#F7F6F5] mb-5 overflow-hidden flex items-center justify-center p-6">
                      {/* Badge ribbon */}
                      {item.badge && (
                        <div className="absolute top-4 -left-10 w-[140px] bg-[#C59B87] text-white text-[12px] font-medium tracking-wide py-1 text-center -rotate-45 z-10">
                          {item.badge}
                        </div>
                      )}

                      {/* Hover Action Icons */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                        {[
                          { icon: Heart, delay: "delay-0" },
                          { icon: ShoppingBag, delay: "delay-75" },
                          { icon: Eye, delay: "delay-150" },
                        ].map((action, idx) => (
                          <button
                            key={idx}
                            onClick={(e) => e.preventDefault()}
                            className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-700 hover:bg-[#CB927A] hover:text-white transition-all duration-500 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 ${action.delay}`}
                          >
                            <action.icon size={18} strokeWidth={1.5} />
                          </button>
                        ))}
                      </div>

                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain mix-blend-multiply [clip-path:inset(4px_1px)] transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>

                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-2.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={`${
                            i < item.rating
                              ? "fill-[#C59B87] text-[#C59B87]"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Details */}
                    <h3 className="font-serif text-[17px] md:text-[18px] text-[#222222] mb-1.5 transition-colors group-hover:text-[#D8A790]">
                      {item.name}
                    </h3>
                    <p className="text-[#C59B87] text-[14px] font-medium">
                      {item.price}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Toolbar */}
          <div className="absolute top-4 right-4 flex items-center gap-2 z-[101]">
            <button className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center text-white transition-colors">
              <Move size={16} />
            </button>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded flex items-center justify-center text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
          <div
            className="bg-white max-w-2xl w-full max-h-[80vh] p-8 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage}
              alt={product.name}
              className="max-w-full max-h-[70vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductBottomThumbnails;
