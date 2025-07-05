
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, UserPlus, Briefcase } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import Header from '../components/Header';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';

const Pricing = () => {
  const [selectedRole, setSelectedRole] = useState<'jobseeker' | 'employer' | null>(null);
  const [isAnnual, setIsAnnual] = useState(true);

  const jobSeekerPlans = [
    {
      name: "Starter Pack",
      annualPrice: "Free",
      monthlyPrice: "Free",
      period: "",
      features: [
        "5 free credits",
        "1 unmasking per credit",
        "Basic profile creation",
        "Email notifications"
      ],
      isFree: true,
      credits: "5 credits"
    },
    {
      name: "Essential",
      annualPrice: "GH₵30",
      monthlyPrice: "GH₵3",
      period: isAnnual ? "per year" : "per month",
      features: [
        isAnnual ? "30 credits annually" : "3 credits monthly",
        "GH₵1 per credit",
        "Advanced profile optimization",
        "Real-time notifications",
        "Interview preparation tools"
      ],
      popular: true,
      isFree: false,
      credits: isAnnual ? "30 credits/year" : "3 credits/month"
    },
    {
      name: "Value Pack",
      annualPrice: "GH₵25",
      monthlyPrice: "GH₵3",
      period: isAnnual ? "per year" : "per month",
      features: [
        isAnnual ? "50 credits annually" : "5 credits monthly",
        isAnnual ? "GH₵0.50 per credit" : "GH₵0.60 per credit",
        "Everything in Essential",
        "Priority support",
        "Advanced analytics"
      ],
      isFree: false,
      credits: isAnnual ? "50 credits/year" : "5 credits/month"
    },
    {
      name: "Best Value",
      annualPrice: "GH₵25",
      monthlyPrice: "GH₵3",
      period: isAnnual ? "per year" : "per month",
      features: [
        isAnnual ? "100 credits annually" : "10 credits monthly",
        isAnnual ? "GH₵0.25 per credit" : "GH₵0.30 per credit",
        "Everything in Value Pack",
        "Personal career coach",
        "Resume optimization",
        "Career path recommendations"
      ],
      isFree: false,
      credits: isAnnual ? "100 credits/year" : "10 credits/month"
    }
  ];

  const employerPlans = [
    {
      name: "Free Trial",
      annualPrice: "Free",
      monthlyPrice: "Free",
      period: "for 30 days",
      features: [
        "Unlimited credits for 30 days",
        "Full platform access",
        "AI-powered candidate matching",
        "Advanced screening tools",
        "Analytics dashboard"
      ],
      isFree: true,
      trialBadge: "30 Days Free"
    },
    {
      name: "Pay as You Go",
      annualPrice: "GH₵5",
      monthlyPrice: "GH₵5",
      period: "per credit",
      features: [
        "No monthly commitment",
        "Perfect for occasional hiring",
        "Full platform features",
        "Email support"
      ],
      isFree: false
    },
    {
      name: "Credit Pack 100",
      annualPrice: "GH₵299",
      monthlyPrice: "GH₵30",
      period: isAnnual ? "per year" : "per month",
      features: [
        isAnnual ? "100 credits annually" : "10 credits monthly",
        isAnnual ? "GH₵3 per credit" : "GH₵3 per credit",
        "Recurring package",
        "Priority support",
        "Advanced analytics",
        "Custom branding"
      ],
      popular: true,
      isFree: false,
      credits: isAnnual ? "100 credits/year" : "10 credits/month"
    },
    {
      name: "Credit Pack 200",
      annualPrice: "GH₵499",
      monthlyPrice: "GH₵50",
      period: isAnnual ? "per year" : "per month",
      features: [
        isAnnual ? "200 credits annually" : "20 credits monthly",
        isAnnual ? "GH₵2.50 per credit" : "GH₵2.50 per credit",
        "Best value for regular hiring",
        "Everything in Credit Pack 100",
        "Dedicated account manager",
        "Custom integrations"
      ],
      isFree: false,
      credits: isAnnual ? "200 credits/year" : "20 credits/month"
    }
  ];

  const TrialBanner = () => (
    <a 
      href="https://app.kuajiriapp.com/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 text-center sticky top-16 z-40 hover:from-blue-700 hover:to-purple-700 transition-all cursor-pointer"
    >
      <p className="text-sm font-medium">🎉 Start your free 30-day trial with unlimited credits - No payment required!</p>
    </a>
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

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm font-medium ${!isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <Switch
                checked={isAnnual}
                onCheckedChange={setIsAnnual}
                className="data-[state=checked]:bg-blue-600"
              />
              <span className={`text-sm font-medium ${isAnnual ? 'text-gray-900' : 'text-gray-500'}`}>
                Annual
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Save 20%
              </span>
            </div>
          </div>

          <div className={`grid gap-8 max-w-6xl mx-auto ${selectedRole === 'jobseeker' ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-4'}`}>
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`p-6 bg-white rounded-2xl shadow-lg border-2 ${
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
                
                {plan.trialBadge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {plan.trialBadge}
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {plan.name}
                  </h3>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                    {plan.credits && (
                      <div className="text-sm text-blue-600 font-medium mt-1">
                        {plan.credits}
                      </div>
                    )}
                  </div>
                </div>
                
                <ul className="space-y-3 mb-6 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
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
                  {plan.isFree ? 'Get Started' : 'Buy Credits'}
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
