// ProductCarousel.jsx

import React from "react";
import Slider from "react-slick";
import ProductCard from "./ProductCard";

// Import react-slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { s } from "framer-motion/client";

// Reusable ProductCarousel component
const ProductCarousel = ({
  title,
  onQuickView, // 1. You receive it here...
  products = [], // Changed from productIds to products array
  onViewProduct,
  slidesToShowCount = 4,
  // --- NEW PROPS ---
  showBrowseButton = true, // Default to true to not break other components
  titleCenter = false, // Default to false
}) => {
  // Configuration settings for the react-slick carousel
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: slidesToShowCount, // Dynamic card count
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      // Ensure responsive settings account for screens where 4 cards won't fit well
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3, // Show 3 cards on mid-size laptops
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Show 2 cards on tablets
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1, // Show 1 card on small phones
        },
      },
    ],
  };

  if (!products || products.length === 0) {
    return null; // Don't render if no products
  }

  return (
    <div className="py-12 px-4 sm:px-8 bg-white">
      {/* --- MODIFIED Header section --- */}
      <div
        className={`flex ${
          titleCenter ? "justify-center" : "justify-between"
        } items-center mb-8`}
      >
        <h2 className="text-4xl font-serif font-light text-gray-900">
          {title}
        </h2>

        {/* --- MODIFIED: Conditionally show button --- */}
        {showBrowseButton && (
          <div className="flex items-center space-x-4">
            <a
              href="#"
              className="
                                inline-flex items-center
                                justify-center
                                px-6 py-3
                                rounded-full
                                bg-white shadow-lg
                                text-base font-semibold text-gray-900
                                whitespace-nowrap
                                transition-all duration-300
                                hover:bg-gray-900
                                hover:text-white
                                hover:shadow-xl
                            "
            >
              Browse All
              <span className="ml-2 leading-none">&gt;</span>
            </a>
          </div>
        )}
      </div>

      {/* Carousel Content */}
      <div className="relative">
        <Slider {...sliderSettings}>
          {products.map((product) => (
            <div key={product.id} className="p-2">
              <div className="max-w-[280px] mx-auto">
                <ProductCard
                  product={product}
                  onViewProduct={onViewProduct}
                  onQuickView={onQuickView}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductCarousel;
