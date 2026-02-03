const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcryptjs");

dotenv.config();
connectDB();

const candidatesPath = path.join(
  __dirname,
  "../Frontend/src/data/Candidates.json",
);
const freelancersPath = path.join(
  __dirname,
  "../Frontend/src/data/freelancers.json",
);

const candidatesRaw = JSON.parse(fs.readFileSync(candidatesPath, "utf-8"));
const freelancersRaw = JSON.parse(fs.readFileSync(freelancersPath, "utf-8"));

const seedUsers = async () => {
  try {
    // We won't delete ALL users because Admin/Employer might exist.
    // We will delete users with role 'candidate' to refresh mock data?
    // Or maybe just check if they exist by email.
    // For this dev task, let's clear candidates to avoid duplicates each run.
    console.log("Clearing existing candidates...");
    await User.deleteMany({ role: "candidate" });

    // Helper to cleanup rate string "$90 / hour" -> "$90" (Model expects string, let's keep it simple)
    // Actually our model has rate as String.

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("123456", salt);

    let usersToInsert = [];

    // Process Candidates
    candidatesRaw.forEach((c) => {
      // Create a fake email based on name if not present
      // Sanitize name: remove non-alphanumeric except spaces, replace spaces with dots
      const cleanName = c.name
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, ".");
      const emailSlug = cleanName + ".candidate@example.com";

      usersToInsert.push({
        name: c.name,
        email: c.email || emailSlug,
        password: hashedPassword,
        role: "candidate",
        image: c.image,
        location: c.location,
        specialization: c.specialization,
        skills: c.tags || [],
        rate: c.rate,
        rating: c.rating,
        reviews: c.reviews,
        jobTitle: c.specialization, // Mapping specialization to jobTitle
        bio: `Experienced ${c.specialization} professional.`,
      });
    });

    // Process Freelancers
    freelancersRaw.forEach((f) => {
      // Check if user already added (by name/email) to avoid dupes if lists overlap?
      // Assuming unique names for simplicity in this mock data set
      const cleanName = f.name
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, ".");
      const emailSlug = cleanName + ".freelancer@example.com";

      // Check if we already have this email in usersToInsert
      const exists = usersToInsert.find((u) => u.email === emailSlug);
      if (!exists) {
        usersToInsert.push({
          name: f.name,
          email: emailSlug,
          password: hashedPassword,
          role: "candidate", // Freelancers are candidates with rates
          image: f.image,
          location: f.location,
          specialization: f.specialization,
          skills: f.tags || [],
          rate: f.rate,
          rating: f.rating,
          reviews: f.reviews,
          jobTitle: f.specialization,
          bio: `Freelance ${f.specialization} expert available for hire.`,
        });
      }
    });

    await User.insertMany(usersToInsert);
    console.log(`Seeded ${usersToInsert.length} Candidates/Freelancers`);

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedUsers();
