const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");

dotenv.config({ path: path.join(__dirname, "../.env") });

const testLogin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const password = "123456789";

    console.log("--- Testing Login ---");

    // Test 1: Exact case (Lower case as stored)
    const emailLower = "boss1@gmail.com";
    const userLower = await User.findOne({ email: emailLower }).select(
      "+password",
    );
    if (userLower) {
      const isMatch = await userLower.matchPassword(password);
      console.log(
        `[PASS] Login with '${emailLower}': User found, Password match: ${isMatch}`,
      );
    } else {
      console.log(`[FAIL] Login with '${emailLower}': User NOT found`);
    }

    // Test 2: Mixed case (User input)
    const emailMixed = "Boss1@gmail.com";
    const userMixed = await User.findOne({ email: emailMixed }).select(
      "+password",
    );
    if (userMixed) {
      const isMatch = await userMixed.matchPassword(password);
      console.log(
        `[PASS] Login with '${emailMixed}': User found, Password match: ${isMatch}`,
      );
    } else {
      console.log(
        `[FAIL] Login with '${emailMixed}': User NOT found (Expected failure if case-sensitive)`,
      );
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

testLogin();
