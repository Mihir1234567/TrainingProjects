import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MattersToUs from "../components/common/MattersToUs";
import AnimatedButton from "../components/common/AnimatedButton";

const MyAccountPage = () => {
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'register' | 'reset'

  // Form States
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    terms: false,
  });
  const [resetData, setResetData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
    remember: false,
  });

  // Error States
  const [errors, setErrors] = useState({});

  const tabs = [
    { id: "login", label: "Login" },
    { id: "register", label: "Register" },
    { id: "reset", label: "Reset Password" },
  ];

  // Helper Functions
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Handlers
  const handleInputChange = (e, formType, field) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (formType === "login")
      setLoginData((prev) => ({ ...prev, [field]: value }));
    else if (formType === "register")
      setRegisterData((prev) => ({ ...prev, [field]: value }));
    else if (formType === "reset")
      setResetData((prev) => ({ ...prev, [field]: value }));

    // Clear specific error on change
    if (errors[`${formType}_${field}`]) {
      setErrors((prev) => ({ ...prev, [`${formType}_${field}`]: null }));
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!loginData.username.trim())
      newErrors.login_username = "Username is required";
    if (!loginData.password) newErrors.login_password = "Password is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Login Success", loginData);
      // Proceed with login logic
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!registerData.email || !validateEmail(registerData.email))
      newErrors.register_email = "Please enter a valid email";
    if (!registerData.password || registerData.password.length < 6)
      newErrors.register_password = "Password must be at least 6 characters";
    if (registerData.password !== registerData.repeatPassword)
      newErrors.register_repeatPassword = "Passwords do not match";
    if (!registerData.terms)
      newErrors.register_terms = "You must accept the terms";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Register Success", registerData);
      // Proceed with registration logic
    }
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!resetData.email || !validateEmail(resetData.email))
      newErrors.reset_email = "Please enter a valid email";
    if (!resetData.newPassword || resetData.newPassword.length < 6)
      newErrors.reset_newPassword = "Password must be at least 6 characters";
    if (resetData.newPassword !== resetData.confirmPassword)
      newErrors.reset_confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Reset Success", resetData);
      // Proceed with reset logic
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-slate-50 py-10 md:py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-[#05264E] mb-3">
          My Account
        </h1>
        <p className="text-slate-500">
          <Link
            to="/"
            className="text-[#05264E] hover:text-[#5BBB7B] transition-colors"
          >
            Home
          </Link>{" "}
          / <span className="text-[#5BBB7B]">My Account</span>
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow container mx-auto px-4 lg:px-12 mb-20">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Sidebar / Tabs */}
          <div className="w-full lg:w-1/3">
            <div className="bg-[#F5F7FC] p-4 md:p-8 rounded-lg overflow-x-auto no-scrollbar">
              <div className="flex lg:flex-col gap-1 min-w-max lg:min-w-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setErrors({}); // Clear errors on tab switch
                    }}
                    className={`text-left px-4 md:px-6 py-3 md:py-4 rounded transition-all duration-300 font-medium whitespace-nowrap lg:whitespace-normal ${
                      activeTab === tab.id
                        ? "bg-white text-[#5BBB7B] shadow-sm translate-x-0 lg:translate-x-1"
                        : "text-slate-600 hover:text-[#5BBB7B] hover:translate-x-0 lg:hover:translate-x-1"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form Area */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-6 md:p-12 rounded-lg border border-slate-100 shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Title of current form - Optional if design matches simple inputs */}

                  {activeTab === "login" && (
                    <form
                      className="space-y-6"
                      onSubmit={handleLoginSubmit}
                      noValidate
                    >
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 hidden">
                          Username
                        </label>
                        <input
                          type="text"
                          placeholder="Username"
                          value={loginData.username}
                          onChange={(e) =>
                            handleInputChange(e, "login", "username")
                          }
                          className={`w-full px-5 py-4 bg-[#F5F7FC] border rounded focus:outline-none focus:bg-white transition-colors text-slate-600 ${
                            errors.login_username
                              ? "border-red-500 focus:border-red-500"
                              : "border-transparent focus:border-[#5BBB7B]"
                          }`}
                        />
                        {errors.login_username && (
                          <p className="text-red-500 text-xs pl-1">
                            {errors.login_username}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-slate-700 hidden">
                          Password
                        </label>
                        <input
                          type="password"
                          placeholder="Password"
                          value={loginData.password}
                          onChange={(e) =>
                            handleInputChange(e, "login", "password")
                          }
                          className={`w-full px-5 py-4 bg-[#F5F7FC] border rounded focus:outline-none focus:bg-white transition-colors text-slate-600 ${
                            errors.login_password
                              ? "border-red-500 focus:border-red-500"
                              : "border-transparent focus:border-[#5BBB7B]"
                          }`}
                        />
                        {errors.login_password && (
                          <p className="text-red-500 text-xs pl-1">
                            {errors.login_password}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={loginData.remember}
                            onChange={(e) =>
                              handleInputChange(e, "login", "remember")
                            }
                            className="w-4 h-4 rounded border-gray-300 text-[#5BBB7B] focus:ring-[#5BBB7B]"
                          />
                          Remember me
                        </label>
                        <a href="#" className="text-[#5BBB7B] hover:underline">
                          Lost your password?
                        </a>
                      </div>

                      <AnimatedButton type="submit" className="w-full">
                        Log In
                      </AnimatedButton>

                      <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-slate-400">
                            Or
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button
                          type="button"
                          className="w-full py-3 px-4 bg-[#3b5998] hover:bg-[#344e86] text-white font-medium rounded transition-colors flex items-center justify-center gap-2"
                        >
                          Log In With Facebook
                        </button>
                        <button
                          type="button"
                          className="w-full py-3 px-4 bg-[#ea4335] hover:bg-[#d33a2c] text-white font-medium rounded transition-colors flex items-center justify-center gap-2"
                        >
                          Log In With Google
                        </button>
                      </div>
                    </form>
                  )}

                  {activeTab === "register" && (
                    <form
                      className="space-y-6"
                      onSubmit={handleRegisterSubmit}
                      noValidate
                    >
                      <div className="space-y-2">
                        <input
                          type="email"
                          placeholder="Email"
                          value={registerData.email}
                          onChange={(e) =>
                            handleInputChange(e, "register", "email")
                          }
                          className={`w-full px-5 py-4 bg-[#F5F7FC] border rounded focus:outline-none focus:bg-white transition-colors text-slate-600 ${
                            errors.register_email
                              ? "border-red-500 focus:border-red-500"
                              : "border-transparent focus:border-[#5BBB7B]"
                          }`}
                        />
                        {errors.register_email && (
                          <p className="text-red-500 text-xs pl-1">
                            {errors.register_email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <input
                          type="password"
                          placeholder="Password"
                          value={registerData.password}
                          onChange={(e) =>
                            handleInputChange(e, "register", "password")
                          }
                          className={`w-full px-5 py-4 bg-[#F5F7FC] border rounded focus:outline-none focus:bg-white transition-colors text-slate-600 ${
                            errors.register_password
                              ? "border-red-500 focus:border-red-500"
                              : "border-transparent focus:border-[#5BBB7B]"
                          }`}
                        />
                        {errors.register_password && (
                          <p className="text-red-500 text-xs pl-1">
                            {errors.register_password}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <input
                          type="password"
                          placeholder="Repeat Password"
                          value={registerData.repeatPassword}
                          onChange={(e) =>
                            handleInputChange(e, "register", "repeatPassword")
                          }
                          className={`w-full px-5 py-4 bg-[#F5F7FC] border rounded focus:outline-none focus:bg-white transition-colors text-slate-600 ${
                            errors.register_repeatPassword
                              ? "border-red-500 focus:border-red-500"
                              : "border-transparent focus:border-[#5BBB7B]"
                          }`}
                        />
                        {errors.register_repeatPassword && (
                          <p className="text-red-500 text-xs pl-1">
                            {errors.register_repeatPassword}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <input
                            type="checkbox"
                            checked={registerData.terms}
                            onChange={(e) =>
                              handleInputChange(e, "register", "terms")
                            }
                            className="w-4 h-4 rounded border-gray-300 text-[#5BBB7B] focus:ring-[#5BBB7B]"
                          />
                          <span>
                            I Accept All{" "}
                            <a href="#" className="text-[#5BBB7B]">
                              Terms Of Conditions
                            </a>
                          </span>
                        </div>
                        {errors.register_terms && (
                          <p className="text-red-500 text-xs pl-1">
                            {errors.register_terms}
                          </p>
                        )}
                      </div>

                      <AnimatedButton type="submit" className="w-full">
                        Register Now
                      </AnimatedButton>
                    </form>
                  )}

                  {activeTab === "reset" && (
                    <form
                      className="space-y-6"
                      onSubmit={handleResetSubmit}
                      noValidate
                    >
                      <div className="space-y-2">
                        <input
                          type="email"
                          placeholder="Email"
                          value={resetData.email}
                          onChange={(e) =>
                            handleInputChange(e, "reset", "email")
                          }
                          className={`w-full px-5 py-4 bg-[#F5F7FC] border rounded focus:outline-none focus:bg-white transition-colors text-slate-600 ${
                            errors.reset_email
                              ? "border-red-500 focus:border-red-500"
                              : "border-transparent focus:border-[#5BBB7B]"
                          }`}
                        />
                        {errors.reset_email && (
                          <p className="text-red-500 text-xs pl-1">
                            {errors.reset_email}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <input
                          type="password"
                          placeholder="New Password"
                          value={resetData.newPassword}
                          onChange={(e) =>
                            handleInputChange(e, "reset", "newPassword")
                          }
                          className={`w-full px-5 py-4 bg-[#F5F7FC] border rounded focus:outline-none focus:bg-white transition-colors text-slate-600 ${
                            errors.reset_newPassword
                              ? "border-red-500 focus:border-red-500"
                              : "border-transparent focus:border-[#5BBB7B]"
                          }`}
                        />
                        {errors.reset_newPassword && (
                          <p className="text-red-500 text-xs pl-1">
                            {errors.reset_newPassword}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <input
                          type="password"
                          placeholder="Confirm Password"
                          value={resetData.confirmPassword}
                          onChange={(e) =>
                            handleInputChange(e, "reset", "confirmPassword")
                          }
                          className={`w-full px-5 py-4 bg-[#F5F7FC] border rounded focus:outline-none focus:bg-white transition-colors text-slate-600 ${
                            errors.reset_confirmPassword
                              ? "border-red-500 focus:border-red-500"
                              : "border-transparent focus:border-[#5BBB7B]"
                          }`}
                        />
                        {errors.reset_confirmPassword && (
                          <p className="text-red-500 text-xs pl-1">
                            {errors.reset_confirmPassword}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-slate-500">
                        <input
                          type="checkbox"
                          checked={resetData.remember}
                          onChange={(e) =>
                            handleInputChange(e, "reset", "remember")
                          }
                          className="w-4 h-4 rounded border-gray-300 text-[#5BBB7B] focus:ring-[#5BBB7B]"
                        />
                        <span>Remember me</span>
                      </div>

                      <AnimatedButton type="submit" className="w-full">
                        Submit Now
                      </AnimatedButton>
                    </form>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section - MattersToUs */}
      <MattersToUs
        title="What Matters To You Matters To Us"
        description="Salary. Diversity. Benefits. Location. Everything you're looking for."
        ctaTitle="On Untapped, You Own Your Story!"
        ctaButtonText="Read Why"
      />
    </div>
  );
};

export default MyAccountPage;
