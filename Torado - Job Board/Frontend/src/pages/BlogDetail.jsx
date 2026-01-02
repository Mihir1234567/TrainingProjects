import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import blogsData from "../data/blogs.json";
import {
  Calendar,
  MessageCircle,
  CheckCircle2,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  User,
} from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams();
  const blog = blogsData.find((b) => b.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Blog post not found
          </h2>
          <Link
            to="/blog"
            className="text-torado-green-600 hover:underline mt-4 inline-block"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* 1. Page Header */}
      <section className="bg-[#f0f5fa] py-12 md:py-20 text-center border-b border-slate-100">
        <h1 className="text-3xl md:text-[40px] font-bold text-[#002333] mb-3 tracking-tight">
          Blog Details
        </h1>
        <div className="flex items-center justify-center gap-2 text-sm md:text-[15px] font-medium">
          <Link
            to="/"
            className="text-slate-500 hover:text-[#5BBB7B] transition-colors"
          >
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-[#5BBB7B]">Blog Details</span>
        </div>
      </section>

      {/* 2. Blog Content Section */}
      <section className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-[34px] font-bold text-[#002333] leading-tight mb-4 md:mb-6">
          {blog.title}
        </h1>

        {/* Meta Data */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
              <img
                src={blog.authorImage}
                alt={blog.author}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium text-slate-700">{blog.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{blog.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle size={16} />
            <span>Comment</span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden mb-8 md:mb-12 h-[200px] sm:h-[300px] md:h-[450px] w-full">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Intro Content */}
        {blog.content && (
          <div className="space-y-6 md:space-y-8">
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#002333] mb-3 md:mb-4">
                {blog.content.introTitle || "Introduction"}
              </h2>
              {blog.content.intro.split("\n\n").map((para, idx) => (
                <p
                  key={idx}
                  className="text-slate-600 leading-relaxed mb-3 md:mb-4 text-sm sm:text-[15px] md:text-base"
                >
                  {para}
                </p>
              ))}
            </div>

            {/* Quote Block */}
            <div className="bg-[#f0f5fa] p-6 md:p-10 rounded-lg border-l-4 border-[#5BBB7B] my-8 md:my-10">
              <p className="text-base sm:text-lg md:text-xl font-medium italic text-[#002333] mb-3 md:mb-4 leading-relaxed">
                "{blog.content.quote.text}"
              </p>
              <span className="text-[#5BBB7B] font-bold block text-sm sm:text-base">
                {blog.content.quote.author}
              </span>
            </div>

            {/* List Section */}
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#002333] mb-4 md:mb-6">
                {blog.content.listHeading}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                {blog.content.listItems.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-[#5BBB7B] shrink-0 mt-0.5"
                      size={18}
                    />
                    <span className="text-slate-600 text-sm sm:text-[15px]">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Conclusion */}
            <div>
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[#002333] mb-3 md:mb-4">
                {blog.content.conclusionTitle || "Conclusion"}
              </h2>
              {blog.content.conclusion.split("\n\n").map((para, idx) => (
                <p
                  key={idx}
                  className="text-slate-600 leading-relaxed mb-3 md:mb-4 text-sm sm:text-[15px] md:text-base"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Share & Tags Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-b border-slate-100 py-6 mt-10 md:mt-12 gap-6">
          <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
            <span className="font-bold text-[#002333]">Share Post</span>
            <div className="flex gap-2">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <button
                  key={i}
                  className="w-8 h-8 rounded-full bg-[#f0f5fa] flex items-center justify-center text-slate-500 hover:bg-[#5BBB7B] hover:text-white transition-all"
                >
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 w-full md:w-auto">
            {blog.tags.map((tag, idx) => {
              const colors = [
                "bg-pink-100 text-pink-600 hover:bg-[#5BBB7B] hover:text-white",
                "bg-slate-200 text-slate-700 hover:bg-[#5BBB7B] hover:text-white",
                "bg-orange-100 text-orange-700 hover:bg-[#5BBB7B] hover:text-white",
                "bg-green-100 text-green-700 hover:bg-[#5BBB7B] hover:text-white",
                "bg-purple-100 text-purple-600 hover:bg-[#5BBB7B] hover:text-white",
                "bg-blue-100 text-blue-600 hover:bg-[#5BBB7B] hover:text-white",
              ];
              const colorClass = colors[idx % colors.length];

              return (
                <span
                  key={idx}
                  className={`px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-md transition-all duration-300 ease-in-out cursor-pointer ${colorClass}`}
                >
                  {tag}
                </span>
              );
            })}
          </div>
        </div>

        {/* 3. Comments Section */}
        <div className="mt-12 md:mt-16">
          <h3 className="text-lg sm:text-xl font-bold text-[#002333] mb-6 md:mb-8">
            {blog.comments ? blog.comments.length : 0} Comment
          </h3>
          <div className="space-y-6 md:space-y-8">
            {blog.comments &&
              blog.comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 md:gap-6">
                  <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full overflow-hidden bg-slate-200">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-[#002333] text-lg">
                          {comment.author}
                        </h4>
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">
                          {comment.role}
                        </span>
                      </div>
                      <button className="relative overflow-hidden group self-start sm:self-auto mt-2 sm:mt-0 px-4 py-1.5 bg-[#f0f5fa] text-[#5BBB7B] text-xs font-bold rounded transition-all duration-300 uppercase">
                        <span className="absolute inset-0 w-full h-full bg-[#5BBB7B] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
                        <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                          Reply
                        </span>
                      </button>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-2">
                      {comment.content}
                    </p>
                    {/* Optional Date if needed below text or near name, design implies simplified view or custom placement */}
                    {/* <div className="text-xs text-slate-400 mt-1">{comment.date}</div> */}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* 4. Leave a Comment Form */}
        <div className="mt-16 pt-10 border-t border-slate-100">
          <h3 className="text-xl font-bold text-[#002333] mb-8">
            Leave a Comment
          </h3>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-[#5BBB7B] transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-[#5BBB7B] transition-colors"
              />
            </div>
            <textarea
              rows="6"
              placeholder="Message"
              className="w-full px-5 py-4 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:border-[#5BBB7B] transition-colors resize-none"
            ></textarea>
            <button
              type="submit"
              className="relative overflow-hidden group bg-[#5BBB7B] text-white px-8 py-3.5 rounded font-bold transition-all duration-300 shadow-md hover:shadow-lg inline-block"
            >
              <span className="absolute inset-0 w-full h-full bg-[#002333] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
              <span className="relative z-10">Submit Comment</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;
