/* d:/Projects/Ap-Bokifa-main/src/components/Navbar.jsx */
// components/Navbar.jsx

import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
// IMPORTANT: You must install and wrap your App in a <BrowserRouter>
import { Link } from "react-router-dom";

// --- Custom Hook to detect screen size ---
const useIsDesktop = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024); // 1024px is Tailwind's lg breakpoint

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isDesktop;
};

// --- Icon Components ---
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-6 w-6"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
    />
  </svg>
);

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

// UPDATED: Replaced chevron with custom image
const ChevronDownIcon = () => (
  <img
    src="/src/assets/DownDropdownArrow.png"
    alt="v"
    className="ml-1 w-3 h-3 object-contain mt-0.5"
  />
);

// --- Dropdown (Click-based) ---
const Dropdown = ({ selected, items, onSelect, buttonClass, menuClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative" ref={ref}>
      <button
        className={`flex items-center hover:text-[#1D4A34] ${buttonClass}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected} <ChevronDownIcon />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full   bg-white shadow-lg rounded-md py-2 z-50 overflow-y-auto max-h-[360px] ${menuClass}`}
          >
            {items.map((item) => (
              <button
                key={item}
                onClick={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {item}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- NavDropdown (Hover-based) ---
// components/Navbar.jsx

// --- NavDropdown (Hover-based) ---
const NavDropdown = ({ title, items, menuClass, buttonClass = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useIsDesktop();
  const isMegaMenu = !Array.isArray(items);

  // --- START: Fix for sticky/fixed gap (v2) ---
  const navDropdownRef = useRef(null); // Ref for the parent wrapper
  const buttonRef = useRef(null); // <-- NEW: Ref for the button itself
  const [dropdownTop, setDropdownTop] = useState(0); // State to hold the top position

  const handleMouseEnter = () => {
    // <-- MODIFIED: Measure the button, not the wrapper
    if (isMegaMenu && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect(); // <-- Measure the button
      setDropdownTop(rect.bottom);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  // --- END: Fix for sticky/fixed gap ---

  const renderMenuContent = () => {
    // ... (This entire function remains unchanged) ...
    if (isMegaMenu) {
      if (title === "Home" && items.layouts) {
        return (
          <div className="py-8 px-8 max-w-screen-2xl mx-auto">
            <div className="flex justify-between space-x-4">
              {items.layouts.map((layout, index) => (
                <Link // Use Link
                  key={index}
                  to={layout.path || "#"} // Use 'to' and 'path'
                  className="flex flex-col items-center group w-1/5 min-w-0"
                >
                  <div className="relative overflow-hidden rounded-md shadow-lg transition duration-300 group-hover:shadow-xl group-hover:scale-[1.01]">
                    <img
                      src={layout.imageSrc}
                      alt={layout.title}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <p className="mt-4 font-medium text-black decoration-2 underline hover:text-[#3AB757] transition-all duration-300 ease-in-out text-center text-sm tracking-normal hover:tracking-widest">
                    {layout.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        );
      }

      const columnKeys = Object.keys(items).filter((key) => key !== "promo");

      return (
        <div className="flex justify-start py-6 px-8 gap-16 max-w-screen-2xl mx-auto">
          <div className="flex gap-16">
            {columnKeys.map((columnTitle) => (
              <div key={columnTitle} className="min-w-[150px]">
                <h4 className="font-bold text-sm text-[#1D4A34] mb-3 uppercase tracking-wider">
                  {columnTitle}
                </h4>
                {items[columnTitle].map((item) => {
                  if (item.onClick) {
                    return (
                      <button
                        key={item.title}
                        onClick={(e) => {
                          e.preventDefault();
                          item.onClick(e);
                        }}
                        className="block text-sm text-gray-700 py-1.5 hover:text-[#3AB757] text-left w-full"
                      >
                        {item.title}
                      </button>
                    );
                  }
                  return (
                    <Link // Use Link
                      key={item.title} // Use object title
                      to={item.path || "#"} // Use object path
                      className="block text-sm text-gray-700 py-1.5 hover:text-[#3AB757]"
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="ml-auto w-[550px] h-[300px] flex-shrink-0">
            <div className="bg-gradient-to-r from-[#1D4A34] to-[#3AB757] p-8 rounded-lg text-white h-full flex relative overflow-hidden bg-[url('/src/assets/WomenInTheWater.webp')] bg-cover bg-center">
              <div className="w-1/3 flex items-center justify-start py-4 pr-4"></div>

              <div className="w-3/5 flex flex-col justify-center text-right pl-4">
                <p className="text-md mb-2 text-white/80">Five day sale!</p>
                <h1 className="text-6xl font-extrabold mb-4 text-white">
                  Save 50%
                </h1>
                <p className="text-base mb-6 text-white/90">
                  Use code BIGSALE50 at checkout
                </p>
                <button className="bg-white text-[#1D4A34] font-semibold py-2 px-4 rounded-full self-end w-3/4 hover:bg-green-100 transition duration-150">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (Array.isArray(items)) {
      return (
        <>
          {items.map((item, index) => (
            <Link // Use Link
              key={item.title} // Use object title
              to={item.path || "#"} // Use object path
              className={`block px-4 py-3 text-gray-800 hover:text-[#3AB757] hover:bg-gray-100 ${
                index < items.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              {item.title}
            </Link>
          ))}
        </>
      );
    }
    return null;
  };

  const dropdownClasses = isMegaMenu
    ? `fixed left-0 right-0 w-full border-b border-gray-200`
    : `absolute top-full left-0 w-48 border-b border-gray-200`;

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter} // Use the new handler
      onMouseLeave={handleMouseLeave} // Use the new handler
      ref={navDropdownRef} // This ref is for the parent div
    >
      <button
        ref={buttonRef} // <-- NEW: Add the buttonRef here
        className={`flex items-center justify-center py-4 text-gray-800 font-medium hover:text-[#3AB757] ${buttonClass}`}
      >
        {title} <ChevronDownIcon />
      </button>

      {isDesktop && (
        <motion.div
          // FIX: Use visibility: 'hidden' for performance on hover
          initial={{ opacity: 0, y: -10, visibility: "hidden" }}
          animate={{
            opacity: isOpen ? 1 : 0,
            y: isOpen ? 0 : -10,
            visibility: isOpen ? "visible" : "hidden",
          }}
          // Apply the calculated top position using an inline style
          style={isMegaMenu ? { top: `${dropdownTop}px` } : {}}
          transition={{ duration: 0.2 }}
          className={`mt-0 bg-white shadow-xl z-10 
                                    overflow-y-auto max-h-[70vh] 
                                    ${dropdownClasses} ${menuClass}`}
        >
          {/* UNIFIED GREEN BORDER: Apply green border for all dropdowns here */}
          <div className="h-0.5 bg-[#3AB757] w-full"></div>
          {renderMenuContent()}
        </motion.div>
      )}
    </div>
  );
};
// --- END NavDropdown FIX ---

// --- NEW COMPONENT: UserDropdown (Hover-based for User Icon) ---
const UserDropdown = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className="relative flex items-center h-6 w-6" // Hides the default UserIcon padding
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="text-gray-600 hover:text-[#1D4A34]">
        <UserIcon />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute top-full right-0 mt-4 
                                        bg-white shadow-lg rounded-md py-2 z-50 w-40`}
          >
            {items.map((item) => {
              if (item.action) {
                return (
                  <button
                    key={item.title}
                    onClick={() => {
                      item.action();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm whitespace-nowrap"
                  >
                    {item.title}
                  </button>
                );
              }
              return (
                <Link // Use Link
                  key={item.title}
                  to={item.path || "#"} // Use 'to' and 'path'
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 text-sm whitespace-nowrap"
                >
                  {item.title}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
// --- END NEW COMPONENT ---

// --- MobileNestedDropdown (from previous request) ---
const MobileNestedDropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="pl-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-2 text-gray-800 font-semibold hover:text-[#3AB757] text-sm"
      >
        {title}
        <motion.span
          className="text-lg font-light"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {items.map((item) => {
              if (item.onClick) {
                return (
                  <button
                    key={item.title}
                    onClick={(e) => item.onClick(e)}
                    className={`block pl-4 pr-4 py-1.5 text-gray-600 hover:text-[#3AB757] hover:bg-gray-100 text-sm text-left w-full`}
                  >
                    {item.title}
                  </button>
                );
              }
              return (
                <Link // Use Link
                  key={item.title}
                  to={item.path || "#"} // Use 'to' and 'path'
                  className={`block pl-4 pr-4 py-1.5 text-gray-600 hover:text-[#3AB757] hover:bg-gray-100 text-sm`}
                >
                  {item.title}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
// --- END MobileNestedDropdown ---

// --- MobileNavItem (Updated from previous request to use MobileNestedDropdown) ---
const MobileNavItem = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isShopLayout =
    !Array.isArray(items) &&
    items &&
    Object.keys(items).filter((key) => key !== "promo").length > 0;
  const isHomeLayout = !Array.isArray(items) && items && items.layouts;

  const isSimpleLink = !items || (Array.isArray(items) && items.length === 0);

  if (isSimpleLink) {
    return (
      <Link // Use Link for simple navigation items like "Contact"
        to={title === "Contact" ? "/contact" : "/"} // Example path for Contact
        className="block py-4 text-gray-800 font-medium hover:text-[#3AB757] border-b border-gray-200"
      >
        {title}
      </Link>
    );
  }

  const renderSubLinks = () => {
    // Case 1: Complex Shop Layout -> Render MobileNestedDropdowns
    if (isShopLayout) {
      const columnKeys = Object.keys(items).filter((key) => key !== "promo");
      return (
        <div className="py-2">
          {columnKeys.map((columnTitle) => (
            <MobileNestedDropdown
              key={columnTitle}
              title={columnTitle}
              items={items[columnTitle]}
            />
          ))}
        </div>
      );
    }

    // Case 2: Simple array or Home Layout (flattens to links)
    let subLinks = [];

    if (Array.isArray(items)) {
      subLinks = items; // Items are already objects {title, path}
    } else if (isHomeLayout) {
      items.layouts.forEach(
        (layout) => subLinks.push({ title: layout.title, path: layout.path }) // Ensure path is included
      );
    }

    return subLinks.map((item, index) => {
      const itemTitle = item.title;
      const itemPath = item.path || "#";

      return (
        <Link // Use Link
          key={itemTitle + index}
          to={itemPath}
          className={`block px-4 py-2 text-gray-600 hover:text-[#3AB757] hover:bg-gray-100`}
        >
          {itemTitle}
        </Link>
      );
    });
  };

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-gray-800 font-medium hover:text-[#3AB757]"
      >
        {title}
        <motion.span
          className="text-xl font-light"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {renderSubLinks()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
// --- END MobileNavItem UPDATE ---

// --- SearchDrawer Component - FIXED ---
// --- SearchDrawer Component - FIXED ---
const SearchDrawer = ({ isOpen, onClose }) => {
  const isDesktop = useIsDesktop();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("PRODUCTS");
  const { products } = useProducts({ limit: 1000 }); // Fetch all products for client-side search

  // Filter Logic
  const filteredProducts = (products || []).filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const filteredArticles = blogData.filter((article) => ... );
  const filteredArticles = []; // Static data removed

  // Define pages locally or pass as prop. Since they are static in Navbar, we can redefine or move them out.
  // For now, I'll redefine the simple list here to avoid prop drilling complexity if they aren't changing.
  const pagesItems = [
    { title: "About Us", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Our Team", path: "/our-team" },
    { title: "FAQs", path: "/FAQ" },
    { title: "LookBook", path: "/lookbook" },
    { title: "404", path: "/PageNotFound" },
  ];

  const filteredPages = pagesItems.filter((page) =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Collections - Mixed static and dynamic
  // 1. Calculate category images
  const categoryImages = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      if (!map[p.category] && p.imageUrl) {
        map[p.category] = p.imageUrl;
      }
    });
    return map;
  }, [products]);

  const uniqueCategories = [...new Set(products.map((p) => p.category))].sort();

  const collectionItems = [
    {
      title: "Shop Left Sidebar",
      path: "/AllProducts",
      image: products[0]?.imageUrl,
    },
    {
      title: "Collection Top",
      path: "/collections/books",
      image: products[1]?.imageUrl,
    },
    {
      title: "List Collection",
      path: "/collections/categories",
      image: products[2]?.imageUrl,
    },
    ...uniqueCategories.map((category) => ({
      title: category,
      path: `/allproducts?category=${encodeURIComponent(category)}`,
      image: categoryImages[category],
    })),
  ];

  const filteredCollections = collectionItems.filter((collection) =>
    collection.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Tab Content Renderer
  const renderTabContent = () => {
    if (!searchQuery) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.2 }}
          className="mt-6"
        >
          <h3 className="font-bold text-xs text-gray-400 mb-4 uppercase tracking-widest border-b border-gray-100 pb-2">
            Popular Searches
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { to: "/collections/categories", label: "All Collections" },
              { to: "/AllProducts", label: "All Products" },
              { to: "/contact", label: "Contact" },
              { to: "/blog/standard", label: "Blog" },
            ].map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="px-5 py-2.5 bg-gray-50 rounded-full text-sm font-medium text-gray-700 hover:bg-[#1D4A34] hover:text-white hover:shadow-md transition-all duration-300"
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      );
    }

    const contentVariants = {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
      exit: { opacity: 0, y: -10, transition: { duration: 0.1 } },
    };

    switch (activeTab) {
      case "PRODUCTS":
        return (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-2 mt-4"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  onClick={onClose}
                  className="flex gap-4 group p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div className="w-16 h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100 relative">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-grow">
                    <h4 className="font-semibold text-gray-900 group-hover:text-[#1D4A34] line-clamp-2 text-sm leading-snug transition-colors">
                      {product.title}
                    </h4>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-[#1D4A34] font-bold text-sm">
                        ${product.price}
                      </span>
                      {product.isSoldOut && (
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-100 px-2 py-0.5 rounded-full tracking-wide">
                          SOLD OUT
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <SearchIcon className="w-12 h-12 mb-3 opacity-20" />
                <p className="text-sm font-medium">No products found</p>
              </div>
            )}
          </motion.div>
        );
      case "ARTICLE":
        return (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-2 mt-4"
          >
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <Link
                  to={`/blog/post/${article.id}`}
                  key={article.id}
                  onClick={onClose}
                  className="flex gap-4 group p-3 rounded-xl hover:bg-gray-50 transition-all duration-300 border border-transparent hover:border-gray-100"
                >
                  <div className="w-24 h-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col justify-center flex-grow">
                    <h4 className="font-semibold text-gray-900 group-hover:text-[#1D4A34] line-clamp-2 text-sm leading-snug transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1 font-medium uppercase tracking-wide group-hover:text-[#1D4A34] transition-colors">
                      Read Article
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <p className="text-sm font-medium">No articles found</p>
              </div>
            )}
          </motion.div>
        );
      case "PAGES":
        return (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-1 mt-4"
          >
            {filteredPages.length > 0 ? (
              filteredPages.map((page) => (
                <Link
                  to={page.path}
                  key={page.title}
                  onClick={onClose}
                  className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 text-gray-700 hover:text-[#1D4A34] transition-all duration-200 group"
                >
                  <span className="font-semibold text-sm">{page.title}</span>
                  <ChevronRightIcon className="w-4 h-4 text-gray-300 group-hover:text-[#1D4A34] transition-colors" />
                </Link>
              ))
            ) : (
              <div className="text-center py-12 text-gray-400">
                <p className="text-sm font-medium">No pages found</p>
              </div>
            )}
          </motion.div>
        );
      case "COLLECTIONS":
        return (
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid grid-cols-2 gap-4 mt-4"
          >
            {filteredCollections.length > 0 ? (
              filteredCollections.map((collection) => (
                <Link
                  to={collection.path}
                  key={collection.title}
                  onClick={onClose}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 hover:border-[#1D4A34] hover:shadow-md transition-all duration-300"
                >
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
                    {collection.image ? (
                      <>
                        <img
                          src={collection.image}
                          alt={collection.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                        <span className="text-xs font-medium">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-white text-center">
                    <h4 className="text-sm font-bold text-gray-800 group-hover:text-[#1D4A34] truncate transition-colors">
                      {collection.title}
                    </h4>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-2 text-center py-12 text-gray-400">
                <p className="text-sm font-medium">No collections found</p>
              </div>
            )}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ x: isDesktop ? "-100%" : "100%" }}
            animate={{ x: 0 }}
            exit={{ x: isDesktop ? "-100%" : "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed top-0 h-full bg-white shadow-lg z-50 w-[500px] max-w-full flex flex-col right-0 lg:left-0"
          >
            <div className="p-6 pb-2">
              <div className="flex justify-between items-center pb-4 border-b border-gray-100 relative">
                <div className="relative flex-grow">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
                    <SearchIcon />
                  </span>
                  <input
                    type="text"
                    placeholder="Search our store..."
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        window.location.href = `/search?q=${searchQuery}`;
                        onClose();
                      }
                    }}
                    className="w-full pl-10 pr-4 py-3 text-gray-900 bg-transparent border-none focus:outline-none placeholder-gray-400 text-xl font-medium"
                  />
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            {searchQuery && (
              <div className="px-6">
                <div className="flex items-center gap-8 py-3 border-b border-gray-100 overflow-x-auto scrollbar-hide">
                  {["PRODUCTS", "ARTICLE", "PAGES", "COLLECTIONS"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap pb-3 border-b-2 transition-all duration-300 ${
                          activeTab === tab
                            ? "text-[#1D4A34] border-[#1D4A34]"
                            : "text-gray-400 border-transparent hover:text-gray-600"
                        }`}
                      >
                        {tab}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 pt-2">
              {renderTabContent()}
            </div>

            {/* Fixed Footer for View All Button */}
            {searchQuery && (
              <div className="p-6 border-t border-gray-100 bg-white">
                {activeTab === "PRODUCTS" && filteredProducts.length > 0 && (
                  <Link
                    to={`/search?q=${searchQuery}`}
                    onClick={onClose}
                    className="block w-full bg-[#1D4A34] text-white py-3.5 rounded-xl text-center font-semibold text-sm hover:bg-[#153827] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    View All Results ({filteredProducts.length})
                  </Link>
                )}
                {activeTab === "ARTICLE" && filteredArticles.length > 0 && (
                  <Link
                    to="/blog/standard"
                    onClick={onClose}
                    className="block w-full bg-[#1D4A34] text-white py-3.5 rounded-xl text-center font-semibold text-sm hover:bg-[#153827] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    View All Articles
                  </Link>
                )}
              </div>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 backdrop-filter bg-black/75 z-40 transform"
            onClick={onClose}
          />
        </>
      )}
    </AnimatePresence>
  );
};

import { useCurrency } from "../context/CurrencyContext";
import { useWishlist } from "../context/WishlistContext";
import { useCompare } from "../context/CompareContext";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../hooks/useProducts"; // ADDED
import CartDrawer from "./CartDrawer";

// --- Navbar (Main Component) ---
// 1. Accept the `onUpsellClick` prop
const Navbar = ({
  onUpsellClick,
  onCrossSellClick,
  onCouponClick,
  isSearchOpen,
  onSearchClose,
  onSearchOpen,
}) => {
  // --- State and Handlers ---
  const quotes = [
    "All books at least 50% off list prices every day",
    "All books at least 50% off list prices every day ",
    "All books at least 50% off list prices every day  ",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBannerOpen, setIsBannerOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- Sticky Navbar Logic ---
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show fixed navbar after scrolling down 300px
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const nextQuote = () => setCurrentIndex((prev) => (prev + 1) % quotes.length);
  const prevQuote = () =>
    setCurrentIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  const currentQuote = quotes[currentIndex];

  const { currency, changeCurrency } = useCurrency();
  const { wishlist } = useWishlist();
  const { compareList } = useCompare();
  const { getCartCount } = useCart();
  const [selectedLanguage, setSelectedLanguage] = useState("ENGLISH");

  const currencies = [
    "USD $",
    "EUR €",
    "GBP £",
    "CAD C$",
    "AUD A$",
    "JPY ¥",
    "CNY ¥",
    "INR ₹",
    "BRL R$",
    "MXN $",
  ];
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Dutch",
    "Russian",
    "Chinese",
    "Japanese",
  ];

  // --- Data (UPDATED for React Router: path instead of href) ---
  const homeMegaMenu = {
    layouts: [
      {
        title: "Home One",
        path: "/",
        imageSrc: "/src/assets/Home1.avif",
      },
      {
        title: "Home Two",
        path: "/",
        imageSrc: "/src/assets/Home2.avif",
      },
      {
        title: "Home Three",
        path: "/",
        imageSrc: "/src/assets/Home3.avif",
      },
      {
        title: "Home Four",
        path: "/",
        imageSrc: "/src/assets/Home4.avif",
      },
      {
        title: "Home Five",
        path: "/",
        imageSrc: "/src/assets/Home5.avif",
      },
    ],
  };
  // Use the mega menu layouts for the mobile simple links
  const homeItems = homeMegaMenu.layouts.map((item) => ({
    title: item.title,
    path: item.path,
  }));

  const shopItems = {
    "Shop Layout": [
      { title: "Shop Left Sidebar", path: "/AllProducts" },
      { title: "Collection Top", path: "/collections/books" },
      { title: "List Collection", path: "/collections/categories" },
      { title: "Coupon", onClick: (e) => onCouponClick(e) },
    ],
    "Product Layout": [
      { title: "Classic", path: "/productPageClassic" },
      { title: "Scroll Fixes", path: "/productPageScrollFixed" },
      { title: "Left Thumbnail", path: "/productPageLeftThumbs" },
      { title: "Right Thumbnail", path: "/productPageRightThumbs" },
      { title: "Without Thumbnail", path: "/productPageWithoutThumbs" },
    ],

    "Product Type": [
      { title: "With Video", path: "/typeWithVideo" },
      {
        title: "Upssell",
        path: "/product/variable",
        onClick: (e) => onUpsellClick(e),
      },
      {
        title: "Crosssel",
        path: "/product/external",
        onClick: (e) => onCrossSellClick(e),
      },
      { title: "Soldout - In Coming", path: "/product/21" },
      { title: "Product Countdown", path: "/product/1" },
    ],
  };

  const blogItems = [
    { title: "Blog - Standard", path: "/blog/standard" },
    { title: "Blog - Grid", path: "/blog/grid" },
    { title: "Single Post", path: "/blog/post/1" },
  ];
  const pagesItems = [
    { title: "About Us", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Our Team", path: "/our-team" },
    { title: "FAQs", path: "/FAQ" },
    { title: "LookBook", path: "/lookbook" },
    { title: "404", path: "/PageNotFound" },
  ];

  // 🚀 Dynamic User Menu Logic
  const { user, logout, isAuthenticated } = useAuth();

  const userMenuItems = isAuthenticated
    ? [
        { title: `Hello, ${user?.name || "User"}`, path: "#" },
        { title: "My Orders", path: "/my-orders" },
        {
          title: `Wishlist (${wishlist.filter((i) => i.imageUrl).length})`,
          path: "/wishlist",
        },
        {
          title: `Compare (${compareList.filter((i) => i.imageUrl).length})`,
          path: "/compare",
        },
        { title: "Check out", path: "/cart" },
        { title: "Logout", action: logout },
      ]
    : [
        { title: "Login", path: "/login" },
        { title: "Sign Up", path: "/signup" },
        { title: "Check out", path: "/cart" },
        {
          title: `Wishlist (${wishlist.filter((i) => i.imageUrl).length})`,
          path: "/wishlist",
        },
        {
          title: `Compare (${compareList.filter((i) => i.imageUrl).length})`,
          path: "/compare",
        },
      ];

  // Reusable Logo Component
  const Logo = () => (
    <Link // Use Link
      to="/"
      className="text-2xl font-bold text-[#1D4A34] flex items-center"
    >
      <img src="/src/assets/logo_full.webp" alt="Logo" />
    </Link>
  );

  return (
    <>
      {/* Top Banner (kept outside the sticky header so it scrolls away) */}
      {isBannerOpen && (
        // MODIFIED: bg-[#1D4A34] changed to bg-[#09331a], removed fixed height h-8, added min-h
        <div className="relative bg-[#09331a] text-white text-center py-2 px-4 md:px-8 min-h-[32px] flex items-center justify-center">
          <div className="relative flex items-center justify-center w-full max-w-lg mx-auto px-8 py-1">
            <button
              className="absolute left-0 top-1/2 -translate-y-1/2 hover:opacity-75 md:-left-8 hidden md:block"
              onClick={prevQuote}
            >
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>

            <AnimatePresence mode="wait">
              <motion.span
                key={currentQuote}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white font-medium text-center text-sm md:text-base leading-tight"
              >
                {currentQuote}
              </motion.span>
            </AnimatePresence>
            <button
              className="absolute right-0 top-1/2 -translate-y-1/2 hover:opacity-75 md:-right-8 hidden md:block"
              onClick={nextQuote}
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Z-INDEX FIX: Changed z-50 to z-30 */}
      {/* Z-INDEX FIX: Changed z-50 to z-30 */}
      <header
        className={`transition-all duration-300 ${
          isScrolled
            ? "fixed top-0 left-0 right-0 z-50 bg-white shadow-md animate-slideDown"
            : "relative z-30 bg-white shadow-sm"
        }`}
      >
        {/* Main Navigation */}
        <div className="py-6">
          <div className="flex justify-between items-center gap-4 px-4">
            {/* LEFT COLUMN: Mobile icons OR Desktop Logo */}
            <div className="flex items-center gap-4">
              {/* Mobile Icons (Hamburger + Search) */}
              <div className="flex items-center gap-4 lg:hidden">
                <button
                  className="text-gray-600 hover:text-[#1D4A34]"
                  onClick={() => setIsMenuOpen(true)}
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>
                <button // Changed <a> to <button> for non-navigation action
                  className="text-gray-600 hover:text-[#1D4A34]"
                  onClick={onSearchOpen}
                >
                  <SearchIcon />
                </button>
              </div>
              {/* Desktop Logo */}
              <div className="hidden lg:block flex-shrink-0">
                <Logo />
              </div>
            </div>
            {/* CENTER COLUMN: Mobile Logo OR Desktop Search Bar */}
            <div className="lg:flex-grow lg:max-w-3xl">
              {/* Mobile Logo */}
              <div className="lg:hidden flex-shrink-0">
                <Logo />
              </div>
              {/* Desktop Search Bar - MODIFIED SECTION */}
              <div className="hidden lg:flex w-full  rounded-full  overflow-hidden  shadow-md ">
                <input
                  type="text"
                  placeholder="Search our store..."
                  // MODIFIED: Added padding, removed borders, adjusted background, and made it fully rounded-left
                  className="w-full  px-6 py-3  text-gray-700  bg-white   border-0   rounded-l-full   focus:outline-none  cursor-pointer"
                  onFocus={onSearchOpen}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      window.location.href = `/search?q=${e.target.value}`;
                      onSearchClose();
                    }
                  }}
                  // readOnly // REMOVED readOnly to allow typing
                />
                <button className=" px-8   py-3  text-white bg-[#027a36]  rounded-full  hover:bg-[#1D4A34] flex items-center gap-2">
                  <SearchIcon />
                  Search
                </button>
              </div>
            </div>
            {/* RIGHT COLUMN: Dropdowns and Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Currency/Language */}
              <div className="hidden lg:flex items-center space-x-2 sm:space-x-4 text-sm text-gray-600">
                <Dropdown
                  selected={currency}
                  items={currencies}
                  onSelect={changeCurrency}
                  buttonClass="text-sm"
                  menuClass="mt-2 w-32"
                />
                <Dropdown
                  selected={selectedLanguage}
                  items={languages}
                  onSelect={setSelectedLanguage}
                  buttonClass="text-sm"
                  menuClass="mt-2 w-32"
                />
              </div>
              {/* Action Icons */}
              <UserDropdown items={userMenuItems} />
              <Link // Use Link
                to="/wishlist"
                className="relative text-gray-600 hover:text-[#1D4A34]"
              >
                <HeartIcon />
                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs text-white bg-[#3AB757] rounded-full">
                  {wishlist.filter((item) => item.imageUrl).length}
                </span>
              </Link>
              {/* Cart Icon - UPDATED to open Drawer */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-gray-600 hover:text-[#1D4A34] group"
              >
                <CartIcon />
                <span className="absolute -top-2 -right-2 bg-[#3AB757] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Links (Desktop) */}
        <div className="border-t border-gray-200">
          <div className="max-w-screen-2xl mx-auto px-8 flex justify-between items-center">
            <nav className="hidden lg:flex space-x-8">
              {/* MODIFIED: Added buttonClass="!text-[#3AB757]" */}
              <NavDropdown
                title="Home"
                items={homeMegaMenu}
                buttonClass="!text-[#3AB757]"
              />

              <NavDropdown title="Shop" items={shopItems} />
              <NavDropdown title="Blogs" items={blogItems} />
              <NavDropdown title="Pages" items={pagesItems} />
              <Link // Use Link
                to="/contact"
                className="flex items-center py-4 text-gray-800 font-medium hover:text-[#3AB757]"
              >
                Contact
              </Link>

              {/* --- 2. NEW LINK (DESKTOP) --- */}

              {/* --- END NEW LINK --- */}
            </nav>
            <div className="hidden lg:block text-gray-800">
              <span>Need help? Call Us: </span>
              <a
                href="tel:+84250088833"
                className="font-semibold text-[#1D4A34]"
              >
                +84 2500 888 33
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu (Side Drawer) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              // ANIMATION FIX: Uses fast tween
              transition={{
                type: "tween",
                duration: 0.25,
              }}
              // Z-INDEX FIX: Changed z-[100] to z-50
              className="fixed top-0 left-0 w-80 max-w-full h-full bg-white shadow-lg z-50 flex flex-col"
            >
              <div className="p-4 flex justify-end items-center border-b border-gray-200">
                <button onClick={() => setIsMenuOpen(false)}>
                  <XMarkIcon className="h-6 w-6 text-gray-600" />
                </button>
              </div>
              <div className="p-4 flex-grow overflow-y-auto">
                <MobileNavItem title="Home" items={homeItems} />
                <MobileNavItem title="Shop" items={shopItems} />
                <MobileNavItem title="Blogs" items={blogItems} />
                <MobileNavItem title="Pages" items={pagesItems} />
                {/* MobileNavItem handles the link internally */}
                <MobileNavItem title="Contact" items={[]} />

                {/* --- 3. NEW LINK (MOBILE) --- */}

                {/* --- END NEW LINK (MOBILE) --- */}

                <div className="pt-6 border-t border-gray-200 mt-4 flex justify-center">
                  <Logo />
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <Link // Use Link
                  to="/login"
                  className="flex items-center space-x-3 text-gray-800 hover:text-[#1D4A34] font-medium"
                >
                  <UserIcon className="h-5 w-5" />
                  <span>Login</span>
                </Link>
              </div>
            </motion.div>
            {/* Z-INDEX FIX: Changed z-[900] to z-40 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 backdrop-filter bg-black/75 z-40 transform"
              onClick={() => setIsMenuOpen(false)}
            />
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Search Drawer */}
      {isSearchOpen && (
        <SearchDrawer isOpen={isSearchOpen} onClose={onSearchClose} />
      )}
    </>
  );
};

export default Navbar;
