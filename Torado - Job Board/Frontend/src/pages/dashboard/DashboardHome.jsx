import React from "react";
import DashboardStats from "../../components/dashboard/DashboardStats";
import DashboardWidgets from "../../components/dashboard/DashboardWidgets";

const DashboardHome = () => {
  return (
    <>
      {/* Header / Breadcrumb */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-torado-blue-900 mb-2">
          User Dashboard
        </h2>
        <div className="text-sm text-slate-500">
          <span className="font-semibold text-torado-blue-900">
            Pamela Ledner
          </span>{" "}
          <span className="px-2">|</span> Home /{" "}
          <span className="text-torado-green-600">Dashboard</span>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Widgets (Notifications & Invoices) */}
      <DashboardWidgets />
    </>
  );
};

export default DashboardHome;
