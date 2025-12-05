import "dotenv/config";
import mongoose from "mongoose";
import Product from "../models/productModel.js";
import ALL_PRODUCTS from "../../../Frontend/src/components/productsData.js";

function cleanProduct(p) {
  return {
    ...p,

    // Fix discount empty strings
    discount: p.discount === "" ? null : p.discount,

    // Fix invalid dates
    dateAdded: isNaN(new Date(p.dateAdded))
      ? new Date()
      : new Date(p.dateAdded),

    // Fix image paths (optional, your choice)
    imageUrl: p.imageUrl.replace("/src/assets", "/assets"),
  };
}

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB");

    // Clear old data
    await Product.deleteMany();
    console.log("Old products removed");

    // Clean each product + insert
    const cleanedProducts = ALL_PRODUCTS.map(cleanProduct);
    await Product.insertMany(cleanedProducts);

    console.log("Products seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seedProducts();
