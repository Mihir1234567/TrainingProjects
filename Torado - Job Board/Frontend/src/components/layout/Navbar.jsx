import { useState, useEffect, useMemo } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  ChevronDown,
  UserPlus,
  FileText,
  ChevronRight,
} from "lucide-react";
import logo from "../../assets/Logo/logoMain.svg";
import blogsData from "../../data/blogs.json";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Extract unique Authors
  const authors = useMemo(() => {
    const unique = new Map();
    blogsData.forEach((blog) => {
      if (blog.authorId && !unique.has(blog.authorId)) {
        unique.set(blog.authorId, {
          label: blog.author,
          to: `/blog/author/${blog.authorId}`,
        });
      }
    });
    return Array.from(unique.values());
  }, []);

  // Extract unique Categories
  const categories = useMemo(() => {
    const unique = new Map();
    blogsData.forEach((blog) => {
      if (blog.categoryId && !unique.has(blog.categoryId)) {
        unique.set(blog.categoryId, {
          label: blog.category,
          to: `/blog/category/${blog.categoryId}`,
        });
      }
    });
    return Array.from(unique.values());
  }, []);

  // Extract unique Tags
  const tags = useMemo(() => {
    const unique = new Set();
    const tagItems = [];
    blogsData.forEach((blog) => {
      if (blog.tags) {
        blog.tags.forEach((tag) => {
          if (!unique.has(tag)) {
            unique.add(tag);
            tagItems.push({ label: tag, to: `/blog/tag/${tag}` });
          }
        });
      }
    });
    return tagItems;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    {
      title: "Home",
      items: [
        { label: "Home Demo - 1", to: "/" },
        { label: "Home Demo - 2", to: "/" },
        { label: "Home Demo - 3", to: "/" },
        { label: "Home Demo - 4", to: "/" },
      ],
    },
    {
      title: "Find A Job",
      items: [
        { label: "Job ", to: "/jobs" },
        { label: "Job Detail", to: "/job/1" },
        { label: "Apply For A Job", to: "/apply-job" },
        { label: "Post A Job", to: "/post-job" },
      ],
    },
    {
      title: "Recruiters",
      items: [
        { label: "Recruiters", to: "/recruiters" },
        { label: "Freelancer", to: "/freelancers" },
        { label: "Freelancer Details", to: "/freelancers" },
      ],
    },
    {
      title: "Candidates",
      items: [
        { label: "Candidate", to: "/candidates" },
        { label: "Candidate Details", to: "/candidates" },
        { label: "Company Listing", to: "/company-listing" },
        { label: "Company Details", to: "/company-details" },
        { label: "User Dashboard", to: "/user-dashboard" },
      ],
    },
    {
      title: "Blog",
      items: [
        { label: "Blog", to: "/blog" },
        { label: "Author", to: "/blog", subItems: authors },
        { label: "Categories", to: "/blog", subItems: categories },
        { label: "Tags", to: "/blog", subItems: tags },
        { label: "Blog Details", to: "/blog" },
      ],
    },
    {
      title: "Pages",
      items: [
        { label: "About Us", to: "/about-us" },
        { label: "Pricing", to: "/pricing" },
        { label: "FAQ's", to: "/faq" },
        { label: "Login / Register  ", to: "/login" },
        { label: "Contact Us", to: "/contact" },
        { label: "Terms Of Services", to: "/terms-of-services" },
        { label: "Privacy Policy", to: "/privacy-policy" },
        { label: "404 Error", to: "/404" },
      ],
    },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header
        className={`h-18 lg:h-22.5 w-full bg-white border-b border-slate-200 flex items-center transition-all duration-300 ease-in-out ${
          isSticky
            ? "fixed top-0 left-0 z-[100] shadow-md animate-slideDown"
            : "relative z-[100]"
        }`}
      >
        <div className="w-full px-6 lg:px-12 flex items-center justify-between transition-all duration-300 ease-in-out">
          {/* Logo */}
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Torado Logo"
              className="h-7 lg:h-9 w-auto object-contain transition-all duration-300 ease-in-out"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 mx-auto transition-all duration-300 ease-in-out">
            {navItems.map((item, index) => (
              <NavDropdown key={index} title={item.title} items={item.items} />
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6 font-semibold shrink-0">
            <Link
              to="/login"
              className="text-[#083e47] hover:text-torado-green-600 transition-colors text-sm font-normal"
            >
              Login / Register
            </Link>

            {/* Post Job - Desktop (XL+) */}
            <Link
              to="/post-job"
              className="hidden xl:inline-flex relative overflow-hidden group items-center justify-center py-2 px-6 rounded-lg font-semibold text-sm whitespace-nowrap bg-[#5B6CF6] text-white shadow-sm hover:shadow-md transition-all"
            >
              <span className="absolute inset-0 w-full h-full bg-[#083E47] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
              <span className="relative z-10">Post A Job</span>
            </Link>

            {/* Post Job - Tablet (LG only) */}
            <Link
              to="/post-job"
              className="hidden lg:inline-flex xl:hidden items-center justify-center w-10 h-10 rounded-lg bg-[#5B6CF6] text-white hover:bg-torado-brand-hover shadow-sm transition-colors"
              title="Post A Job"
            >
              <UserPlus size={20} />
            </Link>

            {/* Upload CV - Desktop (XL+) */}
            <button className="hidden xl:inline-flex relative overflow-hidden group items-center justify-center py-2 px-6 rounded-lg font-semibold text-sm whitespace-nowrap border border-torado-green-600 text-black bg-white shadow-sm hover:shadow-md transition-all">
              <span className="absolute inset-0 w-full h-full bg-[#083E47] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-700 ease-in-out">
                Upload Your CV
              </span>
            </button>

            {/* Upload CV - Tablet (LG only) */}
            <button
              className="hidden lg:inline-flex xl:hidden items-center justify-center w-10 h-10 rounded-lg border border-torado-green-600 text-slate-700 bg-white hover:bg-slate-50 transition-colors"
              title="Upload Your CV"
            >
              <FileText size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-slate-700 hover:text-torado-green-600 transition-colors"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay & Sidebar */}
      <div
        className={`fixed inset-0 z-[9999] lg:hidden transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={toggleMenu}
        />

        {/* Sidebar */}
        <div
          className={`absolute right-0 top-0 h-full w-[90%] max-w-100 bg-white shadow-2xl transition-transform duration-300 transform flex flex-col ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <Link to="/" onClick={toggleMenu} className="flex items-center">
              <img
                src={logo}
                alt="Torado Logo"
                className="h-9 w-auto object-contain"
              />
            </Link>
            <button
              onClick={toggleMenu}
              className="text-slate-700 hover:text-torado-green-600 transition-colors"
            >
              <X size={24} strokeWidth={2.5} />
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-2">
            {navItems.map((item, index) => (
              <NavDropdownMobile
                key={index}
                title={item.title}
                items={item.items}
                onClose={toggleMenu}
              />
            ))}

            <div className="mt-6 flex flex-col gap-4">
              <Link
                to="/login"
                className="text-torado-green-600 font-medium text-base"
                onClick={toggleMenu}
              >
                Login / Register
              </Link>

              <div className="flex gap-3">
                <Link
                  to="/post-job"
                  className="relative overflow-hidden group flex-1 py-3 rounded-md bg-torado-green-500 text-white font-medium text-sm flex items-center justify-center transition-all"
                  onClick={toggleMenu}
                >
                  <span className="absolute inset-0 w-full h-full bg-[#083E47] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
                  <span className="relative z-10">Post A Job</span>
                </Link>
                <button className="relative overflow-hidden group flex-1 py-3 rounded-md bg-torado-green-500 text-white font-medium text-sm flex items-center justify-center transition-all">
                  <span className="absolute inset-0 w-full h-full bg-[#083E47] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-in-out origin-center"></span>
                  <span className="relative z-10">Upload Your CV</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Placeholder to prevent layout shift when sticky */}
      {isSticky && <div className="h-18 lg:h-22.5 w-full bg-transparent"></div>}
    </>
  );
};

const NavDropdown = ({ title, items = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useState(null);
  const location = useLocation();

  // Check if any child item is active
  const isActive = useMemo(() => {
    const checkActive = (navItems) => {
      return navItems.some((item) => {
        if (item.to === location.pathname) return true;
        if (item.subItems) return checkActive(item.subItems);
        return false;
      });
    };
    return checkActive(items);
  }, [items, location.pathname]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className="relative group h-full flex items-center"
      onClick={() => setIsOpen(!isOpen)}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div
        className={`flex items-center gap-1 font-semibold transition-all duration-300 ease-in-out text-[13px] leading-[20px] xl:text-base py-4 cursor-pointer select-none ${
          isActive
            ? "text-torado-green-600"
            : "text-[#083e47] hover:text-torado-green-600"
        }`}
      >
        {title}
        <ChevronDown
          size={16}
          className={`mt-0.5 stroke-3 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Dropdown Menu */}
      {items.length > 0 && (
        <div
          className={`absolute top-[80%] left-0 pt-4 transition-all duration-300 transform z-50 min-w-50 ${
            isOpen
              ? "visible opacity-100 translate-y-0"
              : "invisible opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <div className="bg-white rounded-lg shadow-xl border border-slate-100 py-2 overflow-visible relative">
            {items.map((item, index) => (
              <div key={index} className="relative group/sub">
                <Link
                  to={item.to}
                  className={`flex items-center justify-between w-60 px-6 py-3 text-[11px] xl:text-sm font-semibold transition-colors ${
                    location.pathname === item.to
                      ? "text-torado-green-600 bg-slate-50"
                      : "text-slate-600 hover:text-torado-green-600 hover:bg-slate-50"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent closing main dropdown when clicking sub-items if desired, or let it close (usually close is better for links)
                    // If it has subItems, might want to stop propagation to keep open?
                    // User requirement is mostly top level.
                  }}
                >
                  {item.label}
                  {item.subItems && <ChevronRight size={14} />}
                </Link>

                {/* Nested Sub-Dropdown - Keep hover for sub-menus for now or simple list */}
                {item.subItems && (
                  <div className="absolute top-0 left-full pl-2 invisible group-hover/sub:visible opacity-0 group-hover/sub:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover/sub:translate-x-0 z-50">
                    <div className="bg-white rounded-lg shadow-xl border border-slate-100 py-2 w-56 max-h-[400px] overflow-y-auto">
                      {item.subItems.map((sub, idx) => (
                        <Link
                          key={idx}
                          to={sub.to}
                          className={`block px-5 py-2.5 text-[11px] xl:text-sm font-medium transition-colors ${
                            location.pathname === sub.to
                              ? "text-torado-green-600 bg-slate-50"
                              : "text-slate-600 hover:text-torado-green-600 hover:bg-slate-50"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const NavDropdownMobile = ({ title, items = [], onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-50 last:border-0">
      <div
        className={`font-semibold text-base py-3 flex items-center justify-between cursor-pointer transition-colors ${
          isOpen
            ? "text-torado-green-600"
            : "text-slate-700 hover:text-torado-green-600"
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180 text-torado-green-500" : "text-slate-400"
          }`}
        />
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100 pb-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 pl-4">
          {items.map((item, idx) => (
            <div key={idx}>
              <Link
                to={item.to}
                className="block py-2 text-sm text-slate-500 hover:text-torado-green-600 transition-colors"
                onClick={onClose}
              >
                {item.label}
              </Link>
              {/* Simple rendering for sub-items in mobile if needed, usually flattened or nested further. For now keeping 1-level nesting mainly */}
              {item.subItems && (
                <div className="pl-4 flex flex-col gap-1 mt-1 border-l-2 border-slate-100">
                  {item.subItems.map((sub, subIdx) => (
                    <Link
                      key={subIdx}
                      to={sub.to}
                      className="block py-1.5 text-xs text-slate-400 hover:text-torado-green-600 transition-colors"
                      onClick={onClose}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
