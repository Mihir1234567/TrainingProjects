import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, Instagram, X, ChevronUp, Minus, Plus } from "lucide-react";
import Slider from "react-slick";
import ProductCard from "../components/product/ProductCard";
import ProductCarousel from "../components/product/ProductCorousel";
import ALL_PRODUCTS from "../components/productsData";
import { useCurrency } from "../context/CurrencyContext";
import QuickViewDrawer from "../components/QuickViewDrawer";
import { FORMAT_MULTIPLIERS } from "../constants";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// --- CURRENCY RATES ---
const CONVERSION_RATES = {
  "USD $": { rate: 1, symbol: "$" },
  "EUR €": { rate: 0.92, symbol: "€" },
  "GBP £": { rate: 0.79, symbol: "£" },
  "CAD C$": { rate: 1.37, symbol: "C$" },
  "AUD A$": { rate: 1.52, symbol: "A$" },
  "JPY ¥": { rate: 157.45, symbol: "¥" },
  "CNY ¥": { rate: 7.25, symbol: "¥" },
  "INR ₹": { rate: 83.55, symbol: "₹" },
  "BRL R$": { rate: 5.46, symbol: "R$" },
  "MXN $": { rate: 18.42, symbol: "$" },
};

// --- UTILS ---
const getFormattedPrice = (price, currency) => {
  const conversion = CONVERSION_RATES[currency];
  if (!conversion) return `$${price.toFixed(2)}`;
  const convertedPrice = price * conversion.rate;
  return `${conversion.symbol}${convertedPrice.toFixed(2)}`;
};

const normalizeFormatKey = (format) =>
  String(format)
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();

const getPriceDetails = (product, selectedFormat, currency) => {
  if (!product) return null;

  // Find the correct multiplier key
  const pickFormat =
    Object.keys(FORMAT_MULTIPLIERS).find((f) => f === selectedFormat) ||
    Object.keys(FORMAT_MULTIPLIERS).find(
      (f) => normalizeFormatKey(f) === normalizeFormatKey(selectedFormat)
    ) ||
    Object.keys(FORMAT_MULTIPLIERS)[0];

  // Get multiplier (e.g., 1.15 for Hardcover, 1.0 for Paperback)
  const multiplier = FORMAT_MULTIPLIERS[pickFormat] ?? 1;
  const base = Number(product.price ?? 0);

  // 1. Apply Multiplier
  const originalPrice = +(base * multiplier);

  // 2. Apply Discount
  const discountPct = Number(product.discount) || 0;
  const finalPrice = +(originalPrice * (1 - discountPct / 100));

  return {
    originalPrice,
    finalPrice,
    discountPct,
    formattedOriginalPrice: getFormattedPrice(originalPrice, currency),
    formattedFinalPrice: getFormattedPrice(finalPrice, currency),
    isDiscounted: discountPct > 0,
  };
};

