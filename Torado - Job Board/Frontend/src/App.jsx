import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import JobListing from "./pages/JobListing";
import JobDetail from "./pages/JobDetail";
import ApplyJob from "./pages/ApplyJob";
import PostJob from "./pages/PostJob";
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
import FaqPage from "./pages/FaqPage";
import MyAccountPage from "./pages/MyAccountPage";
import ContactPage from "./pages/ContactPage";
import TermsOfServices from "./pages/TermsOfServices";
import PrivacyPolicy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/login" element={<MyAccountPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms-of-services" element={<TermsOfServices />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
          element={<div className="p-20 text-center">Login (Coming Soon)</div>}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
