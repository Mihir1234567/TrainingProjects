import React, { useMemo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { jobsAPI } from "../services/api"; // Updated import
import JobDetailHeader from "../components/jobs/JobDetailHeader";
import JobDetailBanner from "../components/jobs/JobDetailBanner";

import JobDescription from "../components/jobs/JobDescription";
import JobOverview from "../components/jobs/JobOverview";
import CompanyOverview from "../components/jobs/CompanyOverview";
import RelatedJobs from "../components/jobs/RelatedJobs";
import JobMap from "../components/jobs/JobMap";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await jobsAPI.getById(id);
        setJob(data);
      } catch (error) {
        console.error("Failed to fetch job", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (!job)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Job not found
      </div>
    );

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
            <RelatedJobs
              currentJobId={job._id || job.id}
              category={job.category}
            />
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
