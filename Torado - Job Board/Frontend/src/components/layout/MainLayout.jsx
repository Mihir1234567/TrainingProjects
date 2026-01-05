import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingActions from "../common/FloatingActions";
import DemoModal from "../common/DemoModal";
import ScrollToTop from "../common/ScrollToTop";

const MainLayout = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />

      {/* Global Components */}
      <FloatingActions onOpenDemos={() => setIsDemoModalOpen(true)} />
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
