import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Share2, TrendingUp, TrendingDown, Users, Lock, Unlock, Mail, Briefcase, MapPin, Lightbulb, CheckCircle2, Download, Image, Loader2, Sparkles, X, Shield, ShieldCheck, Globe } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useSalaryCheckRateLimit } from "@/hooks/use-rate-limit";
import { salaryData2025, regionMultipliers, JobSalaryData } from "@/data/salaryData2025";
import { JobTitleAutocomplete } from "@/components/JobTitleAutocomplete";
import { useLocation as useGeoLocation } from "@/hooks/use-location";
import { SEO, getSalaryCheckerSEO } from "@/components/SEO";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

// Get all unique countries from region multipliers for autocomplete
const allCountries = Object.keys(regionMultipliers);

const experienceLevels = [
  { value: "0", label: "0-2 years (Entry Level)", key: "entry" },
  { value: "3", label: "3-5 years (Mid-Level)", key: "mid" },
  { value: "6", label: "6-10 years (Senior)", key: "senior" },
  { value: "11", label: "10+ years (Lead/Expert)", key: "lead" },
];

// Get currency symbol for a country
const getCurrencySymbol = (country: string): { symbol: string; code: string } => {
  const currencyMap: Record<string, { symbol: string; code: string }> = {
    "United States": { symbol: "$", code: "USD" },
    "United Kingdom": { symbol: "£", code: "GBP" },
    "Germany": { symbol: "€", code: "EUR" },
    "France": { symbol: "€", code: "EUR" },
    "Netherlands": { symbol: "€", code: "EUR" },
    "Switzerland": { symbol: "CHF", code: "CHF" },
    "Ireland": { symbol: "€", code: "EUR" },
    "Belgium": { symbol: "€", code: "EUR" },
    "Austria": { symbol: "€", code: "EUR" },
    "Denmark": { symbol: "kr", code: "DKK" },
    "Sweden": { symbol: "kr", code: "SEK" },
    "Norway": { symbol: "kr", code: "NOK" },
    "Finland": { symbol: "€", code: "EUR" },
    "Spain": { symbol: "€", code: "EUR" },
    "Italy": { symbol: "€", code: "EUR" },
    "Portugal": { symbol: "€", code: "EUR" },
    "Greece": { symbol: "€", code: "EUR" },
    "Poland": { symbol: "zł", code: "PLN" },
    "Japan": { symbol: "¥", code: "JPY" },
    "South Korea": { symbol: "₩", code: "KRW" },
    "China": { symbol: "¥", code: "CNY" },
    "Hong Kong": { symbol: "HK$", code: "HKD" },
    "Singapore": { symbol: "S$", code: "SGD" },
    "India": { symbol: "₹", code: "INR" },
    "Australia": { symbol: "A$", code: "AUD" },
    "New Zealand": { symbol: "NZ$", code: "NZD" },
    "Canada": { symbol: "C$", code: "CAD" },
    "Mexico": { symbol: "MX$", code: "MXN" },
    "Brazil": { symbol: "R$", code: "BRL" },
    "South Africa": { symbol: "R", code: "ZAR" },
    "Nigeria": { symbol: "₦", code: "NGN" },
    "Kenya": { symbol: "KSh", code: "KES" },
    "Ghana": { symbol: "GH₵", code: "GHS" },
    "United Arab Emirates": { symbol: "AED", code: "AED" },
    "Saudi Arabia": { symbol: "SAR", code: "SAR" },
    "Israel": { symbol: "₪", code: "ILS" },
    "Turkey": { symbol: "₺", code: "TRY" },
    "Egypt": { symbol: "E£", code: "EGP" },
    "Russia": { symbol: "₽", code: "RUB" },
    "Ukraine": { symbol: "₴", code: "UAH" },
    "Philippines": { symbol: "₱", code: "PHP" },
    "Thailand": { symbol: "฿", code: "THB" },
    "Malaysia": { symbol: "RM", code: "MYR" },
    "Indonesia": { symbol: "Rp", code: "IDR" },
    "Vietnam": { symbol: "₫", code: "VND" },
  };
  return currencyMap[country] || { symbol: "$", code: "USD" };
};

