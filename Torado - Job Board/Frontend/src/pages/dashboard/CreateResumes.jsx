import React from "react";
import { Link } from "react-router-dom";
import CreateResumeForm from "../../components/dashboard/CreateResumeForm";

const CreateResumes = () => {
  return (
    <div className="space-y-8">
      {/* Header / Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-bold text-[#002333]">
            Create New Resume
          </h2>
          <div className="text-[13px] text-slate-400 font-medium mt-1">
            <Link to="/" className="hover:text-[#5BBB7B] transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link
              to="/user-dashboard"
              className="hover:text-[#5BBB7B] transition-colors"
            >
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#5BBB7B]">Create New Resume</span>
          </div>
        </div>
      </div>

      <CreateResumeForm />
    </div>
  );
};

export default CreateResumes;
