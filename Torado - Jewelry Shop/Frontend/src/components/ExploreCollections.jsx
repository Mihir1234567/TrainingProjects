import React from "react";
import { Heart, ShoppingCart, Eye, ArrowUpRight } from "lucide-react";
import ringImg from "../assets/Landing/Explore Collections/imgi_34_product-41.png";
import necklaceImg from "../assets/Landing/Explore Collections/imgi_35_product-42.png";
import earringImg from "../assets/Landing/Explore Collections/imgi_36_product-43.png";
import braceletImg from "../assets/Landing/Explore Collections/imgi_37_product-44.png";
import modelImg from "../assets/Landing/Explore Collections/imgi_49_insta-8.jpg";
import banner1Img from "../assets/Landing/Explore Collections/imgi_38_collection-7.jpg";
import banner2Img from "../assets/Landing/Explore Collections/imgi_39_collection-8.jpg";

const ExploreCollections = () => {
  const products = [
    { id: 1, name: "Ring", price: "$150.00", img: ringImg },
    { id: 2, name: "Necklace", price: "$300.00", img: necklaceImg },
    { id: 3, name: "Earring", price: "$100.00", img: earringImg },
    { id: 4, name: "Bracelet", price: "$120.00", img: braceletImg },
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      {/* Header Container - Keeps header aligned with rest of site */}
      <div className="container mx-auto px-4 max-w-7xl mb-12">
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 tracking-tight">
          Explore Collections
        </h2>
      </div>

      {/* Main Content Layout - Top Section */}
      <div className="flex flex-col lg:flex-row items-stretch gap-y-8 lg:gap-x-4 xl:gap-x-8">
        {/* Left Side: Product Grid */}
        <div className="w-full lg:w-[60%] flex lg:justify-end pl-4 lg:pl-[max(1rem,calc((100vw-1280px)/2))] pr-2 lg:pr-0">
          <div className="w-full lg:max-w-[768px] grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 h-full">
            {products.map((product) => (
              <div
                key={product.id}
                className="group bg-[#F8F9FA] flex flex-col justify-between p-6 md:p-8 w-full h-[320px] md:h-[400px] cursor-pointer transition-all duration-500 hover:shadow-sm relative"
              >
                {/* Action Icons (Hover) */}
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10 transition-all duration-500">
                  {[
                    { icon: Heart, delay: "delay-0" },
                    { icon: ShoppingCart, delay: "delay-75" },
                    { icon: Eye, delay: "delay-150" },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-700 hover:bg-[#CB927A] hover:text-white transition-all duration-500 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 ${item.delay}`}
                    >
                      <item.icon size={18} />
                    </div>
                  ))}
                </div>

                {/* Image Container */}
                <div className="w-full flex-1 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="max-h-[240px] md:max-h-[280px] w-auto object-contain mix-blend-multiply block transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* Text Content */}
                <div className="text-left mt-4 relative z-20">
                  <h3 className="font-serif text-[18px] md:text-[20px] text-[#222222] mb-1 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-[14px] text-[#CB927A] font-medium tracking-wide">
                    {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Model Image */}
        <div className="w-full lg:w-[calc(40%-1rem)] xl:w-[calc(40%-2rem)] relative group cursor-pointer overflow-hidden bg-[#F8F9FA]">
          <img
            src={modelImg}
            alt="Model with jewelry"
            className="absolute inset-0 w-full h-full object-cover block object-center scale-[1.05]"
          />
          {/* BIG SALE Overlay */}
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-20">
            <div className="bg-white/80 backdrop-blur-sm p-8 md:p-10 w-fit min-w-[260px] shadow-sm transition-all duration-500 group-hover:-translate-y-1">
              <span className="text-[13px] text-[#CB927A] mb-2 block font-medium tracking-wider">
                Upto 50% OFF
              </span>
              <h3 className="font-serif text-3xl md:text-5xl text-[#222222] mb-6 leading-none uppercase tracking-wide">
                BIG SALE
              </h3>

              <button className="text-[14px] text-[#222222] font-semibold flex items-center gap-1 transition-colors duration-300">
                <span className="relative pb-0.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:transition-all after:duration-500 group-hover:after:w-full group-hover:after:bg-[#000]">
                  Shop Now
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Banners Layout */}
      <div className="container mx-auto px-4 max-w-7xl mt-8 md:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          {/* Banner 1: Classic Diamond Ring */}
          <div className="relative group overflow-hidden cursor-pointer h-[250px] md:h-[300px] w-full bg-[#f4f4f4]">
            <img
              src={banner1Img}
              alt="Classic Diamond Ring"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-10 p-8 md:p-10 flex flex-col justify-center z-10 w-[calc(100%-2rem)] sm:w-[50%] md:w-[55%] lg:w-[50%] xl:w-[48%] h-[80%] md:h-[75%]  backdrop-blur-sm">
              <span className="text-[12px] md:text-[13px] text-[#222222] mb-2 block font-medium tracking-wide">
                Upto 80% Off
              </span>
              <h3 className="font-serif text-2xl md:text-[32px] text-[#222222] mb-5 leading-tight">
                Classic
                <br />
                Diamond Ring
              </h3>
              <button className="w-fit text-[14px] text-[#222222] font-semibold flex items-center gap-1 transition-colors duration-300">
                <span className="relative pb-0.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:transition-all after:duration-500 group-hover:after:w-full group-hover:after:bg-[#000]">
                  Shop Now
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

          {/* Banner 2: Make Your Style Everyday */}
          <div className="relative group overflow-hidden cursor-pointer h-[250px] md:h-[300px] w-full bg-[#f4f4f4]">
            <img
              src={banner2Img}
              alt="Make Your Style Everyday"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-10 p-8 md:p-10 flex flex-col justify-center z-10 w-[calc(100%-2rem)] sm:w-[50%] md:w-[55%] lg:w-[50%] xl:w-[48%] h-[80%] md:h-[75%]  backdrop-blur-sm">
              <span className="text-[12px] md:text-[13px] text-[#222222] mb-2 block font-medium tracking-wide">
                100% Original
              </span>
              <h3 className="font-serif text-2xl md:text-[32px] text-[#222222] mb-5 leading-tight">
                Make Your
                <br />
                Style Everyday
              </h3>
              <button className="w-fit text-[14px] text-[#222222] font-semibold flex items-center gap-1 transition-colors duration-300">
                <span className="relative pb-0.5 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:transition-all after:duration-500 group-hover:after:w-full group-hover:after:bg-[#000]">
                  Shop Now
                </span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreCollections;
