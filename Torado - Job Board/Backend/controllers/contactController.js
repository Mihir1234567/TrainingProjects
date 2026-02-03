// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: "Please fill in all required fields" });
  }

  // NOTE: In a real app, we would send an email here using Nodemailer or SendGrid
  // For now, we just log it and return success

  console.log("Contact Form Submission:");
  console.log("From:", name, email);
  console.log("Subject:", subject);
  console.log("Message:", message);

  // We could also save this to a "ContactRequest" collection if we wanted CRM-like features

  res.status(200).json({ message: "Message sent successfully!" });
};

module.exports = {
  submitContactForm,
};
