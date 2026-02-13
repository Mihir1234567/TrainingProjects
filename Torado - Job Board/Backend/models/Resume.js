const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // Personal Information
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
    },
    image: {
      type: String,
    },
    imageAction: {
      type: Object, // Store crop data
      default: null,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    jobCategory: {
      type: String,
      trim: true,
    },
    professionalTitle: {
      type: String,
      trim: true,
    },
    resumeContent: {
      type: String,
    },

    // File Upload Fields
    fileUrl: {
      type: String, // URL to the uploaded file (PDF/Doc)
    },
    fileName: {
      type: String, // Original filename
    },
    type: {
      type: String,
      enum: ["Builder", "Upload"],
      default: "Builder",
    },
    isDefault: {
      type: Boolean,
      default: false,
    },

    // Education
    education: [
      {
        school: String,
        qualification: String,
        startDate: String,
        endDate: String,
        notes: String,
      },
    ],

    // Experience
    experience: [
      {
        employer: String,
        jobTitle: String,
        startDate: String,
        endDate: String,
        notes: String,
      },
    ],

    // Skills
    skills: [
      {
        name: String,
        percentage: Number,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Resume", resumeSchema);
