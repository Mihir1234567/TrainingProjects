import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userAPI } from "../../services/api";

const FreelancerSection = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const data = await userAPI.getFreelancers();
        // Map DB fields to match component expectations
        const mapped = data.map((f) => ({
          id: f._id,
          name: f.name,
          image: f.image || "https://via.placeholder.com/200",
          specialization: f.jobTitle || f.specialization,
          location: f.location?.split(",")[0] || "Remote",
          rate: f.rate?.replace("/hr", "") || "$50",
          rating: f.rating || 4.5,
          reviews: f.reviews || 0,
          tags: f.skills || [],
          category: f.specialization,
        }));
        setFreelancers(mapped);
      } catch (error) {
        console.error("Failed to fetch freelancers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFreelancers();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-[#F9FBFC]">
        <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-slate-500">Loading freelancers...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-[#F9FBFC]">
      <div className="w-[95%] max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#002B44] mb-4">
            Top Rated Freelancer
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {freelancers.slice(0, 8).map((freelancer) => (
            <div
              key={freelancer.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 flex flex-col group"
            >
              {/* Header: Name and Category */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-[#002B44] mb-1">
                  {freelancer.name}
                </h3>
                <p className="text-sm text-[#6170E6] italic font-medium">
                  {freelancer.category}
                </p>
              </div>

              {/* Profile Image with Hover Overlay */}
              <div className="relative mb-6 overflow-hidden rounded-lg aspect-[4/3]">
                <img
                  src={freelancer.image}
                  alt={freelancer.name}
                  className="w-full h-full object-cover"
                />

                {/* Overlay: Door Effect */}
                <div className="absolute inset-0 bg-[#05264e]/60 flex items-center justify-center scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center">
                  <Link
                    to={`/freelancer/${freelancer.id}`}
                    className="text-white text-lg font-semibold underline decoration-2 underline-offset-8 scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 hover:text-[#56d8b1] transition-colors duration-300"
                  >
                    View Profile
                  </Link>
                </div>
              </div>

              {/* Info: Location and Specialization */}
              <div className="flex justify-between items-center mb-6 gap-2">
                <div className="flex items-center text-[#666] text-xs font-medium">
                  <svg
                    className="w-3.5 h-3.5 mr-1 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                  {freelancer.location}
                </div>
                <div className="flex items-center text-[#666] text-xs font-medium">
                  <svg
                    className="w-3.5 h-3.5 mr-1 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {freelancer.specialization}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {freelancer.tags.map((tag, idx) => {
                  const tagStyles = {
                    PSD: "bg-[#EEF2FF] text-[#6170E6] hover:bg-[#d9e2ff]",
                    Figma: "bg-[#F0FDF4] text-[#22C55E] hover:bg-[#dcfce7]",
                    "Adobe XD":
                      "bg-[#F1F5F9] text-[#0F172A] hover:bg-[#e2e8f0]",
                  };
                  const currentStyle =
                    tagStyles[tag] ||
                    "bg-gray-100 text-gray-600 hover:bg-gray-200";

                  return (
                    <span
                      key={idx}
                      className={`px-3 py-1.5 text-[13px] font-semibold rounded-md uppercase tracking-wide cursor-pointer transition-colors duration-200 ${currentStyle}`}
                    >
                      {tag}
                    </span>
                  );
                })}
              </div>

              {/* Footer: Rating and Rate */}
              <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center">
                <div className="flex flex-col">
                  <div className="flex text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.floor(freelancer.rating)
                            ? "fill-current"
                            : "fill-gray-200"
                        }`}
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-[11px] text-gray-500 font-medium">
                    {freelancer.rating.toFixed(1)} ({freelancer.reviews} Review)
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[11px] text-gray-400 mb-0.5">
                    Rate:
                  </span>
                  <span className="text-base font-bold text-[#002B44]">
                    {freelancer.rate}
                    <span className="text-[11px] font-medium text-gray-400 ml-1">
                      /Hour
                    </span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FreelancerSection;
