const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Blog = require("./models/Blog");
const FAQ = require("./models/FAQ");
const path = require("path");
const fs = require("fs");

dotenv.config();
connectDB();

// Read JSON files
const blogsPath = path.join(__dirname, "../Frontend/src/data/blogs.json");
const faqsPath = path.join(__dirname, "../Frontend/src/data/faqs.json");

const blogsDataRaw = JSON.parse(fs.readFileSync(blogsPath, "utf-8"));
const faqsDataRaw = JSON.parse(fs.readFileSync(faqsPath, "utf-8"));

const seedData = async () => {
  try {
    // SEED BLOGS
    await Blog.deleteMany();
    // Map Frontend blog structure to Backend model if necessary
    // Frontend: image, date, title, description, category, author, tags, content (obj), comments (arr)
    // Backend: title, image, category, author, date, description, content (string), tags

    // We need to convert content object to string or keep schema flexible.
    // For now, let's just JSON.stringify the content object or pick a summary.
    // Actually, looking at the JSON, content is an object { intro, quote, listItems, conclusion ... }
    // We should probably change the Blog model to Mixed or just stringify it.
    // For simplicity efficiently, we will store commentsCount and map fields.

    const blogsToInsert = blogsDataRaw.map((b) => ({
      title: b.title,
      image: b.image,
      category: b.category,
      author: b.author,
      date: b.date,
      description: b.description,
      content: JSON.stringify(b.content), // Storing complex content as string for now
      tags: b.tags,
      commentsCount: b.comments ? b.comments.length : 0,
    }));

    await Blog.insertMany(blogsToInsert);
    console.log(`Seeded ${blogsToInsert.length} Blogs`);

    // SEED FAQS
    await FAQ.deleteMany();
    let faqsToInsert = [];

    // Frontend FAQs are grouped: [ { category: "General", faqs: [...] }, ... ]
    faqsDataRaw.forEach((group) => {
      group.faqs.forEach((f) => {
        faqsToInsert.push({
          question: f.question,
          answer: f.answer,
          category: group.category,
        });
      });
    });

    await FAQ.insertMany(faqsToInsert);
    console.log(`Seeded ${faqsToInsert.length} FAQs`);

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
