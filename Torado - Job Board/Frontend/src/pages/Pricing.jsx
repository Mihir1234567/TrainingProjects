import React from "react";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import MattersToUs from "../components/common/MattersToUs";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "9",
      description:
        "This plan is perfect for small teams or individuals who are just starting out.",
      features: [
        { name: "1,000 Members", included: true },
        { name: "10 Spaces", included: true },
        { name: "Custom Domain", included: false },
        { name: "Collaborative Editing", included: false },
        { name: "Priority Support", included: false },
        { name: "Zapier Integration", included: false },
      ],
      isPopular: false,
    },
    {
      name: "Basic",
      price: "19",
      description:
        "This plan is perfect for small teams or individuals who are just starting out.",
      features: [
        { name: "1,000 Members", included: true },
        { name: "10 Spaces", included: true },
        { name: "Custom Domain", included: true },
        { name: "Collaborative Editing", included: false },
        { name: "Priority Support", included: false },
        { name: "Zapier Integration", included: false },
      ],
      isPopular: false,
    },
    {
      name: "Business",
      price: "39",
      description:
        "This plan is perfect for small teams or individuals who are just starting out.",
      features: [
        { name: "1,000 Members", included: true },
        { name: "10 Spaces", included: true },
        { name: "Custom Domain", included: true },
        { name: "Collaborative Editing", included: true },
        { name: "Priority Support", included: true },
        { name: "Zapier Integration", included: false },
      ],
      isPopular: true, // For the "Save 25%" badge or highlight
    },
    {
      name: "Enterprise",
      price: "69",
      description:
        "This plan is perfect for small teams or individuals who are just starting out.",
      features: [
        { name: "1,000 Members", included: true },
        { name: "10 Spaces", included: true },
        { name: "Custom Domain", included: true },
        { name: "Collaborative Editing", included: true },
        { name: "Priority Support", included: true },
        { name: "Zapier Integration", included: true },
      ],
      isPopular: false,
    },
  ];

  return (
    <main className="font-sans text-[#002333]">
      {/* 1. Page Header */}
      <section className="bg-[#f0f5fa] py-12 md:py-20 text-center border-b border-slate-100">
        <h1 className="text-3xl md:text-[40px] font-bold text-[#002333] mb-3 tracking-tight">
          Transparent Pricing
        </h1>
        <div className="flex items-center justify-center gap-2 text-sm md:text-[15px] font-medium">
          <Link
            to="/"
            className="text-slate-500 hover:text-[#5BBB7B] transition-colors"
          >
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-[#5BBB7B]">Transparent Pricing</span>
        </div>
      </section>

      {/* 2. Pricing Cards */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-[32px] font-bold text-[#002333] text-center mb-12">
            Our Transparent Pricing For You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:bg-[#F0FDF4] hover:-translate-y-1 transition-all duration-300 relative group flex flex-col cursor-default"
              >
                {/* Save 25% Badge for Business Plan */}
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 w-[100px] h-[100px] overflow-hidden pointer-events-none rounded-tr-xl">
                    <div className="absolute top-[18px] -right-[34px] bg-[#5BBB7B] text-white text-sm font-semibold py-1 w-[120px] text-center rotate-45 shadow-sm">
                      Save 25%
                    </div>
                  </div>
                )}

                {/* Plan Name */}
                <div className="mb-6">
                  <span className="inline-block px-4 py-1.5 rounded-full border border-slate-200 text-[#002333] font-semibold text-sm bg-white">
                    {plan.name}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-[#002333]">
                    ${plan.price}
                  </span>
                  <span className="text-slate-500 text-sm font-medium">
                    /mo
                  </span>
                </div>

                {/* Description */}
                <p className="text-[#666] text-[15px] leading-relaxed mb-8">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, fIdx) => (
                    <li
                      key={fIdx}
                      className={`text-[15px] ${
                        feature.included
                          ? "text-[#002333] font-medium"
                          : "text-slate-400 line-through decoration-slate-400"
                      }`}
                    >
                      {feature.name}
                    </li>
                  ))}
                </ul>

                {/* CTA Button with Door Effect */}
                <button className="w-full relative overflow-hidden group/btn py-3 px-6 rounded-lg border border-slate-200 text-[#002333] font-bold text-[15px] transition-all duration-300 group-hover:border-[#5BBB7B] group-hover:bg-[#5BBB7B] group-hover:text-white">
                  <span className="absolute inset-0 w-full h-full bg-[#002333] scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
                  <span className="relative z-10 transition-colors duration-700 ease-in-out group-hover:text-white group-hover/btn:text-white">
                    Get Started Now
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Matters To Us Section */}
      <MattersToUs
        title="What Matters To You Matters To Us"
        description="Salary. Diversity. Benefits. Location. Everything you're looking for."
        ctaTitle="On Untapped, You Own Your Story!"
        ctaDescription="Unlike other job platforms, we never assume your gender, race or ethnicity."
        ctaButtonText="Read Why"
      />
    </main>
  );
};

export default Pricing;
