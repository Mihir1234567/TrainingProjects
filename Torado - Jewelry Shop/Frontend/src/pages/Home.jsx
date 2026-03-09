import React, { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import NewCollection from "../components/NewCollection";
import QualitySection from "../components/QualitySection";
import ShopByCategory from "../components/ShopByCategory";
import ExploreCollections from "../components/ExploreCollections";
import OurHappyClients from "../components/OurHappyClients";
import FeaturedProducts from "../components/FeaturedProducts";
import ToradoOnInstagram from "../components/ToradoOnInstagram";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import NewsletterPopup from "../components/NewsletterPopup";
import CookiePopup from "../components/CookiePopup";
import PurchasePopup from "../components/PurchasePopup";

const Home = () => {
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
        <Hero />
        <Benefits />
        <NewCollection />
        <QualitySection />
        <ShopByCategory />
        <ExploreCollections />
        <OurHappyClients />
        <FeaturedProducts />
        <ToradoOnInstagram />
        <Newsletter />
        <Footer />
        <ScrollToTop />
        <NewsletterPopup />
        <CookiePopup />
        <PurchasePopup />
      </div>
    </div>
  );
};

export default Home;
