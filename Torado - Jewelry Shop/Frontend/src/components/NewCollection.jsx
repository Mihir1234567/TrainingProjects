import React, { useState, useEffect } from "react";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import collectionImg1 from "../assets/Landing/NewCollection/imgi_22_collection-1.jpg";
import collectionImg2 from "../assets/Landing/NewCollection/imgi_24_collection-2.jpg";
import collectionImg3 from "../assets/Landing/NewCollection/imgi_25_collection-3.jpg";
import collectionImg4 from "../assets/Landing/NewCollection/imgi_26_collection-4.jpg";
import collectionImg5 from "../assets/Landing/NewCollection/imgi_27_collection-5.jpg";

// EDIT HERE: Add or remove items from this array to update the carousel
const collectionItems = [
  {
    id: 1,
    image: collectionImg1,
    title: "Wedding Ring",
    link: "#",
  },
  {
    id: 2,
    image: collectionImg2,
    title: "Necklaces",
    link: "#",
  },
  {
    id: 3,
    image: collectionImg3,
    title: "Bracelets",
    link: "#",
  },
  {
    id: 4,
    image: collectionImg4,
    title: "Bridal Ring",
    link: "#",
  },
  {
    id: 5,
    image: collectionImg5,
    title: "Accessories",
    link: "#",
  },
];

const NewCollection = () => {
  const originalLength = collectionItems.length;

  // Triplicate the array to create an infinite buffer on both ends
  const extendedItems = [
    ...collectionItems,
    ...collectionItems,
    ...collectionItems,
  ];

  // Start at the beginning of the middle set to allow scrolling left immediately
  const [currentIndex, setCurrentIndex] = useState(originalLength);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Responsive items to show
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(1);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(2);
      } else {
        setItemsToShow(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Infinite scroll snapping logic
  useEffect(() => {
    let timeoutId;

    // If we scroll left into the first clone set
    if (currentIndex <= originalLength - 1) {
      timeoutId = setTimeout(() => {
        setIsTransitioning(false); // Turn off animation for the hidden snap
        setCurrentIndex(currentIndex + originalLength);
      }, 1000); // Wait for the 1000ms transition to finish
    }
    // If we scroll right into the last clone set
    else if (currentIndex >= originalLength * 2) {
      timeoutId = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex - originalLength);
      }, 1000);
    }

    return () => clearTimeout(timeoutId);
  }, [currentIndex, originalLength]);

  const nextSlide = () => {
    // Prevent clicking past the physical end of the cloned array
    if (currentIndex >= extendedItems.length - itemsToShow) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const prevSlide = () => {
    // Prevent clicking past the physical start of the cloned array
    if (currentIndex <= 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-16 relative">
        <h2 className="text-4xl md:text-5xl font-serif text-center text-gray-900 mb-12">
          New Collection
        </h2>

        {/* Carousel Wrapper */}
        <div className="relative">
          {/* Mask container to hide overflowing slides */}
          <div className="overflow-hidden">
            {/* Slides Wrapper */}
            <div
              className={`flex ease-out ${
                isTransitioning ? "transition-transform duration-1000" : ""
              }`}
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)`,
              }}
            >
              {extendedItems.map((item, index) => (
                <div
                  // Combine ID and Index to guarantee unique keys for clones
                  key={`${item.id}-${index}`}
                  className="flex-shrink-0 px-6"
                  style={{ width: `${100 / itemsToShow}%` }}
                >
                  <div className="relative group w-full h-[500px] overflow-hidden cursor-pointer">
                    {/* Image */}
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay Content */}
                    <div className="absolute bottom-8 left-8 py-4 pl-4 backdrop-blur-xl border border-white/20 rounded-lg w-[calc(100%-14rem)] transition-all duration-500 group-hover:-translate-y-1">
                      <h3 className="text-2xl font-serif text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-gray-800">
                        <span className="text-sm font-medium uppercase tracking-wide relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-gray-800 after:transition-all after:duration-500 group-hover:after:w-full">
                          Shop Now
                        </span>
                        <ArrowUpRight className="w-4 h-4 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-6 z-10 w-14 h-14 rounded-full border border-[#CB927A] flex items-center justify-center text-[#CB927A] hover:bg-[#CB927A] hover:text-white transition-all duration-300 bg-white shadow-sm transform -translate-x-1/2 -translate-y-1/2"
          >
            <ArrowLeft className="w-6 h-6 font-light" strokeWidth={1} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-6 z-10 w-14 h-14 rounded-full border border-[#CB927A] flex items-center justify-center text-[#CB927A] hover:bg-[#CB927A] hover:text-white transition-all duration-300 bg-white shadow-sm transform translate-x-1/2 -translate-y-1/2"
          >
            <ArrowRight className="w-6 h-6 font-light" strokeWidth={1} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewCollection;
