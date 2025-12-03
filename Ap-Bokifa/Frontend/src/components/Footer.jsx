/* d:/Projects/Ap-Bokifa-main/src/components/Footer.jsx */
import React, { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";

// Helper data for links to keep JSX clean (NO CHANGES HERE)
const categories = [
    { name: "Action Books", href: "#" },
    { name: "Comedy", href: "#" },
    { name: "Drama", href: "#" },
    { name: "Horror", href: "#" },
    { name: "Kids Books", href: "#" },
    { name: "Top 50 Books", href: "#" },
];

const usefulLinks = [
    { name: "Secure Shopping", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Use", href: "#" },
    { name: "Shipping Policy", href: "#" },
    { name: "Returns Policy", href: "#" },
    { name: "Payment Option", href: "#" },
];

const exploreLinks = [
    { name: "About us", href: "#" },
    { name: "Store Locator", href: "#" },
    { name: "Kids Club", href: "#" },
    { name: "Blogs", href: "#" },
];

const getInTouchLinks = [
    { name: "Careers", href: "#" },
    { name: "Become a Franchisee", name: "Become a Franchisee", href: "#" },
    { name: "Contact Us", href: "#" },
];

// Reusable Link List Component (NO CHANGES HERE)
const FooterLinkList = ({ title, links }) => (
    <div>
        {/* HEADING: text-lg for a bigger font */}
        <h3 className="text-lg font-medium text-gray-800 pb-3 mb-4 border-b border-gray-300 tracking-wider">
            {title}
        </h3>
        {/* LINKS: space-y-3. Links are text-base */}
        <ul className="space-y-3">
            {links.map((link) => (
                <li key={link.name}>
                    <a
                        href={link.href}
                        className="text-base text-gray-600 hover:text-green-700 transition-colors"
                    >
                        {link.name}
                    </a>
                </li>
            ))}
        </ul>
    </div>
);

const Footer = () => {
    // 1. State for Back-to-Top button visibility
    const [isVisible, setIsVisible] = useState(false);

    // Function to handle scrolling to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    // Function to check scroll position and update visibility state
    const handleScroll = () => {
        // Show the button after scrolling down more than 300px
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Effect to attach and clean up the scroll listener
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            
            {/* Main Footer Wrapper */}
            <footer className="bg-white relative pt-12">
                {/* Main content container */}
                <div className="container mx-auto px-6">
                    {/* 🔑 UPDATED GRID FOR BETTER RESPONSIVENESS */}
                    {/* Top Section Grid: 1 column on small, 3 columns on medium, 6 columns on large */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
                        {/* Column 1: Brand and Contact */}
                        {/* Spans 2 columns on medium/small screens, 2 on large screens */}
                        <div className="sm:col-span-2 lg:col-span-2">
                            {/* Bokifa Logo/Brand Name: text-3xl */}
                            <a
                                href="#"
                                className="flex items-center space-x-2 text-3xl font-bold text-green-700"
                            >
                                <img
                                    src="/src/assets/logo_full.webp"
                                    alt="Bokifa Logo"
                                />
                            </a>

                            {/* Description text: text-base */}
                            <p className="text-base text-gray-700 mt-5 mb-8 leading-relaxed">
                                Bokifa draws book lovers of all ages into a
                                community, engage with booklovers and meet their
                                favourite literary personalities.
                            </p>

                            {/* Phone Number: text-3xl font-bold, with the requested color #e2bb80 */}
                            <p
                                className="text-3xl font-bold"
                                style={{ color: "#e2bb80" }}
                            >
                                +(84) - 1800 - 4635
                            </p>

                            {/* Email address: text-base */}
                            <p className="text-base text-gray-700 mt-3">
                                contact@example.com
                            </p>
                        </div>

                        {/* Link Columns: Now takes up the remaining columns efficiently */}
                        {/* On small screens, they stack. On medium screens, they flow in 2-3 columns. */}
                        <FooterLinkList title="Category" links={categories} />
                        <FooterLinkList
                            title="Useful links"
                            links={usefulLinks}
                        />
                        <FooterLinkList title="Explore" links={exploreLinks} />
                        <FooterLinkList
                            title="Get in touch"
                            links={getInTouchLinks}
                        />
                    </div>
                </div>

                {/* --- */}

                {/* Bottom Section: Copyright and Payment */}
                <div className=" border-t border-gray-200 py-10 mt-16 ">
                    <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                        {/* Copyright Text: text-sm, text-gray-500 */}
                        {/* 🔑 Added margin bottom on smaller screens (mb-4) to separate from payment icons */}
                        <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
                            Copyright © 2025{" "}
                            <span className="font-semibold text-green-700">
                                Bokifa
                            </span>
                            . All rights reserved
                        </p>
                        <div className="flex items-center">
                            {/* Placeholder for the Payment Icons */}
                            <div>
                                <img
                                    src="/src/assets/pay.webp"
                                    alt="Payment Methods"
                                />{" "}
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* FIXED "Back to Top" Button */}
            {/* The visibility logic is maintained here */}
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-20 right-6 bg-black text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 z-50"
                    aria-label="Back to top"
                >
                    <IoIosArrowUp className="w-5 h-5" />
                </button>
            )}
        </>
    );
};

export default Footer;