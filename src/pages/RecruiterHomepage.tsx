
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Clock, Shield, Star, ArrowRight, Target, Zap, Building } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const RecruiterHomepage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Hire Top Talent 5x Faster with AI Matching
                </span>
              </h1>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Stop sifting through hundreds of irrelevant resumes. Our AI instantly connects you with pre-qualified candidates who match your exact requirements and company culture.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14">
              <a href="https://app.kuajiriapp.com/employer/register?tab=signup" target="_blank" rel="noopener noreferrer">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-base">
                  Start Hiring Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </div>
            
            {/* Visual Aid */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Target className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Precision Matching</h3>
                  <p className="text-sm text-gray-600">AI finds candidates who fit perfectly</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Instant Results</h3>
                  <p className="text-sm text-gray-600">Get qualified candidates in hours</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Building className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Quality Hires</h3>
                  <p className="text-sm text-gray-600">Better matches = longer retention</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Problem Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              The Hiring Process is Completely Broken (And HR Knows It)
            </h2>
            
            <div className="bg-gray-50 rounded-2xl p-8 mb-8 text-left max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                "Just posted a Software Engineer role. 500+ applications in 48 hours. 90% completely unqualified. 
                Spent my entire week screening resumes instead of strategic work.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Meanwhile, the perfect candidate is probably out there, but buried under a mountain of irrelevant CVs. 
                By the time I find them, they've already accepted another offer.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-semibold">
                There has to be a smarter way to connect with talent. #Hiring #Recruitment #HR"
              </p>
              <div className="flex items-center mt-4 text-sm text-gray-500">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold">HR</span>
                </div>
                HR Director • LinkedIn
              </div>
            </div>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your time is too valuable to waste on unqualified candidates. Every day you spend manually screening is a day your ideal hire might accept another offer.
              <span className="font-semibold text-gray-900"> What if qualified candidates came to you instead?</span>
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How Kuajiri AI Revolutionizes Your Hiring
            </h2>
            <p className="text-xl text-gray-600">
              Our AI doesn't just post jobs - it proactively hunts for the perfect candidates and brings them to you, pre-screened and ready to interview.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Post Your Requirements</h3>
              <p className="text-gray-600">Define your ideal candidate: skills, experience, culture fit, and salary range</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">AI Candidate Hunting</h3>
              <p className="text-gray-600">Our AI scours multiple platforms to find candidates who match your exact criteria</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Smart Pre-Screening</h3>
              <p className="text-gray-600">Candidates are automatically scored and ranked based on fit and likelihood to accept</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Receive Quality Matches</h3>
              <p className="text-gray-600">Get a curated list of interested, qualified candidates ready for interview</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">What Makes Our Solution Unbeatable?</h3>
              <ul className="text-left space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Active sourcing - we find passive candidates who aren't actively job hunting</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Culture-fit matching - beyond skills, we match personality and values</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Predictive analytics - know who's likely to accept before you interview</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Risk Reversal Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
              "But Will This Actually Work for Us?"
            </h2>
            <p className="text-xl text-gray-600">
              We understand your concerns. You've tried hiring solutions before. Here's why Kuajiri AI is different:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Your Concerns (We Get It)</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">"We've tried recruitment tools before - they don't deliver"</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">"Too expensive for the ROI we see"</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">"Takes too long to integrate with our process"</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">"Candidates aren't actually qualified despite claims"</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Here's The Reality</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">14-day free trial - prove ROI before you pay</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Setup in under 10 minutes, first candidates within 48 hours</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Pay only for successful hires, not just applications</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Average 40% reduction in time-to-hire</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">What Hiring Managers Say</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"Filled 3 senior roles in 2 weeks. Usually takes us 3 months. The quality of candidates was exceptional - no time wasters."</p>
                <div className="text-sm text-gray-500">David M., Head of Engineering</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"ROI was immediate. Saved our HR team 20+ hours per week on screening. The AI actually understands our company culture."</p>
                <div className="text-sm text-gray-500">Lisa K., HR Director</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"Best recruitment investment we've made. Candidates are pre-qualified and genuinely interested. Zero setup headaches."</p>
                <div className="text-sm text-gray-500">James R., Startup Founder</div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">4.8/5</div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">60%</div>
                  <div className="text-sm text-gray-600">Faster Hiring</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-gray-600">Hire Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Stop Competing for Talent. Start Attracting It.
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
              While your competitors waste time with outdated hiring methods, you could be building your dream team with AI-powered precision. The best candidates won't wait forever.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">Why Start Your Free Trial Today?</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start text-white">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-1 mr-3 flex-shrink-0" />
                  <span>14-day free trial (no credit card required)</span>
                </div>
                <div className="flex items-start text-white">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-1 mr-3 flex-shrink-0" />
                  <span>Setup takes under 10 minutes</span>
                </div>
                <div className="flex items-start text-white">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-1 mr-3 flex-shrink-0" />
                  <span>First qualified candidates within 48 hours</span>
                </div>
                <div className="flex items-start text-white">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-1 mr-3 flex-shrink-0" />
                  <span>Cancel anytime, zero commitment</span>
                </div>
              </div>
            </div>
            
            <a href="https://app.kuajiriapp.com/employer/register?tab=signup" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-bold">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
            
            <p className="text-blue-100 mt-4 text-sm">
              Join 500+ companies already using Kuajiri AI for smarter hiring
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RecruiterHomepage;
