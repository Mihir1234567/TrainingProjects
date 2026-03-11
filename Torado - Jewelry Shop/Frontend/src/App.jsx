import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShopWithoutSidebar from "./pages/ShopWithoutSidebar";
import ShopLeftSidebar from "./pages/ShopLeftSidebar";
import ShopRightSidebar from "./pages/ShopRightSidebar";
import ShopBanner from "./pages/ShopBanner";
import ShopGrid2Columns from "./pages/ShopGrid2Columns";
import ShopGrid3Columns from "./pages/ShopGrid3Columns";
import ShopGrid4Columns from "./pages/ShopGrid4Columns";
import ShopGrid5Columns from "./pages/ShopGrid5Columns";
import ShopListView from "./pages/ShopListView";
import ProductDefault from "./pages/ProductDefault";
import ProductPreorders from "./pages/ProductPreorders";
import ProductGalleryThumbnails from "./pages/ProductGalleryThumbnails";
import ProductBottomThumbnails from "./pages/ProductBottomThumbnails";
import ProductRightThumbnails from "./pages/ProductRightThumbnails";
import ProductCountdown from "./pages/ProductCountdown";

function App() {
  return (
    <Routes>
      <Route path="/shopDefault" element={<ShopWithoutSidebar />} />
      <Route path="/shop-without-sidebar" element={<ShopWithoutSidebar />} />
      <Route path="/shop-left-sidebar" element={<ShopLeftSidebar />} />
      <Route path="/shop-right-sidebar" element={<ShopRightSidebar />} />
      <Route path="/shop-banner" element={<ShopBanner />} />
      <Route path="/shop-grid-2-columns" element={<ShopGrid2Columns />} />
      <Route path="/shop-grid-3-columns" element={<ShopGrid3Columns />} />
      <Route path="/shop-grid-4-columns" element={<ShopGrid4Columns />} />
      <Route path="/shop-grid-5-columns" element={<ShopGrid5Columns />} />
      <Route path="/shop-list-view" element={<ShopListView />} />
      <Route path="/product/:id" element={<ProductDefault />} />
      <Route path="/product-preorders/:id" element={<ProductPreorders />} />
      <Route
        path="/product-drawer-sidebar/:id"
        element={<ProductPreorders />}
      />
      <Route
        path="/product-left-thumbnails/:id"
        element={<ProductPreorders />}
      />
      <Route
        path="/product-gallery-thumbnails/:id"
        element={<ProductGalleryThumbnails />}
      />
      <Route
        path="/product-bottom-thumbnails/:id"
        element={<ProductBottomThumbnails />}
      />
      <Route
        path="/product-right-thumbnails/:id"
        element={<ProductRightThumbnails />}
      />
      <Route
        path="/product-countdown/:id"
        element={<ProductCountdown />}
      />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
