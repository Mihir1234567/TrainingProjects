import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { Heart, Star, ShoppingCart, Eye, Repeat } from "lucide-react";
import { useCurrency } from "../../context/CurrencyContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCompare } from "../../context/CompareContext";
import { useCart } from "../../context/CartContext";

// --- Currency Conversion Utility ---
const CONVERSION_RATES = {
  "USD $": { rate: 1, symbol: "$" },
  "EUR €": { rate: 0.92, symbol: "€" },
  "GBP £": { rate: 0.79, symbol: "£" },
  "CAD C$": { rate: 1.37, symbol: "C$" },
  "AUD A$": { rate: 1.52, symbol: "A$" },
  "JPY ¥": { rate: 157.45, symbol: "¥" },
  "CNY ¥": { rate: 7.25, symbol: "¥" },
  "INR ₹": { rate: 83.55, symbol: "₹" },
  "BRL R$": { rate: 5.46, symbol: "R$" },
  "MXN $": { rate: 18.42, symbol: "$" },
};

const getFormattedPrice = (price, currency) => {
  const conversion = CONVERSION_RATES[currency];
  if (!conversion) return `$${price.toFixed(2)}`;
  const convertedPrice = price * conversion.rate;
  return `${conversion.symbol}${convertedPrice.toFixed(2)}`;
};

// --- Helper component for displaying star ratings ---
const Rating = ({ count }) => (
  <div className="flex items-center text-sm space-x-0.5 text-amber-500">
    {[...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < count ? "currentColor" : "none"}
        stroke="currentColor"
      />
    ))}
    <span className="ml-1 text-gray-500 font-medium">({count})</span>
  </div>
);

