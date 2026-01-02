import React from "react";

const stats = [
  {
    value: "500K+",
    label: "Messages From Employers",
  },
  {
    value: "40k",
    label: "Job Opportunities",
  },
  {
    value: "170k",
    label: "Offers Timbered",
  },
  {
    value: "4.5M",
    label: "Weeks Time-To-Hire (avg.)",
  },
  {
    value: "564K",
    label: "Best Software Award 2025",
  },
];

const StatsSection = () => {
  return (
    <section className="py-12 md:py-20 bg-[#6170E6] relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <svg
          viewBox="0 0 1000 1000"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -right-20 -top-20 w-[600px] h-[600px] text-white/40"
        >
          <path
            fill="currentColor"
            d="M1000,0 L1000,1000 L0,1000 C200,800 400,900 600,700 C800,500 700,300 1000,0"
            className="animate-pulse"
            style={{ animationDuration: "8s" }}
          />
        </svg>
        <div className="absolute inset-0 bg-[url('https://torado.envytheme.com/job-board/default/assets/images/fun-fact-shape-1.png')] bg-cover opacity-30 mix-blend-overlay"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-6 md:gap-4 items-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center relative group"
            >
              <div className="mb-1">
                <h3 className="text-[36px] sm:text-[42px] md:text-[50px] font-semibold text-white mb-0 leading-tight tracking-tight whitespace-nowrap transition-all">
                  {stat.value}
                </h3>
                <p className="text-[#F3F3F3] text-sm md:text-[15px] font-normal leading-relaxed whitespace-nowrap opacity-90">
                  {stat.label}
                </p>
              </div>

              {/* Slanted Divider - Hidden on mobile/tablet based on grid */}
              {index < stats.length - 1 && (
                <div className="hidden lg:block absolute -right-[10px] top-1/2 -translate-y-1/2 w-[1px] h-[80px] bg-white/10 rotate-[13deg]" />
              )}

              {/* Mobile/Tablet vertical spacer */}
              {index < stats.length - 1 && (
                <div className="block lg:hidden w-12 h-px bg-white/10 mt-4 opacity-30 lg:mt-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
