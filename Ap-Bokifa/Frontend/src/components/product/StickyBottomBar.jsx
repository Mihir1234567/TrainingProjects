// src/components/product/StickyBottomBar.jsx
import React from "react";
import { FORMAT_MULTIPLIERS } from "../../constants";

const StickyBottomBar = ({
  isVisible,
  product,
  selectedFormat,
  onFormatChange,
  priceDetails,
  onAddToCart,
}) => {
  const formatOptions = Object.keys(FORMAT_MULTIPLIERS);
  const { formattedFinalPrice } = priceDetails || { formattedFinalPrice: "" };

  const productTitle = product?.title || "";

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 w-full bg-white shadow-[-2px_-2px_10px_rgba(0,0,0,0.1)] transform transition-transform duration-300 ease-in-out z-40 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-8xl mx-auto px-5 sm:px-6 lg:px-18">
        <div className="flex items-center justify-between h-auto md:h-20 py-4 md:py-0 flex-row md:flex-row gap-4 md:gap-0">
          <div className="hidden md:flex items-center gap-4 w-full md:w-auto">
            <img
              src={product?.imageUrl}
              alt={product?.title}
              className="w-12 h-auto rounded-md flex-shrink-0"
            />
            <div className="flex-grow">
              {/* We make the h3 a flex container to align the title and price */}
              <h3 className="flex items-center text-sm font-medium text-gray-900">
                {/* 1. The Title: It gets its own span so line-clamp only affects this part. */}
                <span className="line-clamp-1">{productTitle}</span>

                {/* 2. The Price: We add the dot, margin, and 'flex-shrink-0' to prevent it from being hidden */}
                <span className="ml-2 flex-shrink-0 text-sm font-semibold text-gray-700">
                  · {formattedFinalPrice}
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-end">
            <div className="hidden md:block relative w-1/2 md:w-auto">
              <select
                value={selectedFormat}
                onChange={(e) => onFormatChange(e.target.value)}
                className="appearance-none rounded-full border border-gray-300 py-2 pl-3 pr-10 text-sm text-black focus:border-green-500 focus:outline-none focus:ring-green-500"
              >
                {formatOptions.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="bg-transparent text-black border border-black hover:bg-gray-100 font-bold py-2 px-6 rounded-full transition-colors whitespace-nowrap w-full md:w-auto md:bg-black md:text-white md:border-black md:hover:bg-gray-100 md:hover:text-black"
              onClick={() => onAddToCart(1)}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyBottomBar;
