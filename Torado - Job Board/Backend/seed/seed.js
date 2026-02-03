const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const Job = require("../models/Job");
const Company = require("../models/Company");
const User = require("../models/User");
const connectDB = require("../config/db");

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const importData = async () => {
  try {
    // Read JSON file
    const jobsDataPath = path.join(
      __dirname,
      "../../Frontend/src/data/jobs.json",
    );
    if (!fs.existsSync(jobsDataPath)) {
      console.error("Jobs data file not found at:", jobsDataPath);
      process.exit(1);
    }

    const jobsData = JSON.parse(fs.readFileSync(jobsDataPath, "utf-8"));
    const jobs = jobsData.jobs; // Access the "jobs" array

    // Clear existing data
    await Job.deleteMany();
    await Company.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed...");

    // Create a default Recruiter User
    const recruiterUser = await User.create({
      name: "Torado Admin",
      email: "admin@torado.com",
      password: "password123", // Will be hashed by pre-save hook
      role: "employer",
    });

    console.log(`Created Recruiter: ${recruiterUser.name}`);

    // Create Companies and Jobs
    // We need to deduplicate companies first based on name
    const companyMap = new Map();

    for (const jobItem of jobs) {
      const companyName = jobItem.company;
      let company = companyMap.get(companyName);

      if (!company) {
        // Create new company
        company = await Company.create({
          userId: recruiterUser._id,
          name: companyName,
          logo: jobItem.logo || jobItem.companyDetails?.logo,
          description:
            jobItem.companyDetails?.description ||
            `Description for ${companyName}`,
          location: jobItem.companyDetails?.location || jobItem.location,
          website:
            jobItem.companyDetails?.website ||
            `https://${companyName.replace(/\s/g, "").toLowerCase()}.com`,
          established: jobItem.companyDetails?.established
            ? new Date(jobItem.companyDetails.established)
            : undefined,
          employees: jobItem.companyDetails?.employees,
          phone: jobItem.companyDetails?.phone,
          email: jobItem.companyDetails?.email,
          socials: [], // Can populate if available
        });
        companyMap.set(companyName, company);
        console.log(`Created Company: ${companyName}`);
      }

      // Parse salary
      let minSalary = 0;
      let maxSalary = 0;

      if (jobItem.salaryRange) {
        // Expect format like "$35k - $45k" or "$110k - $160k"
        const matches = jobItem.salaryRange.match(/(\d+)k/g);
        if (matches && matches.length >= 2) {
          minSalary = parseInt(matches[0].replace("k", "")) * 1000;
          maxSalary = parseInt(matches[1].replace("k", "")) * 1000;
        }
      } else if (jobItem.salary) {
        minSalary = jobItem.salary; // fallback
        maxSalary = jobItem.salary;
      }

      // Create Job
      await Job.create({
        recruiterId: recruiterUser._id,
        companyId: company._id,
        title: jobItem.title,
        description: jobItem.description || `Description for ${jobItem.title}`,
        category: jobItem.category || "Uncategorized",
        type: jobItem.type || "Full Time",
        location: jobItem.location || "Remote",
        salaryRange: {
          min: minSalary,
          max: maxSalary,
        },
        salaryType: jobItem.salaryPeriod === "Month" ? "Monthly" : "Yearly", // normalize
        tags: jobItem.tags,
        // Optional fields from schema mapping
        experience: jobItem.experience,
        careerLevel: jobItem.jobOverview?.careerLevel || jobItem.careerLevel,
        qualification:
          jobItem.jobOverview?.qualification || jobItem.qualification,
        industry: jobItem.jobOverview?.industry || jobItem.category,
        deadline: jobItem.jobOverview?.expirationDate
          ? new Date(jobItem.jobOverview.expirationDate)
          : undefined,
        requirements: jobItem.fundamentalSkills, // Mapping fundamentalSkills to requirements
        responsibilities: jobItem.talentExperience, // Mapping talentExperience to responsibilities (approx)
        status: "Active",
        createdAt: jobItem.jobOverview?.datePosted
          ? new Date(jobItem.jobOverview.datePosted)
          : undefined,
      });
    }

    console.log(`Imported ${jobs.length} Jobs`);
    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
