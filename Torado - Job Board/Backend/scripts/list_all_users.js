const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");

dotenv.config({ path: path.join(__dirname, "../.env") });

const listAllUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({}).select("name email role");

    console.log(`Total Users: ${users.length}`);
    users.forEach((u) => {
      console.log(`[${u.role}] ${u.name} <${u.email}>`);
    });

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

listAllUsers();
