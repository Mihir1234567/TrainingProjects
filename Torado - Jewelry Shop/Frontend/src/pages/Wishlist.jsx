import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowUpRight } from "lucide-react";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useWishlist } from "../Context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // Scroll listener for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <TopBar />

      {/* Sticky Navbar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transform transition-all ease-out ${
          isScrolled
            ? "translate-y-0 opacity-100 duration-1000"
            : "-translate-y-full opacity-0 duration-0"
        }`}
      >
        <Navbar isSticky={true} />
      </div>

      <div className="relative">
        {!isScrolled && <Navbar isSticky={false} />}
      </div>

      {/* Page Header */}
      <div className="bg-[#FFFDFB] pt-28 pb-14 md:pt-36 md:pb-20 text-center">
        <h1 className="font-serif text-3xl md:text-[45px] text-gray-900 mb-4 tracking-tight leading-tight">
          Wishlist
        </h1>
        <div className="flex items-center justify-center gap-1.5 text-[14px] text-gray-500 font-medium tracking-wide">
          <Link to="/" className="hover:text-[#CB927A] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#CB927A]">Wishlist</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-7xl py-10 md:py-20 flex-1">
        {wishlistItems.length > 0 ? (
          <div className="w-full">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-4 pt-2 text-[15px] font-semibold text-[#222222]">Item</th>
                  <th className="pb-4 pt-2 text-[15px] font-semibold text-[#222222] text-center w-[120px]">Price</th>
                  <th className="pb-4 pt-2 text-[15px] font-semibold text-[#222222] text-center w-[180px]">Add</th>
                  <th className="pb-4 pt-2 text-[15px] font-semibold text-[#222222] text-center w-[120px]">Total</th>
                  <th className="pb-4 pt-2 text-[15px] font-semibold text-[#222222] text-center w-[120px]">Remove</th>
                </tr>
              </thead>
              <tbody>
                {wishlistItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
                    <td className="py-6 flex items-center gap-6">
                      <Link to={`/product/${item.id}`} className="w-[100px] h-[100px] bg-[#F7F6F5] flex items-center justify-center overflow-hidden shrink-0 group">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                        />
                      </Link>
                      <Link to={`/product/${item.id}`} className="font-serif text-[18px] text-[#222222] hover:text-[#CB927A] transition-colors">
                        {item.name}
                      </Link>
                    </td>
                    <td className="py-6 text-[15px] font-medium text-[#222222] text-center">
                      {item.price}
                    </td>
                    <td className="py-6 text-center">
                      <button 
                        onClick={() => addToCart(item, 1)}
                        className="group relative overflow-hidden bg-[#C59B87] text-white text-[13px] font-medium px-6 py-2.5 mx-auto flex items-center justify-center gap-1.5 whitespace-nowrap transition-colors"
                      >
                        <div className="absolute inset-0 bg-[#222222] opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-500 ease-in-out origin-center"></div>
                        <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-500">
                          Add To Cart
                          <ArrowUpRight size={14} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </span>
                      </button>
                    </td>
                    <td className="py-6 text-[15px] font-medium text-[#222222] text-center">
                      {item.price}
                    </td>
                    <td className="py-6 text-center">
                      <button 
                        onClick={() => removeFromWishlist(item.id)}
                        className="flex items-center justify-center gap-1.5 text-[13px] font-medium text-red-500 hover:text-red-700 transition-colors mx-auto"
                      >
                        <Trash2 size={15} strokeWidth={2} className="shrink-0" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            
            <div className="mt-10 flex justify-end">
                <Link to="/shopDefault" className="flex items-center gap-1.5 text-[15px] font-medium text-[#222222] hover:text-[#CB927A] transition-colors group">
                    Continue Shopping Cart
                    <ArrowUpRight size={18} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-serif mb-4 text-[#222] font-semibold">Your wishlist is currently empty.</h2>
            <Link to="/shopDefault" className="inline-block bg-[#CB927A] text-white px-8 py-3 hover:bg-[#b07d66] transition-colors">
              Return to shop
            </Link>
          </div>
        )}
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Wishlist;
