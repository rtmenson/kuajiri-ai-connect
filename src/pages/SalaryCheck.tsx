import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Share2, TrendingUp, TrendingDown, Users, Lock, Unlock, Mail, Briefcase, MapPin, Lightbulb, CheckCircle2, Download, Image, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const ghanaLocations = [
  "Accra",
  "Kumasi",
  "Takoradi",
  "Tamale",
  "Cape Coast",
  "Ho",
  "Koforidua",
  "Sunyani",
  "Tema",
  "Other",
];

const experienceLevels = [
  { value: "0", label: "0-1 years (Entry Level)" },
  { value: "2", label: "2-3 years (Junior)" },
  { value: "4", label: "4-6 years (Mid-Level)" },
  { value: "7", label: "7-10 years (Senior)" },
  { value: "11", label: "11+ years (Expert)" },
];

// Baseline salary data for Ghana (in GHS monthly)
const baselineSalaries: Record<string, Record<string, number>> = {
  "software developer": { entry: 3500, junior: 5500, mid: 8500, senior: 14000, expert: 22000 },
  "software engineer": { entry: 3500, junior: 5500, mid: 8500, senior: 14000, expert: 22000 },
  "data analyst": { entry: 3000, junior: 4500, mid: 7000, senior: 11000, expert: 18000 },
  "accountant": { entry: 2500, junior: 3800, mid: 5500, senior: 8500, expert: 14000 },
  "marketing manager": { entry: 2800, junior: 4200, mid: 6500, senior: 10000, expert: 16000 },
  "nurse": { entry: 2200, junior: 3200, mid: 4500, senior: 6500, expert: 9000 },
  "teacher": { entry: 1800, junior: 2500, mid: 3500, senior: 5000, expert: 7500 },
  "project manager": { entry: 3500, junior: 5500, mid: 8000, senior: 13000, expert: 20000 },
  "hr manager": { entry: 2800, junior: 4200, mid: 6500, senior: 10000, expert: 15000 },
  "graphic designer": { entry: 2200, junior: 3500, mid: 5000, senior: 7500, expert: 11000 },
  "sales executive": { entry: 2000, junior: 3200, mid: 5000, senior: 8000, expert: 13000 },
  "banker": { entry: 3000, junior: 4500, mid: 7000, senior: 11000, expert: 17000 },
  "default": { entry: 2500, junior: 3800, mid: 5500, senior: 8500, expert: 13000 },
};

// Location multipliers
const locationMultipliers: Record<string, number> = {
  "Accra": 1.2,
  "Tema": 1.15,
  "Kumasi": 1.0,
  "Takoradi": 1.05,
  "Cape Coast": 0.95,
  "Tamale": 0.9,
  "Ho": 0.9,
  "Koforidua": 0.92,
  "Sunyani": 0.9,
  "Other": 0.88,
};

