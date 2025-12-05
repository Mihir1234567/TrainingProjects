import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    comment: String,
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

const contentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["image", "paragraph", "quote", "heading", "image_grid"],
    },
    // For 'image' type
    src: { type: String },
    alt: { type: String },
    // For 'paragraph', 'quote', 'heading' types
    text: { type: String },
    // For 'heading' type
    level: { type: Number },
    // For 'image_grid' type
    images: [
      {
        src: { type: String },
        alt: { type: String },
      },
    ],
  },
  { _id: false }
);

const blogSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    dateString: { type: String },
    author: { type: String, required: true },
    category: { type: String, required: true },
    excerpt: { type: String, required: true },
    comments: [commentSchema],
    content: [contentSchema],
    slug: { type: String, unique: true },
  },
  { timestamps: true }
);

blogSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  next();
});

blogSchema.index({
  title: "text",
  category: "text",
  excerpt: "text",
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
