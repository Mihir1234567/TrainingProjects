import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronDown } from "lucide-react";

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

const Checkout = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartItems, calculateSubtotal } = useCart();
  const subtotal = calculateSubtotal();

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
      <div className="bg-[#FFFDFB] pt-20 pb-12 md:pt-36 md:pb-20 text-center">
        <h1 className="font-serif text-[28px] md:text-[45px] text-gray-900 mb-3 md:mb-4 tracking-tight leading-tight">
          Checkout
        </h1>
        <div className="flex items-center justify-center gap-1.5 text-[13px] md:text-[14px] text-gray-500 font-medium tracking-wide">
          <Link to="/" className="hover:text-[#CB927A] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link to="/cart" className="hover:text-[#CB927A] transition-colors">
            Cart
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#CB927A]">Checkout</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-[1250px] py-16 md:py-24 flex-1">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Left Side: Shipping Address Form */}
          <div className="flex-1">
            <div className="mb-12">
                <label className="block text-[13px] font-medium text-gray-500 uppercase tracking-wider mb-3">Email or Phone Number</label>
                <input 
                    type="text" 
                    placeholder="gillies@torado.com" 
                    className="w-full border border-gray-200 bg-white px-5 py-4 text-[14px] font-sans focus:outline-none focus:border-[#CB927A] transition-all duration-300 placeholder:text-gray-300"
                />
            </div>

            <h2 className="font-serif text-[28px] md:text-[42px] text-[#222222] mb-8 md:mb-10 tracking-tight">Shipping Address</h2>
            
            <form className="space-y-8">
                <div>
                    <label className="block text-[13px] font-medium text-gray-500 uppercase tracking-wider mb-2.5">Country</label>
                    <div className="relative">
                        <select className="w-full border border-gray-200 bg-white px-5 py-4 text-[14px] font-sans appearance-none focus:outline-none focus:border-[#CB927A] transition-all duration-300 text-gray-600">
                            <option>United Kingdom</option>
                            <option>United States</option>
                            <option>Canada</option>
                        </select>
                        <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-[13px] font-medium text-gray-500 uppercase tracking-wider mb-2.5">First name</label>
                        <input type="text" placeholder="Thomas" className="w-full border border-gray-200 bg-white px-5 py-4 text-[14px] font-sans focus:outline-none focus:border-[#CB927A] transition-all duration-300 placeholder:text-gray-300" />
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-gray-500 uppercase tracking-wider mb-2.5">Last name</label>
                        <input type="text" placeholder="Gillis" className="w-full border border-gray-200 bg-white px-5 py-4 text-[14px] font-sans focus:outline-none focus:border-[#CB927A] transition-all duration-300 placeholder:text-gray-300" />
                    </div>
                </div>

                <div>
                    <label className="block text-[13px] font-medium text-gray-500 uppercase tracking-wider mb-2.5">Address</label>
                    <input type="text" placeholder="94 East 84th Street, 9th Floor, New York, GA 30030" className="w-full border border-gray-200 bg-white px-5 py-4 text-[14px] font-sans focus:outline-none focus:border-[#CB927A] transition-all duration-300 placeholder:text-gray-300" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-[13px] font-medium text-gray-500 uppercase tracking-wider mb-2.5">City</label>
                        <div className="relative">
                            <select className="w-full border border-gray-200 bg-white px-5 py-4 text-[14px] font-sans appearance-none focus:outline-none focus:border-[#CB927A] transition-all duration-300 text-gray-600">
                                <option>New York</option>
                                <option>London</option>
                                <option>Paris</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-gray-500 uppercase tracking-wider mb-2.5">Post Code</label>
                        <input type="text" placeholder="****" className="w-full border border-gray-200 bg-white px-5 py-4 text-[14px] font-sans focus:outline-none focus:border-[#CB927A] transition-all duration-300 placeholder:text-gray-300" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <label className="block text-[13px] font-medium text-gray-500 uppercase tracking-wider mb-2.5">Division</label>
                        <div className="relative">
                            <select className="w-full border border-gray-200 bg-white px-5 py-4 text-[14px] font-sans appearance-none focus:outline-none focus:border-[#CB927A] transition-all duration-300 text-gray-600">
                                <option>New York</option>
                                <option>Division 1</option>
                                <option>Division 2</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-gray-500 uppercase tracking-wider mb-2.5">Street</label>
                        <input type="text" placeholder="321 devison street" className="w-full border border-gray-200 bg-white px-5 py-4 text-[14px] font-sans focus:outline-none focus:border-[#CB927A] transition-all duration-300 placeholder:text-gray-300" />
                    </div>
                </div>

                <div>
                    <label className="block text-[13px] font-medium text-gray-500 uppercase tracking-wider mb-2.5">Phone</label>
                    <input type="text" placeholder="+01 947 847 4488" className="w-full border border-gray-200 bg-white px-5 py-4 text-[14px] font-sans focus:outline-none focus:border-[#CB927A] transition-all duration-300 placeholder:text-gray-300" />
                </div>

                <div className="flex flex-col gap-5 pt-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                            <input type="checkbox" className="peer appearance-none w-5 h-5 border border-gray-200 rounded-sm bg-white checked:bg-[#CB927A] checked:border-[#CB927A] transition-all duration-300" />
                            <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="text-[14px] text-gray-600 font-medium tracking-wide">Save this information for next time.</span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-0.5">
                            <input type="checkbox" className="peer appearance-none w-5 h-5 border border-gray-200 rounded-sm bg-white checked:bg-[#CB927A] checked:border-[#CB927A] transition-all duration-300" />
                            <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-300 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <span className="text-[14px] text-gray-600 font-medium tracking-wide">I've read & agree to the <Link to="#" className="text-[#CB927A] hover:underline font-semibold">Terms & Conditions</Link> and <Link to="#" className="text-[#CB927A] hover:underline font-semibold">Privacy Policy</Link></span>
                    </label>
                </div>

                <div className="pt-10">
                    <label className="block text-[13px] font-medium text-gray-500 uppercase tracking-wider mb-3.5">Order Notes(Optional)</label>
                    <textarea 
                        placeholder="Write your notes here..." 
                        rows={6}
                        className="w-full border border-gray-200 bg-white px-5 py-4 text-[14px] font-sans focus:outline-none focus:border-[#CB927A] transition-all duration-300 resize-none placeholder:text-gray-300"
                    ></textarea>
                </div>
            </form>
          </div>

          {/* Right Side: Order Summary */}
          <div className="w-full lg:w-[420px]">
            <h3 className="font-serif text-[28px] md:text-[32px] text-[#222222] mb-8">Cart Totals</h3>
            
            <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center text-[15px]">
                    <span className="text-gray-600">Total</span>
                    <span className="text-gray-600">{cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items</span>
                </div>
                <div className="flex justify-between items-center text-[15px]">
                    <span className="font-bold text-[#222222]">Subtotal:</span>
                    <span className="font-bold text-[#222222]">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-[15px]">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-600">$0.00</span>
                </div>
                <div className="flex justify-between items-center text-[15px]">
                    <span className="font-bold text-[#222222]">Payable Total</span>
                    <span className="font-bold text-[#222222]">${subtotal.toFixed(2)}</span>
                </div>
            </div>

            <div className="mb-12">
                <h3 className="font-serif text-[24px] md:text-[28px] text-[#222222] mb-8">Payment Method</h3>
                <div className="space-y-8">
                    <label className="flex items-start gap-5 cursor-pointer group">
                        <div className="relative flex items-center justify-center mt-1.5">
                            <input type="radio" name="payment" className="peer appearance-none w-5 h-5 border border-gray-300 bg-white checked:border-[#CB927A] transition-all duration-300" defaultChecked />
                            <div className="absolute w-3 h-3 bg-[#CB927A] opacity-0 peer-checked:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div>
                            <span className="text-[18px] md:text-[20px] font-serif text-[#222222] block mb-1.5">Direct Bank Transfer</span>
                            <p className="text-[14px] text-gray-600 leading-relaxed font-sans max-w-[500px]">Make your payment directly into our bank account. Please use your order ID as the payment reference.</p>
                        </div>
                    </label>
                    <label className="flex items-center gap-5 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                            <input type="radio" name="payment" className="peer appearance-none w-5 h-5 border border-gray-300 bg-white checked:border-[#CB927A] transition-all duration-300" />
                            <div className="absolute w-3 h-3 bg-[#CB927A] opacity-0 peer-checked:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <span className="text-[18px] md:text-[20px] font-serif text-[#222222]">Cash On Delivery</span>
                    </label>
                    <label className="flex items-center gap-5 cursor-pointer group">
                        <div className="relative flex items-center justify-center">
                            <input type="radio" name="payment" className="peer appearance-none w-5 h-5 border border-gray-300 bg-white checked:border-[#CB927A] transition-all duration-300" />
                            <div className="absolute w-3 h-3 bg-[#CB927A] opacity-0 peer-checked:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <span className="text-[18px] md:text-[20px] font-serif text-[#222222]">Check Payment</span>
                    </label>
                </div>
            </div>

            <div className="mb-10">
                <h4 className="font-serif text-[18px] md:text-[20px] text-[#222222] mb-5">Accepted payment method</h4>
                <div className="flex flex-wrap items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center p-2 shadow-sm">
                        <img src={maestro} className="w-full h-full object-contain" alt="Maestro" />
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center p-2 shadow-sm">
                        <img src={visa} className="w-full h-full object-contain" alt="Visa" />
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center p-2 shadow-sm">
                        <img src={paypal} className="w-full h-full object-contain" alt="PayPal" />
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center p-2 shadow-sm">
                        <img src={amex} className="w-full h-full object-contain" alt="Amex" />
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white border border-gray-100 rounded-full flex items-center justify-center p-2 shadow-sm">
                        <img src={discover} className="w-full h-full object-contain" alt="Discover" />
                    </div>
                </div>
            </div>

            <button className="group relative overflow-hidden w-full bg-[#CB927A] text-white h-[56px] font-medium text-[16px] flex items-center justify-center gap-1.5 transition-all">
                <div className="absolute inset-0 bg-[#222222] opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-500 ease-in-out origin-center"></div>
                <span className="relative z-10 flex items-center gap-1.5">
                    Place Order
                </span>
            </button>
          </div>

        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default Checkout;
