import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft, Share2, TrendingUp, TrendingDown, Users, Lock, Unlock, Mail, Briefcase, MapPin, Lightbulb, CheckCircle2, Download, Image, Loader2, Sparkles, X, Shield, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useSalaryCheckRateLimit } from "@/hooks/use-rate-limit";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

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

// Baseline salary data for Ghana (in GHS monthly) - Updated for 2025
const baselineSalaries: Record<string, Record<string, number>> = {
  // Technology & Engineering
  "software developer": { entry: 4000, junior: 6500, mid: 10000, senior: 16000, expert: 25000 },
  "software engineer": { entry: 4200, junior: 6800, mid: 10500, senior: 17000, expert: 26000 },
  "frontend developer": { entry: 3800, junior: 6000, mid: 9500, senior: 15000, expert: 23000 },
  "backend developer": { entry: 4000, junior: 6500, mid: 10000, senior: 16000, expert: 25000 },
  "full stack developer": { entry: 4200, junior: 7000, mid: 11000, senior: 17500, expert: 27000 },
  "mobile developer": { entry: 4000, junior: 6500, mid: 10500, senior: 16500, expert: 25000 },
  "devops engineer": { entry: 4500, junior: 7500, mid: 12000, senior: 18000, expert: 28000 },
  "cloud engineer": { entry: 4500, junior: 7500, mid: 12000, senior: 18500, expert: 29000 },
  "data scientist": { entry: 4500, junior: 7500, mid: 12000, senior: 18000, expert: 28000 },
  "data analyst": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  "data engineer": { entry: 4200, junior: 7000, mid: 11000, senior: 17000, expert: 26000 },
  "machine learning engineer": { entry: 5000, junior: 8000, mid: 13000, senior: 20000, expert: 32000 },
  "ai engineer": { entry: 5000, junior: 8500, mid: 14000, senior: 22000, expert: 35000 },
  "cybersecurity analyst": { entry: 4000, junior: 6500, mid: 10500, senior: 16000, expert: 24000 },
  "network engineer": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 19000 },
  "system administrator": { entry: 3200, junior: 5000, mid: 7500, senior: 11000, expert: 16000 },
  "database administrator": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 19000 },
  "qa engineer": { entry: 3200, junior: 5000, mid: 8000, senior: 12000, expert: 18000 },
  "product manager": { entry: 4500, junior: 7500, mid: 12000, senior: 18000, expert: 28000 },
  "technical writer": { entry: 2800, junior: 4200, mid: 6500, senior: 9500, expert: 14000 },
  "it support": { entry: 2200, junior: 3200, mid: 4800, senior: 7000, expert: 10000 },
  "it manager": { entry: 5000, junior: 7500, mid: 11000, senior: 16000, expert: 24000 },
  "ui designer": { entry: 3000, junior: 4800, mid: 7500, senior: 11000, expert: 16000 },
  "ux designer": { entry: 3200, junior: 5200, mid: 8000, senior: 12000, expert: 18000 },
  "ui/ux designer": { entry: 3200, junior: 5200, mid: 8000, senior: 12000, expert: 18000 },
  
  // Finance & Accounting
  "accountant": { entry: 2800, junior: 4200, mid: 6500, senior: 10000, expert: 16000 },
  "senior accountant": { entry: 4000, junior: 5500, mid: 7500, senior: 11000, expert: 17000 },
  "financial analyst": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  "finance manager": { entry: 5000, junior: 7500, mid: 11000, senior: 16000, expert: 24000 },
  "auditor": { entry: 3000, junior: 4500, mid: 7000, senior: 11000, expert: 17000 },
  "banker": { entry: 3200, junior: 5000, mid: 8000, senior: 12500, expert: 19000 },
  "investment analyst": { entry: 4000, junior: 6500, mid: 10000, senior: 15000, expert: 23000 },
  "tax consultant": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  "credit analyst": { entry: 3200, junior: 5000, mid: 7500, senior: 11000, expert: 16000 },
  "treasury analyst": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 19000 },
  "risk analyst": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  
  // Marketing & Sales
  "marketing manager": { entry: 3200, junior: 5000, mid: 8000, senior: 12000, expert: 18000 },
  "digital marketing": { entry: 2500, junior: 4000, mid: 6500, senior: 10000, expert: 15000 },
  "digital marketer": { entry: 2500, junior: 4000, mid: 6500, senior: 10000, expert: 15000 },
  "content creator": { entry: 2000, junior: 3500, mid: 5500, senior: 8500, expert: 13000 },
  "social media manager": { entry: 2200, junior: 3800, mid: 6000, senior: 9000, expert: 14000 },
  "seo specialist": { entry: 2500, junior: 4000, mid: 6500, senior: 10000, expert: 15000 },
  "brand manager": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  "sales executive": { entry: 2200, junior: 3800, mid: 6000, senior: 9500, expert: 15000 },
  "sales manager": { entry: 4000, junior: 6000, mid: 9000, senior: 14000, expert: 21000 },
  "business development": { entry: 3000, junior: 5000, mid: 8000, senior: 12500, expert: 19000 },
  "account manager": { entry: 3000, junior: 4800, mid: 7500, senior: 11500, expert: 17000 },
  "customer success": { entry: 2500, junior: 4000, mid: 6500, senior: 10000, expert: 15000 },
  "public relations": { entry: 2500, junior: 4000, mid: 6500, senior: 10000, expert: 15000 },
  
  // Human Resources
  "hr manager": { entry: 3200, junior: 5000, mid: 7500, senior: 11500, expert: 17000 },
  "hr officer": { entry: 2200, junior: 3500, mid: 5200, senior: 7500, expert: 11000 },
  "recruiter": { entry: 2500, junior: 4000, mid: 6000, senior: 9000, expert: 13000 },
  "talent acquisition": { entry: 2800, junior: 4500, mid: 7000, senior: 10500, expert: 16000 },
  "compensation analyst": { entry: 3000, junior: 4800, mid: 7500, senior: 11000, expert: 16000 },
  "training manager": { entry: 3000, junior: 4800, mid: 7500, senior: 11000, expert: 16000 },
  
  // Operations & Project Management
  "project manager": { entry: 4000, junior: 6500, mid: 9500, senior: 15000, expert: 23000 },
  "operations manager": { entry: 3800, junior: 6000, mid: 9000, senior: 14000, expert: 21000 },
  "supply chain manager": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  "logistics manager": { entry: 3200, junior: 5000, mid: 7800, senior: 12000, expert: 18000 },
  "procurement officer": { entry: 2800, junior: 4500, mid: 7000, senior: 10500, expert: 16000 },
  "quality assurance": { entry: 2800, junior: 4500, mid: 7000, senior: 10500, expert: 16000 },
  "business analyst": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  "management consultant": { entry: 4500, junior: 7500, mid: 12000, senior: 18000, expert: 28000 },
  
  // Healthcare
  "doctor": { entry: 5500, junior: 8500, mid: 12000, senior: 18000, expert: 28000 },
  "physician": { entry: 5500, junior: 8500, mid: 12000, senior: 18000, expert: 28000 },
  "nurse": { entry: 2500, junior: 3800, mid: 5500, senior: 8000, expert: 11000 },
  "registered nurse": { entry: 2800, junior: 4200, mid: 6000, senior: 8500, expert: 12000 },
  "pharmacist": { entry: 4000, junior: 6000, mid: 8500, senior: 12000, expert: 17000 },
  "lab technician": { entry: 2200, junior: 3500, mid: 5000, senior: 7500, expert: 11000 },
  "medical officer": { entry: 5000, junior: 7500, mid: 10500, senior: 15000, expert: 22000 },
  "dentist": { entry: 5000, junior: 7500, mid: 11000, senior: 16000, expert: 24000 },
  "physiotherapist": { entry: 2800, junior: 4500, mid: 6500, senior: 9500, expert: 14000 },
  
  // Education
  "teacher": { entry: 2000, junior: 2800, mid: 4000, senior: 5800, expert: 8500 },
  "lecturer": { entry: 3500, junior: 5000, mid: 7000, senior: 10000, expert: 15000 },
  "professor": { entry: 6000, junior: 8000, mid: 11000, senior: 15000, expert: 22000 },
  "headteacher": { entry: 3500, junior: 5000, mid: 7000, senior: 10000, expert: 14000 },
  "education administrator": { entry: 3000, junior: 4500, mid: 6500, senior: 9500, expert: 14000 },
  "trainer": { entry: 2500, junior: 4000, mid: 6000, senior: 9000, expert: 13000 },
  
  // Legal
  "lawyer": { entry: 4000, junior: 6500, mid: 10000, senior: 16000, expert: 25000 },
  "legal officer": { entry: 3500, junior: 5500, mid: 8000, senior: 12000, expert: 18000 },
  "paralegal": { entry: 2200, junior: 3500, mid: 5200, senior: 7500, expert: 11000 },
  "company secretary": { entry: 4000, junior: 6000, mid: 9000, senior: 14000, expert: 21000 },
  
  // Engineering (Non-Software)
  "civil engineer": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  "mechanical engineer": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  "electrical engineer": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  "chemical engineer": { entry: 4000, junior: 6500, mid: 10000, senior: 15000, expert: 23000 },
  "petroleum engineer": { entry: 6000, junior: 10000, mid: 16000, senior: 24000, expert: 38000 },
  "mining engineer": { entry: 5000, junior: 8500, mid: 13000, senior: 20000, expert: 32000 },
  "structural engineer": { entry: 3800, junior: 6000, mid: 9000, senior: 14000, expert: 21000 },
  "architect": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  "quantity surveyor": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  
  // Creative & Design
  "graphic designer": { entry: 2500, junior: 4000, mid: 6000, senior: 9000, expert: 13000 },
  "creative director": { entry: 5000, junior: 7500, mid: 11000, senior: 16000, expert: 24000 },
  "video editor": { entry: 2200, junior: 3500, mid: 5500, senior: 8500, expert: 13000 },
  "photographer": { entry: 2000, junior: 3200, mid: 5000, senior: 8000, expert: 12000 },
  "animator": { entry: 2500, junior: 4000, mid: 6500, senior: 10000, expert: 15000 },
  "interior designer": { entry: 2800, junior: 4500, mid: 7000, senior: 10500, expert: 16000 },
  "fashion designer": { entry: 2500, junior: 4000, mid: 6500, senior: 10000, expert: 15000 },
  
  // Administration & Support
  "administrative assistant": { entry: 1800, junior: 2500, mid: 3500, senior: 5000, expert: 7500 },
  "executive assistant": { entry: 2500, junior: 4000, mid: 6000, senior: 9000, expert: 13000 },
  "office manager": { entry: 2800, junior: 4200, mid: 6500, senior: 9500, expert: 14000 },
  "receptionist": { entry: 1500, junior: 2000, mid: 2800, senior: 4000, expert: 5500 },
  "personal assistant": { entry: 2200, junior: 3500, mid: 5200, senior: 7800, expert: 11000 },
  "secretary": { entry: 1800, junior: 2600, mid: 3800, senior: 5500, expert: 8000 },
  
  // Customer Service
  "customer service": { entry: 1800, junior: 2600, mid: 3800, senior: 5500, expert: 8000 },
  "call center agent": { entry: 1600, junior: 2200, mid: 3200, senior: 4500, expert: 6500 },
  "customer support": { entry: 1800, junior: 2600, mid: 3800, senior: 5500, expert: 8000 },
  
  // Hospitality & Tourism
  "hotel manager": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  "chef": { entry: 2500, junior: 4000, mid: 6000, senior: 9000, expert: 14000 },
  "tour guide": { entry: 1500, junior: 2200, mid: 3200, senior: 4800, expert: 7000 },
  "event planner": { entry: 2500, junior: 4000, mid: 6000, senior: 9000, expert: 14000 },
  "restaurant manager": { entry: 2800, junior: 4500, mid: 7000, senior: 10500, expert: 16000 },
  
  // Media & Communications
  "journalist": { entry: 2200, junior: 3500, mid: 5500, senior: 8500, expert: 13000 },
  "editor": { entry: 2500, junior: 4000, mid: 6000, senior: 9000, expert: 14000 },
  "communications manager": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  "copywriter": { entry: 2200, junior: 3500, mid: 5500, senior: 8500, expert: 13000 },
  "broadcast journalist": { entry: 2500, junior: 4000, mid: 6000, senior: 9500, expert: 15000 },
  
  // Agriculture & Environment
  "agronomist": { entry: 2800, junior: 4500, mid: 7000, senior: 10500, expert: 16000 },
  "environmental officer": { entry: 2500, junior: 4000, mid: 6000, senior: 9000, expert: 14000 },
  "farm manager": { entry: 2800, junior: 4500, mid: 7000, senior: 10500, expert: 16000 },
  
  // Executive & Senior Management
  "ceo": { entry: 15000, junior: 22000, mid: 32000, senior: 45000, expert: 65000 },
  "cto": { entry: 12000, junior: 18000, mid: 26000, senior: 38000, expert: 55000 },
  "cfo": { entry: 12000, junior: 18000, mid: 26000, senior: 38000, expert: 55000 },
  "coo": { entry: 11000, junior: 17000, mid: 25000, senior: 36000, expert: 52000 },
  "general manager": { entry: 7000, junior: 10000, mid: 15000, senior: 22000, expert: 32000 },
  "director": { entry: 8000, junior: 12000, mid: 18000, senior: 26000, expert: 38000 },
  "managing director": { entry: 10000, junior: 15000, mid: 22000, senior: 32000, expert: 45000 },
  
  // Banking & Insurance Specific
  "bank teller": { entry: 2200, junior: 3200, mid: 4500, senior: 6500, expert: 9000 },
  "relationship manager": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  "loan officer": { entry: 2800, junior: 4500, mid: 7000, senior: 10500, expert: 16000 },
  "insurance agent": { entry: 2000, junior: 3200, mid: 5000, senior: 8000, expert: 12000 },
  "underwriter": { entry: 3200, junior: 5000, mid: 7800, senior: 12000, expert: 18000 },
  "claims officer": { entry: 2500, junior: 4000, mid: 6000, senior: 9000, expert: 14000 },
  
  // Telecom
  "telecom engineer": { entry: 3800, junior: 6000, mid: 9500, senior: 14500, expert: 22000 },
  "network administrator": { entry: 3200, junior: 5000, mid: 7800, senior: 12000, expert: 18000 },
  
  // Oil & Gas
  "drilling engineer": { entry: 7000, junior: 12000, mid: 18000, senior: 28000, expert: 42000 },
  "geologist": { entry: 4500, junior: 7500, mid: 12000, senior: 18000, expert: 28000 },
  "hse officer": { entry: 3500, junior: 5500, mid: 8500, senior: 13000, expert: 20000 },
  
  // Construction & Real Estate
  "construction manager": { entry: 4500, junior: 7000, mid: 10500, senior: 16000, expert: 24000 },
  "site engineer": { entry: 3200, junior: 5000, mid: 7800, senior: 12000, expert: 18000 },
  "real estate agent": { entry: 2000, junior: 3500, mid: 5500, senior: 8500, expert: 13000 },
  "property manager": { entry: 3000, junior: 4800, mid: 7500, senior: 11000, expert: 17000 },
  
  // Drivers & Logistics
  "driver": { entry: 1500, junior: 2000, mid: 2800, senior: 3800, expert: 5000 },
  "dispatch rider": { entry: 1200, junior: 1600, mid: 2200, senior: 3000, expert: 4000 },
  "warehouse supervisor": { entry: 2500, junior: 3800, mid: 5500, senior: 8000, expert: 12000 },
  
  // Internships (for completeness)
  "intern": { entry: 800, junior: 1200, mid: 1500, senior: 2000, expert: 2500 },
  "graduate trainee": { entry: 1800, junior: 2500, mid: 3500, senior: 4500, expert: 6000 },
  
  // Default for unlisted jobs
  "default": { entry: 2800, junior: 4200, mid: 6500, senior: 10000, expert: 15000 },
};

