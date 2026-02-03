const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getConversation,
  getInbox,
} = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, sendMessage);
router.get("/inbox", protect, getInbox); // Specific route before parameterized route
router.get("/:userId", protect, getConversation);

module.exports = router;
