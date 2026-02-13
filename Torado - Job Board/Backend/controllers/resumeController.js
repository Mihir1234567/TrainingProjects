const Resume = require("../models/Resume");

// @desc    Create a resume
// @route   POST /api/resumes
// @access  Private
const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      userId: req.user.id,
      ...req.body,
    });
    res.status(201).json(resume);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all resumes for the logged-in user or specified user (if employer/admin)
// @route   GET /api/resumes?userId=xxx
// @access  Private
const getResumes = async (req, res) => {
  try {
    let userId = req.user.id;

    // If userId query param is provided and user is employer/admin, allow viewing that user's resumes
    if (
      req.query.userId &&
      (req.user.role === "employer" || req.user.role === "admin")
    ) {
      userId = req.query.userId;
    }

    const resumes = await Resume.find({ userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(resumes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Ensure user owns the resume OR is an employer/admin
    if (
      resume.userId.toString() !== req.user.id &&
      req.user.role !== "employer" &&
      req.user.role !== "admin"
    ) {
      return res.status(401).json({ message: "Not authorized" });
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Ensure user owns the resume
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedResume = await Resume.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    res.status(200).json(updatedResume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Ensure user owns the resume
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // If deleting the default resume, clear the user's resumeUrl
    if (resume.isDefault) {
      const User = require("../models/User");
      await User.findByIdAndUpdate(req.user.id, { resumeUrl: "" });
    }

    await resume.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Set default resume
// @route   PUT /api/resumes/:id/default
// @access  Private
const setDefaultResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Ensure user owns the resume
    if (resume.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    // Reset all other resumes for this user to isDefault: false
    await Resume.updateMany(
      { userId: req.user.id },
      { $set: { isDefault: false } },
    );

    // Set this resume to isDefault: true
    resume.isDefault = true;
    await resume.save();

    // Update User profile resumeUrl for backward compatibility
    const User = require("../models/User");
    if (resume.type === "Upload" && resume.fileUrl) {
      await User.findByIdAndUpdate(req.user.id, { resumeUrl: resume.fileUrl });
    } else {
      // If builder resume is default, set a special protocol so frontend knows to use ResumeDownloader
      await User.findByIdAndUpdate(req.user.id, {
        resumeUrl: `dashboard-resume://${resume._id}`,
      });
    }

    res.status(200).json(resume);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  setDefaultResume,
};
