const express = require("express");
const router = express.Router();
const {
  getCandidates,
  getFreelancers,
  getUserById,
  updateProfile,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.get("/candidates", getCandidates);
router.get("/freelancers", getFreelancers);
router.get("/:id", getUserById);
router.put("/profile", protect, updateProfile);

module.exports = router;
