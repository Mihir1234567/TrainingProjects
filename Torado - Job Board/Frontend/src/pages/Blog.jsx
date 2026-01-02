import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import blogsData from "../data/blogs.json";

const Blog = () => {
  const [visibleBlogs, setVisibleBlogs] = useState(6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLoadMore = () => {
    setVisibleBlogs((prev) => prev + 3);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* 1. Header Section */}
      <section className="bg-[#f0f5fa] py-20 md:py-24 text-center border-b border-slate-100">
        <h1 className="text-3xl md:text-[40px] font-bold text-[#002333] mb-3 tracking-tight">
          Our Blog
        </h1>
        <div className="flex items-center justify-center gap-2 text-[15px] font-medium">
          <Link
            to="/"
            className="text-slate-500 hover:text-[#5BBB7B] transition-colors"
          >
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-[#5BBB7B]">Blog</span>
        </div>
      </section>

      {/* 2. Blog Grid Section */}
      <section className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogsData.slice(0, visibleBlogs).map((blog) => (
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
                <div className="text-xs font-medium text-slate-500">
                  {blog.date}
                </div>
                <h3 className="text-xl font-bold text-[#002333] group-hover:text-[#5BBB7B] transition-colors">
                  <Link to={`/blog/${blog.id}`}>{blog.title}</Link>
                </h3>
                <p className="text-slate-500 text-[15px] leading-relaxed">
                  {blog.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleBlogs < blogsData.length && (
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

export default Blog;
