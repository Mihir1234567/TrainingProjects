const AuditLog = require("../models/AuditLog");

const logAction = async ({
  action,
  performedBy,
  targetUser = null,
  targetRole = null,
  changes = {},
  before = null,
  after = null,
  req = null,
  status = "success",
}) => {
  try {
    // Simple diff logic
    let diff = {};
    if (before && after) {
      Object.keys(after).forEach((key) => {
        if (JSON.stringify(before[key]) !== JSON.stringify(after[key])) {
          diff[key] = { from: before[key], to: after[key] };
        }
      });
    }

    const log = new AuditLog({
      action,
      performedBy,
      targetUser,
      targetRole,
      changes,
      before,
      after,
      diff: Object.keys(diff).length > 0 ? diff : undefined,
      ipAddress: req?.ip || req?.connection?.remoteAddress,
      userAgent: req?.get("User-Agent"),
      status,
    });

    await log.save();
  } catch (error) {
    console.error("Audit Log Error:", error);
    // Don't crash the main process if logging fails
  }
};

module.exports = { logAction };
