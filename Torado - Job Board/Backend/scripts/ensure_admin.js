const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");
const Role = require("../models/Role");

dotenv.config({ path: path.join(__dirname, "../.env") });

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const adminRole = await Role.findOne({ name: "admin" });
    if (!adminRole) {
      console.log("Error: Admin Role not found. Run migration first.");
      process.exit(1);
    }

    const email = "admin@torado.com";
    let user = await User.findOne({ email });

    if (user) {
      console.log(`User ${email} exists. Upgrading to Admin...`);
      user.role = "admin";
      user.roles = [adminRole._id];
      // We set the password directly. The User model's pre-save hook should hash it.
      user.password = "password123";

      await user.save();
      console.log("User updated successfully.");
    } else {
      console.log(`Creating new user ${email}...`);
      user = await User.create({
        name: "Super Admin",
        email: email,
        password: "password123",
        role: "admin",
        roles: [adminRole._id],
        isProfileComplete: true,
      });
      console.log("User created successfully.");
    }

    console.log("--- ADMIN CREDENTIALS ---");
    console.log(`ID: ${user._id}`);
    console.log(`Email: ${user.email}`);
    console.log(`Password: password123`);
    console.log("-------------------------");

    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

run();
