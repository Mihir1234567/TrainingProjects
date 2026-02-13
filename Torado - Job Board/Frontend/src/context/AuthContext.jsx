import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI, userAPI } from "../services/api";

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
    const validateSession = async () => {
      const storedUser =
        localStorage.getItem("torado_user") ||
        sessionStorage.getItem("torado_user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser); // Optimistic set

          // Verify with backend to ensure token is valid & get fresh data (like isProfileComplete)
          try {
            const freshUser = await userAPI.getProfile();
            // Keep the token from storage (API usually doesn't return it on /me)
            const mergedUser = { ...parsedUser, ...freshUser };
            // Ensure token is preserved if /me didn't return it
            if (!mergedUser.token && parsedUser.token) {
              mergedUser.token = parsedUser.token;
            }

            setUser(mergedUser);
            localStorage.setItem("torado_user", JSON.stringify(mergedUser));
          } catch (apiError) {
            console.error("Session validation failed:", apiError);
            // If 401 or similar, clear session
            if (apiError.status === 401 || apiError.status === 403) {
              logout();
            }
          }
        } catch (error) {
          console.error("Failed to parse user from storage", error);
          localStorage.removeItem("torado_user");
          sessionStorage.removeItem("torado_user");
        }
      }
      setIsLoading(false);
    };

    validateSession();
  }, []);

  const login = async (userData) => {
    try {
      const userWithToken = await authAPI.login(userData);
      setUser(userWithToken);
      localStorage.setItem("torado_user", JSON.stringify(userWithToken));
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
      localStorage.setItem("torado_user", JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("torado_user");
    sessionStorage.removeItem("torado_user");
    return Promise.resolve();
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem("torado_user", JSON.stringify(updatedUser));
  };

  /* New RBAC Logic */
  // Flatten permissions from all roles
  const permissions = React.useMemo(() => {
    if (!user || !user.roles) return [];
    const allPerms = user.roles.reduce((acc, role) => {
      if (role.permissions) return [...acc, ...role.permissions];
      return acc;
    }, []);
    return [...new Set(allPerms)];
  }, [user]);

  const hasPermission = (requiredPermission) => {
    if (!user) return false;
    // Admin Override
    if (
      user.role === "admin" ||
      (user.roles && user.roles.some((r) => r.name === "admin"))
    ) {
      return true;
    }
    return permissions.includes(requiredPermission);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isRecruiter: user?.role === "employer",
    permissions,
    hasPermission,
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
