const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");

// Load env vars
dotenv.config({ path: path.join(__dirname, "../.env") });

const checkUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const email = "Boss1@gmail.com";
    const emailLower = email.toLowerCase();

    console.log(`Checking for '${email}'...`);
    const userExact = await User.findOne({ email: email });
    if (userExact) {
      console.log(
        `FOUND (Exact Match): ID=${userExact._id}, Email=${userExact.email}, Role=${userExact.role}`,
      );
    } else {
      console.log("NOT FOUND (Exact Match)");
    }

    console.log(`Checking for '${emailLower}'...`);
    const userLower = await User.findOne({ email: emailLower });
    if (userLower) {
      console.log(
        `FOUND (Lowercase Match): ID=${userLower._id}, Email=${userLower.email}, Role=${userLower.role}`,
      );
    } else {
      console.log("NOT FOUND (Lowercase Match)");
    }

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkUser();
