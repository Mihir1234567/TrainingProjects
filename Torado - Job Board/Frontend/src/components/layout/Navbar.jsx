import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, UserPlus, FileText } from "lucide-react";
import logo from "../../assets/Logo/logoMain.svg";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header
        className={`h-18 lg:h-22.5 w-full bg-white border-b border-slate-200 flex items-center transition-all duration-300 ease-in-out ${
          isSticky
            ? "fixed top-0 left-0 z-50 shadow-md animate-slideDown"
            : "relative z-50"
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
            <NavDropdown
              title="Home"
              to="/"
              items={[
                { label: "Home Demo - 1", to: "/" },
                { label: "Home Demo - 2", to: "/" },
                { label: "Home Demo - 3", to: "/" },
                { label: "Home Demo - 4", to: "/" },
              ]}
            />
            <NavDropdown
              title="Find A Job"
              to="/jobs"
              items={[
                { label: "Job ", to: "/jobs" },
                { label: "Job Detail", to: "/job/1" },
                { label: "Apply For A Job", to: "/apply-job" },
                { label: "Post A Job", to: "/post-job" },
              ]}
            />
            <NavDropdown
              title="Recruiters"
              to="/recruiters"
              items={[
                { label: "Recruiters", to: "/recruiters" },
                { label: "Freelancer", to: "/recruiters" },
                { label: "Freelancer Details", to: "/recruiters" },
              ]}
            />
            <NavDropdown
              title="Candidates"
              to="/candidates"
              items={[
                { label: "Candidate", to: "/candidates" },
                { label: "Candidate Details", to: "/candidates" },
                { label: "Company Listing", to: "/candidates" },
                { label: "Company Details", to: "/candidates" },
                { label: "User Dashboard", to: "/candidates" },
              ]}
            />
            <NavDropdown
              title="Blog"
              to="/blog"
              items={[
                { label: "Blog", to: "/blog" },
                { label: "Author", to: "/blog" },
                { label: "Categories", to: "/blog" },
                { label: "Tags", to: "/blog" },
                { label: "Blog Details", to: "/blog" },
              ]}
            />
            <NavDropdown
              title="Pages"
              to="/pages"
              items={[
                { label: "About Us", to: "/about" },
                { label: "Pricing", to: "/contact" },
                { label: "FAQ's", to: "/contact" },
                { label: "Login / Register  ", to: "/contact" },
                { label: "Contact Us", to: "/contact" },
                { label: "Terms Of Services", to: "/contact" },
                { label: "Privacy Policy", to: "/contact" },
                { label: "404 Error", to: "/contact" },
              ]}
            />
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

        {/* Mobile Menu Overlay & Sidebar */}
        {/* Mobile Menu Overlay & Sidebar */}
        <div
          className={`fixed inset-0 z-100 lg:hidden transition-opacity duration-300 ${
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
              <NavDropdownMobile to="/" title="Home" onClick={toggleMenu} />
              <NavDropdownMobile
                to="/jobs"
                title="Find A Job"
                onClick={toggleMenu}
              />
              <NavDropdownMobile
                to="/recruiters"
                title="Recruiters"
                onClick={toggleMenu}
              />
              <NavDropdownMobile
                to="/candidates"
                title="Candidates"
                onClick={toggleMenu}
              />
              <NavDropdownMobile to="/blog" title="Blog" onClick={toggleMenu} />
              <NavDropdownMobile
                to="/pages"
                title="Pages"
                onClick={toggleMenu}
              />

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
      </header>
      {/* Placeholder to prevent layout shift when sticky */}
      {isSticky && <div className="h-18 lg:h-22.5 w-full bg-transparent"></div>}
    </>
  );
};

const NavDropdown = ({ title, to, items = [] }) => (
  <div className="relative group h-full flex items-center">
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-1 font-semibold transition-all duration-300 ease-in-out text-[13px] leading-[20px] xl:text-base py-4 ${
          isActive
            ? "text-torado-green-600"
            : "text-[#083e47] hover:text-torado-green-600"
        }`
      }
    >
      {title}
      <ChevronDown
        size={16}
        className="mt-0.5 stroke-3 transition-transform duration-200 group-hover:rotate-180"
      />
    </NavLink>

    {/* Dropdown Menu */}
    {items.length > 0 && (
      <div className="absolute top-[80%] left-0 pt-4 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50 min-w-50">
        <div className="bg-white rounded-lg shadow-xl border border-slate-100 py-2 overflow-hidden">
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="block w-60 px-6 py-3 m-auto text-[11px] xl:text-sm font-semibold text-slate-600 hover:text-torado-green-600"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    )}
  </div>
);

const NavDropdownMobile = ({ title, to, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `font-semibold text-base py-3 flex items-center justify-between ${
        isActive
          ? "text-torado-green-600"
          : "text-slate-700 hover:text-torado-green-600"
      }`
    }
    onClick={onClick}
  >
    {title}
    <ChevronDown size={18} className="text-torado-green-500" />
  </NavLink>
);

export default Navbar;
