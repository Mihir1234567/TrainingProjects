import React from "react";
import {
  Grid,
  Layers,
  Flag,
  Leaf,
  CreditCard,
  Calendar,
  Briefcase,
} from "lucide-react";
import mattersImg from "../../assets/Home/matters-img-1.png";

const styles = {
  section: "py-10 md:py-16 bg-white",
  container: "container mx-auto px-4 lg:px-12",
  header: "text-center mb-6 md:mb-8",
  title: "text-2xl md:text-3xl lg:text-4xl font-bold text-[#083E47] mb-4",

  subHeaderRow:
    "flex flex-col md:flex-row justify-between items-center gap-4 mb-10 text-center md:text-left",
  subTitle:
    "text-slate-500 font-medium text-sm md:text-base max-w-md md:max-w-none",
  preferenceLink:
    "text-[#083E47] font-bold underline underline-offset-4 hover:text-[#5BBB7B] transition-colors text-sm md:text-[15px]",

  // Tags wrap naturally on mobile and center
  tagsContainer: "flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16",
  tag: "flex items-center gap-2.5 bg-[#F7FAF9] px-4 md:px-5 py-2.5 rounded-lg border border-transparent hover:bg-[#5BBB7B] hover:text-white transition-all duration-300 ease-in-out cursor-pointer group",
  tagIcon: "text-[#5BBB7B] w-4 h-4 group-hover:text-white transition-colors",
  tagText:
    "text-[#083E47] font-semibold text-[12px] md:text-sm group-hover:text-white transition-colors whitespace-nowrap",

  // CTA Card: Changed to flex-col on mobile, flex-row on desktop
  ctaCard:
    "relative bg-[#05264e] rounded-xl overflow-hidden min-h-[220px] flex flex-col md:flex-row items-center p-6 md:p-12",
  ctaContent:
    "relative w-full md:w-3/5 z-10 space-y-3 text-center md:text-left mb-6 md:mb-0",
  ctaTitle: "text-xl md:text-3xl font-bold text-white",
  ctaDescription:
    "text-white/80 text-sm md:text-[15px] leading-relaxed max-w-none md:whitespace-nowrap",
  ctaLink:
    "inline-block text-[#5BBB7B] font-bold underline underline-offset-8 hover:text-white transition-colors text-sm md:text-base",

  // Illustration: Now visible on all screens, controlled by order and sizing
  illustrationWrapper:
    "relative w-full md:w-2/5 h-48 md:h-full flex justify-center md:justify-end items-end",
  illustration:
    "w-full max-w-[280px] md:max-w-full h-auto object-contain object-right-bottom translate-y-2",

  // Background blur effect
  bgDecor: "absolute inset-0 z-0 pointer-events-none",
  bgDecor2:
    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-white/5 rounded-full blur-3xl",
};

const MattersToUs = ({
  title = "What Matters To You?",
  description = "Every month, more than 3 million job seekers visit our website to search for jobs, with more than 130,000 applications per day.",
  ctaTitle = "Go Beyond The Search, Find The Right Community For You.",
  ctaDescription = "Unlike other job platforms, we never assume your gender, race or ethnicity.",
  ctaButtonText = "Read Our Story",
}) => {
  const allTags = [
    { icon: Grid, text: "Frontend Engineer" },
    { icon: Layers, text: "Remote Position" },
    { icon: Flag, text: "Minimum $160,000" },
    { icon: Leaf, text: "Climate companies" },
    { icon: CreditCard, text: "Female Manager" },
    { icon: Calendar, text: "3+ Weeks of PTO" },
    { icon: Briefcase, text: "1-500 Employees" },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <div className="flex flex-col items-center gap-6 mb-10 text-center">
            <p className={styles.subTitle}>{description}</p>
            <div className={styles.preferenceLink}>
              Tell Us Your Preferences
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16 max-w-4xl mx-auto">
          {allTags.map((tag, idx) => (
            <div
              key={idx}
              className={`${styles.tag} ${
                idx === 2 ? "col-span-2 place-self-center md:col-span-auto" : ""
              } justify-self-center md:justify-self-auto w-full md:w-auto justify-center`}
            >
              <tag.icon className={styles.tagIcon} />
              <span className={styles.tagText}>{tag.text}</span>
            </div>
          ))}
        </div>

        <div className={styles.ctaCard}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>{ctaTitle}</h2>
            <p className={styles.ctaDescription}>{ctaDescription}</p>
            <div className={styles.ctaLink}>{ctaButtonText}</div>
          </div>

          <div className={styles.illustrationWrapper}>
            <div className={styles.bgDecor}>
              <div className={styles.bgDecor2}></div>
            </div>
            <img
              src={mattersImg}
              alt="Matters Illustration"
              className={styles.illustration}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MattersToUs;
