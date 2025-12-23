import React, { useState, useEffect } from "react";
// Assuming your imports stay the same
import brand1 from "../../assets/home/homebrands/BrandImg1.png";
import brand2 from "../../assets/home/homebrands/BrandImg2.png";
import brand4 from "../../assets/home/homebrands/BrandImg4.png";
import brand5 from "../../assets/home/homebrands/BrandImg5.png";
import brand6 from "../../assets/home/homebrands/BrandImg6.png";
import brand7 from "../../assets/home/homebrands/BrandImg7.png";
import brand8 from "../../assets/home/homebrands/BrandImg8.png";
import brand9 from "../../assets/home/homebrands/BrandImg9.png";

const BrandLogos = () => {
  const brands = [
    { id: 1, src: brand1, alt: "Stripe" },
    { id: 2, src: brand2, alt: "Belfort" },
    { id: 4, src: brand4, alt: "Teachable" },
    { id: 5, src: brand5, alt: "FuboTV" },
    { id: 6, src: brand6, alt: "Latch" },
    { id: 7, src: brand7, alt: "Draftbit" },
    { id: 8, src: brand8, alt: "AngelList" },
    { id: 9, src: brand9, alt: "Truevo" },
  ];

  // Triple the brands for seamless looping logic
  const extendedBrands = [...brands, ...brands, ...brands];
  const [currentIndex, setCurrentIndex] = useState(brands.length);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isCarousel, setIsCarousel] = useState(false);
  const containerRef = React.useRef(null);

  useEffect(() => {
    const checkSpace = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setIsCarousel(width < 1100);
      }
    };

    const observer = new ResizeObserver(checkSpace);
    if (containerRef.current) observer.observe(containerRef.current);

    checkSpace();
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isCarousel) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      setCurrentIndex((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(timer);
  }, [isCarousel, brands.length]);

  const handleTransitionEnd = () => {
    // If we've reached the start of the third set, jump back to the start of the second set
    if (currentIndex >= brands.length * 2) {
      setIsTransitioning(false);
      setCurrentIndex(brands.length);
    }
    // If we somehow go backwards (not likely here), jump back to middle set
    if (currentIndex <= brands.length - 1) {
      setIsTransitioning(false);
      setCurrentIndex(brands.length * 2 - 1);
    }
  };

  const getTranslateValue = () => {
    const w = window.innerWidth;
    // Adjusted widths for 1024x661 (5 logos) as well.
    const itemWidth =
      w < 480 ? 50 : w < 768 ? 33.33 : w < 1024 ? 25 : w < 1100 ? 20 : 25;
    return -(currentIndex * itemWidth);
  };

  return (
    <div className="w-full bg-slate-50 flex justify-end">
      {/* The main blue container with the top-left radius and left margin effect */}
      <section
        ref={containerRef}
        className="w-[97%] bg-[#001B3D] pt-12 pb-16 px-8 rounded-tl-[60px] md:rounded-tl-[80px] -mt-[1px] relative z-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-white text-[13px] md:text-base font-semibold tracking-wide mb-10 opacity-80 uppercase leading-none">
            Trusted By The Best Companies In The World
          </h2>

          {!isCarousel ? (
            /* Desktop View: Full Grid */
            <div className="flex flex-wrap items-center justify-between gap-4">
              {brands.map((brand) => (
                <div
                  key={brand.id}
                  className="flex items-center justify-center grayscale brightness-0 invert transition-all duration-300 hover:opacity-100 opacity-70 w-[120px] h-[40px]"
                >
                  <img
                    src={brand.src}
                    alt={brand.alt}
                    className="max-w-full max-h-full object-contain px-2 transition-transform duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Carousel View: Dynamic based on space with Seamless Loop */
            <div className="relative w-full overflow-hidden h-[50px]">
              <div
                className={`flex h-full ${
                  isTransitioning
                    ? "transition-transform duration-700 ease-in-out"
                    : ""
                }`}
                style={{ transform: `translateX(${getTranslateValue()}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {extendedBrands.map((brand, idx) => (
                  <div
                    key={`${brand.id}-${idx}`}
                    className="flex-shrink-0 w-1/2 min-[480px]:w-1/3 md:w-1/4 lg:w-1/5 flex items-center justify-center grayscale brightness-0 invert opacity-90 h-full px-2"
                  >
                    <div className="max-w-full h-[35px] flex items-center justify-center">
                      <img
                        src={brand.src}
                        alt={brand.alt}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BrandLogos;
