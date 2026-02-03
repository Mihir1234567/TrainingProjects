import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Package as PackageIcon,
  Check,
  Zap,
  Crown,
  Briefcase,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import Toast from "../../components/common/Toast";

const packages = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    icon: Briefcase,
    color: "slate",
    features: [
      "Post up to 3 jobs",
      "Basic applicant tracking",
      "Email notifications",
      "Standard support",
    ],
    popular: false,
  },
  {
    id: "pro",
    name: "Professional",
    price: "$29",
    period: "/month",
    icon: Zap,
    color: "blue",
    features: [
      "Post up to 15 jobs",
      "Advanced applicant tracking",
      "Priority email notifications",
      "Featured job listings",
      "Analytics dashboard",
      "Priority support",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$99",
    period: "/month",
    icon: Crown,
    color: "amber",
    features: [
      "Unlimited job postings",
      "Full applicant management",
      "Custom branding",
      "API access",
      "Dedicated account manager",
      "24/7 premium support",
      "Team collaboration tools",
    ],
    popular: false,
  },
];

const Package = () => {
  const { user } = useAuth();
  const [currentPlan] = useState("free"); // In real app, fetch from user data
  const [loading, setLoading] = useState(null);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success",
  });

  const handleUpgrade = (planId) => {
    if (planId === currentPlan) return;

    setLoading(planId);
    // Mock upgrade - in production, integrate with payment gateway
    setTimeout(() => {
      setLoading(null);
      setToast({
        isVisible: true,
        message: `Upgrade to ${planId} plan coming soon! Contact support for enterprise options.`,
        type: "info",
      });
    }, 1500);
  };

  const getColorClasses = (color) => {
    const colors = {
      slate: {
        bg: "bg-slate-50",
        border: "border-slate-200",
        text: "text-slate-600",
        button: "bg-slate-500 hover:bg-slate-600",
        icon: "text-slate-400",
      },
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        text: "text-blue-600",
        button: "bg-blue-500 hover:bg-blue-600",
        icon: "text-blue-500",
      },
      amber: {
        bg: "bg-amber-50",
        border: "border-amber-200",
        text: "text-amber-600",
        button: "bg-amber-500 hover:bg-amber-600",
        icon: "text-amber-500",
      },
    };
    return colors[color] || colors.slate;
  };

  return (
    <div className="space-y-6">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-[22px] font-bold text-[#002333]">Packages</h2>
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
          <span className="text-[#5BBB7B]">Packages</span>
        </div>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-gradient-to-r from-[#5BBB7B] to-[#4CAF50] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <PackageIcon size={24} />
          </div>
          <div>
            <p className="text-white/80 text-sm font-medium">Current Plan</p>
            <h3 className="text-xl font-bold capitalize">
              {packages.find((p) => p.id === currentPlan)?.name || "Free"} Plan
            </h3>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => {
          const colors = getColorClasses(pkg.color);
          const isCurrentPlan = pkg.id === currentPlan;
          const Icon = pkg.icon;

          return (
            <div
              key={pkg.id}
              className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 hover:shadow-xl ${
                pkg.popular
                  ? "border-blue-500 shadow-lg shadow-blue-500/10"
                  : "border-slate-100"
              } ${isCurrentPlan ? "ring-2 ring-[#5BBB7B] ring-offset-2" : ""}`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                  Most Popular
                </div>
              )}

              {isCurrentPlan && (
                <div className="absolute -top-3 right-4 px-3 py-1 bg-[#5BBB7B] text-white text-xs font-bold rounded-full">
                  Current
                </div>
              )}

              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}
                >
                  <Icon size={28} className={colors.icon} />
                </div>
                <h3 className="text-xl font-bold text-[#002333] mb-2">
                  {pkg.name}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-3xl font-bold text-[#002333]">
                    {pkg.price}
                  </span>
                  <span className="text-slate-400 text-sm">{pkg.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm">
                    <Check size={16} className="text-[#5BBB7B] shrink-0" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleUpgrade(pkg.id)}
                disabled={isCurrentPlan || loading === pkg.id}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all ${
                  isCurrentPlan
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : `${colors.button} text-white hover:shadow-lg`
                }`}
              >
                {loading === pkg.id
                  ? "Processing..."
                  : isCurrentPlan
                    ? "Current Plan"
                    : pkg.id === "free"
                      ? "Downgrade"
                      : "Upgrade Now"}
              </button>
            </div>
          );
        })}
      </div>

      {/* Info Note */}
      <div className="bg-slate-50 rounded-xl p-4 text-center">
        <p className="text-sm text-slate-500">
          Need a custom plan?{" "}
          <Link
            to="/contact"
            className="text-[#5BBB7B] font-semibold hover:underline"
          >
            Contact our sales team
          </Link>{" "}
          for enterprise solutions.
        </p>
      </div>

      <Toast
        isVisible={toast.isVisible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
};

export default Package;
