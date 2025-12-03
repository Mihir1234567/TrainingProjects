import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const PageHeader = ({ title, breadcrumbTitle, backgroundImage }) => {
  return (
    <div
      className={`relative w-full h-48 md:h-64 flex items-center justify-center overflow-hidden ${
        !backgroundImage ? "bg-[#1a1a1a]" : ""
      }`}
    >
      {backgroundImage && (
        <img
          src={backgroundImage}
          alt={`${title} Background`}
          className="absolute inset-0 w-full h-full object-cover opacity-50"
        />
      )}
      <div className="relative z-10 flex flex-col items-center text-white">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 tracking-wide">
          {title}
        </h1>
        <nav className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-gray-300">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Home size={12} className="mb-0.5" /> Home
          </Link>
          <span>/</span>
          <span>{breadcrumbTitle || title}</span>
        </nav>
      </div>
    </div>
  );
};

export default PageHeader;
