import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Heart,
  ShoppingBag,
  LayoutGrid,
  ChevronDown,
  Menu,
  MoreHorizontal,
  X,
  Plus,
  Minus,
} from "lucide-react";
import logoMain from "../assets/Logo/logoMain.png";

const Navbar = ({ isSticky }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isIconsDropdownOpen, setIsIconsDropdownOpen] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
        setIsIconsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSubmenu = (name) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const navLinks = [
    { name: "Home", href: "#", hasDropdown: false, active: true },
    { name: "Shop", href: "#", hasDropdown: true },
    { name: "Category", href: "#", hasDropdown: false },
    { name: "Pages", href: "#", hasDropdown: true },
    { name: "Blog", href: "#", hasDropdown: true },
    { name: "Contact Us", href: "#", hasDropdown: false },
  ];

  return (
    <nav
      ref={navRef}
      className={`py-4 px-4 md:px-8 left-0 right-0 z-40 transition-all duration-300 ${
        isSticky
          ? "fixed top-0 bg-white shadow-md py-2"
          : "absolute top-0 bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-12">
          {/* Left: Logo */}
          <div className="flex items-center cursor-pointer">
            <img src={logoMain} alt="Torado Logo" className="h-10 w-auto" />
          </div>

          {/* Navigation Links */}
          <div className="max-[1199px]:hidden min-[1200px]:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className={`${
                  link.name !== "Shop" ? "relative" : ""
                } group cursor-pointer flex items-center space-x-1 py-4`}
              >
                <span
                  className={`text-base font-medium transition-all duration-300 hover:text-[#CB927A] transform hover:scale-105 ${
                    link.active ? "text-[#CB927A]" : "text-gray-700"
                  }`}
                >
                  {link.name}
                </span>
                {link.hasDropdown && (
                  <ChevronDown
                    size={14}
                    className="text-gray-400 group-hover:text-[#CB927A] transition-colors"
                  />
                )}

                {/* Pages Dropdown */}
                {link.name === "Pages" && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-2xl py-6 px-4 border border-gray-50 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                    <div className="flex flex-col space-y-1">
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all group/item"
                      >
                        About Us
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all group/item"
                      >
                        Gallery
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all group/item"
                      >
                        FAQ
                      </a>
                      <div className="relative group/subitem">
                        <a
                          href="#"
                          className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all"
                        >
                          <span>My Account</span>
                          <ChevronDown
                            size={14}
                            className="-rotate-90 text-gray-400 group-hover/subitem:text-[#CB927A]"
                          />
                        </a>
                        {/* My Account Sub-menu */}
                        <div className="absolute top-0 right-full mr-2 w-48 bg-white shadow-xl rounded-2xl py-4 px-2 border border-gray-50 opacity-0 invisible -translate-x-4 group-hover/subitem:opacity-100 group-hover/subitem:visible group-hover/subitem:translate-x-0 transition-all duration-300 ease-out z-50">
                          <div className="flex flex-col space-y-1">
                            <a
                              href="#"
                              className="flex items-center px-4 py-2 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-sm font-medium transition-all"
                            >
                              My Account
                            </a>
                            <a
                              href="#"
                              className="flex items-center px-4 py-2 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-sm font-medium transition-all"
                            >
                              Reset Password
                            </a>
                          </div>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all group/item"
                      >
                        Terms & Conditions
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all group/item"
                      >
                        Refund Policy
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all group/item"
                      >
                        Privacy Policy
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all group/item"
                      >
                        404 Error
                      </a>
                    </div>
                  </div>
                )}

                {/* Blog Dropdown */}
                {link.name === "Blog" && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-2xl py-6 px-4 border border-gray-50 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                    <div className="flex flex-col space-y-1">
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all"
                      >
                        Standard
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all"
                      >
                        Blog Grid
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all"
                      >
                        Blog Grid Mix
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all"
                      >
                        Right Sidebar
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all"
                      >
                        Left Sidebar
                      </a>
                      <a
                        href="#"
                        className="flex items-center px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all"
                      >
                        List View
                      </a>

                      {/* Others Nested */}
                      <div className="relative group/subitem">
                        <a
                          href="#"
                          className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all"
                        >
                          <span>Others</span>
                          <ChevronDown
                            size={14}
                            className="-rotate-90 text-gray-400 group-hover/subitem:text-[#CB927A]"
                          />
                        </a>
                        <div className="absolute top-0 right-full mr-2 w-48 bg-white shadow-xl rounded-2xl py-4 px-2 border border-gray-50 opacity-0 invisible -translate-x-4 group-hover/subitem:opacity-100 group-hover/subitem:visible group-hover/subitem:translate-x-0 transition-all duration-300 ease-out z-50">
                          <div className="flex flex-col space-y-1">
                            <a
                              href="#"
                              className="flex items-center px-4 py-2 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-sm font-medium transition-all"
                            >
                              Author
                            </a>
                            <a
                              href="#"
                              className="flex items-center px-4 py-2 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-sm font-medium transition-all"
                            >
                              Categories
                            </a>
                            <a
                              href="#"
                              className="flex items-center px-4 py-2 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-sm font-medium transition-all"
                            >
                              Tags
                            </a>
                            <a
                              href="#"
                              className="flex items-center px-4 py-2 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-sm font-medium transition-all"
                            >
                              Date
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Single Post Nested */}
                      <div className="relative group/subitem">
                        <a
                          href="#"
                          className="flex items-center justify-between px-4 py-3 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-base font-medium transition-all"
                        >
                          <span>Single Post</span>
                          <ChevronDown
                            size={14}
                            className="-rotate-90 text-gray-400 group-hover/subitem:text-[#CB927A]"
                          />
                        </a>
                        <div className="absolute top-0 right-full mr-2 w-56 bg-white shadow-xl rounded-2xl py-4 px-2 border border-gray-50 opacity-0 invisible -translate-x-4 group-hover/subitem:opacity-100 group-hover/subitem:visible group-hover/subitem:translate-x-0 transition-all duration-300 ease-out z-50">
                          <div className="flex flex-col space-y-1">
                            <a
                              href="#"
                              className="flex items-center px-4 py-2 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-sm font-medium transition-all"
                            >
                              Without Sidebar
                            </a>
                            <a
                              href="#"
                              className="flex items-center px-4 py-2 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-sm font-medium transition-all"
                            >
                              Right Sidebar
                            </a>
                            <a
                              href="#"
                              className="flex items-center px-4 py-2 text-gray-700 hover:text-[#CB927A] hover:bg-gray-50 rounded-lg text-sm font-medium transition-all"
                            >
                              Left Sidebar
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mega Menu for Shop */}
                {link.name === "Shop" && (
                  <div className="absolute top-full left-4 right-4 md:left-8 md:right-8 bg-white shadow-xl rounded-2xl py-12 px-8 md:px-16 border border-gray-50 opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-out z-50">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                      {/* Column 1 */}
                      <div className="flex flex-col space-y-4">
                        <a
                          href="/shopDefault"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Shop Default
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Shop Left Sidebar
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Shop Right Sidebar
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Shop Banner
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Shop Grid 2 Columns
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Shop Grid 3 Columns
                        </a>
                      </div>
                      {/* Column 2 */}
                      <div className="flex flex-col space-y-4">
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Shop Grid 4 Columns
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Shop Grid 5 Columns
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Shop List View
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Shop Without Sidebar
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors font-bold"
                        >
                          Product Default
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Product Preorders
                        </a>
                      </div>
                      {/* Column 3 */}
                      <div className="flex flex-col space-y-4">
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Product Gallery Thumbnails
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Product Bottom Thumbnails
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Product Left Thumbnails
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Product Right Thumbnails
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Product Drawer Sidebar
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Product Countdown
                        </a>
                      </div>
                      {/* Column 4 */}
                      <div className="flex flex-col space-y-4">
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Cart
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Wishlist
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors font-bold"
                        >
                          Checkout
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Track My Order
                        </a>
                        <a
                          href="#"
                          className="text-gray-600 hover:text-[#CB927A] text-sm font-medium transition-colors"
                        >
                          Find A Store
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="max-[1199px]:hidden min-[1200px]:flex items-center space-x-6">
          <Search
            size={24}
            className="text-gray-900 cursor-pointer hover:text-[#CB927A] transition-all transform hover:scale-110 duration-300"
          />

          <div className="relative cursor-pointer group">
            <Heart
              size={24}
              className="text-gray-900 group-hover:text-[#CB927A] transition-all transform group-hover:scale-110 duration-300"
            />
            <span className="absolute -top-2 -right-2 bg-[#CB927A] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FCF4E9] font-bold group-hover:bg-black transition-colors duration-300">
              2
            </span>
          </div>

          <div className="relative cursor-pointer group">
            <ShoppingBag
              size={24}
              className="text-gray-900 group-hover:text-[#CB927A] transition-all transform group-hover:scale-110 duration-300"
            />
            <span className="absolute -top-2 -right-2 bg-[#CB927A] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FCF4E9] font-bold group-hover:bg-black transition-colors duration-300">
              3
            </span>
          </div>

          <LayoutGrid
            size={24}
            className="text-gray-900 cursor-pointer hover:text-[#CB927A] transition-all transform hover:scale-110 duration-300"
          />
        </div>

        {/* Mobile Navbar Actions (< 1200px) */}
        <div className="flex min-[1200px]:hidden items-center space-x-4 relative">
          <MoreHorizontal
            size={24}
            onClick={() => {
              setIsIconsDropdownOpen(!isIconsDropdownOpen);
              if (!isIconsDropdownOpen) setIsMobileMenuOpen(false);
            }}
            className="text-[#CB927A] cursor-pointer hover:text-black transition-colors"
          />
          {isMobileMenuOpen ? (
            <X
              size={24}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-900 cursor-pointer hover:text-[#CB927A] transition-colors"
            />
          ) : (
            <Menu
              size={24}
              onClick={() => {
                setIsMobileMenuOpen(true);
                setIsIconsDropdownOpen(false);
              }}
              className="text-gray-900 cursor-pointer hover:text-[#CB927A] transition-colors"
            />
          )}

          {/* Mobile Icons Dropdown (< 1200px) */}
          <div
            className={`absolute top-full right-0 mt-4 bg-white shadow-xl rounded-lg py-4 px-6 border border-gray-100 flex items-center space-x-6 z-50 transition-all duration-500 ease-out origin-top-right ${
              isIconsDropdownOpen
                ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
                : "opacity-0 scale-95 pointer-events-none -translate-y-4"
            }`}
          >
            <Search
              size={22}
              className="text-gray-900 cursor-pointer hover:text-[#CB927A] transition-colors"
            />
            <div className="relative cursor-pointer">
              <Heart
                size={22}
                className="text-gray-900 hover:text-[#CB927A] transition-colors"
              />
              <span className="absolute -top-2 -right-2 bg-[#CB927A] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FCF4E9] font-bold">
                2
              </span>
            </div>
            <div className="relative cursor-pointer">
              <ShoppingBag
                size={22}
                className="text-gray-900 hover:text-[#CB927A] transition-colors"
              />
              <span className="absolute -top-2 -right-2 bg-[#CB927A] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#FCF4E9] font-bold">
                3
              </span>
            </div>
            <LayoutGrid
              size={22}
              className="text-gray-900 cursor-pointer hover:text-[#CB927A] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Mobile Main Navigation Menu (< 1200px) */}
      <div
        className={`absolute top-full left-4 right-4 bg-white shadow-xl border border-gray-100/50 rounded-b-lg z-50 overflow-hidden transition-all duration-500 ease-out origin-top ${
          isMobileMenuOpen
            ? "opacity-100 max-h-[80vh] translate-y-0 pointer-events-auto"
            : "opacity-0 max-h-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col py-2 px-6 overflow-y-auto max-h-[80vh]">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="flex flex-col border-b border-gray-100 last:border-0"
            >
              <div
                className="flex items-center justify-between py-4 cursor-pointer text-gray-700 hover:text-[#CB927A] transition-colors"
                onClick={() => link.hasDropdown && toggleSubmenu(link.name)}
              >
                <span
                  className={`text-[15px] font-medium ${link.active ? "text-[#CB927A]" : ""}`}
                >
                  {link.name}
                </span>
                {link.hasDropdown && (
                  <div className="text-gray-500">
                    {openSubmenus[link.name] ? (
                      <Minus
                        size={16}
                        className="transition-transform duration-300 rotate-180"
                      />
                    ) : (
                      <Plus
                        size={16}
                        className="transition-transform duration-300"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Submenu Content */}
              {link.hasDropdown && (
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                    openSubmenus[link.name]
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-col pb-4 pl-4 space-y-3">
                      {link.name === "Shop" && (
                        <>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            Shop Default
                          </a>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            Shop Left Sidebar
                          </a>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            Shop Right Sidebar
                          </a>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            Shop Banner
                          </a>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            Shop Grid 2 Columns
                          </a>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            Shop Grid 3 Columns
                          </a>
                        </>
                      )}
                      {link.name === "Pages" && (
                        <>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            About Us
                          </a>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            Gallery
                          </a>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            FAQ
                          </a>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            My Account
                          </a>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            Terms & Conditions
                          </a>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            Privacy Policy
                          </a>
                        </>
                      )}
                      {link.name === "Blog" && (
                        <>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            Standard
                          </a>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            Blog Grid
                          </a>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            Left Sidebar
                          </a>
                          <a
                            href="#"
                            className="text-[14px] text-gray-500 hover:text-[#CB927A] transition-colors"
                          >
                            Right Sidebar
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