// Salary validation thresholds - max multipliers from baseline by experience level
const salaryValidationMultipliers: Record<string, number> = {
  entry: 2.0,    // Max 2x the baseline for entry level
  junior: 1.8,   // Max 1.8x the baseline for junior
  mid: 1.6,      // Max 1.6x the baseline for mid-level
  senior: 1.5,   // Max 1.5x the baseline for senior
  expert: 1.4,   // Max 1.4x the baseline for expert
};

// Function to validate if a salary submission is within reasonable range
const isValidSalarySubmission = (
  jobTitle: string,
  yearsExperience: number,
  salary: number,
  location: string
): boolean => {
  const normalizedTitle = jobTitle.toLowerCase().trim();
  const experienceLevel = yearsExperience <= 1 ? "entry" : yearsExperience <= 3 ? "junior" : yearsExperience <= 6 ? "mid" : yearsExperience <= 10 ? "senior" : "expert";
  
  // Find baseline salary for this job
  let baseSalaryData = baselineSalaries["default"];
  for (const [key, values] of Object.entries(baselineSalaries)) {
    if (key === "default") continue;
    if (normalizedTitle.includes(key) || key.includes(normalizedTitle)) {
      baseSalaryData = values;
      break;
    }
  }
  
  const baseSalary = baseSalaryData[experienceLevel];
  const locationMultiplier = locationMultipliers[location] || 1.0;
  const adjustedBaseline = baseSalary * locationMultiplier;
  
  // Get max allowed multiplier for this experience level
  const maxMultiplier = salaryValidationMultipliers[experienceLevel];
  const maxAllowedSalary = adjustedBaseline * maxMultiplier;
  const minAllowedSalary = adjustedBaseline * 0.4; // Minimum 40% of baseline
  
  return salary >= minAllowedSalary && salary <= maxAllowedSalary;
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
  const navigate = useNavigate();
  const { checkRateLimit, recordRequest, formatTimeRemaining } = useSalaryCheckRateLimit();
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
  
  // Waitlist popup state
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false);
  
  // reCAPTCHA state
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  useEffect(() => {
    if (result && !showWaitlistPopup) {
      const timer = setTimeout(() => {
        setShowWaitlistPopup(true);
      }, 12000); // Show after 12 seconds
      return () => clearTimeout(timer);
    }
  }, [result]);

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
        .select("current_salary, expected_salary, years_experience")
        .ilike("job_title", `%${normalizedTitle}%`)
        .eq("location", location)
        .gte("years_experience", years - 2)
        .lte("years_experience", years + 2);

      let dataPoints = 0;
      let crowdsourcedAverage = adjustedSalary;

      if (!error && crowdsourcedData && crowdsourcedData.length > 0) {
        // Filter out outliers using validation logic
        const validSalaries = crowdsourcedData
          .filter((d) => {
            if (!d.current_salary) return false;
            const salary = Number(d.current_salary);
            // Validate salary is within reasonable range for this job/experience
            return isValidSalarySubmission(
              normalizedTitle, 
              d.years_experience, 
              salary, 
              location
            );
          })
          .map((d) => Number(d.current_salary));
        
        dataPoints = validSalaries.length;
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

      recordRequest(); // Track successful request for rate limiting
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

    const salaryAmount = parseFloat(contributeSalary);
    const years = parseInt(yearsExperience);
    
    // Validate the salary submission before storing
    const isValidSubmission = isValidSalarySubmission(
      jobTitle,
      years,
      salaryAmount,
      location
    );

    if (!isValidSubmission) {
      // Still store it but flag it - or show a warning
      toast({
        title: "Unusual Salary",
        description: "Your salary seems outside the typical range for this role. We'll still record it for review.",
        variant: "default",
      });
    }

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
        description: isValidSubmission 
          ? "Your contribution helps others get accurate salary data."
          : "Your data has been recorded for review.",
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
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  placeholder="e.g., New York, London, Accra"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentSalary">Your Current Salary (GH₵/month)</Label>
                <Input
                  id="currentSalary"
                  type="number"
                  min="0"
                  placeholder="Optional - to see if you're underpaid"
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
  );
};

export default SalaryCheck;
