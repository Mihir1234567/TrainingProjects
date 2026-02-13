import React, { useEffect } from "react";
import { Outlet, useOutletContext, useNavigate } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";
import { useAuth } from "../../context/AuthContext";

const DashboardLayout = () => {
  const { isDashboardSidebarOpen, setIsDashboardSidebarOpen } =
    useOutletContext() || {};

  // Use AuthContext directly for accurate role detection
  const { user, isRecruiter } = useAuth();
  const navigate = useNavigate();

  // Redirect to profile completion if not completed (skip for admins)
  useEffect(() => {
    // Check if admin
    const isAdmin =
      user?.role === "admin" || user?.roles?.some((r) => r.name === "admin");

    if (user && isAdmin) {
      navigate("/admin");
      return;
    }

    if (user && !user.isProfileComplete) {
      navigate("/complete-profile");
    }
  }, [user, navigate]);

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
            onClose={() => setIsDashboardSidebarOpen?.(false)}
            isRecruiter={isRecruiter}
          />

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            <Outlet context={{ isRecruiter }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
