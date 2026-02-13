const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    candidateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: {
      type: String, // URL to resume
      // required: true
    },
    coverLetter: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Interview", "Rejected", "Hired"],
      default: "Pending",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate applications
applicationSchema.index({ jobId: 1, candidateId: 1 }, { unique: true });

module.exports = mongoose.model("Application", applicationSchema);
