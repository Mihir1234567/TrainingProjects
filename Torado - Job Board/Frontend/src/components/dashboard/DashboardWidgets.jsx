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
  <div className="flex items-start gap-4 py-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 px-4 -mx-4 transition-all duration-300 group cursor-pointer rounded-xl">
    <div
      className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${iconBg} ${iconColor} transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:shadow-sm`}
    >
      <Icon size={18} strokeWidth={2.5} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[14px] font-bold text-[#002333] leading-snug">
        <span className="text-[#5BBB7B]">{message.split("/")[0].trim()}</span>
        <span className="text-slate-400 font-medium px-1">/</span>
        <span className="text-slate-600 font-medium">
          {message.split("/")[1].trim()}
        </span>
      </p>
      <p className="text-[12px] text-slate-400 font-bold mt-1.5 uppercase tracking-wider flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#5BBB7B]"></span>
        {time}
      </p>
    </div>
    <div className="relative group/tooltip">
      <button className="p-2 text-slate-300 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
        <Trash2 size={16} />
      </button>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black text-white text-[11px] font-bold rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 whitespace-nowrap z-10 shadow-xl scale-90 group-hover/tooltip:scale-100 origin-bottom">
        Delete
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-[5px] border-transparent border-t-black"></div>
      </div>
    </div>
  </div>
);

const InvoiceItem = ({ type, id, date, plan, status }) => (
  <div className="relative flex flex-col md:flex-row items-start md:items-center gap-4 py-5 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 px-4 -mx-4 transition-all duration-300 group cursor-pointer rounded-xl">
    <div className="flex items-center gap-4 w-full transition-opacity duration-300 md:group-hover:opacity-30">
      <div className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-[#002333] transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:bg-[#5BBB7B] group-hover:text-white">
        <Package size={18} strokeWidth={2.5} />
      </div>
      <div className="min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-widest ${
              status === "Paid"
                ? "bg-green-50 text-[#5BBB7B]"
                : "bg-red-50 text-red-500"
            }`}
          >
            {status}
          </span>
          <p className="text-[12px] text-slate-400 font-bold tracking-tight">
            ORDER: #{id} <span className="mx-1">•</span> {date}
          </p>
        </div>
        <p className="text-[15px] font-bold text-[#002333] truncate group-hover:text-[#5BBB7B] transition-colors leading-tight">
          {plan}
        </p>
      </div>
    </div>

    <button className="mt-4 md:mt-0 w-full md:w-auto static md:absolute md:right-4 bg-[#5BBB7B] text-white px-6 py-2 rounded-xl font-bold text-[13px] shadow-lg shadow-[#5BBB7B]/20 opacity-100 visible md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible transition-all duration-300 transform scale-100 md:scale-90 md:group-hover:scale-100 relative overflow-hidden group/btn whitespace-nowrap flex items-center justify-center">
      <span className="absolute inset-0 w-full h-full bg-[#002333] scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 ease-in-out origin-center"></span>
      <span className="relative z-10">View Invoice</span>
    </button>
  </div>
);

const DashboardWidgets = ({ isRecruiter, recentActivity, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-[20px] shadow-sm border border-slate-100 p-8">
        <div className="h-6 w-48 bg-slate-100 rounded mb-6 animate-pulse"></div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-slate-50 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  const title = isRecruiter ? "Recent Applications" : "Recent Activity";

  return (
    <div className="bg-white rounded-[20px] shadow-[0_0_50px_rgba(0,0,0,0.05)] border border-slate-100 overflow-hidden">
      <div className="px-8 py-6 border-b border-slate-50">
        <h4 className="text-[18px] font-bold text-[#002333]">{title}</h4>
      </div>
      <div className="p-8">
        <div className="space-y-1">
          {!recentActivity || recentActivity.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <Package size={48} className="mx-auto mb-3 opacity-20" />
              <p>No recent activity found.</p>
            </div>
          ) : (
            recentActivity.map((item) => (
              <NotificationItem
                key={item.id}
                icon={isRecruiter ? Award : Smile} // Default icons for now
                message={`${item.title} / ${item.subtitle}`}
                time={item.time}
                type={item.type}
                iconColor={isRecruiter ? "text-blue-600" : "text-green-600"}
                iconBg={isRecruiter ? "bg-blue-50" : "bg-green-50"}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
