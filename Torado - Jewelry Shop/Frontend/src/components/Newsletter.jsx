import React from "react";
import { ArrowUpRight } from "lucide-react";

import emailBg from "../assets/Landing/email_bg.jpg";

const Newsletter = () => {
  return (
    <section
      className="py-16 md:py-20 relative bg-center bg-cover bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: `url(${emailBg})` }}
    >
      <div className="container mx-auto px-4 max-w-3xl relative z-10 text-center">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-[42px] text-gray-900 tracking-tight mb-4">
          Sign Up To Love Torado
        </h2>

        <p className="text-gray-600 text-[15px] mb-10">
          Join the Torado family and you'll get access to exclusive discounts,
          special offers and more!
        </p>

        <form className="flex flex-col sm:flex-row shadow-sm bg-white border border-[#E5E0DB] p-1 w-full max-w-2xl mx-auto mb-6 transition-shadow focus-within:shadow-md">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-grow px-4 py-3 sm:py-0 text-[15px] focus:outline-none text-gray-700 bg-transparent placeholder:text-gray-400"
            required
          />
          <button
            type="submit"
            className="group relative overflow-hidden bg-[#C59B87] text-white text-[15px] font-medium px-8 py-3.5 flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            {/* Hover Background overlay */}
            <div className="absolute inset-0 bg-[#222222] opacity-0 scale-y-0 group-hover:opacity-100 group-hover:scale-y-100 transition-all duration-500 ease-in-out origin-center"></div>

            <span className="relative z-10 flex items-center gap-1.5 transition-colors duration-500">
              Subscribe Now
              <ArrowUpRight
                size={16}
                strokeWidth={2}
                className="transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </span>
          </button>
        </form>

        <p className="text-gray-500 text-[13px]">
          We'll never share your email address with a third-party
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
