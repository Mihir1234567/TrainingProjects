/* d:/Projects/Ap-Bokifa-main/src/components/CategoryBanner.jsx */
// src/components/product/CategoryBanner.jsx

import React from "react";
import PropTypes from "prop-types";

const CategoryBanner = ({ categoryName, description }) => {
    return (
        <div className="bg-white py-16  text-center ">
            {/* Breadcrumb */}
            <nav className="mb-4 text-sm font-normal text-gray-500">
                <a href="/" className="hover:text-gray-700">
                    <span className="inline-block">
                        <img src="/src/assets/home.svg" alt="" />{" "}
                    </span>{" "}
                    Home
                </a>
                <span className="mx-2">/</span>
                {/* Use the categoryName prop */}
                <span className="text-gray-900 font-medium">
                    {categoryName}
                </span>
            </nav>

            {/* Page Title */}
            {/* Use the categoryName prop */}
            <h1 className="text-6xl font-serif font-light text-gray-900 mb-6 tracking-wide">
                {categoryName}
            </h1>

            {/* Subtitle/Description */}
            {/* Use the description prop */}
            <p className="max-w-3xl mx-auto text-base text-gray-700 leading-relaxed">
                {description}
            </p>
        </div>
    );
};

// Add PropTypes for type checking and component documentation
CategoryBanner.propTypes = {
    /** The name of the category to display in the title and breadcrumb */
    categoryName: PropTypes.string.isRequired,
    /** The descriptive text to display below the title */
    description: PropTypes.string.isRequired,
};

export default CategoryBanner;