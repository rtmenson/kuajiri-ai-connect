import { Button } from "@/components/ui/button";
import { CheckCircle, Users, Clock, Shield, Star, ArrowRight, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ToolsPromoModal from '../components/ToolsPromoModal';
import { Link } from 'react-router-dom';
const WaitlistLanding = () => {
  return <div className="min-h-screen bg-background">
      <ToolsPromoModal />
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Land Your Dream Job 10x Faster with AI
                </span>
              </h1>
              <span className="inline-flex items-center px-6 py-3 bg-blue-100/80 text-blue-800 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-blue-200/50">
                <Zap className="h-4 w-4 mr-2" />
                AI-Powered Matching
              </span>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Stop wasting months applying to irrelevant jobs. Our AI matches you with opportunities that actually fit your skills, experience, and career goals - automatically.
            </p>
            
            <div className="flex flex-col gap-4 justify-center items-center mb-14">
              <Link to="/waitlist">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-base">
                  Join Waitlist  
  
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/recruiter">
                <Button variant="outline" size="sm" className="text-sm">
                  For Recruiters →
                </Button>
              </Link>
            </div>
            
            {/* Visual Aid */}
            <div id="benefits" className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Smart Matching</h3>
                  <p className="text-sm text-gray-600">AI finds jobs that fit you perfectly</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Save Time</h3>
                  <p className="text-sm text-gray-600">No more endless job board scrolling</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">Higher Success</h3>
                  <p className="text-sm text-gray-600">Better matches = more interviews</p>
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
              The Job Search is Broken (And Everyone Knows It)
            </h2>
            
            <div className="bg-gray-50 rounded-2xl p-8 mb-8 text-left max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                "Just spent 6 hours applying to 20 jobs on LinkedIn. Got 2 automated rejections and 18 radio silences. 
                The worst part? Half those jobs weren't even relevant to my skills. 
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                Meanwhile, recruiters are drowning in applications from unqualified candidates, missing the perfect matches hiding in the pile.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed font-semibold">
                There has to be a better way. #JobSearch #Hiring #Frustrated"
              </p>
              <div className="flex items-center mt-4 text-sm text-gray-500">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-semibold">JS</span>
                </div>
                Job Seeker • LinkedIn
              </div>
            </div>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sound familiar? You're not alone. The average job seeker spends 5+ months searching, applying to 100+ irrelevant positions. 
              <span className="font-semibold text-gray-900"> What if you could skip all that and go straight to jobs that actually want YOU?</span>
            </p>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              How Kuajiri AI Works Its Magic
            </h2>
            <p className="text-xl text-gray-600">
              Our AI doesn't just match keywords. It understands context, career progression, and cultural fit to find opportunities where you'll actually thrive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Upload Your Profile</h3>
              <p className="text-gray-600">Our AI analyzes your experience, skills, and career goals in seconds</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">AI Scans the Market</h3>
              <p className="text-gray-600">We continuously monitor thousands of job boards and company sites</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Smart Matching</h3>
              <p className="text-gray-600">Our algorithm finds jobs that match your skills, salary expectations, and growth potential</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-violet-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Get Matched</h3>
              <p className="text-gray-600">Receive only relevant opportunities where you have a real chance of success</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">What Makes Kuajiri AI Different?</h3>
              <ul className="text-left space-y-3">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Proactive matching - we find jobs for you, not the other way around</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Quality over quantity - fewer, better-matched opportunities</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Real-time market intelligence - know what employers actually want</span>
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
              "But Does It Actually Work?"
            </h2>
            <p className="text-xl text-gray-600">
              We get it. You've been burned by job search "solutions" before. Here's why Kuajiri AI is different:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="ml-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Your Concerns (We've Heard Them All)</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">"Another platform that doesn't understand my industry"</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">"Too expensive for what I get back"</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">"Takes too long to set up and see results"</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">"Just sends me the same jobs I can find myself"</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Here's The Truth</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Be the first to know when we launch</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-purple-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Setup takes 5 minutes, matches start within 24 hours</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-indigo-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">No commitment required to join</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-violet-600 mt-1 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Access to hidden job market - 70% of our matches aren't publicly posted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-8 text-center text-gray-900">What Our Users Say</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-gray-700 mb-4">"Got 3 interview calls in my first week. The quality of matches is incredible - every job was exactly what I was looking for."</p>
                <div className="text-sm text-gray-500">Sarah K., Software Engineer</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-gray-700 mb-4">"Finally landed my dream role after 6 months of failed applications elsewhere. Kuajiri found opportunities I never would have discovered."</p>
                <div className="text-sm text-gray-500">Michael R., Marketing Manager</div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />)}
                </div>
                <p className="text-gray-700 mb-4">"The ROI is insane. Paid for itself with my salary increase from the first job they matched me with."</p>
                <div className="text-sm text-gray-500">Jennifer L., Data Analyst</div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="flex items-center justify-center space-x-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">4.9/5</div>
                  <div className="text-sm text-gray-600">User Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">2.3x</div>
                  <div className="text-sm text-gray-600">Faster Job Placement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">89%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
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
              Stop Settling for Random Applications
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-3xl mx-auto">
              Every day you wait is another day of missed opportunities. Join thousands of professionals who've already transformed their job search with AI-powered matching.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-white mb-4">Why Join Today?</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start text-white">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-1 mr-3 flex-shrink-0" />
                  <span>Early access when we launch</span>
                </div>
                <div className="flex items-start text-white">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-1 mr-3 flex-shrink-0" />
                  <span>Takes less than 2 minutes</span>
                </div>
                <div className="flex items-start text-white">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-1 mr-3 flex-shrink-0" />
                  <span>Be among the first to match</span>
                </div>
                <div className="flex items-start text-white">
                  <CheckCircle className="h-5 w-5 text-blue-200 mt-1 mr-3 flex-shrink-0" />
                  <span>No commitment required</span>
                </div>
              </div>
            </div>
            
            <Link to="/waitlist">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-bold">
                Join the Waitlist Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default WaitlistLanding;