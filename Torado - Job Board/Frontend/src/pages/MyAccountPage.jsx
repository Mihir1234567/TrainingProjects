import React, { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Mail, Briefcase, LogIn, Eye, EyeOff } from "lucide-react";
import MattersToUs from "../components/common/MattersToUs";
import AnimatedButton from "../components/common/AnimatedButton";
import { useAuth } from "../context/AuthContext";

const MyAccountPage = () => {
  const [activeTab, setActiveTab] = useState("login"); // 'login' | 'register' | 'reset'
  const navigate = useNavigate();
  const { login, register, isLoading } = useAuth();

  // Form States
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    remember: false,
  });
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    role: "candidate",
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

  // Password Visibility States
  const [showPassword, setShowPassword] = useState({
    login: false,
    register: false,
    registerRepeat: false,
    reset: false,
    resetConfirm: false,
  });

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

  const handleCandidateLogin = async () => {
    const candidateData = {
      email: "candidate@example.com",
      password: "password123",
    };
    try {
      await login(candidateData);
      navigate("/user-dashboard");
    } catch (error) {
      console.log("Login failed, trying to register demo candidate...");
      try {
        await register({
          name: "John Doe",
          role: "candidate",
          ...candidateData,
        });
        navigate("/user-dashboard");
      } catch (regError) {
        setErrors({
          login_password: "Demo login failed. Please try manually.",
        });
      }
    }
  };

  const handleEmployerLogin = async () => {
    const employerData = {
      email: "employer@example.com",
      password: "password123",
    };
    try {
      await login(employerData);
      navigate("/user-dashboard");
    } catch (error) {
      console.log("Login failed, trying to register demo employer...");
      try {
        await register({
          name: "Tech Corp",
          role: "employer",
          companyName: "Tech Corp",
          ...employerData,
        });
        navigate("/user-dashboard");
      } catch (regError) {
        setErrors({
          login_password: "Demo login failed. Please try manually.",
        });
      }
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({
        email: loginData.username, // mapping username field to email
        password: loginData.password,
      });
      navigate("/user-dashboard");
    } catch (error) {
      setErrors({ login_password: "Login failed. Check credentials." });
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!registerData.name) newErrors.register_name = "Name is required";
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
      try {
        // Register with actual form data
        await register({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
          role: registerData.role,
        });
        navigate("/complete-profile");
      } catch (error) {
        console.error("Registration Error:", error);
        setErrors({
          ...newErrors,
          register_general:
            error.message || "Registration failed. Please try again.",
        });
      }
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

  const renderInput = (
    formType,
    field,
    label,
    Icon,
    type = "text",
    props = {},
  ) => {
    const errorKey = `${formType}_${field}`;
    const value =
      formType === "login"
        ? loginData[field]
        : formType === "register"
          ? registerData[field]
          : resetData[field];

    // Determine the visibility key for password fields
    const isPasswordField = type === "password";
    let visibilityKey = "";
    if (isPasswordField) {
      if (formType === "login" && field === "password") visibilityKey = "login";
      else if (formType === "register" && field === "password")
        visibilityKey = "register";
      else if (formType === "register" && field === "repeatPassword")
        visibilityKey = "registerRepeat";
      else if (formType === "reset" && field === "newPassword")
        visibilityKey = "reset";
      else if (formType === "reset" && field === "confirmPassword")
        visibilityKey = "resetConfirm";
    }

    const actualType =
      isPasswordField && visibilityKey && showPassword[visibilityKey]
        ? "text"
        : type;

    return (
      <div className="relative group/field">
        <input
          id={`${formType}-${field}`}
          type={actualType}
          placeholder=" "
          value={value}
          onChange={(e) => handleInputChange(e, formType, field)}
          className={`peer w-full h-[60px] pl-16 ${isPasswordField ? "pr-14" : "pr-5"} bg-white border ${
            errors[errorKey]
              ? "border-red-500 ring-1 ring-red-500/20"
              : "border-slate-100 ring-4 ring-transparent"
          } rounded-2xl text-[15px] font-bold text-[#002333] focus:outline-none focus:border-[#5BBB7B] focus:ring-[#5BBB7B]/5 transition-all focus-glow`}
          {...props}
        />
        <div
          className={`absolute left-5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
            errors[errorKey]
              ? "bg-red-50 text-red-400"
              : "bg-slate-50 text-slate-400 group-focus-within/field:bg-[#5BBB7B]/10 group-focus-within/field:text-[#5BBB7B]"
          }`}
        >
          <Icon size={18} strokeWidth={2.5} />
        </div>

        {/* Password Visibility Toggle */}
        {isPasswordField && visibilityKey && (
          <button
            type="button"
            onClick={() =>
              setShowPassword((prev) => ({
                ...prev,
                [visibilityKey]: !prev[visibilityKey],
              }))
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#5BBB7B] transition-colors p-1"
            tabIndex={-1}
          >
            {showPassword[visibilityKey] ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        )}

        <label
          htmlFor={`${formType}-${field}`}
          className={`absolute left-16 top-1/2 -translate-y-1/2 ${
            errors[errorKey] ? "text-red-400" : "text-slate-400"
          } text-[15px] font-bold transition-all pointer-events-none
                     peer-focus:top-0 peer-focus:text-[11px] peer-focus:text-[#5BBB7B] peer-focus:bg-white peer-focus:px-2
                     peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:bg-white peer-[:not(:placeholder-shown)]:px-2 uppercase tracking-wider`}
        >
          {label}
        </label>
        {errors[errorKey] && (
          <p className="text-red-500 text-xs mt-1.5 ml-1 flex items-center gap-1">
            {errors[errorKey]}
          </p>
        )}
      </div>
    );
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
            <div className="bg-white p-6 md:p-12 rounded-2xl border border-slate-100/50 shadow-[0_0_50px_0_rgba(0,0,0,0.08)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Login Form */}
                  {activeTab === "login" && (
                    <form
                      className="space-y-6"
                      onSubmit={handleLoginSubmit}
                      noValidate
                    >
                      {renderInput("login", "username", "Username", User)}
                      {renderInput(
                        "login",
                        "password",
                        "Password",
                        Lock,
                        "password",
                      )}

                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={loginData.remember}
                            onChange={(e) =>
                              handleInputChange(e, "login", "remember")
                            }
                            className="w-4 h-4 rounded border-gray-300 text-[#5BBB7B] focus:ring-[#5BBB7B] transition-colors"
                          />
                          <span className="group-hover:text-[#5BBB7B] transition-colors">
                            Remember me
                          </span>
                        </label>
                        <a href="#" className="text-[#5BBB7B] hover:underline">
                          Lost your password?
                        </a>
                      </div>

                      {/* Main Login Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 px-6 bg-[#5BBB7B] hover:bg-torado-green-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-[#5BBB7B]/30 flex items-center justify-center gap-2 group active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
                      >
                        {isLoading ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Logging in...
                          </>
                        ) : (
                          <>
                            <LogIn size={20} />
                            Login
                          </>
                        )}
                      </button>

                      <div className="relative py-4">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-100"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white text-slate-400">
                            Or Login With
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <button
                          type="button"
                          className="w-full py-3 px-4 bg-[#3b5998] hover:bg-[#344e86] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
                        >
                          Log In With Facebook
                        </button>
                        <button
                          type="button"
                          className="w-full py-3 px-4 bg-[#ea4335] hover:bg-[#d33a2c] text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
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
                      {/* Role Selection */}
                      <div className="flex gap-4 p-1 bg-slate-50 rounded-xl mb-6">
                        <button
                          type="button"
                          onClick={() =>
                            setRegisterData({
                              ...registerData,
                              role: "candidate",
                            })
                          }
                          className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
                            registerData.role === "candidate"
                              ? "bg-white text-[#5BBB7B] shadow-sm"
                              : "text-slate-400 hover:text-slate-600"
                          }`}
                        >
                          Candidate
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setRegisterData({
                              ...registerData,
                              role: "employer",
                            })
                          }
                          className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${
                            registerData.role === "employer"
                              ? "bg-white text-[#002333] shadow-sm"
                              : "text-slate-400 hover:text-slate-600"
                          }`}
                        >
                          Employer
                        </button>
                      </div>

                      {renderInput("register", "name", "Full Name", User)}
                      {renderInput(
                        "register",
                        "email",
                        "Email Address",
                        Mail,
                        "email",
                      )}
                      {renderInput(
                        "register",
                        "password",
                        "Password",
                        Lock,
                        "password",
                      )}
                      {renderInput(
                        "register",
                        "repeatPassword",
                        "Repeat Password",
                        Lock,
                        "password",
                      )}

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
                            <a href="#" className="text-[#5BBB7B] font-bold">
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

                      {errors.register_general && (
                        <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm text-center">
                          {errors.register_general}
                        </div>
                      )}

                      <AnimatedButton
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Registering..." : "Register Now"}
                      </AnimatedButton>
                    </form>
                  )}

                  {activeTab === "reset" && (
                    <form
                      className="space-y-6"
                      onSubmit={handleResetSubmit}
                      noValidate
                    >
                      {renderInput(
                        "reset",
                        "email",
                        "Email Address",
                        Mail,
                        "email",
                      )}
                      {renderInput(
                        "reset",
                        "newPassword",
                        "New Password",
                        Lock,
                        "password",
                      )}
                      {renderInput(
                        "reset",
                        "confirmPassword",
                        "Confirm Password",
                        Lock,
                        "password",
                      )}

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
