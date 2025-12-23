import React from "react";
import {
  Monitor,
  BarChart3,
  PenTool,
  Briefcase,
  Layout,
  Target,
  Dna,
  Instagram,
  Phone,
  Database,
} from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Web Development & Design",
    count: "20 Job positions",
    icon: Monitor,
  },
  {
    id: 2,
    title: "Market Research Company",
    count: "15 Job positions",
    icon: BarChart3,
  },
  {
    id: 3,
    title: "Content Writer & Manager",
    count: "25 Job positions",
    icon: PenTool,
  },
  {
    id: 4,
    title: "Project Manager Assistant",
    count: "10 Job positions",
    icon: Briefcase,
  },
  {
    id: 5,
    title: "Design, Art And Multimedia",
    count: "30 Job positions",
    icon: Layout,
  },
  {
    id: 6,
    title: "Marketing And Sale Manager",
    count: "28 Job positions",
    icon: Target,
  },
  {
    id: 7,
    title: "Human Resources Manager",
    count: "15 Job positions",
    icon: Dna,
  },
  {
    id: 8,
    title: "Software And Financing",
    count: "17 Job positions",
    icon: Instagram,
  },
  {
    id: 9,
    title: "Programming And Technology",
    count: "13 Job positions",
    icon: Phone,
  },
  {
    id: 10,
    title: "Accounting And Finance",
    count: "11 Job positions",
    icon: Database,
  },
];

const JobCategories = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#083e47] tracking-tight">
            Browse By Category
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-16 sm:gap-y-20 pt-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-white rounded-xl pt-12 pb-8 px-6 sm:pt-14 md:pt-16 md:pb-12 md:px-10 text-left transition-all duration-700 shadow-[0_10px_30px_rgba(0,0,0,0.04)] cursor-pointer border border-slate-50"
            >
              {/* Door Effect Background */}
              <div className="absolute inset-0 bg-[#5BBB7B] scale-x-0 group-hover:scale-x-100 opacity-0 group-hover:opacity-100 transition-all duration-1000 origin-center rounded-xl z-0"></div>

              {/* Icon Circle - Overlapping top-left */}
              <div className="absolute top-0 left-6 sm:left-8 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 bg-[#5BBB7B] group-hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-1000 z-20">
                {React.createElement(category.icon, {
                  className:
                    "w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-[#5BBB7B] transition-colors duration-1000",
                })}
              </div>

              {/* Content Wrapper to stay above door effect */}
              <div className="relative z-10 pointer-events-none">
                <h3 className="text-[#083e47] font-bold text-base md:text-[17px] leading-tight mb-3 group-hover:text-white transition-colors duration-1000">
                  {category.title}
                </h3>
                <p className="text-slate-400 text-[12px] md:text-[13px] font-medium tracking-wide group-hover:text-white/80 transition-colors duration-1000">
                  ({category.count})
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default JobCategories;
