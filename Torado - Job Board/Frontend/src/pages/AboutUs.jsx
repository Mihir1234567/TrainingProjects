import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Star } from "lucide-react";

// Reusing existing components
import StatsSection from "../components/common/StatsSection";
import JobSearchSection from "../components/common/JobSearchSection";
import MobileAppSection from "../components/common/MobileAppSection";
import MattersToUs from "../components/common/MattersToUs";

// Images (using placeholders or existing assets)
import heroImg from "../assets/candidate-details-img.jpg"; // Placeholder for Hero
import testimonialImg from "../assets/Home/millionImg.png"; // Placeholder for Testimonial Left Image
import user1 from "../assets/Home/testimonials/testimonialsPeople1.png";
import user2 from "../assets/Home/testimonials/testimonialsPeople2.png";
import user3 from "../assets/Home/testimonials/testimonialsPeople3.png";

import AboutUsImg1 from "../assets/AboutUsImg1.png";
import AboutUsImg2 from "../assets/AboutUsImg2.png";
import AboutUsImg3 from "../assets/AboutUsImg3.jpg";

const AboutUs = () => {
  // Custom Hero Data
  const heroFeatures = [
    "A brighter demonstrations and ethics-give-outs who",
    "12th years of incorporated backed experience invites",
    "Excellent intrapersonal skills: Awareness of skills",
    "Capability to construct academy fairway design prototypes",
    "History of concerning shipping developments with your work",
  ];

  // Custom Testimonials Data
  const testimonials = [
    {
      title: "More Than Happy With Torado.",
      rating: 5,
      text: "Neque sodales ut etiam sit amet nisl purus. Egestas erat imperdiet sed euismod nisi porta lorem.",
      author: "Aida Klocko",
      role: "Creative",
      image: user1,
    },
    {
      title: "The Best Customer Service.",
      rating: 5,
      text: "Neque sodales ut etiam sit amet nisl purus. Egestas erat imperdiet sed euismod nisi porta lorem.",
      author: "Julio Bernier",
      role: "Creative",
      image: user2,
    },
    {
      title: "You Are 100% Happy.",
      rating: 5,
      text: "Neque sodales ut etiam sit amet nisl purus. Egestas erat imperdiet sed euismod nisi porta lorem.",
      author: "Darren Lowe",
      role: "Creative",
      image: user3,
    },
  ];

  return (
    <main className="font-sans text-[#002333]">
      {/* 1. Page Header */}
      <section className="bg-[#f0f5fa] py-12 md:py-20 text-center border-b border-slate-100">
        <h1 className="text-3xl md:text-[40px] font-bold text-[#002333] mb-3 tracking-tight">
          About Us
        </h1>
        <div className="flex items-center justify-center gap-2 text-sm md:text-[15px] font-medium">
          <Link
            to="/"
            className="text-slate-500 hover:text-[#5BBB7B] transition-colors"
          >
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-[#5BBB7B]">About Us</span>
        </div>
      </section>

      {/* 2. Hero Section */}
      <section className="py-16 md:py-24 bg-white overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <h2 className="text-[32px] md:text-[45px] leading-[1.15] font-bold text-[#002333] mb-6">
                We Join Job Petitioners With Symbols About The Earth
              </h2>
              <p className="text-[#666] text-[15px] leading-relaxed mb-8">
                Every month, more than 3 million job seekers visit our website
                to search for jobs, with more than 130,000 applications per day.
                Search all open positions on the web. Get your own personalized
                salary estimate. Read real reviews from employees.
              </p>

              <p className="text-[#666] text-[15px] leading-relaxed mb-8">
                Consequences, there are many variations of passages of Lorem
                Ipsum available, but the majority have suffered alteration in
                some form, by injected humour, or randomised words which don't
                look even slightly believable.
              </p>

              <p className="text-[#666] text-[15px] leading-relaxed mb-8">
                On the other hand, we denounce with righteous indignation and
                dislike men who are so beguiled and demoralized by the charms of
                pleasure of the moment, so blinded by desire, that they cannot
                foresee the pain and trouble that are bound to ensue.
              </p>

              <ul className="space-y-4">
                {heroFeatures.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2
                      className="text-[#5BBB7B] shrink-0 mt-0.5"
                      size={18}
                    />
                    <span className="text-[#666] text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[300px] md:h-[400px] lg:h-[600px] shadow-2xl">
              <img
                src={heroImg}
                alt="About Us Hero"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. Stats Section */}
      <StatsSection />

      {/* 4. Millions Of Jobs */}
      <JobSearchSection />

      {/* 5. Mobile App Section with Custom Images */}
      <MobileAppSection
        customImage={
          <div className="relative w-full max-w-[500px] lg:max-w-none flex justify-center items-center">
            {/* First Image - Behind (Graphical Element) */}
            <img
              src={AboutUsImg1}
              alt="About Us Background"
              className="absolute top-20 md:top-40 -left-[50px] md:-left-[100px] z-1 w-[120%] max-w-none opacity-60 md:opacity-100"
            />

            {/* Second Image - Front (Main Subject) */}
            <img
              src={AboutUsImg2}
              alt="About Us Main"
              className="relative w-full md:w-[95%]"
            />

            {/* Third Image - User to position */}
          </div>
        }
      />

      {/* 6. Testimonials Section (Custom) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-[40px] font-bold text-[#002333] text-center mb-16">
            What People Say About Us
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
            {/* Left Large Image (4/12 cols - 33%) */}
            <div className="lg:col-span-4 relative h-[300px] lg:h-full rounded-2xl overflow-hidden shadow-none">
              <img
                src={AboutUsImg3}
                alt="Happy Customer"
                className="absolute inset-0 w-full h-full object-contain rounded-2xl"
              />
            </div>

            {/* Right Testimonials (8/12 cols - 67%) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <style>
                {`
                  @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-50px); }
                    to { opacity: 1; transform: translateX(0); }
                  }
                  .animate-slide-in-left {
                    animation: slideInLeft 0.8s ease-out both;
                  }
                `}
              </style>
              {testimonials.map((t, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 transition-all duration-300 hover:shadow-lg hover:bg-[#F0FDF4] animate-slide-in-left cursor-pointer group flex flex-col justify-between h-auto lg:min-h-[450px]"
                  style={{ animationDelay: `${idx * 200}ms` }}
                >
                  <div>
                    {/* Quote Icon - "99" Style */}
                    <div className="mb-4 w-fit transform rotate-180 origin-center transition-transform duration-300 group-hover:scale-110">
                      <svg
                        width="42"
                        height="42"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.3 7.8C8.1 8.2 7.4 9 7.4 10.3V15.5C7.4 16.3284 8.07157 17 8.9 17H11.5C12.3284 17 13 16.3284 13 15.5V11.5C13 10.6716 12.3284 10 11.5 10H10.4C10.4 9.1 10.8 8.4 11.7 8.1L12.1 8L11.7 7L9.8 6.4L9.3 7.8Z"
                          stroke="#5BBB7B"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M17.3 7.8C16.1 8.2 15.4 9 15.4 10.3V15.5C15.4 16.3284 16.0716 17 16.9 17H19.5C20.3284 17 21 16.3284 21 15.5V11.5C21 10.6716 20.3284 10 19.5 10H18.4C18.4 9.1 18.8 8.4 19.7 8.1L20.1 8L19.7 7L17.8 6.4L17.3 7.8Z"
                          stroke="#5BBB7B"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-[#002333] mb-3 leading-snug transition-colors group-hover:text-[#5BBB7B]">
                      {t.title}
                    </h3>

                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-[#fea928] text-[#fea928]"
                        />
                      ))}
                    </div>

                    {/* Review Text */}
                    <p className="text-[15px] text-gray-500 leading-relaxed mb-8">
                      “{t.text}”
                    </p>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                      <img
                        src={t.image}
                        alt={t.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#002333] text-sm">
                        {t.author}
                      </h4>
                      <span className="text-xs text-gray-400 font-medium">
                        {t.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Matters To You */}
      <MattersToUs
        title="What Matters To You Matters To Us"
        description="Share your details via the link below. We never assume your gender, race or ethnicity."
        ctaTitle="On Untapped, You Own Your Story!"
        ctaDescription="Unleash your job placement, we never assume your gender, race or ethnicity."
        ctaButtonText="Read Info"
      />
    </main>
  );
};

export default AboutUs;
