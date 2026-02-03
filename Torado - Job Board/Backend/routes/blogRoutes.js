const express = require("express");
const router = express.Router();
const {
  getBlogs,
  getBlogById,
  createBlog,
} = require("../controllers/blogController");
// We can add auth middleware later for createBlog
// const { protect, admin } = require('../middleware/authMiddleware');

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", createBlog); // Add protect/admin middleware if authentication is ready

module.exports = router;
