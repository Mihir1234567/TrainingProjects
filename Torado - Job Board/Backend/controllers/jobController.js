const Job = require("../models/Job");
const Company = require("../models/Company");

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
const getJobs = async (req, res) => {
  try {
    const { keyword, location, category, type, sort, recruiterId, companyId } =
      req.query;

    let query = { status: "Active" };

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { tags: { $in: [new RegExp(keyword, "i")] } },
      ];
    }

    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    if (category) {
      query.category = category; // Exact match or regex if needed
    }

    if (type) {
      query.type = type; // Full Time, Part Time etc.
    }

    if (recruiterId) {
      query.recruiterId = recruiterId;
    }

    if (companyId) {
      query.companyId = companyId;
    }

    // Salary Filter (Min Salary)
    const minSalary = parseInt(req.query.minSalary);
    if (!isNaN(minSalary)) {
      query.$or = [
        // If salaryRange exists
        { "salaryRange.max": { $gte: minSalary } },
        // Legacy string check (simplified, might miss some)
        // { salary: { $exists: true } }
      ];
    }

    // Tags Filter
    if (req.query.tags) {
      const tagsArray = req.query.tags.split(",");
      query.tags = { $in: tagsArray.map((t) => new RegExp(t, "i")) };
    }

    let sortOption = { createdAt: -1 };
    if (sort === "salary_high") {
      // Limitation: Salary stored as string "$50k-$80k", difficult to sort in Mongo without aggregation or changing schema.
      // For now, ignoring complex salary sort or assuming schema change is too risky for this iteration.
      // potentially sort by createdAt
    } else if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10; // Default 10
    const skip = (page - 1) * limit;

    const total = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .populate("companyId", "name logo location")
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      jobs,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get my jobs
// @route   GET /api/jobs/my-jobs
// @access  Private (Employer)
const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate(
      "companyId",
      "name logo location",
    );
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a job
// @route   POST /api/jobs
// @access  Private (Employer)
const createJob = async (req, res) => {
  // Ensure user is employer
  if (req.user.role !== "employer") {
    return res.status(403).json({ message: "Not authorized to post jobs" });
  }

  try {
    // Check if company exists for this user, if not create one or use details
    // For simplicity, we assume companyName is on User or we might implement Company creation later
    // Let's create a Company dummy if needed or just use User data.

    // Simplification for now: Link to a dummy company if not exists or create one based on User profile
    let company = await Company.findOne({ userId: req.user.id });
    if (!company) {
      company = await Company.create({
        userId: req.user.id,
        name: req.user.companyName || "Unknown Company",
        description: "Auto-generated company profile",
      });
    }

    const job = await Job.create({
      recruiterId: req.user.id,
      companyId: company._id,
      ...req.body,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Owner)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // DEBUG LOGGING
    console.log("Debug Delete Auth Check:");
    console.log("User ID:", req.user.id);
    console.log("User Role:", req.user.role);
    console.log("Job Recruiter ID:", job.recruiterId.toString());

    // Check user
    if (
      job.recruiterId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      console.log("Delete Failed: Unauthorized access attempt.");
      return res.status(401).json({ message: "User not authorized" });
    }

    await job.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getJobs,
  getMyJobs,
  getJobById,
  createJob,
  deleteJob,
};
