const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");

dotenv.config({ path: path.join(__dirname, "../.env") });

const testRegisterLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const email = "test_reg_" + Date.now() + "@example.com";
    const password = "password123";

    console.log(`Attempting to register: ${email} with password: ${password}`);

    // 1. Register (Simulate User.create)
    // Note: We need to use valid data as per schema
    const user = await User.create({
      name: "Test Register",
      email: email.toLowerCase(), // Controller does this
      password: password,
      role: "candidate",
    });

    console.log("User created successfully with ID:", user._id);
    console.log("Stored Hashed Password (in memory doc):", user.password);

    // 2. Fetch from DB to verify raw stored value
    const storedUser = await User.findById(user._id).select("+password");
    console.log("Stored Hashed Password (from DB):", storedUser.password);

    // 3. Verify Password using matchPassword method
    const isMatch = await storedUser.matchPassword(password);
    console.log(`Password Match Result for '${password}':`, isMatch);

    if (isMatch) {
      console.log("SUCCESS: Registration and Login flow verified.");
    } else {
      console.error("FAILURE: Password did not match!");
    }

    // Cleanup
    await User.findByIdAndDelete(user._id);
    process.exit(0);
  } catch (error) {
    console.error("Error during test:", error);
    process.exit(1);
  }
};

testRegisterLogin();
