import React, { useState, useEffect } from "react";
import { MemoryRouter, Routes, Route, useParams, Link } from "react-router-dom";
import { sidebarData, blogData } from "/src/components/blogData.js";

// --- Sidebar Component (Unchanged) ---
const Sidebar = ({ onSearchClick }) => {
  const recentPosts = blogData.slice(1, 4);
  return (
    <aside className="space-y-10">
      {/* Search */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-700 mb-4">
          Search
        </h3>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border-b border-gray-300 pl-4 pr-10 py-3 text-sm text-gray-900 focus:outline-none focus:border-b-green-600 transition-colors bg-transparent"
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
      </div>

      {/* About Company */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-700 mb-4">
          About Company
        </h3>
        <div className="mb-4">
          <img
            src="/src/assets/BlogSidebarImg1.png"
            alt="About"
            className="w-auto h-80 rounded-md"
          />
        </div>
        <p className="text-sm text-gray-500 leading-relaxed">
          {sidebarData.about.text}
        </p>
      </div>

      {/* Blog Categories */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-700 mb-4">
          Blog Categories
        </h3>
        <ul className="space-y-3">
          {sidebarData.categories.map((cat, idx) => (
            <li key={idx}>
              <a
                href="#"
                className="text-sm text-gray-600 hover:text-green-700 transition-colors"
              >
                {cat.name}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-700 mb-4">
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
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-700 mb-4">
          Popular Tags
        </h3>
        <img
          src="/src/assets/BlogSidebarImg2.png"
          alt="Ad"
          className="w-auto h-80 rounded-md"
        />
      </div>
    </aside>
  );
};

// --- Social Icons (Unchanged) ---
const IconFacebook = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"></path>
  </svg>
);
const IconTwitter = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-.422.724-.665 1.56-.665 2.452 0 1.943 1.262 3.433 2.98 4.385-.93-.03-1.78-.28-2.52-.69-.008.02-.008.04-.008.06 0 2.71 1.93 4.98 4.48 5.48-.468.128-.96.19-1.46.19-.36 0-.71-.03-1.05-.09 1.08 2.22 4.23 3.84 7.97 3.88-1.92 1.5-4.35 2.4-6.98 2.4-.45 0-.89-.02-1.33-.07 2.49 1.6 5.45 2.5 8.64 2.5 10.38 0 16.05-8.6 16.05-16.05 0-.24 0-.48-.01-.72.99-.71 1.84-1.6 2.53-2.6z"></path>
  </svg>
);
const IconPinterest = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-4 h-4"
  >
    <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.938 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.577-.998 3.998-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.415 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.108.133.127.187.093.317-.054.202-.182.747-.222.916-.027.112-.087.141-.19.093-1.056-.211-1.713-1.04-1.713-2.128 0-1.664 1.248-3.422 3.612-3.422 1.913 0 3.328 1.393 3.328 3.208 0 1.961-.913 3.307-2.181 3.307-1.05 0-1.86-1.102-1.602-2.379.25-1.221.74-2.651.74-3.518 0-.693-.36-1.334-1.06-1.334-.834 0-1.523.83-1.523 1.839 0 .787.279 1.335.279 1.335s-.748 3.155-.899 3.717c-.329 1.571-.023 3.486.884 4.354 1.254 1.206 2.427 1.479 3.482 1.479 4.411 0 7.986-3.839 7.986-9.063 0-4.912-3.727-8.917-8.814-8.917z"></path>
  </svg>
);

// --- Main Component with Logic Added ---
const BlogPostDetailWithSidebar = ({ onSearchClick }) => {
  const { postId } = useParams();
  const [showBottomBar, setShowBottomBar] = useState(false);

  // Default to post 1 if no postId is found
  const post = blogData.find((p) => p.id === parseInt(postId || 1));
  const postIndex = blogData.findIndex((p) => p.id === parseInt(postId || 1));

  const prevPost = postIndex > 0 ? blogData[postIndex - 1] : null;
  const nextPost =
    postIndex < blogData.length - 1 ? blogData[postIndex + 1] : null;

  // Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      // Show bar after scrolling down 400px
      if (window.scrollY > 400) {
        setShowBottomBar(true);
      } else {
        setShowBottomBar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!post) {
    return <div>Post not found</div>;
  }

  const renderContent = (content) => {
    switch (content.type) {
      case "image":
        return (
          <img
            src={post.image}
            alt={content.alt}
            className="my-8 rounded-lg shadow-lg w-full h-auto"
          />
        );
      case "paragraph":
        return (
          <p className="text-lg my-4 font-serif text-gray-700 leading-relaxed">
            {content.text}
          </p>
        );
      case "heading":
        return (
          <h2 className="text-3xl font-serif font-bold my-6 text-gray-900">
            {content.text}
          </h2>
        );
      case "quote":
        return (
          <blockquote className="border-l-4 border-gray-400 italic my-8 pl-4 text-xl font-serif text-gray-700">
            {content.text}
          </blockquote>
        );
      case "image_grid":
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
            <img
              src="/src/assets/SubBlogImage1.jpg"
              alt="Book 1"
              className="rounded-lg shadow-md w-full h-auto"
            />
            <img
              src="/src/assets/SubBlogImage2.jpg"
              alt="Book 2"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white font-inter relative">
      {/* --- Hero Section --- */}
      <div className="relative h-103">
        <img
          src="/src/assets/BlogBanner.jpg"
          alt="Blog Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/40">
          <h1 className="text-5xl font-bold text-white">News</h1>
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
                  <Link
                    to="/blog/standard"
                    className="inline-flex items-center transition-colors hover:text-white"
                  >
                    News
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-1 text-gray-400">/</span>
                  {post.title}
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* --- Main Layout --- */}
      <div className="mx-auto max-w-8xl px-6 sm:px-10 lg:px-12 py-16 pb-32">
        {" "}
        {/* Added pb-32 for extra bottom space */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Left Column: Blog Content */}
          <div className="lg:col-span-2">
            <article>
              {/* Post Meta */}
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <span>
                  by{" "}
                  <span className="font-medium text-gray-700">
                    {post.author}
                  </span>
                </span>
                <span>/</span>
                <span>{post.date}</span>
              </div>
              <h1 className="text-4xl font-serif font-bold text-green-900 mb-4">
                {post.title}
              </h1>
              {/* Content Loop */}
              {post.content.map((content, idx) => (
                <div key={idx}>{renderContent(content)}</div>
              ))}

              {/* Tags & Share */}
              <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">
                    Tags:
                  </span>
                  <a
                    href="#"
                    className="px-3 py-1 bg-gray-100 text-xs text-gray-600 rounded-full hover:bg-green-100 hover:text-green-700 transition-all"
                  >
                    News
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">
                    Share:
                  </span>
                  <a
                    href="#"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all"
                  >
                    <IconFacebook />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-400 hover:text-white transition-all"
                  >
                    <IconTwitter />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-red-600 hover:text-white transition-all"
                  >
                    <IconPinterest />
                  </a>
                </div>
              </div>

              {/* Post Navigation (In-body) */}
              <div className="mt-12 pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  {prevPost && (
                    <Link
                      to={`/blog/post/${prevPost.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
                    >
                      <span className="text-xs text-gray-500">
                        Previous Post
                      </span>
                      <p className="font-semibold text-gray-800 group-hover:text-green-700">
                        {prevPost.title}
                      </p>
                    </Link>
                  )}
                </div>
                <div className="sm:text-right">
                  {nextPost && (
                    <Link
                      to={`/blog/post/${nextPost.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
                    >
                      <span className="text-xs text-gray-500">Next Post</span>
                      <p className="font-semibold text-gray-800 group-hover:text-green-700">
                        {nextPost.title}
                      </p>
                    </Link>
                  )}
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-16">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                  1 Comment
                </h2>
                <div className="space-y-6">
                  <div className="flex space-x-4">
                    <img
                      className="w-12 h-12 rounded-full"
                      src="https://placehold.co/100x100/ccc/777?text=User"
                      alt="User"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-bold text-gray-900">
                          Anonymous
                        </h4>
                        <span className="text-xs text-gray-500">
                          October 25, 2024
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Great article! Really enjoyed the insights.
                      </p>
                      <button className="text-xs font-semibold text-green-700 hover:underline mt-2">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment Form */}
              <div className="mt-16 pt-10 border-t border-gray-100">
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6">
                  Leave a Reply
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Your email address will not be published.
                </p>
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                    ></textarea>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full border border-gray-300 rounded-lg p-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 bg-green-700 text-white text-sm font-semibold rounded-lg hover:bg-green-800 transition-all"
                    >
                      Post Comment
                    </button>
                  </div>
                </form>
              </div>
            </article>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar onSearchClick={onSearchClick} />
          </div>
        </div>
      </div>

      {/* --- Sticky Bottom Navigation Bar --- */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] transition-transform duration-500 ease-in-out ${
          showBottomBar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="max-w-8xl mx-auto px-6 sm:px-10 lg:px-12 h-20 flex items-center justify-between">
          {/* Previous Post (Left) */}
          <div className="flex-1 flex justify-start min-w-0">
            {prevPost ? (
              <Link
                to={`/blog/post/${prevPost.id}`}
                className="group flex items-center gap-4 text-gray-500 hover:text-gray-900 transition-colors max-w-full"
              >
                <span className="text-2xl leading-none transform group-hover:-translate-x-1 transition-transform">
                  &larr;
                </span>
                <span className="hidden sm:block truncate font-medium text-sm">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div /> // Spacer
            )}
          </div>

          {/* Current Reading (Center - Hidden on mobile) */}
          <div className="hidden md:flex flex-[2] flex-col items-center justify-center text-center px-4 border-l border-r border-gray-100 h-full">
            <span className="text-gray-500 font-bold text-sm">
              Reading{" "}
              <span className="font-normal text-gray-400 ml-1">
                News: {post.title}
              </span>
            </span>
          </div>

          {/* Next Post (Right) */}
          <div className="flex-1 flex justify-end min-w-0">
            {nextPost ? (
              <Link
                to={`/blog/post/${nextPost.id}`}
                className="group flex items-center gap-4 text-gray-500 hover:text-gray-900 transition-colors max-w-full text-right"
              >
                <span className="hidden sm:block truncate font-medium text-sm">
                  {nextPost.title}
                </span>
                <span className="text-2xl leading-none transform group-hover:translate-x-1 transition-transform">
                  &rarr;
                </span>
              </Link>
            ) : (
              <div /> // Spacer
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostDetailWithSidebar;
