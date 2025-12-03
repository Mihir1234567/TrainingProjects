// ProductLayoutClassic.jsx - FINAL REVISION: Added Sticky Bottom "Add to Cart" Bar

import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import ProductCarousel from "/src/components/product/ProductCorousel";
import ALL_PRODUCTS from "/src/components/productsData";
import { Link, useNavigate } from "react-router-dom";
import useRecentlyViewed from "/src/hooks/useRecentlyViwed";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StickyBottomBar from "/src/components/product/StickyBottomBar";
import { FORMAT_MULTIPLIERS as formatPrices } from "/src/constants";
import QuickViewDrawer from "/src/components/QuickViewDrawer";
import {
  faFacebookF,
  faTwitter,
  faPinterestP,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
// Import react-slick styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const CustomAnimatedDropdown = ({
  formatOptions,
  selectedFormat,
  onFormatChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  // ... existing states

  // Handle closing when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (format) => {
    onFormatChange(format);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full md:w-auto">
      {/* The animated dropdown panel that opens upwards */}
      <div
        className={`
                absolute bottom-full mb-[-1px] w-full origin-bottom overflow-hidden rounded-t-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
                transition-all duration-200 ease-in-out
                ${
                  isOpen
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                }
            `}
      >
        <div className="py-1">
          {formatOptions.map((format) => (
            <button
              key={format}
              onClick={() => handleSelect(format)}
              className={`block w-full px-4 py-3 text-left text-sm 
                            ${
                              selectedFormat === format
                                ? "bg-gray-100 text-black font-medium" // Highlight selected
                                : "text-gray-700 hover:bg-gray-50"
                            }
                        `}
            >
              {format}
            </button>
          ))}
        </div>
      </div>

      {/* The trigger button (styled like the bottom of the image) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
                flex w-full items-center justify-between border bg-white px-4 py-3 text-sm text-black shadow-sm 
                focus:outline-none focus:ring-2 focus:ring-gray-900
                ${
                  isOpen
                    ? "rounded-b-md border-gray-300"
                    : "rounded-md border-gray-300"
                }
            `}
      >
        <span>{selectedFormat}</span>
        {/* Animated Chevron (points up as in your image) */}
        <svg
          className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
            isOpen ? "" : "rotate-180"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M14.77 12.79a.75.75 0 01-1.06 0L10 9.06l-3.71 3.73a.75.75 0 11-1.06-1.06l4.25-4.25a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};
// --- Data Setup ---
const mainProductId = 12; // "ABSOLUTION"
const mainProduct = ALL_PRODUCTS.find((p) => p.id === mainProductId);

// Image URLs for the thumbnail gallery (6 items)
const thumbnailUrls = [
  mainProduct?.imageUrl || "", // ABSOLUTION
  "/src/assets/BLACK_SHEEP.webp", // Black Sheep
  "/src/assets/THE_WOMEN.webp", // The Women
  "/src/assets/Playground.webp", // Playground
  "/src/assets/James.webp", // James
  "/src/assets/AnotherGreatBook.webp", // Redemption Echo
];

const relatedProductIds = ALL_PRODUCTS.filter(
  (p) => p.isHighlight === true && p.id !== mainProductId
)
  .slice(0, 4)
  .map((p) => p.id);

const youMayAlsoLikeIds = ALL_PRODUCTS.filter(
  (p) => p.currentBestselling === true && p.id !== mainProductId
)
  .slice(0, 4)
  .map((p) => p.id);

// handleViewProduct will be defined inside the component so it can use hooks (e.g., addRecentlyViewed)

// 🚀 --- FINAL Full-Screen Image Modal Component ---
// (This component remains unchanged)
const ImageModal = ({ images = [], startIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isVisible, setIsVisible] = useState(false);

  // Handle keyboard events (← → ESC)
  useEffect(() => {
    setIsVisible(true);

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        prevImage();
      } else if (e.key === "ArrowRight") {
        nextImage();
      } else if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent render if no images
  if (!images.length) return null;

  // Navigation logic
  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Close logic
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 200);
  };
  // 🚀 --- NEW: Custom Animated Dropdown Component ---

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center 
        bg-white transition-opacity duration-300 ease-in-out
        ${isVisible ? "opacity-100" : "opacity-0"}`}
      onClick={handleClose}
    >
      {/* ✖ Close Button */}
      <button
        className="absolute top-5 right-6 text-gray-800 text-3xl font-bold hover:text-black transition"
        onClick={handleClose}
        aria-label="Close"
      >
        &times;
      </button>

      {/* ⬅ Previous Arrow */}
      <button
        className="absolute left-4 md:left-10 text-gray-800 text-3xl md:text-4xl font-bold bg-white shadow-lg 
                   rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition"
        onClick={(e) => {
          e.stopPropagation();
          prevImage();
        }}
        aria-label="Previous image"
      >
        &#8592;
      </button>

      {/* 🖼 Image Container */}
      <div
        className="max-w-[95vw] max-h-[90vh] flex items-center justify-center px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="object-contain max-h-[90vh] rounded-lg shadow-lg transition-transform duration-500 ease-in-out"
        />
      </div>

      {/* ➡ Next Arrow */}
      <button
        className="absolute right-4 md:right-10 text-gray-800 text-3xl md:text-4xl font-bold bg-white shadow-lg 
                   rounded-full h-10 w-10 flex items-center justify-center hover:bg-gray-100 active:scale-95 transition"
        onClick={(e) => {
          e.stopPropagation();
          nextImage();
        }}
        aria-label="Next image"
      >
        &#8594;
      </button>

      {/* 🔢 Image Counter */}
      <div className="absolute bottom-6 text-gray-600 text-sm opacity-80 select-none">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// 🚀 --- FINAL Sidebar Modal Component (Drawer) with Icons & Bold Headings ---
// (This component remains unchanged)
const SidebarModal = ({ contentId, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  if (!contentId) return null;

  let title = "";
  let content = "";
  let iconSrc = "";

  // --- Sidebar Content & Icons ---
  switch (contentId) {
    case "ShippingReturns":
      title = "Shipping & Returns";
      iconSrc = "/src/assets/tempo.svg";
      content = `
