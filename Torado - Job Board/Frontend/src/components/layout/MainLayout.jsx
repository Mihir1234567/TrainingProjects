import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "../common/ScrollToTop";
import { useAuth } from "../../context/AuthContext";

const MainLayout = () => {
  const { isAuthenticated, isRecruiter } = useAuth();
  const [isDashboardSidebarOpen, setIsDashboardSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative overflow-x-hidden">
      <Navbar
        toggleDashboardSidebar={() =>
          setIsDashboardSidebarOpen(!isDashboardSidebarOpen)
        }
        isDashboardSidebarOpen={isDashboardSidebarOpen}
        isRecruiter={isRecruiter}
        isAuthenticated={isAuthenticated}
      />
      <div className="flex-grow min-w-0">
        <Outlet
          context={{
            isDashboardSidebarOpen,
            setIsDashboardSidebarOpen,
            isRecruiter,
            isAuthenticated,
          }}
        />
      </div>
      <Footer />

      {/* Global Components */}
      {/* FloatingActions and DemoModal removed as per user request */}
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
