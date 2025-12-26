import React from "react";
import { Link } from "react-router-dom";

const JobDetailHeader = () => {
  return (
    <section className="bg-[#f0f5fa] py-16 md:py-24 text-center border-b border-slate-100">
      <h1 className="text-3xl md:text-[40px] font-bold text-[#002333] mb-3 tracking-tight">
        Job Detail
      </h1>
      <div className="flex items-center justify-center gap-2 text-[15px] font-medium">
        <Link
          to="/"
          className="text-slate-500 hover:text-[#5BBB7B] transition-colors"
        >
          Home
        </Link>
        <span className="text-slate-400">/</span>
        <span className="text-[#5BBB7B]">Job Detail</span>
      </div>
    </section>
  );
};

export default JobDetailHeader;
