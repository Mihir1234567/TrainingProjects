import React, { createContext, useContext, useState, useEffect } from "react";
import { FORMAT_MULTIPLIERS } from "../constants";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1, format = "Paperback") => {
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
            image: product.imageUrl,
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
