import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      {/* Main Content Wrapper */}
      <div className="flex-1 flex justify-center items-center w-full">
        {/* Main Card */}
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-[450px] transition-all duration-300">
          
          {/* App Title */}
          <div className="title text-center mb-8">
            <h1 className="text-xl font-medium text-gray-900">Ap Bokifa</h1>
          </div>

          {/* Subtitles */}
          <div className="text-left mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Log in</h2>
            <p className="text-gray-500 text-[15px] mt-1">Welcome back to Ap Bokifa</p>
          </div>

          {/* Shop Button */}
          <div className="shopBtn mb-6">
            <button className="w-full bg-[#5a31f4] hover:bg-[#4c28d4] text-white font-medium py-3 rounded-lg flex justify-center items-center transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]">
              Log in with <span className="font-bold italic ml-1">shop</span>
            </button>
          </div>

          {/* Divider (OR) */}
          <div className="or flex items-center justify-between mb-6">
            <span className="h-px bg-gray-200 flex-1"></span>
            <span className="text-gray-500 text-sm px-4">or</span>
            <span className="h-px bg-gray-200 flex-1"></span>
          </div>

          {/* Email Input */}
          <div className="Emailtext mb-4">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-blue-600 rounded-lg px-4 py-3 text-gray-700 outline-none focus:ring-1 focus:ring-blue-600 transition-all duration-200"
            />
          </div>

          {/* Continue Button */}
          <div className="continue">
            <button 
              disabled={!email}
              className={`w-full font-medium py-3 rounded-lg transition-colors ${
                email 
                  ? "bg-[#F3F3F3] hover:bg-[#e5e5e5] text-gray-600 cursor-pointer" 
                  : "bg-gray-100 text-gray-400 cursor-default"
              }`}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <div className="py-6 text-center">
        <a href="#" className="text-blue-500 text-sm hover:underline">Privacy policy</a>
      </div>
    </div>
  );
};

export default Login;
