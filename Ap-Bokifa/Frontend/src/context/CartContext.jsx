import React, { createContext, useContext, useState, useEffect } from "react";
import { FORMAT_MULTIPLIERS } from "../constants";
import { useAuth } from "./AuthContext";
import { syncUserData } from "../api/authService";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Sync with Backend
  const { user, openLoginModal } = useAuth();

  // Actually better to import at top.

  // 1. Initial Load from User
  useEffect(() => {
    if (user && user.cart) {
      // Merge strategy or Replace? User asked for restore.
      // We will REPLACE local with backend if backend has data.
      if (user.cart.length > 0) {
        setCart(user.cart);
      }
    }
  }, [user]);

  // 2. Sync changes to Backend
  useEffect(() => {
    if (user) {
      const timeoutId = setTimeout(() => {
        syncUserData({ cart });
      }, 1000); // 1s debounce
      return () => clearTimeout(timeoutId);
    }
  }, [cart, user]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Listen for logout event to clear cart
  useEffect(() => {
    const handleLogout = () => {
      setCart([]);
    };
    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, []);

  // ... (existing code)

  const addToCart = (product, quantity = 1, format = "Paperback") => {
    // ALLOW GUEST CART: Removed user check here.
    // if (!user) {
    //   openLoginModal();
    //   return;
    // }
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.format === format
      );

      if (existingItemIndex > -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantity,
        };
        return newCart;
      } else {
        // Calculate price based on format and discount
        const multiplier = FORMAT_MULTIPLIERS[format] || 1;
        const basePrice = product.price * multiplier;
        const discountPct = product.discount || 0;
        const finalPrice = basePrice * (1 - discountPct / 100);

        return [
          ...prevCart,
          {
            id: product.id,
            title: product.title,
            author: product.author,
            price: finalPrice,
            imageUrl: product.imageUrl,
            quantity,
            format,
            discount: product.discount || 0,
          },
        ];
      }
    });
  };

  const removeFromCart = (id, format) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.id === id && item.format === format))
    );
  };

  const updateQuantity = (id, format, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id && item.format === format) {
            return { ...item, quantity: Math.max(0, item.quantity + delta) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
