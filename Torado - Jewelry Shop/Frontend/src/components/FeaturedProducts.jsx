import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Star,
  Heart,
  ShoppingCart,
  Eye,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../Context/WishlistContext";

import img1 from "../assets/Landing/Featured Products/imgi_1_product-1.png";
import img2 from "../assets/Landing/Featured Products/imgi_3_product-2.png";
import img3 from "../assets/Landing/Featured Products/imgi_4_product-3.png";
import img4 from "../assets/Landing/Featured Products/imgi_5_product-4.png";
import img5 from "../assets/Landing/Featured Products/imgi_35_product-5.png";
import img6 from "../assets/Landing/Featured Products/imgi_55_product-6.png";
import img7 from "../assets/Landing/Featured Products/imgi_53_product-8.png";
import img8 from "../assets/Landing/Featured Products/imgi_56_product-13.png";
import img9 from "../assets/Landing/Featured Products/imgi_57_product-15.png";
import img10 from "../assets/Landing/Featured Products/imgi_54_product-18.png";

const products = [
  {
    id: 1,
    name: "Engagement Lady Ring",
    price: "$150.00",
    image: img1,
    badge: "New!",
  },
  {
    id: 2,
    name: "High Quality Necklace",
    price: "$350.00",
    image: img2,
  },
  {
    id: 3,
    name: "New Fashion Earring",
    price: "$100.00",
    image: img3,
  },
  {
    id: 4,
    name: "New Fashion Earring",
    price: "$100.00",
    image: img4,
    badge: "Sale!",
  },
  {
    id: 5,
    name: "Diamond Studs",
    price: "$250.00",
    image: img5,
  },
  {
    id: 6,
    name: "Gold Bangle",
    price: "$180.00",
    image: img6,
  },
  {
    id: 7,
    name: "Sapphire Ring",
    price: "$420.00",
    image: img7,
  },
  {
    id: 8,
    name: "Pearl Necklace",
    price: "$299.00",
    image: img8,
    badge: "Sale!",
  },
  {
    id: 9,
    name: "Silver Bracelet",
    price: "$125.00",
    image: img9,
  },
  {
    id: 10,
    name: "Ruby Pendant",
    price: "$510.00",
    image: img10,
    badge: "New!",
  },
];

const FeaturedProducts = () => {
  const [startIndex, setStartIndex] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();

  // We'll calculate translateX percentage based on index.
  // We'll set the container to overflow-hidden, and map through all products.
  // To avoid complex infinite loop logic with clones right now, we'll slide up to the end and visually wrap.
  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl relative">
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 tracking-tight text-center mb-16">
          Featured Products
        </h2>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-[24px] md:left-[36px] top-[48%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-md text-[#D8A790] hover:bg-[#D8A790] hover:text-white transition-colors border border-[#F0EBE6] z-20"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-[24px] md:right-[36px] top-[48%] -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-md text-[#D8A790] hover:bg-[#D8A790] hover:text-white transition-colors border border-[#F0EBE6] z-20"
        >
          <ArrowRight size={16} strokeWidth={1.5} />
        </button>

        {/* Product Slider Wrapper */}
        <div className="px-4 md:px-8">
          <div className="overflow-hidden p-1 -m-1">
            <div className="flex">
              {/* 
                Render a wide track. We duplicate the products array so it can scroll further. 
                Applying the transition and transform on the individual children ensures it scales perfectly 
                on mobile (100% width) vs desktop (25% width) without media query logic in JS.
              */}
              {[...products, ...products].map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="w-full min-w-[100%] sm:min-w-[50%] lg:min-w-[25%] px-3 flex flex-col group cursor-pointer transition-transform duration-500 ease-in-out"
                  style={{
                    transform: `translateX(calc(-100% * ${startIndex}))`,
                  }}
                >
                  {/* Image Container */}
                  <div className="relative w-full aspect-square bg-[#F7F6F5] mb-5 overflow-hidden flex items-center justify-center p-6">
                    {/* Badge ribbon */}
                    {product.badge && (
                      <div className="absolute top-4 -left-10 w-[140px] bg-[#C59B87] text-white text-[12px] font-medium tracking-wide py-1 text-center -rotate-45 z-10">
                        {product.badge}
                      </div>
                    )}

                     <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
                      {[
                        { 
                          icon: Heart, 
                          delay: "delay-0", 
                          action: () => addToWishlist(product),
                          isActive: isInWishlist(product.id)
                        },
                        { 
                          icon: ShoppingCart, 
                          delay: "delay-75", 
                          action: () => addToCart(product, 1) 
                        },
                        { 
                          icon: Eye, 
                          delay: "delay-150", 
                          action: null 
                        },
                      ].map((actionItem, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            if (actionItem.action) {
                              e.preventDefault();
                              e.stopPropagation();
                              actionItem.action();
                            }
                          }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm transition-all duration-500 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 ${actionItem.delay} ${
                            actionItem.isActive 
                            ? "bg-[#CB927A] text-white" 
                            : "bg-white text-gray-700 hover:bg-[#CB927A] hover:text-white"
                          }`}
                        >
                          <actionItem.icon 
                            size={18} 
                            strokeWidth={1.5} 
                            fill={actionItem.isActive ? "currentColor" : "none"}
                          />
                        </button>
                      ))}
                    </div>

                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply [clip-path:inset(4px_1px)] transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  {/* Stars */}
                  <div className="flex items-center gap-1 mb-2.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-[#C59B87] text-[#C59B87]"
                      />
                    ))}
                  </div>

                  {/* Details */}
                  <h3 className="font-serif text-[17px] md:text-[18px] text-[#222222] mb-1.5 transition-colors group-hover:text-[#D8A790]">
                    {product.name}
                  </h3>
                  <p className="text-[#C59B87] text-[14px] font-medium">
                    {product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
