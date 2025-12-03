import React from "react";

const sliderItems = [
  { number: "15,254", text: "total books" },
  { number: "1,258", text: "authors" },
  { number: "20,898", text: "books sold" },
  { number: "97%", text: "happy customer" },
  { number: "15,254", text: "total books" },
  { number: "1,258", text: "authors" },
  { number: "20,898", text: "books sold" },
  { number: "97%", text: "happy customer" },
];

const InfiniteSlider = () => {
  const extendedSliderItems = [...sliderItems, ...sliderItems];
  const SPARKLE_IMAGE_URL = "/src/assets/iconscroll.png";

  return (
    <div className="relative w-full py-4 overflow-hidden bg-[#f9f5f0] b shadow-inner">
      <style>{`
                @keyframes stat-marquee { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
                .animate-stat-marquee { animation: stat-marquee 20s linear infinite; animation-play-state: running; }
                .animate-stat-marquee:hover { animation-play-state: paused; }
            `}</style>

      <div className="flex">
        <div className="flex animate-stat-marquee">
          {extendedSliderItems.map((item, index) => (
            <div key={index} className="flex items-center flex-shrink-0">
              <p className="text-xl md:text-1xl font-medium whitespace-nowrap tracking-tight px-4 sm:px-8">
                <span className="font-bold text-[#027a36]">{item.number}</span>
                <span className="text-[#000] ml-2">{item.text}</span>
              </p>
              <img
                src={SPARKLE_IMAGE_URL}
                alt="Decorative Star Separator"
                className="mx-8 h-5 w-5 flex-shrink-0 hidden sm:block"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InfiniteSlider;
