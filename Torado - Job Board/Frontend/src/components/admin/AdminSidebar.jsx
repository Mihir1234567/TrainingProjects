import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Shield,
  LogOut,
  X,
  Briefcase,
  FileText,
  Building,
  ClipboardList,
} from "lucide-react";
import LogoutModal from "../common/LogoutModal";
import { useAuth } from "../../context/AuthContext";

const AdminSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const menuItems = [
    { label: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { label: "User Management", path: "/admin/users", icon: Users },
    { label: "Role Management", path: "/admin/roles", icon: Shield },
    { label: "Job Postings", path: "/admin/jobs", icon: Briefcase },
    { label: "Applications", path: "/admin/applications", icon: FileText },
    { label: "Employers", path: "/admin/employers", icon: Building },
    { label: "Audit Logs", path: "/admin/logs", icon: ClipboardList },
  ];

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
    navigate("/");
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 bottom-0 right-0 z-[80] bg-white xl:bg-white overflow-y-auto transform transition-transform duration-300 ease-in-out xl:translate-x-0 xl:static xl:h-fit xl:shrink-0 xl:w-[280px] xl:rounded-lg xl:border xl:border-slate-100 xl:shadow-sm xl:p-6 p-4 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex xl:hidden justify-end mb-4">
          <button onClick={onClose} className="p-2 text-slate-500">
            <X size={24} />
          </button>
        </div>

        <div className="hidden xl:flex flex-col items-center justify-between mb-6 px-4">
          <div className="flex items-center justify-between w-full mb-4">
            <h3 className="text-lg font-bold text-torado-blue-900">
              Admin Panel
            </h3>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          {menuItems.map((item, index) => {
            const isActive =
              location.pathname === item.path ||
              location.pathname.startsWith(`${item.path}/`);

            return (
              <Link
                key={index}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-slate-50 text-torado-green-600 font-semibold"
                    : "text-slate-500 hover:text-torado-green-600 hover:bg-slate-50"
                }`}
              >
                <item.icon
                  size={20}
                  strokeWidth={1.5}
                  className={`transition-all duration-700 ease-in-out group-hover:[transform:rotateY(180deg)] ${
                    isActive
                      ? "text-torado-green-600"
                      : "text-slate-400 group-hover:text-torado-green-600"
                  }`}
                />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}

          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group text-slate-500 hover:text-red-500 hover:bg-red-50 mt-4 border-t border-slate-50 pt-6 w-full text-left"
          >
            <LogOut
              size={20}
              strokeWidth={1.5}
              className="transition-all duration-700 ease-in-out group-hover:[transform:rotateY(180deg)] text-slate-400 group-hover:text-red-500"
            />
            <span className="text-sm font-bold">Logout</span>
          </button>
        </nav>
      </div>

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default AdminSidebar;
