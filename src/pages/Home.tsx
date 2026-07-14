import HeroSection from '../components/home/HeroSection';
import StatsBar from '../components/home/StatsBar';
import NumbersMatterSection from '../components/home/NumbersMatterSection';
import ProblemSection from '../components/home/ProblemSection';
import TDIExplainer from '../components/home/TDIExplainer';
import FounderSpotlight from '../components/home/FounderSpotlight';
import CoursesSection from '../components/home/CoursesSection';
import EnterpriseSection from '../components/home/EnterpriseSection';
import Testimonials from '../components/home/Testimonials';
import ContentHub from '../components/home/ContentHub';
import FinalCTA from '../components/home/FinalCTA';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <StatsBar />
      <ProblemSection />
      <TDIExplainer />
      <FounderSpotlight />
      <CoursesSection />
      <EnterpriseSection />
      <NumbersMatterSection />
      <Testimonials />
      <ContentHub />
      <FinalCTA />
    </div>
  );
}
