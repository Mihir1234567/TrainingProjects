import React from "react";
import { Link } from "react-router-dom";

const ApplyJob = () => {
  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      {/* Header Section */}
      <section className="bg-[#f0f5fa] py-20 text-center border-b border-slate-100">
        <h1 className="text-[30px] md:text-[35px] font-bold text-[#002333] mb-3">
          Apply For A Job
        </h1>
        <div className="text-[15px] font-medium text-slate-500">
          <Link to="/" className="text-slate-500 hover:text-[#5BBB7B]">
            Home
          </Link>{" "}
          / <span className="text-[#5BBB7B]">Apply For A Job</span>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[800px] mx-auto px-4 md:px-0 mt-10 md:mt-20 relative z-10">
        <div className="bg-white rounded-lg shadow-[0_0_50px_0_rgba(0,0,0,0.08)] p-6 md:p-12 border border-slate-100/50">
          <h3 className="text-[18px] md:text-[20px] font-bold text-[#002333] mb-6 md:mb-8 pb-3 border-b-2 border-[#5BBB7B] inline-block">
            Apply Now
          </h3>

          <form className="space-y-6">
            {/* Name Input */}
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full h-16 px-6 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
              />
            </div>

            {/* Email Input */}
            <div>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full h-16 px-6 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
              />
            </div>

            {/* Message Textarea */}
            <div>
              <textarea
                placeholder="Message"
                className="w-full h-44 px-6 py-6 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] resize-none"
              ></textarea>
            </div>

            {/* Upload Resume */}
            <div>
              <h4 className="text-[16px] font-bold text-[#004A61] mb-4">
                Upload Resume
              </h4>
              <div className="w-full h-44 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50 hover:bg-white hover:border-[#5BBB7B] transition-all cursor-pointer group">
                <div className="text-center">
                  <p className="text-[#5569CC] text-[15px] font-medium underline decoration-1 underline-offset-4 group-hover:no-underline transition-all">
                    Click here or drop files to upload
                  </p>
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <div className="text-[15px] text-slate-500 leading-relaxed">
              If you do not have a resume document, you may write your brief
              professional profile{" "}
              <Link
                to="#"
                className="text-[#5569CC] underline decoration-1 underline-offset-2 hover:text-[#5BBB7B]"
              >
                here
              </Link>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="button"
                className="relative px-10 py-4 bg-[#5BBB7B] text-white font-bold rounded-lg overflow-hidden shadow-lg shadow-green-500/20 text-[15px] group"
              >
                <span className="absolute inset-0 bg-[#002333] transition-transform duration-700 ease-in-out scale-x-0 group-hover:scale-x-100 origin-center" />
                <span className="relative z-10">Send Application</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
