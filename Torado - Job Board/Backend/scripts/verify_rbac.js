const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");
const Role = require("../models/Role");

dotenv.config({ path: path.join(__dirname, "../.env") });

const verify = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    // 1. Check Roles
    const roles = await Role.find();
    console.log(
      `Found ${roles.length} roles:`,
      roles.map((r) => r.name).join(", "),
    );

    // 2. Check Admin User
    const adminUser = await User.findOne({ role: "admin" }).populate("roles");
    if (adminUser) {
      console.log(`Admin User: ${adminUser.name}`);
      console.log(
        `Admin Roles: ${adminUser.roles.map((r) => r.name).join(", ")}`,
      );

      const hasAdminRole = adminUser.roles.some((r) => r.name === "admin");
      console.log(`Has Admin Role Ref: ${hasAdminRole}`);
    } else {
      console.log("No admin user found to verify.");
    }

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

verify();
