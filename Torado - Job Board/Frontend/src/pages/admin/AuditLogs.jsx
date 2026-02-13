import React, { useState, useEffect } from "react";
import { adminAPI } from "../../services/api"; // We need to add getLogs to API
import { Search, List, User, Clock, AlertCircle } from "lucide-react";

// For now, we need to add the endpoint to api.js first or use a temporary one
// Let's assume adminAPI.getLogs exists or we'll add it momentarily.

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [actionFilter, setActionFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLogs, setTotalLogs] = useState(0);

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      try {
        const filters = {
          page,
          limit: 15,
          action: actionFilter,
          keyword: searchTerm,
        };
        const data = await adminAPI.getLogs(filters);
        setLogs(data.logs);
        setTotalPages(data.pages);
        setTotalLogs(data.total);
      } catch (err) {
        console.error("Failed to fetch logs", err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search a bit usually, but direct call is ok for now
    const timer = setTimeout(() => {
      fetchLogs();
    }, 300);

    return () => clearTimeout(timer);
  }, [page, actionFilter, searchTerm]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-[22px] font-bold text-[#002333]">
            System Audit Logs ({totalLogs})
          </h2>
          <p className="text-slate-500">
            Track critical system activities and security events
          </p>
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
            placeholder="Search by action or IP..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <select
          value={actionFilter}
          onChange={(e) => {
            setActionFilter(e.target.value);
            setPage(1);
          }}
          className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
        >
          <option value="">All Actions</option>
          <option value="USER_LOGIN">Login</option>
          <option value="ADMIN_JOB_UPDATE">Job Update</option>
          <option value="ADMIN_JOB_DELETE">Job Delete</option>
          <option value="ADMIN_APP_UPDATE">App Update</option>
        </select>
      </div>

      {/* Logs Table */}
      {/* Logs Table / List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Mobile Card View */}
        <div className="md:hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading logs...
            </div>
          ) : logs.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {logs.map((log) => (
                <div key={log._id} className="p-4 space-y-2">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-700">
                      {log.action}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Clock size={12} />
                      {new Date(log.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">
                      {log.performedBy?.name?.[0] || "?"}
                    </div>
                    <span className="text-sm font-medium text-[#002333]">
                      {log.performedBy?.name || "Unknown"}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                    {log.details && <p className="mb-1">{log.details}</p>}
                    {log.targetUser && (
                      <p className="font-semibold truncate">
                        Target: {log.targetUser.email}
                      </p>
                    )}
                    {log.changes && (
                      <div className="font-mono text-[10px] text-slate-500 mt-1 truncate">
                        {JSON.stringify(log.changes)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">No logs found.</div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Action
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Performed By
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Details / Target
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    Loading logs...
                  </td>
                </tr>
              ) : logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-bold bg-slate-100 px-2 py-1 rounded text-slate-700">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                          {log.performedBy?.name?.[0] || "?"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#002333]">
                            {log.performedBy?.name || "Unknown"}
                          </p>
                          <p className="text-xs text-slate-500">
                            {log.performedBy?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600">
                        {log.targetUser && (
                          <span className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                            Target: {log.targetUser.email || "User"}
                          </span>
                        )}
                        {log.changes && (
                          <div className="font-mono text-xs text-slate-500 bg-slate-50 p-1 rounded border border-slate-100 max-w-[200px] truncate">
                            {JSON.stringify(log.changes)}
                          </div>
                        )}
                        {log.details && <p>{log.details}</p>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        {new Date(log.createdAt).toLocaleString()}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No logs found.
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

export default AuditLogs;
