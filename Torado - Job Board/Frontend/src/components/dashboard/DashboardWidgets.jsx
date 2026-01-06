import React from "react";
import { Smile, Award, CheckCircle, Package, Trash2 } from "lucide-react";

const NotificationItem = ({
  icon: Icon,
  message,
  time,
  type,
  iconColor,
  iconBg,
}) => (
  <div className="flex items-start gap-4 py-4 border-b border-dashed border-slate-100 last:border-0 hover:bg-slate-50 px-4 -mx-4 transition-colors group cursor-pointer">
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${iconBg} ${iconColor} transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]`}
    >
      <Icon size={18} strokeWidth={2} />
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-medium text-slate-800">
          <span className="font-bold">{message.split("/")[0]}</span> /{" "}
          {message.split("/")[1]}
        </p>
      </div>
      <p className="text-xs text-[#5B6CF6] font-medium">{time}</p>
    </div>
    <div className="relative group/tooltip">
      <Trash2
        className="text-slate-400 shrink-0 hover:text-red-500 transition-colors cursor-pointer"
        size={18}
      />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all whitespace-nowrap z-10">
        Delete
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
      </div>
    </div>
  </div>
);

const InvoiceItem = ({ type, id, date, plan, status }) => (
  <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 py-4 border-b border-dashed border-slate-100 last:border-0 hover:bg-slate-50 px-4 -mx-4 transition-colors group cursor-pointer">
    {/* Content that fades on hover (Desktop only) */}
    <div className="flex items-center gap-4 w-full transition-opacity duration-300 md:group-hover:opacity-40">
      <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 text-[#1967D2] transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]">
        <Package size={18} strokeWidth={2} />
      </div>
      <div>
        <p className="text-sm text-slate-500 mb-1">
          <span
            className={`font-semibold ${
              status === "Paid" ? "text-torado-green-600" : "text-red-500"
            }`}
          >
            {status}
          </span>{" "}
          Order: #{id} Date: {date}
        </p>
        <p className="text-sm font-bold text-slate-800">{plan}</p>
      </div>
    </div>

    {/* View Invoice Button (Visible on Mobile, Hover on Desktop) */}
    <button className="mt-4 md:mt-0 w-full md:w-auto static md:absolute md:right-4 bg-[#5BBB7B] text-white px-8 py-2 rounded-lg font-medium shadow-md opacity-100 visible md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible transition-all duration-300 transform scale-100 md:scale-90 md:group-hover:scale-100 relative overflow-hidden group/btn whitespace-nowrap text-sm flex items-center justify-center">
      <span className="absolute inset-0 w-full h-full bg-[#002333] scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
      <span className="relative z-10">View Invoice</span>
    </button>
  </div>
);

const DashboardWidgets = () => {
  const notifications = [
    {
      id: 1,
      name: "Emilie Friesen",
      action: "Applied For A Job",
      job: "Software Engineer",
      icon: Award,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      name: "Herminio",
      action: "Applied For A Job",
      job: "Web Developer",
      icon: CheckCircle,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      id: 3,
      name: "Neal Harvey",
      action: "Applied For A Job",
      job: "Technical Architect",
      icon: Package,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      id: 4,
      name: "Virgie Kohler",
      action: "Applied For A Job",
      job: "UX/UI Designer",
      icon: Package,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      id: 5,
      name: "Tyson Kozey",
      action: "Applied For A Job",
      job: "Senior Product Designer",
      icon: Award,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 6,
      name: "Allie Kulas",
      action: "Applied For A Job",
      job: "Android Developer",
      icon: Package,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  const invoices = [
    {
      id: 1818,
      status: "Paid",
      date: "30-Jan-23",
      plan: "Premium Plan",
    },
    {
      id: 1818,
      status: "Unpaid",
      date: "30-Jan-23",
      plan: "Advance Plan",
    },
    {
      id: 1818,
      status: "Paid",
      date: "30-Jan-23",
      plan: "Starter Plan",
    },
    {
      id: 1818,
      status: "Unpaid",
      date: "30-Jan-23",
      plan: "Basic Plan",
    },
    {
      id: 1818,
      status: "Paid",
      date: "30-Jan-23",
      plan: "Senior Product Designer",
    },
    {
      id: 1818,
      status: "Unpaid",
      date: "30-Jan-23",
      plan: "Premium Plan",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Notifications */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6">
        <h4 className="text-lg font-bold text-torado-blue-900 mb-6 pb-4 border-b border-slate-100 border-dashed">
          Recent Notifications
        </h4>
        <div className="flex flex-col">
          {notifications.map((notif) => (
            <NotificationItem
              key={notif.id}
              icon={notif.icon}
              message={`${notif.name} / ${notif.action}`}
              time={notif.job}
              type={notif.action}
              iconColor={notif.iconColor}
              iconBg={notif.iconBg}
            />
          ))}
        </div>
      </div>

      {/* Invoices */}
      <div className="bg-white rounded-lg shadow-sm border border-slate-100 p-6">
        <h4 className="text-lg font-bold text-torado-blue-900 mb-6 pb-4 border-b border-slate-100 border-dashed">
          Invoices
        </h4>
        <div className="flex flex-col">
          {invoices.map((inv, idx) => (
            <InvoiceItem key={idx} {...inv} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
