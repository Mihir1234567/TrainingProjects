import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, Truck, Package, Clock, Gift, MapPin, Phone } from "lucide-react";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

// Payment Logos (reusing from Footer/Checkout if needed)
import maestro from "../assets/Footer/imgi_50_maestar-card.png";
import visa from "../assets/Footer/imgi_51_visa.png";
import paypal from "../assets/Footer/imgi_52_paypal.png";
import amex from "../assets/Footer/imgi_53_american-express.png";
import discover from "../assets/Footer/imgi_54_discover.png";

const TrackOrder = () => {
  const [isScrolled, setIsScrolled] = useState(false);

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
      <div className="bg-[#FFFDFB] pt-16 pb-10 md:pt-36 md:pb-20 text-center">
        <h1 className="font-serif text-[28px] md:text-[45px] text-gray-900 mb-4 tracking-tight leading-tight px-4">
          Track My Order
        </h1>
        <div className="flex items-center justify-center gap-1.5 text-[13px] md:text-[14px] text-gray-500 font-medium tracking-wide">
          <Link to="/" className="hover:text-[#CB927A] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-[#CB927A]">Track My Order</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-[1250px] py-16 md:py-24 flex-1">
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
          
          {/* Left Column: Order Content */}
          <div className="flex-1">
            <h2 className="font-serif text-[24px] md:text-[36px] text-[#222222] mb-6 md:mb-10 tracking-tight">Order Details</h2>
            
            {/* Summary Box */}
            <div className="border border-gray-100 p-6 md:p-8 mb-16 bg-[#F9F9F9]/30">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-[14px] text-gray-500 font-medium">Tracking #: <span className="text-[#222222]">DAS758942LKJB15</span></p>
                        <p className="text-[14px] text-gray-500 font-medium">Order placed: <span className="text-[#222222]">Jan 25, 2025</span></p>
                    </div>
                    <div>
                        <p className="text-[14px] text-gray-500 font-medium">Subtotal: <span className="font-bold text-[#222222] font-serif text-[18px]">$2700.00</span></p>
                    </div>
                </div>
            </div>

            <h2 className="font-serif text-[26px] md:text-[42px] text-[#222222] mb-8 md:mb-14 tracking-tight">Order Tracking</h2>
            
            {/* Progress Bar Container */}
            <div className="relative mb-16 md:mb-24 md:pr-12 z-0">
                {/* Horizontal Desktop/Tablet View */}
                <div className="hidden sm:block">
                    {/* Connector Line */}
                    <div className="absolute top-5 left-0 right-0 h-[2.5px] bg-[#EEEEEE] z-0">
                        <div className="h-full bg-[#CB927A] w-[68%] transition-all duration-1000 ease-in-out"></div>
                    </div>

                    <div className="flex justify-between relative pl-[10%] pr-[5%] sm:pl-[12%] sm:pr-[8%] z-10">
                        {/* Step 1: Placed */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative z-10 w-10 h-10 rounded-full bg-[#CB927A] flex items-center justify-center text-white mb-5 transition-transform hover:scale-110 duration-300">
                                <Check size={18} strokeWidth={3} />
                            </div>
                            <h4 className="text-[14px] md:text-[16px] font-sans text-[#555555] mb-1.5 whitespace-nowrap">Order placed</h4>
                            <span className="text-[13px] text-[#222222] font-sans font-bold">Jan 25</span>
                        </div>

                        {/* Step 2: Dispatched */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative z-10 w-10 h-10 rounded-full bg-[#CB927A] flex items-center justify-center text-white mb-5 transition-transform hover:scale-110 duration-300">
                                <Truck size={18} strokeWidth={2.2} />
                            </div>
                            <h4 className="text-[14px] md:text-[16px] font-sans text-[#555555] mb-1.5 whitespace-nowrap">Dispatched</h4>
                            <span className="text-[13px] text-[#222222] font-sans font-bold">Jan 25</span>
                        </div>

                        {/* Step 3: Delivered */}
                        <div className="flex flex-col items-center text-center">
                            <div className="relative z-10 w-10 h-10 rounded-full bg-[#CB927A] flex items-center justify-center text-white mb-5 transition-transform hover:scale-110 duration-300">
                                <Gift size={18} strokeWidth={2.2} />
                            </div>
                            <h4 className="text-[14px] md:text-[16px] font-sans text-[#555555] mb-1.5 whitespace-nowrap">Will Deliver</h4>
                            <span className="text-[13px] text-[#222222] font-sans font-bold">Jan 25 - Jan 30</span>
                        </div>
                    </div>
                </div>

                {/* Vertical Mobile View */}
                <div className="sm:hidden flex flex-col gap-10 relative">
                    {/* Vertical Connector Line */}
                    <div className="absolute left-5 top-5 bottom-5 w-[2px] bg-[#EEEEEE] z-0">
                        <div className="w-full bg-[#CB927A] h-[66%] transition-all duration-1000 ease-in-out"></div>
                    </div>

                    {/* Step 1: Placed */}
                    <div className="flex items-start gap-5 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-[#CB927A] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                            <Check size={18} strokeWidth={3} />
                        </div>
                        <div className="pt-0.5">
                            <h4 className="text-[15px] font-sans text-[#555555] mb-0.5">Order placed</h4>
                            <p className="text-[13px] text-[#222222] font-sans font-bold">Jan 25</p>
                        </div>
                    </div>

                    {/* Step 2: Dispatched */}
                    <div className="flex items-start gap-5 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-[#CB927A] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                            <Truck size={18} strokeWidth={2.2} />
                        </div>
                        <div className="pt-0.5">
                            <h4 className="text-[15px] font-sans text-[#555555] mb-0.5">Dispatched</h4>
                            <p className="text-[13px] text-[#222222] font-sans font-bold">Jan 25</p>
                        </div>
                    </div>

                    {/* Step 3: Delivered */}
                    <div className="flex items-start gap-5 relative z-10">
                        <div className="w-10 h-10 rounded-full bg-[#CB927A] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                            <Gift size={18} strokeWidth={2.2} />
                        </div>
                        <div className="pt-0.5">
                            <h4 className="text-[15px] font-sans text-[#555555] mb-0.5">Will Deliver</h4>
                            <p className="text-[13px] text-[#222222] font-sans font-bold">Jan 25 - Jan 30</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <p className="text-[15px] font-medium font-sans">Order Status: <span className="text-[#CB927A]">Shipped</span></p>
                <p className="text-[15px] font-medium text-gray-600 font-sans pr-2">Estimated delivery date: <span className="text-[#222222]">Jan 25- Jan 30</span></p>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="w-full lg:w-[420px] space-y-12">
            {/* Cart Totals */}
            <div>
                <h3 className="font-serif text-[24px] md:text-[28px] text-[#222222] mb-8">Cart Totals</h3>
                <div className="space-y-4 mb-10 bg-[#F9F9F9] p-6 md:p-0 md:bg-transparent">
                    <div className="flex justify-between items-center text-[15px] border-b border-gray-100 pb-2 md:border-0 md:pb-0">
                        <span className="text-gray-600">Total</span>
                        <span className="text-gray-600">4 Items</span>
                    </div>
                    <div className="flex justify-between items-center text-[15px] border-b border-gray-100 pb-2 md:border-0 md:pb-0">
                        <span className="font-bold text-[#222222]">Subtotal:</span>
                        <span className="font-bold text-[#222222]">$2700.00</span>
                    </div>
                    <div className="flex justify-between items-center text-[15px] border-b border-gray-100 pb-2 md:border-0 md:pb-0">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-600">$0.00</span>
                    </div>
                    <div className="flex justify-between items-center text-[15px] pt-2 md:pt-0">
                        <span className="font-bold text-[#222222]">Payable Total</span>
                        <span className="font-bold text-[#222222]">$2700.00</span>
                    </div>
                </div>
            </div>

            {/* Shipping Info */}
            <div>
                <h3 className="font-serif text-[24px] md:text-[28px] text-[#222222] mb-8">Shipping Information</h3>
                <div className="bg-[#F9F9F9] p-7 flex flex-col gap-4">
                    <h5 className="font-medium text-[17px] text-[#222222]">Dominique Smith</h5>
                    <div className="flex items-start gap-3">
                        <MapPin size={18} className="text-[#CB927A] flex-shrink-0 mt-0.5" />
                        <p className="text-[14px] text-gray-600 leading-relaxed font-sans">22 Fraserburgh Rd, 9th floor, GA 30030, New York, USA</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone size={16} className="text-[#CB927A] flex-shrink-0" />
                        <p className="text-[14px] text-gray-600 font-sans">+01 947 847 4488</p>
                    </div>
                </div>
            </div>

            {/* Billing Info */}
            <div>
                <h3 className="font-serif text-[24px] md:text-[28px] text-[#222222] mb-8">Billing Information</h3>
                <div className="bg-[#F9F9F9] p-7 flex flex-col gap-4">
                    <h5 className="font-medium text-[17px] text-[#222222]">Della Vaughn</h5>
                    <div className="flex items-start gap-3">
                        <MapPin size={18} className="text-[#CB927A] flex-shrink-0 mt-0.5" />
                        <p className="text-[14px] text-gray-600 leading-relaxed font-sans">86 Telford Street, 7th floor, MK 07005 New York, USA</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone size={16} className="text-[#CB927A] flex-shrink-0" />
                        <p className="text-[14px] text-gray-600 font-sans">+01 947 847 4488</p>
                    </div>
                </div>
            </div>
          </div>

        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default TrackOrder;
