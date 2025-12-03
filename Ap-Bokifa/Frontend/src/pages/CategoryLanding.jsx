// CategoryLanding.jsx

import React, { useMemo } from "react";
import { Link } from "react-router-dom";
// Assuming this path to productsData is correct based on your snippet
import ALL_PRODUCTS from "../components/productsData";

// Helper component for an individual category card
const CategoryCard = ({ category }) => {
    // 🌟 FIX 1: Change destination path for all filtered categories to /leftSidebar
    const linkTo = category.isAllBooks
      ? "/collections/books" // Special case: All Books links to the main collections page
      : `/allproducts?category=${encodeURIComponent(category.name)}`; // All others link to the filtered bookstore page

    return (
        <Link
            to={linkTo}
            className="group block overflow-hidden cursor-pointer"
            aria-label={`Shop the ${category.name} collection`}
        >
            <div className="relative w-auto h-auto bg-white flex justify-center items-center overflow-hidden">
                <div className="w-full rounded-md flex justify-center items-center bg-gray-100">
                    <img
                        src={category.image}
                        alt={`Cover for ${category.name} collection`}
                        className="w-full h-full object-contain transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />
                </div>
            </div>

            <div className="mt-2 text-center">
                <h2 className="text-[23px] font-medium text-gray-800">
                    {category.name}
                </h2>
            </div>
        </Link>
    );
};

// --- Main Component ---
const CategoryLanding = () => {
    const dynamicCategoryData = useMemo(() => {
        const products = ALL_PRODUCTS || [];
        const categoryMap = new Map();
        // The placeholder image path, assumed to be correct
        const placeholderImage = "/src/assets/ERASURE.webp";

        products.forEach((product) => {
            if (product.category && !categoryMap.has(product.category)) {
                const image = product.imageUrl || placeholderImage;

                categoryMap.set(product.category, {
                    name: product.category,
                    image: image,
                });
            }
        });

        // 2. Convert Map to array and sort alphabetically by category name
        const sortedCategories = Array.from(categoryMap.values()).sort((a, b) =>
            a.name.localeCompare(b.name)
        );

        // 🌟 FIX 2: Create the "Shop All Books" category object
        const allBooksCategory = {
            name: "Shop All Books",
            // 👇 CORRECTED LINE: Use the reliable placeholderImage path
            image: placeholderImage,
            isAllBooks: true, // Marker for special link logic
        };

        // 🌟 FIX 3: Prepend the "Shop All Books" category to the beginning of the list
        return [allBooksCategory, ...sortedCategories];
    }, []);

    return (
        <div className="bg-white min-h-screen py-8 sm:py-12">
            <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8">
                <header className="mb-8 text-left">
                    <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                        Collections All
                    </h1>
                </header>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-8">
                    {dynamicCategoryData.map((category, index) => (
                        // It's generally better practice to use a stable ID or category name for the key,
                        // but using the index is acceptable if categories don't change order/get added/removed.
                        <CategoryCard key={index} category={category} />
                    ))}
                </div>
            </div>
            <button
                className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                aria-label="Scroll to top"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                </svg>
            </button>
        </div>
    );
};

export default CategoryLanding;