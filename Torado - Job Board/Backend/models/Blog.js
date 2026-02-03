const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
    },
    image: {
      type: String,
      default: "https://via.placeholder.com/600",
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    author: {
      type: String,
      required: [true, "Please add an author name"],
    },
    date: {
      type: String, // Storing as string to match JSON format "August 31, 2021", or could parse to Date
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    content: {
      type: String, // Full HTML or Markdown content
    },
    tags: [String],
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Blog", blogSchema);
