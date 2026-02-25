import React, { useState } from "react";
// Assuming the image path is correct based on your setup
import categoryModel from "../assets/Landing/Shob By Caregoty/imgi_45_insta-4.jpg";

// Category Images
import necklaceImg from "../assets/Landing/Shob By Caregoty/imgi_28_necklace.png";
import earringsImg from "../assets/Landing/Shob By Caregoty/imgi_29_earrings.png";
import ringImg from "../assets/Landing/Shob By Caregoty/imgi_30_ring.png";
import braceletsImg from "../assets/Landing/Shob By Caregoty/imgi_31_bracelets.png";
import bundleImg from "../assets/Landing/Shob By Caregoty/imgi_32_bundle-set.png";
import locketImg from "../assets/Landing/Shob By Caregoty/imgi_33_locket.png";

const categories = [
  { name: "Necklaces", count: "8 Products", image: necklaceImg },
  { name: "Earrings", count: "35 Products", image: earringsImg },
  { name: "Rings", count: "27 Products", image: ringImg },
  { name: "Bracelets", count: "12 Products", image: braceletsImg },
  { name: "Bundle Set", count: "18 Products", image: bundleImg },
  { name: "Locket", count: "7 Products", image: locketImg },
];

const ShopByCategory = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-start justify-center">
          {/* Left Side: The Model Image */}
          <div className="w-full md:w-5/12 lg:w-[700px] z-0">
            <img
              src={categoryModel}
              alt="Model wearing jewelry"
              className="w-full max-h-[750px] object-cover scale-x-[-1]"
            />
          </div>

          {/* Right Side: The Overlapping Content Card */}
          {/* md:-ml-32 creates the overlap effect */}

          <div className="w-full md:w-7/12 lg:w-[600px] z-10 md:mt-12 md:-ml-24 flex flex-col relative">
            <div className="mb-6 md:mb-8 text-right">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-gray-800 tracking-tight block w-full">
                Shop By Category
              </h2>
            </div>

            <div className="bg-[#FCFBF9] p-10 md:p-16 shadow-sm relative w-full">
              <div className="flex flex-col space-y-5 relative">
                {categories.map((cat, index) => (
                  <div
                    key={index}
                    className="relative flex items-center justify-between border-b border-gray-200 pb-5 group cursor-pointer"
                    onMouseEnter={() => setActiveCategory(index)}
                    onMouseLeave={() => setActiveCategory(null)}
                  >
                    <div className="flex items-baseline gap-3 w-full justify-start">
                      <h3
                        className={`text-xl md:text-2xl font-serif transition-colors duration-300 ${
                          activeCategory === index
                            ? "text-[#CB927A]"
                            : "text-gray-800"
                        }`}
                      >
                        {cat.name}
                      </h3>
                      <span
                        className={`text-[11.5px] font-medium uppercase tracking-widest whitespace-nowrap ml-2 transition-colors duration-300 ${
                          activeCategory === index
                            ? "text-gray-800"
                            : "text-[#CB927A]"
                        }`}
                      >
                        {cat.count}
                      </span>
                    </div>

                    {/* Circular Image Preview on Hover */}
                    <div
                      className={`absolute right-0 top-1/2 -translate-y-1/2 w-30 h-30 rounded-full border-4 border-white shadow-lg overflow-hidden transition-all duration-700 ease-in-out pointer-events-none z-20 ${
                        activeCategory === index
                          ? "opacity-100 translate-x-[-16px] visible"
                          : "opacity-0 translate-x-8 invisible"
                      }`}
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
