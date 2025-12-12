import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react"; // Assuming lucide-react is available, or use fontawesome

const LoginPromptModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      {/* Modal Content */}
      <div
        className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-x"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className="p-8 text-center bg-white">
          <div className="w-16 h-16 bg-[#3AB757]/10 rounded-full flex items-center justify-center mx-auto mb-6 text-[#3AB757]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-lock"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h3 className="text-2xl font-bold font-serif mb-2 text-gray-900">
            Login Required
          </h3>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Please log in or create an account to perform this action.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              to="/login"
              onClick={onClose}
              className="w-full py-3 bg-[#3AB757] text-white font-bold rounded-full hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              onClick={onClose}
              className="w-full py-3 bg-white text-gray-700 font-bold rounded-full border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPromptModal;
