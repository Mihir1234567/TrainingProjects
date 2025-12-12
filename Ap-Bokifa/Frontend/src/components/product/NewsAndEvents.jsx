import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
// import { blogData } from "../BlogData"; // REMOVED
import { useBlogs } from "../../hooks/useBlogs"; // ADDED

// Component for the News & Events Carousel
export default function NewsAndEvents() {
  // Fetch blogs dynamically
  const { blogs, loading, error } = useBlogs();

  // Carousel settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false, // Set to true if you want navigation arrows
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576, // Mobile
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // If loading or error, handle gracefully (e.g., empty array or skeleton)
  const posts = (blogs || []).map((post) => ({
    id: post.id,
    category: post.category ? post.category.toUpperCase() : "NEWS",
    date: post.dateString || new Date(post.createdAt).toLocaleDateString(), // Use dateString from model if available, else date
    author: post.author,
    title: post.title,
    imageUrl: post.image,
    link: `/blog/post/${post.slug || post.id}`, // Use slug if available
  }));

  return (
    // Added standard padding back to section and removed px-0
    <section className="w-full bg-white mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      {/* Removed redundant sm:px-6 lg:px-8 since it's on the parent section */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">
          News <i className="font-serif font-light italic text-gray-700">&</i>{" "}
          events
        </h2>
        <button className="text-sm font-medium text-gray-700 border border-gray-300 rounded-full px-5 py-2 hover:bg-black hover:text-white transition-colors duration-300">
          Browse All &gt;
        </button>
      </div>

      {/* Carousel */}
      <Slider {...settings}>
        {posts.map((post) => (
          <div key={post.id} className="px-3 py-3 group">
            {/* The card content remains the same */}
            <div className="rounded-lg transition-shadow duration-300 overflow-hidden">
              <Link to={post.link} className="block">
                {/* Image - CHANGED h-56 TO h-72 for a taller card */}
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-72 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
                />
                {/* Content Area */}
                <div className="relative bg-white rounded-b-lg">
                  {/* Metadata Tab */}
                  <div className="absolute -top-4 left-5 z-10 bg-white group-hover:bg-green-800 transition-colors duration-300 rounded-full px-4 py-2 text-xs font-normal">
                    <span className="text-gray-500 group-hover:text-white transition-colors duration-300 uppercase">
                      IN
                      <span className="text-green-600 group-hover:text-white transition-colors duration-300 uppercase">
                        {" " + post.category}
                      </span>
                      {" / "}
                      {post.date}
                      {" / BY "}
                      {post.author}
                    </span>
                  </div>
                  {/* Title - CHANGED text-2xl TO text-3xl */}
                  <h3 className="text-3xl font-semibold font-serif text-gray-900 pt-10 pb-6 px-5 line-clamp-2 hover:text-green-700 transition-colors">
                    {post.title}
                  </h3>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
