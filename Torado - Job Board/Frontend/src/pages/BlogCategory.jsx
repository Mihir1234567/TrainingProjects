import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import blogsData from "../data/blogs.json";

const BlogCategory = () => {
  const { categoryId } = useParams();
  const [visibleBlogs, setVisibleBlogs] = useState(6);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const blogs = blogsData.filter((blog) => blog.categoryId === categoryId);
    setFilteredBlogs(blogs);
    if (blogs.length > 0) {
      setCategoryName(blogs[0].category);
    }
  }, [categoryId]);

  const handleLoadMore = () => {
    setVisibleBlogs((prev) => prev + 3);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* 1. Header Section */}
      <section className="bg-[#f0f5fa] py-20 md:py-24 text-center border-b border-slate-100">
        <h1 className="text-3xl md:text-[40px] font-bold text-[#002333] mb-3 tracking-tight">
          Category: {categoryName || categoryId}
        </h1>
        <div className="flex items-center justify-center gap-2 text-[15px] font-medium">
          <Link
            to="/"
            className="text-slate-500 hover:text-[#5BBB7B] transition-colors"
          >
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <Link
            to="/blog"
            className="text-slate-500 hover:text-[#5BBB7B] transition-colors"
          >
            Blog
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-[#5BBB7B]">{categoryName || categoryId}</span>
        </div>
      </section>

      {/* 2. Blog Grid Section */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredBlogs.slice(0, visibleBlogs).map((blog) => (
              <div
                key={blog.id}
                className="group bg-white rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-[240px] overflow-hidden rounded-lg mb-6">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span className="text-[#5BBB7B]">{blog.author}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#002333] group-hover:text-[#5BBB7B] transition-colors">
                    <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                  </h3>
                  <p className="text-slate-500 text-[15px] leading-relaxed">
                    {blog.description}
                  </p>

                  {/* Tags Display */}
                  <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
                    {blog.tags.slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-full uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-xl font-medium text-slate-600">
              No blogs found for this category.
            </h3>
            <Link
              to="/blog"
              className="mt-4 inline-block text-[#5BBB7B] font-medium hover:underline"
            >
              Back to all blogs
            </Link>
          </div>
        )}

        {/* Load More Button */}
        {visibleBlogs < filteredBlogs.length && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="relative overflow-hidden group bg-[#5BBB7B] text-white px-9 py-3.5 rounded font-semibold transition-all duration-300 shadow-md hover:shadow-lg inline-block"
            >
              <span className="absolute inset-0 w-full h-full bg-[#002333] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
              <span className="relative z-10">Load More</span>
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default BlogCategory;
