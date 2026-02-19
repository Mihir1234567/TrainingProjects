import React, { useState, useEffect } from "react";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

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
    <div className="min-h-screen flex flex-col font-sans">
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
        <Hero />
      </div>
      <main className="flex-grow">
        {/* Placeholder content for scrolling */}
        <div className="h-[2000px] bg-gradient-to-b from-white to-[#FCF4E9]/30 p-20 text-center">
          <p className="text-gray-400 text-lg italic">
            Scroll down to experience the sticky navbar transition...
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
