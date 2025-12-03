import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { blogData } from "../components/BlogData"; // Adjust path if needed

/**
 * BlogListItem Component
 * Renders a single blog post in a large, stacked format.
 */
const BlogListItem = ({ post }) => {
  const navigate = useNavigate();
  return (
    <div className="group  border-b border-gray-100 pb-5 last:border-0">
      {/* Image */}
      <div className="relative overflow-hidden rounded-lg mb-3">
        <img
          src={post.image}
          alt={post.title}
          className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/800x500/ccc/999?text=Image+Not+Found";
          }}
        />
        <div className="absolute inset-0  opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <button
          onClick={() => navigate(`/blog/post/${post.id}`)}
          className="absolute bottom-4 right-4 translate-y-2 transform rounded-full bg-white p-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <img
            src="/src/assets/right-arrow-svgrepo-com.png"
            className="w-6 h-6"
            alt=""
          />
        </button>
      </div>

      {/* Content */}
      <div>
        <Link to={`/blog/post/${post.id}`} className="group block">
          <h2 className="text-3xl font-serif text-gray-900 hover:text-green-700 transition-colors duration-200  mb-3">
            {post.title}
          </h2>
        </Link>

        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
          {post.date}
        </p>

        <p className="text-gray-600 leading-relaxed mb-4">{post.excerpt}</p>
      </div>
    </div>
  );
};

/**
 * Sidebar Component
 * Renders the Search, About, Categories, Recent Posts, etc.
 */
const Sidebar = ({ onSearchClick }) => {
  // Dummy data for the sidebar elements to match image
  const categories = [
    "Tips & Tricks",
    "Planning",
    "Construction",
    "Repair",
    "Technology",
  ];
  const recentPosts = blogData.slice(0, 3); // Take first 3 posts as "Recent"
  const tags = ["Tips & Tricks", "Books", "Events", "Authors"];

  return (
    <aside className="space-y-10">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full border border-gray-200 pl-4 pr-5 py-3 text-sm text-gray-900 focus:outline-none focus:border-green-600 transition-colors"
          onFocus={onSearchClick}
          readOnly
        />
        <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>

      {/* About Company */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-200 pb-3 mb-5">
          About Company
        </h3>
        <div className="mb-4">
          <img
            src="/src/assets/BlogSidebarImg1.png"
            alt="About"
            className="rounded  object-cover h-80 w-80"
          />
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          To be the industry leader, globally recognized for effective &
          efficient solutions. To provide innovative solutions delivering
          quality, excellence and speed.
        </p>
      </div>

      {/* Blog Categories */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-200 pb-3 mb-5">
          Blog Categories
        </h3>
        <ul className="space-y-3">
          {categories.map((cat, idx) => (
            <li key={idx}>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-green-700 transition-colors"
              >
                {cat}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-200 pb-3 mb-5">
          Recent Posts
        </h3>
        <div className="space-y-5">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex gap-4">
              <img
                src={post.image}
                alt={post.title}
                className="w-20 h-20 object-cover flex-shrink-0 rounded"
              />
              <div>
                <Link
                  to={`/blog/post/${post.id}`}
                  className="text-sm font-semibold text-gray-800 hover:text-green-700 leading-snug block mb-1"
                >
                  {post.title}
                </Link>
                <span className="text-xs text-gray-400 uppercase">
                  {post.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Tags */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-900 border-b border-gray-200 pb-3 mb-5">
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, idx) => (
            <a
              key={idx}
              href="#"
              className="px-3 py-1 border border-gray-200 text-xs text-gray-600 hover:bg-green-700 hover:text-white hover:border-green-700 transition-all"
            >
              {tag}
            </a>
          ))}
        </div>
      </div>

      {/* Ad Banner Image */}
      <div>
        <img
          src="/src/assets/BlogSidebarImg2.png"
          alt="Ad"
          className=" rounded-lg shadow-md h-80 w-80"
        />
      </div>
    </aside>
  );
};

/**
 * BlogPageList Component
 * The main layout combining the Hero, Left List, and Right Sidebar.
 */
const BlogPageList = ({ onSearchClick }) => {
  // --- Pagination Logic (Same as your Grid) ---
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const postsPerPage = 3; // Usually list views show fewer per page than grids

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogData.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogData.length / postsPerPage);

  const handlePaginate = (pageNumber) => {
    if (pageNumber === currentPage) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setIsTransitioning(false);
      window.scrollTo({ top: 400, behavior: "smooth" }); // Scroll to top of list
    }, 300);
  };

  const handleNextPage = () => {
    if (currentPage === totalPages) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      setIsTransitioning(false);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }, 300);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
      setIsTransitioning(false);
      window.scrollTo({ top: 400, behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="bg-white font-inter">
      {/* --- Hero Section --- */}
      <div className="relative h-103">
        <img
          src="/src/assets/BlogBanner.jpg"
          alt="News banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/20">
          <h1 className="text-6xl font-bold text-white">News 2</h1>
          <nav className="mt-2 text-sm text-gray-300" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-1 text-gray-400">/</span>
                  <span className="font-medium text-white">News 2</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* --- Main Layout: Grid with Sidebar --- */}
      <div className="mx-auto max-w-8xl px-12 sm:px-16 lg:px-20 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-32">
          {/* Left Column: Blog Feed */}
          <div
            className={`lg:col-span-2 transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Section Title */}
            <div className="mb-10 text-left">
              <h2 className="text-3xl font-serif text-gray-900">News 2</h2>
            </div>

            {/* Blog List Loop */}
            <div>
              {currentPosts.map((post) => (
                <BlogListItem key={post.id} post={post} />
              ))}
            </div>

            {/* Pagination (Reused styles) */}
            <nav
              className="mt-8 flex items-center border-t border-gray-200 pt-8"
              aria-label="Pagination"
            >
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1 || isTransitioning}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  &larr;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePaginate(page)}
                      disabled={isTransitioning}
                      className={`flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "border-indigo-600 bg-green-600 text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || isTransitioning}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  &rarr;
                </button>
              </div>
            </nav>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar onSearchClick={onSearchClick} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPageList;
