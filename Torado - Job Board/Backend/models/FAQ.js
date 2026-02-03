const mongoose = require("mongoose");

const faqSchema = mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "Please add a question"],
    },
    answer: {
      type: String,
      required: [true, "Please add an answer"],
    },
    category: {
      type: String,
      default: "General",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("FAQ", faqSchema);
