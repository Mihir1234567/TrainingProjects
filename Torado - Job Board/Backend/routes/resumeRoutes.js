const express = require("express");
const router = express.Router();
const {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  setDefaultResume,
} = require("../controllers/resumeController");
const { protect } = require("../middleware/authMiddleware");

// All resume routes should be protected
router.route("/").get(protect, getResumes).post(protect, createResume);
router.put("/:id/default", protect, setDefaultResume);
router
  .route("/:id")
  .get(protect, getResumeById)
  .put(protect, updateResume)
  .delete(protect, deleteResume);

module.exports = router;
