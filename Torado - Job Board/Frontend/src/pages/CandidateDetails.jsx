import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  MapPin,
  Star,
  Download,
  Share2,
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
  Briefcase,
  Layers,
  User,
  FileText,
  Calendar,
  Grid,
  Banknote,
} from "lucide-react";
import candidates from "../data/Candidates.json";
import candidateDetailsImg from "../assets/candidate-details-img.jpg";

const CandidateDetails = () => {
  const { id } = useParams();
  const candidate = candidates.find((c) => c.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9FBFC]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#002333] mb-2">
            Candidate Not Found
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
        <div className="bg-white rounded-lg shadow-xl shadow-slate-200/60 overflow-hidden flex flex-col lg:flex-row">
          {/* Left Side: Image */}
          <div className="w-full lg:w-[350px] xl:w-[400px] h-[300px] lg:h-auto shrink-0 relative bg-slate-100">
            <img
              src={candidateDetailsImg}
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
                  {candidate.specialization}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 shrink-0">
                <button className="group relative px-6 py-3.5 bg-[#5BBB7B] text-white font-bold rounded-md transition-all duration-500 overflow-hidden shadow-lg shadow-green-500/20 text-sm inline-flex items-center justify-center gap-2">
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
                      i < Math.floor(candidate.rating)
                        ? "text-[#FFB800] fill-[#FFB800]"
                        : "text-slate-200 fill-none"
                    }
                  />
                ))}
                <span className="ml-1 text-slate-500">
                  {candidate.rating.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin
                  size={18}
                  className="text-[#5BBB7B]"
                  strokeWidth={2.5}
                />
                <span className="text-[#A0ABB8]">{candidate.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Banknote
                  size={18}
                  className="text-[#5BBB7B]"
                  strokeWidth={2.5}
                />
                <span className="text-[#A0ABB8]">{candidate.rate}</span>
              </div>
            </div>

            {/* Bottom Row: Tags & Social Share */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {candidate.tags &&
                  candidate.tags.slice(0, 3).map((tag, idx) => (
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
                {candidate.aboutMe || "No description provided."}
              </div>
            </div>

            {/* Fundamental Skills */}
            <div className="space-y-6">
              <h3 className="text-[22px] font-bold text-[#002333]">
                Fundamental Learning, Skills, & Knowledge
              </h3>
              <ul className="space-y-4">
                {candidate.fundamentalSkills &&
                  candidate.fundamentalSkills.map((skill, idx) => (
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
                {candidate.workExperience || "No experience listed."}
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
                      {candidate.jobOverview?.experience || "Not specified"}
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
                      {candidate.jobOverview?.location || candidate.location}
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
                      {candidate.jobOverview?.offeredSalary || candidate.rate}
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
                      {candidate.jobOverview?.language || "English"}
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
                      {candidate.jobOverview?.qualification ||
                        "Associate Degree"}
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
                      {candidate.jobOverview?.phone || "Not available"}
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
                      {candidate.jobOverview?.email || "Not available"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button className="w-full py-3 bg-[#5BBB7B] text-white font-bold rounded-md transition-all duration-500 overflow-hidden shadow-lg shadow-green-500/20 text-sm flex items-center justify-center relative group">
                  <span className="absolute inset-0 bg-[#002333] transition-transform duration-700 ease-in-out scale-x-0 group-hover:scale-x-100 origin-center" />
                  <span className="relative z-10">Send Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CandidateDetails;
