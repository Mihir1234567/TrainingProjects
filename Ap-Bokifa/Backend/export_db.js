import "dotenv/config";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Import Models
import User from "./src/models/userModel.js";
import Product from "./src/models/productModel.js";
import Blog from "./src/models/blogModel.js";
import Order from "./src/models/orderModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Error: MONGO_URL not found in .env file");
  process.exit(1);
}

const dumpDir = path.join(__dirname, "db_dump");
if (!fs.existsSync(dumpDir)) {
  fs.mkdirSync(dumpDir);
}

const exportCollection = async (model, name) => {
  try {
    const data = await model.find({});
    const filePath = path.join(dumpDir, `${name}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ Exported ${data.length} ${name} to ${filePath}`);
  } catch (error) {
    console.error(`❌ Failed to export ${name}:`, error.message);
  }
};

const runExport = async () => {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUrl);
    console.log("Connected. Exporting data...");

    await exportCollection(User, "users");
    await exportCollection(Product, "products");
    await exportCollection(Blog, "blogs");
    await exportCollection(Order, "orders");

    console.log("\n🎉 All exports completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Fatal Error:", error);
    process.exit(1);
  }
};

runExport();
