import React, { useState, useMemo, useEffect } from "react";
import { Search, X, Pin } from "lucide-react";
import demosData from "../../data/demosData.json";

// --- STATIC DATA AND HELPERS (Outside component for stability) ---
const categoryConfig = [
  { name: "All Categories", keywords: [] },
  {
    name: "Business",
    keywords: [
      "business",
      "consulting",
      "corporate",
      "agency",
      "startup",
      "finance",
    ],
  },
  {
    name: "eCommerce",
    keywords: ["ecommerce", "store", "shop", "market", "sale"],
  },
  {
    name: "Technology",
    keywords: ["technology", "it", "software", "ai", "cyber", "app"],
  },
  { name: "Corporate", keywords: ["corporate", "business", "company"] },
  { name: "Education", keywords: ["education", "lms", "school", "university"] },
  { name: "Medical", keywords: ["medical", "health", "doctor", "clinic"] },
  { name: "Travel", keywords: ["travel", "tour", "booking", "hotel"] },
  { name: "Restaurant", keywords: ["restaurant", "food", "cafe"] },
  { name: "Job Board", keywords: ["job", "recruitment"] },
  { name: "Banking", keywords: ["banking", "finance"] },
  { name: "Real Estate", keywords: ["real estate", "property"] },
  { name: "Wedding", keywords: ["wedding", "event"] },
  { name: "Agency", keywords: ["agency", "marketing"] },
  { name: "Industry", keywords: ["industry", "factory"] },
  { name: "Retail", keywords: ["retail", "store"] },
  { name: "IT", keywords: ["it", "software"] },
  { name: "LMS", keywords: ["lms", "learning"] },
  { name: "Health", keywords: ["health", "medical"] },
  { name: "Hotel", keywords: ["hotel", "resort"] },
  { name: "Creative", keywords: ["creative", "portfolio"] },
  { name: "Beauty", keywords: ["beauty", "spa"] },
  { name: "Booking", keywords: ["booking", "appointment"] },
  { name: "Food", keywords: ["food", "dining"] },
  { name: "Directory", keywords: ["directory", "listing"] },
  { name: "Services", keywords: ["services", "cleaning"] },
  { name: "Finance", keywords: ["finance", "money"] },
  { name: "Gaming", keywords: ["gaming", "esports"] },
  { name: "Startup", keywords: ["startup", "launch"] },
  { name: "Entertainment", keywords: ["entertainment", "music"] },
  { name: "Events", keywords: ["events", "conference"] },
  { name: "Nonprofit", keywords: ["nonprofit", "charity"] },
  { name: "Consulting", keywords: ["consulting", "advisory"] },
  { name: "Charity", keywords: ["charity", "donation"] },
  { name: "Transport", keywords: ["transport", "logistics"] },
  { name: "Art", keywords: ["art", "design"] },
  { name: "Auto", keywords: ["auto", "car"] },
  { name: "Club", keywords: ["club", "nightclub"] },
  { name: "NFT", keywords: ["nft", "crypto"] },
  { name: "Marketing", keywords: ["marketing", "seo"] },
  { name: "Car", keywords: ["car", "automotive"] },
  { name: "Broadband", keywords: ["broadband", "internet"] },
  { name: "Environment", keywords: ["environment", "green"] },
  { name: "Photography", keywords: ["photography", "photo"] },
  { name: "Cryptocurrency", keywords: ["crypto", "bitcoin"] },
  { name: "App", keywords: ["app", "mobile"] },
];

const itemBelongsToCategory = (demo, categoryName) => {
  if (!demo || !demo.title) return false;
  if (categoryName === "All Categories") return true;

  const titleLower = demo.title.toLowerCase();

  // Direct category check
  if (
    demo.category &&
    demo.category.toLowerCase().includes(categoryName.toLowerCase())
  )
    return true;

  const config = categoryConfig.find((c) => c.name === categoryName);
  if (!config) return false;

  // Special IT handling
  if (
    categoryName === "IT" &&
    (demo.title.includes("IT") || titleLower.includes("technology"))
  )
    return true;

  return config.keywords.some((kw) => titleLower.includes(kw.toLowerCase()));
};

const dynamicCategories = categoryConfig.filter(
  (c) => c.name !== "All Categories"
);

