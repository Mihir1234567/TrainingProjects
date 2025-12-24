import React from "react";
import mobileImg1 from "../../assets/Home/mobileImg/mobileImg1.png";
import mobileImg2 from "../../assets/Home/mobileImg/mobileImg2.png";
import mobileImg3 from "../../assets/Home/mobileImg/mobileImg3.png";

const MobileAppSection = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F0FDF4]/30 relative overflow-hidden">
      {/* Background Decorative patterns */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 800" fill="none">
          <path
            d="M400 0C400 0 300 200 100 400C-100 600 0 800 0 800"
            stroke="#22C55E"
            strokeWidth="2"
            strokeDasharray="10 10"
          />
          <path
            d="M400 200C400 200 350 350 200 500C50 650 100 800 100 800"
            stroke="#22C55E"
            strokeWidth="1"
            strokeDasharray="5 5"
          />
        </svg>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Bottom/Right Side: Image (Second on mobile) */}
          <div className="relative flex justify-center lg:justify-end order-2 lg:order-2">
            <div className="relative">
              <img
                src={mobileImg1}
                alt="Torado Mobile App"
                className="max-w-[80%] md:max-w-full mx-auto h-auto object-contain relative z-10"
              />
            </div>
          </div>

          {/* Top/Left Side: Content (First on mobile) */}
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left order-1 lg:order-1">
            <h2 className="text-[32px] md:text-[50px] leading-[1.1] font-bold text-[#002B44] mb-6 md:mb-8">
              Get Started Now With The Free Torado Mobile App
            </h2>
            <p className="text-[#666] text-base md:text-lg mb-8 md:mb-12 leading-relaxed px-4 lg:px-0">
              Every month, more than 3 million job seekers visit our website to
              search for jobs, with more than 130,000 applications per day.
              Search all open positions on the web. Get your own personalized
              salary estimate.
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 md:gap-6">
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:-translate-y-1 block shadow-md hover:shadow-xl rounded-xl overflow-hidden"
              >
                <img
                  src={mobileImg3}
                  alt="Download on the App Store"
                  className="h-14 md:h-20 w-auto"
                />
              </a>
              <a
                href="https://play.google.com/store"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-transform hover:-translate-y-1 block shadow-md hover:shadow-xl rounded-xl overflow-hidden"
              >
                <img
                  src={mobileImg2}
                  alt="Get it on Google Play"
                  className="h-14 md:h-20 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;
