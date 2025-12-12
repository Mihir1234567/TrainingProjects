// Home.jsx

import React, { useEffect, useState } from "react";
import { HeaderCarousel } from "../components/hero/HeaderCarousel"; // UPDATED

// ...

<HeaderCarousel />;
import StatMarquee from "../components/hero/StatMarquee";
import ProductCarousel from "../components/product/ProductCorousel";
import { Categories } from "../components/product/Categories";
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
import { useProducts } from "../hooks/useProducts"; // Import the hook

const Home = ({ showCoupon }) => {
  useEffect(() => {
    showCoupon && showCoupon();
  }, []);

  // 1. Initialize the hook function
  const { addRecentlyViewed } = useRecentlyViewed();

  // 2. Fetch Data
  const { products: highlightedProducts, loading: l1 } = useProducts({
    isHighlight: true,
  });
  const { products: bestSellingProducts, loading: l2 } = useProducts({
    currentBestselling: true,
  });
  const { products: halfPriceProducts, loading: l3 } = useProducts({
    isHalfPrice: true,
  });
  const { products: picksProducts, loading: l4 } = useProducts({
    isPickForYou: true,
  });
  const { products: featuredProducts, loading: l5 } = useProducts({
    isFeatured: true,
  });

  const loading = l1 || l2 || l3 || l4 || l5;

  const [activeProduct, setActiveProduct] = useState(null); // State for Drawer

  return (
    <main className="flex-grow">
      <HeaderCarousel />
      <StatMarquee />
      {/* 3. Pass the data to all product-displaying components */}
      <ProductCarousel
        title="This week's highlights"
        products={highlightedProducts}
        loading={loading} // Added
        onViewProduct={addRecentlyViewed}
        slidesToShowCount={6}
        onQuickView={(product) => setActiveProduct(product)}
      />
      <Categories></Categories>
      <ProductCarousel
        title="Current Bestsellers"
        products={bestSellingProducts}
        loading={loading} // Added
        onViewProduct={addRecentlyViewed}
        onQuickView={(product) => setActiveProduct(product)}
        slidesToShowCount={6}
      />
      <ThrillerBanner />
      <ProductCarousel
        title="Current Bestsellers"
        products={halfPriceProducts}
        loading={loading} // Added
        onViewProduct={addRecentlyViewed}
        onQuickView={(product) => setActiveProduct(product)}
        slidesToShowCount={6}
      />
      <BannerGrid />
      <PicksForYouSection
        featuredBook={featuredProducts[0]} // Pass the first featured book object
        smallBooks={picksProducts} // Pass the array of picks objects
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
