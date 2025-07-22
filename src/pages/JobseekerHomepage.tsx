
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import Header from '../components/Header';

const JobseekerHomepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Benefits />
      <Features />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default JobseekerHomepage;
