const Message = require("../models/Message");
const User = require("../models/User");

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
  const { receiverId, content, replyTo } = req.body;

  try {
    const message = await Message.create({
      senderId: req.user.id,
      receiverId,
      content,
      replyTo: replyTo || null,
    });

    await message.populate("replyTo", "content senderId");

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get conversation with a specific user
// @route   GET /api/messages/:userId
// @access  Private
const getConversation = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.user.id, receiverId: req.params.userId },
        { senderId: req.params.userId, receiverId: req.user.id },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("replyTo", "content senderId");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get List of Users texted with (Inbox)
// @route   GET /api/messages/inbox
// @access  Private
const getInbox = async (req, res) => {
  try {
    // Find unique users interacted with
    const sent = await Message.find({ senderId: req.user.id }).distinct(
      "receiverId",
    );
    const received = await Message.find({ receiverId: req.user.id }).distinct(
      "senderId",
    );

    console.log("User ID:", req.user.id);
    console.log("Sent to:", sent);
    console.log("Received from:", received);

    // Combine and unique
    const userIds = [
      ...new Set([
        ...sent.map((id) => id.toString()),
        ...received.map((id) => id.toString()),
      ]),
    ];

    console.log("Combined user IDs:", userIds);

    const users = await User.find({ _id: { $in: userIds } }).select(
      "name image jobTitle role",
    );

    console.log("Users found:", users.length);

    // Check unread count for each?
    // For simplicity, just return users list
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:messageId
// @access  Private
const deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Only allow deletion of own messages
    if (message.senderId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this message" });
    }

    await message.deleteOne();
    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getConversation,
  getInbox,
  deleteMessage,
};