// --- Helper component for a small book item ---
const SmallBookItem = ({ book, onViewProduct, currency }) => {
  const navigate = useNavigate(); // Hook for navigation

  // Navigation Handler
  const handleClick = () => {
    if (onViewProduct) onViewProduct(book);
    navigate(`/product/${book.id}`); // Redirects to /product/18
  };

  // Price Logic
  const originalPrice = book.price || 0;
  const discount = book.discount || 0;
  const finalPrice = originalPrice * (1 - discount / 100);

  return (
    <div
      className="flex items-start space-x-3 transition duration-300 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
      onClick={handleClick} // Trigger navigation on click
    >
      <div className="flex-shrink-0 w-16 h-24 lg:w-20 lg:h-30 overflow-hidden rounded-md shadow-lg">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${book.imageUrl})`,
            backgroundPosition: "center",
          }}
          role="img"
          aria-label={`Cover of ${book.title}`}
        ></div>
      </div>
      <div className="flex-grow pt-1 min-w-0">
        <Rating count={book.rating} />
        <p className="text-base lg:text-lg font-semibold text-gray-800 line-clamp-2 mt-1 leading-snug transition duration-150 hover:text-green-600">
          {book.title}
        </p>
        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5 transition duration-150 hover:text-green-600">
          {book.author}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <p className="text-lg font-extrabold text-green-700">
            {getFormattedPrice(finalPrice, currency)}
          </p>
          {discount > 0 && (
            <p className="text-xs text-gray-400 line-through">
              {getFormattedPrice(originalPrice, currency)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
export const PicksForYouSection = ({
  featuredBook, // Changed to receive object
  smallBooks = [], // Changed to receive array of objects
  onViewProduct,
  onQuickView, // Make sure Parent passes this prop!
}) => {
  const { currency } = useCurrency();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare } = useCompare();
  const { addToCart } = useCart();
  const navigate = useNavigate(); // Hook for navigation

  const isWishlisted = featuredBook ? isInWishlist(featuredBook.id) : false;
  const isCompared = featuredBook ? isInCompare(featuredBook.id) : false;

  if (!featuredBook || smallBooks.length === 0) {
    return (
      <div className="p-6 text-center text-red-500">
        Loading Picks for you...
      </div>
    );
  }

  // Featured Book Price Logic
  const featOriginalPrice = featuredBook.price || 0;
  const featDiscount = featuredBook.discount || 0;
  const featFinalPrice = featOriginalPrice * (1 - featDiscount / 100);

  // Centralized Click Handler for Big Card
  const handleFeaturedClick = () => {
    if (onViewProduct) onViewProduct(featuredBook);
    navigate(`/product/${featuredBook.id}`); // Redirect logic
  };

  return (
    <div className="mx-auto p-4 sm:p-6 mb-30">
      <div className="flex justify-between items-baseline mb-6 border-b pb-3">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
          Picks for you
        </h2>
        <button
          onClick={() => navigate("/shop")}
          className="flex items-center text-base font-medium text-green-600 hover:text-green-800 transition"
        >
          Browse All <span className="ml-2 text-xl font-normal">›</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        {/* 1. Large Featured Item */}
        <div
          className="bg-white border border-gray-100 rounded-xl shadow-lg p-4 flex flex-col sm:flex-row lg:flex-row space-y-4 sm:space-y-0 sm:space-x-6 lg:col-span-1 lg:h-full transition duration-300 hover:shadow-xl cursor-pointer"
          onClick={handleFeaturedClick} // Clicking anywhere on card navigates
        >
          {/* Image Container */}
          <div className="group flex-shrink-0 w-full sm:w-1/3 lg:w-72 relative rounded-lg overflow-hidden shadow-2xl">
            {featuredBook.discount && (
              <div className="absolute top-3 left-3 bg-red-600 text-white text-base font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-md z-10">
                <span className="text-sm font-semibold text-center leading-none">
                  -{featuredBook.discount}%
                </span>
              </div>
            )}

            <div
              className="w-full h-80 sm:h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{
                backgroundImage: `url(${featuredBook.imageUrl})`,
              }}
              role="img"
              aria-label={`Cover of ${featuredBook.title}`}
            ></div>

            {/* Icon Bar */}
            <div className="absolute top-3 right-3 flex flex-col items-center space-y-2 z-20">
              {/* Wishlist */}
              <div className="relative flex items-center group/icon">
                <button
                  className="group bg-white/80 rounded-full p-2 hover:bg-white transition-colors shadow-md"
                  onClick={(e) => {
                    e.stopPropagation(); // Stop navigation
                    toggleWishlist(featuredBook);
                  }}
                >
                  <Heart
                    size={20}
                    fill={isWishlisted ? "currentColor" : "none"}
                    className={
                      isWishlisted
                        ? "text-red-500"
                        : "text-gray-700 hover:text-green-700"
                    }
                  />
                </button>
                <span className="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 pointer-events-none">
                  {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                </span>
              </div>

              {/* Hover Icons */}
              <div className="flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* Quick View - FIX: Wire up onQuickView prop */}
                <div className="relative flex items-center group/icon">
                  <button
                    className="group bg-white/80 rounded-full p-2 text-gray-700 hover:bg-white transition-colors shadow-md"
                    onClick={(e) => {
                      e.stopPropagation(); // Stop navigation
                      if (onQuickView) onQuickView(featuredBook); // Open Drawer
                    }}
                  >
                    <Eye
                      size={20}
                      strokeWidth={2}
                      className="hover:text-green-700"
                    />
                  </button>
                  <span className="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Quick View
                  </span>
                </div>

                <div className="relative flex items-center group/icon">
                  <button
                    className="group bg-white/80 rounded-full p-2 text-gray-700 hover:bg-white transition-colors shadow-md"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCompare(featuredBook);
                    }}
                  >
                    <Repeat
                      className={`${
                        isCompared
                          ? "text-red-500"
                          : "text-gray-900 hover:text-green-700"
                      }`}
                      size={20}
                    />
                  </button>
                  <span className="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 pointer-events-none">
                    {isCompared ? "Remove compare" : "Compare"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="flex flex-col flex-grow pt-2">
            <Rating count={featuredBook.rating} />

            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2 leading-tight transition duration-150 hover:text-green-600 cursor-pointer">
              {featuredBook.title}
            </h3>

            <p className="text-base text-gray-600 italic mt-1 font-medium transition duration-150 hover:text-green-600 cursor-pointer">
              {featuredBook.author}
            </p>

            <p className="text-sm text-gray-700 my-4 leading-relaxed line-clamp-4">
              {featuredBook.description}
            </p>

            <div className="mt-auto flex items-center gap-3">
              <p className="text-3xl font-extrabold text-green-700">
                {getFormattedPrice(featFinalPrice, currency)}
              </p>
              {featDiscount > 0 && (
                <p className="text-lg text-gray-400 line-through decoration-2">
                  {getFormattedPrice(featOriginalPrice, currency)}
                </p>
              )}
            </div>

            <button
              className="mt-4 flex items-center justify-center space-x-2 bg-green-700 text-white text-sm font-bold py-2.5 px-6 rounded-full hover:bg-green-800 transition-colors shadow-lg shadow-green-200/50 w-full sm:w-fit"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(featuredBook);
              }}
            >
              <ShoppingCart size={20} strokeWidth={2.5} />
              <span>Add To Cart</span>
            </button>
          </div>
        </div>

        {/* 2. Nested Container for Smaller Items */}
        <div className="lg:col-span-1 bg-white">
          <div className="grid grid-cols-1 bg-white sm:grid-cols-2 gap-x-6 gap-y-4">
            {smallBooks.map((book, index) => (
              <SmallBookItem
                key={index}
                book={book}
                onViewProduct={onViewProduct}
                currency={currency}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
