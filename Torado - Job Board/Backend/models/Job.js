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
    status: {
      type: String,
      enum: ["Active", "Closed", "Draft"],
      default: "Active",
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
