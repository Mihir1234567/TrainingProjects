import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Trash2, Heart, Minus, Plus, ArrowUpRight } from "lucide-react";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";

// Payment Logos
import maestro from "../assets/Footer/imgi_50_maestar-card.png";
import visa from "../assets/Footer/imgi_51_visa.png";
import paypal from "../assets/Footer/imgi_52_paypal.png";
import amex from "../assets/Footer/imgi_53_american-express.png";
import discover from "../assets/Footer/imgi_54_discover.png";

const Cart = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems, updateQuantity, removeFromCart, calculateSubtotal } = useCart();
  const subtotal = calculateSubtotal();

  // Scroll listener for sticky navbar

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
          Cart
        </h1>
        <div className="flex items-center justify-center gap-1.5 text-[14px] text-gray-500 font-medium tracking-wide border-b border-transparent">
          <Link to="/" className="hover:text-[#CB927A] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#CB927A] border-b border-transparent">Cart</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-[1200px] py-10 md:py-20 flex-1">
        {cartItems.length > 0 ? (
          <>
            {/* Cart Table */}
            {/* Cart Table - Desktop */}
            <div className="hidden md:block w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-4 pt-2 text-[15px] font-semibold text-[#222222]">Item</th>
                    <th className="pb-4 pt-2 text-[15px] font-semibold text-[#222222] w-[150px]">Price</th>
                    <th className="pb-4 pt-2 text-[15px] font-semibold text-[#222222] w-[150px]">Quantity</th>
                    <th className="pb-4 pt-2 text-[15px] font-semibold text-[#222222] w-[150px]">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-100">
                      <td className="py-6 flex flex-col md:flex-row items-start md:items-center gap-6">
                        <Link to={`/product/${item.product.id}`} className="w-[100px] h-[100px] bg-[#F7F6F5] flex items-center justify-center overflow-hidden shrink-0 group">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
                          />
                        </Link>
                        <div>
                          <Link to={`/product/${item.product.id}`} className="font-serif text-[18px] text-[#222222] mb-3 block hover:text-[#CB927A] transition-colors">{item.product.name}</Link>
                          <div className="flex items-center gap-5">
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="flex items-center gap-1.5 text-[13px] font-medium text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 size={13} strokeWidth={2} />
                              Delete
                            </button>
                            <button className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500 hover:text-[#CB927A] transition-colors">
                              <Heart size={13} strokeWidth={2} />
                              Save for later
                            </button>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 text-[15px] font-medium text-[#222222]">
                        {item.product.price}
                      </td>
                      <td className="py-6">
                        <div className="flex items-center border border-gray-200 w-fit">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-9 h-10 flex items-center justify-center text-gray-500 hover:text-[#CB927A] hover:bg-gray-50 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 h-10 flex items-center justify-center text-[14px] font-medium text-[#222222] border-x border-gray-200">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-9 h-10 flex items-center justify-center text-gray-500 hover:text-[#CB927A] hover:bg-gray-50 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </td>
                      <td className="py-6 text-[15px] font-medium text-[#222222]">
                        ${(parseFloat(item.product.price.replace('$', '')) * item.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart List - Mobile */}
            <div className="md:hidden flex flex-col gap-6 w-full">
              {cartItems.map((item) => (
                <div key={item.id} className="border-b border-gray-100 pb-6 flex gap-4 w-full">
                  <Link to={`/product/${item.product.id}`} className="w-24 h-24 bg-[#F7F6F5] flex items-center justify-center shrink-0 group">
                    <img src={item.product.image} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" alt={item.product.name} />
                  </Link>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <Link to={`/product/${item.product.id}`} className="font-serif text-[16px] text-[#222222] mb-1 block hover:text-[#CB927A]">{item.product.name}</Link>
                      <div className="text-[14px] font-medium text-[#222222] mb-3">{item.product.price}</div>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center border border-gray-200 w-fit h-9">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#CB927A]"><Minus size={12} /></button>
                        <span className="w-8 h-full flex items-center justify-center text-[13px] font-medium text-[#222222] border-x border-gray-200">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-[#CB927A]"><Plus size={12} /></button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-1 flex items-center gap-1 text-[13px] font-medium">
                        <Trash2 size={13} strokeWidth={2} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupons and Update Cart */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-10 gap-6">
              <div className="w-full md:w-auto">
                <div className="flex items-stretch h-[46px] w-full md:w-auto">
                  <input 
                    type="text" 
                    placeholder="Enter Coupon Code" 
                    className="border border-gray-200 border-r-0 px-4 w-full md:w-[220px] text-[14px] focus:outline-none focus:border-[#CB927A] transition-colors"
                  />
                  <button className="group relative overflow-hidden bg-[#CB927A] text-white px-7 font-medium text-[14px] flex items-center justify-center gap-1.5 whitespace-nowrap">
                    <div className="absolute inset-0 bg-[#222222] opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-500 ease-in-out origin-center"></div>
                    <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-500">
                      Apply
                      <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </button>
                </div>
                <p className="text-[13px] text-gray-500 mt-3 pl-1">Coupon code will be applied on the checkout page</p>
              </div>
              <button className="group relative overflow-hidden bg-[#CB927A] text-white px-8 h-[46px] font-medium text-[14px] flex items-center justify-center gap-1.5 whitespace-nowrap w-full md:w-auto">
                <div className="absolute inset-0 bg-[#222222] opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-500 ease-in-out origin-center"></div>
                <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-500">
                  Update Cart
                  <ArrowUpRight size={16} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </button>
            </div>

            {/* Order Summary */}
            <div className="mt-16 flex justify-end">
              <div className="w-full md:w-[420px]">
                <h3 className="font-serif text-[28px] md:text-[32px] text-[#222222] mb-8">Order Summary</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-[15px]">
                    <span className="text-gray-600">Total</span>
                    <span className="text-gray-600">{cartItems.length} Items</span>
                  </div>
                  <div className="flex justify-between items-center text-[15px]">
                    <span className="font-bold text-[#222222]">Subtotal</span>
                    <span className="font-bold text-[#222222]">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[15px]">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-600">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center text-[15px] pt-2">
                    <span className="font-bold text-[#222222]">Payable Total</span>
                    <span className="font-bold text-[#222222]">${subtotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link to="/checkout" className="group relative overflow-hidden w-full bg-[#CB927A] text-white h-[50px] font-medium text-[15px] flex items-center justify-center gap-1.5 mb-6">
                  <div className="absolute inset-0 bg-[#222222] opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-500 ease-in-out origin-center"></div>
                  <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-500">
                    Proceed To Checkout
                    <ArrowUpRight size={18} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>
                </Link>

                <div className="flex items-start gap-3 mb-8">
                  <input type="checkbox" id="terms" className="mt-1 border-gray-300 text-[#CB927A] focus:ring-[#CB927A]" />
                  <label htmlFor="terms" className="text-[14px] text-gray-500 leading-relaxed">
                    I accept to the <Link to="#" className="text-[#CB927A] hover:underline">Terms & Conditions</Link> and <Link to="#" className="text-[#CB927A] hover:underline">Privacy Policy</Link>
                  </label>
                </div>

                <div>
                  <h4 className="font-serif text-[22px] text-[#222222] mb-5">Accepted payment method</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center overflow-hidden p-2 shadow-sm">
                      <img src={maestro} className="w-full h-full object-contain" alt="Maestro" />
                    </div>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center overflow-hidden p-2 shadow-sm">
                      <img src={visa} className="w-full h-full object-contain" alt="Visa" />
                    </div>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center overflow-hidden p-2 shadow-sm">
                      <img src={paypal} className="w-full h-full object-contain" alt="PayPal" />
                    </div>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center overflow-hidden p-2 shadow-sm">
                      <img src={amex} className="w-full h-full object-contain" alt="Amex" />
                    </div>
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-white border border-gray-200 rounded-full flex items-center justify-center overflow-hidden p-2 shadow-sm">
                      <img src={discover} className="w-full h-full object-contain" alt="Discover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-serif mb-4 text-[#222] font-semibold">Your cart is currently empty.</h2>
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

export default Cart;
