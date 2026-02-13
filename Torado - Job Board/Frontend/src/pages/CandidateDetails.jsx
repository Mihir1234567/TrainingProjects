import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Star,
  Download,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Clock,
  DollarSign,
  Globe,
  Award,
  Phone,
  Mail,
  CheckCircle,
  Banknote,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { userAPI, messageAPI, API_BASE_URL } from "../services/api";
import candidateDetailsImg from "../assets/candidate-details-img.jpg";

const CandidateDetails = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Message Modal State
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCandidate = async () => {
      try {
        const data = await userAPI.getById(id);
        // Transform data if necessary to match UI structure
        // The UI uses some specific fields like fundamentalSkills, etc.
        // Our seed data has these, but fallback handling is good.
        setCandidate(data);
      } catch (err) {
        console.error("Failed to fetch candidate details:", err);
        setError("Candidate not found or error loading details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCandidate();
  }, [id]);

  // Handle message modal
  const handleOpenMessage = () => {
    setIsMessageModalOpen(true);
    setMessageContent("");
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (!messageContent.trim()) {
      alert("Please enter a message");
      return;
    }

    setSendingMessage(true);
    try {
      await messageAPI.send(candidate._id, messageContent);
      alert("Message sent successfully!");
      setIsMessageModalOpen(false);
      setMessageContent("");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert(error.message || "Failed to send message. Please try again.");
    } finally {
      setSendingMessage(false);
    }
  };

  // Handle download CV
  const handleDownloadCV = async () => {
    try {
      // First, check if candidate has a dashboard-created resume
      const response = await fetch(
        `http://localhost:5001/api/resumes?userId=${candidate._id}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("torado_user") || sessionStorage.getItem("torado_user") || "{}").token}`,
          },
        },
      );

      if (response.ok) {
        const resumes = await response.json();
        if (resumes && resumes.length > 0) {
          // Navigate to resume viewer for the first resume
          window.open(`/resume-viewer/${resumes[0]._id}`, "_blank");
          return;
        }
      }
    } catch (error) {
      console.error("Error checking for dashboard resumes:", error);
    }

    // Fall back to uploaded resume file
    if (!candidate.resumeUrl) {
      alert("This candidate hasn't uploaded a resume yet.");
      return;
    }

    const link = document.createElement("a");
    link.href = `${API_BASE_URL}${candidate.resumeUrl}`;
    link.download = `${candidate.name.replace(/\s+/g, "_")}_Resume.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FBFC]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#5BBB7B] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">
            Loading candidate details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FBFC]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#002333] mb-2">
            {error || "Candidate Not Found"}
          </h2>
          <Link
            to="/candidates"
            className="text-[#5BBB7B] hover:underline font-medium"
          >
            Back to Candidates
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
          Candidate Details
        </h1>
        <div className="flex items-center justify-center gap-2 text-[15px] font-medium">
          <Link
            to="/"
            className="text-slate-500 hover:text-[#5BBB7B] transition-colors"
          >
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-[#5BBB7B]">Candidate Details</span>
        </div>
      </section>

      {/* 2. Banner Section */}
      <section className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 mt-12 relative z-10 pb-20">
        <div className="bg-white rounded-lg shadow-xl shadow-slate-200/60 overflow-hidden flex flex-col lg:flex-row lg:items-start">
          {/* Left Side: Image */}
          <div className="w-full lg:w-[260px] xl:w-[300px] h-[300px] lg:h-[260px] shrink-0 relative bg-slate-100">
            <img
              src={candidate.image || candidateDetailsImg}
              alt={candidate.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x400?text=Candidate";
              }}
            />
          </div>

          {/* Right Side: Content */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
            {/* Top Row: Title & Action Buttons */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-4">
              <div>
                <h2 className="text-xl md:text-[22px] font-bold text-[#004A61] leading-tight max-w-2xl">
                  {candidate.name}
                </h2>
                <p className="text-[#5BBB7B] font-medium mt-1">
                  {candidate.jobTitle || candidate.specialization}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 shrink-0">
                <button
                  onClick={handleDownloadCV}
                  className="group relative px-6 py-3.5 bg-[#5BBB7B] text-white font-bold rounded-md transition-all duration-500 overflow-hidden shadow-lg shadow-green-500/20 text-sm inline-flex items-center justify-center gap-2"
                >
                  <span className="absolute inset-0 bg-[#002333] transition-transform duration-700 ease-in-out scale-x-0 group-hover:scale-x-100 origin-center" />
                  <span className="relative z-10 flex items-center gap-2">
                    <Download size={18} /> Download CV
                  </span>
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
                      i < Math.floor(candidate.rating || 0)
                        ? "text-[#FFB800] fill-[#FFB800]"
                        : "text-slate-200 fill-none"
                    }
                  />
                ))}
                <span className="ml-1 text-slate-500">
                  {(candidate.rating || 0).toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin
                  size={18}
                  className="text-[#5BBB7B]"
                  strokeWidth={2.5}
                />
                <span className="text-[#A0ABB8]">
                  {candidate.location || "Location N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Banknote
                  size={18}
                  className="text-[#5BBB7B]"
                  strokeWidth={2.5}
                />
                <span className="text-[#A0ABB8]">
                  {candidate.rate || "Negotiable"}
                </span>
              </div>
            </div>

            {/* Bottom Row: Tags & Social Share */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {candidate.skills &&
                  candidate.skills.slice(0, 3).map((tag, idx) => (
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
            {/* About Me */}
            <div className="space-y-6">
              <h3 className="text-[24px] font-bold text-[#002333]">About Me</h3>
              <div className="space-y-6 text-[16px] leading-loose text-slate-600 font-light whitespace-pre-line">
                {candidate.bio ||
                  candidate.aboutMe ||
                  "No description provided."}
              </div>
            </div>

            {/* Fundamental Skills */}
            {candidate.fundamentalSkills &&
              candidate.fundamentalSkills.length > 0 && (
                <div className="space-y-6">
                  <h3 className="text-[22px] font-bold text-[#002333]">
                    Fundamental Learning, Skills, & Knowledge
                  </h3>
                  <ul className="space-y-4">
                    {candidate.fundamentalSkills.map((skill, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-4 text-[15px] group"
                      >
                        <CheckCircle
                          size={20}
                          className="text-[#5BBB7B] mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                          strokeWidth={2.5}
                        />
                        <span className="text-slate-600 leading-6">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {/* Skills */}
            <div className="space-y-6">
              <h3 className="text-[22px] font-bold text-[#002333]">Skills</h3>
              <ul className="space-y-4">
                {candidate.skills &&
                  candidate.skills.map((skill, idx) => (
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

            {/* Work Experiences */}
            <div className="space-y-6">
              <h3 className="text-[24px] font-bold text-[#002333]">
                Work Experiences
              </h3>
              <div className="space-y-6 text-[16px] leading-loose text-slate-600 font-light whitespace-pre-line">
                {candidate.experience
                  ? `${candidate.experience} of experience in the field.`
                  : "No experience listed."}
                {candidate.workExperience && (
                  <div className="mt-4">{candidate.workExperience}</div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebars Area */}
          <div className="w-full lg:w-[400px] space-y-8">
            <div className="bg-[#F5F7FC] rounded-lg p-8">
              <h4 className="text-[18px] font-bold text-[#002333] mb-6">
                Job Overview
              </h4>

              <div className="space-y-6">
                {/* Experience */}
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 mt-1 transition-transform group-hover:scale-110 duration-300">
                    <Clock
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
                      {candidate.experience || "Not specified"}
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
                      {candidate.location || "Remote"}
                    </p>
                  </div>
                </div>

                {/* Offered Salary */}
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 mt-1 transition-transform group-hover:scale-110 duration-300">
                    <DollarSign
                      className="text-[#5BBB7B]"
                      size={22}
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#002333] text-[15px] mb-1 group-hover:text-[#5BBB7B] transition-colors">
                      Offered Salary
                    </h5>
                    <p className="text-slate-500 text-[14px]">
                      {candidate.rate || "Negotiable"}
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
                      {candidate.languages
                        ? candidate.languages.join(", ")
                        : "English"}
                    </p>
                  </div>
                </div>

                {/* Qualification */}
                <div className="flex items-start gap-4 group">
                  <div className="shrink-0 mt-1 transition-transform group-hover:scale-110 duration-300">
                    <Award
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
                      {candidate.qualification || "Degree"}
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
                      {candidate.phone || "Not available"}
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
                      {candidate.email || "Not available"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleOpenMessage}
                  className="w-full py-3 bg-[#5BBB7B] text-white font-bold rounded-md transition-all duration-500 overflow-hidden shadow-lg shadow-green-500/20 text-sm flex items-center justify-center relative group"
                >
                  <span className="absolute inset-0 bg-[#002333] transition-transform duration-700 ease-in-out scale-x-0 group-hover:scale-x-100 origin-center" />
                  <span className="relative z-10 flex items-center gap-2">
                    <MessageCircle size={18} /> Send Message
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Message Modal */}
      {isMessageModalOpen && candidate && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
            onClick={() => setIsMessageModalOpen(false)}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div
              className="bg-white rounded-lg shadow-2xl w-full max-w-lg pointer-events-auto transform transition-all duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img
                    src={candidate.image || candidateDetailsImg}
                    alt={candidate.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-[#002333]">
                      Send Message
                    </h3>
                    <p className="text-sm text-[#5E6670]">
                      To: {candidate.name}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMessageModalOpen(false)}
                  className="p-2 bg-slate-50 rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  <X size={20} />
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
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CandidateDetails;
