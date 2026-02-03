const express = require("express");
const router = express.Router();
const {
  toggleBookmark,
  getMyBookmarks,
} = require("../controllers/bookmarkController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, toggleBookmark);
router.get("/", protect, getMyBookmarks);

module.exports = router;
