import React from "react";
import Slider from "react-slick";

// =======================================================================================
// IMPORTANT SETUP NOTE:
// For 'react-slick' to function and display correctly, you MUST include its CSS files
// in the <head> section of your hosting HTML file (where this React component is rendered).
//
// Add these two lines to your <head>:
// <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css" />
// <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css" />
// =======================================================================================

// --- Sample Data (Unchanged) ---
const testimonials = [
    {
        name: "Joanne H.",
        date: "Dec 1, 2024",
        rating: 5,
        title: "This is my favorite bookshop",
        text: "Love that you give books to those in need. Great service and can find great value here especially as I prefer hardcover books to add to my collection.",
    },
    {
        name: "Viorel M.",
        date: "Dec 1, 2024",
        rating: 5,
        title: "Quick and easy",
        text: "Costs are low, there’s always promotions or discounts, the website is easy to navigate, and knowing that the impact of purchasing makes me feel like I’m doing something good.",
    },
    {
        name: "Ciaren R.",
        date: "Dec 1, 2024",
        rating: 5,
        title: "Excellent service",
        text: "The books were wrapped securely and arrived in pristine condition. I sent an email after to books arrived to ask about the author, and I received a prompt reply.",
    },
    {
        name: "Margaret C.",
        date: "Dec 1, 2024",
        rating: 5,
        title: "Best Bookshop ever!",
        text: "I am so happy to find a site where I can shop for unusual items. The packaging was phenomenal and my book arrived on time in perfect condition.",
    },
    // Added an extra item to ensure the carousel scrolls
    {
        name: "David S.",
        date: "Dec 2, 2024",
        rating: 4.5,
        title: "Highly Recommended",
        text: "A fantastic experience from start to finish. The quality of the products is unmatched, and their commitment to customer service truly shines through in every interaction.",
    },
];

// --- Sub-Components (Unchanged) ---

/**
 * Renders the rating stars for the review card.
 */
const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const stars = [];

    for (let i = 0; i < 5; i++) {
        const color = i < fullStars ? "text-green-700" : "text-gray-300";
        stars.push(
            <svg
                key={i}
                className={`w-3 h-3 fill-current ${color}`}
                viewBox="0 0 24 24"
            >
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.886 1.48 8.243-7.416-3.968-7.416 3.968 1.48-8.243-6.064-5.886 8.332-1.151z" />
            </svg>
        );
    }

    return <div className="flex space-x-0.5">{stars}</div>;
};

/**
 * Renders a single testimonial card.
 * NOTE: The `p-4` padding here is what controls the spacing *between* cards.
 */
const ReviewCard = ({ review }) => (
    // Slide container: h-full. We will add a small negative margin to resolve fractional display issues.
    <div className="p-4 h-[400px] w-[350] -mr-0.5 z-10">
        {/* Card wrapper: h-full ensures it stretches to the slide container's height. */}
        <div className="bg-[white] rounded-2xl p-6 sm:p-8 h-full min-h-[320px] flex flex-col shadow-lg">
            {/* Header (Name and Date) */}
            <div className="flex justify-between items-start mb-6 border-b border-gray-200 pb-4">
                <div className="flex flex-col space-y-1">
                    <p className="font-medium text-gray-900 text-base">
                        {review.name}
                    </p>
                    <StarRating rating={review.rating} />
                </div>
                <span className="text-gray-500 text-sm">{review.date}</span>
            </div>

            {/* Body - use flex-grow to take up remaining vertical space */}
            <div className="mt-4 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {review.title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-base">
                    {review.text}
                </p>
            </div>
        </div>
    </div>
);

/**
 * Renders the large, fixed overall rating circle.
 */
const RatingDisplay = () => (
    // Positioned absolutely to overlap the main content area
    <div className="absolute hidden xl:block top-60 right-50 transform -translate-y-1/2 md:translate-x-1/4 -mt-10 md:mt-0 z-1">
        <div className=" w-48 h-48 sm:w-56 sm:h-56 bg-green-700 rounded-full flex flex-col items-center justify-center text-white shadow-2xl p-4">
            {/* Rating Number */}
            <div className="text-5xl text-[#e2bb80] sm:text-6xl font-extrabold mb-1">
                4.8<span className="text-3xl font-normal">/5</span>
            </div>
            {/* Yellow/Gold Stars for contrast */}
            <div className="flex text-[#e2bb80] text-lg space-x-1 mb-2">
                {Array(5)
                    .fill(0)
                    .map((_, i) => (
                        <svg
                            key={i}
                            className="w-5 h-5 fill-current"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.886 1.48 8.243-7.416-3.968-7.416 3.968 1.48-8.243-6.064-5.886 8.332-1.151z" />
                        </svg>
                    ))}
            </div>
            <p className="text-xs font-medium text-center opacity-80 max-w-[120px]">
                12,598 Verified Reviews
            </p>
        </div>
    </div>
);

export const ClintTestemonialSection = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        arrows: false,
        slidesToShow: 3.5,
        slidesToScroll: 1,
        initialSlide: 0,
        adaptiveHeight: false,
        responsive: [
            { breakpoint: 1200, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
        ],
    };

    // Define the responsive padding utility for reuse
    const containerPadding = "px-6 sm:px-12 lg:px-20";

    return (
        // 1. Outer container: Full width, no horizontal padding here.
        <div className="min-h-screen bg-white overflow-hidden pt-30  font-sans py-16 relative">
            {/* 2. Inner Content Wrapper: Used for content that *should* be constrained (Title, Rating Circle) */}
            <div className={`w-full mx-auto  ${containerPadding}`}>
                {/* Title (Uses the padding utility) */}
                <h1 className="text-4xl sm:text-5xl font-light text-gray-900 mb-20 max-w-lg">
                    What client says
                </h1>

                {/* Rating Display (Positioned absolutely relative to the main outer div) */}
                <RatingDisplay />
            </div>

            {/* 3. Carousel Area: Pulled out to full screen width.
                 - **Negative Margins (Crucial):** `-${containerPadding}` pulls the container left and right 
                   to counteract the padding of its parent section.
                 - **Overflow Hidden (Crucial):** Clips the fractional card, creating the "peek" effect.
            */}
            <div
                // Dynamically apply negative margins based on the padding of the main container
                className={`relative bg-[#f9f5f0] pt-12 `}
            >
                <Slider {...settings} className="pl-25 z-20">
                    {testimonials.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
                </Slider>
            </div>
        </div>
    );
};
