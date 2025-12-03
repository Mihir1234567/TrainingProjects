import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrency } from "../../context/CurrencyContext";
import { useWishlist } from "../../context/WishlistContext";
import { useCompare } from "../../context/CompareContext";
import { useCart } from "../../context/CartContext";
import QuickViewDrawer from "../QuickViewDrawer";
import { Repeat } from "lucide-react";

// --- Currency Utility ---
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

const StarRating = ({ rating, reviewCount, variant = "default" }) => {
  const filledStars = Math.floor(rating || 0);
  const displayReviewCount = reviewCount === undefined ? 0 : reviewCount;
  const isSmall = variant === "small";

  return (
    <div
      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-white rounded-full flex items-center justify-center z-20 transition-all duration-300 shadow-lg ${
        isSmall ? "px-2 py-0.5" : "px-3 py-1.5"
      }`}
    >
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`fill-current ${isSmall ? "w-2.5 h-2.5" : "w-4 h-4"} ${
              i < filledStars ? "text-yellow-400" : "text-gray-300"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
      <span
        className={`ml-1 ${isSmall ? "text-[10px]" : "text-sm"} text-gray-500`}
      >
        ({displayReviewCount})
      </span>
    </div>
  );
};

const ProductCard = ({
  product,
  onViewProduct,
  onQuickView,
  variant = "default",
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const { toggleCompare, isInCompare } = useCompare();
  const isCompared = isInCompare(product.id);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { currency } = useCurrency();
  const [activeProduct, setActiveProduct] = useState(null);
  const isSmall = variant === "small";

  // --- PRICE CALCULATION FIX ---
  const originalPrice = product.price || 0;
  const discount = product.discount || 0;
  const hasDiscount = discount > 0;
  // Calculate the final price to match the Drawer logic
  const finalPrice = originalPrice * (1 - discount / 100);

  const handleCardClick = () => {
    if (onViewProduct) onViewProduct(product);
    navigate(`/product/${product.id}`);
  };

  const handleQuickViewClick = (e) => {
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    } else {
      setActiveProduct(product);
    }
  };

  return (
    <>
      <div
        className="group flex flex-col flex-shrink-0 w-full bg-white rounded-xl shadow-none hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300 ease-in-out cursor-pointer relative"
        onClick={handleCardClick}
      >
        <div className="relative rounded-t-xl">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full aspect-[2/3] object-cover transition-transform duration-300 rounded-t-xl"
          />
          {hasDiscount && (
            <div
              className={`absolute top-2 left-2 bg-red-600 text-white font-bold rounded-full flex items-center justify-center z-10 ${
                isSmall ? "w-7 h-7" : "w-10 h-10"
              }`}
            >
              <span className={isSmall ? "text-[9px]" : "text-xs"}>
                -{discount}%
              </span>
            </div>
          )}
          {product.isSoldOut && (
            <div
              className={`absolute top-2 left-2 bg-gray-600 text-white font-bold rounded-full flex items-center justify-center z-10 ${
                isSmall ? "w-7 h-7" : "w-10 h-10"
              }`}
            >
              <span
                className={`text-center leading-none ${
                  isSmall ? "text-[.75rem]" : "text-[.8125rem]"
                }`}
              >
                Sold <br /> Out
              </span>
            </div>
          )}
          {!isSmall && (
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
              variant={variant}
            />
          )}
          <div className="absolute top-3 right-3 flex flex-col items-center space-y-2 z-10 transition-opacity duration-300">
            <div className="flex flex-col items-center space-y-2 group/icon relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleWishlist(product);
                }}
                className={`group rounded-full hover:bg-gray-100 transition-colors shadow-md ${
                  isSmall ? "p-1.5 bg-white/80" : "p-2 bg-white"
                }`}
              >
                <svg
                  className={`${isSmall ? "w-3.5 h-3.5" : "w-5 h-5"} ${
                    isWishlisted
                      ? "text-red-500 fill-current"
                      : "text-gray-900 hover:text-green-700"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                  />
                </svg>
              </button>
              <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 transition-opacity duration-300 group-hover/icon:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                {isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              </span>
            </div>

            <div className="flex flex-col items-center space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className={`group group/icon relative rounded-full hover:bg-gray-100 transition-colors shadow-md ${
                  isSmall ? "p-1.5 bg-white/80" : "p-2 bg-white"
                }`}
                onClick={handleQuickViewClick}
              >
                <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 transition-opacity duration-300 group-hover/icon:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                  Quick view
                </span>
                <svg
                  className={`${
                    isSmall ? "w-3.5 h-3.5" : "w-5 h-5"
                  } text-gray-700 hover:text-green-700`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </button>
              <button
                className={`group group/icon relative rounded-full hover:bg-gray-100 transition-colors shadow-md ${
                  isSmall ? "p-1.5 bg-white/80" : "p-2 bg-white"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCompare(product);
                }}
              >
                <span className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-gray-700 text-white text-xs rounded opacity-0 transition-opacity duration-300 group-hover/icon:opacity-100 whitespace-nowrap z-50 pointer-events-none">
                  {isCompared ? "Remove compare" : "Add to compare"}
                </span>
                <Repeat
                  className={`${isSmall ? "w-3.5 h-3.5" : "w-5 h-5"} ${
                    isCompared
                      ? "text-red-500"
                      : "text-gray-900 hover:text-green-700"
                  }`}
                />
              </button>
            </div>
          </div>{" "}
        </div>

        <div
          className={`flex-grow flex flex-col items-center text-center transition-transform duration-300 group-hover:translate-y-[-8px] ${
            isSmall ? "pt-3 px-2 pb-2" : "pt-8 px-4 pb-4"
          }`}
        >
          <h3
            className={`font-serif font-light text-gray-900 leading-snug line-clamp-1 ${
              isSmall ? "text-sm font-medium mt-1" : "text-xl mt-2"
            }`}
          >
            {product.title}
          </h3>
          <a
            href="#"
            className={`mt-1 hover:text-gray-900 hover:underline line-clamp-1 ${
              isSmall ? "text-xs text-gray-600" : "text-base text-gray-500"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {product.author}
          </a>

          {/* --- PRICE DISPLAY UPDATE --- */}
          <div
            className={`flex items-center justify-center gap-2 ${
              isSmall ? "mt-2" : "mt-3"
            }`}
          >
            <p
              className={
                product.isSoldOut
                  ? `font-bold text-gray-500 ${
                      isSmall ? "text-lg" : "text-2xl"
                    }`
                  : `font-bold text-green-700 ${
                      isSmall ? "text-lg" : "text-2xl"
                    }`
              }
            >
              {getFormattedPrice(finalPrice, currency)}
            </p>
          </div>
        </div>

        <div
          className={`p-3 pt-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out transform ${
            isSmall ? "-translate-y-16" : "-translate-y-24"
          } group-hover:translate-y-0`}
        >
          <button
            className={
              product.isSoldOut
                ? `w-full bg-gray-300 text-gray-500 font-bold px-4 rounded-full flex items-center justify-center cursor-not-allowed ${
                    isSmall ? "py-1.5 text-xs" : "py-2.5 text-sm"
                  }`
                : `w-full bg-green-700 text-white font-bold px-4 rounded-full flex items-center justify-center hover:bg-green-800 transition-colors ${
                    isSmall ? "py-1.5 text-xs" : "py-2.5 text-sm"
                  }`
            }
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            disabled={product.isSoldOut}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`mr-1 ${isSmall ? "h-3.5 w-3.5" : "h-5 w-5"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {product.isSoldOut ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              )}
            </svg>
            {product.isSoldOut ? "Sold Out" : "Add To Cart"}
          </button>
        </div>
      </div>

      {!onQuickView && (
        <QuickViewDrawer
          isOpen={!!activeProduct}
          onClose={() => setActiveProduct(null)}
          product={activeProduct}
        />
      )}
    </>
  );
};

export default ProductCard;
