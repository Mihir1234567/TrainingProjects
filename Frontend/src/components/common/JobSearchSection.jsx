import React from "react";
import people1 from "../../assets/Home/peopleimg/peopleimg1.png";
import people2 from "../../assets/Home/peopleimg/peopleimg2.png";
import people3 from "../../assets/Home/peopleimg/peopleimg3.png";
import people4 from "../../assets/Home/peopleimg/peopleimg4.png";
import millionImg from "../../assets/Home/millionImg.png";

const JobSearchSection = () => {
  const features = [
    "Best for every budget",
    "Proof of quality",
    "Quality work done quickly",
    "No cost until you rent",
    "24/7 support",
    "Safe and secure",
    "Secure payments, every time",
  ];

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side: Illustration */}
          <div className="relative flex justify-center items-center">
            <div className="relative z-10 w-full max-w-[600px]">
              <img
                src={millionImg}
                alt="Millions of jobs"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* Right Side: Content */}
          <div>
            <h2 className="text-[32px] md:text-[45px] leading-[1.1] font-bold text-[#002B44] mb-6">
              Millions Of Jobs. Find The Right One For You
            </h2>
            <p className="text-[#666] text-lg mb-10 leading-relaxed">
              Every month, more than 3 million job seekers visit our website to
              search for jobs, with more than 130,000 applications per day.
              Search all open positions on the web. Get your own personalized
              salary estimate.
            </p>

            {/* Checkmark List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-12">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-[#05264e] font-medium text-[15px]">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-8 md:gap-12">
              <button className="relative group overflow-hidden px-10 py-4 bg-[#6170E6] text-white font-bold rounded-lg transition-all duration-300 shadow-lg hover:shadow-[#6170E6]/30">
                <span className="absolute inset-0 bg-[#05264e] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"></span>
                <span className="relative z-10">Search A Job</span>
              </button>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {[people1, people2, people3, people4].map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="User"
                      className="w-12 h-12 rounded-full border-4 border-white object-cover shadow-sm"
                    />
                  ))}
                </div>
                <div>
                  <div className="font-bold text-[#002B44] text-lg leading-tight">
                    3500K
                  </div>
                  <div className="text-[#6170E6] text-sm font-semibold italic">
                    Freelancers Get Results
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSearchSection;
