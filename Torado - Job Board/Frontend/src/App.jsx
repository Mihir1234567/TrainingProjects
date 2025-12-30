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
function App() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col relative">
      <Navbar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobListing />} />
          <Route path="/job/:id" element={<JobDetail />} />
          <Route path="/apply-job" element={<ApplyJob />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/recruiters" element={<Recruiters />} />
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
