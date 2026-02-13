const mongoose = require("mongoose");
const User = require("../models/User"); // Adjust path if needed
require("dotenv").config();
const connectDB = require("../config/db");

const freelancers = [
  "chelsea.parisian@example.com",
  "bertrand.proffer@example.com",
  "madison.kohler@example.com",
  "wilford.johns@example.com",
  "lana.steiner@example.com",
  "david.smith@example.com",
  "sarah.jenkins@example.com",
  "michael.chen.freelancer@example.com",
  "emma.wilson@example.com",
  "james.rodriguez@example.com",
  "olivia.thompson@example.com",
  "daniel.kim@example.com",
];

const updateFreelancers = async () => {
  try {
    await connectDB();
    console.log("MongoDB Connected");

    for (const email of freelancers) {
      const user = await User.findOne({ email });
      if (user) {
        user.isFreelancer = true;
        // Ensure rate is set if missing (using a default if needed, but seed has it)
        await user.save();
        console.log(`Updated ${user.name} to isFreelancer: true`);
      } else {
        console.log(`User not found: ${email}`);
      }
    }

    console.log("Migration complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

updateFreelancers();
