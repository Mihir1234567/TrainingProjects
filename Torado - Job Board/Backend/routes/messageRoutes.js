const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getConversation,
  getInbox,
  deleteMessage,
} = require("../controllers/messageController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, sendMessage);
router.get("/inbox", protect, getInbox); // Specific route before parameterized route
router.get("/:userId", protect, getConversation);
router.delete("/:messageId", protect, deleteMessage);

module.exports = router;
