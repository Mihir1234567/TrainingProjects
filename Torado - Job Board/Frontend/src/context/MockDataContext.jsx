import React, { createContext, useContext, useState, useEffect } from "react";
import { jobsAPI, applicationsAPI } from "../services/api";

const MockDataContext = createContext();

export const useMockData = () => useContext(MockDataContext);

export const MockDataProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jobsData = await jobsAPI.getAll();
        const jobsList = Array.isArray(jobsData)
          ? jobsData
          : jobsData.jobs || [];

        // Map _id to id for frontend compatibility
        const mappedJobs = jobsList.map((job) => ({
          ...job,
          id: job._id,
        }));
        setJobs(mappedJobs);

        // Fetch applications if user is logged in?
        // For now, start empty or maybe fetch if token exists
        // simplified: use empty array, components should fetch their own specific data or we expand this later
        setApplications([]);

        setIsLoading(false);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);

  const addJob = async (newJob) => {
    const createdJob = await jobsAPI.create({
      ...newJob,
      // postedAt etc handled by backend defaults
    });
    const mappedJob = { ...createdJob, id: createdJob._id };
    setJobs((prev) => [mappedJob, ...prev]);
    return mappedJob;
  };

  const deleteJob = async (jobId) => {
    await jobsAPI.delete(jobId); // API expects _id, but frontend passes what it has.
    // If frontend items have id=_id (string), then jobId is string.
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  const applyToJob = async (jobId, candidateData) => {
    const newApp = await applicationsAPI.apply(jobId, candidateData);
    const mappedApp = { ...newApp, id: newApp._id };
    setApplications((prev) => [...prev, mappedApp]);
    return mappedApp;
  };

  const value = {
    jobs,
    setJobs,
    addJob,
    deleteJob,
    applications,
    applyToJob,
    isLoading,
  };

  return (
    <MockDataContext.Provider value={value}>
      {children}
    </MockDataContext.Provider>
  );
};
