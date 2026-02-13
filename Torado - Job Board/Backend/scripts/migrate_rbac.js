const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

// Load env vars
dotenv.config({ path: path.join(__dirname, "../.env") });

const User = require("../models/User");
const Role = require("../models/Role");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1);
  }
};

const permissions = {
  admin: [
    "user:read",
    "user:create",
    "user:update",
    "user:delete",
    "role:read",
    "role:create",
    "role:update",
    "role:delete",
    "job:read",
    "job:create",
    "job:update",
    "job:delete",
    "job:approve",
    "dashboard:view_stats",
    "logs:view",
  ],
  employer: [
    "job:create",
    "job:update",
    "job:delete",
    "job:read",
    "application:read",
    "candidate:read",
  ],
  candidate: ["application:create", "application:read", "job:read"],
};

const migrate = async () => {
  await connectDB();

  try {
    // 1. Create Roles
    console.log("--- Creating Roles ---");

    const adminRole = await Role.findOneAndUpdate(
      { name: "admin" },
      {
        name: "admin",
        description: "Administrator with full access",
        permissions: permissions.admin,
        isSystem: true,
        rank: 100,
      },
      { upsert: true, new: true },
    );
    console.log("Admin Role Synced");

    const employerRole = await Role.findOneAndUpdate(
      { name: "employer" },
      {
        name: "employer",
        description: "Employer who can post jobs and hire",
        permissions: permissions.employer,
        isSystem: true,
        rank: 10,
      },
      { upsert: true, new: true },
    );
    console.log("Employer Role Synced");

    const candidateRole = await Role.findOneAndUpdate(
      { name: "candidate" },
      {
        name: "candidate",
        description: "Job seeker",
        permissions: permissions.candidate,
        isSystem: true,
        rank: 1,
      },
      { upsert: true, new: true },
    );
    console.log("Candidate Role Synced");

    // 2. Migrate Users
    console.log("--- Migrating Users ---");
    const users = await User.find({});

    for (const user of users) {
      if (!user.role) continue;

      let targetRole;
      if (user.role === "admin") targetRole = adminRole;
      else if (user.role === "employer") targetRole = employerRole;
      else if (user.role === "candidate") targetRole = candidateRole;

      if (targetRole) {
        // Check if role already assigned
        const alreadyHasRole =
          user.roles &&
          user.roles.some((r) => r.toString() === targetRole._id.toString());

        if (!alreadyHasRole) {
          if (!user.roles) user.roles = [];
          user.roles.push(targetRole._id);
          await user.save();
          process.stdout.write(`.`);
        }
      }
    }
    console.log("\nUser Migration Complete!");

    process.exit(0);
  } catch (error) {
    console.error("Migration Failed:", error);
    process.exit(1);
  }
};

migrate();
