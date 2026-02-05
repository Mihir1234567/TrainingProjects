const express = require("express");
const router = express.Router();
const {
  getJobs,
  getJobById,
  createJob,
  deleteJob,
  getMyJobs,
  updateJob,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

// Place specific routes before parameterized routes
router.route("/my-jobs").get(protect, getMyJobs);
router.route("/").get(getJobs).post(protect, createJob);
router
  .route("/:id")
  .get(getJobById)
  .delete(protect, deleteJob)
  .put(protect, updateJob);

module.exports = router;
