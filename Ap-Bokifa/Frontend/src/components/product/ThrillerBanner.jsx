import React from "react";

const ThrillerBanner = () => {
    return (
        <div className="relative w-full mx-auto p-4 bg-[white]">
            {/* Main Container: Handles the rounded corners, shadow, and full background image */}
            <div
                className="relative overflow-hidden rounded-3xl shadow-2xl min-h-[400px]"
                style={{
                    // IMPORTANT: Replace this with your actual image path
                    backgroundImage: `url('/src/assets/ThrillerBanner.webp')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    // The image provides the dark teal/graveyard look, so no background color needed unless it fails to load
                }}
            >
                {/* 2. Left Content Area (Text and Button) - Positioned to match the image */}
                {/* We use specific padding and a max-width to position the content correctly. */}
                <div className="relative z-10 pt-16 pb-16 pl-16 md:pl-20 lg:pl-24 h-full flex flex-col justify-center min-h-[450px]">
                    <div className="">
                        {/* Best Collection - Color, size, and weight match */}
                        <p className="text-sm font-semibold text-[#fcd34d] mb-2">
                            Best Collection
                        </p>

                        {/* TOP FAVOURITE THRILLER STORIES - Large, bold, white, and tightly spaced */}
                        {/* leading-none and tracking-tight ensure the text blocks are compact. */}
                        <h1 className="text-[3.25rem] md:text-5xl font-extrabold text-white leading-[1.05] tracking-tight mb-4">
                            TOP FAVOURITE <br />
                            THRILLER STORIES
                        </h1>

                        {/* Description - Slightly muted text color */}
                        <p className="text-gray-200 text-base mb-8 max-w-sm">
                            Find our take on the best books of all time.
                        </p>

                        {/* Discover Now Button - White, rounded, with shadow */}
                        <button className="self-start bg-white text-gray-900 font-semibold py-3 px-8 rounded-full shadow-lg hover:text-white hover:bg-green-700 transition duration-300 flex items-center">
                            Discover Now
                            {/* Arrow Icon */}
                            <span className="ml-2">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThrillerBanner;