// Find best matching job from 2025 data
const findMatchingJob = (title: string): JobSalaryData | null => {
  const normalizedTitle = title.toLowerCase().trim();
  
  // Exact match first
  const exactMatch = salaryData2025.find(
    (job) => job.title.toLowerCase() === normalizedTitle
  );
  if (exactMatch) return exactMatch;
  
  // Partial match
  const partialMatch = salaryData2025.find(
    (job) => 
      job.title.toLowerCase().includes(normalizedTitle) ||
      normalizedTitle.includes(job.title.toLowerCase())
  );
  if (partialMatch) return partialMatch;
  
  // Word-based matching
  const words = normalizedTitle.split(/\s+/);
  let bestMatch: JobSalaryData | null = null;
  let bestScore = 0;
  
  for (const job of salaryData2025) {
    const jobWords = job.title.toLowerCase().split(/\s+/);
    let score = 0;
    for (const word of words) {
      if (word.length < 3) continue;
      if (jobWords.some(jw => jw.includes(word) || word.includes(jw))) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = job;
    }
  }
  
  return bestScore > 0 ? bestMatch : null;
};

// Get region multiplier with fuzzy matching
const getRegionMultiplier = (location: string): { multiplier: number; country: string } => {
  const normalizedLocation = location.toLowerCase().trim();
  
  // Direct match
  for (const [country, multiplier] of Object.entries(regionMultipliers)) {
    if (country.toLowerCase() === normalizedLocation) {
      return { multiplier, country };
    }
  }
  
  // Partial match
  for (const [country, multiplier] of Object.entries(regionMultipliers)) {
    if (
      country.toLowerCase().includes(normalizedLocation) ||
      normalizedLocation.includes(country.toLowerCase())
    ) {
      return { multiplier, country };
    }
  }
  
  // City to country mapping for common cities
  const cityToCountry: Record<string, string> = {
    "new york": "United States",
    "san francisco": "United States",
    "los angeles": "United States",
    "seattle": "United States",
    "austin": "United States",
    "boston": "United States",
    "chicago": "United States",
    "london": "United Kingdom",
    "manchester": "United Kingdom",
    "birmingham": "United Kingdom",
    "berlin": "Germany",
    "munich": "Germany",
    "hamburg": "Germany",
    "paris": "France",
    "lyon": "France",
    "amsterdam": "Netherlands",
    "rotterdam": "Netherlands",
    "dublin": "Ireland",
    "tokyo": "Japan",
    "osaka": "Japan",
    "seoul": "South Korea",
    "beijing": "China",
    "shanghai": "China",
    "shenzhen": "China",
    "bangalore": "India",
    "mumbai": "India",
    "delhi": "India",
    "hyderabad": "India",
    "chennai": "India",
    "pune": "India",
    "sydney": "Australia",
    "melbourne": "Australia",
    "toronto": "Canada",
    "vancouver": "Canada",
    "montreal": "Canada",
    "singapore": "Singapore",
    "hong kong": "Hong Kong",
    "dubai": "United Arab Emirates",
    "abu dhabi": "United Arab Emirates",
    "tel aviv": "Israel",
    "sao paulo": "Brazil",
    "rio de janeiro": "Brazil",
    "johannesburg": "South Africa",
    "cape town": "South Africa",
    "lagos": "Nigeria",
    "nairobi": "Kenya",
    "accra": "Ghana",
    "kumasi": "Ghana",
    "cairo": "Egypt",
    "zurich": "Switzerland",
    "geneva": "Switzerland",
    "stockholm": "Sweden",
    "copenhagen": "Denmark",
    "oslo": "Norway",
    "helsinki": "Finland",
    "warsaw": "Poland",
    "prague": "Czech Republic",
    "vienna": "Austria",
    "brussels": "Belgium",
    "barcelona": "Spain",
    "madrid": "Spain",
    "rome": "Italy",
    "milan": "Italy",
    "lisbon": "Portugal",
    "mexico city": "Mexico",
    "buenos aires": "Argentina",
    "santiago": "Chile",
    "bogota": "Colombia",
    "lima": "Peru",
    "bangkok": "Thailand",
    "jakarta": "Indonesia",
    "ho chi minh city": "Vietnam",
    "hanoi": "Vietnam",
    "manila": "Philippines",
    "kuala lumpur": "Malaysia",
  };
  
  const matchedCountry = cityToCountry[normalizedLocation];
  if (matchedCountry && regionMultipliers[matchedCountry]) {
    return { multiplier: regionMultipliers[matchedCountry], country: matchedCountry };
  }
  
  // Default to US if no match found
  return { multiplier: 1.0, country: "United States" };
};

