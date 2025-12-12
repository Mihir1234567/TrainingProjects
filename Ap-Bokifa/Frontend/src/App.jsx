/* d:/Projects/Ap-Bokifa-main/src/App.jsx */
// App.jsx

import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // ADDED
import { AnimatePresence } from "framer-motion"; // ADDED
import PageTransition from "./components/common/PageTransition"; // ADDED

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ScrollToTop from "./pages/ScrollToTop";
import RecentlyViewedSidebar from "./components/RecentlyViewedSidebar";
import Footer from "./components/Footer";
import NewsletterSocials from "./components/product/NewsletterSocials";

import BookstorePage from "./pages/BookstorePage";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CollectionsBooks from "./pages/CollectionsBooks";
import CategoryLanding from "./pages/CategoryLanding";
import { Coupon } from "./components/Coupon";
import { ProductLayoutClassic } from "./pages/ProductLayoutClassic";
import { ProductLayoutScrollFixed } from "./pages/ProductLayoutScrollFixed";
import { ProductLayoutLeftThumbs } from "./pages/ProductLayoutLeftThumbs";
import { ProductLayoutRightThumbs } from "./pages/ProductLayoutRightThumbs";
import { ProductLayoutWithoutThumbs } from "./pages/ProductLayoutWithoutThumbs";
import { TypeWithVideo } from "./pages/TypeWithVideo";
import ProductDetailPage from "./pages/ProductDetailPage";
import SearchResultsPage from "./pages/SearchResultsPage";

import UpsellModal from "./components/UpsellModal";
import CrossSell from "./components/CrossSell";
import BlogPage from "./pages/BlogPage_Grid";
import BlogPageList from "./pages/BlogPage_Standard";
import BlogPostDetailWithSidebar from "./pages/BlogPage";
import AboutSection from "./pages/AboutUs";
import ContactPage from "./pages/ContactPage";
import MeetOurTeam from "./pages/OurTeam";
import NotFoundPage from "./pages/PageNotFound";
import LookBook from "./pages/LookBook";
import FAQPage from "./pages/FAQPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import LoginPromptModal from "./components/LoginPromptModal"; // New Import
import CartPage from "./pages/CartPage";
import Wishlist from "./pages/Wishlist";
import Compare from "./pages/Compare";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import { WishlistProvider } from "./context/WishlistContext";
import { CompareProvider } from "./context/CompareContext";

import { CartProvider } from "./context/CartContext";

