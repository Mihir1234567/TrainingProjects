import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const FindStore = () => {
  const [searchTerm, setSearchTerm] = useState("");
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

  const stores = [
    {
      name: "Ame Plaza",
      address: "Sunbeam St. West New York, NJ 07000",
      hours: "Open · Closes 8PM",
      phone: "+01 687 333 0455",
    },
    {
      name: "Easten Plaza",
      address: "95 Water Street San Lorenzo, CA 94555",
      hours: "Open · Closes 8PM",
      phone: "+01 687 333 0455",
    },
    {
      name: "Dina Plaza",
      address: "Rockledge St. Apopka, FL 32703",
      hours: "Open · Closes 8PM",
      phone: "+01 687 333 0455",
    },
    {
      name: "Arican Dream",
      address: "East Corona St. Macon, GA 31234",
      hours: "Open · Closes 8PM",
      phone: "+01 687 333 0455",
    },
    {
      name: "Palisades Plaza",
      address: "White Ave. Roselle, IL 60134",
      hours: "Open · Closes 8PM",
      phone: "+01 687 333 0455",
    },
  ];

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
      <div className="bg-[#FFFDFB] pt-16 pb-12 md:pt-36 md:pb-20 text-center border-b border-gray-50">
        <h1 className="font-serif text-[40px] md:text-[56px] text-[#222222] mb-5 tracking-tight leading-tight">
          Find A Store
        </h1>
        <div className="flex items-center justify-center gap-1.5 text-[14px] md:text-[15px] text-gray-400 font-medium tracking-wide">
          <Link to="/" className="hover:text-[#CB927A] transition-colors">
            Home
          </Link>
          <span className="text-gray-300">/</span>
          <span className="text-[#CB927A]">Find A Store</span>
        </div>
      </div>

      <main className="container mx-auto px-4 max-w-7xl pt-16 pb-24 flex-1">
        {/* Search Bar Section */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-16 md:h-20 pl-8 pr-16 bg-[#F8F8F8] border border-transparent rounded-sm text-[16px] text-[#222222] focus:outline-none focus:bg-white focus:border-[#CB927A]/30 transition-all duration-300 placeholder:text-gray-400"
            />
            <button className="absolute right-6 top-1/2 -translate-y-1/2 text-[#222222] hover:text-[#CB927A] transition-colors">
              <Search size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Map & Store List Section */}
        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
          
          {/* Left: Interactive Map */}
          <div className="flex-1 min-h-[450px] md:min-h-[550px] bg-[#F1F1F1] relative rounded-sm overflow-hidden border border-gray-100 shadow-sm transition-transform duration-500">
            <iframe
              title="google-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.1583091352!2d-74.11976373924611!3d40.69766374859258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1710560000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[0.1] hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </div>

          {/* Right: Store Details List */}
          <div className="w-full lg:w-[420px]">
            <div className="space-y-10 max-h-[700px] overflow-y-auto pr-6 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              <style dangerouslySetInnerHTML={{ __html: `.space-y-10::-webkit-scrollbar { display: none; }` }} />
              {stores.map((store, index) => (
                <div key={index} className="group mb-12 last:mb-0">
                  <h3 className="font-serif text-[32px] text-[#222222] mb-4 group-hover:text-[#CB927A] transition-colors cursor-pointer leading-tight">
                    {store.name}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-[18px] text-[#666666] font-sans">
                      {store.address}
                    </p>
                    <p className="text-[18px] text-[#666666] font-sans">
                      {store.hours}
                    </p>
                    <p className="text-[18px] text-[#666666] font-sans">
                      Phone: {store.phone}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default FindStore;
