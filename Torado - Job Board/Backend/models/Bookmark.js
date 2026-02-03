const mongoose = require("mongoose");

const bookmarkSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // Dynamic ref based on type? Or just store ID and populate manually/conditionally
      refPath: "targetModel",
    },
    targetModel: {
      type: String,
      required: true,
      enum: ["Job", "User"], // Job for candidates saving jobs, User for recruiters saving candidates(resumes)
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Prevent duplicate bookmarks
bookmarkSchema.index({ userId: 1, targetId: 1 }, { unique: true });

module.exports = mongoose.model("Bookmark", bookmarkSchema);