const App = () => {
  // 1. State to control the visibility of the coupon
  const [isCouponVisible, setIsCouponVisible] = useState(false);

  // 2. Add new state for the upsell modal
  const [isUpsellModalOpen, setIsUpsellModalOpen] = useState(false);
  const [isCrossSellOpen, setIsCrossSellOpen] = useState(false);

  // 3. Lifted Search State
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  // Access Auth Context for Modal Control
  const { isLoginModalOpen, closeLoginModal } = useAuth(); // New Hook Usage

  // Get current location to detect route changes
  const location = useLocation();

  // 💡 LIST OF ROUTES WHERE NAV, FOOTER, & SIDEBARS SHOULD BE HIDDEN
  const hideLayoutRoutes = ["/signup", "/login"];
  const shouldShowLayout = !hideLayoutRoutes.includes(location.pathname);

  // 💡 EFFECT TO BLOCK SCROLL
  useEffect(() => {
    const body = document.body;
    if (
      isUpsellModalOpen ||
      isCrossSellOpen ||
      isCouponVisible ||
      isCouponVisible ||
      isSearchOpen ||
      isLoginModalOpen // Added
    ) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
    return () => {
      body.style.overflow = "auto";
    };
  }, [
    isUpsellModalOpen,
    isCrossSellOpen,
    isCouponVisible,
    isSearchOpen,
    isLoginModalOpen, // Added to Dependencies
  ]);

  const closeCoupon = () => {
    setIsCouponVisible(false);
  };

  const showCouponManually = (e) => {
    if (e) e.preventDefault();
    setIsCouponVisible(true);
  };
  const showCrossSellManually = () => {
    setIsCrossSellOpen(true);
  };

  const openUpsellModal = (e) => {
    if (e) e.preventDefault();
    setIsUpsellModalOpen(true);
  };
  const closeUpsellModal = () => {
    setIsUpsellModalOpen(false);
  };
  const openCrossSellModal = (e) => {
    if (e) e.preventDefault();
    setIsCrossSellOpen(true);
  };
  const closeCrossSellModal = () => {
    setIsCrossSellOpen(false);
  };

  // Add login modal to scroll lock effect if needed, or just let it overlay.
  // Removed redundant scroll lock effect (merged above)

  return (
    <>
      <CartProvider>
        <WishlistProvider>
          <CompareProvider>
            <div className="flex flex-col min-h-screen">
              <ScrollToTop />

              {/* 4. Only show Navbar if we are NOT on a hidden route */}
              {shouldShowLayout && (
                <Navbar
                  onUpsellClick={openUpsellModal}
                  onCrossSellClick={openCrossSellModal}
                  onCouponClick={showCouponManually}
                  isSearchOpen={isSearchOpen}
                  onSearchClose={closeSearch}
                  onSearchOpen={openSearch}
                />
              )}

              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route
                    path="/"
                    element={
                      <PageTransition>
                        <Home />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/AllProducts"
                    element={
                      <PageTransition>
                        <BookstorePage />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/collections/categories"
                    element={<CategoryLanding />}
                  />
                  <Route
                    path="/collections/books"
                    element={<CollectionsBooks />}
                  />

                  <Route
                    path="/productPageClassic"
                    element={<ProductLayoutClassic />}
                  />
                  <Route
                    path="/productPageScrollFixed"
                    element={<ProductLayoutScrollFixed />}
                  />
                  <Route
                    path="/productPageLeftThumbs"
                    element={<ProductLayoutLeftThumbs />}
                  />
                  <Route
                    path="/productPageRightThumbs"
                    element={<ProductLayoutRightThumbs />}
                  />
                  <Route
                    path="/productPageWithoutThumbs"
                    element={<ProductLayoutWithoutThumbs />}
                  />
                  <Route path="/typeWithVideo" element={<TypeWithVideo />} />
                  <Route
                    path="/product/:productId"
                    element={
                      <PageTransition>
                        <ProductDetailPage />
                      </PageTransition>
                    }
                  />
                  <Route path="/search" element={<SearchResultsPage />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/compare" element={<Compare />} />
                  <Route path="/orderHistory" element={<OrderHistoryPage />} />
                  <Route path="/blog/grid" element={<BlogPage />} />
                  <Route
                    path="/blog/standard"
                    element={<BlogPageList onSearchClick={openSearch} />}
                  />
                  <Route
                    path="/blog/post/:postId"
                    element={
                      <BlogPostDetailWithSidebar onSearchClick={openSearch} />
                    }
                  />
                  <Route path="/about" element={<AboutSection />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/our-team" element={<MeetOurTeam />} />
                  <Route path="/PageNotFound" element={<NotFoundPage />} />
                  <Route path="/LookBook" element={<LookBook />} />
                  <Route path="/FAQ" element={<FAQPage />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/cart"
                    element={
                      <PageTransition>
                        <CartPage />
                      </PageTransition>
                    }
                  />
                  <Route
                    path="/my-orders"
                    element={
                      <PageTransition>
                        <OrderHistoryPage />
                      </PageTransition>
                    }
                  />
                  <Route path="/*" element={<NotFoundPage />} />
                </Routes>
              </AnimatePresence>

              {/* 💡 Only show these if we are NOT on a hidden route (Signup/Login) */}
              {shouldShowLayout && (
                <>
                  <RecentlyViewedSidebar />
                  <NewsletterSocials />
                  <Footer />
                </>
              )}
            </div>

            {isCouponVisible && <Coupon onClose={closeCoupon} />}
            {isUpsellModalOpen && <UpsellModal onClose={closeUpsellModal} />}
            {isCrossSellOpen && <CrossSell onClose={closeCrossSellModal} />}
          </CompareProvider>
        </WishlistProvider>
      </CartProvider>
      {/* Render Login Prompt Modal Globally */}
      <LoginPromptModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default App;
