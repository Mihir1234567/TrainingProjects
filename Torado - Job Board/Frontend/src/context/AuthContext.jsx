import React, { createContext, useContext, useState, useEffect } from "react";

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

  // Initialize from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("torado_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user from local storage", error);
        localStorage.removeItem("torado_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (userData) => {
    // Simulate API response
    const userWithToken = { ...userData, token: "mock-jwt-token" };
    setUser(userWithToken);
    localStorage.setItem("torado_user", JSON.stringify(userWithToken));
    return Promise.resolve(userWithToken);
  };

  const register = (userData) => {
    // Simulate API Call
    const newUser = {
      id: Math.floor(Math.random() * 10000),
      ...userData,
      token: "mock-jwt-token",
    };
    setUser(newUser);
    localStorage.setItem("torado_user", JSON.stringify(newUser));
    return Promise.resolve(newUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("torado_user");
    return Promise.resolve();
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("torado_user", JSON.stringify(updatedUser));
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
