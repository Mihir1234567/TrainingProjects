import React, { useState, useEffect } from "react";
import popupImg from "../assets/Landing/popupImg.jpg";
import {
  X,
  ArrowUpRight,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [dontShow, setDontShow] = useState(false);

  useEffect(() => {
    // Check local storage to see if user opted out
    const hasOptedOut = localStorage.getItem("torado_newsletter_popup_closed");
    if (!hasOptedOut) {
      // Add a slight delay for better UX
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsHiding(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsHiding(false);
      if (dontShow) {
        localStorage.setItem("torado_newsletter_popup_closed", "true");
      }
    }, 500); // Wait for the fade out animation
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleCheckboxChange = (e) => {
    setDontShow(e.target.checked);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 cursor-pointer bg-black/50 backdrop-blur-sm ${
        isHiding ? "animate-fade-out" : "animate-fade-in"
      }`}
      onClick={handleOutsideClick}
    >
      {/* Popup Container */}
      <div
        className={`relative w-full max-w-[630px] bg-white shadow-2xl cursor-default ${
          isHiding ? "animate-slide-out-fade-up" : "animate-slide-up-fade"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 text-white hover:text-gray-200 transition-colors"
          aria-label="Close popup"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Section */}
        <div className="w-full h-[260px] md:h-[320px]">
          <img
            src={popupImg}
            alt="Jewelry"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bottom Section with padding to create the U-shape white border */}
        <div className="w-full bg-white px-8 pb-8 md:px-[45px] md:pb-[45px]">
          {/* Brown Box containing the form */}
          <div className="relative -mt-[110px] md:-mt-[135px] w-full bg-[#CB927A] p-8 md:p-10 text-white shadow-md">
            <h2 className="text-2xl md:text-[26px] font-serif mb-2 tracking-wide">
              Subscribe To Our Newsletter
            </h2>
            <p className="text-[14px] md:text-[14.5px] font-medium tracking-wide mb-6 md:mb-8 text-white/95">
              Enter your email to our newsletter and get 25% off your first
              purchase
            </p>

            <form
              className="flex flex-col gap-4 mb-6"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-transparent border border-white/60 text-white placeholder:text-white/90 px-4 py-3.5 focus:outline-none focus:border-black transition-colors duration-300 text-sm"
                required
              />
              <button
                type="submit"
                className="group relative overflow-hidden w-full bg-[#222222] text-white px-5 py-3.5 font-medium flex items-center justify-center gap-2 transition-colors text-[15px]"
              >
                {/* Hover Background overlay */}
                <div className="absolute inset-0 bg-white opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-500 ease-in-out origin-center"></div>

                <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-500 group-hover:text-black">
                  Subscribe Now
                  <ArrowUpRight
                    size={16}
                    strokeWidth={2}
                    className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </span>
              </button>
            </form>

            {/* Socials & Checkbox */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[13.5px] font-medium pt-2">
              <div className="flex items-center gap-5">
                <a
                  href="#"
                  className="hover:text-black transition-colors duration-300"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="hover:text-black transition-colors duration-300"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="hover:text-black transition-colors duration-300"
                >
                  <Twitter className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="hover:text-black transition-colors duration-300"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer group">
                <div className="relative flex items-center justify-center w-[15px] h-[15px] border border-white/80 group-hover:border-white transition-colors">
                  <input
                    type="checkbox"
                    className="peer opacity-0 absolute w-full h-full cursor-pointer"
                    checked={dontShow}
                    onChange={handleCheckboxChange}
                  />
                  {/* Solid Black Square when Checked */}
                  <div className="w-full h-full bg-black hidden peer-checked:block pointer-events-none transition-colors duration-300"></div>
                </div>
                <span className="select-none text-white/95">
                  Dont' show this popup again.
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;
