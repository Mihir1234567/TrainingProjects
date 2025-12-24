import React, { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

import brand1 from "../../assets/Home/testimonials/testimonialsBrand1.png";
import brand2 from "../../assets/Home/testimonials/testimonialsBrand2.png";
import brand3 from "../../assets/Home/testimonials/testimonialsBrand3.png";
import brand4 from "../../assets/Home/testimonials/testimonialsBrand4.png";

import people1 from "../../assets/Home/testimonials/testimonialsPeople1.png";
import people2 from "../../assets/Home/testimonials/testimonialsPeople2.png";
import people3 from "../../assets/Home/testimonials/testimonialsPeople3.png";
import people4 from "../../assets/Home/testimonials/testimonialsPeople4.png";

import quoteIcon from "../../assets/Home/testimonials/topLeftTestimonialImg.png";

const testimonials = [
  {
    id: 1,
    text: "“Our design agency uses Figma to make all our web prototypes and designs. It's literally the quickest and easiest way to start a pick project. All you have to do is pick a template & customize it.”",
    rating: 5,
    name: "Rosa Lehner",
    role: "Creative",
    image: people1,
    brand: brand1,
  },
  {
    id: 2,
    text: "“Our design agency uses Figma to make all our web prototypes and designs. It's literally the quickest and easiest way to start a pick project. All you have to do is pick a template & customize it.”",
    rating: 5,
    name: "Mack Rowe",
    role: "Creative",
    image: people2,
    brand: brand2,
  },
  {
    id: 3,
    text: "“Our design agency uses Figma to make all our web prototypes and designs. It's literally the quickest and easiest way to start a pick project. All you have to do is pick a template & customize it.”",
    rating: 5,
    name: "Estella Leffler",
    role: "Creative",
    image: people3,
    brand: brand3,
  },
  {
    id: 4,
    text: "“Our design agency uses Figma to make all our web prototypes and designs. It's literally the quickest and easiest way to start a pick project. All you have to do is pick a template & customize it.”",
    rating: 5,
    name: "Micah Collier",
    role: "Creative",
    image: people4,
    brand: brand4,
  },
];

const TestimonialSection = () => {
  const [swiperInstance, setSwiperInstance] = useState(null);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#003B3C] mb-12">
          What People Say About Us
        </h2>

        {/* Carousel */}
        <Swiper
          onSwiper={setSwiperInstance}
          modules={[Autoplay, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          className="testimonial-swiper"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="group bg-white p-8 rounded-xl text-left flex flex-col justify-between min-h-[400px] border border-gray-100 mb-4 h-full">
                <div className="flex flex-col h-full">
                  {/* Top Row: Quote Icon & Stars */}
                  <div className="flex justify-between items-start mb-8">
                    <img
                      src={quoteIcon}
                      alt="Quote"
                      className="w-14 h-14 object-contain"
                    />
                    <div className="flex gap-1 pt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-[#6C757D] text-[15px] leading-[1.8] mb-8 font-medium">
                    {testimonial.text}
                  </p>

                  {/* Footer: User & Brand */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex flex-col">
                        <h4 className="font-bold text-[#003B3C] text-[15px] leading-tight">
                          {testimonial.name}
                        </h4>
                        <p className="text-xs text-gray-500 font-medium mt-1">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <img
                      src={testimonial.brand}
                      alt="Brand"
                      className="h-7 object-contain max-w-[90px] opacity-80"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Arrows Under Carousel */}
        <div className="flex justify-center gap-4 mt-8 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500">
          <button
            onClick={() => swiperInstance?.slidePrev()}
            className="testimonial-prev w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#5BBB7B] hover:text-white hover:border-[#5BBB7B] transition-all cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => swiperInstance?.slideNext()}
            className="testimonial-next w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-[#5BBB7B] hover:text-white hover:border-[#5BBB7B] transition-all cursor-pointer"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
