import React, { useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMockData } from "../context/MockDataContext";
import JobDetailHeader from "../components/jobs/JobDetailHeader";
import JobDetailBanner from "../components/jobs/JobDetailBanner";

import JobDescription from "../components/jobs/JobDescription";
import JobOverview from "../components/jobs/JobOverview";
import CompanyOverview from "../components/jobs/CompanyOverview";
import RelatedJobs from "../components/jobs/RelatedJobs";
import JobMap from "../components/jobs/JobMap";

const JobDetail = () => {
  const { id } = useParams();
  const { jobs } = useMockData();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Fallback to first job if ID not found, just for visualization
  const job = useMemo(() => {
    return jobs.find((j) => j.id === parseInt(id)) || jobs[0];
  }, [id, jobs]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* 1. Header Section */}
      <JobDetailHeader />

      {/* 2. Banner Section */}
      <JobDetailBanner job={job} />

      {/* 3. Main Content Section */}
      <section className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Detailed Description Area */}
          <div className="flex-1">
            <JobDescription job={job} />
            <RelatedJobs currentJobId={job.id} category={job.category} />
          </div>

          {/* Sidebars Area */}
          <div className="w-full lg:w-[400px] space-y-8">
            <JobOverview job={job} />

            <JobMap location={job.location || job.jobOverview?.location} />

            <CompanyOverview job={job} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobDetail;
