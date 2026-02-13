const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");

dotenv.config({ path: path.join(__dirname, "../.env") });

const createBossAccount = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "Boss1@gmail.com"; // Case sensitive creation? Email usually lowercased in stored logic but let's stick to user input or clean it.
    // Usually best to lowercase emails.
    const cleanEmail = email.toLowerCase();
    const password = "123456789";

    const exists = await User.findOne({ email: cleanEmail });
    if (exists) {
      console.log("User already exists!");
      // If it exists now (race condition?), reset pass
      exists.password = password;
      await exists.save();
      console.log("Reset password.");
    } else {
      await User.create({
        name: "Boss One",
        email: cleanEmail,
        password: password,
        role: "employer",
        companyName: "Boss Corp",
        isProfileComplete: true,
      });
      console.log(`Created new employer: ${cleanEmail}`);
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createBossAccount();
