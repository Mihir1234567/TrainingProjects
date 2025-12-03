import { Home, MessageCircleDashed } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Reusable Accordion Item Component with Scroll Animation
const AccordionItem = ({ question, answer, isFirst, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Add a slight staggered delay based on index to create a "waterfall" effect
          // if the user scrolls quickly or on initial load
          setTimeout(() => {
            setIsVisible(true);
          }, (index % 2) * 100); // Modulo 5 ensures delay doesn't get too long for items far down
          observer.disconnect(); // Only animate once
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the item is visible
        rootMargin: "50px", // Start triggering slightly before it enters viewport
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.disconnect();
      }
    };
  }, [index]);

  return (
    <div
      ref={elementRef}
      className={`border-gray-300 border-b-[1px] transition-all duration-700 ease-out transform ${
        isFirst ? "border-t-[1px]" : ""
      } ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <button
        className="flex items-center justify-between w-full py-8 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          {/* Icon with subtle rotate/scale animation on hover */}
          <div className="transition-transform duration-300 group-hover:scale-130 ">
            <MessageCircleDashed
              size={24}
              className={`transition-colors-transform duration-300 group-hover:rotate-15  ${
                isOpen
                  ? "text-black"
                  : "text-gray-400 group-hover:text-gray-600"
              }`}
            />
          </div>
          <span className="text-xl font-medium text-gray-800 transition-all duration-300 group-hover:translate-x-1 group-hover:underline">
            {question}
          </span>
        </div>

        {/* Animated +/- Indicator */}
        <div className="relative w-6 h-6 flex items-center justify-center">
          <span
            className={`absolute text-2xl text-gray-500 transition-all duration-300 transform group-hover:scale-150 ${
              isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
          >
            +
          </span>   
          <span
            className={`absolute text-2xl text-gray-800 transition-all duration-300 transform ${
              isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
            }`}
          >
            -
          </span>
        </div>
      </button>

      {/* Smooth Grid Transition for Accordion Content */}
      <div
        className={`grid transition-all duration-500 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mb-8"
            : "grid-rows-[0fr] opacity-0 mb-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pt-2 text-lg text-gray-600 leading-relaxed whitespace-pre-line pl-10">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main FAQ Page Component
const FAQPage = () => {
  // Animation state for the header
  const [headerLoaded, setHeaderLoaded] = useState(false);

  useEffect(() => {
    setHeaderLoaded(true);
  }, []);

  const helpCenterFAQs = [
    {
      question: "How much is shipping?",
      answer:
        "Standard Shipping (3-5 business days) is $7.95 for orders under $75. Standard Shipping is FREE for orders of $75 or more. Expedited Shipping (2-3 business days) is $15.95.",
    },
    {
      question: "Can I expedite my order?",
      answer:
        "Yes! We offer expedited shipping options for an additional fee. Please select the expedited shipping option at checkout for faster delivery.",
    },
    {
      question: "Can I ship to multiple addresses?",
      answer:
        "We are unable to ship to multiple addresses in a single order. If you need to ship to multiple addresses, please place a separate order for each delivery address.",
    },
    {
      question:
        "Do you offer delivery to PO Boxes or Military APO/FPO addresses?",
      answer:
        "Yes, we can ship to PO Boxes and Military APO/FPO addresses via Standard Shipping. Expedited Shipping is not available for these addresses. Please note that delivery times to APO/FPO addresses may take longer than standard delivery due to military handling times.",
    },
    {
      question: "Will I be charged VAT taxes?",
      answer:
        "For international orders, you may be charged VAT (Value Added Tax) and/or customs duties by your local government upon delivery. These charges are the responsibility of the recipient and are not included in the purchase price or shipping cost. We recommend contacting your local customs office for more information on potential charges.",
    },
    {
      question: "What countries do you ship to?",
      answer:
        "Currently, we ship to the United States, Canada, and select international countries. Please check our shipping information page for a full list of countries we ship to.",
    },
    {
      question: "Where can I get tracking info?",
      answer:
        "Once your order has shipped, you will receive a confirmation email with a tracking number and a link to track your package.",
    },
    {
      question: "Have not received my order yet, now what?",
      answer:
        "If your order has not arrived within the estimated delivery time, please check your tracking information for updates. If there are no updates or you have trouble tracking your package, please contact our customer support team for assistance.",
    },
  ];

  const orderingFAQs = [
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept Visa, Mastercard, American Express, Discover, PayPal, and store credit.",
    },
    {
      question: "What is your ordering process?",
      answer:
        "Ordering is easy! Simply browse our products, add the items you want to your cart, and proceed to checkout. You will be guided through the process of providing your shipping and payment information.",
    },
    {
      question: "What if I have an issue with placing an order?",
      answer:
        "If you encounter any issues while placing an order, please contact our customer support team, and we will be happy to assist you.",
    },
    {
      question: "How do I apply a coupon code?",
      answer:
        'To apply a coupon code, enter the code in the "Promo Code" box during checkout and click "Apply". The discount will be applied to your order total if the code is valid.',
    },
    {
      question: "How do I change my order?",
      answer:
        "Once an order has been placed, we are unable to make changes to it. Please contact our customer support team immediately if you need to cancel your order, and we will do our best to assist you.",
    },
    {
      question: "Can I cancel my order?",
      answer:
        "You may be able to cancel your order if it has not yet been processed for shipping. Please contact our customer support team as soon as possible if you wish to cancel your order.",
    },
    {
      question: "What's the status of my order?",
      answer:
        "You can check the status of your order by logging into your account or by using the order tracking link provided in your confirmation email.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We want you to be completely satisfied with your purchase. If you are not satisfied with your order, you may return it within 30 days of purchase for a full refund or exchange. Please note that items must be in their original condition and packaging to be eligible for a return. For more details, please review our full return policy on our website.",
    },
    {
      question: "What if my order arrived damaged or wrong product?",
      answer:
        "If your order arrives damaged or you receive the wrong product, please contact our customer support team immediately. We will send you a replacement or issue a refund.",
    },
    {
      question: "What if part of my order is missing/stolen?",
      answer:
        "If part of your order is missing or you believe it was stolen, please contact our customer support team. We will investigate the issue and do our best to resolve it for you.",
    },
  ];

  return (
    <div className="font-sans bg-gray-50 pb-20">
      {/* Header Section with Scale Animation */}
      <div className="relative w-full h-64 md:h-[400px] flex items-center justify-center overflow-hidden bg-black">
        <img
          src="/src/assets/BlogBanner.jpg"
          alt="Lookbook Background"
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[2000ms] ease-out opacity-60 `}
        />
        <div
          className={`relative z-10 flex flex-col items-center text-white transition-all duration-1000 delay-300 `}
        >
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-3 tracking-wide">
            Faqs
          </h1>
          <nav className="flex items-center gap-2 text-[10px] md:text-xs uppercase tracking-widest text-gray-200">
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Home size={12} className="mb-0.5" /> Home
            </Link>
            <span>/</span>
            <span>Faqs</span>
          </nav>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-4 py-16">
        {/* Help Center Section */}
        <section className="mb-20">
          <h2
            className={`text-6xl font-bold text-gray-800 mb-10 transition-all duration-1000 ${
              headerLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            Help Center
          </h2>
          <div className="space-y-0">
            {helpCenterFAQs.map((faq, index) => (
              <AccordionItem
                key={index}
                index={index}
                question={faq.question}
                answer={faq.answer}
                isFirst={index === 0}
              />
            ))}
          </div>
        </section>

        {/* Ordering Section */}
        <section>
          <h2
            className={`text-6xl font-bold text-gray-800 mb-10 transition-all duration-1000 delay-500 ${
              headerLoaded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            Ordering
          </h2>
          <div className="space-y-0">
            {orderingFAQs.map((faq, index) => (
              <AccordionItem
                key={index}
                index={index} // Reset index for stagger effect in this section
                question={faq.question}
                answer={faq.answer}
                isFirst={index === 0}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FAQPage;
