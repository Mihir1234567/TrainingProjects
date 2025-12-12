import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setError("");
    setLoading(true);

    try {
      await login(email, password);
      // Redirect to home/dashboard on success
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      {/* Main Content Wrapper */}
      <div className="flex-1 flex justify-center items-center w-full">
        {/* Main Card */}
        <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-[450px] transition-all duration-300">
          {/* App Title */}
          <div className="title text-center mb-8">
            <Link
              to="/"
              className="text-xl font-medium text-gray-900 hover:text-blue-600 transition-colors"
            >
              Ap Bokifa
            </Link>
          </div>

          {/* Subtitles */}
          <div className="text-left mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Log in</h2>
            <p className="text-gray-500 text-[15px] mt-1">
              Welcome back to Ap Bokifa
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="Emailtext mb-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:ring-1 focus:ring-blue-600 transition-all duration-200"
                required
              />
            </div>

            {/* Password Input */}
            <div className="Passwordtext mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 outline-none focus:ring-1 focus:ring-blue-600 transition-all duration-200"
                required
              />
            </div>

            {/* Continue Button */}
            <div className="continue">
              <button
                type="submit"
                disabled={loading || !email || !password}
                className={`w-full font-medium py-3 rounded-lg transition-colors flex justify-center items-center ${
                  !loading && email && password
                    ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Link */}
      <div className="py-6 text-center">
        <a href="#" className="text-blue-500 text-sm hover:underline">
          Privacy policy
        </a>
      </div>
    </div>
  );
};

export default Login;
