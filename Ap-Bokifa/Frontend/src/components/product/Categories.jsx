import React from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

// Import react-slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Data for the categories
const categories = [
    {
        name: "Family",
        imageUrl: "/src/assets/family.png", // Replace with your actual image path
    },
    {
        name: "Fiction",
        imageUrl: "/src/assets/fiction.webp", // Replace with your actual image path
    },
    {
        name: "Romance",
        imageUrl: "/src/assets/romance.webp", // Replace with your actual image path
    },
    {
        name: "Kids",
        imageUrl: "/src/assets/kids.webp", // Replace with your actual image path
    },
    {
        name: "History",
        imageUrl: "/src/assets/history.png", // Replace with your actual image path
    },
    {
        name: "Biography",
        imageUrl: "/src/assets/biography.webp", // Replace with your actual image path
    },
    {
        name: "Fantasy",
        imageUrl: "/src/assets/fantasy.png", // Replace with your actual image path
    },
    {
        name: "Horror",
        imageUrl: "/src/assets/horror.webp", // Replace with your actual image path
    },
];

// Reusable component for a single category item
const CategoryItem = ({ name, imageUrl }) => (
    <div className="flex flex-col items-center justify-center space-y-3 p-4 my-6 bg-[#f9f5f0] border border-gray-200 rounded-lg text-center cursor-pointer hover:scale-105 hover:bg-[white] transition-transform duration-300 h-full">
        <img src={imageUrl} alt={name} className="object-contain" />
        <p className="text-xl text-[#272727] opacity-80 hover:text-green-500 transition-colors duration-100">
            {name}
        </p>
    </div>
);

export const Categories = () => {
    const navigate = useNavigate();
    // UPDATED: Configuration settings for the react-slick carousel
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4, // Default for screens > 1200px
        slidesToScroll: 1,
        arrows: false,
        autoplay: false, // CHANGED: Autoplay is now turned off
        responsive: [
            {
                // For tablet screens (less than 1200px)
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3, // CHANGED: Show 3 slides to make them larger
                },
            },
            {
                // For mobile screens (less than 767px)
                breakpoint: 767,
                settings: {
                    slidesToShow: 2, // CHANGED: Show 2 slides to make them much larger
                },
            },
            {
                // For mobile screens (less than 360px)
                breakpoint: 360,
                settings: {
                    slidesToShow: 1, // CHANGED: Show 1 slide to make it much larger
                },
            },
        ],
    };

    return (
      <section className="bg-[#f9f5f0] h-[450px]  font-serif p-8 md:p-12 overflow-hidden">
        <div className="mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-4xl md:text-6xl text-gray-700">
              Top categories
            </h2>
            <button
              onClick={() => navigate(`/collections/categories`)}
              className="text-[black] border border-gray-300 rounded-full px-5 py-2 text-m hover:bg-[black] hover:text-white transition-colors duration-500 flex-shrink-0"
            >
              Browse All &rarr;
            </button>
          </div>

          {/* Desktop View: Grid (visible on screens > 1280px) */}
          <div className="hidden xl:grid grid-cols-8 gap-5">
            {categories.map((category) => (
              <CategoryItem
                key={category.name}
                name={category.name}
                imageUrl={category.imageUrl}
              />
            ))}
          </div>

          {/* Mobile & Tablet View: Carousel (visible on screens < 1280px) */}
          <div className="xl:hidden">
            <Slider {...sliderSettings}>
              {categories.map((category) => (
                <div key={category.name} className="p-3">
                  {" "}
                  {/* Increased padding slightly */}
                  <CategoryItem
                    name={category.name}
                    imageUrl={category.imageUrl}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
    );
};
