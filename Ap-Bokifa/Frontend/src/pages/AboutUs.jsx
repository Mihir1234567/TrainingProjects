import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  BookOpen,
  Users,
  ShoppingCart,
  Smile,
} from "lucide-react";

// Import slick css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const AboutSection = () => {
  // --- Our Story Carousel State ---
  const [currentStorySlide, setCurrentStorySlide] = useState(0);
  const [storySlidesToShow, setStorySlidesToShow] = useState(3.5);
  const storySliderRef = useRef(null);

  // --- Testimonial Slider Ref ---
  const testimonialSliderRef = useRef(null);

  // --- Story Data ---
  const storyData = [
    {
      year: "1983",
      type: "text",
      content:
        "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor. Voluptate.",
    },
    { year: "1999", type: "image", src: "/src/assets/AboutUsIgImg5.png" },
    { year: "2007", type: "image", src: "/src/assets/AboutUsIgImg4.png" },
    { year: "2014", type: "image", src: "/src/assets/AboutUsIgImg3.png" },
    { year: "2018", type: "image", src: "/src/assets/AboutUsIgImg2.png" },
    { year: "2023", type: "image", src: "/src/assets/AboutUsIgImg1.png" },
  ];

  // --- Testimonial Data ---
  const testimonialData = [
    {
      id: 1,
      name: "Pam Pruitt",
      quote:
        "“This is the best book store! A wide variety. The prices are great, and there is always a sale of some kind going on. You can find just what you are looking for here.”",
    },
    {
      id: 2,
      name: "Margaret C.",
      quote:
        "This has been the only food I’ve found that she can handle. The bag is huge; it came in a big box and was in tact. It’s helped my dog maintain...",
    },
    {
      id: 3,
      name: "Chloe H.",
      quote:
        "I order regularly and have never had an issue. My cats seem to enjoy it and prefer it over some of the other brands in this price range.",
    },
  ];

  // --- Statistics Data ---
  const statsData = [
    { icon: BookOpen, number: "15,254", label: "total books" },
    { icon: Users, number: "1,258", label: "authors" },
    { icon: ShoppingCart, number: "20,898", label: "books sold" },
    { icon: Smile, number: "97%", label: "happy customer" },
  ];

  // --- Handle Responsive Story Slides Count ---
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setStorySlidesToShow(1.2);
      } else if (window.innerWidth < 768) {
        setStorySlidesToShow(2.5);
      } else if (window.innerWidth < 1024) {
        setStorySlidesToShow(2.5);
      } else {
        setStorySlidesToShow(3.5);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // --- Story Carousel Settings ---
  const storySettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3.5,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    touchThreshold: 20,
    waitForAnimate: false,
    cssEase: "ease-out",
    useTransform: true,
    beforeChange: (current, next) => setCurrentStorySlide(next),
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2.5 } },
      { breakpoint: 768, settings: { slidesToShow: 2.5 } },
      { breakpoint: 480, settings: { slidesToShow: 1.2 } },
    ],
  };

  // --- Testimonial Carousel Settings ---
  const testimonialSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          swipeToSlide: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          swipeToSlide: true,
          centerMode: false,
        },
      },
    ],
  };

  // --- Logic for Story Progress Bar ---
  const totalStorySlides = storyData.length;
  const maxStoryIndex = totalStorySlides - storySlidesToShow;
  const storyBarWidthPct = 100 / totalStorySlides;

  let storyBarLeft = 0;
  if (maxStoryIndex > 0) {
    const safeCurrent = Math.min(currentStorySlide, maxStoryIndex);
    storyBarLeft = (safeCurrent / maxStoryIndex) * (100 - storyBarWidthPct);
  }

  return (
    <div className="w-full font-sans text-gray-900">
      {/* ==========================================
          1. HERO SECTION
         ========================================== */}
      <div className="relative h-[412px]">
        <img
          src="/src/assets/AboutUsBanner.png"
          alt="About Us banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center bg-black/20">
          <h1 className="text-6xl font-bold text-white">About Us</h1>
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
                  <span className="font-medium text-white">About Us</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* ==========================================
          2. "WHO WE ARE" CONTENT SECTION
         ========================================== */}
      <div className="relative w-full bg-white">
        <img
          src="/src/assets/AboutUsBg.png"
          alt="Background Pattern"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <section className="relative z-10 top-15 px-6 py-16 md:px-12 lg:px-24 overflow-hidden">
          <div className="text-center max-w-3xl mx-auto mb-16 mt-12">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-6">
              who we are
            </p>
            <h2 className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight">
              We are world’s largest and most recommended online bookstore
              offering{" "}
              <span className="text-green-700 italic">40+ million</span>{" "}
              selections.
            </h2>
          </div>

          <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="flex flex-col">
              <div className="relative w-full mb-4">
                <img
                  src="/src/assets/AboutUsImg2.png"
                  alt="Library Interior"
                  className="w-full h-[300px] md:h-[400px] object-cover rounded-sm"
                />
                {/* Mission Card */}
                <div className="relative -mt-20 ml-auto -mr-4 md:-mr-8 w-[90%] md:w-[80%] bg-white p-8 rounded-sm z-20">
                  <h3 className="text-5xl font-serif text-gray-900 mb-3">
                    Our Mission
                  </h3>
                  <p className="text-gray-700 text-xl leading-relaxed font-medium">
                    Our mission is simple: To help local, independent bookstores
                    thrive in the age of ecommerce.
                  </p>
                </div>
              </div>
              <hr className="h-px my-3 bg-gray-300 border-0" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 lg:mt-12 border-t border-gray-200 pt-8 lg:border-none lg:pt-0">
                <div>
                  <h4 className="text-3xl font-serif text-gray-900 mb-3">
                    Retail stores
                  </h4>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    Mauris tempus erat laoreet turpis lobortis, eu tincidunt
                    erat fermentum.
                  </p>
                </div>
                <div>
                  <h4 className="text-3xl font-serif text-gray-900 mb-3">
                    Wholesale distribution
                  </h4>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    Praesent varius ultricies massa at faucibus. Aenean
                    dignissim, orci sed faucibus pharetra.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full h-full mt-8 lg:mt-0">
              <img
                src="/src/assets/AboutUsImg1.png"
                alt="Artistic Desk Setup"
                className="w-full h-[500px] lg:h-full object-cover rounded-sm"
              />
            </div>
          </div>
        </section>
      </div>
      <hr className="h-px my-3 bg-gray-200 border-0" />

      {/* ==========================================
          3. OUR STORY CAROUSEL SECTION
         ========================================== */}
      <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-black font-bold text-xl">
              Since 1983, we've raised more than{" "}
              <span className="text-green-700 font-bold">$33 million</span> for
              independent <br /> bookstores.
            </p>
          </div>

          <div className="relative flex items-center">
            <button
              onClick={() => storySliderRef.current?.slickPrev()}
              className="hidden md:flex absolute -left-12 z-10 p-2 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <ChevronLeft size={32} strokeWidth={1} />
            </button>

            <div className="w-full">
              <Slider
                ref={storySliderRef}
                {...storySettings}
                className="story-slider"
              >
                {storyData.map((item, index) => (
                  <div key={index} className="px-3 outline-none">
                    {item.type === "text" ? (
                      <div className="w-full h-[400px] bg-[#008040] p-8 flex flex-col justify-end text-white rounded-xl">
                        <h3 className="text-5xl font-bold mb-4">{item.year}</h3>
                        <p className="text-lg leading-relaxed opacity-90">
                          {item.content}
                        </p>
                      </div>
                    ) : (
                      <div className="relative w-full h-[400px] rounded-xl overflow-hidden group">
                        <img
                          src={item.src}
                          alt={`Story ${item.year}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8">
                          <h3 className="text-5xl font-bold text-white">
                            {item.year}
                          </h3>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </Slider>
            </div>

            <button
              onClick={() => storySliderRef.current?.slickNext()}
              className="hidden md:flex absolute -right-12 z-10 p-2 text-gray-400 hover:text-gray-800 transition-colors"
            >
              <ChevronRight size={32} strokeWidth={1} />
            </button>
          </div>

          {/* Story Sliding Indicator Bar */}
          <div className="mt-10 relative w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute  top-0 h-full bg-[#008040] transition-all duration-500 ease-out"
              style={{
                width: `${storyBarWidthPct+30}%`,
                left: `${storyBarLeft}%`,
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. TESTIMONIALS SECTION
         ========================================== */}
      <section className="bg-[#fcf8f3] py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-8xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif text-gray-900">
              What client says
            </h2>
          </div>

          {/* Testimonial Slider */}
          <div className="w-full h-full">
            <Slider
              ref={testimonialSliderRef}
              {...testimonialSettings}
              className="testimonial-slider"
            >
              {testimonialData.map((item) => (
                <div key={item.id} className="px-4 outline-none h-full">
                  <div className="bg-white p-10 rounded-xl shadow-sm text-center h-[270px] w-full md:w-[410px] mx-auto flex flex-col items-center">
                    {/* Name */}
                    <h4 className="font-bold text-2xl text-gray-900 mb-3">
                      {item.name}
                    </h4>
                    {/* Stars */}
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill="#FFC107"
                          className="text-[#FFC107]"
                        />
                      ))}
                    </div>

                    {/* Divider Line */}
                    <div className="w-full h-[2px] bg-gray-200 mb-6 shrink-0"></div>

                    {/* Quote */}
                    <p className="text-gray-600 text-md leading-relaxed flex-grow">
                      {item.quote}
                    </p>

                    {/* Footer */}
                    <p className="text-xs text-gray-400 mt-6 shrink-0">
                      Turning Page Bookshop
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. STATISTICS SECTION (New)
         ========================================== */}
      <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-8xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {statsData.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Icon Circle */}
              <div className="bg-[#f9f4ee] w-20 h-20 rounded-full flex items-center justify-center mb-6">
                <stat.icon
                  size={32}
                  className="text-gray-300"
                  strokeWidth={1.5}
                />
              </div>
              {/* Number */}
              <h3 className="text-7xl font-serif text-[#1a5f36] mb-2">
                {stat.number}
              </h3>
              {/* Label */}
              <p className="text-sm text-gray-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutSection;
