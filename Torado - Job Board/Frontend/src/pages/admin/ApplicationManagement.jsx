import React, { useState, useEffect } from "react";
import { adminAPI } from "../../services/api";
import {
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Briefcase,
  User,
  MoreVertical,
} from "lucide-react";

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalApps, setTotalApps] = useState(0);

  useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter]);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const filters = {
        page,
        limit: 10,
        status: statusFilter,
      };
      const data = await adminAPI.getApplications(filters);
      setApplications(data.applications);
      setTotalPages(data.pages);
      setTotalApps(data.total);
    } catch (error) {
      console.error("Failed to fetch applications", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    if (!window.confirm(`Mark this application as ${newStatus}?`)) return;
    try {
      await adminAPI.updateApplicationStatus(id, newStatus);
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app,
        ),
      );
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Hired":
        return "bg-green-100 text-green-700 border-green-200";
      case "Interview":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-[22px] font-bold text-[#002333]">
            Application Management ({totalApps})
          </h2>
          <p className="text-slate-500">Monitor and manage job applications</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Interview">Interview</option>
          <option value="Hired">Hired</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Applications Table */}
      {/* Applications Table / List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Mobile Card View */}
        <div className="md:hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading applications...
            </div>
          ) : applications.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {applications.map((app) => (
                <div key={app._id} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold shrink-0">
                        <User size={16} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[#002333] text-sm truncate">
                          {app.candidateId?.name || "Unknown"}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {app.jobId?.title || "Unknown Job"}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(app.status)}`}
                    >
                      {app.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Briefcase size={12} /> {app.jobId?.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={12} />{" "}
                      {new Date(app.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-50">
                    {app.status !== "Hired" && (
                      <button
                        onClick={() => handleStatusUpdate(app._id, "Hired")}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-green-700 bg-green-50 rounded-lg"
                      >
                        <CheckCircle size={14} /> Hire
                      </button>
                    )}
                    {app.status !== "Rejected" && (
                      <button
                        onClick={() => handleStatusUpdate(app._id, "Rejected")}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 rounded-lg"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">
              No applications found.
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Candidate
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Job & Company
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Status
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Applied Date
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    Loading applications...
                  </td>
                </tr>
              ) : applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold">
                          <User size={14} />
                        </div>
                        <div>
                          <p className="font-bold text-[#002333] text-sm">
                            {app.candidateId?.name || "Unknown Candidate"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {app.candidateId?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-[#002333] text-sm">
                          {app.jobId?.title || "Unknown Job"}
                        </p>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <Briefcase size={10} />
                          {app.jobId?.company || "Unknown Company"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(app.status)}`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {/* Simple status toggle for admin intervention */}
                      <div className="flex items-center justify-end gap-2">
                        {app.status !== "Hired" && (
                          <button
                            onClick={() => handleStatusUpdate(app._id, "Hired")}
                            title="Force Hire"
                            className="p-1.5 text-green-600 hover:bg-green-50 rounded"
                          >
                            <CheckCircle size={16} />
                          </button>
                        )}
                        {app.status !== "Rejected" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(app._id, "Rejected")
                            }
                            title="Force Reject"
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                          >
                            <XCircle size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationManagement;
