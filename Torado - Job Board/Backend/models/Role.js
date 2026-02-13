const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a role name"],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    permissions: [
      {
        type: String, // e.g., "user.create", "job.delete"
      },
    ],
    isSystem: {
      type: Boolean,
      default: false,
    },
    rank: {
      type: Number,
      default: 0, // 0: Lowest, 100: Super Admin
    },
    version: {
      type: Number,
      default: 0, // Incremented on permission change
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Role", roleSchema);
