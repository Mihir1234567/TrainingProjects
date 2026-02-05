require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const path = require("path");
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ASSETS_DIR = path.resolve(__dirname, "../../Frontend/src/assets");
const MAPPING_FILE = path.resolve(__dirname, "assets-mapping.json");

// Helper to recursively get files
const getFiles = (dir) => {
  const subdirs = fs.readdirSync(dir);
  const files = subdirs.map((subdir) => {
    const res = path.resolve(dir, subdir);
    return fs.statSync(res).isDirectory() ? getFiles(res) : res;
  });
  return files.reduce((a, f) => a.concat(f), []);
};

const uploadAssets = async () => {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    console.error("❌ Missing Cloudinary Credentials in .env");
    process.exit(1);
  }

  console.log(`Scanning assets in: ${ASSETS_DIR}`);
  if (!fs.existsSync(ASSETS_DIR)) {
    console.error("❌ Assets directory not found!");
    process.exit(1);
  }

  const allFiles = getFiles(ASSETS_DIR);
  const imageFiles = allFiles.filter((file) =>
    /\.(jpg|jpeg|png|gif|svg|webp)$/i.test(file),
  );

  console.log(`Found ${imageFiles.length} images to upload.`);

  let mapping = {};
  if (fs.existsSync(MAPPING_FILE)) {
    try {
      mapping = JSON.parse(fs.readFileSync(MAPPING_FILE, "utf8"));
    } catch (e) {
      console.warn("Could not parse existing mapping file, starting fresh.");
    }
  }

  for (const filePath of imageFiles) {
    // strict relative path from Frontend root for mapping
    // e.g. "src/assets/Logo/logo.png"
    const relativePath = path
      .relative(path.resolve(__dirname, "../../Frontend"), filePath)
      .replace(/\\/g, "/"); // normalize to forward slashes

    if (mapping[relativePath]) {
      console.log(`Skipping (already uploaded): ${relativePath}`);
      continue;
    }

    try {
      console.log(`Uploading: ${relativePath}...`);

      // Create a folder structure in Cloudinary matching the local assets
      let folderPath = path.dirname(path.relative(ASSETS_DIR, filePath));
      if (folderPath === ".") folderPath = ""; // Fix for root files

      const cloudinaryFolder = folderPath
        ? `torado-jobs/assets/${folderPath}`.replace(/\\/g, "/")
        : `torado-jobs/assets`;

      const result = await cloudinary.uploader.upload(filePath, {
        folder: cloudinaryFolder,
        use_filename: true,
        unique_filename: false,
        overwrite: true,
      });

      console.log(`  ✅ URL: ${result.secure_url}`);
      mapping[relativePath] = result.secure_url;
      // Save progress immediately
      fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));

      // Also add mapping for just the filename-based lookups if unique
      // mapping[path.basename(filePath)] = result.secure_url;
    } catch (err) {
      console.error(`  ❌ Failed for ${relativePath}: ${err.message}`);
    }
  }

  // Save Mapping
  fs.writeFileSync(MAPPING_FILE, JSON.stringify(mapping, null, 2));
  console.log(`\nMapping saved to ${MAPPING_FILE}`);
  console.log("Migration Complete.");
};

uploadAssets();
