const express = require("express");
const router = express.Router();
const {
  getDashboardStats,
  getPublicStats,
} = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");

// Protected routes
router.get("/stats", protect, getDashboardStats);
router.get("/public-stats", getPublicStats);

module.exports = router;
