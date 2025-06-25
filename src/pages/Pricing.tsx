import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, UserPlus, Briefcase } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';

const Pricing = () => {
  const [selectedRole, setSelectedRole] = useState<'jobseeker' | 'employer' | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);

  const jobSeekerPlans = [
    {
      name: "Free",
      monthlyPrice: "$0",
      annualPrice: "$0",
      period: "/month",
      features: [
        "Basic profile creation",
        "5 job applications per month",
        "Basic AI matching",
        "Email notifications"
      ],
      isFree: true
    },
    {
      name: "Pro",
      monthlyPrice: "$19",
      annualPrice: "$15",
      period: "/month",
      features: [
        "Advanced profile optimization",
        "Unlimited job applications",
        "Priority AI matching",
        "Real-time notifications",
        "Interview preparation tools",
        "Salary insights"
      ],
      popular: true,
      isFree: false
    },
    {
      name: "Premium",
      monthlyPrice: "$39",
      annualPrice: "$31",
      period: "/month",
      features: [
        "Everything in Pro",
        "Personal career coach",
        "Direct employer messaging",
        "Advanced analytics",
        "Resume optimization",
        "Career path recommendations"
      ],
      isFree: false
    }
  ];

  const employerPlans = [
    {
      name: "Starter",
      monthlyPrice: "$99",
      annualPrice: "$79",
      period: "/month",
      features: [
        "Up to 5 job postings",
        "Basic candidate screening",
        "Standard AI matching",
        "Email support"
      ],
      isFree: false
    },
    {
      name: "Professional",
      monthlyPrice: "$299",
      annualPrice: "$239",
      period: "/month",
      features: [
        "Up to 25 job postings",
        "Advanced candidate screening",
        "Priority AI matching",
        "Dedicated account manager",
        "Analytics dashboard",
        "Custom branding"
      ],
      popular: true,
      isFree: false
    },
    {
      name: "Enterprise",
      monthlyPrice: "Custom",
      annualPrice: "Custom",
      period: "",
      features: [
        "Unlimited job postings",
        "AI-powered bulk screening",
        "Custom integrations",
        "Advanced analytics",
        "White-label solution",
        "24/7 priority support"
      ],
      isFree: false
    }
  ];

  const TrialBanner = () => (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 text-center sticky top-16 z-40">
      <p className="text-sm font-medium">🎉 Start your free 30-day trial with unlimited credits - No payment required!</p>
    </div>
  );

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <TrialBanner />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Choose Your Path to Success
              </h1>
              <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
                Select your role to see pricing plans tailored for your needs
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div 
                  onClick={() => setSelectedRole('jobseeker')}
                  className="p-8 bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-blue-500 cursor-pointer transition-all hover:shadow-xl"
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UserPlus className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    I am a Job Seeker
                  </h3>
                  <p className="text-gray-600">
                    Find your dream job with AI-powered matching
                  </p>
                </div>
                
                <div 
                  onClick={() => setSelectedRole('employer')}
                  className="p-8 bg-white rounded-2xl shadow-lg border-2 border-transparent hover:border-purple-500 cursor-pointer transition-all hover:shadow-xl"
                >
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Briefcase className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    I am an Employer/Recruitment Agency
                  </h3>
                  <p className="text-gray-600">
                    Hire top talent with intelligent candidate matching
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <FAQ />
        <Footer />
      </div>
    );
  }

  const plans = selectedRole === 'jobseeker' ? jobSeekerPlans : employerPlans;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TrialBanner />
      <div className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Button 
              variant="outline" 
              onClick={() => setSelectedRole(null)}
              className="mb-8"
            >
              ← Change Role
            </Button>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {selectedRole === 'jobseeker' ? 'Job Seeker' : 'Employer'} Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose the perfect plan to {selectedRole === 'jobseeker' ? 'advance your career' : 'build your team'}
            </p>
            
            {/* Monthly/Annual Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm ${!isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Monthly</span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isAnnual ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isAnnual ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                Annual <span className="text-green-600 font-semibold">(Save 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`p-8 bg-white rounded-2xl shadow-lg border-2 ${
                  plan.popular ? 'border-blue-500 relative' : 'border-gray-200'
                } hover:shadow-xl transition-shadow flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {plan.name}
                  </h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                    {isAnnual && plan.monthlyPrice !== plan.annualPrice && plan.monthlyPrice !== "Custom" && (
                      <div className="text-sm text-gray-500 mt-1">
                        <span className="line-through">{plan.monthlyPrice}/month</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full mt-auto ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                      : ''
                  }`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.isFree ? 'Get Started' : 'Start Free Trial'}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FAQ />
      <Footer />
    </div>
  );
};

export default Pricing;
