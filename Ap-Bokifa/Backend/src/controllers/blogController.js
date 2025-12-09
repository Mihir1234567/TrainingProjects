import Blog from "../models/blogModel.js";

// getAllBlogs

const getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const blogs = await Blog.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalBlogs = await Blog.countDocuments();
    const totalPages = Math.ceil(totalBlogs / limit);

    res.status(200).json({
      success: true,
      message: "All blogs fetched successfully",
      data: blogs,
      pagination: {
        totalBlogs,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch blogs",
      error: error.message,
    });
  }
};

// searchBlogs
const searchBlogs = async (req, res) => {
  try {
    const q = req.query.q || "";

    const blogs = await Blog.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { excerpt: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });
;

    res.status(200).json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch blogs",
      error: error.message,
    });
  }
};

// getBlogBySlug
const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug }).sort({ createdAt: -1 })
;
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch blog",
      error: error.message,
    });
  }
};

// getBlogById
const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findOne({ id: Number(req.params.id) });
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog fetched successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to fetch blog",
      error: error.message,
    });
  }
};

//   addComment,
const addComment = async (req, res) => {
  try {
    const { name, email, comment } = req.body;
    if (!name || !email || !comment) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const blogId = req.params.id;

    const newComment = { name, email, comment };

    const blog = await Blog.findOne({ id: Number(blogId) });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    blog.comments.push(newComment);
    await blog.save();

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: blog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to add comment",
      error: error.message,
    });
  }
};

//CreateBlog
const createBlog = async (req, res) => {
  try {
    const { title, author, excerpt, category, image, content, dateString } =
      req.body;

    if (!title || !author || !excerpt || !category || !image || !content) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const lastBlog = await Blog.findOne().sort({ id: -1 });
    const nextId = lastBlog ? lastBlog.id + 1 : 1;

    const newBlog = await Blog.create({
      id: nextId,
      title,
      author,
      excerpt,
      category,
      image,
      content,
      dateString: dateString || new Date().toISOString(),
    });

    res.status(201).json({
      success: true,
      message: "Blog created successfully",
      data: newBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to create blog",
      error: error.message,
    });
  }
};

const updatedBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const updateBlog = await Blog.findOneAndUpdate(
      { id: Number(blogId) },
      req.body,
      { new: true }
    );
    if (!updateBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog updated successfully",
      data: updateBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to update blog",
      error: error.message,
    });
  }
};

// deleteBlog
const deletedBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const deleteBlog = await Blog.findOneAndDelete({ id: Number(blogId) });
    if (!deleteBlog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
      data: deleteBlog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unable to delete blog",
      error: error.message,
    });
  }
};

export default {
  getAllBlogs,
  searchBlogs,
  getBlogBySlug,
  getBlogById,
  addComment,
  createBlog,
  updatedBlog,
  deletedBlog,
};
