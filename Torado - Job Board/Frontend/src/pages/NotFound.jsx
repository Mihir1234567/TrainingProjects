import React from "react";
import { Link } from "react-router-dom";
import notFoundImg from "../assets/404.png";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 md:p-12">
      <div className="w-full max-w-xs md:max-w-sm mb-6 md:mb-8">
        <img
          src={notFoundImg}
          alt="404 Error: Page Not Found"
          className="w-full h-auto object-contain"
        />
      </div>

      <h1 className="text-xl md:text-3xl font-bold text-[#083E47] mb-4 text-center">
        Error 404 : Page Not Found
      </h1>

      <p className="text-gray-500 text-center max-w-md mb-6 md:mb-8 leading-relaxed">
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>

      <Link
        to="/"
        className="relative overflow-hidden group inline-flex items-center justify-center py-3 px-8 rounded font-semibold text-white bg-[#5BBB7B] shadow-lg transition-all"
      >
        <span className="absolute inset-0 w-full h-full bg-[#083E47] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
        <span className="relative z-10">Return To Home Page</span>
      </Link>
    </div>
  );
};

export default NotFound;