// City comparison data
const cityComparisons: Record<string, number> = {
  "Accra": 1.2,
  "Tema": 1.15,
  "Kumasi": 1.0,
  "Takoradi": 1.05,
  "Cape Coast": 0.95,
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
  junior: [
    "Document your achievements with specific metrics and numbers",
    "Research what competitors are paying for similar roles",
    "Ask about performance bonuses and clear promotion paths",
    "Negotiate flexible working arrangements as part of the package",
    "Time your negotiation after completing a successful project",
  ],
  mid: [
    "Lead with your proven track record and quantified achievements",
    "Benchmark against senior roles to show your readiness to grow",
    "Negotiate project leadership opportunities and team mentoring",
    "Ask for professional development budgets and certifications",
    "Consider the total package: equity, bonuses, and benefits",
  ],
  senior: [
    "Emphasize your strategic impact and leadership capabilities",
    "Negotiate for equity or profit-sharing arrangements",
    "Ask for executive-level benefits and signing bonuses",
    "Leverage competing offers professionally",
    "Negotiate your title alongside compensation for long-term value",
  ],
  expert: [
    "Position yourself as a strategic asset, not just an employee",
    "Negotiate consulting-style arrangements or advisory roles",
    "Ask for board visibility or C-suite interaction opportunities",
    "Leverage your network and industry reputation",
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
  experience: string;
  experienceLevel: string;
  dataPoints: number;
  cityComparisons: { city: string; salary: number }[];
  experienceBreakdown: { level: string; salary: number }[];
}

const SalaryCheck = () => {
  const [jobTitle, setJobTitle] = useState("");
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

  const getExperienceLevel = (years: number): string => {
    if (years <= 1) return "entry";
    if (years <= 3) return "junior";
    if (years <= 6) return "mid";
    if (years <= 10) return "senior";
    return "expert";
  };

  const getExperienceLabel = (years: number): string => {
    if (years <= 1) return "Entry Level";
    if (years <= 3) return "Junior";
    if (years <= 6) return "Mid-Level";
    if (years <= 10) return "Senior";
    return "Expert";
  };

  const calculateSalary = async () => {
    if (!jobTitle || !yearsExperience || !location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setIsUnlocked(false);

    try {
      const years = parseInt(yearsExperience);
      const experienceLevel = getExperienceLevel(years);
      const normalizedTitle = jobTitle.toLowerCase().trim();

      // Get baseline salary
      let baseSalaryData = baselineSalaries["default"];
      for (const [key, values] of Object.entries(baselineSalaries)) {
        if (normalizedTitle.includes(key) || key.includes(normalizedTitle)) {
          baseSalaryData = values;
          break;
        }
      }
      const baseSalary = baseSalaryData[experienceLevel];

      // Apply location multiplier
      const locationMultiplier = locationMultipliers[location] || 1.0;
      const adjustedSalary = baseSalary * locationMultiplier;

      // Fetch crowdsourced data for better accuracy
      const { data: crowdsourcedData, error } = await supabase
        .from("salary_submissions")
        .select("current_salary, expected_salary")
        .ilike("job_title", `%${normalizedTitle}%`)
        .eq("location", location)
        .gte("years_experience", years - 2)
        .lte("years_experience", years + 2);

      let dataPoints = 0;
      let crowdsourcedAverage = adjustedSalary;

      if (!error && crowdsourcedData && crowdsourcedData.length > 0) {
        dataPoints = crowdsourcedData.length;
        const validSalaries = crowdsourcedData
          .filter((d) => d.current_salary)
          .map((d) => Number(d.current_salary));
        if (validSalaries.length > 0) {
          crowdsourcedAverage = validSalaries.reduce((a, b) => a + b, 0) / validSalaries.length;
        }
      }

      // Calculate ranges
      const marketAverage = dataPoints > 5 
        ? (adjustedSalary * 0.3 + crowdsourcedAverage * 0.7) 
        : adjustedSalary;
      
      const lowRange = marketAverage * 0.75;
      const highRange = marketAverage * 1.35;

      // Calculate if underpaid
      let underpaidAmount: number | undefined;
      if (currentSalary) {
        const current = parseFloat(currentSalary);
        if (current < marketAverage) {
          underpaidAmount = marketAverage - current;
        }
      }

      // Generate city comparisons
      const cityComparisonData = Object.entries(cityComparisons)
        .filter(([city]) => city !== location)
        .map(([city, multiplier]) => ({
          city,
          salary: Math.round(baseSalary * multiplier),
        }))
        .slice(0, 4);

      // Generate experience breakdown
      const experienceBreakdown = [
        { level: "Entry Level", salary: Math.round(baseSalaryData.entry * locationMultiplier) },
        { level: "Junior", salary: Math.round(baseSalaryData.junior * locationMultiplier) },
        { level: "Mid-Level", salary: Math.round(baseSalaryData.mid * locationMultiplier) },
        { level: "Senior", salary: Math.round(baseSalaryData.senior * locationMultiplier) },
        { level: "Expert", salary: Math.round(baseSalaryData.expert * locationMultiplier) },
      ];

      setResult({
        lowRange: Math.round(lowRange),
        midRange: Math.round(marketAverage),
        highRange: Math.round(highRange),
        marketAverage: Math.round(marketAverage),
        underpaidAmount: underpaidAmount ? Math.round(underpaidAmount) : undefined,
        jobTitle,
        location,
        experience: getExperienceLabel(years),
        experienceLevel,
        dataPoints,
        cityComparisons: cityComparisonData,
        experienceBreakdown,
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

    try {
      const { error } = await supabase.from("salary_submissions").insert({
        job_title: jobTitle,
        years_experience: parseInt(yearsExperience),
        location,
        current_salary: parseFloat(contributeSalary),
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

  const formatCurrency = (amount: number) => {
    return `GH₵${amount.toLocaleString()}`;
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

  return (
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
            Are you being underpaid? 85% of Ghanaians are.
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
                Get an instant salary comparison based on Ghana market data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g., Software Developer, Accountant"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
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
                <Label htmlFor="location">Location in Ghana *</Label>
                <Select value={location} onValueChange={setLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your city" />
                  </SelectTrigger>
                  <SelectContent>
                    {ghanaLocations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentSalary">Your Current Salary (GH₵/month)</Label>
                <Input
                  id="currentSalary"
                  type="number"
                  placeholder="Optional - to see if you're underpaid"
                  value={currentSalary}
                  onChange={(e) => setCurrentSalary(e.target.value)}
                />
              </div>

              <Button 
                onClick={calculateSalary} 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Calculating..." : "Check My Salary"}
              </Button>
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
          <div className="mt-8 relative">
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
                      <span className="font-semibold text-primary">{result.location} (You)</span>
                      <span className="font-bold text-primary">{formatCurrency(result.midRange)}</span>
                    </div>
                    {result.cityComparisons.map((city) => (
                      <div 
                        key={city.city}
                        className="flex justify-between items-center p-3 rounded-lg bg-muted/30"
                      >
                        <span className="text-muted-foreground">{city.city}</span>
                        <span className="font-medium">{formatCurrency(city.salary)}</span>
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
                          placeholder="Your actual monthly salary (GH₵)"
                          value={contributeSalary}
                          onChange={(e) => setContributeSalary(e.target.value)}
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
    </div>
  );
};

export default SalaryCheck;
