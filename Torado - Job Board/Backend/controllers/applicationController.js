const Application = require("../models/Application");
const Job = require("../models/Job");

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Candidate)
const applyJob = async (req, res) => {
  if (req.user.role !== "candidate") {
    return res.status(403).json({ message: "Only candidates can apply" });
  }

  const { jobId, resume, coverLetter } = req.body;

  try {
    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if already applied
    const alreadyApplied = await Application.findOne({
      jobId,
      candidateId: req.user.id,
    });

    if (alreadyApplied) {
      return res
        .status(400)
        .json({ message: "You have already applied to this job" });
    }

    const application = await Application.create({
      jobId,
      candidateId: req.user.id,
      resume,
      coverLetter,
      status: "Pending",
    });

    // Increment job application count
    job.applicationsCount = (job.applicationsCount || 0) + 1;
    await job.save();

    res.status(201).json(application);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get applications for a job (Employer)
// @route   GET /api/applications/job/:jobId
// @access  Private (Owner)
const getJobApplications = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // DEBUG LOGGING
    console.log("Debug Auth Check:");
    console.log("User ID:", req.user.id);
    console.log("User Role:", req.user.role);
    console.log("Job Recruiter ID:", job.recruiterId.toString());

    if (
      job.recruiterId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      console.log("Auth Check Failed: Recruiter mismatch and not admin.");
      return res.status(401).json({
        message: "Not authorized. You are not the owner of this job.",
      });
    }

    const applications = await Application.find({ jobId: req.params.jobId })
      .populate("candidateId", "name email jobTitle") // Populate candidate info
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get my applications (Candidate)
// @route   GET /api/applications/me
// @access  Private (Candidate)
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ candidateId: req.user.id })
      .populate({
        path: "jobId",
        select: "title location type companyId",
        populate: {
          path: "companyId",
          select: "name logo",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all applications for recruiter (across all jobs)
// @route   GET /api/applications/recruiter/all
// @access  Private (Employer)
const getRecruiterApplications = async (req, res) => {
  try {
    // 1. Find all jobs posted by this recruiter
    const jobs = await Job.find({ recruiterId: req.user.id }).select("_id");
    const jobIds = jobs.map((job) => job._id);

    // 2. Find applications for these jobs
    const applications = await Application.find({ jobId: { $in: jobIds } })
      .populate("candidateId", "name email jobTitle")
      .populate("jobId", "title")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyJob,
  getJobApplications,
  getMyApplications,
  getRecruiterApplications,
};
