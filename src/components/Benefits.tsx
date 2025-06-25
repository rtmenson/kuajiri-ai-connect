
import { Check, Bell, Users } from 'lucide-react';

const Benefits = () => {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-black">
            Why Choose Kuajiri AI?
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Our advanced AI technology ensures precise matching, saving time and delivering results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-base font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Precision Matching</h3>
            <p className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Our AI analyzes skills, experience, and preferences to create perfect matches.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-base font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Proactive Alerts</h3>
            <p className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Get notified instantly when perfect opportunities or candidates become available.</p>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-base font-semibold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Mutual Benefits</h3>
            <p className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Creating value for both job seekers and employers in one powerful platform.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
