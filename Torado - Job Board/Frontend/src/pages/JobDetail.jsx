import React, { useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import jobsData from "../data/jobs.json";
import JobDetailHeader from "../components/jobs/JobDetailHeader";
import JobDetailBanner from "../components/jobs/JobDetailBanner";

const JobDetail = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fallback to first job if ID not found, just for visualization
  const job = useMemo(() => {
    return jobsData.find((j) => j.id === parseInt(id)) || jobsData[0];
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* 1. Header Section */}
      <JobDetailHeader />

      {/* 2. Banner Section */}
      <JobDetailBanner job={job} />
      
      {/* 3. Main Content Section (Coming Soon) */}
      <section className="max-w-[1200px] mx-auto px-4 md:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Detailed Description Area */}
          <div className="flex-1">
             {/* Future: JobDescription Component */}
          </div>

          {/* Sidebars Area */}
          <div className="w-full lg:w-[400px] space-y-8">
             {/* Future: JobOverview & CompanyOverview Components */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetail;