// Negotiation tips by experience level
const negotiationTips: Record<string, string[]> = {
  entry: [
    "Highlight relevant internships, projects, or certifications",
    "Research the company's growth trajectory and tie your potential to it",
    "Ask for a salary review after 6 months based on performance",
    "Negotiate non-monetary benefits like training opportunities",
    "Show enthusiasm but don't undersell - know your worth",
  ],
  mid: [
    "Document your achievements with specific metrics and numbers",
    "Research what competitors are paying for similar roles",
    "Ask about performance bonuses and clear promotion paths",
    "Negotiate flexible working arrangements as part of the package",
    "Time your negotiation after completing a successful project",
  ],
  senior: [
    "Lead with your proven track record and quantified achievements",
    "Benchmark against senior roles to show your readiness to grow",
    "Negotiate project leadership opportunities and team mentoring",
    "Ask for professional development budgets and certifications",
    "Consider the total package: equity, bonuses, and benefits",
  ],
  lead: [
    "Emphasize your strategic impact and leadership capabilities",
    "Negotiate for equity or profit-sharing arrangements",
    "Ask for executive-level benefits and signing bonuses",
    "Leverage competing offers professionally",
    "Consider deferred compensation and long-term incentives",
  ],
};

interface SalaryResult {
  lowRange: number;
  midRange: number;
  highRange: number;
  marketAverage: number;
  underpaidAmount?: number;
  jobTitle: string;
  location: string;
  country: string;
  experience: string;
  experienceLevel: string;
  dataPoints: number;
  countryComparisons: { country: string; salary: number }[];
  experienceBreakdown: { level: string; salary: number }[];
  currencySymbol: string;
  currencyCode: string;
  isAnnual: boolean;
}

