const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");

dotenv.config({ path: path.join(__dirname, "../.env") });

const checkUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "mihir@gmail.com";
    const user = await User.findOne({ email: email.toLowerCase() }); // ensuring case-insensitive check

    if (user) {
      console.log(`User Found:`);
      console.log(`- ID: ${user._id}`);
      console.log(`- Name: ${user.name}`);
      console.log(`- Email: ${user.email}`);
      console.log(`- Role: ${user.role}`);
      console.log(`- Profile Complete: ${user.isProfileComplete}`);
    } else {
      console.log(`User with email '${email}' NOT found.`);
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

checkUser();
