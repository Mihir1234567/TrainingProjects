const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env") });

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

const migratePermissions = async () => {
  await connectDB();

  try {
    console.log("--- Migrating Permissions to Namespace Format ---");
    const roles = await Role.find({});

    for (const role of roles) {
      let modified = false;
      const newPermissions = role.permissions.map((perm) => {
        if (perm.includes(".")) {
          modified = true;
          return perm.replace(/\./g, ":");
        }
        return perm;
      });

      if (modified) {
        role.permissions = newPermissions;
        // Increment version to force JWT refresh
        role.version = (role.version || 0) + 1;
        await role.save();
        console.log(`Updated Role: ${role.name}`);
      }
    }

    console.log("Permission Migration Complete!");
    process.exit(0);
  } catch (error) {
    console.error("Migration Failed:", error);
    process.exit(1);
  }
};

migratePermissions();
