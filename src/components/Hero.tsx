
import { Button } from "@/components/ui/button";
import { ArrowDown, UserPlus, Briefcase, Check, Bell, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Animated background circles - reduced */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-24 h-24 bg-blue-200/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-purple-300/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 pt-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs font-medium mb-6">
              AI-Powered Matching
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold mb-5 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Perfect Matches.</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Every Time.
            </span>
          </h1>
          
          <p className="text-base md:text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-10 max-w-3xl mx-auto leading-relaxed">
            Our advanced AI proactively connects job seekers with their ideal opportunities and helps employers find the perfect candidates. Experience the future of recruitment today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-sm">
              <UserPlus className="mr-2 h-4 w-4" />
              Find Your Dream Job
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-sm border-2">
              <Briefcase className="mr-2 h-4 w-4" />
              Hire Top Talent
            </Button>
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
