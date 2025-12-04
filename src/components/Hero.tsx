import { Button } from "@/components/ui/button";
import { ArrowDown, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-end bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Animated background circles - reduced */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-20 w-16 h-16 bg-blue-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-12 h-12 bg-purple-300/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-24">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16">
          {/* Left side - Title */}
          <div className="lg:w-1/2">
            <div className="mb-6">
              <span className="inline-flex items-center px-6 py-3 bg-blue-100/80 text-blue-800 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-200/50">
                <Zap className="h-4 w-4 mr-2" />
                AI-Powered Matching
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Perfect Matches.</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Every Time.
              </span>
            </h1>
          </div>
          
          {/* Right side - Description and CTAs */}
          <div className="lg:w-1/2 lg:max-w-md">
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Stop wasting months sending applications into the void. Our AI proactively connects you with opportunities that match your skills and aspirations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/waitlist">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-base w-full sm:w-auto">
                  Join the Waitlist
                </Button>
              </Link>
              <Link to="/recruiter">
                <Button variant="outline" className="px-8 py-3 text-base border-2 w-full sm:w-auto">
                  For Recruiters
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-gray-400" />
      </div>
    </section>
  );
};

export default Hero;
