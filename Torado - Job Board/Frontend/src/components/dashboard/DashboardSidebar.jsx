import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  Bookmark,
  Database,
  Bell,
  Package,
  MessageSquare,
  User,
  Lock,
  LogOut,
  Trash2,
  X,
} from "lucide-react";

const DashboardSidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/user-dashboard", icon: LayoutDashboard },
    { label: "Post New Job", path: "/user-dashboard/post-job", icon: FileText },
    {
      label: "Manage Jobs",
      path: "/user-dashboard/manage-jobs",
      icon: Briefcase,
    },
    {
      label: "Manage Applicants",
      path: "/user-dashboard/manage-applicants",
      icon: Users,
    },
    {
      label: "Bookmark Resumes",
      path: "/user-dashboard/bookmark-resumes",
      icon: Bookmark,
    },
    {
      label: "Manage Resumes",
      path: "/user-dashboard/manage-resumes",
      icon: Database,
    },
    {
      label: "Create Resumes",
      path: "/user-dashboard/create-resumes",
      icon: FileText,
    },
    {
      label: "Applied Jobs",
      path: "/user-dashboard/applied-jobs",
      icon: Briefcase,
    },
    { label: "Alert Jobs", path: "/user-dashboard/alert-jobs", icon: Bell },
    { label: "Package", path: "/user-dashboard/package", icon: Package },
    { label: "Message", path: "/user-dashboard/messages", icon: MessageSquare },
    { label: "My Profile", path: "/user-dashboard/my-profile", icon: User },
    {
      label: "Change Password",
      path: "/user-dashboard/change-password",
      icon: Lock,
    },
    {
      label: "Delete Profile",
      path: "/user-dashboard/delete-profile",
      icon: Trash2,
    },
    { label: "Logout", path: "/logout", icon: LogOut },
  ];

  return (
    <>
      {/* Sidebar Container */}
      <div
        className={`fixed top-[72px] xl:top-0 left-0 bottom-0 right-0 z-[80] bg-white xl:bg-white overflow-y-auto transform transition-transform duration-300 ease-in-out xl:translate-x-0 xl:static xl:h-fit xl:shrink-0 xl:w-[280px] xl:rounded-lg xl:border xl:border-slate-100 xl:shadow-sm xl:p-6 p-4 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="hidden xl:flex items-center justify-between mb-6 px-4">
          <h3 className="text-lg font-bold text-torado-blue-900">Dashboard</h3>
        </div>

        <nav className="flex flex-col gap-1">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                onClick={onClose} // Close sidebar on mobile when link clicked
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
        </nav>
      </div>
    </>
  );
};

export default DashboardSidebar;
