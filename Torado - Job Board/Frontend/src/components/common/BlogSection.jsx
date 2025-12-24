import React from "react";
import BlogImg1 from "../../assets/Blogs/BlogImg1.jpg";
import BlogImg2 from "../../assets/Blogs/BlogImg2.jpg";
import BlogImg3 from "../../assets/Blogs/BlogImg3.jpg";

const blogData = [
  {
    id: 1,
    date: "January 22, 2025",
    title:
      "Great New Apartments In The Best Cities In The USA Secrets You Never Knew",
    description:
      "Every month, more than 3 million job seekers visit our website to search for jobs, with more than 130,000 applications per day. Search all open positions on the web. Get your own personalized salary estimate. Lorem ipsum dolor sit.",
    image: BlogImg1,
  },
  {
    id: 2,
    date: "January 22, 2025",
    title: "Explore Some Of the City And Home Services Secrets You Never Knew",
    description:
      "Every month, more than 3 million job seekers visit our website to search for jobs, with more than 130,000 applications per day. Search all open positions on the web. Get your own personalized salary estimate. Lorem ipsum dolor sit.",
    image: BlogImg2,
  },
  {
    id: 3,
    date: "January 22, 2025",
    title:
      "Find The Talent You Need To Grow Your Business Secrets You Never Knew",
    description:
      "Every month, more than 3 million job seekers visit our website to search for jobs, with more than 130,000 applications per day. Search all open positions on the web. Get your own personalized salary estimate. Lorem ipsum dolor sit.",
    image: BlogImg3,
  },
];

const BlogSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-16 gap-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#083E47]">
            Some Insight From Us
          </h2>
          <button className="relative overflow-hidden group/btn bg-[#5BBB7B] text-white px-8 py-3.5 rounded-lg font-bold transition-all text-sm">
            <span className="absolute inset-0 bg-[#083E47] scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 ease-in-out origin-center"></span>
            <span className="relative z-10">View All Blogs</span>
          </button>
        </div>

        {/* Blog Posts */}
        <div className="flex flex-col gap-16">
          <hr className="border-gray-100" />
          {blogData.map((blog, index) => (
            <React.Fragment key={blog.id}>
              <div
                className={`group flex flex-col lg:flex-row items-center gap-10 lg:gap-16 ${
                  index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className="w-full lg:w-[45%] cursor-pointer">
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 space-y-5">
                  <p className="text-gray-400 text-sm font-medium">
                    {blog.date}
                  </p>
                  <h3 className="text-2xl md:text-[28px] font-bold text-[#083E47] leading-tight cursor-pointer hover:text-[#5BBB7B] transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed text-[15px]">
                    {blog.description}
                  </p>
                  <div>
                    <button className="relative overflow-hidden group/btn px-8 py-3 rounded-lg font-bold transition-all text-sm border border-gray-200 text-[#083E47] group-hover:bg-[#5BBB7B] group-hover:text-white group-hover:border-[#5BBB7B]">
                      <span className="absolute inset-0 bg-[#083E47] scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-500 ease-in-out origin-center"></span>
                      <span className="relative z-10 transition-colors duration-300">
                        Learn More
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              {index < blogData.length - 1 && (
                <hr className="border-gray-100" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
