import { Router } from "express";
import blogController from "../../controllers/blogController.js";
import { protect, isAdmin } from "../../middlewares/authMiddleware.js";

const router = Router();

// Public
router.get("/", blogController.getAllBlogs);
router.get("/search", blogController.searchBlogs);
router.get("/slug/:slug", blogController.getBlogBySlug);
router.get("/:id", blogController.getBlogById);
// Protected (Comment requires login)
router.post("/:id/comments", protect, blogController.addComment);

// Admin
router.post("/", protect, isAdmin, blogController.createBlog);
router.put("/:id", protect, isAdmin, blogController.updatedBlog);
router.delete("/:id", protect, isAdmin, blogController.deletedBlog);

export default router;
