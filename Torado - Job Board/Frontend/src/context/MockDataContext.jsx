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
        setJobs(jobsData || []);

        // Mock initial applications for demo
        setApplications([
          {
            id: 1,
            jobId: 1,
            date: "2025-01-20T10:00:00Z",
            status: "Active",
            name: "Maève Parisian",
            category: "Creative",
            location: "London, UK",
            jobTitle: "Web Designer",
            rating: 4.8,
            reviews: 12,
            image:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
          },
          {
            id: 2,
            jobId: 3,
            date: "2025-01-22T14:30:00Z",
            status: "Interview",
            name: "Bernardo Hermiston",
            category: "Technology",
            location: "New York, USA",
            jobTitle: "React Developer",
            rating: 4.5,
            reviews: 8,
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
          },
          {
            id: 3,
            jobId: 5,
            date: "2025-01-25T09:15:00Z",
            status: "Pending",
            name: "Lindsay Schiller",
            category: "Marketing",
            location: "Berlin, DE",
            jobTitle: "Marketing Manager",
            rating: 4.2,
            reviews: 5,
            image:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
          },
        ]);

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
      postedAt: "Just now",
      recruiterId: 101,
      recruiterName: "Demo Recruiter",
      logo: "https://via.placeholder.com/50",
    });
    setJobs((prev) => [createdJob, ...prev]);
    return createdJob;
  };

  const deleteJob = async (jobId) => {
    await jobsAPI.delete(jobId);
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
  };

  const applyToJob = async (jobId, candidateData) => {
    const newApp = await applicationsAPI.apply(jobId, candidateData);
    setApplications((prev) => [...prev, newApp]);
    return newApp;
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
