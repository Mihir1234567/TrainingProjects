import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import testimonialBg from "../assets/Landing/OurHappyClients/imgi_61_testimonial-bg.jpg"; // You can use this for the first one or across the board

const testimonials = [
  {
    id: 1,
    quote:
      "Elementum id enim Proin eget tortor risus. Quisque velit nisi, pretium ut lacinia in. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.",
    author: "Douglas Robledo",
    role: "Manager",
  },
  {
    id: 2,
    quote:
      "Nulla porttitor accumsan tincidunt. Donec rutrum congue leo eget malesuada. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus.",
    author: "Sarah Jenkins",
    role: "Creative Director",
  },
  {
    id: 3,
    quote:
      "Quisque velit nisi, pretium ut lacinia in, elementum id enim. Sed porttitor lectus nibh. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Nulla porttitor accumsan tincidunt. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a.",
    author: "Michael Chang",
    role: "Lead Designer",
  },
];

const OurHappyClients = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  const changeTestimonial = (direction) => {
    if (isFading) return;
    setIsFading(true);

    setCurrentIndex((prev) => {
      if (direction === "next") {
        return prev === testimonials.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? testimonials.length - 1 : prev - 1;
      }
    });

    setTimeout(() => {
      setIsFading(false);
    }, 1000); // Wait for the transition duration before accepting new clicks
  };

  const handlePrev = () => changeTestimonial("prev");
  const handleNext = () => changeTestimonial("next");

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl mb-12 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 tracking-tight">
          Our Happy Clients
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch pt-4 md:pt-8 min-h-[500px]">
        {/* Background Image Container */}
        <div className="w-full lg:w-[45%] xl:w-[50%] h-[400px] lg:h-auto relative overflow-hidden">
          <img
            src={testimonialBg}
            alt="Our Happy Client"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>

        {/* Testimonial Card Container - increased negative margin to deeply overlap */}
        <div className="w-[95%] sm:w-[90%] md:w-full lg:w-[65%] xl:w-[60%] flex lg:justify-start lg:pr-[max(1rem,calc((100vw-1280px)/2))] z-10 -mt-16 sm:-mt-20 md:-mt-24 lg:mt-0 lg:-ml-32 xl:-ml-40 lg:py-8 xl:py-12 mx-auto lg:mx-0">
          {/* Testimonial Card */}
          <div className="w-full max-w-[950px] bg-[#FEFBF9] p-6 sm:p-10 md:p-16 lg:p-24 relative shadow-lg lg:shadow-sm h-full flex flex-col justify-center transition-opacity duration-300 rounded-2xl lg:rounded-none">
            {/* Quote Icon */}
            <div className="flex justify-center mb-8">
              <span className="text-5xl md:text-6xl text-[#D8A790] font-serif leading-none">
                ”
              </span>
            </div>

            <div className="relative h-[420px] md:h-[340px] lg:h-[360px] w-full overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${
                    index === currentIndex
                      ? "opacity-100 z-10"
                      : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  {/* Fixed height container for quotes to stop author from jumping */}
                  <div className="h-[300px] md:h-[240px] lg:h-[240px] flex items-center justify-center mb-6 md:mb-8 w-full">
                    <p className="text-[#000] text-[15px] sm:text-[16px] md:text-[20px] lg:text-[22px] leading-[1.6] md:leading-[1.8] text-center max-w-4xl mx-auto px-2 lg:px-0">
                      {testimonial.quote}
                    </p>
                  </div>

                  <div className="text-center">
                    <h4 className="text-[#D8A790] font-serif text-[24px] md:text-[26px] mb-2">
                      {testimonial.author}
                    </h4>
                    <span className="text-[#777777] text-[15px] md:text-[16px]">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-4 lg:left-0 top-[60%] lg:top-1/2 -translate-y-1/2 lg:-translate-x-1/2 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-md text-[#D8A790] hover:bg-[#D8A790] hover:text-white transition-colors border border-[#F0EBE6] z-20"
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-4 lg:right-0 top-[60%] lg:top-1/2 -translate-y-1/2 lg:translate-x-1/2 w-10 h-10 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center shadow-md text-[#D8A790] hover:bg-[#D8A790] hover:text-white transition-colors border border-[#F0EBE6] z-20"
            >
              <ArrowRight size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default OurHappyClients;
// Trigger Vite HMR
