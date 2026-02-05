import React, { useMemo, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { jobsAPI, companiesAPI } from "../services/api";
import JobMap from "../components/jobs/JobMap";
import {
  MapPin,
  Globe,
  Mail,
  Phone,
  Calendar,
  Users,
  Clock,
  Briefcase,
  Share2,
  Bookmark,
  Beer,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  CheckCircle2,
} from "lucide-react";

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [companyJobs, setCompanyJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch Company Details
        const companyData = await companiesAPI.getById(id);
        setCompany(companyData);

        // 2. Fetch Jobs by Company ID
        if (companyData) {
          const jobsData = await jobsAPI.getAll({ companyId: id });
          // Handle response structure (obj.jobs or array)
          setCompanyJobs(jobsData.jobs || jobsData || []);
        }
      } catch (error) {
        console.error("Failed to fetch company details", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-[#5BBB7B] border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">Loading company...</p>
        </div>
      </div>
    );

  if (!company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#002333] mb-2">
            Company Not Found
          </h2>
          <Link
            to="/company-listing"
            className="text-[#5BBB7B] hover:underline font-medium"
          >
            Back to Companies
          </Link>
        </div>
      </div>
    );
  }

  // Ensure socials is an array (fallback)
  const socials = company.socials || [
    { icon: Facebook, link: "#" },
    { icon: Twitter, link: "#" },
    { icon: Instagram, link: "#" },
    { icon: Linkedin, link: "#" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-[#002333]">
      {/* 1. Header / Breadcrumb */}
      {/* 1. Header / Breadcrumb */}
      <section className="bg-[#f0f5fa] py-20 md:py-24 text-center border-b border-slate-100">
        <h1 className="text-3xl md:text-[40px] font-bold text-[#002333] mb-3 tracking-tight">
          Company Details
        </h1>
        <div className="flex items-center justify-center gap-2 text-[15px] font-medium">
          <Link
            to="/"
            className="text-slate-500 hover:text-[#5BBB7B] transition-colors"
          >
            Home
          </Link>
          <span className="text-slate-400">/</span>
          <span className="text-[#5BBB7B]">Company Details</span>
        </div>
      </section>

      <div className="max-w-[1350px] mx-auto px-4 md:px-6 lg:px-8 py-12">
        {/* 2. Banner Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 mb-12 relative overflow-hidden">
          {/* Large Banner Image Background (Optional - or just the side image like design) */}
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Image */}
            <div className="w-full lg:w-[350px] h-[250px] rounded-lg overflow-hidden shrink-0">
              <img
                src={company.banner}
                alt="Office"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right Content */}
            <div className="flex-1 w-full">
              <div className="flex flex-col xl:flex-row justify-between items-start gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{company.mission}</h2>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                    <MapPin size={16} className="text-[#5BBB7B]" />
                    {company.location}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-500 mb-6">
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                      Full Time
                    </span>
                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full">
                      Private
                    </span>
                    <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full">
                      Urgent
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  {/* Share */}
                  <button className="w-10 h-10 rounded-full bg-[#EBF1F5] flex items-center justify-center text-[#002333] hover:bg-[#5BBB7B] hover:text-white transition-colors">
                    <Share2 size={18} />
                  </button>
                  {/* Contact Us */}
                  <button className="group/btn relative bg-[#5BBB7B] text-white px-6 py-2.5 rounded-md font-semibold overflow-hidden">
                    <span className="absolute inset-0 bg-[#004658] transition-transform duration-500 ease-out scale-x-0 group-hover/btn:scale-x-100 origin-center"></span>
                    <span className="relative z-10">Contact Us</span>
                  </button>
                </div>
              </div>

              {/* Socials & Share Text */}
              <div className="flex items-center justify-start md:justify-end gap-3 text-sm text-slate-500 mt-6 md:mt-0">
                <span>Share With Us</span>
                {company.socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    className="w-8 h-8 rounded-full bg-[#EBF1F5] flex items-center justify-center text-[#002333] hover:bg-[#5BBB7B] hover:text-white transition-colors"
                  >
                    <social.icon size={14} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* About Us */}
            {(company.aboutUs || company.description) && (
              <section>
                <h3 className="text-[22px] font-bold text-[#002333] mb-4">
                  About Us
                </h3>
                <p className="text-slate-500 leading-relaxed whitespace-pre-line">
                  {company.aboutUs || company.description}
                </p>
              </section>
            )}

            {/* Fundamental Learning, Skills, & Knowledge */}
            {company.skills && company.skills.length > 0 && (
              <section>
                <div className="bg-red-100 p-2 mb-2 text-xs font-mono">
                  DEBUG: {JSON.stringify(company.skills)}
                </div>
                <h3 className="text-[22px] font-bold text-[#002333] mb-4">
                  Fundamental Learning, Skills, & Knowledge
                </h3>
                <ul className="space-y-3">
                  {company.skills.map((skill, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-500"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-[#5BBB7B] shrink-0 mt-1"
                      />
                      <span className="leading-relaxed">{skill}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Talent & Experience */}
            {company.talent && company.talent.length > 0 && (
              <section>
                <h3 className="text-[22px] font-bold text-[#002333] mb-4">
                  Talent & Experience
                </h3>
                <ul className="space-y-3">
                  {company.talent.map((exp, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-slate-500"
                    >
                      <CheckCircle2
                        size={18}
                        className="text-[#5BBB7B] shrink-0 mt-1"
                      />
                      <span className="leading-relaxed">{exp}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Recruitments */}
            {company.recruitments && (
              <section>
                <h3 className="text-[22px] font-bold text-[#002333] mb-4">
                  Recruitments
                </h3>
                <p className="text-slate-500 leading-relaxed whitespace-pre-line">
                  {company.recruitments}
                </p>
              </section>
            )}

            {/* People */}
            {company.people && (
              <section>
                <h3 className="text-[22px] font-bold text-[#002333] mb-4">
                  People
                </h3>
                <p className="text-slate-500 leading-relaxed whitespace-pre-line">
                  {company.people}
                </p>
              </section>
            )}

            {/* Related Jobs */}
            <section>
              <h3 className="text-[22px] font-bold text-[#002333] mb-6">
                Related Jobs
              </h3>
              <div className="space-y-6">
                {companyJobs.slice(0, 3).map((job) => (
                  <div
                    key={job._id || job.id}
                    className="bg-white p-6 rounded-xl border border-slate-100 flex flex-col md:flex-row gap-6 hover:shadow-lg hover:border-transparent transition-all duration-300 group"
                  >
                    {/* Job Image */}
                    <div className="w-full md:w-48 h-32 rounded-lg overflow-hidden shrink-0 relative">
                      <img
                        src={
                          job.bannerImage ||
                          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60"
                        }
                        alt={job.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300x200?text=Job";
                        }}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap gap-4 text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1">
                          <Clock size={14} />{" "}
                          {new Date(job.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase size={14} />{" "}
                          {job.companyId?.name || company.name}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 size={14} />{" "}
                          {typeof job.salaryRange === "object"
                            ? `${job.salaryCurrency || "$"} ${job.salaryRange.min} - ${job.salaryRange.max}`
                            : job.salaryRange}
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-[#002333] group-hover:text-[#5BBB7B] transition-colors mb-4">
                        <Link to={`/job/${job._id || job.id}`}>
                          {job.title}
                        </Link>
                      </h4>

                      <div className="flex gap-2">
                        <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                          {job.type || "Full Time"}
                        </span>
                        {/* 
                           Private/Urgent tags might not be in our basic job model yet, 
                           can conditionally render if properties exist or remove static ones 
                        */}
                      </div>
                    </div>

                    {/* Action - Beer Icon (Bookmark placeholder) */}
                    <div className="self-start md:self-center mt-2 md:mt-0">
                      <button className="group/btn relative w-10 h-10 flex items-center justify-center rounded-full bg-[#EBF1F5] text-[#002333] hover:bg-[#004658] hover:text-white transition-all duration-300">
                        {/* Tooltip */}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-20">
                          Bookmark
                          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></span>
                        </span>
                        <Beer size={18} strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Employer Location (Map) */}
            <JobMap location={company.location} />

            {/* Company Overview */}
            <div className="bg-[#F5F7FC] rounded-lg p-8">
              <h3 className="text-lg font-bold mb-6">Company Overview</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between items-center">
                  <span className="font-bold text-[#002333]">Categories:</span>
                  <span className="text-slate-500">
                    {companyJobs[0]?.category || "Various"}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-bold text-[#002333]">Established:</span>
                  <span className="text-slate-500">
                    {company.established
                      ? new Date(company.established).toLocaleDateString()
                      : "N/A"}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-bold text-[#002333]">Employees:</span>
                  <span className="text-slate-500">{company.employees}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-bold text-[#002333]">Location:</span>
                  <span className="text-slate-500 text-right max-w-[50%]">
                    {company.location}
                  </span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-bold text-[#002333]">
                    Phone Number:
                  </span>
                  <span className="text-slate-500">{company.phone}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-bold text-[#002333]">Email:</span>
                  <span className="text-slate-500 break-all pl-4">
                    {company.email}
                  </span>
                </li>
              </ul>

              <button className="w-full mt-8 bg-[#5BBB7B] text-white py-3 rounded-md font-semibold flex items-center justify-center gap-2 group relative overflow-hidden">
                <span className="absolute inset-0 bg-[#004658] transition-transform duration-500 ease-out scale-x-0 group-hover:scale-x-100 origin-center"></span>
                <span className="relative z-10 flex items-center gap-2">
                  Contact Us{" "}
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
