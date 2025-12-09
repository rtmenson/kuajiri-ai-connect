import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, UserPlus, Briefcase } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FAQ from '../components/FAQ';
import { useCurrency } from '@/contexts/CurrencyContext';

// Independent pricing for USD and GHS
const PRICES = {
  jobseeker: {
    usd: { basic: 3, premium: 4.5, pro: 8 },
    ghs: { basic: 30, premium: 45, pro: 80 }
  },
  employer: {
    usd: { basic: 10, premium: 25, pro: 45 },
    ghs: { basic: 160, premium: 400, pro: 720 }
  }
};

// Credits per plan
const CREDITS = {
  jobseeker: { basic: 30, premium: 50, pro: 100 },
  employer: { basic: 30, premium: 100, pro: 200 }
};

const Pricing = () => {
  const [selectedRole, setSelectedRole] = useState<'jobseeker' | 'employer' | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);
  const { currency } = useCurrency();

  const getPrice = (role: 'jobseeker' | 'employer', plan: 'basic' | 'premium' | 'pro') => {
    if (currency === 'GHS') {
      return PRICES[role].ghs[plan];
    }
    return PRICES[role].usd[plan];
  };

  const formatPrice = (price: number) => {
    if (currency === 'GHS') {
      return `GH₵ ${price}`;
    }
    return `$${price}`;
  };

  const formatCreditPrice = (price: number, credits: number) => {
    const perCredit = price / credits;
    if (currency === 'GHS') {
      return `GH₵ ${perCredit.toFixed(2)}`;
    }
    return `$${perCredit.toFixed(2)}`;
  };

  const jobSeekerPlans = [
    {
      name: "Basic",
      description: "For job seekers starting their career journey",
      price: getPrice('jobseeker', 'basic'),
      period: isAnnual ? "per year" : "per month",
      features: [
        isAnnual ? "360 credits annually" : "30 credits monthly",
        `${formatCreditPrice(getPrice('jobseeker', 'basic'), CREDITS.jobseeker.basic)} per credit`
      ],
      isFree: false,
      credits: isAnnual ? "360 credits/year" : "30 credits/month"
    },
    {
      name: "Premium",
      description: "For active job seekers applying to multiple positions",
      price: getPrice('jobseeker', 'premium'),
      period: isAnnual ? "per year" : "per month",
      features: [
        isAnnual ? "600 credits annually" : "50 credits monthly",
        `${formatCreditPrice(getPrice('jobseeker', 'premium'), CREDITS.jobseeker.premium)} per credit`,
        "Roll-on credits"
      ],
      popular: true,
      isFree: false,
      credits: isAnnual ? "600 credits/year" : "50 credits/month"
    },
    {
      name: "Pro",
      description: "For serious professionals maximizing career opportunities",
      price: getPrice('jobseeker', 'pro'),
      period: isAnnual ? "per year" : "per month",
      features: [
        isAnnual ? "1200 credits annually" : "100 credits monthly",
        `${formatCreditPrice(getPrice('jobseeker', 'pro'), CREDITS.jobseeker.pro)} per credit`,
        "Roll-on credits"
      ],
      isFree: false,
      credits: isAnnual ? "1200 credits/year" : "100 credits/month"
    }
  ];

  const employerPlans = [
    {
      name: "Basic",
      description: "For individuals or explorers just getting started",
      price: getPrice('employer', 'basic'),
      period: isAnnual ? "per year" : "per month",
      features: [
        isAnnual ? "360 credits annually" : "30 credits monthly",
        `${formatCreditPrice(getPrice('employer', 'basic'), CREDITS.employer.basic)} per credit`
      ],
      isFree: false,
      credits: isAnnual ? "360 credits/year" : "30 credits/month"
    },
    {
      name: "Premium",
      description: "For small teams filling multiple roles a month",
      price: getPrice('employer', 'premium'),
      period: isAnnual ? "per year" : "per month",
      features: [
        isAnnual ? "1200 credits annually" : "100 credits monthly",
        `${formatCreditPrice(getPrice('employer', 'premium'), CREDITS.employer.premium)} per credit`,
        "Roll-on credits"
      ],
      popular: true,
      isFree: false,
      credits: isAnnual ? "1200 credits/year" : "100 credits/month"
    },
    {
      name: "Pro",
      description: "For businesses filling several roles a month",
      price: getPrice('employer', 'pro'),
      period: isAnnual ? "per year" : "per month",
      features: [
        isAnnual ? "2400 credits annually" : "200 credits monthly",
        `${formatCreditPrice(getPrice('employer', 'pro'), CREDITS.employer.pro)} per credit`,
        "Roll-on credits"
      ],
      isFree: false,
      credits: isAnnual ? "2400 credits/year" : "200 credits/month"
    }
  ];

  const calculatePrice = (price: number) => {
    const basePrice = isAnnual ? Math.round(price * 12 * 0.8) : price;
    return formatPrice(basePrice);
  };

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
            <p className="text-lg text-blue-600 font-medium mb-8">
              🎉 30-day free trial available for all plans
            </p>

            {/* Billing Toggle - only show for plans that have monthly/annual options */}
            {plans.some(plan => plan.period !== 'per credit') && (
              <div className="flex items-center justify-center space-x-4 mb-8">
                <ToggleGroup 
                  type="single" 
                  value={isAnnual ? "annual" : "monthly"}
                  onValueChange={(value) => {
                    if (value) {
                      setIsAnnual(value === "annual");
                    }
                  }}
                  className="bg-gray-100 rounded-full p-1"
                >
                  <ToggleGroupItem 
                    value="monthly" 
                    className="px-6 py-2 rounded-full data-[state=on]:bg-white data-[state=on]:shadow-sm"
                  >
                    Monthly
                  </ToggleGroupItem>
                  <ToggleGroupItem 
                    value="annual" 
                    className="px-6 py-2 rounded-full data-[state=on]:bg-white data-[state=on]:shadow-sm"
                  >
                    Annual
                  </ToggleGroupItem>
                </ToggleGroup>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Save 20%
                </span>
              </div>
            )}
          </div>

          <div className="grid gap-8 max-w-4xl mx-auto md:grid-cols-3">
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
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      {calculatePrice(plan.price)}
                    </span>
                    <span className="text-gray-600"> {plan.period}</span>
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
                
                <Link to="/waitlist" className="w-full">
                  <Button 
                    className={`w-full mt-auto ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                        : ''
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    Join the Waitlist
                  </Button>
                </Link>
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