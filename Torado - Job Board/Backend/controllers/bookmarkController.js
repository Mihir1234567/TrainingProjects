const Bookmark = require("../models/Bookmark");

// @desc    Toggle Bookmark (Save/Unsave)
// @route   POST /api/bookmarks
// @access  Private
const toggleBookmark = async (req, res) => {
  const { targetId, targetModel } = req.body;

  if (!targetId || !targetModel) {
    return res
      .status(400)
      .json({ message: "Target ID and Model are required" });
  }

  try {
    const existingBookmark = await Bookmark.findOne({
      userId: req.user.id,
      targetId,
    });

    if (existingBookmark) {
      await existingBookmark.deleteOne();
      return res
        .status(200)
        .json({ message: "Bookmark removed", bookmarked: false });
    } else {
      await Bookmark.create({
        userId: req.user.id,
        targetId,
        targetModel,
      });
      return res
        .status(201)
        .json({ message: "Bookmark added", bookmarked: true });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get My Bookmarks
// @route   GET /api/bookmarks
// @access  Private
const getMyBookmarks = async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user.id })
      .populate("targetId") // Use refPath to populate dynamically
      .sort({ createdAt: -1 });
    res.status(200).json(bookmarks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  toggleBookmark,
  getMyBookmarks,
};
