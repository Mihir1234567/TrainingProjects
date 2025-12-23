import Hero from "../components/common/Hero";
import BrandLogos from "../components/common/BrandLogos";
import JobCategories from "../components/common/JobCategories";
import TrendingJobs from "../components/common/TrendingJobs";
import StatsSection from "../components/common/StatsSection";
import FreelancerSection from "../components/common/FreelancerSection";
import JobSearchSection from "../components/common/JobSearchSection";

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
    </main>
  );
};

export default Home;
