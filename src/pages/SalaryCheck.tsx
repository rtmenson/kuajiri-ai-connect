import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Share2, TrendingUp, TrendingDown, Users, Download } from "lucide-react";
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

interface SalaryResult {
  lowRange: number;
  midRange: number;
  highRange: number;
  marketAverage: number;
  underpaidAmount?: number;
  jobTitle: string;
  location: string;
  experience: string;
  dataPoints: number;
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

    try {
      const years = parseInt(yearsExperience);
      const experienceLevel = getExperienceLevel(years);
      const normalizedTitle = jobTitle.toLowerCase().trim();

      // Get baseline salary
      let baseSalary = baselineSalaries["default"][experienceLevel];
      for (const [key, values] of Object.entries(baselineSalaries)) {
        if (normalizedTitle.includes(key) || key.includes(normalizedTitle)) {
          baseSalary = values[experienceLevel];
          break;
        }
      }

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

      setResult({
        lowRange: Math.round(lowRange),
        midRange: Math.round(marketAverage),
        highRange: Math.round(highRange),
        marketAverage: Math.round(marketAverage),
        underpaidAmount: underpaidAmount ? Math.round(underpaidAmount) : undefined,
        jobTitle,
        location,
        experience: getExperienceLabel(years),
        dataPoints,
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

      <main className="container mx-auto px-4 py-8 max-w-4xl">
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

          {/* Results */}
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
                {/* Underpaid Alert */}
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

                {/* Salary Range */}
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

                {/* Share Button */}
                <Button onClick={shareResult} variant="outline" className="w-full gap-2">
                  <Share2 className="h-4 w-4" />
                  Share My Salary Check
                </Button>

                {/* Contribute CTA */}
                {!showContribute ? (
                  <Button 
                    variant="ghost" 
                    className="w-full text-muted-foreground"
                    onClick={() => setShowContribute(true)}
                  >
                    Help improve accuracy - contribute your salary anonymously
                  </Button>
                ) : (
                  <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                    <p className="text-sm font-medium">Contribute Anonymously</p>
                    <Input
                      type="number"
                      placeholder="Your actual monthly salary (GH₵)"
                      value={contributeSalary}
                      onChange={(e) => setContributeSalary(e.target.value)}
                    />
                    <Input
                      placeholder="Industry (optional)"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button onClick={contributeSalaryData} size="sm" className="flex-1">
                        Submit
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowContribute(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
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
