console.log("Script starting...");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");

// Load env vars
dotenv.config({ path: path.join(__dirname, "../.env") });
console.log("Env loaded, URI:", process.env.MONGO_URI ? "Found" : "Missing");

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const email = "test_verification_" + Date.now() + "@example.com";
    const password = "password123";

    // 1. Create User
    console.log("Creating user...");
    const user = await User.create({
      name: "Test User",
      email,
      password,
      role: "candidate",
    });

    // 2. Verify Password works immediately
    console.log("Verifying initial password...");
    const isMatchInitial = await user.matchPassword(password);
    if (!isMatchInitial) {
      throw new Error(
        "Initial password check failed! Hashing might be broken entirely.",
      );
    }
    console.log("Initial password check passed.");

    // 3. Update User (non-password field)
    console.log("Updating user profile (triggering save)...");
    user.name = "Updated Name";
    await user.save();

    // 4. Verify Password works AFTER update
    console.log("Verifying password after update...");
    // Fetch fresh from DB to be sure
    const updatedUser = await User.findById(user._id).select("+password");
    const isMatchAfter = await updatedUser.matchPassword(password);

    if (!isMatchAfter) {
      throw new Error(
        "Password check failed after update! The password was likely re-hashed.",
      );
    }

    console.log("SUCCESS: Password check passed after update. Fix is working.");

    // Cleanup
    await User.findByIdAndDelete(user._id);
    console.log("Cleanup done.");

    process.exit(0);
  } catch (error) {
    console.error("FAILED:", error.message);
    process.exit(1);
  }
};

run();
