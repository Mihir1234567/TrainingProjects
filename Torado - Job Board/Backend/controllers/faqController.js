const FAQ = require("../models/FAQ");

// @desc    Get all FAQs // (Maybe grouped by category on frontend)
// @route   GET /api/faqs
// @access  Public
const getFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an FAQ
// @route   POST /api/faqs
// @access  Private (Admin)
const createFAQ = async (req, res) => {
  try {
    const faq = await FAQ.create(req.body);
    res.status(201).json(faq);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getFAQs,
  createFAQ,
};
