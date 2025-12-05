import "dotenv/config";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import Product from "../models/productModel.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cloudinary upload function
async function uploadToCloudinary(localPath) {
  try {
    const result = await cloudinary.uploader.upload(localPath, {
      folder: "ap-bokifa/products", // your chosen folder
    });
    return result.secure_url;
  } catch (error) {
    console.error("❌ Cloudinary upload failed:", error.message);
    return null;
  }
}

async function updateProductImages() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to MongoDB");

    const products = await Product.find();
    console.log(`📦 Found ${products.length} products`);

    for (const p of products) {
      // Example p.imageUrl: "/src/assets/TheMightyRed.webp"
      const filename = p.imageUrl.split("/").pop();

      // Build absolute path to Frontend assets
      const localPath = path.resolve(
        __dirname,
        "../../../Frontend/src/assets",
        filename
      );

      // Check file existence
      if (!fs.existsSync(localPath)) {
        console.warn(`⚠️ Image not found for: ${p.title} (${localPath})`);
        continue;
      }

      console.log(`⬆️ Uploading: ${filename}...`);

      // Upload to Cloudinary
      const cloudUrl = await uploadToCloudinary(localPath);

      if (cloudUrl) {
        p.imageUrl = cloudUrl;
        await p.save();
        console.log(`✅ Updated image for: ${p.title}`);
      } else {
        console.warn(`⚠️ Failed to update: ${p.title}`);
      }
    }

    console.log("\n🎉 All images processed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

updateProductImages();
