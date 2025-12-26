import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

/**
 * ScrollToTop component with a circular progress indicator.
 */
const ScrollToTop = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div
      className={`fixed right-8 bottom-8 z-[60] transition-all duration-500 transform ${
        scrollProgress > 2
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollToTop}
        className="relative w-14 h-14 bg-[#004e59] rounded-full shadow-2xl flex items-center justify-center group hover:scale-110 transition-all duration-300 border border-white/10"
        aria-label="Scroll to top"
      >
        {/* Progress Circle SVG */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="transparent"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="3"
          />
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="transparent"
            stroke="#00D1FF"
            strokeWidth="3"
            strokeDasharray="150.8"
            strokeDashoffset={150.8 - (150.8 * scrollProgress) / 100}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />
        </svg>
        <ArrowUp className="w-5 h-5 text-white transition-transform group-hover:-translate-y-1 z-10" />
      </button>
    </div>
  );
};

export default ScrollToTop;
