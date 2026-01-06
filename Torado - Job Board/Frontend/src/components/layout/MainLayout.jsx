import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingActions from "../common/FloatingActions";
import DemoModal from "../common/DemoModal";
import ScrollToTop from "../common/ScrollToTop";

const MainLayout = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative">
      <Navbar
        toggleDashboardSidebar={() =>
          setIsDashboardSidebarOpen(!isDashboardSidebarOpen)
        }
        isDashboardSidebarOpen={isDashboardSidebarOpen}
      />
      <div className="flex-grow">
        <Outlet
          context={{ isDashboardSidebarOpen, setIsDashboardSidebarOpen }}
        />
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
