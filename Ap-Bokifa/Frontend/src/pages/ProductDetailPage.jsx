// ProductDetailPage.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Repeat } from "lucide-react";
import Slider from "react-slick";
import { fetchProductById } from "../api/productService";
import useRecentlyViewed from "/src/hooks/useRecentlyViwed";
import ProductCarousel from "/src/components/product/ProductCorousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StickyBottomBar from "/src/components/product/StickyBottomBar";
import CountdownTimer from "/src/components/product/CountdownTimer.jsx";
import QuickViewDrawer from "/src/components/QuickViewDrawer";
import { FORMAT_MULTIPLIERS } from "/src/constants";
import { useCurrency } from "/src/context/CurrencyContext";
import { useCart } from "/src/context/CartContext";
import { useWishlist } from "/src/context/WishlistContext";
import { useCompare } from "/src/context/CompareContext";
import {
  faFacebookF,
  faTwitter,
  faPinterestP,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CONVERSION_RATES = {
  "USD $": { rate: 1, symbol: "$" },
  "EUR €": { rate: 0.92, symbol: "€" },
  "GBP £": { rate: 0.79, symbol: "£" },
  "CAD C$": { rate: 1.37, symbol: "C$" },
  "AUD A$": { rate: 1.52, symbol: "A$" },
  "JPY ¥": { rate: 157.45, symbol: "¥" },
  "CNY ¥": { rate: 7.25, symbol: "¥" },
  "INR ₹": { rate: 83.55, symbol: "₹" },
  "BRL R$": { rate: 5.46, symbol: "R$" },
  "MXN $": { rate: 18.42, symbol: "$" },
};

const getFormattedPrice = (price, currency) => {
  const conversion = CONVERSION_RATES[currency];
  if (!conversion) {
    return `$${price.toFixed(2)}`;
  }
  const convertedPrice = price * conversion.rate;
  return `${conversion.symbol}${convertedPrice.toFixed(2)}`;
};

const normalizeFormatKey = (format) =>
  String(format)
    .replace(/[^a-z0-9]/gi, "")
    .toLowerCase();

const getPriceDetails = (product, selectedFormat, currency) => {
  if (!product) {
    return {
      originalPrice: 0,
      finalPrice: 0,
      discount: 0,
      discountPct: 0,
      formattedOriginalPrice: getFormattedPrice(0, currency),
      formattedFinalPrice: getFormattedPrice(0, currency),
      formattedDiscount: getFormattedPrice(0, currency),
    };
  }

  const pickFormat =
    Object.keys(FORMAT_MULTIPLIERS).find((f) => f === selectedFormat) ||
    Object.keys(FORMAT_MULTIPLIERS).find(
      (f) => normalizeFormatKey(f) === normalizeFormatKey(selectedFormat)
    ) ||
    Object.keys(FORMAT_MULTIPLIERS)[0];

  const multiplier = FORMAT_MULTIPLIERS[pickFormat] ?? 1;
  const base = Number(product.price ?? 0);
  const originalPrice = +(base * multiplier);

  const discountPct = Number(product.discount) || 0;
  const finalPrice = +(originalPrice * (1 - discountPct / 100));
  const discountAmount = +(originalPrice - finalPrice);

  return {
    originalPrice,
    finalPrice,
    discount: discountAmount,
    discountPct,
    formattedOriginalPrice: getFormattedPrice(originalPrice, currency),
    formattedFinalPrice: getFormattedPrice(finalPrice, currency),
    formattedDiscount: getFormattedPrice(discountAmount, currency),
  };
};

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

const InteractiveStarRating = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex space-x-1 mb-4">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <svg
            key={starValue}
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

const ReviewForm = ({ onCancel, onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mediaFile, setMediaFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || !review || !name || !email) {
      alert(
        "Please fill out all required fields (Rating, Review, Name, Email)."
      );
      return;
    }
    onSubmit({ rating, title, review, name, email, mediaFile });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
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
        <div className="flex flex-col items-start mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating <span className="text-red-500">*</span>
          </label>
          <InteractiveStarRating rating={rating} setRating={setRating} />
        </div>

        <FormInput
          label="Review Title"
          id="reviewTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Give your review a title (optional)"
          required={false}
        />

        <FormInput
          label="Review"
          id="reviewBody"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your comments here"
          type="textarea"
          required
        />

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

        <FormInput
          label="Name (displayed publicly like John Smith)"
          id="reviewName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          required
        />

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

        <p className="text-xs text-gray-500 mb-6">
          How we use your data: We'll only contact you about the review you
          left, and only if necessary. By submitting your review, you agree to
          Judge.me's terms, privacy and content policies.
        </p>

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

const ReviewSummary = ({ reviews }) => {
  const totalReviews = reviews.length;
  if (totalReviews === 0) return null;

  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    distribution[r.rating]++;
  });

  return (
    <div className="w-full flex justify-between items-start space-x-8">
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

const ReviewItem = ({ review, onImageClick }) => {
  const reviewTitle = review.title || review.review.substring(0, 50) + "...";
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

      {review.mediaFile && (
        <div className="mt-4 flex flex-wrap gap-2">
          <img
            src={review.mediaFile}
            alt="Review media"
            className="w-20 h-20 object-cover rounded-md cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onImageClick(review.mediaFile)}
          />
        </div>
      )}
    </div>
  );
};

const ReviewList = ({
  reviews,
  onImageClick,
  reviewsToShow,
  setReviewsToShow,
}) => {
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
        newReviews = reviews;
        break;
    }
    setSortedReviews(newReviews);
    setReviewsToShow(5);
  }, [sortMethod, reviews, setReviewsToShow]);

  const INITIAL_LIMIT = 5;
  const displayedReviews = sortedReviews.slice(0, reviewsToShow);
  const hasMoreReviews = sortedReviews.length > reviewsToShow;
  const isFullyExpanded = reviewsToShow === sortedReviews.length;

  const handleShowMore = () => {
    setReviewsToShow(sortedReviews.length);
  };

  const handleCollapse = () => {
    setReviewsToShow(INITIAL_LIMIT);
  };

  return (
    <div className="w-full">
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

      <div>
        {displayedReviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
            onImageClick={onImageClick}
          />
        ))}
      </div>

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

