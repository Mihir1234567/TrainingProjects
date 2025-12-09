import mongoose from "mongoose";
import Blog from "../models/blogModel.js";
import { blogData } from "./blogData.js"; // You will create this file
import "dotenv/config";

const seedBlogs = async () => {
  try {
    console.log("⏳ Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URL);

    console.log("🗑️ Removing old blog data...");
    await Blog.deleteMany({});

    console.log("📝 Preparing new blog data...");

    // Auto-ID counter
    let nextId = 1;

    const formattedBlogs = blogData.map((blog) => {
      const finalId = blog.id ?? nextId++; // use blog.id if exists, otherwise auto-increment

      return {
        id: finalId,
        title: blog.title,
        author: blog.author,
        excerpt: blog.excerpt,
        category: blog.category,
        image: blog.image,
        content: blog.content,
        comments: blog.comments || [],
        dateString: blog.date,
        createdAt: new Date(blog.date),
        updatedAt: new Date(blog.date),
        slug: blog.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
      };
    });

    console.log("⬆️ Inserting blogs into database...");
    await Blog.insertMany(formattedBlogs);

    console.log("✅ Blog seeding completed successfully!");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding blogs:", error);
    process.exit(1);
  }
};

seedBlogs();
