import React, { useState } from "react";
import { Link } from "react-router-dom";
import { blogData } from "../components/BlogData"; // Adjust this import path if needed

/**
 * BlogCard Component
 * Renders a single blog post card.
 */
const BlogCard = ({ post }) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg ">
      {/* Blog Image */}
      <div className="relative flex-shrink-0">
        <img
          className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={post.image}
          alt={post.title}
          // Fallback image in case the provided one fails to load
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x400/ccc/999?text=Image+Not+Found";
          }}
        />
        <div className="absolute inset-0  opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        <button className="absolute bottom-4 right-4 translate-y-2 transform rounded-full bg-white p-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <img
            src="/src/assets/right-arrow-svgrepo-com.png"
            className="w-6 h-6"
            alt=""
          />
        </button>
      </div>
      {/* Blog Content */}
      <div className="flex flex-1 flex-col justify-between  p-6">
        <div className="flex-1">
          <Link to={`/blog/${post.id}`} className=" block group">
            <p className="text-[30px] font-semibold text-gray-900 transition-colors duration-200 group-hover:text-green-700">
              {post.title}
            </p>
          </Link>
          <p className="text-sm pt-7 font-medium text-gray-500">{post.date}</p>
          <p className="mt-3 text-base text-gray-500">{post.excerpt}</p>
          <div className="mt-4 flex items-center">
            <p className="text-sm text-gray-500">
              {post.comments.length}{" "}
              {post.comments.length === 1 ? "comment" : "comments"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * BlogPage Component
 * Renders the entire "News" page.
 */
const BlogPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const postsPerPage = 6;

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
    }, 300);
  };

  const handleNextPage = () => {
    if (currentPage === totalPages) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      setIsTransitioning(false);
    }, 300);
  };

  const handlePrevPage = () => {
    if (currentPage === 1) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
      setIsTransitioning(false);
    }, 300);
  };

  return (
    <div className="bg-gray-50 font-inter">
      {/* --- Hero Section --- */}
      <div className="relative h-103 ">
        {/* Background image for the hero section */}
        <img
          src="/src/assets/Blogbanner.jpg"
          alt="News banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-bold text-white">News</h1>
          {/* Breadcrumbs */}
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
                  <span className="font-medium text-white">News</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8 ">
        {/* --- Section Title --- */}
        <div className="pb-12 text-left">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            News
          </h2>
        </div>

        {/* --- Blog Post Grid --- */}
        <div
          className={`grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {currentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* --- Pagination --- */}
        {
          <nav
            className="mt-16 flex items-center justify-center border-t border-gray-200 pt-8"
            aria-label="Pagination"
          >
            <div className="flex items-center space-x-2">
              {
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1 || isTransitioning}
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white p-0 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 disabled:opacity-50"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              }
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePaginate(page)}
                    disabled={isTransitioning}
                    className={`flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium transition-colors disabled:opacity-50 ${
                      currentPage === page
                        ? "border-indigo-600 bg-green-600 text-white cursor-default"
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
                className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white p-0 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.04-1.06L11.168 10 7.25 6.29a.75.75 0 111.02-1.1l4.5 4.25a.75.75 0 010 1.1l-4.5 4.25a.75.75 0 01-1.06-.04z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </nav>
        }
      </div>
    </div>
  );
};

export default BlogPage;
