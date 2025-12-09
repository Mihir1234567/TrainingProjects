import fs from "fs";
import path from "path";
import cloudinary from "../config/cloudinary.js";

// Path to your frontend assets folder
const ASSETS_FOLDER = path.join(process.cwd(), "../Frontend/src/assets");



// Paths to data files
const BLOG_DATA_PATH = path.join(
  process.cwd(),
  "../Frontend/src/components/BlogData.js"
);
const PRODUCT_DATA_PATH = path.join(
  process.cwd(),
  "../Frontend/src/components/productsData.js"
);

const uploadFile = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: "ap-bokifa",
      use_filename: true,
      unique_filename: false,
    });
    return result.secure_url;
  } catch (err) {
    console.log("Error uploading:", err);
  }
};

const run = async () => {
  const files = fs.readdirSync(ASSETS_FOLDER);

  console.log("Found assets:", files.length);

  const map = {};

  for (const file of files) {
    const localPath = path.join(ASSETS_FOLDER, file);

    console.log("Uploading:", file);

    const url = await uploadFile(localPath);

    const key = `/src/assets/${file}`;
    map[key] = url;
  }

  console.log("Upload complete. Replacing URLs in data files...");

  const replaceInFile = (filePath) => {
    let content = fs.readFileSync(filePath, "utf8");

    for (const localPath in map) {
      const cloudUrl = map[localPath];
      const escaped = localPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      content = content.replace(new RegExp(escaped, "g"), cloudUrl);
    }

    fs.writeFileSync(filePath, content);
    console.log(`Updated: ${filePath}`);
  };

  replaceInFile(BLOG_DATA_PATH);
  replaceInFile(PRODUCT_DATA_PATH);

  console.log(
    "🎉 ALL DONE! BlogData.js and productsData.js are now using Cloudinary URLs."
  );
};

run();
