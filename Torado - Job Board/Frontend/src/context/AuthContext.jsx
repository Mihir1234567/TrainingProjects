import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from sessionStorage on mount
  useEffect(() => {
    // Check for legacy localStorage and clear it
    if (localStorage.getItem("torado_user")) {
      localStorage.removeItem("torado_user");
    }

    const storedUser = sessionStorage.getItem("torado_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from session storage", error);
        sessionStorage.removeItem("torado_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (userData) => {
    try {
      const userWithToken = await authAPI.login(userData);
      setUser(userWithToken);
      sessionStorage.setItem("torado_user", JSON.stringify(userWithToken));
      return userWithToken;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const newUser = await authAPI.register(userData);
      setUser(newUser);
      sessionStorage.setItem("torado_user", JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("torado_user");
    // Also ensure localStorage is clear
    localStorage.removeItem("torado_user");
    return Promise.resolve();
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    sessionStorage.setItem("torado_user", JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isRecruiter: user?.role === "employer",
    login,
    register,
    logout,
    updateUser,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
