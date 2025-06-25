
import { TrendingUp } from 'lucide-react';

const HowItWorks = () => {
  const jobSeekerSteps = [
    {
      step: "1",
      title: "Create Your Profile",
      description: "Upload your resume and tell us about your career goals"
    },
    {
      step: "2", 
      title: "AI Analysis",
      description: "Our AI analyzes your skills, experience, and preferences"
    },
    {
      step: "3",
      title: "Get Matched", 
      description: "Receive proactive notifications for perfect job opportunities"
    },
    {
      step: "4",
      title: "Apply with Confidence",
      description: "Apply to pre-matched positions with higher success rates"
    }
  ];

  const employerSteps = [
    {
      step: "1",
      title: "Post Your Job",
      description: "Describe your ideal candidate and job requirements"
    },
    {
      step: "2",
      title: "AI Candidate Search", 
      description: "Our AI searches and ranks candidates by compatibility"
    },
    {
      step: "3",
      title: "Receive Top Matches",
      description: "Get a curated list of the best-fit candidates"
    },
    {
      step: "4",
      title: "Hire with Confidence",
      description: "Connect with pre-screened, highly compatible talent"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
            How Kuajiri AI Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Simple steps to revolutionize your hiring or job search experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Job Seekers */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-8 text-center text-blue-600">For Job Seekers</h3>
            <div className="space-y-6 mb-8">
              {jobSeekerSteps.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-blue-600">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Success Rate Card */}
            <div className="bg-blue-50 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-600">Success Rate</h4>
                <p className="text-gray-700">85% of job seekers find their ideal role within 30 days</p>
              </div>
            </div>
          </div>

          {/* Employers */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-2xl font-bold mb-8 text-center text-purple-600">For Employers/Recruitment Agencies</h3>
            <div className="space-y-6 mb-8">
              {employerSteps.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-purple-600">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Efficiency Gain Card */}
            <div className="bg-purple-50 rounded-xl p-6 flex items-start space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-purple-600">Efficiency Gain</h4>
                <p className="text-gray-700">60% reduction in time-to-hire with 40% better retention rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
