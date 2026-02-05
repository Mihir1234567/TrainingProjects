import { useState, useEffect } from "react";
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
import CompleteProfile from "./pages/CompleteProfile";
import ContactPage from "./pages/ContactPage";
import TermsOfServices from "./pages/TermsOfServices";
import PrivacyPolicy from "./pages/Privacy";
import NotFound from "./pages/NotFound";

import DashboardLayout from "./components/dashboard/DashboardLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardPostJob from "./pages/dashboard/DashboardPostJob";
import ManageJobs from "./pages/dashboard/ManageJobs";
import ManageApplicants from "./pages/dashboard/ManageApplicants";
import BookmarkResumes from "./pages/dashboard/BookmarkResumes";
import ManageResumes from "./pages/dashboard/ManageResumes";
import CreateResumes from "./pages/dashboard/CreateResumes";
import AppliedJobs from "./pages/dashboard/AppliedJobs";
import AlertJobs from "./pages/dashboard/AlertJobs";
import Package from "./pages/dashboard/Package";
import Messages from "./pages/dashboard/Messages";
import MyProfile from "./pages/dashboard/MyProfile";
import CompanyProfile from "./pages/dashboard/CompanyProfile";
import ChangePassword from "./pages/dashboard/ChangePassword";
import DeleteProfile from "./pages/dashboard/DeleteProfile";

import { MockDataProvider } from "./context/MockDataContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  return (
    <AuthProvider>
      <MockDataProvider>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/login" element={<MyAccountPage />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms-of-services" element={<TermsOfServices />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/jobs" element={<JobListing />} />
            <Route path="/job/:id" element={<JobDetail />} />
            <Route path="/apply-job/:id" element={<ApplyJob />} />
            <Route path="/post-job" element={<PostJob />} />
            <Route path="/recruiters" element={<Recruiters />} />
            <Route path="/freelancers" element={<Freelancers />} />
            <Route path="/freelancer/:id" element={<FreelancerDetails />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route
              path="/candidate-details/:id"
              element={<CandidateDetails />}
            />
            <Route path="/company-listing" element={<CompanyListing />} />
            <Route path="/company-details/:id" element={<CompanyDetails />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/author/:authorId" element={<BlogAuthor />} />
            <Route
              path="/blog/category/:categoryId"
              element={<BlogCategory />}
            />
            <Route path="/blog/tag/:tagId" element={<BlogTag />} />
            <Route path="/blog/:id" element={<BlogDetail />} />

            {/* Protected Dashboard Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/user-dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="post-job" element={<DashboardPostJob />} />
                <Route path="manage-jobs" element={<ManageJobs />} />
                <Route
                  path="manage-jobs/:id/applicants"
                  element={<ManageApplicants />}
                />
                <Route path="company-profile" element={<CompanyProfile />} />
                <Route
                  path="manage-applicants"
                  element={<ManageApplicants />}
                />
                <Route path="edit-job/:id" element={<DashboardPostJob />} />
                <Route path="bookmark-resumes" element={<BookmarkResumes />} />
                <Route path="manage-resumes" element={<ManageResumes />} />
                <Route path="create-resumes" element={<CreateResumes />} />
                <Route path="applied-jobs" element={<AppliedJobs />} />
                <Route path="alert-jobs" element={<AlertJobs />} />
                <Route path="package" element={<Package />} />
                <Route path="messages" element={<Messages />} />
                <Route path="my-profile" element={<MyProfile />} />
                <Route path="change-password" element={<ChangePassword />} />
                <Route path="delete-profile" element={<DeleteProfile />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MockDataProvider>
    </AuthProvider>
  );
}

export default App;
