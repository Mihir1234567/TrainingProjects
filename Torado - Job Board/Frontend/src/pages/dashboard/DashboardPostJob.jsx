import React from "react";
import { Link } from "react-router-dom";
import PostJobForm from "../../components/dashboard/PostJobForm";

const DashboardPostJob = () => {
  return (
    <>
      {/* Header / Breadcrumb */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-torado-blue-900 mb-2">
          Post New A Job
        </h2>
        <p className="text-sm text-slate-500">
          <Link
            to="/"
            className="hover:text-torado-green-600 transition-colors"
          >
            Home
          </Link>
          <span className="px-1 text-slate-400">/</span>
          <Link
            to="/user-dashboard"
            className="hover:text-torado-green-600 transition-colors"
          >
            Dashboard
          </Link>
          <span className="px-1 text-slate-400">/</span>
          <span className="text-torado-green-600">Post Job</span>
        </p>
      </div>

      {/* Form Content */}
      <PostJobForm />
    </>
  );
};

export default DashboardPostJob;
