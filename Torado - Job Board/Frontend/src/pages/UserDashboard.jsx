import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardWidgets from "../components/dashboard/DashboardWidgets";

const UserDashboard = () => {
  const { isDashboardSidebarOpen, setIsDashboardSidebarOpen } =
    useOutletContext() || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="w-full px-6 lg:px-12 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <DashboardSidebar
            isOpen={isDashboardSidebarOpen}
            onClose={() => setIsDashboardSidebarOpen(false)}
          />

          {/* Main Content */}
          <div className="flex-1">
            {/* Header / Breadcrumb */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-torado-blue-900 mb-2">
                User Dashboard
              </h2>
              <p className="text-sm text-slate-500">
                <span className="font-semibold text-torado-blue-900">
                  Pamela Ledner
                </span>{" "}
                <span className="px-2">|</span> Home /{" "}
                <span className="text-torado-green-600">Dashboard</span>
              </p>
            </div>

            {/* Stats Cards */}
            <DashboardStats />

            {/* Widgets (Notifications & Invoices) */}
            <DashboardWidgets />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
