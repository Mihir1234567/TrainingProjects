const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const User = require("../models/User");
const Company = require("../models/Company");

dotenv.config({ path: path.join(__dirname, "../.env") });

const checkCompany = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const user = await User.findOne({ email: "boss1@gmail.com" });

    if (!user) {
      console.log("User boss1@gmail.com not found");
      process.exit();
    }

    console.log(`User Found: ${user.name} (${user._id})`);

    const company = await Company.findOne({ userId: user._id });
    if (company) {
      console.log(`Company Found: ${company.name}`);
      console.log(`Company ID: ${company._id}`);
      console.log(`Linked via userId: ${company.userId}`);
    } else {
      console.log("No Company found linked to this user.");
    }

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

checkCompany();
