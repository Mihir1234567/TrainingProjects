const Message = require("../models/Message");
const User = require("../models/User");

// @desc    Send a message
// @route   POST /api/messages
// @access  Private
const sendMessage = async (req, res) => {
  const { receiverId, content } = req.body;

  try {
    const message = await Message.create({
      senderId: req.user.id,
      receiverId,
      content,
    });
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
    }).sort({ createdAt: 1 });
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

    // Combine and unique
    const userIds = [
      ...new Set([
        ...sent.map((id) => id.toString()),
        ...received.map((id) => id.toString()),
      ]),
    ];

    const users = await User.find({ _id: { $in: userIds } }).select(
      "name image jobTitle",
    );

    // Check unread count for each?
    // For simplicity, just return users list
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  sendMessage,
  getConversation,
  getInbox,
};
