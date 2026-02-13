const mongoose = require("mongoose");
const Resume = require("../models/Resume");
const User = require("../models/User");
require("dotenv").config();
const connectDB = require("../config/db");

const debugResume = async () => {
  try {
    await connectDB();

    // Find the most recent resume
    const resume = await Resume.findOne().sort({ createdAt: -1 });

    if (!resume) {
      console.log("No resumes found.");
    } else {
      console.log("Latest Resume:");
      console.log(JSON.stringify(resume, null, 2));

      if (resume.fileUrl) {
        console.log("\nFile URL:", resume.fileUrl);
      }
    }

    process.exit();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

debugResume();
