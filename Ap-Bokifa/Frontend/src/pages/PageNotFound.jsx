// src/components/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom"; // Ensure react-router-dom is installed

const NotFoundPage = () => {
  return (
    <div className="w-full min-h-[60vh] bg-white flex flex-col items-center justify-center px-4 text-center font-sans">
      {/* 404 Label */}
      <p className="text-gray-500 text-sm mb-4">404</p>

      {/* Main Heading */}
      <h1 className="text-3xl md:text-4xl text-gray-600 font-normal mb-10">
        We can’t find the page you are looking for
      </h1>

      {/* Continue Shopping Button */}
      <Link
        to="/allproducts" // Update this path to your actual shop route
        className="bg-[#008040] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-green-800 transition-colors duration-300"
      >
        Continue shopping
      </Link>
    </div>
  );
};

export default NotFoundPage;
