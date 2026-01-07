import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CustomDropdown = ({
  options,
  placeholder,
  value,
  onChange,
  icon: Icon,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-14 px-5 bg-white border rounded-xl flex items-center justify-between cursor-pointer transition-all ${
          isOpen
            ? "border-[#5BBB7B] ring-1 ring-[#5BBB7B]"
            : error
            ? "border-red-500 ring-1 ring-red-500/20"
            : "border-slate-200"
        } ${Icon ? "pl-14" : "px-5"} focus-glow`}
      >
        {Icon && (
          <Icon
            className={`absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${
              isOpen || value ? "text-[#5BBB7B]" : "text-slate-400"
            }`}
            size={20}
          />
        )}

        <div className="relative flex-1 flex items-center h-full">
          <label
            className={`absolute left-0 transition-all duration-300 pointer-events-none truncate
              ${
                isOpen || value
                  ? `-top-2 text-xs ${
                      error ? "text-red-500" : "text-[#5BBB7B]"
                    } bg-white px-2 -ml-2 scale-90`
                  : `top-1/2 -translate-y-1/2 text-[15px] ${
                      error ? "text-red-400" : "text-slate-400"
                    }`
              }`}
          >
            {placeholder}
          </label>

          {value && (
            <motion.span
              key="value"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[15px] text-slate-800"
            >
              {value}
            </motion.span>
          )}
        </div>

        <ChevronDown
          className={`text-slate-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={20}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-[100] top-[110%] left-0 w-full bg-white border border-slate-200 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
              {/* Added a first item that acts like the placeholder/header in user's image */}
              <div
                className="px-5 py-2.5 text-[15px] bg-[#2D6AD2] text-white cursor-pointer"
                onClick={() => handleSelect("")}
              >
                {placeholder}
              </div>
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`px-5 py-2.5 text-[15px] cursor-pointer transition-colors hover:text-white hover:bg-[#2D6AD2] ${
                    value === option
                      ? "text-[#5BBB7B] font-medium"
                      : "text-slate-600"
                  }`}
                >
                  {option}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomDropdown;
