import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle,
  Briefcase,
  Globe,
  Phone,
  Mail,
  GraduationCap,
} from "lucide-react";
import { userAPI, messageAPI } from "../services/api";

const FreelancerDetails = () => {
  const { id } = useParams();
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [modalTitle, setModalTitle] = useState("Send Message");

  // Booking Form State
  const [bookingData, setBookingData] = useState({ name: "", email: "" });
  const [bookingLoading, setBookingLoading] = useState(false);

  // Review Form State
  const [reviewData, setReviewData] = useState({
    name: "",
    email: "",
    comment: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchFreelancer = async () => {
      try {
        setLoading(true);
        const data = await userAPI.getById(id);

        // Map DB fields to component expectations
        const mapped = {
          ...data,
          id: data._id,
          title: data.jobTitle,
          tags: data.skills || [],
          about: data.bio || "No bio available.",
          overview: {
            experience: data.experience || "N/A",
            language: data.languages?.join(", ") || "English",
            qualification: data.qualification || "N/A",
            phone: data.phone || "N/A",
            email: data.email,
          },
          // Generate sample skills description if not available
          skillsDescription:
            data.skills?.map((skill) => `Proficient in ${skill}`) || [],
          talentAndExperience: [
            `${data.experience || "Several years"} of professional experience`,
            `Specialized in ${data.specialization || "various fields"}`,
            `Based in ${data.location || "Remote"}`,
          ],
          reviewsList: [], // Reviews would come from a separate collection
        };
        setFreelancer(mapped);
      } catch (err) {
        console.error("Failed to fetch freelancer:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchFreelancer();
    }
  }, [id]);

  // Handle Message Modal
  const handleMessage = () => {
    setModalTitle("Send Message");
    setMessageContent("");
    setIsMessageModalOpen(true);
  };

  const handleInvite = () => {
    setModalTitle("Invite to Job");
    setMessageContent(
      `Hi ${freelancer.name},\n\nI'd like to invite you to apply for a job position we have open.\n\nBest regards,`,
    );
    setIsMessageModalOpen(true);
  };

  const handleSendMessage = async () => {
    if (!messageContent.trim()) return;
    setSendingMessage(true);
    try {
      await messageAPI.send(freelancer.id, messageContent);
      alert("Message sent successfully!");
      setIsMessageModalOpen(false);
      setMessageContent("");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert(
        error.message ||
          "Failed to send message. Please ensure you are logged in.",
      );
    } finally {
      setSendingMessage(false);
    }
  };

  // Handle Booking
  const handleBookFreelancer = async (e) => {
    e.preventDefault();
    if (!bookingData.name || !bookingData.email) {
      alert("Please fill in all fields");
      return;
    }
    setBookingLoading(true);
    try {
      const content = `New Booking Inquiry:\nName: ${bookingData.name}\nEmail: ${bookingData.email}\n\nI am interested in booking your services.`;
      await messageAPI.send(freelancer.id, content);
      alert("Booking inquiry sent successfully!");
      setBookingData({ name: "", email: "" });
    } catch (error) {
      console.error("Failed to book:", error);
      alert(
        error.message ||
          "Failed to send booking inquiry. Please ensure you are logged in.",
      );
    } finally {
      setBookingLoading(false);
    }
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    alert("Review submitted successfully! (Pending approval)");
    setReviewData({ name: "", email: "", comment: "" });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5BBB7B] mx-auto mb-4"></div>
          <p className="text-slate-500">Loading freelancer details...</p>
        </div>
      </div>
    );
  }

  if (error || !freelancer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#002333]">
            Freelancer Not Found
          </h2>
          <p className="text-slate-500 mt-2">{error}</p>
          <Link
            to="/freelancers"
            className="text-[#5BBB7B] hover:underline mt-4 inline-block"
          >
            Back to Freelancers
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* 1. Header Section */}
      <section className="bg-[#f0f5fa] py-16 md:py-24 text-center border-b border-slate-100">
        <h1 className="text-3xl md:text-[40px] font-bold text-[#002333] mb-3 tracking-tight">
          Freelancer Details
        </h1>
        <div className="flex items-center justify-center gap-2 text-[15px] font-medium">
          <Link
            to="/"
            className="text-slate-500 hover:text-[#5BBB7B] transition-colors"
          >
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <Link
            to="/freelancers"
            className="text-slate-500 hover:text-[#5BBB7B] transition-colors"
          >
            Freelancers
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-[#5BBB7B]">Freelancer Details</span>
        </div>
      </section>

      {/* 2. Banner Section */}
      <section className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 mt-12 relative z-10 pb-20">
        <div className="bg-white rounded-lg shadow-xl shadow-slate-200/60 overflow-hidden flex flex-col lg:flex-row">
          {/* Left Side: Image */}
          <div className="w-full lg:w-[280px] xl:w-[320px] h-[250px] lg:h-auto shrink-0 relative bg-slate-100">
            <img
              src={freelancer.image}
              alt={freelancer.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x300?text=Freelancer";
              }}
            />
          </div>

          {/* Right Side: Content */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
            {/* Top Row: Title & Action Buttons */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
              <div>
                <h2 className="text-xl md:text-[22px] font-bold text-[#004A61] leading-tight max-w-2xl">
                  {freelancer.name}
                </h2>
                <p className="text-[#5BBB7B] font-medium mt-1">
                  {freelancer.title || freelancer.specialization}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 shrink-0">
                <button
                  onClick={handleInvite}
                  className="px-6 py-3.5 bg-[#5B6CF6] text-white font-bold rounded-md transition-all duration-500 overflow-hidden shadow-lg shadow-blue-500/20 text-sm inline-flex items-center justify-center relative group"
                >
                  <span className="absolute inset-0 bg-[#002333] transition-transform duration-700 ease-in-out scale-x-0 group-hover:scale-x-100 origin-center" />
                  <span className="relative z-10">Invite</span>
                </button>
                <button
                  onClick={handleMessage}
                  className="px-6 py-3.5 bg-[#5BBB7B] text-white font-bold rounded-md transition-all duration-500 overflow-hidden shadow-lg shadow-green-500/20 text-sm inline-flex items-center justify-center relative group"
                >
                  <span className="absolute inset-0 bg-[#002333] transition-transform duration-700 ease-in-out scale-x-0 group-hover:scale-x-100 origin-center" />
                  <span className="relative z-10">Message</span>
                </button>
              </div>
            </div>

            {/* Middle Row: Meta Data */}
            <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-[#A0ABB8] text-[15px] mb-6 font-medium">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(freelancer.rating)
                        ? "text-[#FFB800] fill-[#FFB800]"
                        : "text-slate-200 fill-none"
                    }
                  />
                ))}
                <span className="ml-1 text-slate-500">
                  {freelancer.rating.toFixed(1)} ({freelancer.reviews} Review)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin
                  size={18}
                  className="text-[#5BBB7B]"
                  strokeWidth={2.5}
                />
                <span className="text-[#A0ABB8]">{freelancer.location}</span>
              </div>
            </div>

            {/* Bottom Row: Tags & Social Share */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {freelancer.tags &&
                  freelancer.tags.slice(0, 4).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-md bg-[#EFF2FC] text-[#5569CC] text-sm font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
              </div>

              {/* Social Share */}
              <div className="flex items-center gap-5">
                <span className="text-[#002333] font-bold text-[15px]">
                  Share With Us
                </span>
                <div className="flex gap-2.5">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="w-9 h-9 flex items-center justify-center rounded-full bg-[#f0f5fa] text-[#002333] hover:bg-[#5BBB7B] hover:text-white transition-all duration-300"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Section */}
      <section className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Detailed Description Area */}
          <div className="flex-1 space-y-12 text-slate-500">
            {/* About */}
            <div className="space-y-6">
              <h3 className="text-[24px] font-bold text-[#002333]">
                About Freelancer
              </h3>
              <div className="space-y-6 text-[16px] leading-loose text-slate-600 font-light whitespace-pre-line">
                {freelancer.about}
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              <h3 className="text-[22px] font-bold text-[#002333]">
                Skills & Knowledge
              </h3>
              <ul className="space-y-4">
                {freelancer.skillsDescription?.map((skill, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 text-[15px] group"
                  >
                    <CheckCircle
                      size={20}
                      className="text-[#5BBB7B] mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                      strokeWidth={2.5}
                    />
                    <span className="text-slate-600 leading-6">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Talent & Experience */}
            <div className="space-y-6">
              <h3 className="text-[22px] font-bold text-[#002333]">
                Talent & Experience
              </h3>
              <ul className="space-y-4">
                {freelancer.talentAndExperience?.map((exp, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-4 text-[15px] group"
                  >
                    <CheckCircle
                      size={20}
                      className="text-[#5BBB7B] mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                      strokeWidth={2.5}
                    />
                    <span className="text-slate-600 leading-6">{exp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews Section - Kept within the main column */}
            <div className="space-y-6 pt-8 border-t border-slate-100">
              <h3 className="text-[24px] font-bold text-[#002333]">
                {freelancer.reviewsList?.length || 0} Comments
              </h3>
              <div className="space-y-8 mb-10">
                {freelancer.reviewsList?.map((review, idx) => (
                  <div key={idx} className="flex gap-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-[#002333] font-bold">
                          {review.name}
                        </h4>
                        <span className="text-sm text-[#888]">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-[#5BBB7B] text-xs font-medium mb-3">
                        {review.title}
                      </p>
                      <p className="text-slate-500 text-sm leading-6">
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Review Form */}
              <h3 className="text-[20px] font-bold text-[#002333]">
                Add a Review
              </h3>
              <form
                onSubmit={handleReviewSubmit}
                className="space-y-6 bg-[#F5F7FC] p-8 rounded-lg"
              >
                <textarea
                  placeholder="Comment"
                  required
                  value={reviewData.comment}
                  onChange={(e) =>
                    setReviewData({ ...reviewData, comment: e.target.value })
                  }
                  className="w-full h-32 bg-white border border-slate-200 rounded-lg p-4 focus:outline-none focus:border-[#5BBB7B] transition-colors resize-none"
                ></textarea>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    required
                    placeholder="Name"
                    value={reviewData.name}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, name: e.target.value })
                    }
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#5BBB7B] transition-colors"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    value={reviewData.email}
                    onChange={(e) =>
                      setReviewData({ ...reviewData, email: e.target.value })
                    }
                    className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-[#5BBB7B] transition-colors"
                  />
                </div>
                <button className="px-8 py-3 bg-[#5BBB7B] text-white font-semibold rounded-md transition-all relative overflow-hidden z-10 before:absolute before:inset-0 before:bg-[#002333] before:origin-center before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 before:-z-10">
                  Submit Review
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-[400px] space-y-8">
            {/* Job Overview */}
            <div className="bg-[#F5F7FC] rounded-lg p-8">
              <h4 className="text-[18px] font-bold text-[#002333] mb-6">
                Job Overview
              </h4>

              <div className="space-y-6">
                {/* Experience */}
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 mt-1 transition-transform group-hover:scale-110 duration-300">
                    <Briefcase
                      className="text-[#5BBB7B]"
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#002333] text-[15px] mb-1 group-hover:text-[#5BBB7B] transition-colors">
                      Experience
                    </h5>
                    <p className="text-slate-500 text-[14px]">
                      {freelancer.overview?.experience}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 mt-1 transition-transform group-hover:scale-110 duration-300">
                    <MapPin
                      className="text-[#5BBB7B]"
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#002333] text-[15px] mb-1 group-hover:text-[#5BBB7B] transition-colors">
                      Location
                    </h5>
                    <p className="text-slate-500 text-[14px]">
                      {freelancer.location}
                    </p>
                  </div>
                </div>

                {/* Language */}
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 mt-1 transition-transform group-hover:scale-110 duration-300">
                    <Globe
                      className="text-[#5BBB7B]"
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#002333] text-[15px] mb-1 group-hover:text-[#5BBB7B] transition-colors">
                      Language
                    </h5>
                    <p className="text-slate-500 text-[14px]">
                      {freelancer.overview?.language}
                    </p>
                  </div>
                </div>

                {/* Qualification */}
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 mt-1 transition-transform group-hover:scale-110 duration-300">
                    <GraduationCap
                      className="text-[#5BBB7B]"
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#002333] text-[15px] mb-1 group-hover:text-[#5BBB7B] transition-colors">
                      Qualification
                    </h5>
                    <p className="text-slate-500 text-[14px]">
                      {freelancer.overview?.qualification}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 mt-1 transition-transform group-hover:scale-110 duration-300">
                    <Phone
                      className="text-[#5BBB7B]"
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#002333] text-[15px] mb-1 group-hover:text-[#5BBB7B] transition-colors">
                      Phone
                    </h5>
                    <p className="text-slate-500 text-[14px]">
                      {freelancer.overview?.phone}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 mt-1 transition-transform group-hover:scale-110 duration-300">
                    <Mail
                      className="text-[#5BBB7B]"
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#002333] text-[15px] mb-1 group-hover:text-[#5BBB7B] transition-colors">
                      Email
                    </h5>
                    <p className="text-slate-500 text-[14px] text-xs break-all">
                      {freelancer.overview?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Form */}
            <div className="bg-[#F5F7FC] rounded-lg p-8">
              <h3 className="text-lg font-bold text-[#002333] mb-6">
                Booking Freelancer
              </h3>
              <form onSubmit={handleBookFreelancer} className="space-y-4">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={bookingData.name}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, name: e.target.value })
                  }
                  className="w-full bg-white border border-[#E0E6F7] rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#5BBB7B] transition-colors"
                />
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={bookingData.email}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, email: e.target.value })
                  }
                  className="w-full bg-white border border-[#E0E6F7] rounded-md px-4 py-3 text-sm focus:outline-none focus:border-[#5BBB7B] transition-colors"
                />
                <button
                  disabled={bookingLoading}
                  className="w-full py-3 bg-[#5BBB7B] text-white font-bold rounded-md transition-all duration-500 overflow-hidden shadow-lg shadow-green-500/20 text-sm flex items-center justify-center relative group"
                >
                  <span className="absolute inset-0 bg-[#002333] transition-transform duration-700 ease-in-out scale-x-0 group-hover:scale-x-100 origin-center" />
                  <span className="relative z-10">
                    {bookingLoading ? "Sending..." : "Book Now"}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Message Modal - Reused Style */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
            onClick={() => setIsMessageModalOpen(false)}
          />
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg z-50 overflow-hidden relative animate-fade-in-up">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={freelancer.image}
                  alt={freelancer.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <h3 className="text-lg font-bold text-[#002333]">
                    {modalTitle}
                  </h3>
                  <p className="text-sm text-[#5E6670]">
                    To: {freelancer.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="p-2 bg-slate-50 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <label className="block text-sm font-bold text-[#002333] mb-3">
                Your Message
              </label>
              <textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Type your message here..."
                rows={6}
                className="w-full bg-[#F9FBFC] border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#5BBB7B] transition-colors resize-none"
                disabled={sendingMessage}
              />
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 border-t border-slate-100">
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-md text-sm font-medium hover:bg-slate-200 transition-colors"
                disabled={sendingMessage}
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={sendingMessage || !messageContent.trim()}
                className="flex-1 flex items-center justify-center gap-2 bg-[#5BBB7B] text-white px-4 py-2.5 rounded-md text-sm font-medium transition-all relative overflow-hidden z-10 before:absolute before:inset-0 before:bg-[#002333] before:origin-center before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100 before:-z-10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sendingMessage ? (
                  <span>Sending...</span>
                ) : (
                  <span>Send Message</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerDetails;