const SalaryCheck = () => {
  const navigate = useNavigate();
  const geoLocation = useGeoLocation();
  const { checkRateLimit, recordRequest, formatTimeRemaining } = useSalaryCheckRateLimit();
  const [jobTitle, setJobTitle] = useState("");
  const [matchedJob, setMatchedJob] = useState<JobSalaryData | null>(null);
  const [yearsExperience, setYearsExperience] = useState("");
  const [location, setLocation] = useState("");
  const [currentSalary, setCurrentSalary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [showContribute, setShowContribute] = useState(false);
  const [contributeSalary, setContributeSalary] = useState("");
  const [industry, setIndustry] = useState("");
  
  // Email gate state
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isGeneratingGraphic, setIsGeneratingGraphic] = useState(false);
  const [generatedGraphicUrl, setGeneratedGraphicUrl] = useState<string | null>(null);
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  
  // Waitlist popup state
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false);
  
  // reCAPTCHA state
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Set location based on geo-detection
  useEffect(() => {
    if (geoLocation.countryName && !location) {
      setLocation(geoLocation.countryName);
    }
  }, [geoLocation.countryName]);

  useEffect(() => {
    if (result && !showWaitlistPopup) {
      const timer = setTimeout(() => {
        setShowWaitlistPopup(true);
      }, 12000);
      return () => clearTimeout(timer);
    }
  }, [result]);

  const getExperienceLevel = (years: number): "entry" | "mid" | "senior" | "lead" => {
    if (years <= 2) return "entry";
    if (years <= 5) return "mid";
    if (years <= 10) return "senior";
    return "lead";
  };

  const getExperienceLabel = (years: number): string => {
    if (years <= 2) return "Entry Level";
    if (years <= 5) return "Mid-Level";
    if (years <= 10) return "Senior";
    return "Lead/Expert";
  };

  const calculateSalary = async () => {
    // Check rate limit
    const rateLimitResult = checkRateLimit();
    if (!rateLimitResult.isAllowed) {
      toast({
        title: "Rate Limit Exceeded",
        description: `Please try again in ${formatTimeRemaining(rateLimitResult.timeUntilReset)}.`,
        variant: "destructive",
      });
      return;
    }

    if (!jobTitle || !yearsExperience || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      toast({
        title: "Verification Required",
        description: "Please complete the reCAPTCHA verification.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { data: verifyData, error: verifyError } = await supabase.functions.invoke("verify-recaptcha", {
        body: { token: recaptchaToken },
      });

      if (verifyError || !verifyData?.success) {
        toast({
          title: "Verification Failed",
          description: "reCAPTCHA verification failed. Please try again.",
          variant: "destructive",
        });
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        return;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify reCAPTCHA. Please try again.",
        variant: "destructive",
      });
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      return;
    }

    setIsLoading(true);
    setIsUnlocked(false);

    try {
      const years = parseInt(yearsExperience);
      const experienceLevel = getExperienceLevel(years);
      
      // Find matching job from 2025 data
      const jobData = matchedJob || findMatchingJob(jobTitle);
      
      if (!jobData) {
        toast({
          title: "Job Not Found",
          description: "We couldn't find salary data for this job title. Try a different title or browse our suggestions.",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // Get region multiplier
      const { multiplier: regionMultiplier, country } = getRegionMultiplier(location);
      const { symbol: currencySymbol, code: currencyCode } = getCurrencySymbol(country);
      
      // Calculate base salary in USD (annual)
      const baseMedian = jobData.salaryUSD.median;
      const experienceMultiplier = jobData.experienceMultipliers[experienceLevel];
      const adjustedUSD = baseMedian * experienceMultiplier;
      
      // Apply regional adjustment
      const regionalSalary = adjustedUSD * regionMultiplier;
      
      // Calculate ranges
      const lowRangeRatio = jobData.salaryUSD.min / jobData.salaryUSD.median;
      const highRangeRatio = jobData.salaryUSD.max / jobData.salaryUSD.median;
      
      const lowRange = regionalSalary * lowRangeRatio * experienceMultiplier;
      const highRange = regionalSalary * highRangeRatio * experienceMultiplier;
      const marketAverage = regionalSalary;

      // Calculate if underpaid (convert user input to annual if needed)
      let underpaidAmount: number | undefined;
      if (currentSalary) {
        const current = parseFloat(currentSalary);
        // Assume user enters annual salary
        if (current < marketAverage) {
          underpaidAmount = marketAverage - current;
        }
      }

      // Generate country comparisons
      const compareCountries = ["United States", "United Kingdom", "Germany", "Singapore", "India"].filter(
        (c) => c !== country
      );
      const countryComparisonData = compareCountries.map((c) => ({
        country: c,
        salary: Math.round(baseMedian * experienceMultiplier * (regionMultipliers[c] || 1)),
      })).slice(0, 4);

      // Generate experience breakdown
      const experienceBreakdown = [
        { level: "Entry Level", salary: Math.round(baseMedian * jobData.experienceMultipliers.entry * regionMultiplier) },
        { level: "Mid-Level", salary: Math.round(baseMedian * jobData.experienceMultipliers.mid * regionMultiplier) },
        { level: "Senior", salary: Math.round(baseMedian * jobData.experienceMultipliers.senior * regionMultiplier) },
        { level: "Lead/Expert", salary: Math.round(baseMedian * jobData.experienceMultipliers.lead * regionMultiplier) },
      ];

      recordRequest();
      setResult({
        lowRange: Math.round(lowRange),
        midRange: Math.round(marketAverage),
        highRange: Math.round(highRange),
        marketAverage: Math.round(marketAverage),
        underpaidAmount: underpaidAmount ? Math.round(underpaidAmount) : undefined,
        jobTitle: jobData.title,
        location,
        country,
        experience: getExperienceLabel(years),
        experienceLevel,
        dataPoints: 0,
        countryComparisons: countryComparisonData,
        experienceBreakdown,
        currencySymbol,
        currencyCode,
        isAnnual: true,
      });

    } catch (error) {
      console.error("Error calculating salary:", error);
      toast({
        title: "Error",
        description: "Failed to calculate salary. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const unlockFullReport = async () => {
    if (!email || !fullName) {
      toast({
        title: "Missing Information",
        description: "Please enter your name and email.",
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingEmail(true);

    try {
      // Store in salary_submissions with name and email
      const { error } = await supabase.from("salary_submissions").insert({
        full_name: fullName,
        email,
        job_title: result?.jobTitle || jobTitle,
        years_experience: parseInt(yearsExperience),
        location,
        current_salary: currentSalary ? parseFloat(currentSalary) : null,
        expected_salary: result?.marketAverage || null,
      });

      if (error && !error.message.includes("duplicate")) {
        throw error;
      }

      setIsUnlocked(true);
      toast({
        title: "Report Unlocked! 🎉",
        description: "Your full salary report is now available.",
      });
    } catch (error) {
      console.error("Error unlocking report:", error);
      toast({
        title: "Error",
        description: "Failed to unlock report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const contributeSalaryData = async () => {
    if (!contributeSalary || !jobTitle || !yearsExperience || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in salary and job details.",
        variant: "destructive",
      });
      return;
    }

    const salaryAmount = parseFloat(contributeSalary);
    const years = parseInt(yearsExperience);

    try {
      const { error } = await supabase.from("salary_submissions").insert({
        job_title: jobTitle,
        years_experience: years,
        location,
        current_salary: salaryAmount,
        expected_salary: result?.marketAverage || null,
        industry: industry || null,
      });

      if (error) throw error;

      toast({
        title: "Thank You!",
        description: "Your contribution helps others get accurate salary data.",
      });
      setShowContribute(false);
      setContributeSalary("");
    } catch (error) {
      console.error("Error submitting salary:", error);
      toast({
        title: "Error",
        description: "Failed to submit salary data.",
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (amount: number, annual: boolean = true) => {
    const symbol = result?.currencySymbol || "$";
    const formatted = amount.toLocaleString();
    return `${symbol}${formatted}${annual ? "/year" : ""}`;
  };

  const generateShareableGraphic = async () => {
    if (!result) return;

    setIsGeneratingGraphic(true);
    setGeneratedGraphicUrl(null);

    try {
      const response = await supabase.functions.invoke("generate-salary-graphic", {
        body: {
          jobTitle: result.jobTitle,
          location: result.location,
          experience: result.experience,
          marketAverage: result.marketAverage,
          underpaidAmount: result.underpaidAmount,
          lowRange: result.lowRange,
          highRange: result.highRange,
        },
      });

      if (response.error) throw response.error;
      
      const { imageUrl } = response.data;
      if (imageUrl) {
        setGeneratedGraphicUrl(imageUrl);
        toast({
          title: "Graphic Generated!",
          description: "Your shareable salary graphic is ready.",
        });
      }
    } catch (error) {
      console.error("Error generating graphic:", error);
      toast({
        title: "Error",
        description: "Failed to generate graphic. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingGraphic(false);
    }
  };

  const downloadGraphic = () => {
    if (!generatedGraphicUrl) return;
    
    const link = document.createElement("a");
    link.href = generatedGraphicUrl;
    link.download = `salary-check-${result?.jobTitle?.replace(/\s+/g, "-").toLowerCase() || "result"}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareResult = () => {
    if (!result) return;

    const text = `I'm a ${result.jobTitle} in ${result.location}. Here's what I should earn vs. reality:\n\nMarket Average: ${formatCurrency(result.marketAverage)}/month\n${result.underpaidAmount ? `I might be underpaid by ${formatCurrency(result.underpaidAmount)}!` : ""}\n\nCheck your salary: `;
    
    if (navigator.share) {
      navigator.share({
        title: "Salary Reality Check - Kuajiri",
        text,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(text + window.location.href);
      toast({
        title: "Copied to Clipboard",
        description: "Share link has been copied!",
      });
    }
  };

  // Get SEO config based on user's location
  const seoConfig = getSalaryCheckerSEO(location || geoLocation.countryName);

  return (
    <>
      <SEO {...seoConfig} />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-2">
            <img
              src="/lovable-uploads/ecae5e42-da12-4a99-ab6b-2cffb77b9585.png"
              alt="Kuajiri"
              className="h-8 w-auto"
            />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-block px-4 py-1.5 bg-destructive/10 text-destructive rounded-full text-sm font-medium mb-4">
            Are you being underpaid? Most professionals are.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Salary Reality Check
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            What should you <span className="text-primary font-semibold">actually</span> be earning? 
            Find out in seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="border-border/50 shadow-xl">
            <CardHeader>
              <CardTitle>Enter Your Details</CardTitle>
              <CardDescription>
                Get an instant salary comparison based on market data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <JobTitleAutocomplete
                  value={jobTitle}
                  onChange={(value, matched) => {
                    setJobTitle(value);
                    if (matched) setMatchedJob(matched);
                  }}
                />
                {matchedJob && jobTitle && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    Matched: {matchedJob.title} ({matchedJob.category})
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience *</Label>
                <Select value={yearsExperience} onValueChange={setYearsExperience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Country/Location *
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., United States, Germany, India"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                {geoLocation.countryName && location === geoLocation.countryName && (
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                    Detected: {geoLocation.flagEmoji} {geoLocation.countryName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentSalary">Your Current Annual Salary (optional)</Label>
                <Input
                  id="currentSalary"
                  type="number"
                  min="0"
                  placeholder="To see if you're underpaid"
                  value={currentSalary}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || parseFloat(value) >= 0) {
                      setCurrentSalary(value);
                    }
                  }}
                />
              </div>

              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={(token) => setRecaptchaToken(token)}
                  onExpired={() => setRecaptchaToken(null)}
                />
              </div>

              <Button 
                onClick={calculateSalary} 
                className="w-full" 
                size="lg"
                disabled={isLoading || !recaptchaToken}
              >
                {isLoading ? "Calculating..." : "Check My Salary"}
              </Button>

              {/* Privacy Notice */}
              <div className="flex items-start gap-2 p-3 bg-muted/50 rounded-lg border border-border/50">
                <Shield className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-xs text-muted-foreground">
                  <span className="font-medium text-foreground">100% Anonymous.</span> We don't save or have access to your personal salary data. All calculations happen instantly and nothing is stored.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Results - Partial View */}
          {result ? (
            <Card className="border-border/50 shadow-xl bg-gradient-to-br from-card to-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Salary Range</span>
                  <Button variant="ghost" size="icon" onClick={shareResult}>
                    <Share2 className="h-5 w-5" />
                  </Button>
                </CardTitle>
                <CardDescription>
                  {result.jobTitle} • {result.experience} • {result.location}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Underpaid Alert - Always Visible */}
                {result.underpaidAmount && (
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-center gap-2 text-destructive font-semibold mb-1">
                      <TrendingDown className="h-5 w-5" />
                      You might be underpaid!
                    </div>
                    <p className="text-2xl font-bold text-destructive">
                      GH₵{result.underpaidAmount.toLocaleString()}/month
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      That's GH₵{(result.underpaidAmount * 12).toLocaleString()} per year
                    </p>
                  </div>
                )}

                {/* Salary Range - Always Visible */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">Low Range</span>
                    <span className="font-semibold">{formatCurrency(result.lowRange)}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg border-2 border-primary/30">
                    <span className="text-primary font-medium">Market Average</span>
                    <span className="font-bold text-xl text-primary">{formatCurrency(result.midRange)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground">High Range</span>
                    <span className="font-semibold">{formatCurrency(result.highRange)}</span>
                  </div>
                </div>

                {/* Data Points */}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Based on {result.dataPoints > 0 ? `${result.dataPoints} submissions + ` : ""}market data</span>
                </div>

                {/* Unlock Detailed Report CTA */}
                {!isUnlocked && (
                  <Button 
                    onClick={() => document.getElementById('full-report')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full gap-2"
                  >
                    <Unlock className="h-4 w-4" />
                    Unlock Detailed Report
                  </Button>
                )}

                {/* Share Buttons */}
                <div className="flex flex-col gap-2">
                  <Button onClick={shareResult} variant="outline" className="w-full gap-2">
                    <Share2 className="h-4 w-4" />
                    Share My Salary Check
                  </Button>
                  
                  {/* Generate Shareable Graphic */}
                  {!generatedGraphicUrl ? (
                    <Button 
                      onClick={generateShareableGraphic} 
                      variant="secondary" 
                      className="w-full gap-2"
                      disabled={isGeneratingGraphic}
                    >
                      {isGeneratingGraphic ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Generating Graphic...
                        </>
                      ) : (
                        <>
                          <Image className="h-4 w-4" />
                          Create Shareable Graphic
                        </>
                      )}
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="rounded-lg overflow-hidden border border-border">
                        <img 
                          src={generatedGraphicUrl} 
                          alt="Salary comparison graphic" 
                          className="w-full"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          onClick={downloadGraphic} 
                          className="flex-1 gap-2"
                        >
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                        <Button 
                          onClick={generateShareableGraphic} 
                          variant="outline"
                          className="gap-2"
                          disabled={isGeneratingGraphic}
                        >
                          {isGeneratingGraphic ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            "Regenerate"
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border/50 shadow-xl flex items-center justify-center min-h-[400px]">
              <div className="text-center p-8">
                <TrendingUp className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">
                  Your Results Will Appear Here
                </h3>
                <p className="text-sm text-muted-foreground/70">
                  Fill in your details and click "Check My Salary"
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Full Report Section - Show blurred when locked, clear when unlocked */}
        {result && (
          <div id="full-report" className="mt-8 relative scroll-mt-4">
            {/* Blurred Report Preview */}
            <div className={`space-y-6 transition-all duration-500 ${!isUnlocked ? "blur-md pointer-events-none select-none" : ""}`}>
              {isUnlocked && (
                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full text-sm font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    Full Report Unlocked!
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Experience Level Breakdown */}
                <Card className="border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Salary by Experience Level
                    </CardTitle>
                    <CardDescription>
                      {result.jobTitle} in {result.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {result.experienceBreakdown.map((item) => (
                      <div 
                        key={item.level}
                        className={`flex justify-between items-center p-3 rounded-lg ${
                          item.level === result.experience 
                            ? "bg-primary/10 border-2 border-primary/30" 
                            : "bg-muted/30"
                        }`}
                      >
                        <span className={item.level === result.experience ? "font-semibold text-primary" : "text-muted-foreground"}>
                          {item.level}
                        </span>
                        <span className={item.level === result.experience ? "font-bold text-primary" : "font-medium"}>
                          {formatCurrency(item.salary)}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* City Comparison */}
                <Card className="border-border/50 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <MapPin className="h-5 w-5 text-primary" />
                      Salary in Other Cities
                    </CardTitle>
                    <CardDescription>
                      Same role, different locations
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center p-3 rounded-lg bg-primary/10 border-2 border-primary/30">
                      <span className="font-semibold text-primary">{result.country} (You)</span>
                      <span className="font-bold text-primary">{formatCurrency(result.midRange)}</span>
                    </div>
                    {result.countryComparisons.map((item) => (
                      <div 
                        key={item.country}
                        className="flex justify-between items-center p-3 rounded-lg bg-muted/30"
                      >
                        <span className="text-muted-foreground">{item.country}</span>
                        <span className="font-medium">{formatCurrency(item.salary)}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Negotiation Tips */}
              <Card className="border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-primary" />
                    5 Negotiation Strategies for {result.experience} Professionals
                  </CardTitle>
                  <CardDescription>
                    Personalized tips to help you get what you deserve
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {negotiationTips[result.experienceLevel].map((tip, index) => (
                      <div key={index} className="flex gap-3 p-4 bg-muted/30 rounded-lg">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-primary font-bold text-sm">{index + 1}</span>
                        </div>
                        <p className="text-sm">{tip}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Jobs CTA */}
              <Card className="border-primary/30 shadow-lg bg-gradient-to-r from-primary/5 to-primary/10">
                <CardContent className="pt-6 pb-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Looking for jobs at this salary range?</h3>
                        <p className="text-sm text-muted-foreground">
                          Join our waitlist to be notified when {result.jobTitle} jobs in {result.location} are posted
                        </p>
                      </div>
                    </div>
                    <Link to="/waitlist">
                      <Button className="gap-2">
                        <Mail className="h-4 w-4" />
                        Join Waitlist
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Contribute CTA - Only show when unlocked */}
              {isUnlocked && (
                !showContribute ? (
                  <Button 
                    variant="ghost" 
                    className="w-full text-muted-foreground"
                    onClick={() => setShowContribute(true)}
                  >
                    Help improve accuracy - contribute your salary anonymously
                  </Button>
                ) : (
                  <Card className="border-border/50">
                    <CardContent className="pt-6">
                      <p className="text-sm font-medium mb-3">Contribute Anonymously</p>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Input
                          type="number"
                          min="0"
                          placeholder="Your actual monthly salary (GH₵)"
                          value={contributeSalary}
                          onChange={(e) => {
                            const value = e.target.value;
                            if (value === '' || parseFloat(value) >= 0) {
                              setContributeSalary(value);
                            }
                          }}
                          className="flex-1"
                        />
                        <Input
                          placeholder="Industry (optional)"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          className="flex-1"
                        />
                        <Button onClick={contributeSalaryData}>
                          Submit
                        </Button>
                        <Button 
                          variant="ghost" 
                          onClick={() => setShowContribute(false)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              )}
            </div>

            {/* Unlock Overlay - Show when locked */}
            {!isUnlocked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Card className="border-2 border-primary/30 shadow-2xl bg-background/95 backdrop-blur-sm max-w-lg mx-4">
                  <CardContent className="pt-8 pb-8">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">
                        Unlock Full Report
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        Enter your details to see the complete salary breakdown and negotiation tips.
                      </p>

                      {/* Email Form */}
                      <div className="flex flex-col gap-3 max-w-sm mx-auto">
                        <Input
                          placeholder="Your name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                        <Input
                          type="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button 
                          onClick={unlockFullReport}
                          disabled={isSubmittingEmail}
                          size="lg"
                          className="gap-2"
                        >
                          {isSubmittingEmail ? (
                            "Unlocking..."
                          ) : (
                            <>
                              <Unlock className="h-4 w-4" />
                              Unlock Full Report (Free)
                            </>
                          )}
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-3">
                        No spam, ever. We'll send you occasional career tips.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        )}


        {/* Info Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="border-border/30 bg-card/50">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Crowdsourced Data</h3>
              <p className="text-sm text-muted-foreground">
                Our data improves with every contribution from professionals like you
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/30 bg-card/50">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Ghana-Focused</h3>
              <p className="text-sm text-muted-foreground">
                Salary data specifically for the Ghanaian job market
              </p>
            </CardContent>
          </Card>
          <Card className="border-border/30 bg-card/50">
            <CardContent className="pt-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Shareable Results</h3>
              <p className="text-sm text-muted-foreground">
                Share your salary check with friends and colleagues
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Powered by Footer */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Powered by <span className="font-semibold text-primary">Kuajiri AI</span> ✨
          </p>
        </div>
      </main>

      {/* Waitlist Popup */}
      <Dialog open={showWaitlistPopup} onOpenChange={setShowWaitlistPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">
              Get Early Access to Kuajiri AI
            </DialogTitle>
            <DialogDescription className="text-center">
              Join thousands of job seekers using AI to land their dream jobs faster. Get personalized job matches, salary insights, and career coaching.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>AI-powered job matching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Personalized salary insights</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Interview preparation tools</span>
              </div>
            </div>
            <Button 
              onClick={() => navigate("/waitlist")}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Join the Waitlist
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
            <button 
              onClick={() => setShowWaitlistPopup(false)}
              className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Maybe later
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
};

export default SalaryCheck;
