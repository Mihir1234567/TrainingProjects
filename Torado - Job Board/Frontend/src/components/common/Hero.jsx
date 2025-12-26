import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  MapPin,
  Grid,
  Layers,
  FileText,
  ShoppingBag,
  ChevronDown,
  Monitor,
  DollarSign,
  Palette,
  Megaphone,
  Heart,
  Briefcase,
} from "lucide-react";
import heroImg from "../../assets/Home/imgi_1_banner-img-1.png";
import user1 from "../../assets/Home/peopleimg/peopleimg1.png";
import user2 from "../../assets/Home/peopleimg/peopleimg2.png";
import user3 from "../../assets/Home/peopleimg/peopleimg3.png";
import user4 from "../../assets/Home/peopleimg/peopleimg4.png";
import HomeBg1 from "../../assets/Home/HomeBg/Homebg1.png";
import HomeBg2 from "../../assets/Home/HomeBg/Homebg2.png";
import HomeBg3 from "../../assets/Home/HomeBg/Homebg3.png";
import HomeBg4 from "../../assets/Home/HomeBg/Homebg4.png";
import Badge from "../../assets/Home/badge.svg";

const styles = {
  section: `relative w-full bg-slate-50 z-30`, // Added z-30 to stack above BrandLogos (z-20)
  bgDecoration: `absolute top-0 right-0 h-full bg-slate-100/50 -skew-x-12 translate-x-1/4 z-0`,
  bgImage1: `absolute top-0 left-50 w-270 h-270 z-0 pointer-events-none hidden lg:block`,
  bgImage2: `absolute top-25 right-0 w-100 h-100 z-0 pointer-events-none hidden lg:block`,
  bgImage3: `absolute top-2 left-170 w-20 h-20 z-0 pointer-events-none hidden lg:block`,
  bgImage4: `absolute top-180 left-180 w-auto h-8 z-0 pointer-events-none hidden lg:block`,

  container: `mx-auto relative z-10 px-4 md:px-6 lg:px-12`,
  contentWrapper: `flex items-center flex-col gap-12 lg:flex-row xl:gap-20`,
  leftColumn: `flex flex-col items-start text-left w-full lg:w-1/2`,

  subHeading: `text-torado-green-600 font-semibold mb-4 tracking-wide text-base lg:text-lg`,
  mainHeading: `font-bold text-[#083e47] tracking-tight text-[28px] leading-[35px] mb-4 md:text-[40px] md:leading-[1.1] md:mb-6 lg:text-[43px] lg:leading-[40px] lg:mb-4 xl:text-[64px] xl:leading-[1] xl:mb-6`,

  headingAccent: "relative inline-block px-2",
  headingAccentBg: `absolute -bottom-1 left-0 w-full bg-gradient-to-t from-[#E0F5F0] to-transparent -z-10 rounded-md h-1/2`,

  description: `text-slate-500 leading-relaxed max-w-xl text-base mb-8 md:text-lg lg:text-lg lg:mb-10`,

  searchBoxContainer: `w-full bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex items-center mb-8 flex-col p-3 gap-2 sm:grid sm:grid-cols-2 sm:gap-2 sm:p-[15px] xl:flex xl:flex-row xl:p-3 xl:gap-2 relative z-40`,
  searchBoxItem: `flex-1 w-full flex items-center gap-3 px-4 py-3 border-slate-100 border-b sm:border-r sm:border-b xl:border-b-0`,
  searchBoxItemLast: `flex-1 w-full flex items-center gap-3 px-4 py-3 border-slate-100 sm:border-r sm:border-b xl:border-b-0 xl:border-r-0`,
  inputField: `w-full bg-transparent outline-none text-slate-700 placeholder:text-slate-400 font-medium text-sm lg:text-[13px] xl:text-sm`,
  icon: "text-slate-400 shrink-0",

  searchButton: `bg-[#5bbb7b] text-white font-bold rounded-lg transition-all shadow-lg shadow-torado-green-600/20 whitespace-nowrap relative overflow-hidden group w-full py-3.5 sm:w-full sm:px-8 xl:w-auto xl:px-8`,
  searchButtonHover:
    "absolute inset-0 w-full h-full bg-[#083E47] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center",

  trendingContainer: `font-medium text-slate-500 text-sm md:text-lg lg:text-[13px] xl:text-lg`,
  trendingLabel: `text-slate-900 block mb-1 md:inline md:mb-0`,
  trendingLink:
    "text-[#6170e6] underline hover:text-torado-green-600 transition-colors",

  /* ENLARGED RIGHT COLUMN */
  rightColumn: `
    w-full relative flex items-center justify-center 
    h-[500px] mt-8 
    sm:h-[650px] 
    md:h-[750px] 
    lg:w-1/2 lg:h-[750px] lg:mt-0 
    xl:h-[800px]
  `,
  heroImageWrapper: `relative w-full h-full flex justify-center`,
  heroImage: "w-auto h-full max-w-none object-contain scale-110 md:scale-100",

  /* PROJECT COMPLETED CARD - POSITIONED LOWER */
  floatingCard1: `
    bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] 
    flex flex-col absolute z-20 
    pt-6 pb-4 px-6 min-w-[140px]
    /* Mobile: Lower half (60%) */
    top-[60%] left-[5%]
    /* Desktop: Mid-Lower (50%) */
    lg:top-[50%] lg:left-[-10%]
    xl:top-[55%] xl:-left-8
  `,

  cardBadgeGreen: `
    bg-[#5bbb7b] rounded-full flex items-center justify-center 
    absolute -top-7 -right-5
    w-[55px] h-[55px] border-[4px] border-white
    shadow-sm
  `,

  /* PROFESSIONAL CARD - BOTTOM ANCHORED */
  floatingCard2: `
    bg-white rounded-xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] 
    flex items-center z-10 p-3 gap-3 absolute 
    /* Stay at bottom across all screens */
    bottom-[10%] right-[5%] 
    md:bottom-16 md:right-0 
    lg:bottom-12 lg:right-[-5%] 
    xl:bottom-16 xl:-right-10
  `,

  userAvatars: "flex -space-x-2",
  userAvatarImg: `rounded-full border-2 border-white object-cover w-[35px] h-[35px] md:w-[45px] md:h-[45px]`,

  sidebar: `fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end hidden lg:flex`,
  sidebarItem: `bg-white flex flex-col items-center justify-center gap-2 shadow-[-4px_0_15px_rgba(0,0,0,0.05)] border-y border-l border-slate-50 first:rounded-tl-2xl last:rounded-bl-2xl hover:bg-slate-50 transition-all cursor-pointer group lg:w-[75px] lg:h-[67px] xl:w-20 xl:h-22`,
  sidebarIcon: "text-slate-600 group-hover:text-[#5bbb7b] transition-colors",
  sidebarText: `font-bold text-[#083e47] group-hover:text-[#5bbb7b] transition-colors lg:text-[14px] xl:text-[11px]`,
};

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const dropdownRef = useRef(null);

  const categories = [
    { id: "tech", label: "Technology", icon: Monitor },
    { id: "finance", label: "Finance", icon: DollarSign },
    { id: "design", label: "Design", icon: Palette },
    { id: "marketing", label: "Marketing", icon: Megaphone },
    { id: "health", label: "Health", icon: Heart },
    { id: "others", label: "Others", icon: Briefcase },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (category) => {
    setSelectedCategory(category.label);
    setIsOpen(false);
  };

  return (
    <section className={styles.section}>
      {/* Contained background decoration to prevent overflow issues */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className={styles.bgDecoration}></div>
        <img src={HomeBg1} alt="" className={styles.bgImage1} />
        <img src={HomeBg2} alt="" className={styles.bgImage2} />
        <img src={HomeBg3} alt="" className={styles.bgImage3} />
        <img src={HomeBg4} alt="" className={styles.bgImage4} />
      </div>

      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.leftColumn}>
            <span className={styles.subHeading}>
              Employment & Career Opportunities
            </span>

            <h1 className={styles.mainHeading}>
              Find Your{" "}
              <span className={styles.headingAccent}>
                Dream Job
                <span className={styles.headingAccentBg}></span>
              </span>
              <br className="md:hidden lg:inline" />
              And Talent
            </h1>

            <p className={styles.description}>
              Every month, more than 3 million job seekers visit our website to
              search for jobs, with more than 130,000 applications per day.
            </p>

            <div className={styles.searchBoxContainer}>
              <div className={styles.searchBoxItem}>
                <Grid className={styles.icon} size={16} />
                <input
                  type="text"
                  placeholder="Job Title"
                  className={styles.inputField}
                />
              </div>

              <div className={styles.searchBoxItem}>
                <MapPin className={styles.icon} size={16} />
                <input
                  type="text"
                  placeholder="Location"
                  className={styles.inputField}
                />
              </div>

              <div
                className={`${styles.searchBoxItemLast} relative`}
                ref={dropdownRef}
              >
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center gap-3 w-full cursor-pointer group/trigger"
                >
                  <Layers
                    className={`${styles.icon} transition-colors ${
                      isOpen ? "text-torado-green-600" : ""
                    }`}
                    size={16}
                  />
                  <div className="flex-1 text-sm font-medium text-slate-700">
                    {selectedCategory || (
                      <span className="text-slate-400">Category</span>
                    )}
                  </div>
                  <ChevronDown
                    className={`text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    size={14}
                  />
                </div>

                {/* Custom Dropdown Menu */}
                <div
                  className={`absolute left-0 lg:left-1/2 lg:-translate-x-1/2 top-full mt-6 min-w-[220px] bg-white rounded-2xl shadow-2xl border border-slate-50 overflow-hidden z-[100] transition-all duration-300 origin-top
                  ${
                    isOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="p-2 space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleSelect(cat)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-xl transition-all group/item
                          ${
                            selectedCategory === cat.label
                              ? "bg-slate-50 text-torado-green-600 shadow-sm"
                              : "text-slate-600 hover:bg-slate-50 hover:text-torado-green-600"
                          }`}
                      >
                        <div
                          className={`p-1.5 rounded-lg transition-colors ${
                            selectedCategory === cat.label
                              ? "bg-white text-torado-green-600 shadow-sm"
                              : "bg-slate-100 text-slate-400 group-hover/item:text-torado-green-600 group-hover/item:bg-white group-hover/item:shadow-sm"
                          }`}
                        >
                          <cat.icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-[12px] tracking-tight">
                          {cat.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <button className={styles.searchButton}>
                <span className={styles.searchButtonHover}></span>
                <span className="relative z-10">Find A Job</span>
              </button>
            </div>

            <div className={styles.trendingContainer}>
              <span className={styles.trendingLabel}>Trending Keywords:</span>{" "}
              {[
                "Design",
                "Development",
                "Marketing",
                "Affiliate",
                "Senior",
                "Engineer",
              ].map((keyword, index) => (
                <span key={index}>
                  <a href="#" className={styles.trendingLink}>
                    {keyword}
                  </a>
                  {index < 5 && ", "}
                </span>
              ))}
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.heroImageWrapper}>
              <img src={heroImg} alt="Hero" className={styles.heroImage} />
            </div>

            {/* Card 1: Project Completed (Moved to lower 50%-60% zone) */}
            <div className={styles.floatingCard1}>
              <div className={styles.cardBadgeGreen}>
                <img
                  src={Badge}
                  alt="Badge"
                  className="w-6 h-6 object-contain brightness-0 invert"
                />
              </div>

              <div className="flex flex-col text-left">
                <span className="text-lg xl:text-xl font-bold text-[#083e47]">
                  +125M
                </span>
                <span className="text-[11px] xl:text-[13px] text-slate-500 font-medium whitespace-nowrap">
                  Project Completed
                </span>
              </div>
            </div>

            {/* Card 2: Professional (Anchored to Bottom) */}
            <div className={styles.floatingCard2}>
              <div className={styles.userAvatars}>
                {[user1, user2, user3, user4].map((user, i) => (
                  <img
                    key={i}
                    className={styles.userAvatarImg}
                    src={user}
                    alt={`User ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-base xl:text-lg font-bold text-slate-900 leading-tight">
                  +79M
                </span>
                <span className="text-[11px] xl:text-[13px] text-slate-500 font-medium">
                  Professional
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
