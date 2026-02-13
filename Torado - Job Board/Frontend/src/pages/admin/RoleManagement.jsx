import React, { useState, useEffect } from "react";
import { adminAPI } from "../../services/api";
import {
  Shield,
  Plus,
  Trash2,
  Edit,
  Check,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const PERMISSION_GROUPS = {
  Users: ["user:read", "user:update", "user:delete", "user:create"],
  Jobs: ["job:read", "job:create", "job:update", "job:delete", "job:approve"],
  Roles: ["role:read", "role:create", "role:update", "role:delete"],
  System: ["dashboard:view_stats", "logs:view"],
};

const DEFAULT_PERMISSIONS = {
  admin: [
    "user:read",
    "user:create",
    "user:update",
    "user:delete",
    "role:read",
    "role:create",
    "role:update",
    "role:delete",
    "job:read",
    "job:create",
    "job:update",
    "job:delete",
    "job:approve",
    "dashboard:view_stats",
    "logs:view",
  ],
  employer: [
    "job:create",
    "job:update",
    "job:delete",
    "job:read",
    "application:read",
    "candidate:read",
  ],
  candidate: ["application:create", "application:read", "job:read"],
};

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const editorRef = React.useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: [],
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const data = await adminAPI.getRoles();
      setRoles(data);
    } catch (error) {
      console.error("Failed to fetch roles", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePermissionToggle = (permission) => {
    setFormData((prev) => {
      const isSelected = prev.permissions.includes(permission);
      if (isSelected) {
        return {
          ...prev,
          permissions: prev.permissions.filter((p) => p !== permission),
        };
      } else {
        return { ...prev, permissions: [...prev.permissions, permission] };
      }
    });
  };

  const scrollToEditor = () => {
    // Small timeout to ensure DOM is updated
    setTimeout(() => {
      editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingRoleId(null);
    setFormData({ name: "", description: "", permissions: [] });
    scrollToEditor();
  };

  const startEdit = (role) => {
    setIsCreating(false);
    setEditingRoleId(role._id);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions || [],
    });
    scrollToEditor();
  };

  const cancelForm = () => {
    setIsCreating(false);
    setEditingRoleId(null);
    setFormData({ name: "", description: "", permissions: [] });
  };

  const handleResetDefaults = () => {
    const defaultPerms = DEFAULT_PERMISSIONS[formData.name];
    if (defaultPerms) {
      if (
        window.confirm(`Reset permissions to default for ${formData.name}?`)
      ) {
        setFormData((prev) => ({ ...prev, permissions: [...defaultPerms] }));
      }
    } else {
      alert("No default permissions defined for this role.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isCreating) {
        const newRole = await adminAPI.createRole(formData);
        setRoles([...roles, newRole]);
      } else {
        const updatedRole = await adminAPI.updateRole(editingRoleId, formData);
        setRoles(roles.map((r) => (r._id === editingRoleId ? updatedRole : r)));
      }
      cancelForm();
    } catch (error) {
      console.error("Failed to save role", error);
      alert("Failed to save role");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await adminAPI.deleteRole(id);
        setRoles(roles.filter((r) => r._id !== id));
      } catch (error) {
        console.error("Failed to delete role", error);
        alert("Failed to delete role. Ensure it is not a system role.");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-[22px] font-bold text-[#002333]">
            Role Management
          </h2>
          <p className="text-slate-500">
            Define roles and granular permissions
          </p>
        </div>
        {!isCreating && !editingRoleId && (
          <button
            onClick={startCreate}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#5BBB7B] text-white rounded-lg font-bold hover:bg-[#4a9c65] transition-colors shadow-lg shadow-[#5BBB7B]/20"
          >
            <Plus size={20} />
            Create New Role
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Role List */}
        <div className="xl:col-span-1 space-y-4">
          {roles.map((role) => (
            <div
              key={role._id}
              className={`p-5 rounded-xl border transition-all cursor-pointer ${
                editingRoleId === role._id
                  ? "bg-blue-50 border-blue-200 ring-2 ring-blue-500/20"
                  : "bg-white border-slate-100 hover:border-blue-200 hover:shadow-md"
              }`}
              onClick={() => !isCreating && startEdit(role)}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <Shield
                    size={18}
                    className={`shrink-0 ${
                      editingRoleId === role._id
                        ? "text-blue-600"
                        : "text-slate-400"
                    }`}
                  />
                  <h3 className="font-bold text-[#002333] truncate">
                    {role.name}
                  </h3>
                </div>
                {role.name !== "admin" &&
                  role.name !== "employer" &&
                  role.name !== "candidate" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(role._id);
                      }}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
              </div>
              <p className="text-sm text-slate-500 mb-3">{role.description}</p>
              <div className="flex flex-wrap gap-1">
                {role.permissions?.slice(0, 3).map((p) => (
                  <span
                    key={p}
                    className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full"
                  >
                    {p}
                  </span>
                ))}
                {(role.permissions?.length || 0) > 3 && (
                  <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                    +{role.permissions.length - 3} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Editor / Permission Matrix */}
        {(isCreating || editingRoleId) && (
          <div className="xl:col-span-2" ref={editorRef}>
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h3 className="text-lg font-bold text-[#002333]">
                  {isCreating
                    ? "Create New Role"
                    : `Edit Role: ${formData.name}`}
                </h3>
                <div className="flex flex-wrap gap-2 w-full md:w-auto">
                  {DEFAULT_PERMISSIONS[formData.name] && (
                    <button
                      onClick={handleResetDefaults}
                      className="px-4 py-2 text-sm text-orange-600 hover:bg-orange-50 rounded-lg font-bold transition-colors border border-transparent hover:border-orange-100 flex-1 md:flex-none"
                    >
                      Reset Defaults
                    </button>
                  )}
                  <button
                    onClick={cancelForm}
                    className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-50 rounded-lg font-medium transition-colors flex-1 md:flex-none"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 text-sm bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 flex-1 md:flex-none"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-[#002333] mb-1">
                      Role Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="e.g. Moderator"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#002333] mb-1">
                      Description
                    </label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                      placeholder="Role purpose..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#002333] mb-3">
                    Permissions
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Object.entries(PERMISSION_GROUPS).map(([group, perms]) => (
                      <div
                        key={group}
                        className="border border-slate-100 rounded-xl p-4 bg-slate-50/50"
                      >
                        <h4 className="font-bold text-slate-700 mb-3 border-b border-slate-200 pb-2">
                          {group}
                        </h4>
                        <div className="space-y-2">
                          {perms.map((perm) => (
                            <label
                              key={perm}
                              className="flex items-center gap-2 cursor-pointer group"
                            >
                              <div
                                className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                  formData.permissions.includes(perm)
                                    ? "bg-blue-600 border-blue-600 text-white"
                                    : "bg-white border-slate-300 group-hover:border-blue-400"
                                }`}
                              >
                                {formData.permissions.includes(perm) && (
                                  <Check size={14} />
                                )}
                              </div>
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={formData.permissions.includes(perm)}
                                onChange={() => handlePermissionToggle(perm)}
                              />
                              <span className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors">
                                {perm}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleManagement;
