import React, { useState, useEffect } from "react";
import { adminAPI } from "../../services/api";
import {
  Search,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  MoreVertical,
  Filter,
} from "lucide-react";

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0);

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm, statusFilter]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const filters = {
        page,
        limit: 10,
        keyword: searchTerm,
        status: statusFilter,
      };
      const data = await adminAPI.getJobs(filters);
      setJobs(data.jobs);
      setTotalPages(data.pages);
      setTotalJobs(data.total);
    } catch (error) {
      console.error("Failed to fetch jobs", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    if (
      !window.confirm(`Are you sure you want to mark this job as ${newStatus}?`)
    )
      return;
    try {
      await adminAPI.updateJobStatus(id, newStatus);
      // Optimistic update
      setJobs((prev) =>
        prev.map((job) =>
          job._id === id ? { ...job, status: newStatus } : job,
        ),
      );
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this job? This is a soft delete.",
      )
    )
      return;
    try {
      await adminAPI.deleteJob(id);
      setJobs((prev) => prev.filter((job) => job._id !== id));
      setTotalJobs((prev) => prev - 1);
    } catch (error) {
      console.error("Failed to delete job", error);
      alert("Failed to delete job");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      case "Closed":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-slate-100 text-slate-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-[22px] font-bold text-[#002333]">
            Job Management ({totalJobs})
          </h2>
          <p className="text-slate-500">Oversee and moderate job postings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by title or company..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      {/* Jobs Table */}
      {/* Jobs Table / List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Mobile Card View */}
        <div className="md:hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading jobs...
            </div>
          ) : jobs.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {jobs.map((job) => (
                <div key={job._id} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0 pr-2">
                      <h3 className="font-bold text-[#002333] truncate">
                        {job.title}
                      </h3>
                      <p className="text-sm text-slate-500 truncate">
                        {job.companyId?.name ||
                          job.company ||
                          "Unknown Company"}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(job.status)}`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-sm text-slate-500">
                    <span>
                      {job.type} • {job.location}
                    </span>
                    <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 pt-2 border-t border-slate-50">
                    {/* Approve Button */}
                    {job.status === "Pending" && (
                      <button
                        onClick={() => handleStatusUpdate(job._id, "Active")}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-green-700 bg-green-50 rounded-lg"
                      >
                        <CheckCircle size={14} /> Approve
                      </button>
                    )}
                    {/* Reject Button */}
                    {job.status !== "Rejected" && (
                      <button
                        onClick={() => handleStatusUpdate(job._id, "Rejected")}
                        className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-orange-700 bg-orange-50 rounded-lg"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(job._id)}
                      className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 rounded-lg"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">
              No jobs found matching your filters.
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Job Details
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Company & Recruiter
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Status
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Posted
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
                    Loading jobs...
                  </td>
                </tr>
              ) : jobs.length > 0 ? (
                jobs.map((job) => (
                  <tr key={job._id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <p className="font-bold text-[#002333]">{job.title}</p>
                      <div className="flex gap-2 text-xs text-slate-500 mt-1">
                        <span className="px-2 py-0.5 bg-slate-100 rounded">
                          {job.type}
                        </span>
                        <span>{job.location}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-[#002333]">
                        {job.companyId?.name ||
                          job.company ||
                          "Unknown Company"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {job.recruiterId?.email || "Unknown Recruiter"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(job.status)}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* Approve Button */}
                        {job.status === "Pending" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(job._id, "Active")
                            }
                            title="Approve"
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          >
                            <CheckCircle size={18} />
                          </button>
                        )}
                        {/* Reject Button */}
                        {job.status !== "Rejected" && (
                          <button
                            onClick={() =>
                              handleStatusUpdate(job._id, "Rejected")
                            }
                            title="Reject"
                            className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg"
                          >
                            <XCircle size={18} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(job._id)}
                          title="Delete"
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
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
                    No jobs found matching your filters.
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

export default JobManagement;
