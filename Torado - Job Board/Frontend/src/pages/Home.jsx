import Hero from "../components/common/Hero";
import BrandLogos from "../components/common/BrandLogos";
import JobCategories from "../components/common/JobCategories";
import TrendingJobs from "../components/common/TrendingJobs";
import StatsSection from "../components/common/StatsSection";
import FreelancerSection from "../components/common/FreelancerSection";
import JobSearchSection from "../components/common/JobSearchSection";
import MobileAppSection from "../components/common/MobileAppSection";
import TestimonialSection from "../components/common/TestimonialSection";
import BlogSection from "../components/common/BlogSection";
import MattersToUs from "../components/common/MattersToUs";

const Home = () => {
  return (
    <main>
      <Hero />
      <BrandLogos />
      <JobCategories />
      <TrendingJobs />
      <StatsSection />
      <FreelancerSection />
      <JobSearchSection />
      <MobileAppSection />
      <TestimonialSection />
      <BlogSection />
      <MattersToUs />
    </main>
  );
};

export default Home;
