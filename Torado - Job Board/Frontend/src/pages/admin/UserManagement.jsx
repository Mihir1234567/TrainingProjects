import React, { useState, useEffect } from "react";
import { adminAPI } from "../../services/api";
import {
  Search,
  Trash2,
  Edit,
  Check,
  X,
  Shield,
  MoreVertical,
} from "lucide-react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]); // Available system roles
  const [loading, setLoading] = useState(true);

  // Filters & Pagination State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRoleFilter, setSelectedRoleFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // Edit Mode State
  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchTerm, selectedRoleFilter]); // Re-fetch on filter/page change

  // Additional effect to fetch roles once
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const data = await adminAPI.getRoles();
      setRoles(data);
    } catch (error) {
      console.error("Failed to fetch roles", error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const filters = {
        page,
        limit: 10,
        keyword: searchTerm,
      };

      if (selectedRoleFilter !== "All") {
        filters.role = selectedRoleFilter;
      }

      const data = await adminAPI.getAllUsers(filters);

      // Handle response structure { users, total, page, pages }
      if (data.users) {
        setUsers(data.users);
        setTotalPages(data.pages);
        setTotalUsers(data.total);
      } else {
        // Fallback if backend not supporting pagination yet (though it should)
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to page 1 on search
  };

  const handleRoleFilter = (e) => {
    setSelectedRoleFilter(e.target.value);
    setPage(1); // Reset to page 1 on filter
  };

  const handleDeleteUser = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone.",
      )
    ) {
      try {
        await adminAPI.deleteUser(id);
        setUsers((prev) => prev.filter((u) => u._id !== id));
      } catch (error) {
        console.error("Failed to delete user", error);
        alert(error.response?.data?.message || "Failed to delete user");
      }
    }
  };

  const startEdit = (user) => {
    setEditingUserId(user._id);
    setEditFormData({
      name: user.name,
      email: user.email,
      role: user.role, // Legacy role
      roles: user.roles ? user.roles.map((r) => r._id) : [], // Initialize with role IDs
    });
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditFormData({});
  };

  const saveEdit = async () => {
    try {
      await adminAPI.updateUser(editingUserId, editFormData);

      // Optimistic update
      setUsers((prev) =>
        prev.map((u) =>
          u._id === editingUserId ? { ...u, ...editFormData } : u,
        ),
      );

      setEditingUserId(null);
    } catch (error) {
      console.error("Failed to update user", error);
      alert("Failed to update user");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-[22px] font-bold text-[#002333]">
            User Management ({totalUsers})
          </h2>
          <p className="text-slate-500">Manage system users and their roles</p>
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
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
        <select
          value={selectedRoleFilter}
          onChange={handleRoleFilter}
          className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
        >
          <option value="All">All Roles</option>
          <option value="candidate">Candidate</option>
          <option value="employer">Employer</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Users Table */}
      {/* Users Table / List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Mobile Card View */}
        <div className="md:hidden">
          {loading ? (
            <div className="p-8 text-center text-slate-500">
              Loading users...
            </div>
          ) : users.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {users.map((user) => (
                <div key={user._id} className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-[#002333] truncate">
                          {user.name}
                        </p>
                        <p className="text-sm text-slate-500 truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => startEdit(user)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Role Badges */}
                  <div className="flex flex-wrap gap-1">
                    {user.roles && user.roles.length > 0 ? (
                      user.roles.map((role) => (
                        <span
                          key={role._id}
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                            role.name === "admin"
                              ? "bg-purple-100 text-purple-700 border-purple-200"
                              : role.name === "employer"
                                ? "bg-blue-100 text-blue-700 border-blue-200"
                                : "bg-green-100 text-green-700 border-green-200"
                          }`}
                        >
                          {role.name}
                        </span>
                      ))
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-100 text-slate-500">
                        {user.role} (Legacy)
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">
              No users found matching your filters.
            </div>
          )}
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-semibold text-slate-600">User</th>
                <th className="px-6 py-4 font-semibold text-slate-600">Role</th>
                <th className="px-6 py-4 font-semibold text-slate-600 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    Loading users...
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/50">
                    <td className="px-6 py-4">
                      {editingUserId === user._id ? (
                        <>
                          <div className="space-y-2">
                            <input
                              type="text"
                              value={editFormData.name}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  name: e.target.value,
                                })
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                            />
                            <input
                              type="email"
                              value={editFormData.email}
                              onChange={(e) =>
                                setEditFormData({
                                  ...editFormData,
                                  email: e.target.value,
                                })
                              }
                              className="w-full px-2 py-1 border rounded text-sm"
                            />
                          </div>
                          <div className="mt-2">
                            <label className="block text-xs font-bold text-slate-500 mb-1">
                              Roles
                            </label>
                            <div className="flex flex-wrap gap-2">
                              {roles.map((role) => (
                                <button
                                  key={role._id}
                                  onClick={() => {
                                    const currentRoles =
                                      editFormData.roles || [];
                                    const hasRole = currentRoles.some(
                                      (r) =>
                                        r === role._id || r._id === role._id,
                                    ); // Check ID or object
                                    let newRoles;
                                    if (hasRole) {
                                      newRoles = currentRoles.filter(
                                        (r) => (r._id || r) !== role._id,
                                      );
                                    } else {
                                      newRoles = [...currentRoles, role._id];
                                    }
                                    setEditFormData({
                                      ...editFormData,
                                      roles: newRoles,
                                    });
                                  }}
                                  className={`px-2 py-1 text-xs rounded-md border ${
                                    (editFormData.roles || []).some(
                                      (r) => (r._id || r) === role._id,
                                    )
                                      ? "bg-blue-100 border-blue-300 text-blue-700"
                                      : "bg-slate-50 border-slate-200 text-slate-500 hover:border-blue-200"
                                  }`}
                                >
                                  {role.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-[#002333]">
                              {user.name}
                            </p>
                            <p className="text-sm text-slate-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editingUserId === user._id ? (
                        <div className="text-sm text-slate-500">
                          Select roles from the left
                        </div>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {user.roles && user.roles.length > 0 ? (
                            user.roles.map((role) => (
                              <span
                                key={role._id}
                                className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                                  role.name === "admin"
                                    ? "bg-purple-100 text-purple-700 border-purple-200"
                                    : role.name === "employer"
                                      ? "bg-blue-100 text-blue-700 border-blue-200"
                                      : "bg-green-100 text-green-700 border-green-200"
                                }`}
                              >
                                {role.name}
                                {role.isSystem && (
                                  <Shield
                                    size={10}
                                    className="inline ml-1 mb-0.5"
                                  />
                                )}
                              </span>
                            ))
                          ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-slate-100 text-slate-500">
                              {user.role} (Legacy)
                            </span>
                          )}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {editingUserId === user._id ? (
                          <>
                            <button
                              onClick={saveEdit}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                            >
                              <X size={18} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(user)}
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No users found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-sm text-slate-500">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex gap-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                // Simple pagination logic to show nearest pages or just 1..5 for now
                // A better logic would be needed for many pages
                let pNum = i + 1;
                if (totalPages > 5 && page > 3) {
                  pNum = page - 2 + i;
                }
                if (pNum > totalPages) return null;

                return (
                  <button
                    key={pNum}
                    onClick={() => setPage(pNum)}
                    className={`w-8 h-8 flex items-center justify-center text-sm rounded-lg ${
                      page === pNum
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {pNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
