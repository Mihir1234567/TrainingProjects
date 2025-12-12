import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { syncUserData } from "../api/authService";

const CompareContext = createContext();

export const useCompare = () => useContext(CompareContext);

export const CompareProvider = ({ children }) => {
  const [compareList, setCompareList] = useState(() => {
    const savedCompareList = localStorage.getItem("compareList");
    return savedCompareList ? JSON.parse(savedCompareList) : [];
  });

  // Sync with Backend
  const { user, openLoginModal } = useAuth();

  // 1. Initial Load from User
  useEffect(() => {
    if (user && user.compare) {
      if (user.compare.length > 0) {
        setCompareList(user.compare);
      }
    }
  }, [user]);

  // 2. Sync changes to Backend
  useEffect(() => {
    if (user) {
      const timeoutId = setTimeout(() => {
        syncUserData({ compare: compareList });
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [compareList, user]);

  useEffect(() => {
    localStorage.setItem("compareList", JSON.stringify(compareList));
  }, [compareList]);

  // Listen for logout event to clear compare list
  useEffect(() => {
    const handleLogout = () => {
      setCompareList([]);
    };
    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, []);

  const toggleCompare = (product) => {
    if (!user) {
      openLoginModal();
      return;
    }
    setCompareList((prevList) => {
      const isInCompare = prevList.some((item) => item.id === product.id);
      if (isInCompare) {
        return prevList.filter((item) => item.id !== product.id);
      } else {
        return [...prevList, product];
      }
    });
  };

  const isInCompare = (productId) => {
    return compareList.some((item) => item.id === productId);
  };

  return (
    <CompareContext.Provider
      value={{ compareList, toggleCompare, isInCompare }}
    >
      {children}
    </CompareContext.Provider>
  );
};
