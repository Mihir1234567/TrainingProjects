import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import heroBg from "../assets/Landing/Hero/imgi_63_hero-bg.jpg";
import heroModel1 from "../assets/Landing/Hero/imgi_13_hero-slide-1.png";
import heroModel2 from "../assets/Landing/Hero/imgi_15_hero-slide-2.png";
import heroModel3 from "../assets/Landing/Hero/imgi_14_hero-slide-3.png";

const slides = [
  {
    subtitle: "The art of beauty",
    title: "Essential Jewelry\nCollection",
    image: heroModel1,
  },
  {
    subtitle: "Grab your favourite",
    title: "New Arrivals 15%\nOFF",
    image: heroModel3,
  },
  {
    subtitle: "The art of beauty",
    title: "The Perfect\nEssential Style",
    image: heroModel2,
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  // Mouse Swipe Logic
  const handleMouseDown = (e) => {
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setTouchEnd(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setIsDragging(false);
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section
      className="relative w-full h-[100svh] min-h-[850px] max-h-[1000px] md:h-screen md:min-h-[500px] md:max-h-[900px] bg-[#FCF4E9] select-none cursor-default overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Image */}
      <img
        src={heroBg}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
      />

      {/* ===== MOBILE LAYOUT (flex column, no overlap) ===== */}
      <div className="relative z-10 flex flex-col h-full md:hidden">
        {/* 1. Text Content (top) */}
        <div className="shrink-0 px-4 pt-20 pb-2 relative">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "hidden"
              }`}
            >
              <div
                className={`flex flex-col space-y-3 ${
                  index === currentSlide ? "animate-fade-in" : ""
                }`}
              >
                <div className="text-[#CB927A] text-[15px] font-medium tracking-wide clip-text hero-subtitle w-max">
                  <div
                    className={
                      index === currentSlide ? "animate-text-slide-up" : ""
                    }
                  >
                    {slide.subtitle}
                  </div>
                </div>

                <h1 className="text-[40px] leading-[1.1] font-extralight text-gray-900 font-serif">
                  {slide.title.split("\n").map((line, i) => (
                    <span key={i} className="block overflow-hidden pb-1">
                      <span
                        className={`block ${
                          index === currentSlide
                            ? `animate-text-slide-up delay-${(i + 1) * 100}`
                            : ""
                        }`}
                      >
                        {line}
                      </span>
                    </span>
                  ))}
                </h1>

                <div className="pt-2 pointer-events-auto w-max">
                  <div
                    className={`relative inline-block group w-[180px] h-[45px] ${
                      index === currentSlide
                        ? "animate-slide-up-fade delay-300"
                        : ""
                    }`}
                  >
                    <div className="absolute top-1.5 left-1.5 w-full h-full border border-[#CB927A] transition-all duration-300 group-hover:top-0 group-hover:left-0 z-0"></div>
                    <button className="relative z-10 w-full h-full bg-[#CB927A] text-white font-light tracking-wide flex items-center justify-center space-x-2 transition-all duration-300 group-hover:shadow-[0_15px_40px_rgba(203,146,122,.5)]">
                      <span className="text-[13px]">Show Collection</span>
                      <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Model Image (middle, fills remaining space) */}
        <div className="flex-1 relative overflow-hidden min-h-[300px]">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide.image}
              alt="Jewelry Model"
              className={`absolute inset-0 w-full h-[110%] object-contain object-bottom transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              draggable="false"
            />
          ))}
        </div>

        {/* 3. Navigation Controls (bottom) */}
        <div className="shrink-0 flex flex-col items-center pt-3 pb-4">
          <div className="font-serif flex items-baseline mb-[10px]">
            <span className="text-[55px] font-light text-gray-900 leading-none">
              {(currentSlide + 1).toString().padStart(2, "0")}
            </span>
            <span className="text-[20px] text-gray-900 font-light translate-y-[-5px] translate-x-1">
              /
            </span>
            <span className="text-[20px] text-gray-900 font-light tracking-wider translate-x-2">
              {slides.length.toString().padStart(2, "0")}
            </span>
          </div>
          <div className="flex flex-row space-x-4">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full border border-[#CB927A]/30 flex items-center justify-center text-[#CB927A] hover:bg-[#CB927A] hover:text-white transition-all duration-500"
            >
              <span>←</span>
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full border border-[#CB927A]/30 flex items-center justify-center text-[#CB927A] hover:bg-[#CB927A] hover:text-white transition-all duration-500"
            >
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT (absolute positioning, original design) ===== */}
      <div className="relative h-full w-full z-10 hidden md:block">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full transition-all duration-1000 ${
              index === currentSlide
                ? "opacity-100 z-10 pointer-events-auto"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="container mx-auto px-8 flex flex-row items-center h-full relative w-full">
              {/* Left Side: Text Content */}
              <div
                className={`flex flex-col space-y-4 xl:space-y-6 pointer-events-none relative z-30 max-w-[85%] lg:w-1/2 lg:max-w-none ${
                  index === currentSlide ? "animate-fade-in" : ""
                }`}
              >
                <div className="text-[#CB927A] text-xl font-medium tracking-wide clip-text hero-subtitle w-max">
                  <div
                    className={
                      index === currentSlide ? "animate-text-slide-up" : ""
                    }
                  >
                    {slide.subtitle}
                  </div>
                </div>

                <h1 className="text-[60px] lg:text-[70px] xl:text-[85px] leading-[1.1] font-extralight text-gray-900 font-serif max-w-full">
                  {slide.title.split("\n").map((line, i) => (
                    <span key={i} className="block overflow-hidden pb-1">
                      <span
                        className={`block ${
                          index === currentSlide
                            ? `animate-text-slide-up delay-${(i + 1) * 100}`
                            : ""
                        }`}
                      >
                        {line}
                      </span>
                    </span>
                  ))}
                </h1>

                <div className="pt-4 xl:pt-8 pointer-events-auto w-max">
                  <div
                    className={`relative inline-block group w-[220px] h-[52px] xl:w-[266px] xl:h-[62px] ${
                      index === currentSlide
                        ? "animate-slide-up-fade delay-300"
                        : ""
                    }`}
                  >
                    <div className="absolute top-2 left-2 w-full h-full border border-[#CB927A] transition-all duration-300 group-hover:top-0 group-hover:left-0 z-0"></div>
                    <button className="relative z-10 w-full h-full bg-[#CB927A] text-white font-light tracking-wide flex items-center justify-center space-x-2 transition-all duration-300 group-hover:shadow-[0_15px_40px_rgba(203,146,122,.5)]">
                      <span className="text-base xl:text-lg">
                        Show Collection
                      </span>
                      <ArrowUpRight className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Model Image */}
              <div className="absolute bottom-0 right-0 w-[50%] lg:w-[45%] h-full flex justify-end items-end pointer-events-none z-10 transition-all duration-500">
                <img
                  src={slide.image}
                  alt="Jewelry Model"
                  className={`relative block w-auto max-h-full object-contain object-bottom transition-opacity duration-1000 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                  draggable="false"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Navigation Controls */}
      <div className="absolute inset-0 pointer-events-none z-40 hidden md:block">
        <div className="container mx-auto px-8 h-full relative">
          {/* Numeric Slider Counter */}
          <div className="pointer-events-auto font-serif flex items-baseline absolute bottom-8 xl:bottom-12 left-8 lg:left-5">
            <span className="text-5xl lg:text-5xl font-light text-gray-900 leading-none">
              {(currentSlide + 1).toString().padStart(2, "0")}
            </span>
            <span className="text-2xl text-gray-900 font-light translate-y-[-5px] translate-x-1">
              /
            </span>
            <span className="text-xl text-gray-900 font-light tracking-wider translate-x-2">
              {slides.length.toString().padStart(2, "0")}
            </span>
          </div>

          {/* Navigation Arrows */}
          <div className="flex flex-col space-y-4 pointer-events-auto absolute right-10 bottom-[50%]">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-[#CB927A]/30 flex items-center justify-center text-[#CB927A] hover:bg-[#CB927A] hover:text-white transition-all duration-500 group"
            >
              <span>←</span>
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-[#CB927A]/30 flex items-center justify-center text-[#CB927A] hover:bg-[#CB927A] hover:text-white transition-all duration-500"
            >
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