const DemoModal = ({ isOpen = false, onClose }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // 1. Memoize Category Counts (CRITICAL for performance during animation)
  const categoryCounts = useMemo(() => {
    const counts = {};
    categoryConfig.forEach((cat) => {
      if (cat.name === "All Categories") {
        counts[cat.name] = demosData.length;
      } else {
        const base = demosData.filter((d) =>
          itemBelongsToCategory(d, cat.name)
        );
        const hasAdmin = base.some((d) => d.title === "Admin Dashboard");
        counts[cat.name] = hasAdmin ? base.length : base.length + 1;
      }
    });
    return counts;
  }, []);

  // 2. Typing Animation Logic
  useEffect(() => {
    if (!isOpen) return;

    const currentName = dynamicCategories[placeholderIndex].name + "...";

    const typewriter = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentName.length) {
            setDisplayText(currentName.slice(0, displayText.length + 1));
          } else {
            // Pause at full length
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, displayText.length - 1));
          } else {
            setIsDeleting(false);
            setPlaceholderIndex(
              (prev) => (prev + 1) % dynamicCategories.length
            );
          }
        }
      },
      isDeleting ? 40 : 80
    );

    return () => clearTimeout(typewriter);
  }, [displayText, isDeleting, placeholderIndex, isOpen]);

  // 3. Filtered Demos Logic
  const filteredDemos = useMemo(() => {
    let results = [...demosData];

    if (activeCategory !== "All Categories") {
      results = results.filter((d) => itemBelongsToCategory(d, activeCategory));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter(
        (d) =>
          (d.title && d.title.toLowerCase().includes(q)) ||
          (d.label && d.label !== "N/A" && d.label.toLowerCase().includes(q))
      );
    }

    // Pinned Card Logic
    if (!searchQuery.trim()) {
      const adminIndex = results.findIndex(
        (d) => d.title === "Admin Dashboard"
      );
      if (adminIndex > -1) {
        const [admin] = results.splice(adminIndex, 1);
        results.unshift(admin);
      } else {
        const admin = demosData.find((d) => d.title === "Admin Dashboard");
        if (admin) results.unshift(admin);
      }
    }

    return results;
  }, [searchQuery, activeCategory]);

  if (!isOpen) return null;

  const getLabelColor = (label) => {
    switch (label?.toLowerCase()) {
      case "hot":
        return "bg-rose-500";
      case "trending":
        return "bg-amber-400";
      case "popular":
        return "bg-green-500";
      case "top":
        return "bg-blue-500";
      case "rated":
        return "bg-slate-900";
      case "new":
        return "bg-purple-500";
      default:
        return "bg-slate-500";
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Close Button - Responsive Position */}
      <button
        onClick={onClose}
        className="absolute top-3 right-3 md:top-8 md:right-8 z-[110] bg-rose-500 text-white px-4 py-2 md:px-5 md:py-2 rounded-lg font-bold shadow-lg hover:bg-rose-600 transition-all flex items-center gap-2 text-[12px] md:text-sm"
      >
        <X size={16} className="md:w-5 md:h-5" />
        <span className="hidden sm:inline">Close</span>
        <span className="sm:hidden">Close</span>
      </button>

      <div className="relative w-full max-w-[1600px] h-[95vh] md:h-[90vh] bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-300 mx-4 md:mx-auto">
        {/* Sticky Header with Search */}
        <div className="relative shrink-0 bg-white z-30 border-b border-slate-100 p-4 md:p-8">
          <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-gradient-to-r from-rose-50 via-purple-50 to-blue-50 -z-10" />
          <div className="relative w-full">
            <Search
              className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
              md-size={22}
            />
            <input
              type="text"
              placeholder={`Search ${displayText}`}
              className="w-full bg-white border border-slate-200 rounded-lg md:rounded-xl py-3 md:py-4 pl-12 md:pl-14 pr-4 md:pr-6 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-slate-700 text-base md:text-lg transition-all placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-grow overflow-y-auto bg-slate-50/50 custom-scrollbar p-4 md:p-8 space-y-6 md:space-y-8">
          {/* Category Tags - Scrollable with content */}
          <div className="flex flex-wrap gap-2 md:gap-2.5">
            {categoryConfig.map((cat) => {
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-[12px] md:text-[13px] font-semibold transition-all duration-200 border ${
                    isActive
                      ? "bg-purple-600 border-purple-600 text-white shadow-md scale-[1.02] md:scale-105"
                      : "bg-white border-slate-200 text-slate-600 hover:border-purple-300 hover:text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {cat.name}
                  <span
                    className={`text-[10px] md:text-[11px] font-normal ${
                      isActive ? "text-white/80" : "text-slate-400"
                    }`}
                  >
                    ({categoryCounts[cat.name]})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Separator */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          {/* Grid of Demo Cards - Responsive Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-8">
            {filteredDemos.map((demo, idx) => {
              const isPinned =
                idx === 0 && !searchQuery && demo.title === "Admin Dashboard";
              return (
                <a
                  key={demo.title + idx}
                  href={demo.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative bg-white rounded-xl md:rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/11] overflow-hidden bg-slate-100">
                    <img
                      src={demo.image}
                      alt={demo.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) =>
                        (e.target.src =
                          "https://via.placeholder.com/600x400?text=Preview")
                      }
                    />
                    {isPinned && (
                      <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-white p-1.5 md:p-2 rounded-full shadow-md">
                        <Pin
                          className="text-rose-500 fill-rose-500 rotate-12"
                          size={14}
                          md-size={18}
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-4 md:p-5 flex items-center justify-between bg-white border-t border-slate-50">
                    <h3 className="text-sm md:text-[17px] font-bold text-slate-800 line-clamp-1 group-hover:text-purple-600 transition-colors">
                      {demo.title}
                    </h3>
                    <div className="flex gap-1.5 md:gap-2 shrink-0">
                      {demo.title === "Admin Dashboard" ? (
                        <span className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-[4px] text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-white bg-slate-900 shadow-sm">
                          Rated
                        </span>
                      ) : (
                        demo.label &&
                        demo.label !== "N/A" && (
                          <span
                            className={`px-2 py-0.5 md:px-2.5 md:py-1 rounded-[4px] text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-white shadow-sm ${getLabelColor(
                              demo.label
                            )}`}
                          >
                            {demo.label}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredDemos.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 md:py-20 opacity-60">
              <Search className="text-slate-400 mb-4" size={32} md-size={40} />
              <h3 className="text-lg md:text-xl font-bold text-slate-700">
                No results found
              </h3>
              <p className="text-sm md:text-slate-500 mt-2">
                Try adjusting your search or category filter
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; border: 2px solid #f8fafc; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default DemoModal;
