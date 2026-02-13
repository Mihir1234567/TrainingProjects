const express = require("express");
const router = express.Router();
const {
  getAllJobs,
  updateJobStatus,
  deleteJob,
  getAllApplications,
  updateApplicationStatus,
  getEmployers,
  getSystemLogs,
} = require("../controllers/adminController");

const {
  protect,
  authorize,
  checkPermission,
} = require("../middleware/authMiddleware");

// All routes are protected and require admin role
router.use(protect);
router.use(authorize("admin")); // This ensures req.user.role === 'admin'

// Job Management
// Permission check: 'job:read', 'job:update', 'job:delete'
router.get("/jobs", checkPermission("job:read"), getAllJobs);
router.put("/jobs/:id/status", checkPermission("job:update"), updateJobStatus);
router.delete("/jobs/:id", checkPermission("job:delete"), deleteJob);

// Application Management
// Permission check: 'application:read', 'application:update'
router.get(
  "/applications",
  checkPermission("application:read"),
  getAllApplications,
);
router.put(
  "/applications/:id/status",
  checkPermission("application:update"),
  updateApplicationStatus,
);

// User Management (Specific extensions)
router.get("/employers", checkPermission("user:read"), getEmployers);

// System Logs
router.get("/logs", checkPermission("user:read"), getSystemLogs);

module.exports = router;
