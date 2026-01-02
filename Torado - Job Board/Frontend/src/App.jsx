import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import JobListing from "./pages/JobListing";
import JobDetail from "./pages/JobDetail";
import ApplyJob from "./pages/ApplyJob";
import PostJob from "./pages/PostJob";
import FloatingActions from "./components/common/FloatingActions";
import DemoModal from "./components/common/DemoModal";
import ScrollToTop from "./components/common/ScrollToTop";
import Recruiters from "./pages/Recruiters";
import Freelancers from "./pages/Freelancers";
import FreelancerDetails from "./pages/FreelancerDetails";

import Candidates from "./pages/Candidates";
import CandidateDetails from "./pages/CandidateDetails";
import CompanyListing from "./pages/CompanyListing";
import CompanyDetails from "./pages/CompanyDetails";
import Blog from "./pages/Blog";
import BlogAuthor from "./pages/BlogAuthor";
import BlogCategory from "./pages/BlogCategory";
import BlogTag from "./pages/BlogTag";
import BlogDetail from "./pages/BlogDetail";
import AboutUs from "./pages/AboutUs";
import Pricing from "./pages/Pricing";

function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/jobs" element={<JobListing />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/apply-job" element={<ApplyJob />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/recruiters" element={<Recruiters />} />
          <Route path="/freelancers" element={<Freelancers />} />
          <Route path="/freelancer/:id" element={<FreelancerDetails />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/candidate-details/:id" element={<CandidateDetails />} />
          <Route path="/company-listing" element={<CompanyListing />} />
          <Route path="/company-details/:id" element={<CompanyDetails />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/author/:authorId" element={<BlogAuthor />} />
          <Route path="/blog/category/:categoryId" element={<BlogCategory />} />
          <Route path="/blog/tag/:tagId" element={<BlogTag />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route
            path="/login"
            element={
              <div className="p-20 text-center">Login (Coming Soon)</div>
            }
          />
        </Routes>
      </div>
      <Footer />

      {/* Global Components */}
      <FloatingActions onOpenDemos={() => setIsDemoModalOpen(true)} />
      <DemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
      <ScrollToTop />
    </div>
  );
}

export default App;
