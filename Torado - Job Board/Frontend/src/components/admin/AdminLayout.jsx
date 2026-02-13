import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import ScrollToTop from "../common/ScrollToTop";
import { useAuth } from "../../context/AuthContext";
import { LogOut } from "lucide-react";
import LogoutModal from "../common/LogoutModal";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  // Redirect if not admin
  useEffect(() => {
    const isAdmin =
      user?.role === "admin" || user?.roles?.some((r) => r.name === "admin");
    if (user && !isAdmin) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    setIsLogoutModalOpen(false);
    logout();
    navigate("/");
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans text-slate-900">
      {/* Mobile Header */}
      <div className="xl:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <h1 className="font-bold text-lg text-[#002333]">Admin Panel</h1>
        </div>
        <button
          onClick={() => setIsLogoutModalOpen(true)}
          className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-lg"
        >
          <LogOut size={20} />
        </button>
      </div>

      {/* Desktop Top Bar (Optional, for Logout visibility) */}
      <div className="hidden xl:flex justify-between items-center px-8 py-4 bg-white border-b border-slate-200 sticky top-0 z-30 mb-6">
        <h1 className="font-bold text-xl text-[#002333]">Torado Admin</h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-bold text-[#002333]">{user?.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 xl:px-8 mx-auto py-6">
        <div className="flex flex-col xl:flex-row gap-6 xl:gap-8 text-left">
          {/* Sidebar */}
          <AdminSidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main Content Area */}
          <div className="flex-1 min-w-0 pb-24">
            <Outlet />
          </div>
        </div>
      </div>

      <ScrollToTop />

      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default AdminLayout;
