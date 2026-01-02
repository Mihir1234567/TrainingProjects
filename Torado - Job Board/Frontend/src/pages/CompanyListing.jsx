import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import jobsData from "../data/jobs.json";
import { MapPin, Briefcase, Layers, Globe, Star, Search } from "lucide-react";

const CompanyListing = () => {
  // Derive unique company data
  const companies = useMemo(() => {
    const jobs = jobsData.jobs;
    const companyMap = new Map();

    jobs.forEach((job) => {
      // Use company name as key to aggregate jobs for the SAME company
      const companyName = job.company;

      if (!companyMap.has(companyName)) {
        companyMap.set(companyName, {
          id: job.id, // Using first job ID as a proxy for company link for now, ideally strictly recruiterId
          name: companyName,
          logo: job.logo,
          location: job.companyDetails?.location || job.location,
          openJobs: 0,
        });
      }

      const company = companyMap.get(companyName);
      company.openJobs += 1;
    });

    return Array.from(companyMap.values());
  }, []);

  // Derive data for "Browse Your Jobs Area"
  const browseData = useMemo(() => {
    const jobs = jobsData.jobs;
    // Helper to find job ID by criteria
    const findJobId = (criteria, value) =>
      jobs.find((j) => {
        if (criteria === "location")
          return (j.location?.split(",").pop().trim() || j.location) === value;
        if (criteria === "industry")
          return (j.industry || j.category) === value;
        if (criteria === "title") return j.title === value;
        return false;
      })?.id;

    const industries = [
      ...new Set(jobs.map((j) => j.industry || j.category)),
    ].slice(0, 5);
    const titles = [...new Set(jobs.map((j) => j.title))].slice(0, 5);
    const locations = [
      ...new Set(
        jobs.map((j) => j.location?.split(",").pop().trim() || j.location)
      ),
    ].slice(0, 5);

    return {
      industries: industries.map((ind) => ({
        text: ind,
        jobId: findJobId("industry", ind),
      })),
      titles: titles.map((t) => ({ text: t, jobId: findJobId("title", t) })),
      locations: locations.map((loc) => ({
        text: loc,
        jobId: findJobId("location", loc),
      })),
      // Use actual jobs for "Popular Jobs" instead of mock strings
      popular: jobs.slice(0, 5).map((j) => ({ text: j.title, jobId: j.id })),
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* 1. Header Section */}
      <section className="bg-[#f0f5fa] py-20 text-center">
        <h1 className="text-[32px] md:text-[40px] font-bold text-[#002333] mb-3">
          Company Listing
        </h1>
        <div className="flex items-center justify-center gap-2 text-[15px] font-medium text-slate-500">
          <Link to="/" className="hover:text-[#5BBB7B] transition-colors">
            Home
          </Link>
          <span className="text-slate-300">/</span>
          <span className="text-[#5BBB7B]">Company Listing</span>
        </div>
      </section>

      {/* 2. Top Company Registered */}
      <section className="container mx-auto px-4 md:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-[28px] md:text-[32px] font-bold text-[#002333] mb-4">
            Top Company Registered
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            We collect reviews from our users so you can get an honest opinion
            of what an experience with our website are really like!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {companies.map((company, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg shadow-slate-200/50 border border-transparent hover:border-[#5BBB7B] transition-all duration-300 group/card"
            >
              {/* Logo - Linked to Company Details */}
              <Link
                to={`/company-details/${company.id}`}
                className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-5 group-hover/card:[transform:rotateY(180deg)] transition-transform duration-700 ease-in-out cursor-pointer block"
              >
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/50?text=Logo";
                  }}
                />
              </Link>

              {/* Company Name */}
              <h3 className="text-lg font-bold text-[#002333] mb-2 hover:text-[#5BBB7B] transition-colors">
                <Link to={`/company-details/${company.id}`}>
                  {company.name}
                </Link>
              </h3>

              {/* Location */}
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-8">
                <MapPin size={14} className="text-[#5BBB7B]" />
                {company.location}
              </div>

              {/* Open Jobs Button */}
              <button className="group/btn relative bg-[#eefcf5] text-[#5BBB7B] text-sm font-semibold px-6 py-2.5 rounded-md hover:text-white transition-all duration-300 overflow-hidden">
                <span className="absolute inset-0 bg-[#004658] transition-transform duration-500 ease-out scale-x-0 group-hover/btn:scale-x-100 origin-center"></span>
                <span className="relative z-10">
                  Open Jobs ({company.openJobs})
                </span>
              </button>
            </div>
          ))}

          {/* Placeholder cards if fewer than 8 to match design density */}
          {[...Array(Math.max(0, 8 - companies.length))].map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="bg-white rounded-xl p-8 flex flex-col items-center justify-center text-center shadow-lg shadow-slate-200/50 border border-transparent hover:border-[#5BBB7B] transition-all duration-300 group/card"
            >
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mb-5">
                <div className="w-8 h-8 rounded bg-slate-200 animate-pulse"></div>
              </div>
              <h3 className="text-lg font-bold text-[#002333] mb-2">
                Example Inc.
              </h3>
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-8">
                <MapPin size={14} className="text-[#5BBB7B]" />
                New York, USA
              </div>
              <button className="group/btn relative bg-[#eefcf5] text-[#5BBB7B] text-sm font-semibold px-6 py-2.5 rounded-md hover:text-white transition-all duration-300 overflow-hidden">
                <span className="absolute inset-0 bg-[#004658] transition-transform duration-500 ease-out scale-x-0 group-hover/btn:scale-x-100 origin-center"></span>
                <span className="relative z-10">Open Jobs (0)</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Browse Your Jobs Area */}
      <section className="pb-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-[28px] md:text-[32px] font-bold text-[#002333] mb-4">
              Browse Your Jobs Area
            </h2>
            <p className="text-slate-500 text-sm">
              {jobsData.jobs.length} jobs live - 20 added today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {/* Column 1: Industry */}
            <div>
              <div className="flex items-center gap-4 mb-6 group cursor-pointer w-max">
                <div className="w-14 h-14 rounded-full bg-[#eefcf5] text-[#5BBB7B] flex items-center justify-center transition-all duration-700 ease-in-out group-hover:bg-[#5BBB7B] group-hover:text-white group-hover:[transform:rotateY(180deg)]">
                  <Layers size={28} />
                </div>
                <h4 className="font-bold text-lg text-[#002333] transition-colors group-hover:text-[#5BBB7B]">
                  Popular Job Industry
                </h4>
              </div>
              <ul className="space-y-4">
                {browseData.industries.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={`/job/${
                        item.jobId
                      }?relatedBy=industry&value=${encodeURIComponent(
                        item.text
                      )}`}
                      className="text-slate-500 hover:text-[#5BBB7B] transition-all duration-500 ease-in-out text-sm block relative pl-0 hover:pl-6 group"
                    >
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-[#5BBB7B] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></span>
                      {item.text} Jobs
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Title */}
            <div>
              <div className="flex items-center gap-4 mb-6 group cursor-pointer w-max">
                <div className="w-14 h-14 rounded-full bg-[#eefcf5] text-[#5BBB7B] flex items-center justify-center transition-all duration-700 ease-in-out group-hover:bg-[#5BBB7B] group-hover:text-white group-hover:[transform:rotateY(180deg)]">
                  <Briefcase size={28} />
                </div>
                <h4 className="font-bold text-lg text-[#002333] transition-colors group-hover:text-[#5BBB7B]">
                  Popular Job Title
                </h4>
              </div>
              <ul className="space-y-4">
                {browseData.titles.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={`/job/${
                        item.jobId
                      }?relatedBy=title&value=${encodeURIComponent(item.text)}`}
                      className="text-slate-500 hover:text-[#5BBB7B] transition-all duration-500 ease-in-out text-sm block relative pl-0 hover:pl-6 group"
                    >
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-[#5BBB7B] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></span>
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Location */}
            <div>
              <div className="flex items-center gap-4 mb-6 group cursor-pointer w-max">
                <div className="w-14 h-14 rounded-full bg-[#eefcf5] text-[#5BBB7B] flex items-center justify-center transition-all duration-700 ease-in-out group-hover:bg-[#5BBB7B] group-hover:text-white group-hover:[transform:rotateY(180deg)]">
                  <Globe size={28} />
                </div>
                <h4 className="font-bold text-lg text-[#002333] transition-colors group-hover:text-[#5BBB7B]">
                  Jobs by Location
                </h4>
              </div>
              <ul className="space-y-4">
                {browseData.locations.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={`/job/${
                        item.jobId
                      }?relatedBy=location&value=${encodeURIComponent(
                        item.text
                      )}`}
                      className="text-slate-500 hover:text-[#5BBB7B] transition-all duration-500 ease-in-out text-sm block relative pl-0 hover:pl-6 group"
                    >
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-[#5BBB7B] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></span>
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Popular Jobs */}
            <div>
              <div className="flex items-center gap-4 mb-6 group cursor-pointer w-max">
                <div className="w-14 h-14 rounded-full bg-[#eefcf5] text-[#5BBB7B] flex items-center justify-center transition-all duration-700 ease-in-out group-hover:bg-[#5BBB7B] group-hover:text-white group-hover:[transform:rotateY(180deg)]">
                  <Star size={28} />
                </div>
                <h4 className="font-bold text-lg text-[#002333] transition-colors group-hover:text-[#5BBB7B]">
                  Popular Jobs
                </h4>
              </div>
              <ul className="space-y-4">
                {browseData.popular.map((item, i) => (
                  <li key={i}>
                    <Link
                      to={`/job/${
                        item.jobId
                      }?relatedBy=title&value=${encodeURIComponent(item.text)}`}
                      className="text-slate-500 hover:text-[#5BBB7B] transition-all duration-500 ease-in-out text-sm block relative pl-0 hover:pl-6 group"
                    >
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-[2px] bg-[#5BBB7B] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></span>
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CompanyListing;
