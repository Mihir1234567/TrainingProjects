import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const PostJob = () => {
  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      {/* Header Section */}
      <section className="bg-[#f0f5fa] py-20 text-center border-b border-slate-100">
        <h1 className="text-[30px] md:text-[35px] font-bold text-[#002333] mb-3">
          Post A New Job
        </h1>
        <div className="text-[15px] font-medium text-slate-500">
          <Link to="/" className="text-slate-500 hover:text-[#5BBB7B]">
            Home
          </Link>{" "}
          / <span className="text-[#5BBB7B]">Post A New Job</span>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-[900px] mx-auto px-4 md:px-0 mt-10 md:mt-20 relative z-10">
        <div className="bg-white rounded-lg shadow-[0_0_50px_0_rgba(0,0,0,0.08)] p-8 md:p-12 border border-slate-100/50">
          <form className="space-y-10">
            {/* Job Information Section */}
            <div>
              <h3 className="text-[18px] font-bold text-[#002333] mb-6 pb-2 border-b-2 border-[#5BBB7B] inline-block">
                Job Information
              </h3>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Job Title"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <select className="w-full h-14 px-5 pr-12 bg-white border border-slate-200 rounded-lg text-slate-500 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] appearance-none cursor-pointer">
                      <option value="">Category</option>
                      <option value="development">Development</option>
                      <option value="web-design">Web Design</option>
                      <option value="multimedia">Multimedia</option>
                      <option value="marketing">Marketing</option>
                      <option value="resources">Resources</option>
                      <option value="financing">Financing</option>
                      <option value="software">Software</option>
                      <option value="programming">Programming</option>
                      <option value="accounting">Accounting</option>
                      <option value="finance">Finance</option>
                    </select>
                    <ChevronDown
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      size={20}
                    />
                  </div>

                  <div className="relative">
                    <select className="w-full h-14 px-5 pr-12 bg-white border border-slate-200 rounded-lg text-slate-500 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px] appearance-none cursor-pointer">
                      <option value="">Job Types</option>
                      <option value="full-time">Full Time</option>
                      <option value="part-time">Part Time</option>
                      <option value="contract">Contract</option>
                      <option value="freelance">Freelance</option>
                      <option value="internship">Internship</option>
                    </select>
                    <ChevronDown
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                      size={20}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Application Deadline"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                  <input
                    type="text"
                    placeholder="Salary Currency"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Job Description"
                    className="w-full h-54 px-5 py-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all duration-500 ease-out text-[15px]"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Company Information Section */}
            <div>
              <h3 className="text-[18px] font-bold text-[#002333] mb-6 pb-2 border-b-2 border-[#5BBB7B] inline-block">
                Company Information
              </h3>

              <div className="grid grid-cols-1 gap-6">
                <div>
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Category"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                  <input
                    type="text"
                    placeholder="Type"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Tag"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                  <input
                    type="text"
                    placeholder="Gender"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Job Apply Type"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                  <input
                    type="text"
                    placeholder="Salary Type"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Min. Salary"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                  <input
                    type="text"
                    placeholder="Max. Salary"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Experience"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                  <input
                    type="text"
                    placeholder="Career Level"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Qualification"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                  <input
                    type="text"
                    placeholder="Introduction Video URL"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Application Deadline Date"
                    onFocus={(e) => (e.target.type = "date")}
                    onBlur={(e) => (e.target.type = "text")}
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                  <input
                    type="text"
                    placeholder="Friendly Address"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                  <input
                    type="text"
                    placeholder="Company Industry"
                    className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                  />
                </div>
              </div>
            </div>

            {/* Upload Resume Section */}
            <div>
              <h4 className="text-[16px] font-bold text-[#004A61] mb-4">
                Upload Resume
              </h4>
              <div className="w-full h-40 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center bg-slate-50 hover:bg-white hover:border-[#5BBB7B] transition-all cursor-pointer group">
                <div className="text-center">
                  <p className="text-[#5569CC] text-[15px] font-medium underline decoration-1 underline-offset-4 group-hover:no-underline transition-all">
                    Click here or drop files to upload
                  </p>
                </div>
              </div>
              <p className="text-[13px] text-slate-400 mt-2 italic">
                Maximum file size: 2 MB
              </p>
            </div>

            {/* Recruiter Information */}
            <div>
              <h3 className="text-[18px] font-bold text-[#002333] mb-6 pb-2 border-b-2 border-[#5BBB7B] inline-block">
                Recruiter Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                />
                <input
                  type="text"
                  placeholder="Company Business"
                  className="w-full h-14 px-5 bg-white border border-slate-200 rounded-lg text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#5BBB7B] focus:ring-1 focus:ring-[#5BBB7B] transition-all text-[15px]"
                />
              </div>

              <div className="mt-4 flex items-center gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-[#5BBB7B] border-slate-300 rounded focus:ring-[#5BBB7B]"
                />
                <label htmlFor="terms" className="text-sm text-slate-500">
                  Accept{" "}
                  <Link to="#" className="text-[#5569CC] hover:underline">
                    terms of services
                  </Link>{" "}
                  and{" "}
                  <Link to="#" className="text-[#5569CC] hover:underline">
                    privacy policy
                  </Link>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="button"
                className="relative px-10 py-4 bg-[#5BBB7B] text-white font-bold rounded-lg overflow-hidden shadow-lg shadow-green-500/20 text-[15px] group"
              >
                <span className="absolute inset-0 bg-[#002333] transition-transform duration-700 ease-in-out scale-x-0 group-hover:scale-x-100 origin-center" />
                <span className="relative z-10">Post A Job</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