<strong>Shipping</strong><br/>
We deliver your parcel within 2–3 working days. As soon as your package has left our warehouse, you will receive a confirmation by email.  
This confirmation contains a tracking number that you can use to find out where your package is.<br/><br/>

<strong>Returns</strong><br/>
We offer free returns within 30 days. All you have to do is fill out the return slip that you received in your package and stick the prepaid label on the package.  
Please note that it can take up to 2 weeks for us to process your return. We will do our best to complete this process as soon as possible.
`;
      break;

    case "Warranty":
      title = "Warranty";
      iconSrc = "/src/assets/medal.svg";
      content = `
We provide a 2-year limited warranty from the date of purchase for all our products.
<br/><br/>
If you believe you have received a defective product, or are experiencing any problems with your product, please contact us.
<br/><br/>
This warranty strictly does not cover damages that arose from negligence, misuse, wear and tear, or not in accordance with product instructions (dropping the product, etc.).
`;
      break;

    case "SecurePayment":
      title = "Secure Payment";
      iconSrc = "/src/assets/license.svg";
      content = `
Your payment information is processed securely. We do not store credit card details nor have access to your credit card information.
<br/><br/>
We accept payments with:  
Visa, MasterCard, American Express, PayPal, Diners Club, Discover, and more.
`;
      break;

    default:
      title = "Information Not Found";
      content = "The requested detailed information could not be loaded.";
      break;
  }

  const sidebarClasses = isVisible ? "translate-x-0" : "translate-x-full";

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 " onClick={handleClose}>
      <div
        className={`fixed right-0 top-0 w-[110] md:w-[440px] h-full bg-white shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-in-out ${sidebarClasses}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Header with Icon + Title + Close */}
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <div className="flex items-center space-x-3">
              {iconSrc && (
                <img src={iconSrc} alt="" className="h-6 w-6 opacity-80" />
              )}
              <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
            </div>
            <button
              className="text-gray-500 hover:text-gray-700 text-3xl font-bold"
              onClick={handleClose}
            >
              &times;
            </button>
          </div>

          {/* Content */}
          <div
            className="text-black leading-relaxed text-[15px] space-y-3"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
};

// --- Helper Star Rating Component (Original Yellow) ---
// (This component remains unchanged)
const StarRating = ({ rating, reviewCount }) => {
  const filledStars = Math.floor(rating || 0);
  const displayReviewCount = reviewCount === undefined ? 0 : reviewCount;

  return (
    <div className="flex items-center my-2">
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 fill-current ${
              i < filledStars ? "text-yellow-400" : "text-gray-300"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
      <span className="text-gray-500 text-sm ml-2">
        ({displayReviewCount || 1})
      </span>
    </div>
  );
};

// 🚀 --- NEW: Helper Green Star Rating (for review list/summary) ---
// (This component remains unchanged)
const GreenStarRating = ({ rating }) => {
  const filledStars = Math.floor(rating || 0);
  return (
    <div className="flex text-green-700">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 fill-current ${
            i < filledStars ? "text-green-700" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
        </svg>
      ))}
    </div>
  );
};

