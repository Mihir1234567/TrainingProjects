const mongoose = require("mongoose");

const jobSchema = mongoose.Schema(
  {
    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      // required: true, // Optional for now if we want to allow quick posts
    },
    company: String, // Allow storing company name directly
    companyCategory: String,
    companyType: String,
    title: {
      type: String,
      required: [true, "Please add a job title"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    type: {
      type: String, // Full Time, Part Time, etc.
      default: "Full Time",
    },
    location: {
      type: String,
      required: [true, "Please add a location"],
    },
    address: String, // Friendly address
    salaryRange: {
      min: Number,
      max: Number,
    },
    salaryCurrency: String,
    salaryType: {
      type: String,
      enum: ["Hourly", "Monthly", "Yearly"],
      default: "Yearly",
    },
    tags: [String],
    gender: {
      type: String,
      enum: ["Male", "Female", "Both"],
      default: "Both",
    },
    applyType: String,
    experience: String,
    careerLevel: String,
    qualification: String,
    videoUrl: String,
    industry: String,
    deadline: Date,

    requirements: [String],
    responsibilities: [String],
    fundamentalSkills: [String], // Added to store job-specific skills
    talentExperience: [String], // Added to store job-specific experience requirements
    status: {
      type: String,
      enum: ["Active", "Closed", "Draft", "Pending", "Rejected", "Expired"],
      default: "Active", // Or "Pending" if we want approval flow by default later
    },
    featured: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    applicationsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Job", jobSchema);
