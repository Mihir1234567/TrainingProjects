import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const ScrollToTop = ({
  threshold = 300,
  baseColor = "#002333",
  accentColor = "#5BBB7B",
  className = "",
}) => {
  const [scrollState, setScrollState] = useState({
    progress: 0,
    isVisible: false,
  });

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;

          // Calculate 0-100 scale
          const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

          setScrollState({
            progress,
            isVisible: scrollTop > threshold,
          });

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG Configuration
  const size = 56; // Button size in px (w-14)
  const strokeWidth = 3;
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (scrollState.progress / 100) * circumference;

  return (
    <div
      className={`fixed right-4 bottom-4 md:right-8 md:bottom-8 z-[60] transition-all duration-500 transform ${
        scrollState.isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0 pointer-events-none"
      } ${className}`}
    >
      <button
        onClick={scrollToTop}
        className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full shadow-2xl transition-all duration-300 hover:-translate-y-1 focus:outline-none"
        style={{
          backgroundColor: baseColor,
          "--accent-color": accentColor,
          "--base-color": baseColor,
        }}
        aria-label="Scroll to top"
      >
        {/* Progress Circle SVG */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none z-10"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
          />
          {/* Progress Indicator */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-100 ease-out stroke-[var(--accent-color)] group-hover:stroke-[var(--base-color)]"
          />
        </svg>

        {/* Arrow Icon */}
        <ArrowUp className="w-5 h-5 text-white z-20 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-[var(--base-color)]" />

        {/* Hover Fill Effect (Optional: Fills button with accent color on hover) */}
        <div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ backgroundColor: accentColor }}
        />
      </button>
    </div>
  );
};

export default ScrollToTop;
