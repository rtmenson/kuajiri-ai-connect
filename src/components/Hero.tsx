
import { Button } from "@/components/ui/button";
import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              AI-Powered Matching
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Perfect Matches.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Every Time.
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Our advanced AI proactively connects job seekers with their ideal opportunities and helps employers find the perfect candidates. Experience the future of recruitment today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg">
              Find Your Dream Job
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-2">
              Hire Top Talent
            </Button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Precision Matching</h3>
              <p className="text-gray-600">Our AI analyzes skills, experience, and preferences to create perfect matches.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Proactive Alerts</h3>
              <p className="text-gray-600">Get notified instantly when perfect opportunities or candidates become available.</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mutual Benefits</h3>
              <p className="text-gray-600">Creating value for both job seekers and employers in one powerful platform.</p>
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