const DeliveryInfo = () => (
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

const PaymentOptions = () => (
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
      <span className="ml-2 text-sm text-gray-500">
        ({displayReviewCount || 0})
      </span>
    </div>
  );
};

const ImageModal = ({ images = [], startIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [isVisible, setIsVisible] = useState(false);

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

  if (!images.length) return null;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <button
        className="absolute top-5 right-6 text-gray-800 text-3xl font-bold hover:text-black transition"
        onClick={handleClose}
        aria-label="Close"
      >
        &times;
      </button>

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

      <div className="absolute bottom-6 text-gray-600 text-sm opacity-80 select-none">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addRecentlyViewed } = useRecentlyViewed();
  const { currency } = useCurrency();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { toggleCompare, isInCompare } = useCompare();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFormat, setSelectedFormat] = useState("Paperback");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [enlargedImageUrl, setEnlargedImageUrl] = useState(null);
  const [qtyValue, setQtyValue] = useState(1);
  const [activeTab, setActiveTab] = useState("Description");
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [reviewsToShow, setReviewsToShow] = useState(5);
  const [reviews, setReviews] = useState([
    {
      id: 1,
      rating: 5,
      title: "Amazing product!",
      review: "This product exceeded my expectations. Highly recommended!",
      name: "John Smith",
      date: "2 weeks ago",
      mediaFile: null,
    },
    {
      id: 2,
      rating: 4,
      title: "Very good",
      review: "Great quality and fast delivery.",
      name: "Sarah Johnson",
      date: "1 month ago",
      mediaFile: null,
    },
    {
      id: 3,
      rating: 5,
      title: "Perfect!",
      review: "Exactly what I was looking for. Will buy again!",
      name: "Mike Davis",
      date: "1 month ago",
      mediaFile: null,
    },
  ]);

  const mainImageSliderRef = useRef(null);
  const addToCartRef = useRef(null);
  const [isStickyBarVisible, setIsStickyBarVisible] = useState(false);

  // 2. ADD STATE FOR QUICK VIEW PRODUCT
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadProduct = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProductById(productId);
        if (data && data.success) {
          // Backend returns { success: true, data: {...} }
          const foundProduct = data.data;
          setProduct(foundProduct);
          setSelectedFormat("Paperback");
          setSelectedImageIndex(0);
          setEnlargedImageUrl(null);
          setActiveTab("Description");
          setIsReviewFormVisible(false);
          setReviewSubmitted(false);

          setTimeout(() => {
            try {
              addRecentlyViewed(foundProduct);
            } catch (e) {
              console.error(e);
            }
          }, 0);
        } else {
          // Handle product not found or error structure
          console.error("Product not found or invalid response");
          navigate("/");
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [productId, navigate, addRecentlyViewed]);

  useEffect(() => {
    const checkVisibility = () => {
      try {
        const el = addToCartRef.current;
        if (!el) return setIsStickyBarVisible(false);
        const rect = el.getBoundingClientRect();
        setIsStickyBarVisible(rect.bottom < 0 || rect.top > window.innerHeight);
      } catch (e) {
        setIsStickyBarVisible(false);
      }
    };

    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);
    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, [addToCartRef, product]);

  if (isLoading || !product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  const thumbnailUrls = [product.imageUrl];

  const currentPriceDetails = getPriceDetails(
    product,
    selectedFormat,
    currency
  );
  const {
    formattedFinalPrice,
    formattedOriginalPrice,
    formattedDiscount,
    finalPrice,
    originalPrice,
    discount,
  } = currentPriceDetails;

  const relatedProductIds = ALL_PRODUCTS.filter(
    (p) => p.isHighlight === true && p.id !== parseInt(productId)
  )
    .slice(0, 4)
    .map((p) => p.id);

  const youMayAlsoLikeIds = ALL_PRODUCTS.filter(
    (p) => p.currentBestselling === true && p.id !== parseInt(productId)
  )
    .slice(0, 4)
    .map((p) => p.id);

  const plusplus = () => setQtyValue(qtyValue + 1);
  const minusminus = () => {
    if (qtyValue > 1) setQtyValue(qtyValue - 1);
  };

  const handleThumbnailClick = (index) => {
    if (mainImageSliderRef.current?.slickGoTo) {
      mainImageSliderRef.current.slickGoTo(index);
    }
    setSelectedImageIndex(index);
  };

  const handleFormatClick = (format) => {
    setSelectedFormat(format);
  };

  const handleImageEnlarge = (url) => {
    if (typeof url === "string") {
      setEnlargedImageUrl(url);
    } else {
      setEnlargedImageUrl(true);
    }
  };

  const getModalImages = () => {
    if (typeof enlargedImageUrl === "string") {
      return { images: [enlargedImageUrl], startIndex: 0 };
    }
    return { images: thumbnailUrls, startIndex: selectedImageIndex };
  };

  const modalData = enlargedImageUrl ? getModalImages() : null;

  const handleReviewSubmit = (newReview) => {
    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: "Just now",
    };
    setReviews([review, ...reviews]);
    setIsReviewFormVisible(false);
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  const handleViewProduct = (product) => {
    addRecentlyViewed(product);
    navigate(`/product/${product.id}`);
  };

  const handleRefreshPage = () => {
    window.location.reload();
  };

  const handleWishlistClick = () => {
    toggleWishlist(product);
  };

  const handleCompareClick = () => {
    toggleCompare(product);
  };

  const mainSliderSettings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    beforeChange: (oldIndex, newIndex) => {
      setSelectedImageIndex(newIndex);
    },
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
        <li className="text-gray-700">{product.title}</li>
      </ol>
    </nav>
  );

  const renderTabContent = (tabName) => {
    if (tabName === "Description") {
      return (
        <div>
          <p className="mb-4">
            {product.description ||
              `From the author of The Longest Ride and The Return comes a novel about the enduring legacy of first love, and the decisions that haunt us forever. 1996 was the year that changed everything for Maggie Dawes. Sent away at sixteen to live with an aunt she barely knew in Ocracoke, a remote village on North Carolina's Outer Banks, she could think only of the friends and family she left behind . . . until she met Bryce Trickett, one of the few teenagers on the island.`}
          </p>
        </div>
      );
    }
    if (tabName === "Additional Information") {
      return (
        <div>
          <div className="mb-4 opacity-80">
            <p>By changing our most important processes and</p>
            <p>
              products, we have already made a big leap forward. This ranges
              from the
            </p>
            <p>increased use of more sustainable fibers to the use of more</p>
            <p>
              environmentally friendly printing processes to the development of
            </p>
            <p>efficient waste management in our value chain.</p>
          </div>
          <a href="#" className="opacity-80 underline hover:text-gray-900">
            Learn more about sustainability
          </a>
        </div>
      );
    }
    if (tabName === "Reviews") {
      return (
        <div className="flex flex-col items-center justify-center text-center w-full">
          {reviewSubmitted && (
            <div className="w-full max-w-4xl mx-auto p-4 mb-8 bg-green-50 border-2 border-green-200 rounded-lg">
              <h3 className="text-xl font-semibold mb-2 text-green-700">
                Review Submitted!
              </h3>
              <p className="text-sm text-green-700 mb-4">
                Thank you! Please refresh the page in a few moments to see your
                review. You can remove or edit your review by logging into{" "}
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

          {isReviewFormVisible ? (
            <ReviewForm
              onCancel={() => setIsReviewFormVisible(false)}
              onSubmit={handleReviewSubmit}
            />
          ) : (
            <>
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
                <div className="w-full max-w-4xl mx-auto text-left">
                  <h3 className="text-xl font-semibold mb-6 text-gray-900 text-center">
                    Customer Reviews
                  </h3>
                  <div className="flex flex-col lg:flex-row justify-between gap-8 items-center mb-6">
                    <div className="lg:w-2/3 w-full">
                      <ReviewSummary reviews={reviews} />
                    </div>
                    <div className="lg:w-1/3 w-full flex lg:justify-end justify-center items-start">
                      <button
                        className="py-3 px-6 bg-green-700 text-white font-bold rounded-lg hover:bg-green-600 transition-colors shadow-md"
                        onClick={() => {
                          setIsReviewFormVisible(true);
                          setReviewSubmitted(false);
                        }}
                      >
                        Write a review
                      </button>
                    </div>
                  </div>
                  <hr className="my-6 border-gray-200" />
                  <ReviewList
                    reviews={reviews}
                    onImageClick={handleImageEnlarge}
                    reviewsToShow={reviewsToShow}
                    setReviewsToShow={setReviewsToShow}
                  />
                </div>
              )}
            </>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-white">
      {modalData && (
        <ImageModal
          images={modalData.images}
          startIndex={modalData.startIndex}
          onClose={() => setEnlargedImageUrl(null)}
        />
      )}

      <StickyBottomBar
        isVisible={isStickyBarVisible}
        product={product}
        selectedFormat={selectedFormat}
        onFormatChange={handleFormatClick}
        priceDetails={currentPriceDetails}
        currency={currency}
        onAddToCart={(qty) => addToCart(product, qty, selectedFormat)}
      />

      <Breadcrumbs />

      <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 py-4">
        <div className="flex max-w-7xl mx-auto flex-col lg:flex-row gap-12 bg-white rounded-lg">
          <div className="lg:w-1/2 flex flex-col items-center">
            <div className="w-full max-w-full aspect-auto relative select-none">
              <Slider
                {...mainSliderSettings}
                ref={mainImageSliderRef}
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

              <div
                className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md cursor-zoom-in z-20"
                onClick={() => handleImageEnlarge(true)}
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

            <div className="flex space-x-2 mt-4 overflow-x-auto pb-2 w-full max-w-full justify-center">
              {thumbnailUrls.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 mt-1 h-auto object-cover rounded-md cursor-pointer border-2 flex-shrink-0 transition-all duration-200 
                  ${
                    index === selectedImageIndex
                      ? "border-gray-900 ring-2 ring-offset-1 ring-gray-900"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>

          <div className="lg:w-1/2">
            <h1 className="text-4xl font-serif font-light text-gray-900 mb-2">
              {product.title}
            </h1>
            <p className="text-gray-600 mb-4">
              by <strong>{product.author}</strong>
            </p>

            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
            />

            <div className="flex items-center space-x-4 my-4 text-sm">
              <div className="flex items-center text-green-700">
                {product.isSoldOut === false ? (
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
                ) : (
                  ""
                )}
                <span>{product.isSoldOut ? "Out of Stock" : "In Stock"}</span>
              </div>
            </div>

            <hr className="h-px my-3 bg-gray-200 border-0" />

            <div className="flex items-center space-x-3 mb-6 py-4">
              <h2 className="text-4xl font-bold text-green-700">
                {formattedFinalPrice}
              </h2>
              {originalPrice > finalPrice && (
                <span className="text-2xl text-gray-400 line-through">
                  {formattedOriginalPrice}
                </span>
              )}
              {discount > 0 && (
                <span className="px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded">
                  Save {formattedDiscount}
                </span>
              )}
              {product.isSoldOut && (
                <span className="px-2 py-1 bg-gray-400 text-white text-xs font-semibold rounded-full">
                  Sold Out
                </span>
              )}
            </div>
            {product.saleEndDate && (
              <CountdownTimer saleEndDate={product.saleEndDate} />
            )}
            <div className="text-gray-700 mb-8">
              <p className="line-clamp-3">
                {product.description ||
                  `From the author of The Longest Ride and The Return comes a novel about the enduring legacy of first love, and the decisions that haunt us forever. 1996 was the year that changed everything for Maggie Dawes. Sent away at sixteen to live with an aunt she barely knew in Ocracoke, a remote village on North Carolina's Outer Banks, she could think only of the friends and family she left behind . . . until she met Bryce Trickett, one of the few teenagers on the island.`}
              </p>
            </div>

            <hr className="h-px my-3 bg-gray-200 border-0" />

            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                FORMAT:{" "}
                <span className="font-bold">
                  {selectedFormat.toUpperCase()}
                </span>
              </label>
              <div className="flex flex-wrap gap-3">
                {Object.keys(FORMAT_MULTIPLIERS).map((format) => (
                  <button
                    key={format}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      format === selectedFormat
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }
                      ${
                        product.isSoldOut
                          ? "opacity-50 cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    onClick={() => handleFormatClick(format)}
                  >
                    {format}
                  </button>
                ))}
              </div>
            </div>

            <hr className="h-px my-3 bg-gray-200 border-0" />

            <div
              className="flex flex-row gap-5 justify-center items-center space-y-4 mb-6"
              ref={addToCartRef}
            >
              <div className="flex mt-5 items-center border border-gray-300 rounded-lg">
                <button
                  onClick={minusminus}
                  className="px-3 py-2.5 text-black hover:bg-gray-50 rounded-l-lg"
                >
                  -
                </button>
                <input
                  type="number"
                  value={qtyValue}
                  min="1"
                  onChange={(e) =>
                    setQtyValue(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-12 text-center border-gray-300 text-black"
                />
                <button
                  onClick={plusplus}
                  className="px-3 py-2.5 text-gray-500 hover:bg-gray-50 rounded-r-lg"
                >
                  +
                </button>
              </div>

              {product.isSoldOut === false ? (
                <div className="flex flex-col sm:flex-row w-full max-w-lg gap-4">
                  <button
                    className="flex-1 bg-white text-green-700 font-bold py-2 px-4 md:py-3 md:px-6 rounded-full border-2 border-green-700 hover:bg-green-50 transition-colors shadow-md text-base md:text-lg"
                    onClick={() => handleAddToCart(qtyValue)}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="flex-1 bg-green-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-full hover:bg-green-600 transition-colors shadow-md text-base md:text-lg"
                    onClick={() => console.log(`Buy Now ${qtyValue} items`)}
                  >
                    Buy It Now
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row w-full max-w-lg gap-4">
                  <button
                    className="flex-1 bg-gray-400 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-full cursor-not-allowed shadow-md text-base md:text-lg"
                    disabled
                  >
                    Sold Out
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm mb-6 w-full">
              <button
                onClick={handleWishlistClick}
                className={`flex items-center transition-colors text-gray-600 hover:text-gray-900`}
              >
                <svg
                  className={`w-4 h-4 mr-1 ${
                    isInWishlist(product.id) ? "fill-current" : "fill-none"
                  } ${
                    isInWishlist(product.id)
                      ? "text-red-600 hover:text-red-700"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z"
                  />
                </svg>
                {isInWishlist(product.id)
                  ? "Remove From Wishlist"
                  : "Add To Wishlist"}
              </button>
              <button
                onClick={handleCompareClick}
                className={`flex items-center transition-colors text-gray-600 hover:text-gray-900`}
              >
                <Repeat
                  className={`w-4 h-4 mr-1 ${
                    isInCompare(product.id) ? "text-red-600" : "text-gray-600"
                  }`}
                />
                {isInCompare(product.id)
                  ? "Remove From Compare"
                  : "Add To Compare"}
              </button>
            </div>
            <hr className="h-px my-3 bg-gray-200 border-0" />
            <DeliveryInfo />
            <PaymentOptions />
            <div className="mt-6 text-s text-gray-500">
              <p>
                <strong>Categories:</strong> Books, Books New, Fantasy, Fiction,
                Kids Books, Non Fiction
              </p>
              <p className="mt-2">
                <strong>Tags:</strong> Ebook
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-6">
              <a
                href="#"
                aria-label="Share on Facebook"
                className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center transition-colors hover:bg-blue-700"
              >
                <FontAwesomeIcon icon={faFacebookF} className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Share on X (Twitter)"
                className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center transition-colors hover:bg-sky-600"
              >
                <FontAwesomeIcon icon={faTwitter} className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Share on Pinterest"
                className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center transition-colors hover:bg-red-700"
              >
                <FontAwesomeIcon icon={faPinterestP} className="w-4 h-4" />
              </a>
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

        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-25">
          <hr className="h-px my-3 bg-gray-200 border-0" />

          {/* Desktop Tabs */}
          <div className="hidden md:block">
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
                        setIsReviewFormVisible(false);
                        setReviewSubmitted(false);
                      }}
                      className={`
                  ${
                    tab === activeTab
                      ? "bg-green-900 text-white font-semibold  shadow-md"
                      : "bg-white text-gray-900 font-medium"
                  }
                  whitespace-nowrap py-4 px-8 text-sm transition-colors rounded-md border border-transparent 
                   ${tab !== activeTab ? "hover:bg-gray-100" : ""}
                `}
                    >
                      {tab}
                    </a>
                  )
                )}
              </nav>
            </div>
            <hr className="h-px my-3 bg-gray-200 border-0" />

            <div className="py-8 text-gray-700">
              {renderTabContent(activeTab)}
            </div>
          </div>

          {/* Mobile Accordion */}
          <div className="md:hidden">
            {["Description", "Additional Information", "Reviews"].map((tab) => (
              <div key={tab} className="border-b border-gray-200">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(activeTab === tab ? "" : tab);
                    if (tab !== activeTab) {
                      setIsReviewFormVisible(false);
                      setReviewSubmitted(false);
                    }
                  }}
                  className={`w-full flex justify-between items-center py-4 px-4 text-left font-medium 
                    ${
                      activeTab === tab
                        ? "bg-gray-50 text-green-900"
                        : "text-gray-900 bg-white"
                    }
                  `}
                >
                  {tab}
                  <span className="ml-2 text-xl leading-none">
                    {activeTab === tab ? "-" : "+"}
                  </span>
                </button>
                {activeTab === tab && (
                  <div className="p-4 bg-white text-gray-700">
                    {renderTabContent(tab)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. PASS onQuickView TO CAROUSELS */}
        <hr className="my-3 max-w-8xl mx-auto border-gray-200" />
        <div className="w-full max-w-8xlx-auto px-4 sm:px-6 lg:px-8">
          {relatedProductIds.length > 0 && (
            <ProductCarousel
              title="Related Products"
              productIds={relatedProductIds}
              onViewProduct={handleViewProduct}
              showBrowseButton={false}
              titleCenter={true}
              slidesToShowCount={4}
              onQuickView={(p) => setQuickViewProduct(p)} // Added
            />
          )}
        </div>

        <hr className="my-3 max-w-8xl mx-auto border-gray-200" />
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          {youMayAlsoLikeIds.length > 0 && (
            <ProductCarousel
              title="You may also like"
              productIds={youMayAlsoLikeIds}
              onViewProduct={handleViewProduct}
              showBrowseButton={false}
              titleCenter={true}
              slidesToShowCount={4}
              onQuickView={(p) => setQuickViewProduct(p)} // Added
            />
          )}
        </div>
        <div className="h-16"></div>
      </div>

      {/* 4. RENDER DRAWER */}
      <QuickViewDrawer
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        product={quickViewProduct}
      />
    </div>
  );
};

export default ProductDetailPage;
