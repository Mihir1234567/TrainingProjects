const Job = require("../models/Job");
const Application = require("../models/Application");
const User = require("../models/User");
const { logAction } = require("../utils/auditLogger");

// @desc    Get all jobs (Admin)
// @route   GET /api/admin/jobs
// @access  Private-Admin
const getAllJobs = async (req, res) => {
  try {
    const { keyword, status, company, page = 1, limit = 10 } = req.query;
    const query = { isDeleted: { $ne: true } }; // Default: hide deleted

    // Allow seeing deleted if explicitly asked?
    // For now, let's keep it simple: soft deleted jobs are hidden from list unless we add a 'trashed' filter.
    if (req.query.showDeleted === "true") {
      delete query.isDeleted;
    }

    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { company: { $regex: keyword, $options: "i" } },
      ];
    }

    if (status && status !== "All") {
      query.status = status;
    }

    // In future: Filter by company ID if needed

    const skip = (page - 1) * limit;
    const total = await Job.countDocuments(query);

    const jobs = await Job.find(query)
      .populate("recruiterId", "name email")
      .populate("companyId", "name logo")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      jobs,
      total,
      pages: Math.ceil(total / limit),
      page: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Job Status (Admin)
// @route   PUT /api/admin/jobs/:id/status
// @access  Private-Admin
const updateJobStatus = async (req, res) => {
  try {
    const { status, featured } = req.body;
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const before = job.toObject();

    if (status) job.status = status;
    if (featured !== undefined) job.featured = featured;

    const updatedJob = await job.save();

    await logAction({
      action: "ADMIN_JOB_UPDATE",
      performedBy: req.user._id,
      targetUser: job.recruiterId, // Log owner as target? Or just use targetJob?
      // AuditLog doesn't have targetJob field, we can use targetUser (owner) or generic 'details'
      changes: { status, featured },
      req,
      before,
      after: updatedJob.toObject(),
    });

    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete Job (Admin - Soft Delete)
// @route   DELETE /api/admin/jobs/:id
// @access  Private-Admin
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Soft Delete
    job.isDeleted = true;
    job.deletedAt = new Date();
    await job.save();

    await logAction({
      action: "ADMIN_JOB_DELETE",
      performedBy: req.user._id,
      targetUser: job.recruiterId,
      req,
    });

    res.status(200).json({ message: "Job soft deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all applications (Admin)
// @route   GET /api/admin/applications
// @access  Private-Admin
const getAllApplications = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, keyword } = req.query;
    const query = { isDeleted: { $ne: true } };

    if (status && status !== "All") {
      query.status = status;
    }

    // Keyword search? Maybe candidate name or job title?
    // This is hard with simple query. We'd need aggregation to redundant store names.
    // For now, simple filters.

    const skip = (page - 1) * limit;
    const total = await Application.countDocuments(query);

    const applications = await Application.find(query)
      .populate("candidateId", "name email")
      .populate("jobId", "title company")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      applications,
      total,
      pages: Math.ceil(total / limit),
      page: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update Application Status (Admin)
// @route   PUT /api/admin/applications/:id/status
// @access  Private-Admin
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const before = application.toObject();
    application.status = status;
    const updatedApp = await application.save();

    await logAction({
      action: "ADMIN_APP_UPDATE",
      performedBy: req.user._id,
      targetUser: application.candidateId,
      changes: { status },
      req,
      before,
      after: updatedApp.toObject(),
    });

    res.status(200).json(updatedApp);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Employer Stats
// @route   GET /api/admin/employers
// @access  Private-Admin
// This returns list of employers with their job counts etc.
const getEmployers = async (req, res) => {
  try {
    const { page = 1, limit = 10, keyword } = req.query;
    const query = { role: "employer", isDeleted: { $ne: true } };

    if (keyword) {
      query.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { email: { $regex: keyword, $options: "i" } },
        { companyName: { $regex: keyword, $options: "i" } },
      ];
    }

    const total = await User.countDocuments(query);
    const skip = (page - 1) * limit;

    // We need aggregation if we want job counts efficiently, but let's do simple population first
    // or separate calls if needed. For now just returning users.
    // Ideally we want: Name, Email, Total Jobs, Status

    const employers = await User.find(query)
      .select("-password")
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    // Populate job counts manually or via aggregation
    const employersWithStats = await Promise.all(
      employers.map(async (emp) => {
        const jobCount = await Job.countDocuments({
          recruiterId: emp._id,
          isDeleted: { $ne: true },
        });
        const activeJobCount = await Job.countDocuments({
          recruiterId: emp._id,
          status: "Active",
          isDeleted: { $ne: true },
        });
        return {
          ...emp.toObject(),
          totalJobs: jobCount,
          activeJobs: activeJobCount,
        };
      }),
    );

    res.status(200).json({
      users: employersWithStats,
      total,
      pages: Math.ceil(total / limit),
      page: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const AuditLog = require("../models/AuditLog");

// @desc    Get System Logs
// @route   GET /api/admin/logs
// @access  Private-Admin
const getSystemLogs = async (req, res) => {
  try {
    const { page = 1, limit = 20, action, keyword } = req.query;
    const query = {};

    if (action) {
      query.action = action;
    }

    if (keyword) {
      // Search in action or potentially populate and search user name (harder)
      // For now, simpler search
      query.$or = [
        { action: { $regex: keyword, $options: "i" } },
        { ipAddress: { $regex: keyword, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const total = await AuditLog.countDocuments(query);

    const logs = await AuditLog.find(query)
      .populate("performedBy", "name email role")
      .populate("targetUser", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      logs,
      total,
      pages: Math.ceil(total / limit),
      page: parseInt(page),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllJobs,
  updateJobStatus,
  deleteJob,
  getAllApplications,
  updateApplicationStatus,
  getEmployers,
  getSystemLogs,
};
