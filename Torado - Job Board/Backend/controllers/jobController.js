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

// Helper to update company fields
const updateCompanyDetails = (company, data) => {
  if (data.companyMission) company.mission = data.companyMission;
  if (data.companyAbout) company.aboutUs = data.companyAbout;
  // Ensure array handling for skills and talent
  if (data.companySkills)
    company.skills = Array.isArray(data.companySkills)
      ? data.companySkills
      : [data.companySkills];
  if (data.companyTalent)
    company.talent = Array.isArray(data.companyTalent)
      ? data.companyTalent
      : [data.companyTalent];
  if (data.companyRecruitments) company.recruitments = data.companyRecruitments;
  if (data.companyPeople) company.people = data.companyPeople;
  if (data.companyEstablished) company.established = data.companyEstablished;
  if (data.companyPhone) company.phone = data.companyPhone;
  if (data.companyEmail) company.email = data.companyEmail;
  if (data.companyLocation) company.location = data.companyLocation;
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
    let company = await Company.findOne({ userId: req.user.id });
    if (!company) {
      company = await Company.create({
        userId: req.user.id,
        name: req.user.companyName || "Unknown Company",
        description: "Auto-generated company profile",
      });
    }

    console.log("DEBUG: createJob received body keys:", Object.keys(req.body));
    console.log("DEBUG: Updating company details for companyId:", company._id);
    console.log("DEBUG: companyMission before:", company.mission);

    // Update Company Details
    updateCompanyDetails(company, req.body);

    console.log("DEBUG: companyMission after:", company.mission);

    await company.save();
    console.log("DEBUG: Company saved successfully.");

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

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Owner)
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Check user
    if (
      job.recruiterId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ message: "User not authorized" });
    }

    // Update Company Details
    if (job.companyId) {
      const company = await Company.findById(job.companyId);
      if (company) {
        updateCompanyDetails(company, req.body);
        await company.save();
      }
    }

    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json(updatedJob);
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
  updateJob,
};
