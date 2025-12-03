import React from "react";
import { FeatureCard } from "./FeatureCard";

// Card Data - Mocking the content, colors, and placeholder images
const cardData = [
    {
        id: 1,
        category: "Game: Anime: Life",
        title: "COLLECT SHOP",
        image: "/src/assets/CollectShop.webp",
    },
    {
        id: 2,
        category: "New this week.",
        title: "THE TRUTH LIES HERE",
        image: "/src/assets/TheTruthLiesHere.webp",
    },
    {
        id: 3,
        category: "Fiction bestsellers.",
        title: "WOMAN IN THE WATER",
        image: "/src/assets/WomenInTheWater.webp",
    },
];

// Main App Component
export const BannerGrid = () => {
    return (
        // Enhanced responsiveness for padding:
        // px-4 (small phones) -> sm:px-8 (tablets) -> lg:px-12 (desktops)
        <div className="font-sans px-4 sm:px-8 lg:px-12 pt-4  sm:pt-8 pb-30 bg-gray-50">
            <header className="mb-6 sm:mb-8">
                {/* Enhanced responsiveness for header size:
                    text-2xl (small phones) -> sm:text-3xl (tablets) -> lg:text-4xl (desktops) */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                    Featured Collections
                </h1>
            </header>

            {/* Responsive Grid Container: 
                On small screens (default), it's a single column.
                On large screens (lg), it switches to three columns. 
                Added md:grid-cols-2 for a two-column layout on medium screens (tablets). */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {cardData.map((card) => (
                    <FeatureCard
                        key={card.id}
                        category={card.category}
                        title={card.title}
                        image={card.image}
                    />
                ))}
            </div>
        </div>
    );
};
