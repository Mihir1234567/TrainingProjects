import React, { useState } from "react";
import { CheckCircle, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import faqData from "../data/faqs.json";

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState(faqData[0]?.category);
  const [openIndex, setOpenIndex] = useState(0);

  const currentCategory = faqData.find(
    (item) => item.category === activeCategory
  );

  const toggle = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="py-10 md:py-14 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl md:text-3xl font-bold text-slate-800"
        >
          Frequently Asked Questions
        </motion.h1>
        <p className="mt-2 text-slate-500">
          <span className="text-slate-800">Home</span> /{" "}
          <span className="text-green-600">FAQs</span>
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-8 md:gap-10">
          {/* Sidebar */}
          <aside className="w-full md:w-1/4">
            <div className="md:sticky md:top-24 flex md:flex-col overflow-x-auto md:overflow-visible gap-3 pb-4 md:pb-0 no-scrollbar">
              {faqData.map((item) => (
                <motion.button
                  key={item.category}
                  whileHover={{ x: 4 }}
                  onClick={() => {
                    setActiveCategory(item.category);
                    setOpenIndex(0);
                  }}
                  className={`flex-shrink-0 whitespace-nowrap md:whitespace-normal w-auto md:w-full flex items-center gap-3 px-5 py-3 md:py-4 rounded-xl text-left transition
                    ${
                      activeCategory === item.category
                        ? "bg-white shadow text-green-600"
                        : "text-slate-600 hover:bg-white/70"
                    }`}
                >
                  <CheckCircle size={18} />
                  <span className="font-medium">{item.category}</span>
                </motion.button>
              ))}
            </div>
          </aside>

          {/* FAQ Accordion */}
          <main className="md:w-3/4 space-y-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.2,
                      staggerChildren: 0.1,
                    },
                  },
                  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
                }}
                className="space-y-4"
              >
                {currentCategory?.faqs.map((faq, index) => {
                  const isOpen = openIndex === index;

                  return (
                    <motion.div
                      key={faq.question}
                      layout
                      variants={{
                        hidden: { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 },
                      }}
                      className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden"
                    >
                      <button
                        onClick={() => toggle(index)}
                        className="w-full px-6 py-5 md:px-8 md:py-6 flex justify-between items-start text-left"
                        aria-expanded={isOpen}
                      >
                        <span className="font-semibold text-slate-800 pr-6">
                          {faq.question}
                        </span>

                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-green-600"
                        >
                          <Plus size={20} />
                        </motion.span>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "anticipate" }} // Smooth easing
                            className="bg-white overflow-hidden" // Moved background here if needed, ensured overflow-hidden
                          >
                            <div className="px-6 pb-6 md:px-8 md:pb-8 text-slate-600 text-sm leading-relaxed border-t border-transparent">
                              {/* Inner padding container */}
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
