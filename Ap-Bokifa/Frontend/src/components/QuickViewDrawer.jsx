import React, { useState, useEffect, useMemo } from "react";
import { X, Minus, Plus, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { FORMAT_MULTIPLIERS } from "../constants";
import { useCurrency } from "../context/CurrencyContext";
import { useCart } from "../context/CartContext";

// ... (helper functions remain unchanged)
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

const normalizeFormatKey = (format) =>
  String(format)
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();

const getPriceDetails = (product, selectedFormat, currency) => {
  if (!product) return null;

  // Robust format matching
  const pickFormat =
    Object.keys(FORMAT_MULTIPLIERS).find((f) => f === selectedFormat) ||
    Object.keys(FORMAT_MULTIPLIERS).find(
      (f) => normalizeFormatKey(f) === normalizeFormatKey(selectedFormat)
    ) ||
    "Paperback"; // Fallback to Paperback (Base Price)

  const multiplier = FORMAT_MULTIPLIERS[pickFormat] ?? 1;
  const base = Number(product.price ?? 0);

  const originalPrice = +(base * multiplier);
  const discountPct = Number(product.discount) || 0;
  const finalPrice = +(originalPrice * (1 - discountPct / 100));

  return {
    originalPrice,
    finalPrice,
    discountPct,
    formattedOriginalPrice: getFormattedPrice(originalPrice, currency),
    formattedFinalPrice: getFormattedPrice(finalPrice, currency),
    isDiscounted: discountPct > 0,
  };
};

const QuickViewDrawer = ({ isOpen, onClose, product }) => {
  const [cachedProduct, setCachedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  // FIX 1: Default to "Paperback" (Standard) instead of Hardcover
  const [selectedFormat, setSelectedFormat] = useState("Paperback");
  const { currency } = useCurrency();
  const { addToCart } = useCart();

  // Update cache when a new product is passed
  useEffect(() => {
    if (product) {
      setCachedProduct(product);
      setQuantity(1);
      setShowSuccess(false); // Reset success message on new product

      // FIX 2: Find the format that has a multiplier of 1 (Base Price)
      // This ensures the drawer opens with the same price shown on the card
      const baseFormat = Object.keys(FORMAT_MULTIPLIERS).find(
        (key) => FORMAT_MULTIPLIERS[key] === 1
      );
      setSelectedFormat(baseFormat || "Paperback");
    }
  }, [product]);

  // Use either the live product or the cached one
  const activeProduct = product || cachedProduct;

  const priceDetails = useMemo(() => {
    return getPriceDetails(activeProduct, selectedFormat, currency);
  }, [activeProduct, selectedFormat, currency]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-all duration-500 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible delay-200"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[480px] bg-white z-50 transform transition-transform duration-500 ease-in-out overflow-y-auto ${
          isOpen ? "translate-x-0 shadow-2xl" : "translate-x-full shadow-none"
        }`}
      >
        {activeProduct && (
          <>
            {/* SUCCESS POPUP */}
            {showSuccess && (
              <div className="bg-[#3AB757] text-white px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
                <div className="flex items-center gap-2">
                  <div className="bg-white rounded-full p-0.5">
                    <Check
                      size={14}
                      className="text-[#3AB757]"
                      strokeWidth={3}
                    />
                  </div>
                  <span className="font-medium text-sm">
                    Item added to your cart!
                  </span>
                </div>
                <Link
                  to="/cart"
                  onClick={onClose}
                  className="text-white underline text-sm font-medium hover:text-gray-100"
                >
                  View cart
                </Link>
              </div>
            )}

            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-serif text-slate-800">
                Choose options
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={24} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div className="flex gap-6">
                <div className="w-1/3 shrink-0">
                  <div className="aspect-[2/3] bg-gray-100 rounded-md overflow-hidden relative">
                    <img
                      src={activeProduct.imageUrl}
                      alt={activeProduct.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-serif leading-tight text-slate-900">
                    {activeProduct.title}
                  </h3>
                  <div className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                    {/* You might want to map this to actual product description if available */}
                    From the author of The Longest Ride and The Return comes a
                    novel about the enduring legacy of first love.
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {priceDetails ? (
                      <>
                        {/* FIX 3: Only show discounted price if discount > 0 */}
                        <p className="text-xl font-bold text-emerald-700">
                          {priceDetails.formattedFinalPrice}
                        </p>
                        {priceDetails.isDiscounted && (
                          <p className="text-sm text-gray-400 line-through">
                            {priceDetails.formattedOriginalPrice}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-xl font-bold text-emerald-700">...</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-md">
                  <span className="text-gray-600">Format:</span>
                  <span className="text-slate-900 font-medium">
                    {selectedFormat}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(FORMAT_MULTIPLIERS).map((format) => (
                    <button
                      key={format}
                      onClick={() => setSelectedFormat(format)}
                      className={`px-4 py-2.5 text-sm border rounded transition-all ${
                        selectedFormat === format
                          ? "border-black text-black font-medium ring-1 ring-black"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm text-gray-600">Quantity</label>
                <div className="flex items-center border border-gray-200 w-32 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="flex-1 text-center font-medium text-slate-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-gray-50 text-gray-600 transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    addToCart(activeProduct, quantity, selectedFormat);
                    setShowSuccess(true);
                  }}
                  className="w-full bg-[#027A36] hover:bg-black duration-500 text-white font-medium py-3.5 rounded-full transition-colors shadow-sm hover:shadow text-sm uppercase tracking-wide"
                >
                  Add To Cart - {priceDetails?.formattedFinalPrice}
                </button>
                <button className="w-full bg-[#027A36] hover:bg-black duration-500 text-white font-medium py-3.5 rounded-full transition-colors shadow-sm hover:shadow text-sm uppercase tracking-wide">
                  Buy It Now
                </button>
              </div>

              <div className="text-center pt-2">
                <Link
                  to={`/product/${activeProduct.id}`}
                  onClick={onClose}
                  className="text-gray-500 hover:text-emerald-700 underline decoration-gray-300 hover:decoration-emerald-700 underline-offset-4 text-lg transition-all"
                >
                  View details
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default QuickViewDrawer;
