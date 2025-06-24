
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
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Kuajiri AI Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple steps to revolutionize your hiring or job search experience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Job Seekers */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">For Job Seekers</h3>
            <div className="space-y-6">
              {jobSeekerSteps.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Employers */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">For Employers</h3>
            <div className="space-y-6">
              {employerSteps.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
