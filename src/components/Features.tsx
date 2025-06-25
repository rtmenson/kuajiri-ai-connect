
import { CheckCircle, Zap } from 'lucide-react';

const Features = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
            Powered by Advanced AI
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience the next generation of job matching with our intelligent algorithms
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto items-center">
          {/* Left side - Feature cards stacked */}
          <div className="space-y-8">
            <div className="flex items-start space-x-6 p-6">
              <div className="flex-shrink-0">
                <CheckCircle className="h-12 w-12 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Smart Profile Analysis</h3>
                <p className="text-gray-600 leading-relaxed">
                  Our AI deeply understands skills, experience, and career aspirations to create comprehensive professional profiles.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6">
              <div className="flex-shrink-0">
                <CheckCircle className="h-12 w-12 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Predictive Matching</h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced algorithms predict compatibility and success rates, ensuring higher quality matches for everyone.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-6 p-6">
              <div className="flex-shrink-0">
                <CheckCircle className="h-12 w-12 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Continuous Learning</h3>
                <p className="text-gray-600 leading-relaxed">
                  The platform gets smarter over time, learning from successful matches to improve future recommendations.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Statistics section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12">
            <div className="text-center mb-12">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                AI-Driven Success
              </h2>
            </div>

            <div className="space-y-6">
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">94%</div>
                <div className="text-base text-blue-100 font-medium">Match Accuracy</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">-60%</div>
                <div className="text-base text-blue-100 font-medium">Time to Hire</div>
              </div>
              <div className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">4.9/5</div>
                <div className="text-base text-blue-100 font-medium">User Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
