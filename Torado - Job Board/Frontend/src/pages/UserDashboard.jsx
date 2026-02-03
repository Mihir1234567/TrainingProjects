import React, { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardWidgets from "../components/dashboard/DashboardWidgets";

import { useAuth } from "../context/AuthContext";
import { dashboardAPI } from "../services/api";
import { useState } from "react";

const UserDashboard = () => {
  const { isDashboardSidebarOpen, setIsDashboardSidebarOpen } =
    useOutletContext() || {};
  const { user, isRecruiter } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await dashboardAPI.getStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [user]);

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
                  {user?.name || "User"}
                </span>{" "}
                <span className="px-2">|</span> Home /{" "}
                <span className="text-torado-green-600">Dashboard</span>
              </p>
            </div>

            {/* Stats Cards */}
            <DashboardStats
              isRecruiter={isRecruiter}
              stats={stats}
              loading={loading}
            />

            {/* Widgets (Notifications & Invoices) */}
            <DashboardWidgets
              isRecruiter={isRecruiter}
              recentActivity={stats?.recentActivity}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
