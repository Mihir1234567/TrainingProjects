import React from "react";
import freeDeliveryIcon from "../assets/Landing/Benefits Bar/imgi_18_free-delivery.svg";
import supportIcon from "../assets/Landing/Benefits Bar/imgi_19_support.svg";
import paymentMethodIcon from "../assets/Landing/Benefits Bar/imgi_20_payment-method.svg";
import returnBoxIcon from "../assets/Landing/Benefits Bar/imgi_21_return-box.svg";

const benefitsData = [
  {
    icon: freeDeliveryIcon,
    title: "Free Shipping",
    description: "What you want, delivered to where you want",
  },
  {
    icon: supportIcon,
    title: "Support 24/7",
    description: "24/7 We are customer care best support",
  },
  {
    icon: paymentMethodIcon,
    title: "Flexible Payment",
    description: "Pay with the world's top payment methods",
  },
  {
    icon: returnBoxIcon,
    title: "30 Days Return",
    description: "There is a return facility within 30 days",
  },
];

const Benefits = () => {
  return (
    <section className="py-10 md:py-16 xl:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 xl:gap-12">
          {benefitsData.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 sm:space-x-4"
            >
              <div className="flex-shrink-0">
                <img
                  src={benefit.icon}
                  alt={benefit.title}
                  className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-lg sm:text-xl font-serif text-gray-900 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm sm:text-md text-gray-700 leading-relaxed font-normal">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
