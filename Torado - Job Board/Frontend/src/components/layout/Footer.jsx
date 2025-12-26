import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import logo from "../../assets/Logo/logoMain.svg";

const styles = {
  footer: "bg-white pt-12 md:pt-20 pb-8 md:pb-10 border-t border-slate-100",
  container: "container mx-auto px-4 sm:px-6 lg:px-12",

  // Refined Grid: 1 col on mobile, 2 col on tablet, 12-col on desktop
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-12 mb-12 md:mb-20",

  // Column 1: Brand
  brandCol: "lg:col-span-4 space-y-5 md:space-y-6",
  logo: "h-9 md:h-10 w-auto",
  description:
    "text-slate-500 text-sm md:text-[15px] leading-relaxed max-w-sm lg:max-w-xs",
  socialWrapper: "flex items-center gap-3",
  socialIcon:
    "w-9 h-9 md:w-10 md:h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-[#5BBB7B] hover:text-white transition-all duration-300 cursor-pointer",

  // Column Headers
  colHeading: "text-base md:text-[18px] font-bold text-[#083E47] mb-5 md:mb-8",

  // Column 2: Resources
  resourcesCol: "lg:col-span-3",
  // 2 columns for links on all screens for better balance
  linkGrid: "grid grid-cols-2 gap-x-4 gap-y-3",
  footerLink:
    "text-slate-500 hover:text-[#5BBB7B] transition-colors text-[14px] md:text-[14.5px] font-medium cursor-pointer",

  // Column 3: Newsletter
  newsletterCol: "lg:col-span-3 space-y-4 md:space-y-6",
  newsletterText: "text-slate-500 text-[14px] md:text-[14.5px] leading-relaxed",
  inputWrapper: "relative mt-2 max-w-sm",
  input:
    "w-full bg-[#f8faf9] border border-slate-100 rounded-lg px-4 py-3 md:py-3.5 pr-14 text-sm focus:outline-none focus:border-[#5BBB7B] transition-colors",
  submitBtn:
    "absolute right-1.5 top-1.5 bottom-1.5 w-[42px] md:w-[46px] bg-[#5BBB7B] text-white rounded-md flex items-center justify-center overflow-hidden group transition-all",
  submitBtnDoor:
    "absolute inset-0 bg-[#083E47] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-in-out origin-center",

  // Column 4: Categories
  categoriesCol: "lg:col-span-2 space-y-3 md:space-y-4",
  categoryLink:
    "block text-slate-500 hover:text-[#5BBB7B] transition-colors text-[14px] md:text-[14.5px] font-medium cursor-pointer",

  // Bottom section
  bottom:
    "border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-center items-center text-center gap-2",
  copyright:
    "text-slate-500 text-[13px] md:text-[15px] font-medium leading-relaxed",
  toradoSpan:
    "text-[#5BBB7B] cursor-pointer hover:text-[#083E47] transition-colors",
  envyLink:
    "text-[#5BBB7B] font-bold hover:underline cursor-pointer hover:text-[#083E47] transition-all",
};

const Footer = () => {
  const socialIcons = [
    { Icon: Facebook },
    { Icon: Twitter },
    { Icon: Instagram },
    { Icon: Linkedin },
  ];

  const resourceLinks = [
    "About Us",
    "Post Jobs",
    "Candidates",
    "Blog Grid",
    "FAQ",
    "Contact Us",
    "Jobs Listing",
    "Privacy",
    "Jobs details",
    "Terms",
  ];

  const categories = [
    "Design & Creativity",
    "Development And IT",
    "Writing & Translation",
    "Programming & Tech",
    "Technical Marketing",
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <img src={logo} alt="Torado Logo" className={styles.logo} />
            <p className={styles.description}>
              Torado is the heart of the design people & the best resource to
              find and connect with designers and jobs worldwide.
            </p>
            <div className={styles.socialWrapper}>
              {socialIcons.map((item, idx) => (
                <div key={idx} className={styles.socialIcon}>
                  <item.Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Resources Column */}
          <div className={styles.resourcesCol}>
            <h3 className={styles.colHeading}>Resources</h3>
            <div className={styles.linkGrid}>
              {resourceLinks.map((link, idx) => (
                <span key={idx} className={styles.footerLink}>
                  {link}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter Column */}
          <div className={styles.newsletterCol}>
            <h3 className={styles.colHeading}>Subscribe Our Newsletter</h3>
            <p className={styles.newsletterText}>
              Monthly Tips And Tricks to Accelerate Income:
            </p>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Your email address"
                className={styles.input}
              />
              <button className={styles.submitBtn} aria-label="Subscribe">
                <span className={styles.submitBtnDoor}></span>
                <Send size={18} className="relative z-10" />
              </button>
            </div>
          </div>

          {/* Job Categories Column */}
          <div className={styles.categoriesCol}>
            <h3 className={styles.colHeading}>Job Categories</h3>
            <div className="space-y-3">
              {categories.map((cat, idx) => (
                <span key={idx} className={styles.categoryLink}>
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()}{" "}
            <span className={styles.toradoSpan}>Torado</span>. All rights
            reserved. Owned by{" "}
            <span className={styles.envyLink}>EnvyTheme</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
