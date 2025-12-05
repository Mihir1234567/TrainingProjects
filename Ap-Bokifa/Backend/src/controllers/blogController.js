import Blog from "../models/blogModel.js";

// getAllBlogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      success: true,
      message: "All blogs fetched successfully",
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

// searchBlogs
const searchBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({
      title: { $regex: req.query.q, $options: "i" },
    });
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
    const blog = await Blog.findOne({ slug: req.params.slug });
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
    const blogId = req.params.id;

    const newComment = { name, email, comment };

    const blog = await Blog.findById(blogId);

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



export default {
  getAllBlogs,
  searchBlogs,
  getBlogBySlug,
  getBlogById,
  addComment,
  //   createBlog,
  //   updateBlog,
  //   deleteBlog,
};
