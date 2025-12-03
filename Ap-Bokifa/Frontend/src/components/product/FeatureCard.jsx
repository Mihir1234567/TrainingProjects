import React from "react";
export const FeatureCard = ({ category, title, image }) => {
    return (
        // Outer container: Establishes 'group' for hover effects, sets size, padding, and main styling.
        <div
            className={`relative group flex items-center p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl overflow-hidden min-h-[270px]`}
        >
            {/* 1. Scaling Background Layer
        - The image is now set using the style attribute for dynamic URL safety.
        - Uses bg-cover and bg-center to fill the space and center the image.
        - The image scales up on hover using group-hover:scale-[1.05].
      */}
            <div
                className={`absolute inset-0 rounded-2xl transition-transform duration-500 group-hover:scale-[1.15] bg-cover bg-center`}
                style={{ backgroundImage: `url(${image})` }}
            />

            {/*
        The separate Book Image Element (2.) has been removed.
      */}

            {/*
        2. Text and Button Content (Right Side)
        - Z-index set to z-20 to ensure text is above the scaling background.
        - The margin is kept to visually offset the content as if the image were still separate.
      */}
            <div className="ml-[100px] sm:ml-[120px] lg:ml-[140px] flex-1 text-white z-20 text-left pl-8">
                <p className="text-xs sm:text-sm font-semibold opacity-75 mb-1 tracking-wide uppercase">
                    {category}
                </p>
                <h2 className="text-xl sm:text-2xl lg:text-4xl font-extrabold leading-tight mb-4">
                    {title}
                </h2>
                {/* Button Wrapper: Ensures the button is pushed to the right edge of the content area. */}
                <div className="flex justify-end">
                    <button className="flex items-center text-sm font-bold tracking-wider py-2 px-4 rounded-full bg-white text-gray-900 shadow-md hover:bg-green-700 hover:text-white transition duration-500">
                        Shop Now
                        {/* Arrow Icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-2 h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/*
        3. Background Decoration Overlay (Now z-10, above the scaling background)
        - This provides a dark layer over the image for text readability.
      */}
            <div className="absolute inset-0 z-10 opacity-50 bg-black/40"></div>
        </div>
    );
};
