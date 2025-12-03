import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// IMPORTANT: Replace these image URLs with the actual paths or imported images
const authors = [
    { name: "Summer Chandler", imageUrl: "/src/assets/Summer_Chandler.png" },
    { name: "Dennis Daniels", imageUrl: "/src/assets/Dennis_Daniels.png" },
    { name: "Aubrie Butler", imageUrl: "/src/assets/Aubrie_Butler.png" },
    { name: "Matias Casey", imageUrl: "/src/assets/Matias_Casey.png" },
    { name: "Melany Rodriguez", imageUrl: "/src/assets/Melany_Rodriguez.png" },
    { name: "Camelia Doe", imageUrl: "/src/assets/Camelia_Doe.png" },
    { name: "Joe Knight", imageUrl: "/src/assets/Joe_Knight.png" },
    { name: "Johan Sanford", imageUrl: "/src/assets/Johan_Sanford.png" },
    { name: "Ava Williams", imageUrl: "/src/assets/Ava_Williams.png" },
];

/**
 * A reusable component for an individual author card.
 */
const AuthorCard = ({ name, imageUrl }) => {
    const nameParts = name.split(" ");
   
    return (
        <div className="flex flex-col items-center hover:shadow-xl/30 transition-shadow duration-300 justify-start py-4 px-2 focus:outline-none">
            {/* The w-25/h-25 classes are non-standard Tailwind, adjust if necessary 
                but keeping them as they were in the original code for context. */}
            <div className="w-25 h-25 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full  mb-2 sm:mb-3">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover"
                />
            </div>
            <p className="text-md sm:text-base font-medium text-gray-800 leading-tight hover:text-green-600 transition duration-500">
                {name}
            </p>
           
        </div>
    );
};

// --- Custom Arrow Components for react-slick ---

/**
 * Custom Previous Arrow
 */
const PrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            // ADJUSTED: Changed positioning to -left-6 on desktop and -left-4 on mobile
            // to prevent the arrows from being pushed completely off-screen.
            className={`absolute top-1/2 -left-6 transform -translate-y-1/2 cursor-pointer z-10 ${className}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <img
                src="/src/assets/arrowsLeft.svg"
                alt="Previous"
                className="w-12 h-12 sm:w-16 sm:h-16"
            />
        </div>
    );
};

/**
 * Custom Next Arrow
 */
const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            // ADJUSTED: Changed positioning to -right-6 on desktop and -right-4 on mobile
            // to prevent the arrows from being pushed completely off-screen.
            className={`absolute top-1/2 -right-6 transform -translate-y-1/2 cursor-pointer z-10 ${className}`}
            style={{ ...style, display: "block" }}
            onClick={onClick}
        >
            <img
                src="/src/assets/arrowRight.svg"
                alt="Next"
                className="w-12 h-12 sm:w-16 sm:h-16"
            />
        </div>
    );
};

// --- Main Component ---

const FeaturedAuthors = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToScroll: 1,
        autoplay: false,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        // Default for largest screens
        slidesToShow: 8,

        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480, // Added a 480 breakpoint for better step down
                settings: {
                    slidesToShow: 1,
                },
            },
            {
                breakpoint: 360,
                settings: {
                    slidesToShow: 1,
                    // *** FIX APPLIED: REMOVED 'arrows: false' ***
                    // Arrows will now be visible on the smallest screens unless you decide to hide them here again.
                },
            },
        ],
    };

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 w-full mx-auto bg-white">
            <h2 className="text-4xl sm:text-5xl font-serif text-center mb-10 sm:mb-12 text-gray-900 tracking-tight">
                Featured authors
            </h2>

            <div className="relative mx-auto max-w-9xl">
                {/* We need margin/padding here to prevent max-w-7xl from clipping the arrows */}
                <div className="mx-8 sm:mx-12 ">
                    <Slider {...settings} >
                        {authors.map((author, index) => (
                            <AuthorCard
                                key={index}
                                name={author.name}
                                imageUrl={author.imageUrl}
                            />
                        ))}
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default FeaturedAuthors;
