/* d:/Projects/Ap-Bokifa-main/src/components/CrossSell.jsx */
// components/CrossSell.jsx

import React from "react";
// Using your file's import paths

/**
 * An overlay modal component for upselling products.
 *
 * @param {object} props
 * @param {function} props.onClose - A function to call when the modal should be closed.
 */
const CrossSell = ({ onClose }) => {
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
                        <strong className="text-gray-900">CrossSelling</strong> is by far one of the best
                        ways to boost sales in your ecommerce store. It doesn’t
                        even require a lot of additional work! On average,{" "}
                        <strong className="text-gray-900">
                            CrossSelling is considered to be 20 times more
                            effective
                        </strong>
                    </p>
                </div>

                {/* 💡 MODIFIED: Using flexbox to center cards without stretching them */}
            </div>
        </div>
    );
};

export default CrossSell;