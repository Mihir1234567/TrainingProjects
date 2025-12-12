import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  loginUser,
  registerUser,
  logoutUser,
  fetchUserData,
} from "../api/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // New State
  const navigate = useNavigate();

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token) {
        try {
          // 1. Optimistically load stored user
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }

          // 2. Fetch fresh data from backend
          const data = await fetchUserData();
          const userData = data.data; // Assuming response structure { success: true, data: { ... } }

          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } catch (e) {
          console.error("Failed to fetch fresh user data", e);
          // If fetch fails (e.g. 401), clear auth
          if (e.status === 401) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      // data.data has _id, name, email, role, cart, wishlist, compare, token

      const userData = data.data;
      const token = userData.token;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      return data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      const data = await registerUser(name, email, password);
      // Backend returns: { success: true, data: { ... } }

      const userData = data.data;
      const token = userData.token;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      return data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    // Dispatch custom event to clear other contexts
    window.dispatchEvent(new Event("auth:logout"));

    navigate("/login");
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isLoginModalOpen,
    openLoginModal,
    closeLoginModal,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
