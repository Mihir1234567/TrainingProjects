import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Package as PackageIcon,
  ChevronDown,
  Search,
  ExternalLink,
} from "lucide-react";

const Package = () => {
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState("Default");

  const packages = [
    {
      id: 1,
      srNo: "01",
      transactionId: "#WKPL12363",
      title: "Silver Pack",
      expired: "31-Jan-23",
      totalJobs: 10,
      used: 20,
      remain: 30,
      status: "Active",
      color: "text-blue-600",
    },
    {
      id: 2,
      srNo: "01",
      transactionId: "#WKPL12364",
      title: "Golden Pack",
      expired: "31-Jan-23",
      totalJobs: 20,
      used: 30,
      remain: 10,
      status: "Active",
      color: "text-[#5BBB7B]",
    },
    {
      id: 3,
      srNo: "01",
      transactionId: "#WKPL12365",
      title: "Premium Pack",
      expired: "31-Jan-23",
      totalJobs: 30,
      used: 40,
      remain: 20,
      status: "Active",
      color: "text-[#1967D2]",
    },
    {
      id: 4,
      srNo: "01",
      transactionId: "#WKPL12366",
      title: "Golden Pack",
      expired: "31-Jan-23",
      totalJobs: 40,
      used: 50,
      remain: 11,
      status: "Active",
      color: "text-[#5BBB7B]",
    },
    {
      id: 5,
      srNo: "01",
      transactionId: "#WKPL12367",
      title: "Silver Pack",
      expired: "31-Jan-23",
      totalJobs: 50,
      used: 60,
      remain: 15,
      status: "Active",
      color: "text-blue-600",
    },
    {
      id: 6,
      srNo: "01",
      transactionId: "#WKPL12368",
      title: "Premium Pack",
      expired: "31-Jan-23",
      totalJobs: 60,
      used: 70,
      remain: 18,
      status: "Active",
      color: "text-[#1967D2]",
    },
    {
      id: 7,
      srNo: "01",
      transactionId: "#WKPL12369",
      title: "Golden Pack",
      expired: "31-Jan-23",
      totalJobs: 70,
      used: 80,
      remain: 16,
      status: "Active",
      color: "text-[#5BBB7B]",
    },
    {
      id: 8,
      srNo: "01",
      transactionId: "#WKPL12370",
      title: "Platinum Pack",
      expired: "31-Jan-23",
      totalJobs: 80,
      used: 90,
      remain: 13,
      status: "Active",
      color: "text-purple-600",
    },
    {
      id: 9,
      srNo: "01",
      transactionId: "#WKPL12371",
      title: "Golden Pack",
      expired: "31-Jan-23",
      totalJobs: 90,
      used: 30,
      remain: 15,
      status: "Active",
      color: "text-[#5BBB7B]",
    },
    {
      id: 10,
      srNo: "01",
      transactionId: "#WKPL12372",
      title: "Premium Pack",
      expired: "31-Jan-23",
      totalJobs: 20,
      used: 10,
      remain: 10,
      status: "Active",
      color: "text-[#1967D2]",
    },
    {
      id: 11,
      srNo: "01",
      transactionId: "#WKPL12373",
      title: "Silver Pack",
      expired: "31-Jan-23",
      totalJobs: 40,
      used: 80,
      remain: 11,
      status: "Active",
      color: "text-blue-600",
    },
  ];

  const sortedPackages = useMemo(() => {
    let result = [...packages];
    if (selectedSort === "Newest") {
      result.sort((a, b) => new Date(b.expired) - new Date(a.expired));
    } else if (selectedSort === "Oldest") {
      result.sort((a, b) => new Date(a.expired) - new Date(b.expired));
    }
    return result;
  }, [packages, selectedSort]);

  const totalPages = Math.ceil(sortedPackages.length / itemsPerPage);

  const paginatedPackages = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedPackages.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedPackages, currentPage, itemsPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[22px] font-bold text-[#002333]">Package</h2>
        <div className="text-[13px] text-slate-400 font-medium">
          <Link to="/" className="hover:text-[#5BBB7B] transition-colors">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link
            to="/user-dashboard"
            className="hover:text-[#5BBB7B] transition-colors"
          >
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[#5BBB7B]">Package</span>
        </div>
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[20px] shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden"
      >
        {/* Table Filter Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <p className="text-[15px] font-medium text-slate-500">
            Current active packages:{" "}
            <span className="text-[#002333] font-bold">{packages.length}</span>
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <select
                value={selectedSort}
                onChange={(e) => {
                  setSelectedSort(e.target.value);
                  setCurrentPage(1);
                }}
                className="appearance-none bg-slate-50 border-none rounded-xl px-5 py-2.5 pr-10 text-[14px] font-bold text-[#002333] cursor-pointer focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none w-[160px]"
              >
                <option value="Default">Sort by (Default)</option>
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={14}
              />
            </div>
            <div className="relative">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="appearance-none bg-slate-50 border-none rounded-xl px-5 py-2.5 pr-10 text-[14px] font-bold text-[#002333] cursor-pointer focus:ring-2 focus:ring-[#5BBB7B]/20 outline-none w-[120px]"
              >
                {[20, 30, 50, 100].map((opt) => (
                  <option key={opt} value={opt}>
                    Show {opt}
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={14}
              />
            </div>
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto custom-scrollbar">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="bg-slate-50/50 text-left border-b border-slate-100">
                <th className="px-5 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider">
                  Sr. No
                </th>
                <th className="px-3 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider">
                  Transaction id
                </th>
                <th className="px-3 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider">
                  Package Title
                </th>
                <th className="px-3 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider text-center">
                  Expired
                </th>
                <th className="px-3 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider text-center">
                  Total Jobs
                </th>
                <th className="px-3 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider text-center">
                  Used
                </th>
                <th className="px-3 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider text-center">
                  Remain
                </th>
                <th className="px-5 py-5 text-[13px] font-bold text-[#002333] uppercase tracking-wider text-right pr-4">
                  Status
                </th>
              </tr>
            </thead>
            <AnimatePresence mode="wait">
              <motion.tbody
                key={`${currentPage}-${itemsPerPage}-${selectedSort}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="divide-y divide-slate-100 min-h-[400px]"
              >
                {paginatedPackages.length > 0 ? (
                  paginatedPackages.map((pkg) => (
                    <tr
                      key={pkg.id}
                      className="group hover:bg-slate-50/30 transition-all duration-300"
                    >
                      <td className="px-5 py-6 text-[13px] font-bold text-[#002333]">
                        {pkg.srNo}
                      </td>
                      <td className="px-3 py-6 text-[13px] font-bold text-slate-500 whitespace-nowrap">
                        {pkg.transactionId}
                      </td>
                      <td className="px-3 py-6">
                        <Link
                          to="#"
                          className={`text-[13px] font-bold ${pkg.color} hover:underline flex items-center gap-1.5`}
                        >
                          {pkg.title}
                          <ExternalLink size={12} className="opacity-50" />
                        </Link>
                      </td>
                      <td className="px-3 py-6 text-center text-[13px] font-bold text-[#002333] italic">
                        {pkg.expired}
                      </td>
                      <td className="px-3 py-6 text-center text-[13px] font-bold text-slate-500">
                        {pkg.totalJobs}
                      </td>
                      <td className="px-3 py-6 text-center text-[13px] font-bold text-slate-500">
                        {pkg.used}
                      </td>
                      <td className="px-3 py-6 text-center text-[13px] font-bold text-slate-500">
                        {pkg.remain}
                      </td>
                      <td className="px-5 py-6 text-right pr-4">
                        <span className="text-blue-600 text-[14px] font-bold hover:underline cursor-pointer">
                          {pkg.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="py-20 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                          <Search size={40} />
                        </div>
                        <h5 className="text-[18px] font-bold text-[#002333]">
                          No packages found
                        </h5>
                      </div>
                    </td>
                  </tr>
                )}
              </motion.tbody>
            </AnimatePresence>
          </table>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden divide-y divide-slate-100">
          {paginatedPackages.map((pkg) => (
            <div key={pkg.id} className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">
                  #{pkg.srNo} • {pkg.transactionId}
                </span>
                <span className="text-blue-600 text-[13px] font-bold">
                  {pkg.status}
                </span>
              </div>
              <div>
                <h4 className={`text-[16px] font-bold ${pkg.color}`}>
                  {pkg.title}
                </h4>
                <p className="text-[13px] text-slate-400 font-medium mt-1">
                  Expired: <span className="text-[#002333]">{pkg.expired}</span>
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-50">
                <div className="text-center">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">
                    Total
                  </p>
                  <p className="text-[14px] font-bold text-[#002333]">
                    {pkg.totalJobs}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">
                    Used
                  </p>
                  <p className="text-[14px] font-bold text-[#002333]">
                    {pkg.used}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">
                    Remain
                  </p>
                  <p className="text-[14px] font-bold text-[#002333]">
                    {pkg.remain}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination bar */}
        {totalPages > 1 && (
          <div className="p-8 flex justify-center border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <ChevronDown
                  className="rotate-90 group-hover:-translate-x-0.5 transition-transform"
                  size={16}
                />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-bold transition-all ${
                      num === currentPage
                        ? "bg-[#5BBB7B] text-white shadow-lg shadow-[#5BBB7B]/30 scale-110"
                        : "bg-slate-50 text-slate-400 hover:bg-slate-100"
                    }`}
                  >
                    {num < 10 ? `0${num}` : num}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <ChevronDown
                  className="-rotate-90 group-hover:translate-x-0.5 transition-transform"
                  size={16}
                />
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Package;
