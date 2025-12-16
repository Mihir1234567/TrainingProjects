import { Search, MapPin, Grid, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "../../assets/Home/imgi_1_banner-img-1.png";
import user1 from "../../assets/Home/peopleimg/peopleimg1.png";
import user2 from "../../assets/Home/peopleimg/peopleimg2.png";
import user3 from "../../assets/Home/peopleimg/peopleimg3.png";
import user4 from "../../assets/Home/peopleimg/peopleimg4.png";
import HomeBg1 from "../../assets/Home/HomeBg/Homebg1.png";
import HomeBg2 from "../../assets/Home/HomeBg/Homebg2.png";
import HomeBg3 from "../../assets/Home/HomeBg/Homebg3.png";
import Badge from "../../assets/Home/badge.svg";

const Hero = () => {
  return (
    <section className="relative w-full bg-slate-50 lg:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0  h-full bg-slate-100/50 -skew-x-12 translate-x-1/4 z-0"></div>

      {/* Background Placeholder Images */}
      <img
        src={HomeBg1}
        alt=""
        className="absolute top-0 left-50 w-270 h-270 z-0 pointer-events-none"
      />
      <img
        src={HomeBg2}
        alt=""
        className="absolute top-25 right-0 w-100 h-100 z-0 pointer-events-none"
      />
      <img
        src={HomeBg3}
        alt=""
        className="absolute top-20 left-170 w-20 h-20 z-0 pointer-events-none"
      />

      <div className=" mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 xl:gap-20">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <span className="text-torado-green-600 font-semibold mb-4 tracking-wide text-lg lg:text-base">
              Employment & Career Opportunities
            </span>

            <h1 className="text-4xl lg:text-5xl xl:text-[64px] font-bold text-[#083e47] leading-[1.1] mb-6 tracking-tight">
              Find Your{" "}
              <span className="relative inline-block px-2">
                Dream Job
                <span className="absolute -bottom-1 left-0 w-full h-1/2 bg-gradient-to-t from-[#E0F5F0] to-transparent -z-10 rounded-md"></span>
              </span>
              <br />
              And Talent
            </h1>

            <p className="text-slate-500 text-lg lg:text-lg leading-relaxed mb-10 ">
              Every month, more than 3 million job seekers visit our website to
              search for jobs, with more than 130,000 applications per day.
            </p>

            {/* Search Box */}
            <div className="w-full bg-white p-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col md:flex-row items-center gap-2 mb-8">
              <div className="flex-1 w-full md:w-auto flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-100">
                <Grid size={20} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Job Title"
                  className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-sm font-medium"
                />
              </div>

              <div className="flex-1 w-full md:w-auto flex items-center gap-3 px-4 py-3 border-b md:border-b-0 md:border-r border-slate-100">
                <MapPin size={20} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-sm font-medium"
                />
              </div>

              <div className="flex-1 w-full md:w-auto flex items-center gap-3 px-4 py-3">
                <Search size={20} className="text-slate-400 shrink-0" />
                <select className="w-full bg-transparent outline-none text-slate-700 text-sm font-medium appearance-none cursor-pointer">
                  <option value="">Category</option>
                  <option value="tech">Technology</option>
                  <option value="design">Design</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>

              <button className="w-full md:w-auto px-8 py-3.5 bg-torado-green-600 text-white font-bold rounded-lg transition-all shadow-lg shadow-torado-green-600/20 whitespace-nowrap relative overflow-hidden group">
                <span className="absolute inset-0 w-full h-full bg-[#083E47] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
                <span className="relative z-10">Find A Job</span>
              </button>
            </div>

            {/* Trending Keywords */}
            <div className="text-lg font-medium text-slate-500">
              <span className="text-slate-900 ">Trending Keywords:</span>{" "}
              <a
                href="#"
                className="text-torado-blue-900 underline hover:text-torado-green-600 transition-colors"
              >
                Design
              </a>
              ,{" "}
              <a
                href="#"
                className="text-torado-blue-900 underline hover:text-torado-green-600 transition-colors"
              >
                Development
              </a>
              ,{" "}
              <a
                href="#"
                className="text-torado-blue-900 underline hover:text-torado-green-600 transition-colors"
              >
                Marketing
              </a>
              ,{" "}
              <a
                href="#"
                className="text-torado-blue-900 underline hover:text-torado-green-600 transition-colors"
              >
                Affiliate
              </a>
              ,{" "}
              <a
                href="#"
                className="text-torado-blue-900 underline hover:text-torado-green-600 transition-colors"
              >
                Senior
              </a>
              ,{" "}
              <a
                href="#"
                className="text-torado-blue-900 underline hover:text-torado-green-600 transition-colors"
              >
                Engineer
              </a>
            </div>
          </div>

          {/* Right Image Area */}
          <div className="w-full lg:w-2/5 relative h-200 lg:h-240 flex items-center justify-center lg:justify-center">
            {/* Main Hero Image Placeholder */}
            <div className="relative w-full h-full flex justify-center translate-x-16 lg:translate-x-1">
              {/* Image Container with Shape */}
              <div className="w-auto h-full relative group">
                <img
                  src={heroImg}
                  alt="Hero"
                  className="w-auto h-full max-w-none object-contain"
                />
              </div>
            </div>

            {/* Floating Card 1 - Project Completed */}
            <div className="absolute top-[35%] right-[75%] bg-white p-6 rounded-2xl shadow-[0_20px_50px_rgb(0,0,0,0.1)] min-w-[200px]">
              {/* Circular Badge on Top Right Corner */}
              <div className="absolute -top-6 -right-0 w-20 h-20 bg-[#34d399] rounded-full flex items-center justify-center shadow-md border-4 border-transparent overflow-hidden">
                <img
                  src={Badge}
                  alt="Badge"
                  className="w-12 h-12 object-contain"
                />
              </div>

              <div className="flex flex-col">
                <span className="text-2xl font-bold text-[#083e47]">+125M</span>
                <span className="text-slate-500 font-medium">
                  Project Completed
                </span>
              </div>
            </div>

            {/* Floating Card 2 - Professional */}
            <div className="absolute bottom-40 -right-20 w-80 h-25 z-20 bg-white p-3 pr-6 rounded-xl shadow-[0_20px_50px_rgb(0,0,0,0.1)] flex items-center gap-3 ">
              <div className="flex -space-x-3">
                <img
                  className="w-12 h-12 rounded-full border-2 border-transparent object-cover"
                  src={user1}
                  alt="User 1"
                />
                <img
                  className="w-12 h-12 rounded-full border-2 border-transparent object-cover"
                  src={user2}
                  alt="User 2"
                />
                <img
                  className="w-12 h-12 rounded-full border-2 border-transparent object-cover"
                  src={user3}
                  alt="User 3"
                />
                <img
                  className="w-12 h-12 rounded-full border-2 border-transparent object-cover"
                  src={user4}
                  alt="User 4"
                  x
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-slate-900">+79M</span>
                <span className="text-lg text-slate-500 font-medium">
                  Professional
                </span>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="relative"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
