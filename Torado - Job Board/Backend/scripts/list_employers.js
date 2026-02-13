const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");

dotenv.config({ path: path.join(__dirname, "../.env") });

const listEmployers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const employers = await User.find({ role: "employer" });

    console.log("Found Employers:");
    employers.forEach((e) => {
      console.log(`- Name: ${e.name}, Email: ${e.email}, ID: ${e._id}`);
    });

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

listEmployers();
