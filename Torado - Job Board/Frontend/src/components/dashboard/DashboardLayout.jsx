import React, { useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  const { isDashboardSidebarOpen, setIsDashboardSidebarOpen } =
    useOutletContext() || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-20 xl:pt-32 pb-12 xl:pb-20">
      <div className="w-full px-4 sm:px-6 xl:px-8 mx-auto">
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-6 text-left">
          {/* Sidebar */}
          <DashboardSidebar
            isOpen={isDashboardSidebarOpen}
            onClose={() => setIsDashboardSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
