import React from "react";
import PropTypes from "prop-types";

const AnimatedButton = ({
  children,
  onClick,
  type = "button",
  className = "",
  variant = "primary", // primary, outline
  ...props
}) => {
  const baseStyles =
    "relative overflow-hidden group flex items-center justify-center py-4 px-6 rounded font-bold transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed";

  // Default to the green theme used in My Account, but support the blue one if needed
  const variants = {
    primary: "bg-[#5BBB7B] text-white shadow-sm hover:shadow-md",
    outline:
      "bg-white text-[#05264E] border border-gray-200 hover:border-transparent",
    blue: "bg-[#5B6CF6] text-white shadow-sm hover:shadow-md", // Matches Navbar Post Job if needed
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${
        variants[variant] || variants.primary
      } ${className}`}
      {...props}
    >
      {/* The Door Animation Overlay */}
      <span className="absolute inset-0 w-full h-full bg-[#083E47] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>

      {/* Content */}
      <span className="relative z-10 group-hover:text-white transition-colors duration-700 ease-in-out flex items-center gap-2 justify-center w-full">
        {children}
      </span>
    </button>
  );
};

AnimatedButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  variant: PropTypes.string,
};

export default AnimatedButton;
