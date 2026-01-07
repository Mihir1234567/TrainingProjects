import React from "react";
import { Link } from "react-router-dom";
import PostJobForm from "../components/dashboard/PostJobForm";

const PostJob = () => {
  return (
    <div className="min-h-screen bg-white font-sans pb-20">
      {/* Header Section */}
      <section className="bg-[#f0f5fa] py-16 text-center border-b border-slate-100">
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
        <PostJobForm />
      </div>
    </div>
  );
};

export default PostJob;
