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
    <div className="bg-[#F5F7FC] min-h-screen pt-20 lg:pt-32 pb-12 lg:pb-20">
      <div className="max-w-[1400px] px-4 sm:px-6 lg:px-12 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 text-left">
          {/* Sidebar */}
          <DashboardSidebar
            isOpen={isDashboardSidebarOpen}
            onClose={() => setIsDashboardSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
