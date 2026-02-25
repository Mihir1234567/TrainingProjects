import React, { useRef, useState } from "react";
import { ArrowUpRight, Instagram } from "lucide-react";

import img1 from "../assets/Landing/Torado On Instagram/imgi_42_insta-1.jpg";
import img2 from "../assets/Landing/Torado On Instagram/imgi_43_insta-2.jpg";
import img3 from "../assets/Landing/Torado On Instagram/imgi_44_insta-3.jpg";
import img4 from "../assets/Landing/Torado On Instagram/imgi_45_insta-4.jpg";
import img5 from "../assets/Landing/Torado On Instagram/imgi_46_insta-5.jpg";
import img6 from "../assets/Landing/Torado On Instagram/imgi_47_insta-6.jpg";
import img7 from "../assets/Landing/Torado On Instagram/imgi_48_insta-7.jpg";
import img8 from "../assets/Landing/Torado On Instagram/imgi_49_insta-8.jpg";

const ToradoOnInstagram = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const images = [
    { src: img1, id: 1 },
    { src: img2, id: 2 },
    { src: img3, id: 3 },
    { src: img4, id: 4 },
    { src: img5, id: 5 },
    { src: img6, id: 6 },
    { src: img7, id: 7 },
    { src: img8, id: 8 },
  ];

  const getLayoutClasses = (index) => {
    if (index % 2 === 0) {
      return "h-[280px] md:h-[340px] lg:h-[360px] mt-0";
    } else {
      return "h-[280px] md:h-[340px] lg:h-[360px] mt-8 md:mt-16";
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 lg:mb-24 px-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-11 md:h-11 bg-[#C59B87] rounded-md flex items-center justify-center text-white">
              <Instagram size={22} strokeWidth={2} />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-[40px] text-gray-900 tracking-tight">
              #Love Torado On Instagram
            </h2>
          </div>

          <a
            href="#"
            className="group flex items-center gap-1 text-[14px] md:text-[15px] font-medium text-gray-800 mt-6 md:mt-0"
          >
            <span className="relative pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-gray-800 after:transition-transform after:duration-2000 after:ease-in-out group-hover:after:scale-x-100">
              View Gallery
            </span>
            <ArrowUpRight
              size={18}
              strokeWidth={1.5}
              className="transition-transform duration-2000 ease-in-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>

      {/* Gallery Slider */}
      <div
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        // Increased pl-8 on mobile and added +2rem to the desktop calculation
        className={`flex flex-nowrap items-start gap-3 md:gap-5 lg:gap-6 overflow-x-auto pb-10 pl-8 md:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] ${isDragging ? "cursor-grabbing snap-none" : "cursor-grab snap-x"} [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
      >
        {images.map((img, index) => {
          const layoutClasses = getLayoutClasses(index);

          return (
            <div
              key={img.id}
              className={`min-w-[70%] sm:min-w-[45%] md:min-w-[calc(20%-16px)] lg:min-w-[calc(20%-19px)] flex-shrink-0 snap-center group overflow-hidden cursor-pointer ${layoutClasses} transition-all duration-300 select-none`}
            >
              <div className="w-full h-full relative overflow-hidden">
                {/* Overlay for hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                  <Instagram
                    size={32}
                    className="text-white opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                  />
                </div>

                <img
                  src={img.src}
                  alt="Instagram"
                  draggable={false}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ToradoOnInstagram;
