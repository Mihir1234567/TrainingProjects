// Home.jsx

import React, { useEffect, useState } from "react";
import { HeaderCorousel } from "../components/hero/HeaderCorousel";
import StatMarquee from "../components/hero/StatMarquee";
import ProductCarousel from "../components/product/ProductCorousel";
import { Categories } from "../components/product/Categories";
import ALL_PRODUCTS from "../components/productsData";
import ThrillerBanner from "../components/product/ThrillerBanner";
import { BannerGrid } from "../components/product/BannerGrid";
import { PicksForYouSection } from "../components/product/PicksForYouSection";
import FeaturedAuthors from "../components/product/AuthorsCorousel";
import { ClintTestemonialSection } from "../components/product/ClintTestemonialSection";
import { Services } from "../components/product/Services";
import NewsAndEvents from "../components/product/NewsAndEvents";
import useRecentlyViewed from "../hooks/useRecentlyViwed"; // 👈 Hook Import
import { s } from "framer-motion/client";
import QuickViewDrawer from "../components/QuickViewDrawer";

const Home = ({ showCoupon }) => {
  useEffect(() => {
    showCoupon && showCoupon();
  }, []);

  // 1. Initialize the hook function
  const { addRecentlyViewed } = useRecentlyViewed();

  // 2. Define all necessary ID arrays (Fixes ReferenceError)
  const BestSellingIds = ALL_PRODUCTS.filter(
    (product) => product.currentBestselling
  ).map((product) => product.id);

  const isHighlightIds = ALL_PRODUCTS.filter(
    (product) => product.isHighlight
  ).map((product) => product.id);

  const HalfPriced = ALL_PRODUCTS.filter((product) => product.isHalfPrice).map(
    (product) => product.id
  );

  const smallBooks = ALL_PRODUCTS.filter((product) => product.isPickForYou).map(
    (product) => product.id
  );

  const featuredBook = ALL_PRODUCTS.filter((product) => product.isFeatured).map(
    (product) => product.id
  );
  const [activeProduct, setActiveProduct] = useState(null); // State for Drawer
  return (
    <main className="flex-grow">
      <HeaderCorousel />
      <StatMarquee />
      {/* 3. Pass the handler to all product-displaying components */}
      <ProductCarousel
        title="This week's highlights"
        productIds={isHighlightIds}
        onViewProduct={addRecentlyViewed}
        slidesToShowCount={6}
      onQuickView={(product) => setActiveProduct(product)}
      />
      <Categories></Categories>
      <ProductCarousel
        title="Current Bestsellers"
        productIds={BestSellingIds}
        onViewProduct={addRecentlyViewed}
        onQuickView={(product) => setActiveProduct(product)}
        slidesToShowCount={6}
      />
      <ThrillerBanner />
      <ProductCarousel
        title="Current Bestsellers"
        productIds={HalfPriced}
        onViewProduct={addRecentlyViewed}
        onQuickView={(product) => setActiveProduct(product)}
        slidesToShowCount={6}
      />
      <BannerGrid />
      <PicksForYouSection
        featuredBooks={featuredBook}
        smallBook={smallBooks}
        onViewProduct={addRecentlyViewed} // Also ensure this component accepts and passes it down
        onQuickView={(product) => setActiveProduct(product)}
        />
      <QuickViewDrawer
        onQuickView={(product) => setActiveProduct(product)}
        onViewProduct={addRecentlyViewed} // Also ensure this component accepts and passes it down
        isOpen={!!activeProduct}
        onClose={() => setActiveProduct(null)}
        product={activeProduct}
      />
      <FeaturedAuthors></FeaturedAuthors>
      <ClintTestemonialSection />
      <Services />
      <NewsAndEvents />
    </main>
  );
};

export default Home;