// 🚀 --- Helper Interactive Star Rating for Form ---
// (This component remains unchanged)
const InteractiveStarRating = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex space-x-1 mb-4">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={starValue}
            // Using green stars
            className={`w-8 h-8 cursor-pointer ${
              starValue <= (hoverRating || rating)
                ? "text-green-700"
                : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setHoverRating(starValue)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(starValue)}
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      })}
    </div>
  );
};

// 🚀 --- Helper component for form inputs ---
// (This component remains unchanged)
const FormInput = ({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  helpText = "",
}) => (
  <div className="mb-4">
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 text-left mb-1"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {type === "textarea" ? (
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="5"
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
      />
    ) : (
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
      />
    )}
    {helpText && (
      <p className="mt-1 text-xs text-gray-500 text-left">{helpText}</p>
    )}
  </div>
);

// 🚀 --- Review Form Component ---
// (This component remains unchanged)
const ReviewForm = ({ onCancel, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // 🚀 State for file upload
  const [mediaFile, setMediaFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (rating === 0 || !review || !name || !email) {
      alert(
        "Please fill out all required fields (Rating, Review, Name, Email)."
      );
      return;
    }
    onSubmit({ rating, title, review, name, email, mediaFile });
  };

  // 🚀 Handler for file selection, simulating storing the image in a new folder
  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      // Updated path to simulate storage in the 'review_media' folder with a unique ID
      const uniqueId = new Date().getTime();
      const simulatedPath = `/src/assets/review_media/review_image_${uniqueId}.webp`;
      setMediaFile(simulatedPath);
    } else {
      setMediaFile(null);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 text-left">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Write a review
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Rating */}
        <div className="flex flex-col items-start mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating <span className="text-red-500">*</span>
          </label>
          <InteractiveStarRating rating={rating} setRating={setRating} />
        </div>

        {/* Review Title */}
        <FormInput
          label="Review Title"
          id="reviewTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your review a title (optional)"
          required={false}
        />

        {/* Review */}
        <FormInput
          label="Review"
          id="reviewBody"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your comments here"
          type="textarea"
          required
        />

        {/* Picture/Video */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 text-left mb-1">
            Picture/Video (optional)
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16v1a3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span>
                </p>
                {mediaFile && (
                  <p className="text-xs text-green-600">File attached</p>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        {/* Name */}
        <FormInput
          label="Name (displayed publicly like John Smith)"
          id="reviewName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />

        {/* Email */}
        <FormInput
          label="Email (private)"
          id="reviewEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          type="email"
          required
          helpText="Your email will not be displayed publicly."
        />

        {/* Data Use Policy */}
        <p className="text-xs text-gray-500 mb-6">
          How we use your data: We'll only contact you about the review you
          left, and only if necessary. By submitting your review, you agree to
          Judge.me's terms, privacy and content policies.
        </p>

        {/* Action Buttons (Matching image_305cb4.png) */}
        <div className="flex space-x-4 mt-6 justify-center">
          <button
            type="button"
            onClick={onCancel}
            className="w-1/3 py-3 px-6 border border-green-700 text-green-700 font-bold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel review
          </button>
          <button
            type="submit"
            className="w-1/3 py-3 px-6 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  );
};

// 🚀 --- NEW: Review Summary Component ---
// (This component remains unchanged)
const ReviewSummary = ({ reviews }) => {
  const totalReviews = reviews.length;
  if (totalReviews === 0) return null;

  // Calculate average rating
  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;

  // Calculate star distribution
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    distribution[r.rating]++;
  });

  return (
    <div className="w-full flex justify-between items-start space-x-8">
      {/* Left Column: Average Rating */}
      <div className="flex flex-col items-center justify-center p-4">
        <div className="flex items-center justify-center mb-1">
          <GreenStarRating rating={avgRating} />
          <svg
            className="w-4 h-4 ml-1 text-green-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <p className="text-3xl font-bold text-green-700">
          {avgRating.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">out of 5</p>
        <p className="text-xs text-gray-500 mt-1">
          Based on {totalReviews} {totalReviews === 1 ? "review" : "reviews"}
        </p>
      </div>

      {/* Right Column: Bar Chart */}
      <div className="flex-1 space-y-1 pt-2">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = distribution[star] || 0;
          const percentage = (count / totalReviews) * 100;
          return (
            <div key={star} className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600 w-4 text-right">{star}</span>
              <GreenStarRating rating={star} />
              <div className="flex-1 h-3 bg-gray-200 rounded-lg">
                <div
                  className="h-3 bg-green-700 rounded-lg"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-gray-600 w-4 text-right">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 🚀 --- NEW: Review Item Component ---
// (This component remains unchanged)
const ReviewItem = ({ review, onImageClick }) => {
  // Fallback if title is missing
  const reviewTitle = review.title || review.review.substring(0, 50) + "...";
  // Fallback if name is missing (shouldn't happen with required field, but safer)
  const reviewerName = review.name || "Anonymous";

  return (
    <div className="py-6 border-b border-gray-200 text-left">
      <GreenStarRating rating={review.rating} />

      <div className="flex justify-between items-start mt-1">
        <h4 className="text-md font-semibold text-gray-800">{reviewTitle}</h4>
        <span className="text-sm text-gray-500 whitespace-nowrap">
          {review.date}
        </span>
      </div>

      <div className="flex items-center space-x-3 mt-2 mb-3">
        {/* User Icon */}
        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
        <span className="text-sm font-semibold text-gray-900">
          {reviewerName}
        </span>
      </div>

      <p className="mt-1 text-sm text-gray-700">{review.review}</p>

      {/* 🚀 Image/Video Display */}
      {review.mediaFile && (
        <div className="mt-4 flex flex-wrap gap-2">
          <img
            src={review.mediaFile}
            alt="Review media"
            className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onImageClick(review.mediaFile)}
          />
          {/* If there were multiple files, you would map them here */}
        </div>
      )}
    </div>
  );
};

// 🚀 --- MODIFIED: Review List Component (with Filters and Pagination) ---
// (This component remains unchanged)
const ReviewList = ({
  reviews,
  onImageClick,
  // 🚀 NEW PROPS for Pagination
  reviewsToShow,
  setReviewsToShow,
}) => {
  // 🚀 Includes all filter options from image_30d18c.png
  const filterOptions = [
    "Most Recent",
    "Highest Rating",
    "Lowest Rating",
    "Only Pictures",
    "Pictures First",
    "Videos First",
    "Most Helpful",
  ];
  const [sortMethod, setSortMethod] = useState("Most Recent");
  const [sortedReviews, setSortedReviews] = useState(reviews);

  // Simple sorting logic based on the selected method
  useEffect(() => {
    let newReviews = [...reviews];
    switch (sortMethod) {
      case "Highest Rating":
        newReviews.sort((a, b) => b.rating - a.rating);
        break;
      case "Lowest Rating":
        newReviews.sort((a, b) => a.rating - b.rating);
        break;
      case "Most Recent":
      default:
        // Assuming newer reviews have higher IDs/dates (default state is already set up this way)
        newReviews = reviews;
        break;
    }
    setSortedReviews(newReviews);
    // 🚀 Reset reviewsToShow to 5 (the initial limit) whenever sort/filter changes
    setReviewsToShow(5);
  }, [sortMethod, reviews, setReviewsToShow]);

  // 🚀 PAGINATION LOGIC
  const INITIAL_LIMIT = 5; // Hardcoded initial limit for internal logic
  const displayedReviews = sortedReviews.slice(0, reviewsToShow);
  const hasMoreReviews = sortedReviews.length > reviewsToShow;
  const isFullyExpanded = reviewsToShow === sortedReviews.length;

  // Handler to show all reviews
  const handleShowMore = () => {
    // Set reviewsToShow to the total number of reviews to display all
    setReviewsToShow(sortedReviews.length);
  };

  // Handler to collapse to initial limit (5)
  const handleCollapse = () => {
    setReviewsToShow(INITIAL_LIMIT);
    // Optional: Scroll back up to the review list top after collapsing
    // In a real application, you might use a Ref here.
  };

  return (
    <div className="w-full">
      {/* Sort Dropdown */}
      <div className="flex justify-start mb-4">
        <div className="relative">
          <select
            value={sortMethod}
            onChange={(e) => setSortMethod(e.target.value)}
            className="appearance-none rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Reviews */}
      <div>
        {/* 🚀 MODIFIED: Use displayedReviews */}
        {displayedReviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            onImageClick={onImageClick}
          />
        ))}
      </div>

      {/* 🚀 NEW: Show More Button */}
      {hasMoreReviews && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleShowMore}
            className="py-3 px-8 border-2 border-green-700 text-green-700 font-bold rounded-full hover:bg-green-50 transition-colors shadow-sm"
          >
            Show More Reviews ({sortedReviews.length - reviewsToShow} more)
          </button>
        </div>
      )}

      {/* 🚀 NEW: Collapse Button (Only appears if we are showing all reviews and there are more than the initial limit) */}
      {isFullyExpanded && sortedReviews.length > INITIAL_LIMIT && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleCollapse}
            className="text-sm text-gray-500 hover:text-gray-900 underline"
          >
            Show Fewer Reviews
          </button>
        </div>
      )}
    </div>
  );
};

// --- Helper Components for New Layout (Unchanged) ---
const PaymentOptions = () => (
  // ... (PaymentOptions JSX) ...
  <div className="w-full flex flex-col justify-center items-center bg-gray-200 py-8 mt-5">
    <div className="flex justify-center items-center text-[17px] text-black">
      Payment Options
    </div>
    <img
      src="/src/assets/pay.webp"
      className="w-80 h-auto mt-4"
      alt="Payment Options"
    />
  </div>
);

const DeliveryInfo = () => (
  // ... (DeliveryInfo JSX) ...
  <div className="">
    <ul>
      <li className=" text-black opacity-50 flex items-center mb-2">
        <img src="/src/assets/parcel.svg" className="h-5 w-5 mr-2" alt="" /> 2
        year warranty
      </li>
      <li className=" text-black opacity-50 flex items-center mb-2">
        <img src="/src/assets/tempo.svg" className="h-5 w-5 mr-2" alt="" />
        Delivery Time: 1-2 business days
      </li>
      <li className=" text-black opacity-50 flex items-center mb-2">
        <img src="/src/assets/loop.svg" className="h-5 w-5 mr-2" alt="" /> Free
        90 day returns
      </li>
    </ul>{" "}
  </div>
);

// --- Component Definition ---

export const ProductLayoutClassic = () => {
  // 🚀 --- NEW: Local Storage Key for Reviews ---
  const LOCAL_STORAGE_KEY = `productReviews_${mainProductId}`;

  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // State to manage the selected image index and selected format
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedFormat, setSelectedFormat] = useState("Audio cd");
  const [activeTab, setActiveTab] = useState("Description");

  // 🚀 --- NEW: State to manage review form visibility and success message ---
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // 🚀 --- NEW: State for image modal ---
  const [enlargedImageUrl, setEnlargedImageUrl] = useState(null);

  // 🚀 --- NEW: State for sidebar modal content ---
  const [sidebarContent, setSidebarContent] = useState(null); // e.g., 'ShippingReturns', 'Warranty', 'SecurePayment', 'Sustainability'

  // 🚀 --- NEW: Initial limit for reviews and state to track current count ---
  const INITIAL_REVIEW_LIMIT = 5;
  const [reviewsToShow, setReviewsToShow] = useState(INITIAL_REVIEW_LIMIT); // Initialize to 5

  // Recently viewed hook (adds clicked products to localStorage)
  const { addRecentlyViewed } = useRecentlyViewed();

  // Handler used by ProductCarousel / ProductCard when a product card is clicked
  const navigate = useNavigate();
  const handleViewProduct = (product) => {
    try {
      addRecentlyViewed(product);
    } catch {
      console.error("Failed to add recently viewed");
    }
    // Navigate to the product detail page (single-page navigation)
    try {
      navigate(`/product/${product.id}`);
    } catch (err) {
      // Fallback to full location change
      window.location.href = `/product/${product.id}`;
    }
  };

  // 🚀 --- NEW: State for reviews, initialized from Local Storage ---
  const [reviews, setReviews] = useState(() => {
    try {
      const storedReviews = localStorage.getItem(LOCAL_STORAGE_KEY);
      // Default with mock reviews
      const defaultReviews = [
        // ⭐️ MOCK REVIEWS FOR DEMONSTRATION (12 REVIEWS TOTAL)
        {
          id: 1678886400000,
          date: "11/07/2025",
          rating: 5,
          title: "Amazing book!",
          review:
            "This book was truly excellent and exceeded all my expectations. (Review 1)",
          name: "ribiigh",
          email: "a@b.com",
          mediaFile: "/src/assets/review_media/AnotherGreatBook.webp",
        },
        // ... (other mock reviews) ...
        {
          id: 1678796400000,
          date: "11/05/2025",
          rating: 1,
          title: "Very disappointing",
          review:
            "The quality was poor and the content was not what I expected. Would not recommend.",
          name: "Anonymous",
          email: "c@d.com",
          mediaFile: null,
        },
      ];
      return storedReviews ? JSON.parse(storedReviews) : defaultReviews;
    } catch (error) {
      console.error("Failed to parse reviews from localStorage", error);
      return [];
    }
  });

  const mainImageSliderRef = useRef(null);

  // 🚀 --- NEW: Ref for sticky bar trigger and state for visibility ---
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);
  const addToCartRef = useRef(null); // Ref to attach to the main "Add to Cart" button group

  const calculatePriceDetails = (format) => {
    if (!mainProduct) {
      return { finalPrice: 0, originalPrice: 0, discount: 0 };
    }

    const productFormatMultiplier = formatPrices[mainProduct.format] || 1.0;
    const baseFinalPrice = mainProduct.price / productFormatMultiplier;

    const selectedFormatMultiplier = formatPrices[format] || 1.0;
    const finalPrice = baseFinalPrice * selectedFormatMultiplier;

    let originalPrice = finalPrice;
    let saveAmount = 0;

    if (mainProduct.discount) {
      const discountValue = parseFloat(mainProduct.discount);
      if (!isNaN(discountValue) && discountValue > 0) {
        originalPrice = finalPrice / (1 - discountValue / 100);
        saveAmount = originalPrice - finalPrice;
      }
    }

    return {
      finalPrice,
      originalPrice,
      discount: saveAmount,
    };
  };

  const currentPriceDetails = calculatePriceDetails(selectedFormat);

  const price = currentPriceDetails.finalPrice;
  const originalPrice = currentPriceDetails.originalPrice;

  const isMissing = !mainProduct;
  const saveAmount = currentPriceDetails.discount;

  // 🚀 --- NEW: useEffect to handle scroll for sticky bar ---
  useEffect(() => {
    const handleScroll = () => {
      if (addToCartRef.current) {
        // Show the bar when the *bottom* of the button group scrolls *above* the top of the viewport
        const shouldBeVisible =
          addToCartRef.current.getBoundingClientRect().bottom < 0;
        setIsStickyBarVisible(shouldBeVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this runs once on mount

  // Settings for the main image slider
  const mainSliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    beforeChange: (oldIndex, newIndex) => {
      setSelectedImageIndex(newIndex);
    },
  };

  // Thumbnail Click Handler
  const handleThumbnailClick = (index) => {
    if (mainImageSliderRef.current?.slickGoTo) {
      mainImageSliderRef.current.slickGoTo(index);
    }
    setSelectedImageIndex(index);
  };

  // Format Click Handler
  const handleFormatClick = (format) => {
    setSelectedFormat(format);
  };

  // 🚀 --- NEW: Handler for Review Form Submission ---
  const handleReviewSubmit = (formData) => {
    const newReview = {
      ...formData,
      id: new Date().getTime(), // Simple unique ID
      date: new Date().toLocaleDateString("en-US", {
        // Format date MM/DD/YYYY
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    };

    // Add to the beginning of the list (for "Most Recent" default sort)
    const newReviewsList = [newReview, ...reviews];

    // Update state
    setReviews(newReviewsList);

    // Update local storage
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newReviewsList));
    } catch (error) {
      console.error("Failed to save reviews to localStorage", error);
    }

    // Hide form and show success message
    setIsReviewFormVisible(false);
    setReviewSubmitted(true);
    // 🚀 Reset the view to show the new review at the top
    setReviewsToShow(INITIAL_REVIEW_LIMIT);
  };

  // 🚀 Handler to close the success message
  const handleRefreshPage = () => {
    setReviewSubmitted(false);
    // In a real application, "Refresh page" would reload the component/data
    // For simplicity, we just hide the message.
  };

  const Breadcrumbs = () => (
    <nav className="text-sm py-4 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-500">
      <ol className="flex space-x-2">
        <li>
          <Link to="/" className="flex items-center gap-1 hover:text-gray-700">
            <img
              src="/src/assets/home.svg"
              className="h-5 w-5 opacity-50"
              alt=""
            />{" "}
            Home
          </Link>
        </li>
        <span>/</span>
        <li className=" text-gray-700">
          Complete Set of 7 Books: 30 Days to Change Yourself - Don't Be
          Perfect, Be Happy{" "}
        </li>
      </ol>
    </nav>
  );
  const [qtyValue, setQtyValue] = useState(1);
  const plusplus = () => {
    setQtyValue(qtyValue + 1);
  };

  const minusminus = () => {
    if (qtyValue > 1) {
      setQtyValue(qtyValue - 1);
    }
  };

  // 🚀 Function to handle image click for modal
  const handleImageEnlarge = (url) => {
    // This is slightly modified: clicking a review image should show *only* that image
    // Clicking the zoom button should show the main gallery
    if (typeof url === "string") {
      setEnlargedImageUrl(url); // A review image was clicked
    } else {
      setEnlargedImageUrl(true); // The zoom button was clicked
    }
  };

  // Determine images for the modal
  const getModalImages = () => {
    if (typeof enlargedImageUrl === "string") {
      return { images: [enlargedImageUrl], startIndex: 0 }; // Show only the clicked review image
    }
    return { images: thumbnailUrls, startIndex: selectedImageIndex }; // Show main gallery
  };

  const modalData = enlargedImageUrl ? getModalImages() : null;

  return (
    <div className="min-h-screen bg-white">
      {/* 🚀 Image Modal (Updated Logic) */}
      {modalData && (
        <ImageModal
          images={modalData.images}
          startIndex={modalData.startIndex}
          onClose={() => setEnlargedImageUrl(null)}
        />
      )}
      {/* 🚀 Sidebar Modal */}
      <SidebarModal
        contentId={sidebarContent}
        onClose={() => setSidebarContent(null)}
      />
      {/* 🚀 --- NEW: Render Sticky Bottom Bar --- */}
      <StickyBottomBar
        isVisible={isStickyBarVisible}
        product={mainProduct}
        selectedFormat={selectedFormat}
        onFormatChange={handleFormatClick} // Pass the handler
        priceDetails={currentPriceDetails}
      />
      {isMissing ? (
        <div className="text-center py-20">Product not found.</div>
      ) : (
        <>
          {/* 1. Breadcrumbs */}
          <Breadcrumbs />
          {/* Main Product Details Section */}
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row gap-12 bg-white rounded-lg">
              {/* Image Gallery (50% width) */}
              <div className="lg:w-1/2 flex flex-col items-center">
                {/* Main Image Slider Container (Tap-to-change feature) */}
                <div className="w-full max-w-full aspect-auto relative select-none">
                  <Slider
                    {...mainSliderSettings}
                    ref={mainImageSliderRef} // Use the single ref
                    className="w-full"
                  >
                    {thumbnailUrls.map((url, index) => (
                      <div key={index} className="h-full">
                        <img
                          src={url}
                          alt={`Product view ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg shadow-lg"
                        />
                      </div>
                    ))}
                  </Slider>

                  {/* Navigation Overlay - Left Half (Previous) */}
                  <div
                    className="absolute top-0 left-0 w-1/2 h-full z-10 cursor-pointer flex items-center justify-start group"
                    onClick={(e) => {
                      e.stopPropagation();
                      mainImageSliderRef.current?.slickPrev();
                    }}
                    aria-label="Previous image"
                  >
                    {/* Curved Indicator - Left Side */}
                    <div
                      className="absolute top-0 left-0 w-full h-full 
                                                opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                                bg-gradient-to-r from-black/80 to-transparent rounded-l-lg"
                    />
                  </div>

                  {/* Navigation Overlay - Right Half (Next) */}
                  <div
                    className="absolute top-0 right-0 w-1/2 h-full z-10 cursor-pointer flex items-center justify-end group"
                    onClick={(e) => {
                      e.stopPropagation();
                      mainImageSliderRef.current?.slickNext();
                    }}
                    aria-label="Next image"
                  >
                    {/* Curved Indicator - Right Side */}
                    <div
                      className="absolute top-0 right-0 w-1/2 h-full 
                                                opacity-0 group-hover:opacity-100 transition-opacity duration-500
                                                bg-gradient-to-l from-black/80 to-transparent rounded-r-lg"
                    />
                  </div>

                  {/* Zoom Icon (visual only) - MODIFIED: Added onClick to open modal */}
                  <div
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md cursor-zoom-in z-20"
                    onClick={() => handleImageEnlarge(true)} // Pass true to signal gallery
                    // 🚀 Zoom Icon functionality added
                    aria-label="Enlarge image"
                  >
                    <svg
                      className="w-5 h-5 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3h-6"
                      />
                    </svg>
                  </div>
                </div>

                {/* Thumbnail Gallery - Static horizontal scroll row */}
                <div className="flex space-x-2 mt-4 overflow-x-auto pb-2 w-full max-w-full justify-center">
                  {thumbnailUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Thumbnail ${index + 1}`}
                      className={`w-16 mt-1 h-auto object-cover rounded-md cursor-pointer border-2 flex-shrink-0 transition-all duration-200 
                                        ${
                                          index === selectedImageIndex
                                            ? "border-gray-900 ring-2 ring-offset-1 ring-gray-900" // Highlight selected
                                            : "border-gray-300 hover:border-gray-500"
                                        }`}
                      onClick={() => handleThumbnailClick(index)}
                    />
                  ))}
                </div>
              </div>

              {/* Product Information (50% width) */}
              <div className="lg:w-1/2">
                <h1 className="text-4xl font-serif font-light text-gray-900 mb-2">
                  Complete Set of 7 Books: 30 Days to Change Yourself - Don't Be
                  Perfect, Be Happy
                </h1>
                <StarRating rating={5} reviewCount={reviews.length} />
                <div className="flex items-center space-x-4 my-4 text-sm">
                  <div className="flex items-center text-green-700">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>In Stock</span>
                  </div>
                </div>
                <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300" />
                {/* Dynamic Price Block */}
                <div className="flex items-center space-x-3 mb-6 py-4">
                  <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300" />

                  <h2 className="text-4xl font-bold text-green-700">
                    {/* Display Final Price */}${price.toFixed(2)}
                  </h2>
                  {originalPrice > price && (
                    <span className="text-2xl text-gray-400 line-through">
                      {/* Display Original Price only if a discount exists */}$
                      {originalPrice.toFixed(2)}
                    </span>
                  )}
                  {saveAmount > 0 && (
                    <span className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded">
                      {/* Display Savings only if a discount exists */}
                      Save ${saveAmount.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="text-gray-700 mb-8">
                  {/* 🚀 IMPLEMENTATION: Added 'line-clamp-3' to shorten text and add '...' */}
                  <p className="line-clamp-3">
                    From the author of The Longest Ride and The Return comes a
                    novel about the enduring legacy of first love, and the
                    decisions that haunt us forever. 1996 was the year that
                    changed everything for Maggie Dawes. Sent away at sixteen to
                    live with an aunt she barely knew in Ocracoke, a remote
                    village on North Carolina's Outer Banks, she could think
                    only of the friends and family she left behind . . . until
                    she met Bryce Trickett, one of the few teenagers on the
                    island. Handsome, genuine, and newly admitted to West Point,
                    Bryce showed her how much there was to love about the
                    wind-swept beach town--and introduced her to photography, a
                    passion that would define the rest of her life. A collection
                    of 10 well-researched board books to introduce a wide range
                    of learning topics and everyday objects to the little
                    scholars. The topics included in the set are - ABC, Numbers,
                    Shapes, Colours, Wild Animals, Farm Animals and Pets, Birds,
                    Fruits, Vegetables and Transport.
                  </p>
                </div>
                <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300" />
                {/* Format Selector */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    FORMAT:{" "}
                    <span className="font-bold">
                      {selectedFormat.toUpperCase()}
                    </span>
                  </label>
                  <div className="flex space-x-3">
                    {Object.keys(formatPrices).map((format) => (
                      <button
                        key={format}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          format === selectedFormat
                            ? "bg-gray-900 text-white"
                            : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => handleFormatClick(format)}
                      >
                        {format}
                      </button>
                    ))}
                  </div>
                </div>
                <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300" />

                {/* ⭐️ MODIFIED: Quantity and Action Buttons - Centered */}
                {/* 🚀 --- NEW: Attached ref to this div --- */}
                <div
                  className="flex flex-row gap-5 justify-center items-center space-y-4 mb-6"
                  ref={addToCartRef}
                >
                  {/* Quantity Selector - Centered */}
                  <div className="flex mt-5 items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={minusminus}
                      className="px-3 py-2.5 text-black hover:bg-gray-50 rounded-l-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      defaultValue="1"
                      value={qtyValue}
                      min="1"
                      className="w-12 text-center border-gray-300 text-black"
                    />
                    <button
                      onClick={plusplus}
                      className="px-3 py-2.5 text-gray-500 hover:bg-gray-50 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>

                  {/* Action Buttons - Centered as a Group, Spanning a max width */}
                  <div className="flex w-full max-w-lg space-x-4">
                    <button
                      // ⭐️ HOVER CHANGE: from hover:bg-green-800 to hover:bg-green-600
                      className="flex-1 bg-green-700 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-colors shadow-md text-lg"
                      onClick={() => console.log("Added set to cart")}
                    >
                      Add to Cart
                    </button>

                    <button
                      // ⭐️ HOVER CHANGE: from hover:bg-green-800 to hover:bg-green-600
                      className="flex-1 bg-green-700 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-colors shadow-md text-lg"
                      onClick={() => console.log("Buy It Now")}
                    >
                      Buy It Now
                    </button>
                  </div>
                </div>
                {/* <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300" /> */}

                {/* Wishlist & Compare Links */}
                <div className="flex items-center justify-center space-x-6 text-sm mb-6 w-full">
                  <button className="flex  items-center text-gray-600 hover:text-gray-900">
                    <img
                      src="/src/assets/heart.svg"
                      className="w-4 h-4 opacity-100 mr-1"
                      alt=""
                    />
                    Add To Wishlist
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-gray-900">
                    <img
                      src="/src/assets/compare.svg"
                      className="w-4 h-4 opacity-70 mr-1"
                      alt=""
                    />
                    Add To Compare
                  </button>
                </div>
                <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300" />
                {/* Delivery Info */}
                <DeliveryInfo />
                {/* Payment Options */}
                <PaymentOptions />
                {/* Categories & Tags */}
                <div className="mt-6 text-s text-gray-500">
                  <p>
                    <strong>Categories:</strong> Books, Books New, Fantasy,
                    Fiction, Kids Books, Non Fiction
                  </p>
                  <p className="mt-2">
                    <strong>Tags:</strong> Ebook
                  </p>
                </div>
                {/* Social Icons */}
                <div className="flex items-center space-x-3 mt-6">
                  {/* Facebook - Blue-600 */}
                  <a
                    href="#"
                    aria-label="Share on Facebook"
                    className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center transition-colors hover:bg-blue-700"
                  >
                    <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
                  </a>
                  {/* Twitter (X) - Sky-500 (Using old blue color as per your original request, but updated Font Awesome icon for X) */}
                  <a
                    href="#"
                    aria-label="Share on X (Twitter)"
                    className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center transition-colors hover:bg-sky-600"
                  >
                    <FontAwesomeIcon icon={faTwitter} className="w-4 h-4" />
                  </a>
                  {/* Pinterest - Red-600 */}
                  <a
                    href="#"
                    aria-label="Share on Pinterest"
                    className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center transition-colors hover:bg-red-700"
                  >
                    <FontAwesomeIcon icon={faPinterestP} className="w-4 h-4" />
                  </a>
                  {/* LinkedIn - Blue-700 */}
                  <a
                    href="#"
                    aria-label="Share on LinkedIn"
                    className="w-8 h-8 rounded-full bg-blue-700 text-white flex items-center justify-center transition-colors hover:bg-blue-800"
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-25">
            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300" />
            <div className="">
              <nav className="-mb-px justify-center flex space-x-8">
                {["Description", "Additional Information", "Reviews"].map(
                  (tab) => (
                    <a
                      key={tab}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(tab);
                        // Hide form/success message when switching tabs
                        setIsReviewFormVisible(false);
                        setReviewSubmitted(false);
                        setSidebarContent(null); // 🚀 Hide sidebar on tab switch
                        // 🚀 Reset reviews to initial limit on tab switch
                        setReviewsToShow(INITIAL_REVIEW_LIMIT);
                      }}
                      // Use dark green background for the active tab to match the image style
                      className={`
                                    ${
                                      tab === activeTab
                                        ? "bg-green-900 text-white font-semibold  shadow-md"
                                        : "bg-white text-gray-900 font-medium"
                                    }
                                    whitespace-nowrap py-4 px-8 text-sm transition-colors rounded-md border border-transparent 
                                     ${
                                       tab !== activeTab
                                         ? "hover:bg-gray-100"
                                         : ""
                                     }
                                `}
                    >
                      {tab}
                    </a>
                  )
                )}
              </nav>
            </div>
            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-300" />

            <div className="py-8 text-gray-700">
              {/* Description Content (MODIFIED: Links open sidebar) */}
              {activeTab === "Description" && (
                // ... (Description Content)
                <div>
                  <p className="mb-4">
                    From the author of The Longest Ride and The Return comes a
                    novel about the enduring legacy of first love, and the
                    decisions that haunt us forever. 1996 was the year that
                    changed everything for Maggie Dawes. Sent away at sixteen to
                    live with an aunt she barely knew in Ocracoke, a remote
                    village on North Carolina's Outer Banks, she could think
                    only of the friends and family she left behind . . . until
                    she met Bryce Trickett, one of the few teenagers on the
                    island.
                  </p>
                  <p>
                    Handsome, genuine, and newly admitted to West Point, Bryce
                    showed her how much there was to love about the wind-swept
                    beach town--and introduced her to photography, a passion
                    that would define the rest of her life. A collection of 10
                    well-researched board books to introduce a wide range of
                    learning topics and everyday objects to the little scholars.
                    The topics included in the set are - ABC, Numbers, Shapes,
                    Colours, Wild Animals, Farm Animals and Pets, Birds, Fruits,
                    Vegetables and Transport.
                  </p>
                  {/* Added text and links based on image_bf8379.png - MODIFIED to open sidebar */}
                  <div className="flex space-x-6 mt-6 text-sm text-gray-500">
                    {/* Shipping & Returns (Text links) */}

                    <span
                      className="flex gap-2 items-center underline cursor-pointer hover:text-gray-900"
                      onClick={(e) => {
                        e.preventDefault();
                        setSidebarContent("ShippingReturns"); // 🚀 ADDED HANDLER
                      }}
                    >
                      <img
                        src="/src/assets/tempo.svg"
                        className="h-5 w-5"
                        alt=""
                      />
                      Shipping & Returns
                    </span>
                    {/* Warranty (Text links) */}
                    <span
                      className="flex gap-2 items-center underline cursor-pointer hover:text-gray-900"
                      onClick={(e) => {
                        e.preventDefault();
                        setSidebarContent("Warranty"); // 🚀 ADDED HANDLER
                      }}
                    >
                      <img
                        src="/src/assets/medal.svg"
                        className="h-5 w-5 opacity-50"
                        alt=""
                      />
                      Warranty
                    </span>
                    {/* Secure Payment (Text links) */}
                    <span
                      className="flex gap-2 items-center underline cursor-pointer hover:text-gray-900"
                      onClick={(e) => {
                        e.preventDefault();
                        setSidebarContent("SecurePayment"); // 🚀 ADDED HANDLER
                      }}
                    >
                      <img
                        src="/src/assets/license.svg"
                        className="h-5 w-5 opacity-50"
                        alt=""
                      />
                      Secure Payment
                    </span>
                  </div>
                </div>
              )}

              {/* Additional Information Content (MODIFIED: Link opens sidebar) */}
              {activeTab === "Additional Information" && (
                <div>
                  <p className="mb-4 opacity-80">
                    <p>By changing our most important processes and</p>{" "}
                    <p>
                      products, we have already made a big leap forward. This
                      ranges from the
                    </p>{" "}
                    <p>
                      increased use of more sustainable fibers to the use of
                      more{"    "}
                    </p>{" "}
                    <p>
                      environmentally friendly printing processes to the
                      development of{" "}
                    </p>{" "}
                    <p>efficient waste management in our value chain.</p>{" "}
                  </p>
                  <a
                    href="#"
                    className="opacity-80 underline hover:text-gray-900"
                    onClick={(e) => {
                      e.preventDefault();
                      setSidebarContent("Sustainability"); // 🚀 ADDED HANDLER
                    }}
                  >
                    Learn more about sustainability
                  </a>
                </div>
              )}

              {/* 🚀 MODIFIED: Reviews Content (Full Logic) */}
              {activeTab === "Reviews" && (
                <div className="flex flex-col items-center justify-center text-center w-full">
                  {/* 🚀 2. Review Submitted Success Message */}
                  {reviewSubmitted && (
                    <div className="w-full max-w-4xl mx-auto p-4 mb-8 bg-green-50 border-2 border-green-200 rounded-lg">
                      <h3 className="text-xl font-semibold mb-2 text-green-700">
                        Review Submitted!
                      </h3>
                      <p className="text-sm text-green-700 mb-4">
                        Thank you! Please refresh the page in a few moments to
                        see your review. You can remove or edit your review by
                        logging into{" "}
                        <a
                          href="#"
                          className="underline font-medium hover:text-green-900"
                        >
                          judgeme.me
                        </a>
                        .
                      </p>
                      <button
                        onClick={handleRefreshPage}
                        className="py-2 px-4 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md"
                      >
                        Refresh page
                      </button>
                    </div>
                  )}

                  {/* 🚀 1. If Form is Visible, show form */}
                  {isReviewFormVisible ? (
                    <ReviewForm
                      onCancel={() => setIsReviewFormVisible(false)}
                      onSubmit={handleReviewSubmit}
                    />
                  ) : (
                    <>
                      {/* If No Reviews, show "Be the first" */}
                      {reviews.length === 0 ? (
                        <>
                          <h3 className="text-xl font-semibold mb-4 text-gray-900">
                            Customer Reviews
                          </h3>
                          <StarRating rating={0} reviewCount={0} />
                          <span className="text-sm text-gray-500 mb-4">
                            Be the first to write a review
                          </span>
                          <button
                            className="bg-green-700 text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-colors shadow-md text-lg"
                            onClick={() => setIsReviewFormVisible(true)}
                          >
                            Write a review
                          </button>
                        </>
                      ) : (
                        /* 🚀 If Reviews Exist, show the new layout (image_30be69.png) */
                        <div className="w-full max-w-4xl mx-auto text-left">
                          <h3 className="text-xl font-semibold mb-6 text-gray-900 text-center">
                            Customer Reviews
                          </h3>
                          <div className="flex flex-col lg:flex-row justify-between gap-8 items-center mb-6">
                            {/* Left Side: Summary & Bars */}
                            <div className="lg:w-2/3 w-full">
                              <ReviewSummary reviews={reviews} />
                            </div>
                            {/* Right Side: Write a Review Button */}
                            <div className="lg:w-1/3 w-full flex lg:justify-end justify-center items-start">
                              <button
                                className="py-3 px-6 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md"
                                onClick={() => {
                                  setIsReviewFormVisible(true);
                                  setReviewSubmitted(false); // Hide success message
                                }}
                              >
                                Write a review
                              </button>
                            </div>
                          </div>
                          <hr className="my-6 border-gray-200" />
                          {/* Bottom: Review List with Dropdown */}
                          <ReviewList
                            reviews={reviews}
                            onImageClick={handleImageEnlarge} // Pass handler for modal
                            // 🚀 NEW PAGINATION PROPS
                            reviewsToShow={reviewsToShow}
                            setReviewsToShow={setReviewsToShow}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <hr className="my-3 max-w-8xl mx-auto border-gray-200" />
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductCarousel
              title="Related Products"
              productIds={relatedProductIds}
              onViewProduct={handleViewProduct}
              showBrowseButton={false}
              titleCenter={true}
              slidesToShowCount={4}
              onQuickView={(product) => setQuickViewProduct(product)} // <--- ADD THIS LINE
            />
          </div>
          <hr className="my-3 max-w-8xl mx-auto border-gray-200" />
          <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
            <ProductCarousel
              onQuickView={(product) => setQuickViewProduct(product)} // <--- ADD THIS LINE
              title="You may also like"
              productIds={youMayAlsoLikeIds}
              onViewProduct={handleViewProduct}
              showBrowseButton={false}
              titleCenter={true}
              slidesToShowCount={4}
            />
          </div>
          <div className="h-16"></div> {/* Added bottom spacing */}
        </>
      )}
      <QuickViewDrawer
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        product={quickViewProduct}
      />
    </div>
  );
};
