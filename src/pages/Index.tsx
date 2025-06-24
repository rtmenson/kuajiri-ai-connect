
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Statistics from '../components/Statistics';
import CallToAction from '../components/CallToAction';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <Statistics />
      <HowItWorks />
      <CallToAction />
      <Footer />
    </div>
  );
};

export default Index;
