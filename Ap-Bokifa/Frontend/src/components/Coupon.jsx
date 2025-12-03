/* d:/Projects/Ap-Bokifa-main/src/components/Coupon.jsx */
import React, { useState } from "react";

// 1. Accept the onClose function as a prop
export const Coupon = ({ onClose }) => {
    const imgUrl = "/src/assets/coupon.jpg";
    const CouponCode = "6KY0XN7NQDP6"; // Renamed for clarity: 'Coupon' variable conflicted with component name 'Coupon'
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard.writeText(CouponCode);
        setCopied(true);
        alert("Coupon code copied to clipboard!");
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
            onClick={handleBackdropClick}
        >
            {/* 2. **Content Box**: Added 'relative' positioning for the close button */}
            <div className="w-[470px] h-[170px] flex justify-center items-center bg-white rounded-lg shadow-xl relative">
                {/* 3. **The Close Button ("X")** */}
                <button
                    onClick={onClose} // Call the function passed from App.jsx
                    // Use absolute positioning to place it on the top right
                    className="absolute top-2 right-2 text-grey-500 cursor-pointer  rounded-full p-1 leading-none z-10 "
                >
                    {/* The "X" SVG icon structure */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                {/* End Close Button */}

                <img
                    src={imgUrl}
                    alt="Content image"
                    className="block max-w-full h-[170px] object-cover rounded-sm"
                />
                {/* Positioning this div absolutely ensures it sits centered over the image */}
                <div className="absolute align-center text-center ">
                    <h3 className="text-[30px] font-semibold">
                        -10% FOR BEST SELLER
                    </h3>
                    <p className="text-lg">
                        Enter this coupon code at checkout to get 10% off:
                    </p>
                    <button
                        onClick={copy}
                        className="text-lg cursor-pointer text-white py-1 px-37 border-dashed border-2 mt-2 font-bold"
                    >
                        {CouponCode}
                    </button>
                    {copied && <p className="">Coupon code copied</p>}
                </div>
            </div>
        </div>
    );
};