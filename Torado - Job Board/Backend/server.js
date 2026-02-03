require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Initialize App
const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Routes (Placeholders for now)
app.get("/", (req, res) => {
  res.send("Torado Job Board API is running...");
});

// Define Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/companies", require("./routes/companyRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/faqs", require("./routes/faqRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bookmarks", require("./routes/bookmarkRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

// Make uploads folder static
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
