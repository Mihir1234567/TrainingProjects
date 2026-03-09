import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ShopWithoutSidebar from "./pages/ShopWithoutSidebar";

function App() {
  return (
    <Routes>
      <Route path="/shopDefault" element={<ShopWithoutSidebar />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
