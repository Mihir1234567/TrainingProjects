const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");

dotenv.config({ path: path.join(__dirname, "../.env") });

const resetBossPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Case insensitive email search just in case
    const email = "Boss1@gmail.com";
    const newPassword = "123456789";

    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!user) {
      console.log(`User with email ${email} not found!`);
      // List similar emails to help debug
      const similar = await User.find({
        email: { $regex: "Boss", $options: "i" },
      });
      if (similar.length > 0) {
        console.log("Did you mean one of these?");
        similar.forEach((u) => console.log(`- ${u.email}`));
      }
      process.exit(1);
    }

    console.log(`Found user: ${user.name} (${user.email})`);

    user.password = newPassword;
    await user.save();

    console.log(`Password reset successfully for ${user.email}`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

resetBossPassword();
