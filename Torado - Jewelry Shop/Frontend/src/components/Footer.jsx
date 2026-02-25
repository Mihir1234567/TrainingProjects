import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

import logo from "../assets/Logo/logoMain.png";
import maestro from "../assets/Footer/imgi_50_maestar-card.png";
import visa from "../assets/Footer/imgi_51_visa.png";
import paypal from "../assets/Footer/imgi_52_paypal.png";
import amex from "../assets/Footer/imgi_53_american-express.png";
import discover from "../assets/Footer/imgi_54_discover.png";

const Footer = () => {
  return (
    <footer className="bg-white pt-20 pb-6 border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          {/* Column 1: Brand & Socials */}
          <div className="lg:col-span-1">
            <img src={logo} alt="Torado" className="h-8 mb-6 object-contain" />
            <p className="text-gray-600 text-[15px] leading-relaxed mb-6 pr-4">
              We provide the highest quality jewelry to our customers.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#FAFAFA] flex items-center justify-center text-[#C59B87] hover:bg-[#C59B87] hover:text-white transition-colors duration-700 ease-in-out"
              >
                <Facebook size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#FAFAFA] flex items-center justify-center text-[#C59B87] hover:bg-[#C59B87] hover:text-white transition-colors duration-700 ease-in-out"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#FAFAFA] flex items-center justify-center text-[#C59B87] hover:bg-[#C59B87] hover:text-white transition-colors duration-700 ease-in-out"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-[#FAFAFA] flex items-center justify-center text-[#C59B87] hover:bg-[#C59B87] hover:text-white transition-colors duration-700 ease-in-out"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-serif text-[19px] text-gray-900 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-[10px] ">
              {[
                "About Us",
                "Contact Us",
                "FAQ",
                "Terms & Conditions",
                "Privacy Policy",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="relative inline-block text-gray-500 hover:text-[#C59B87] text-[15px] transition-colors pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-[#C59B87] after:transition-transform after:duration-[400ms] after:ease-in-out hover:after:scale-x-100"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h3 className="font-serif text-[19px] text-gray-900 mb-6">
              Useful Links
            </h3>
            <ul className="space-y-[10px]">
              {[
                "Latest News",
                "View Cart",
                "Wishlist",
                "Checkout",
                "Store Locator",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="relative inline-block text-gray-500 hover:text-[#C59B87] text-[15px] transition-colors pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-[#C59B87] after:transition-transform after:duration-[400ms] after:ease-in-out hover:after:scale-x-100"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Categories */}
          <div>
            <h3 className="font-serif text-[19px] text-gray-900 mb-6">
              Categories
            </h3>
            <ul className="space-y-[10px]">
              {["Ring", "Bracelet", "Earrings", "Necklace", "Locket"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="relative inline-block text-gray-500 hover:text-[#C59B87] text-[15px] transition-colors pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-[#C59B87] after:transition-transform after:duration-[400ms] after:ease-in-out hover:after:scale-x-100"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Column 5: Contact Info */}
          <div>
            <h3 className="font-serif text-[19px] text-gray-900 mb-6">
              Contact Info
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin
                  size={18}
                  className="text-[#C59B87] flex-shrink-0 mt-1"
                />
                <span className="text-gray-500 text-[15px] leading-relaxed">
                  94 East 84th Street, 9th Floor, New York, GA 30030
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#C59B87] flex-shrink-0" />
                <a
                  href="mailto:support@torado.com"
                  className="relative inline-block text-gray-500 hover:text-[#C59B87] text-[15px] transition-colors pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-[#C59B87] after:transition-transform after:duration-[400ms] after:ease-in-out hover:after:scale-x-100"
                >
                  support@torado.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#C59B87] flex-shrink-0" />
                <a
                  href="tel:+019478474488"
                  className="relative inline-block text-gray-500 hover:text-[#C59B87] text-[15px] transition-colors pb-0.5 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-[#C59B87] after:transition-transform after:duration-[400ms] after:ease-in-out hover:after:scale-x-100"
                >
                  +01 947 847 4488
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-[14px]">
            © Copyright{" "}
            <span className="text-[#C59B87] font-medium">Torado</span> All
            Rights Reserved by{" "}
            <span className="text-[#C59B87] font-medium">EnvyTheme</span>
          </p>
          <div className="flex items-center gap-2">
            <span className="text-gray-800 font-medium text-[14px] mr-1">
              We accept:
            </span>
            <img
              src={maestro}
              alt="Maestro"
              className="h-[22px] object-contain"
            />
            <img src={visa} alt="Visa" className="h-[22px] object-contain" />
            <img
              src={paypal}
              alt="PayPal"
              className="h-[22px] object-contain"
            />
            <img
              src={amex}
              alt="American Express"
              className="h-[22px] object-contain"
            />
            <img
              src={discover}
              alt="Discover"
              className="h-[22px] object-contain"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
