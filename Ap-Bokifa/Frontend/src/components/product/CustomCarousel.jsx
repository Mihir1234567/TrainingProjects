import React, { useState, useRef, useEffect } from "react";
import ProductCard from "./ProductCard";

const CustomCarousel = ({
  title,
  products = [],
  onViewProduct,
  onQuickView,
  showBrowseButton = false,
  titleCenter = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(4);
  const containerRef = useRef(null);

  // Responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width < 480) setItemsToShow(1);
      else if (width < 768) setItemsToShow(2);
      else if (width < 1024) setItemsToShow(3);
      else setItemsToShow(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex < products.length - itemsToShow) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= products.length - itemsToShow;

  return (
    <div className="py-6 sm:py-10 px-3 bg-white overflow-hidden">
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row ${
          titleCenter ? "sm:justify-center" : "justify-between"
        } items-start sm:items-center mb-6 relative gap-4`}
      >
        <h2 className="text-2xl sm:text-4xl font-serif font-light text-gray-900">
          {title}
        </h2>

        {showBrowseButton && (
          <button className="sm:absolute sm:right-0 sm:top-1/2 sm:-translate-y-1/2 px-4 py-2 border rounded-full text-sm hover:bg-black hover:text-white transition">
            Browse All &gt;
          </button>
        )}
      </div>

      {/* Carousel */}
      <div className="relative" ref={containerRef}>
        {/* Prev Button */}
        {!isAtStart && (
          <button
            onClick={prevSlide}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border rounded-full shadow-lg hidden md:flex items-center justify-center hover:bg-black hover:text-white"
          >
            ←
          </button>
        )}

        {/* Track */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 px-2"
                style={{ width: `${100 / itemsToShow}%` }}
              >
                <div className="max-w-[330px] mx-auto">
                  <ProductCard
                    product={product}
                    onViewProduct={onViewProduct}
                    onQuickView={onQuickView}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Next Button */}
        {!isAtEnd && (
          <button
            onClick={nextSlide}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-white border rounded-full shadow-lg hidden md:flex items-center justify-center hover:bg-black hover:text-white"
          >
            →
          </button>
        )}
      </div>
    </div>
  );
};

export default CustomCarousel;
