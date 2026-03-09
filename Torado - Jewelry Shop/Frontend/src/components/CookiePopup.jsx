import React, { useState, useEffect } from "react";
import { X, ArrowUpRight } from "lucide-react";

const CookiePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    // Check local storage to see if user has already accepted or declined
    const hasResponded = localStorage.getItem("torado_cookie_consent");
    if (!hasResponded) {
      // Add a slight delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000); // Wait until newsletter popup animating in so it overlays nicely
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (action) => {
    setIsHiding(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsHiding(false);
      localStorage.setItem("torado_cookie_consent", action);
    }, 500); // Wait for the fade out animation
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      handleAction("");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[110] flex items-center justify-center p-4 cursor-pointer ${
        isHiding ? "animate-fade-out" : "animate-fade-in"
      }`}
      onClick={handleOutsideClick}
    >
      <div
        className={`relative w-[95vw] max-w-[480px] bg-[#CB927A] p-8 md:p-10 text-white shadow-2xl cursor-default ${
          isHiding ? "animate-slide-out-fade-up" : "animate-slide-up-fade"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => handleAction("")}
          className="absolute top-4 right-4 z-20 text-white hover:text-gray-200 transition-colors cursor-pointer"
          aria-label="Close popup"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl md:text-[28px] font-serif mb-4 tracking-wide pr-6">
          Before You Start Shopping
        </h2>

        <p className="text-[14px] md:text-[15px] font-medium tracking-wide leading-relaxed mb-4 text-white/95">
          By clicking Accept Cookies, we can continue to display personalized
          offers based on your preferences.
        </p>

        <p className="text-[14px] md:text-[14.5px] font-medium tracking-wide leading-relaxed mb-6 md:mb-8 text-white/95">
          If you want to know more about cookies, visit our{" "}
          <a href="#" className="underline hover:text-white transition-colors">
            Privacy Policy
          </a>{" "}
          page.
        </p>

        <div className="flex flex-col gap-3 md:gap-4">
          <button
            onClick={() => handleAction("accepted")}
            className="group relative overflow-hidden w-full bg-[#222222] text-white px-5 py-3.5 font-medium flex items-center justify-center gap-2 transition-colors text-[15px]"
          >
            {/* Hover Background overlay */}
            <div className="absolute inset-0 bg-white opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-500 ease-in-out origin-center"></div>

            <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-500 group-hover:text-black">
              Accept
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </button>

          <button
            onClick={() => handleAction("declined")}
            className="group relative overflow-hidden w-full bg-white text-[#222222] px-5 py-3.5 font-medium flex items-center justify-center transition-colors text-[15px]"
          >
            {/* Hover Background overlay */}
            <div className="absolute inset-0 bg-[#222222] opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-500 ease-in-out origin-center"></div>

            <span className="relative z-10 flex items-center transition-colors duration-500 group-hover:text-white">
              Decline
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;