const LookBook = () => {
  const [activeProduct, setActiveProduct] = useState(null);

  const navigate = useNavigate();
  const { currency } = useCurrency();

  const sliderRef = useRef(null);
  const sectionRef = useRef(null);
  const popupRef = useRef(null);
  const mobileSheetRef = useRef(null);
  const toggleBtnRef = useRef(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHotspotOpen, setIsHotspotOpen] = useState(false);

  // --- Product State ---
  // FIX: Changed default to "Paperback" (Multiplier 1.0) to match Product Card price
  const [selectedFormat, setSelectedFormat] = useState("Paperback");
  const [quantity, setQuantity] = useState(1);

  // --- Data Setup ---
  const hotspotProduct = ALL_PRODUCTS[19] || {};

  // Calculate Price dynamically based on selectedFormat
  const priceDetails = getPriceDetails(
    hotspotProduct,
    selectedFormat,
    currency
  );

  const services = [
    {
      id: 1,
      title: "Sea Transport Services",
      description:
        "When customers need, especially customers wishing to hire 'door to door'...",
      image: "/src/assets/LookBookImg3.jpg",
    },
    {
      id: 2,
      title: "Warehousing Services",
      description:
        "We offer complete warehouse services to take care of all your needs.",
      image: "/src/assets/LookBookImg1.jpg",
    },
  ];

  const sliderProducts = ALL_PRODUCTS.slice(0, 5);
  const highlightIds = ALL_PRODUCTS.slice(0, 5).map((p) => p.id);

  const instagramFeed = [
    { type: "info" },
    { type: "image", src: "/src/assets/AboutUsIgImg1.png" },
    { type: "image", src: "/src/assets/AboutUsIgImg2.png" },
    { type: "image", src: "/src/assets/AboutUsIgImg3.png" },
    { type: "image", src: "/src/assets/AboutUsIgImg4.png" },
  ];

  // --- Effects ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setIsHotspotOpen(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isHotspotOpen) {
        const clickedDesktop =
          popupRef.current && popupRef.current.contains(event.target);
        const clickedMobile =
          mobileSheetRef.current &&
          mobileSheetRef.current.contains(event.target);
        const clickedToggle =
          toggleBtnRef.current && toggleBtnRef.current.contains(event.target);

        if (!clickedDesktop && !clickedMobile && !clickedToggle) {
          setIsHotspotOpen(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isHotspotOpen]);

  // --- Slider Settings ---
  const featuredSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    appendDots: (dots) => (
      <div style={{ bottom: "-30px" }}>
        <ul className="m-0 p-0 flex justify-center gap-2"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
          i === currentSlide ? "bg-green-700 w-4" : "bg-gray-300"
        }`}
      ></div>
    ),
    beforeChange: (current, next) => setCurrentSlide(next),
  };

  const instaSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full font-sans bg-white relative">
      {/* 1. Hero */}
      <div className="relative w-full h-64 md:h-[400px] flex items-center justify-center overflow-hidden">
        <img
          src="/src/assets/BlogBanner.jpg"
          alt="Lookbook Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-10 flex flex-col items-center text-white">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-3 tracking-wide">
            Look Book
          </h1>
          <nav className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-gray-200">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Home size={12} className="mb-0.5" /> Home
            </Link>
            <span>/</span>
            <span>Look Book</span>
          </nav>
        </div>
      </div>

      {/* 2. Services */}
      <section className="py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-8xl mx-auto">
          <div className="text-center mb-12">
            <h4 className="text-sm font-bold text-gray-800 mb-2">
              Best Services
            </h4>
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">
              We provide safe & reliable cargo solutions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {services.map((service) => (
              <div
                key={service.id}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-full h-[300px] md:h-[350px] overflow-hidden mb-6">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-4xl font-serif text-gray-900 mb-3 font-normal">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm mb-8 max-w-md leading-relaxed">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-block bg-white text-black border border-gray-200 text-sm font-medium px-8 py-3 rounded-full hover:bg-[#008040] hover:text-white hover:border-[#008040] transition-all duration-300"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive Hotspot Layout */}
      <section
        ref={sectionRef}
        className="pb-20 px-6 pt-15 md:px-12 lg:pl-24 lg:pr-0"
      >
        <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-24 items-center">
          {/* Left: Image + Hotspot */}
          <div
            className={`lg:col-span-2 relative w-full h-[500px] md:h-[600px] group transition-all duration-1000 ease-out transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            }`}
          >
            <div className="absolute inset-0 w-full h-120 overflow-hidden rounded-lg">
              <img
                src="/src/assets/LookBookImg2.jpg"
                alt="Library Interior"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute top-[50%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 z-20">
              {/* --- DESKTOP POPUP --- */}
              {hotspotProduct.id && (
                <div
                  ref={popupRef}
                  className={`hidden md:block absolute right-full -top-100 -left-62 mr-4 w-48 bg-white rounded-2xl shadow-2xl 
                                    transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] origin-top-right 
                                    ${
                                      isHotspotOpen
                                        ? "opacity-100 scale-100 translate-x-0 translate-y-0"
                                        : "opacity-0 scale-0 translate-x-8 translate-y-4 pointer-events-none"
                                    }`}
                >
                  <div className="relative h-70 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-2xl">
                    <img
                      src={hotspotProduct.imageUrl}
                      alt={hotspotProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-left bg-white rounded-b-2xl">
                    <h3
                      className="font-serif text-lg text-black hover:text-[#005c35] leading-snug mb-1 line-clamp-2 cursor-pointer"
                      onClick={() => navigate(`/product/${hotspotProduct.id}`)}
                    >
                      {hotspotProduct.title}
                    </h3>

                    {/* Desktop Price (Using Calculated Values) */}
                    <div className="flex items-center gap-2 mb-2">
                      {priceDetails ? (
                        <p className="text-[#008040] font-bold text-xl">
                          {priceDetails.formattedFinalPrice}
                        </p>
                      ) : (
                        <p className="text-[#008040] font-bold text-xl">...</p>
                      )}
                    </div>

                    <button
                      onClick={() => setActiveProduct(hotspotProduct)}
                      className=" text-gray-400 underline hover:text-gray-600 transition-colors text-sm"
                    >
                      Quick view
                    </button>
                  </div>
                </div>
              )}

              {/* Hotspot Dot */}
              <button
                ref={toggleBtnRef}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHotspotOpen(!isHotspotOpen);
                }}
                className="relative -top-25 -left-10 group/dot cursor-pointer focus:outline-none"
              >
                <div className="w-4 h-4 bg-white rounded-full shadow-lg animate-pulse"></div>
                <div className="w-10 h-10 bg-white/30 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:bg-white/40 transition-colors"></div>
              </button>
            </div>
          </div>

          {/* Right: Carousel */}
          <div
            className={`w-full max-w-[300px] mx-auto lg:mx-0 transition-all duration-1000 delay-200 ease-out transform ${
              isVisible
                ? "translate-x-0 opacity-100"
                : "translate-x-20 opacity-0"
            }`}
          >
            <Slider ref={sliderRef} {...featuredSettings}>
              {sliderProducts.map((product) => (
                <div key={product.id} className="px-2 pb-10">
                  <ProductCard
                    product={product}
                    onQuickView={() => setActiveProduct(product)}
                    // Using default behavior of ProductCard which shows base price
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* 4. Our Products */}
      <section className="pb-20">
        <div className="text-center -mb-6 relative z-10 pt-10">
          <h4 className="text-3xl font-bold text-gray-800 mb-2">
            Our products
          </h4>
        </div>
        <ProductCarousel
          title="Welcome to our store"
          productIds={highlightIds}
          showBrowseButton={false}
          titleCenter={true}
          slidesToShowCount={4}
          titleSize="text-xl"
        />
      </section>

      {/* 5. Instagram */}
      <section className="pb-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-8xl mx-auto">
          <Slider {...instaSettings}>
            {instagramFeed.map((item, index) => (
              <div key={index} className="outline-none">
                {item.type === "info" ? (
                  <div className="bg-[#f9f4ee] h-[300px] rounded-xl flex flex-col items-center justify-center text-center p-6 border-r-4 border-white">
                    <p className="font-serif text-xl text-gray-900 mb-3 leading-snug">
                      Follow Along On <br /> Our Journey
                    </p>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col text-gray-900  items-center hover:text-green-700 transition-colors group"
                    >
                      <Instagram
                        size={28}
                        className="mb-2 text-gray-900 group-hover:text-green-700"
                      />
                      <p className="text-lg font-bold">@bokifa</p>
                    </a>
                  </div>
                ) : (
                  <div className="h-[300px] rounded-xl w-full overflow-hidden relative group cursor-pointer border-r-4 border-white">
                    <img
                      src={item.src}
                      alt="Instagram post"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 "
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                )}
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* MOBILE BOTTOM SHEET */}
      <div
        ref={mobileSheetRef}
        className={`md:hidden fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl shadow-[0_-5px_30px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] max-h-[90vh] overflow-y-auto ${
          isHotspotOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          onClick={() => setIsHotspotOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 z-10"
        >
          <X size={24} />
        </button>
        <div className="p-6 pb-8">
          <div className="flex gap-5 mb-6">
            <div className="w-28 h-40 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden shadow-sm">
              <img
                src={hotspotProduct.imageUrl}
                alt={hotspotProduct.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col pt-1">
              <h3 className="font-serif text-xl text-gray-900 leading-tight mb-1">
                {hotspotProduct.title}
              </h3>
              <p className="text-xs text-gray-500 mb-3">Ap Bokifa</p>

              {/* Mobile Price Display (Calculated) */}
              {priceDetails && (
                <div className="flex items-center flex-wrap gap-2 mb-3">
                  <span className="text-[#008040] font-bold text-xl">
                    {priceDetails.formattedFinalPrice}
                  </span>
                  {priceDetails.isDiscounted && (
                    <>
                      <span className="text-gray-400 text-sm line-through decoration-1">
                        {priceDetails.formattedOriginalPrice}
                      </span>
                      <span className="bg-[#FF0000] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        Save
                      </span>
                    </>
                  )}
                </div>
              )}
              <a
                href={`/product/${hotspotProduct.id}`}
                className="text-sm text-gray-500 underline hover:text-gray-800"
              >
                View details
              </a>
            </div>
          </div>
          <hr className="border-gray-100 mb-5" />
          {/* Format Selector */}
          <div className="mb-6">
            <div className="flex gap-2 text-sm mb-3">
              <span className="text-gray-900">Format:</span>
              <span className="text-gray-500 capitalize">{selectedFormat}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.keys(FORMAT_MULTIPLIERS).map((format) => (
                <button
                  key={format}
                  onClick={() => setSelectedFormat(format)}
                  className={`px-4 py-2 text-xs font-medium border transition-colors ${
                    selectedFormat === format
                      ? "border-black text-black bg-white"
                      : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          </div>
          {/* Quantity & Action */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-900 mb-2">Quantity</p>
              <div className="flex items-center border border-gray-200 w-32 h-12">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-xl text-gray-500 hover:bg-gray-50"
                >
                  <Minus size={16} />
                </button>
                <div className="flex-1 h-full flex items-center justify-center text-gray-900 font-medium">
                  {quantity}
                </div>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-xl text-gray-500 hover:bg-gray-50"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center shadow-md mt-6 flex-shrink-0">
              <ChevronUp size={20} />
            </button>
          </div>
          <button
            onClick={() => console.log(`Added to cart`)}
            className="w-full bg-[#008040] text-white font-bold text-sm py-4 rounded-full mt-8 hover:bg-green-800 transition-colors"
          >
            Add To Cart
          </button>
        </div>
      </div>
      <QuickViewDrawer
        isOpen={!!activeProduct}
        onClose={() => setActiveProduct(null)}
        product={activeProduct}
      />
    </div>
  );
};

export default LookBook;
