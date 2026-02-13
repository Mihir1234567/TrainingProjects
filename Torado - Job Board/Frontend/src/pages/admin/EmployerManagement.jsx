import React, { useState, useEffect } from "react";
import { adminAPI } from "../../services/api";
import { Search, Building, Mail, Briefcase, MapPin } from "lucide-react";

const EmployerManagement = () => {
  const [employers, setEmployers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmployers, setTotalEmployers] = useState(0);

  useEffect(() => {
    fetchEmployers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm]);

  const fetchEmployers = async () => {
    setLoading(true);
    try {
      const filters = {
        page,
        limit: 10,
        keyword: searchTerm,
      };
      const data = await adminAPI.getEmployers(filters);
      setEmployers(data.users);
      setTotalPages(data.pages);
      setTotalEmployers(data.total);
    } catch (error) {
      console.error("Failed to fetch employers", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-[22px] font-bold text-[#002333]">
            Employer Management ({totalEmployers})
          </h2>
          <p className="text-slate-500">
            Manage registered companies and recruiters
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by name, company, or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Employers Table */}
      {/* Employers Table / List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Mobile Card View */}
        <div className="md:hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading employers...
            </div>
          ) : employers.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {employers.map((emp) => (
                <div key={emp._id} className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Building size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-[#002333] truncate">
                        {emp.companyName || "No Company Name"}
                      </p>
                      <p className="text-sm text-slate-500 truncate">
                        {emp.name}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-slate-600 flex items-center gap-2 truncate">
                      <Mail size={14} className="text-slate-400" /> {emp.email}
                    </div>
                    <div className="text-slate-600 flex items-center gap-2 truncate">
                      <MapPin size={14} className="text-slate-400" />{" "}
                      {emp.location || "N/A"}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-2 border-t border-slate-50">
                    <div className="text-center flex-1">
                      <p className="text-sm font-bold text-[#002333]">
                        {emp.totalJobs || 0}
                      </p>
                      <p className="text-xs text-slate-500">Total Jobs</p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-sm font-bold text-green-600">
                        {emp.activeJobs || 0}
                      </p>
                      <p className="text-xs text-slate-500">Active</p>
                    </div>
                    <div className="text-center flex-1">
                      <p className="text-sm font-bold text-slate-700">
                        {new Date(emp.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-xs text-slate-500">Joined</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">
              No employers found.
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Company / Recruiter
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Contact
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Stats
                </th>
                <th className="px-6 py-4 font-semibold text-slate-600">
                  Joined
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
                    Loading employers...
                  </td>
                </tr>
              ) : employers.length > 0 ? (
                employers.map((emp) => (
                  <tr key={emp._id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                          <Building size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-[#002333]">
                            {emp.companyName || "No Company Name"}
                          </p>
                          <p className="text-sm text-slate-500">{emp.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail size={14} className="text-slate-400" />
                          {emp.email}
                        </div>
                        {emp.location && (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin size={14} className="text-slate-400" />
                            {emp.location}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-4">
                        <div className="text-center">
                          <p className="text-sm font-bold text-[#002333]">
                            {emp.totalJobs || 0}
                          </p>
                          <p className="text-xs text-slate-500">Total Jobs</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-bold text-green-600">
                            {emp.activeJobs || 0}
                          </p>
                          <p className="text-xs text-slate-500">Active</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(emp.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No employers found.
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

export default EmployerManagement;
