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
    image: heroModel3, // Re-mapped to correct model image
  },
  {
    subtitle: "The art of beauty",
    title: "The Perfect\nEssential Style",
    image: heroModel2, // Re-mapped to correct ring image
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
      className="relative w-full h-[900px] bg-[#FCF4E9] select-none cursor-default overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Background Image */}
      <img
        src={heroBg}
        alt="Hero Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Slides Container */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 h-full w-full transition-all duration-1500 ${
              index === currentSlide
                ? "opacity-100 z-10 pointer-events-auto"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-center h-full relative">
              {/* Left Side: Text Content */}
              <div
                className={`flex flex-col space-y-6 pt-20 lg:pt-0 pointer-events-none ${
                  index === currentSlide ? "animate-fade-in" : ""
                }`}
              >
                <span className="text-[#CB927A] text-lg md:text-xl font-medium tracking-wide clip-text">
                  <span
                    className={
                      index === currentSlide ? "animate-text-slide-up" : ""
                    }
                  >
                    {slide.subtitle}
                  </span>
                </span>
                <h1 className="text-5xl md:text-7xl lg:text-[85px] font-extralight text-gray-900 leading-[1.1] font-serif">
                  {slide.title.split("\n").map((line, i) => (
                    <span key={i} className="clip-text">
                      <span
                        className={
                          index === currentSlide
                            ? `animate-text-slide-up delay-${(i + 1) * 100}`
                            : ""
                        }
                      >
                        {line}
                      </span>
                    </span>
                  ))}
                </h1>
                <div className="pt-8 clip-text pointer-events-auto">
                  <div
                    className={`relative inline-block group w-[266px] h-[62px] ${
                      index === currentSlide
                        ? "animate-slide-up-fade delay-300"
                        : ""
                    }`}
                  >
                    {/* Offset Border Layer */}
                    <div className="absolute top-2 left-2 w-full h-full border border-[#CB927A] transition-all duration-300 group-hover:top-0 group-hover:left-0 z-0"></div>

                    {/* Main Button Layer */}
                    <button className="relative z-10 w-full h-full bg-[#CB927A] text-white font-light tracking-wide flex items-center justify-center space-x-2 transition-all duration-300 group-hover:shadow-[0_15px_40px_rgba(203,146,122,.5)]">
                      <span className="text-lg">Show Collection</span>
                      <ArrowUpRight className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Model Image */}
              <div className="hidden lg:flex justify-end items-end h-full relative pointer-events-none">
                <img
                  src={slide.image}
                  alt="Jewelry Model"
                  className={`absolute bottom-0 right-0 h-[110%] w-auto object-contain object-bottom block z-10 transition-opacity duration-1500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                  draggable="false"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls (Outside Slider Loop) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="container mx-auto px-4 md:px-8 h-full relative">
          {/* Navigation Arrows */}
          <div className="absolute right-10 bottom-[50%] flex flex-col space-y-4 pointer-events-auto">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-[#CB927A]/30 flex items-center justify-center text-[#CB927A] hover:bg-[#CB927A] hover:text-white transition-all duration-500 group"
            >
              <span className="transform rotate-180">→</span>
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-[#CB927A]/30 flex items-center justify-center text-[#CB927A] hover:bg-[#CB927A] hover:text-white transition-all duration-500"
            >
              <span>→</span>
            </button>
          </div>

          {/* Numeric Slider Counter */}
          <div className="absolute bottom-12 left-10 md:left-5 flex items-baseline space-x-2 pointer-events-auto font-serif">
            <span className="text-xl lg:text-3xl font-light text-gray-900">
              {(currentSlide + 1).toString().padStart(2, "0")}
            </span>
            <span className="text-xl lg:text-2xl text-gray-400 font-light translate-y-[-2px]">
              /
            </span>
            <span className="text-lg lg:text-xl text-gray-500 font-light">
              {slides.length.toString().padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
