import React, { useState, useEffect } from "react";
import discountBadgeOrange from "../../assets/corouselshape1.avif";
import discountBadgeRed from "../../assets/corouselshape3.avif";
import corouselImg1 from "../../assets/corouselImg1.webp";
import corouselImg2 from "../../assets/corouselImg2.webp";
import corouselImg3 from "../../assets/corouselImg3.webp";

export const HeaderCorousel = () => {
  const [activeSlide, setActiveSlide] = useState("item1");
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const slides = [
    {
      id: "item1",
      imgSrc: corouselImg1,
      tagline: "A brand new series.",
      title: "THE WORLD OF YOUNG ADULT BOOKS",
      subtitle: "Save up to 15% on new releases.",
      buttonText: "Discover Now >",
      badgeSrc: discountBadgeOrange,
      badgeAlt: "15% OFF Orange Badge",
      badgeClass:
        "top-1/2 left-1/2 transform -translate-x-1/4 -translate-y-1/2 w-52 h-52",
      badgeText: (
        <>
          15%
          <br />
          OFF
        </>
      ),
      textColor: "#0a4253",
    },
    {
      id: "item2",
      imgSrc: corouselImg2,
      tagline: "Fiction addiction.",
      title: "YOUR ULTIMATE PAGE-TO-SCREEN READING LIST",
      subtitle: "Save over $24 with the Booker prize shortlist collection.",
      buttonText: "Discover Now >",
      badgeSrc: null,
      textColor: "#1D4A34",
    },
    {
      id: "item3",
      imgSrc: corouselImg3,
      tagline: "In store and online.",
      title: "MORE HORROR NOVELS FROM STAR AUTHORS",
      subtitle: "Stay up-to-date with the most exciting new books.",
      textColor: "#bc2802",
      buttonText: "Discover Now >",
      badgeSrc: discountBadgeRed,
      badgeAlt: "15% OFF Red Badge",
      badgeClass:
        "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-52 h-52",
      badgeText: (
        <>
          15%
          <br />
          OFF
        </>
      ),
    },
  ];

  const slideIds = slides.map((slide) => slide.id);
  const currentIndex = slideIds.indexOf(activeSlide);

  const navigateTo = (newIndex) => {
    if (newIndex < 0) newIndex = slideIds.length - 1;
    else if (newIndex >= slideIds.length) newIndex = 0;
    setActiveSlide(slideIds[newIndex]);
  };

  const handleIndicatorClick = (id) => setActiveSlide(id);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      navigateTo(nextIndex);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  const SWIPE_THRESHOLD = 70;
  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
  };
  const handleEnd = (endX) => {
    if (!isDragging || startX === null) return;
    setIsDragging(false);
    const diff = endX - startX;
    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) navigateTo(currentIndex - 1);
      else navigateTo(currentIndex + 1);
    }
    setStartX(null);
  };
  const onMouseDown = (e) => {
    if (e.target.closest("a, button") === null) {
      e.preventDefault();
      handleStart(e.clientX);
    }
  };
  const onMouseUp = (e) => handleEnd(e.clientX);
  const onTouchStart = (e) => handleStart(e.touches[0].clientX);
  const onTouchEnd = (e) => handleEnd(e.changedTouches[0].clientX);

  const getTaglineColor = (index) => {
    switch (index) {
      case 0:
        return "#5f9f9f";
      case 1:
        return "#ea1755";
      case 2:
        return "#bc2802";
      default:
        return "#6b7280";
    }
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] xl:h-[670px] overflow-hidden">
      <div
        className="w-full h-full relative"
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            id={slide.id}
            className={`carousel-item w-full h-full absolute top-0 left-0 transition-opacity duration-1000 ease-in-out ${
              slide.id === activeSlide
                ? "opacity-100 pointer-events-auto z-10"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={slide.imgSrc}
              className="w-full h-full object-none"
              alt={`Carousel Slide ${index + 1}`}
            />
            <div
              className={`absolute inset-0 flex items-center p-4 sm:p-8 md:p-12 xl:p-20 cursor ${
                index === 0
                  ? "justify-start"
                  : index === 1
                  ? "justify-center"
                  : "justify-end"
              }`}
            >
              <div
                className={`max-w-lg ${
                  index === 1 ? "text-center" : "text-left"
                } ${index === 2 ? "md:ml-20" : ""}`}
              >
                <p
                  className={` font-semibold  font-sans mb-1 text-xl`}
                  style={{ color: slide.textColor || getTaglineColor(index) }}
                >
                  {slide.tagline}
                </p>
                <h2
                  className={`text-3xl sm:text-[40px] md:text-[50px] xl:text-[55px] font-serif font-bold leading-tight mb-4 ${
                    !slide.textColor ? "text-gray-900" : ""
                  }`}
                  style={{ color: slide.textColor }}
                >
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg font-sans mb-4 sm:mb-8 text-gray-700">
                  {slide.subtitle}
                </p>
                <a
                  href="#"
                  className={`inline-flex items-center justify-center text-sm font-medium py-2.5 px-5 rounded-full shadow-lg transition duration-500 ${
                    index === 0 ? "hover:bg-[#0a4253]" : "hover:bg-[#027a36]"
                  } ${
                    index === 0
                      ? "bg-[#0a4253] text-white"
                      : "bg-white text-gray-800"
                  }`}
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
            {slide.badgeSrc && (
              <div
                className={`absolute ${slide.badgeClass} flex items-center justify-center`}
              >
                <img
                  src={slide.badgeSrc}
                  alt={slide.badgeAlt}
                  className="hidden xl:block w-full h-full object-contain rotate-badge absolute"
                />
                <div className="hidden xl:block z-10 text-white text-3xl font-bold text-center leading-none pointer-events-none">
                  {slide.badgeText}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center w-full py-2 gap-2 absolute bottom-4 z-10">
        {slides.map((slide) => {
          const isActive = slide.id === activeSlide;
          return (
            <button
              key={`indicator-${slide.id}`}
              onClick={() => handleIndicatorClick(slide.id)}
              className={`h-3 rounded-full transition-all duration-300 ${
                isActive ? "w-6 bg-green-600" : "w-3 bg-white opacity-50"
              }`}
              aria-label={`Go to slide ${slide.id}`}
            ></button>
          );
        })}
      </div>

      <style>{`
                @keyframes rotate360 {
                    from {
                        transform: rotate(0deg);
                    }
                    to {
                        transform: rotate(360deg);
                    }
                }
                .rotate-badge {
                    animation: rotate360 10s linear infinite;
                }
            `}</style>
    </div>
  );
};

export default HeaderCorousel;
