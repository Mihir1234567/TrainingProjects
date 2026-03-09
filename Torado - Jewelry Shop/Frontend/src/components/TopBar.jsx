import React, { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  User,
  ChevronDown,
} from "lucide-react";

const TopBar = () => {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("Eng");

  const languages = [
    { name: "Eng", code: "en" },
    { name: "简体", code: "zh" },
    { name: "Spa", code: "es" },
    { name: "Rus", code: "ru" },
  ];

  return (
    <div className="hidden md:flex bg-[#CB927A] text-white py-3 md:py-4 px-4 flex-col md:flex-row justify-center md:justify-between items-center text-sm font-medium relative z-50 gap-y-3 md:gap-y-0 text-center">
      {/* Left: Social Media */}
      <div className="flex items-center justify-center space-x-3 md:space-x-4">
        <span className="opacity-90 tracking-wide">Follow us:</span>
        <div className="flex space-x-3">
          <Facebook
            size={16}
            className="cursor-pointer hover:text-black transition-all transform hover:scale-125 duration-200"
          />
          <Instagram
            size={16}
            className="cursor-pointer hover:text-black transition-all transform hover:scale-125 duration-200"
          />
          <Twitter
            size={16}
            className="cursor-pointer hover:text-black transition-all transform hover:scale-125 duration-200"
          />
          <Youtube
            size={16}
            className="cursor-pointer hover:text-black transition-all transform hover:scale-125 duration-200"
          />
        </div>
      </div>

      {/* Center: Message */}
      <div className="w-full md:w-auto md:flex-1 tracking-wide">
        Free shipping on all orders over $50
      </div>

      {/* Right: Account & Language */}
      <div className="flex items-center justify-center space-x-6">
        <div className="flex items-center space-x-2 cursor-pointer hover:text-black transition-all group">
          <User
            size={16}
            className="group-hover:scale-110 transition-transform"
          />
          <span className="group-hover:translate-x-0.5 transition-transform">
            My Account
          </span>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <div
            className="flex items-center space-x-1 cursor-pointer hover:text-black transition-all group"
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
          >
            <span className="group-hover:translate-x-0.5 transition-transform">
              {currentLanguage}
            </span>
            <ChevronDown
              size={14}
              className={`transition-all duration-300 ${isLanguageOpen ? "rotate-180" : ""} group-hover:scale-110`}
            />
          </div>

          {/* Dropdown Menu */}
          {isLanguageOpen && (
            <div className="absolute right-0 mt-4 w-32 bg-white border  border-gray-100 shadow-lg rounded-sm overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="flex flex-col ">
                {languages.map((lang, index) => (
                  <button
                    key={lang.code}
                    className={`px-4 py-3 text-left transition-colors duration-150 ${
                      currentLanguage === lang.name
                        ? "bg-[#CB927A] text-white font-semibold"
                        : "text-gray-700 hover:bg-[#CB927A] hover:text-white"
                    } ${index !== languages.length - 1 ? "border-b border-gray-100" : ""}`}
                    onClick={() => {
                      setCurrentLanguage(lang.name);
                      setIsLanguageOpen(false);
                    }}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
