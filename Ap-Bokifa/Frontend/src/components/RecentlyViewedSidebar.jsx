import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // NEW: Import motion and AnimatePresence
import useRecentlyViewed from "../hooks/useRecentlyViwed";
import { useNavigate } from "react-router-dom";

// --- Component for a single product card inside the sidebar grid (Unchanged) ---
const SidebarProductGridCard = ({ item }) => {
    const navigate = useNavigate();
    return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer" onClick={() => navigate(`/product/${item.id}`)}>
        <div className="relative w-full aspect-[2/3] overflow-hidden">
            <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
        </div>
        <div className="p-3 text-left">
            <h4 className="text-lg font-semibold text-gray-800 line-clamp-2 transition-colors duration-200 group-hover:text-green-600">
                {item.title}
            </h4>
            <p className="text-2xl font-bold text-green-700 mt-1">
                ${Number(item.price).toFixed(2)}
            </p>
        </div>
    </div>
    );
};

// --- Main Sidebar Component (Rotation Logic MODIFIED) ---
const RecentlyViewedSidebar = () => {
    const { viewedItems, hasViewedItems } = useRecentlyViewed();
    const [isOpen, setIsOpen] = useState(false);

    // State to track which item is currently on top (index)
    const [currentTopItemIndex, setCurrentTopItemIndex] = useState(0);

    // NEW STATES for the fade effect
    const [isFading, setIsFading] = useState(false);
    const [lastTopItem, setLastTopItem] = useState(null);

    const openSidebar = () => setIsOpen(true);
    const closeSidebar = () => setIsOpen(false);

    const itemCount = viewedItems.length;
    const shouldRotate = itemCount > 1 && !isOpen;

    // --- EFFECT FOR IMAGE ROTATION (MODIFIED) ---
    useEffect(() => {
        if (!shouldRotate) {
            return;
        }

        const ROTATION_INTERVAL_MS = 3000;
        const FADE_DURATION_MS = 700; // Match this to transition-opacity duration

        const intervalId = setInterval(() => {
            setCurrentTopItemIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % itemCount;

                // 1. Start the fade-out of the old image by setting the 'last' state
                // Ensure we have a valid item to set as lastTopItem
                setLastTopItem(viewedItems[prevIndex]);

                // 2. Set isFading to true to apply the starting opacity (0) to the new image
                setIsFading(true);

                // 3. After the duration of the transition, reset isFading
                setTimeout(() => {
                    setIsFading(false);
                }, FADE_DURATION_MS);

                return nextIndex;
            });
        }, ROTATION_INTERVAL_MS);

        return () => clearInterval(intervalId);
    }, [shouldRotate, itemCount, viewedItems]); // Depend on viewedItems for lastTopItem update

    // Get the product data for the top and background images (Unchanged logic, just different variables)
    const topItem = viewedItems[currentTopItemIndex];
    const middleItemIndex = (currentTopItemIndex + 1) % itemCount;
    const backItemIndex = (currentTopItemIndex + 2) % itemCount;

    const middleItem = viewedItems[middleItemIndex];
    const backItem = viewedItems[backItemIndex];

    return (
        <>
            {/* 1. Floating Button: Image display logic (z-index adjusted to be lower than open sidebar) */}
            {hasViewedItems && (
                <button
                    onClick={openSidebar}
                    className="fixed bottom-20 left-5 z-40 w-25 h-25 rounded-full bg-white shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300 ease-in-out flex items-center justify-center"
                    title={`Recently Viewed Products (${itemCount})`}
                >
                    {shouldRotate ? (
                        // ** STACKED IMAGE VIEW with Rotation **
                        <div className="relative w-full h-full rounded-full">
                            {" "}
                            {/* Added a relative container */}
                            {/* Back and Middle items remain subtle (Unchanged) */}
                            {backItem && backItem.id && ( // Ensure backItem and its id exist
                                <img
                                    key={backItem.id}
                                    src={backItem.imageUrl}
                                    alt={backItem.title}
                                    className="absolute w-2/3 h-2/3 object-cover rounded-full z-10 opacity-70 transform -translate-x-1 translate-y-1"
                                />
                            )}
                            {middleItem && middleItem.id && ( // Ensure middleItem and its id exist
                                <img
                                    key={middleItem.id}
                                    src={middleItem.imageUrl}
                                    alt={middleItem.title}
                                    className="absolute w-3/4 h-3/4 object-cover rounded-full z-20 opacity-90 transform translate-x-1 -translate-y-1"
                                />
                            )}
                            {/* NEW: Old image is displayed underneath and will visually "fade out" */}
                            {lastTopItem && lastTopItem.id && ( // Ensure lastTopItem and its id exist
                                <img
                                    key={lastTopItem.id}
                                    src={lastTopItem.imageUrl}
                                    alt={lastTopItem.title}
                                    // The old image provides the background while the new one fades in
                                    className="absolute w-full h-full object-cover rounded-full z-30"
                                />
                            )}
                            {/* Top Item: This is the NEW item that fades IN */}
                            {topItem && topItem.id && ( // Ensure topItem and its id exist
                                <img
                                    key={topItem.id} // This key is crucial for React to re-render
                                    src={topItem.imageUrl}
                                    alt={topItem.title}
                                    // Key classes for fade: opacity-0 when starting fade, transition-opacity for animation
                                    className={`absolute w-full h-full object-cover rounded-full z-40 transition-opacity duration-700 ease-in-out ${
                                        isFading ? "opacity-0" : "opacity-100" // Opacity is controlled by isFading state
                                    }`}
                                />
                            )}
                            {/* Item Counter (Unchanged) */}
                            <span className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full z-50 transform translate-x-1/4 -translate-y-1/4">
                                {itemCount}
                            </span>
                        </div>
                    ) : (
                        // ** SINGLE IMAGE VIEW (itemCount is 1 or shouldRotate is false) **
                        topItem && topItem.id && ( // Ensure topItem and its id exist
                            <img
                                key={topItem.id} // Ensure key is present here too
                                src={topItem.imageUrl}
                                alt={topItem.title}
                                className="w-full h-full object-cover"
                            />
                        )
                    )}
                </button>
            )}

            {/* 2 & 3. Backdrop and Sidebar Panel (Now using Framer Motion for spring animation) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* 2. Backdrop (Framer Motion Fade) */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            // Using a high z-index to overlay content, consistent with Navbar sidebars
                            className="fixed inset-0 backdrop-filter bg-black/75 z-[900]"
                            onClick={closeSidebar}
                        />

                        {/* 3. Sidebar Panel (Framer Motion Spring Slide-in) */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            // UNIFORM ANIMATION: Matching the spring settings from Navbar.jsx
                            transition={{
                                type: "spring",
                                stiffness: 120,
                                damping: 20,
                            }}
                            className="fixed top-0 right-0 w-[480px] max-w-full h-full bg-white shadow-2xl z-[1000] flex flex-col"
                        >
                            <div className="flex justify-between items-center p-4 border-b bg-gray-50 flex-shrink-0">
                                <h2 className="text-xl font-bold text-gray-800">
                                    Recently viewed products
                                </h2>
                                <button
                                    onClick={closeSidebar}
                                    className="text-gray-500 hover:text-gray-800 text-3xl transition"
                                    aria-label="Close sidebar"
                                >
                                    &times;
                                </button>
                            </div>

                            {/* Grid layout for sidebar content (Updated for flex-grow) */}
                            <div className="p-4 overflow-y-auto flex-grow">
                                <div className="grid grid-cols-2 gap-4">
                                    {viewedItems.map((item) => (
                                        <SidebarProductGridCard
                                            key={item.id}
                                            item={item}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default RecentlyViewedSidebar;
