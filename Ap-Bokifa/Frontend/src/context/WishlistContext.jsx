import React, { createContext, useState, useContext, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { syncUserData } from "../api/authService";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Sync with Backend
  const { user, openLoginModal } = useAuth();

  // 1. Initial Load from User
  useEffect(() => {
    if (user && user.wishlist) {
      if (user.wishlist.length > 0) {
        setWishlist(user.wishlist);
      }
    }
  }, [user]);

  // 2. Sync changes to Backend
  useEffect(() => {
    if (user) {
      const timeoutId = setTimeout(() => {
        syncUserData({ wishlist });
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [wishlist, user]);

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Listen for logout event to clear wishlist
  useEffect(() => {
    const handleLogout = () => {
      setWishlist([]);
    };
    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, []);

  const toggleWishlist = (product) => {
    if (!user) {
      openLoginModal();
      return;
    }
    setWishlist((prevWishlist) => {
      const isInWishlist = prevWishlist.some((item) => item.id === product.id);
      if (isInWishlist) {
        return prevWishlist.filter((item) => item.id !== product.id);
      } else {
        return [...prevWishlist, product];
      }
    });
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
