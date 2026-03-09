import React, { useState, useEffect } from "react";
import { X, Star } from "lucide-react";
import productImage from "../assets/Landing/popupImg2.jpg";

const PurchasePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    // Add a delay so it appears slightly after the cookie popup
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsHiding(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsHiding(false);
    }, 500); // Wait for the fade out animation
  };

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[120] flex items-center justify-center p-4 cursor-pointer ${
        isHiding ? "animate-fade-out" : "animate-fade-in"
      }`}
      onClick={handleOutsideClick}
    >
      <div
        className={`relative flex bg-white shadow-[0_15px_60px_-15px_rgba(0,0,0,0.7)] cursor-default w-[92vw] max-w-[440px] p-6 md:p-7 pr-12 items-center rounded-[2px] ${
          isHiding ? "animate-slide-out-fade-up" : "animate-slide-up-fade"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 text-[#222222] hover:text-gray-600 transition-colors cursor-pointer"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Image */}
        <div className="w-[110px] h-[130px] md:w-[130px] md:h-[150px] bg-[#F7F7F7] flex items-center justify-center shrink-0 mr-6 overflow-hidden">
          <img
            src={productImage}
            alt="Weeding Earring"
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col">
          {/* Stars */}
          <div className="flex items-center gap-[2px] mb-1.5 text-[#CB927A]">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-4 h-4 fill-current stroke-current"
              />
            ))}
          </div>

          <h3 className="font-serif text-[20px] md:text-[22px] text-[#222222] mb-1 tracking-wide inline-block">
            <a
              href="#"
              className="hover:text-[#CB927A] transition-colors duration-300"
            >
              Weeding Earring
            </a>
          </h3>
          <p className="text-[#CB927A] text-[15px] mb-3 md:mb-4">$400.00</p>

          <p className="text-[#222222] font-semibold text-[14px] mb-0.5">
            Purchased (Rosalina)
          </p>
          <p className="text-[#222222] text-[13px]">05 minutes ago</p>
        </div>
      </div>
    </div>
  );
};

export default PurchasePopup;
