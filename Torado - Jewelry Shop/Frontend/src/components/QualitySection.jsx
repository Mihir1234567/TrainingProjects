import React from "react";
import { ArrowUpRight } from "lucide-react";

const QualitySection = () => {
  return (
    <section className="flex flex-col items-center text-center py-12 md:py-20 px-4 bg-white">
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-8 md:mb-12 leading-tight">
        We Provide The Highest Quality Jewelry{" "}
        <br className="hidden md:block" /> To Our Customer
      </h2>
      <a
        href="#"
        className="text-sm font-medium uppercase tracking-wide flex items-center gap-2 group transition-all duration-300"
      >
        <span className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-gray-900 after:transition-all after:duration-300 group-hover:after:w-full">
          Know More About Us
        </span>
        <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
      </a>
    </section>
  );
};

export default QualitySection;
