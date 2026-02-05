require("dotenv").config();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const Company = require("../models/Company"); // Adjust path if needed
const path = require("path");
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected for Migration");
  } catch (err) {
    console.error("DB Connection Failed:", err);
    process.exit(1);
  }
};

const migrateLogos = async () => {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error("❌ Missing Cloudinary Credentials in .env");
    process.exit(1);
  }

  await connectDB();

  try {
    const companies = await Company.find({});
    console.log(`Found ${companies.length} companies to check.`);

    let updatedCount = 0;

    for (const company of companies) {
      // Check if logo is local path (not starting with http or data:)
      if (
        company.logo &&
        !company.logo.startsWith("http") &&
        !company.logo.startsWith("data:")
      ) {
        console.log(`Processing company: ${company.name} (${company._id})`);

        // Clean path: /src/assets/Jobs/companyLogo/logo.png -> src/assets/Jobs/companyLogo/logo.png
        const safePath = company.logo.startsWith("/")
          ? company.logo.slice(1)
          : company.logo;

        // Path where frontend assets typically live relative to backend...
        // Assuming Backend/ and Frontend/ are siblings
        const absolutePath = path.resolve(
          __dirname,
          "../../Frontend",
          safePath,
        );

        console.log(`  Looking for file at: ${absolutePath}`);

        if (fs.existsSync(absolutePath)) {
          try {
            console.log("  Uploading to Cloudinary...");
            const result = await cloudinary.uploader.upload(absolutePath, {
              folder: "torado-jobs/companies",
              public_id: `company_${company._id}`,
              overwrite: true,
            });

            console.log(`  ✅ Uploaded! New URL: ${result.secure_url}`);

            // Update Database
            company.logo = result.secure_url;
            await company.save();
            updatedCount++;
          } catch (uploadErr) {
            console.error(
              `  ❌ Upload failed for ${company.name}:`,
              uploadErr.message,
            );
          }
        } else {
          console.warn(`  ⚠️ File not found locally: ${absolutePath}`);
        }
      }
    }

    console.log("-----------------------------------");
    console.log(`Migration Complete. Updated ${updatedCount} companies.`);
    process.exit(0);
  } catch (err) {
    console.error("Migration Failed:", err);
    process.exit(1);
  }
};

migrateLogos();
