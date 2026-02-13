const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      required: true, // e.g., "USER_UPDATE", "ROLE_DELETE"
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    targetUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    targetRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    changes: {
      type: Object, // Store specific changes
    },
    before: {
      type: Object, // State before change
    },
    after: {
      type: Object, // State after change
    },
    diff: {
      type: Object, // Computed difference
    },
    ipAddress: String,
    userAgent: String,
    status: {
      type: String,
      enum: ["success", "failure"],
      default: "success",
    },
  },
  {
    timestamps: true,
  },
);

// Indexes for fast retrieval
auditLogSchema.index({ performedBy: 1 });
auditLogSchema.index({ targetUser: 1 });
auditLogSchema.index({ targetRole: 1 });
auditLogSchema.index({ action: 1 });
auditLogSchema.index({ createdAt: -1 });

module.exports = mongoose.model("AuditLog", auditLogSchema);
