// components/UpsellModal.jsx

import React, { useMemo } from "react";
// Using your file's import paths
import ProductCard from "./product/ProductCard";
// import ALL_PRODUCTS from "./productsData"; // REMOVED
import { useProducts } from "../hooks/useProducts"; // ADDED

/**
 * An overlay modal component for upselling products.
 *
 * @param {object} props
 * @param {function} props.onClose - A function to call when the modal should be closed.
 */
const UpsellModal = ({ onClose }) => {
  // 1. Fetch products dynamically
  const { products } = useProducts({ limit: 5 }); // Fetch a few to pick from

  const upsellProducts = useMemo(() => {
    if (!products || products.length === 0) return [];
    // Try to find specific ones if they exist, otherwise fallback to first 2
    const p1 = products.find((p) => p.title === "ERASURE") || products[0];
    const p2 =
      products.find((p) => p.title === "The Wedding People") || products[1];
    return [p1, p2].filter(Boolean); // Filter out undefined if products array is too short
  }, [products]);
  // This function handles clicks on the backdrop, so it closes the modal.
  const handleBackdropClick = (e) => {
    // Only close if the click is on the backdrop itself (e.target)
    // and not on a child element (e.currentTarget).
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleViewProduct = (product) => {
    // This function would likely navigate to the product's page
    // or open a quick view.
    console.log("Viewing product:", product.title);
    // You could also close the modal after selection
    // onClose();
  };

  return (
    <div
      // Using the modern bg-black/75 for opacity
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75  p-4"
      onClick={handleBackdropClick} // 👈 Close when clicking overlay
      aria-modal="true"
      role="dialog"
    >
      {/* 💡 MODIFIED: Wider modal container */}
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 sm:p-8">
        {/* Close Button (Styled to match the red 'X' in your image) */}
        <button
          onClick={onClose} // 👈 Close when clicking button
          className="absolute top-0 right-0 -m-3 h-9 w-9 flex items-center justify-center bg-red-600 rounded-full text-white hover:bg-red-700 transition-colors shadow-lg"
          aria-label="Close upsell modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Text Content (From your image) */}
        <div className="text-center mb-6">
          <p className="text-gray-700 text-lg max-w-lg mx-auto leading-relaxed">
            <strong className="text-gray-900">Upselling</strong> is by far one
            of the best ways to boost sales in your ecommerce store. It doesn't
            even require a lot of additional work! On average,{" "}
            <strong className="text-gray-900">
              upselling is considered to be 20 times more effective
            </strong>
            .
          </p>
        </div>

        {/* 💡 MODIFIED: Using flexbox to center cards without stretching them */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {upsellProducts.length > 0 ? (
            upsellProducts.map((product) => (
              // 💡 This wrapper sets a fixed width for the card
              <div
                key={product.id}
                className="w-full sm:w-[240px] flex-shrink-0"
              >
                <ProductCard
                  product={product}
                  onViewProduct={() => handleViewProduct(product)}
                  variant="small"
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Could not find upsell products.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpsellModal;
