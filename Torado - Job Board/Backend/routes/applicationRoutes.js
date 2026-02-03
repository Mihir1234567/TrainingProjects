const express = require("express");
const router = express.Router();
const {
  applyJob,
  getJobApplications,
  getMyApplications,
  getRecruiterApplications,
} = require("../controllers/applicationController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, applyJob);
router.get("/me", protect, getMyApplications);
router.get("/recruiter/all", protect, getRecruiterApplications);
router.get("/job/:jobId", protect, getJobApplications);

module.exports = router;
