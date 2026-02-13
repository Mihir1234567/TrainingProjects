const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");

dotenv.config({ path: path.join(__dirname, "../.env") });

const resetPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "employer@example.com";
    const newPassword = "password123";

    // Find the user
    // We intentionally use findOne first, then set password and save
    // to ensure the pre-save hook runs (which we verified is fixed).
    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found!");
      process.exit(1);
    }

    console.log(`Found user: ${user.name} (${user.email})`);

    user.password = newPassword;
    await user.save();

    console.log(`Password reset successfully for ${email}`);
    console.log(`New password: ${newPassword}`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

resetPassword();
