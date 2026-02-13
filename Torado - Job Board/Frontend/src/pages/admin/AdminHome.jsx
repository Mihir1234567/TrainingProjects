import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Briefcase, Shield, Activity } from "lucide-react";
import { adminAPI, dashboardAPI } from "../../services/api";

const StatCard = ({ title, value, icon: Icon, color, bg }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
    <div className={`p-4 rounded-lg ${bg} ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-3xl font-bold text-[#002333]">{value}</h3>
      <p className="text-slate-500 font-medium">{title}</p>
    </div>
  </div>
);

const AdminHome = () => {
  const [stats, setStats] = useState({
    users: 0,
    jobs: 0,
    roles: 0,
    applications: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // We might need a dedicated admin stats endpoint, but for now we can aggregate
        // or just use public stats + some admin specific calls
        const publicStats = await dashboardAPI.getPublicStats();
        const roles = await adminAPI.getRoles();

        setStats({
          users: publicStats.candidates + publicStats.employers, // Approximate
          jobs: publicStats.liveJobs,
          roles: roles.length,
          applications: 0, // Placeholder or fetch real count
        });
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-[22px] font-bold text-[#002333]">
          Admin Dashboard
        </h2>
        <p className="text-slate-500">Overview of system status and activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.users}
          icon={Users}
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <StatCard
          title="Active Jobs"
          value={stats.jobs}
          icon={Briefcase}
          color="text-green-600"
          bg="bg-green-50"
        />
        <StatCard
          title="System Roles"
          value={stats.roles}
          icon={Shield}
          color="text-purple-600"
          bg="bg-purple-50"
        />
        <StatCard
          title="Total Applications"
          value={stats.applications}
          icon={Activity}
          color="text-orange-600"
          bg="bg-orange-50"
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-[#002333] mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/admin/users"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors"
          >
            Manage Users
          </Link>
          <Link
            to="/admin/roles"
            className="px-6 py-3 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors"
          >
            Manage Roles
          </Link>
          <Link
            to="/admin/jobs"
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors"
          >
            Manage Jobs
          </Link>
          <Link
            to="/admin/applications"
            className="px-6 py-3 bg-orange-600 text-white rounded-lg font-bold hover:bg-orange-700 transition-colors"
          >
            Manage Applications
          </Link>
          <Link
            to="/admin/employers"
            className="px-6 py-3 bg-teal-600 text-white rounded-lg font-bold hover:bg-teal-700 transition-colors"
          >
            view Employers
          </Link>
          <Link
            to="/admin/logs"
            className="px-6 py-3 bg-slate-600 text-white rounded-lg font-bold hover:bg-slate-700 transition-colors"
          >
            System Logs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
