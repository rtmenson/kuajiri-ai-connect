import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Copy, Download, Share2, Sparkles, Clock, Upload, Palette, X, User, ArrowRight, ArrowLeft, Briefcase, Wand2, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GeneratedContent {
  description: string;
  oneLiner: string;
  socialCaption: string;
  imageUrl: string | null;
  jobTitle: string;
  salaryMin: number;
  salaryMax: number;
  requirements: string[];
}

interface JobPosterAccount {
  fullName: string;
  email: string;
  phone: string;
}

const PRESET_COLORS = [
  { name: "Blue", value: "#2563eb" },
  { name: "Purple", value: "#7c3aed" },
  { name: "Green", value: "#16a34a" },
  { name: "Red", value: "#dc2626" },
  { name: "Orange", value: "#ea580c" },
  { name: "Teal", value: "#0d9488" },
  { name: "Pink", value: "#db2777" },
  { name: "Indigo", value: "#4f46e5" },
];

const CURRENCIES = [
  { code: "GHC", symbol: "GH₵", name: "Ghana Cedi" },
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "CFA", symbol: "CFA", name: "CFA Franc" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
];

const LOADING_MESSAGES = [
  { text: "Analyzing job requirements...", emoji: "🔍" },
  { text: "Crafting compelling copy...", emoji: "✍️" },
  { text: "Adding a sprinkle of creativity...", emoji: "✨" },
  { text: "Making it Ghana-ready...", emoji: "🇬🇭" },
  { text: "Designing eye-catching graphics...", emoji: "🎨" },
  { text: "Optimizing for social media...", emoji: "📱" },
  { text: "Adding the perfect hashtags...", emoji: "#️⃣" },
  { text: "Almost there, polishing the final touches...", emoji: "💎" },
];

// Helper functions for color conversion
const hexToRgb = (hex: string): { r: number; g: number; b: number } | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
};

const COUNTRY_CODES = [
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
  { code: "+1", country: "USA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+225", country: "Ivory Coast", flag: "🇨🇮" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
];

// Image content options
const IMAGE_CONTENT_OPTIONS = [
  { id: "jobTitle", label: "Job Title", required: true },
  { id: "companyName", label: "Company Name", required: false },
  { id: "salary", label: "Salary Range", required: false },
  { id: "requirements", label: "Key Requirements", required: false },
  { id: "applyMethod", label: "How to Apply", required: false },
  { id: "hiringBadge", label: '"We\'re Hiring" Badge', required: false },
];

const JobPostGenerator = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+233");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [req1, setReq1] = useState("");
  const [req2, setReq2] = useState("");
  const [req3, setReq3] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#2563eb");
  const [secondaryColor, setSecondaryColor] = useState<string | null>(null);
  const [logo, setLogo] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [currency, setCurrency] = useState("GHC");
  const [shortDescription, setShortDescription] = useState("");
  const [applyMethods, setApplyMethods] = useState<("email" | "url" | "phone")[]>(["email"]);
  const [applyValues, setApplyValues] = useState<{ email: string; url: string; phone: string }>({ email: "", url: "", phone: "" });
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [account, setAccount] = useState<JobPosterAccount | null>(null);
  const [imageContentOptions, setImageContentOptions] = useState<string[]>(["jobTitle", "companyName", "salary", "hiringBadge"]);
  const [showWaitlistPopup, setShowWaitlistPopup] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Show waitlist popup after content is generated
  useEffect(() => {
    if (generatedContent && !showWaitlistPopup) {
      const timer = setTimeout(() => {
        setShowWaitlistPopup(true);
      }, 12000); // Show after 12 seconds
      return () => clearTimeout(timer);
    }
  }, [generatedContent]);

  const rgb = hexToRgb(primaryColor);

  const toggleImageOption = (optionId: string) => {
    const option = IMAGE_CONTENT_OPTIONS.find(o => o.id === optionId);
    if (option?.required) return; // Can't toggle required options
    
    setImageContentOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    );
  };

  const handleSecondaryColorClick = (color: string) => {
    if (secondaryColor === color) {
      setSecondaryColor(null); // Deselect if clicking same color
    } else if (color !== primaryColor) {
      setSecondaryColor(color);
    }
  };

  // Cycle through loading messages
  useEffect(() => {
    if (!isGenerating) return;
    
    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [isGenerating]);

  // Pre-populate Call/WhatsApp field when phone method is selected
  useEffect(() => {
    if (applyMethods.includes("phone") && phoneNumber && !applyValues.phone) {
      setApplyValues(prev => ({ ...prev, phone: `${countryCode}${phoneNumber}` }));
    }
  }, [applyMethods, phoneNumber, countryCode]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Logo must be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setLogo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateStep1 = () => {
    if (!jobTitle || !req1 || !req2 || !req3) {
      toast.error("Please fill in job title and all 3 requirements");
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleGenerate = async () => {
    if (!fullName || !email || !phoneNumber) {
      toast.error("Please fill in all required fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      toast.error("Please complete the reCAPTCHA verification");
      return;
    }

    try {
      const { data: verifyData, error: verifyError } = await supabase.functions.invoke("verify-recaptcha", {
        body: { token: recaptchaToken },
      });

      if (verifyError || !verifyData?.success) {
        toast.error("reCAPTCHA verification failed. Please try again.");
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
        return;
      }
    } catch (error) {
      toast.error("Failed to verify reCAPTCHA. Please try again.");
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
      return;
    }

    // Save job poster information to database
    const fullPhone = `${countryCode}${phoneNumber}`;
    try {
      const { error: insertError } = await supabase.from("job_posters").insert({
        full_name: fullName,
        email: email,
        phone: fullPhone,
      });
      
      if (insertError && !insertError.message?.includes("duplicate")) {
        console.error("Account creation error:", insertError);
      }
      setAccount({ fullName, email, phone: fullPhone });
    } catch (error: any) {
      console.error("Account creation error:", error);
      setAccount({ fullName, email, phone: fullPhone });
    }

    setIsGenerating(true);
    setLoadingMessageIndex(0);
    try {
      const { data, error } = await supabase.functions.invoke("generate-job-post", {
        body: {
          jobTitle,
          salaryMin: salaryMin ? parseInt(salaryMin) : null,
          salaryMax: salaryMax ? parseInt(salaryMax) : null,
          requirements: [req1, req2, req3],
          primaryColor,
          secondaryColor,
          companyName: companyName || "Your Company",
          hasLogo: !!logo,
          currency,
          shortDescription,
          applyMethods,
          applyValues,
          imageContentOptions,
        },
      });

      if (error) throw error;
      
      setGeneratedContent(data);
      toast.success("Job post generated!");
    } catch (error: any) {
      console.error("Generation error:", error);
      toast.error(error.message || "Failed to generate job post");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard!`);
  };

  const handleDownloadClick = () => {
    downloadImage();
  };

  const downloadImage = () => {
    if (generatedContent?.imageUrl) {
      const link = document.createElement("a");
      link.href = generatedContent.imageUrl;
      link.download = `${generatedContent.jobTitle.replace(/\s+/g, "-")}-hiring-post.png`;
      link.click();
      toast.success("Image downloaded!");
    }
  };

  const shareToSocial = (platform: string) => {
    const text = encodeURIComponent(generatedContent?.socialCaption || "");
    const url = encodeURIComponent(window.location.href);
    
    const shareUrls: Record<string, string> = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      instagram: "",
    };

    if (platform === "instagram") {
      copyToClipboard(generatedContent?.socialCaption || "", "Caption");
      toast.info("Caption copied! Open Instagram and paste it with your downloaded image.");
      return;
    }

    window.open(shareUrls[platform], "_blank", "width=600,height=400");
  };

  const selectedCurrency = CURRENCIES.find(c => c.code === currency);

  const currentLoadingMessage = LOADING_MESSAGES[loadingMessageIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kuajiri AI
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-sm font-medium mb-4 border border-blue-200/50">
            <Clock className="w-4 h-4" />
            60 seconds to create. 61 seconds to post everywhere.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Job Post Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your job details and let Kuajiri AI create a professional description, 
            eye-catching graphic, and viral social media copy.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              step === 1 ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "bg-gray-100 text-gray-500"
            }`}>
              <Briefcase className="w-4 h-4" />
              <span className="font-medium text-sm">Job Details</span>
            </div>
            <div className="w-8 h-0.5 bg-gray-200" />
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              step === 2 ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : "bg-gray-100 text-gray-500"
            }`}>
              <User className="w-4 h-4" />
              <span className="font-medium text-sm">Your Info</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {step === 1 ? (
                  <>
                    <Briefcase className="w-5 h-5 text-blue-600" />
                    Job Details
                  </>
                ) : (
                  <>
                    <User className="w-5 h-5 text-blue-600" />
                    Your Information
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {step === 1 ? "Tell us about the role and your brand" : "Almost there! Just need your details"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 ? (
                <>
                  {/* Brand Customization */}
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Palette className="w-4 h-4 text-purple-600" />
                      Brand Customization
                    </h3>
                    
                    {/* Company Name */}
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name (Optional)</Label>
                      <Input
                        id="companyName"
                        placeholder="e.g. Shell Ghana Ltd"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="h-10 bg-white"
                      />
                    </div>

                    {/* Logo Upload */}
                    <div className="space-y-2">
                      <Label>Company Logo (Optional)</Label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      {logo ? (
                        <div className="flex items-center gap-3 p-3 bg-white rounded-lg border">
                          <img src={logo} alt="Logo" className="w-12 h-12 object-contain rounded" />
                          <span className="text-sm text-gray-600 flex-1">Logo uploaded</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={removeLogo}
                            className="text-gray-500 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          className="w-full h-10 bg-white"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Upload Logo
                        </Button>
                      )}
                    </div>

                    {/* Brand Colors */}
                    <div className="space-y-3">
                      <Label>Brand Colors (Select 1-2)</Label>
                      
                      {/* Primary Color */}
                      <div className="space-y-2">
                        <span className="text-xs text-gray-500 font-medium">Primary Color *</span>
                        <div className="flex flex-wrap gap-2">
                          {PRESET_COLORS.map((color) => (
                            <button
                              key={color.value}
                              onClick={() => {
                                setPrimaryColor(color.value);
                                if (secondaryColor === color.value) setSecondaryColor(null);
                              }}
                              className={`w-8 h-8 rounded-full border-2 transition-all ${
                                primaryColor === color.value
                                  ? "border-gray-900 scale-110 ring-2 ring-offset-2 ring-gray-400"
                                  : "border-transparent hover:scale-105"
                              }`}
                              style={{ backgroundColor: color.value }}
                              title={color.name}
                            />
                          ))}
                          <div className="relative">
                            <input
                              type="color"
                              value={primaryColor}
                              onChange={(e) => {
                                setPrimaryColor(e.target.value);
                                if (secondaryColor === e.target.value) setSecondaryColor(null);
                              }}
                              className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Secondary Color */}
                      <div className="space-y-2">
                        <span className="text-xs text-gray-500 font-medium">Accent Color (Optional)</span>
                        <div className="flex flex-wrap gap-2">
                          {PRESET_COLORS.filter(c => c.value !== primaryColor).map((color) => (
                            <button
                              key={color.value}
                              onClick={() => handleSecondaryColorClick(color.value)}
                              className={`w-7 h-7 rounded-full border-2 transition-all ${
                                secondaryColor === color.value
                                  ? "border-gray-900 scale-110 ring-2 ring-offset-1 ring-gray-400"
                                  : "border-transparent hover:scale-105 opacity-70 hover:opacity-100"
                              }`}
                              style={{ backgroundColor: color.value }}
                              title={color.name}
                            />
                          ))}
                          {secondaryColor && (
                            <button
                              onClick={() => setSecondaryColor(null)}
                              className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-gray-400 hover:text-gray-500"
                              title="Remove accent color"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Color Value Display */}
                      <div className="flex items-center gap-2 p-2 bg-white rounded-lg border text-sm">
                        <div
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: primaryColor }}
                        />
                        {secondaryColor && (
                          <div
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: secondaryColor }}
                          />
                        )}
                        <div className="flex-1 text-xs font-mono">
                          <span className="text-gray-500">Primary:</span> {primaryColor.toUpperCase()}
                          {secondaryColor && (
                            <span className="ml-2"><span className="text-gray-500">Accent:</span> {secondaryColor.toUpperCase()}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Image Content Options */}
                    <div className="space-y-2">
                      <Label>What to show on the image</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {IMAGE_CONTENT_OPTIONS.map((option) => (
                          <button
                            key={option.id}
                            onClick={() => toggleImageOption(option.id)}
                            disabled={option.required}
                            className={`p-2 rounded-lg border text-left text-sm transition-all ${
                              imageContentOptions.includes(option.id)
                                ? "bg-blue-50 border-blue-300 text-blue-700"
                                : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
                            } ${option.required ? "opacity-75 cursor-not-allowed" : "cursor-pointer"}`}
                          >
                            <span className="flex items-center gap-2">
                              <span className={`w-4 h-4 rounded border flex items-center justify-center ${
                                imageContentOptions.includes(option.id)
                                  ? "bg-blue-500 border-blue-500 text-white"
                                  : "border-gray-300"
                              }`}>
                                {imageContentOptions.includes(option.id) && "✓"}
                              </span>
                              {option.label}
                              {option.required && <span className="text-xs text-gray-400">(required)</span>}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input
                      id="jobTitle"
                      placeholder="e.g. Senior Software Engineer"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  {/* Short Description */}
                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">Short Description (Optional)</Label>
                    <Textarea
                      id="shortDescription"
                      placeholder="Brief overview of the role..."
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      className="resize-none"
                      rows={2}
                    />
                  </div>

                  {/* Currency Selector */}
                  <div className="space-y-2">
                    <Label>Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className="h-11">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCIES.map((curr) => (
                          <SelectItem key={curr.code} value={curr.code}>
                            {curr.symbol} - {curr.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="salaryMin">Min Salary ({selectedCurrency?.symbol})</Label>
                      <Input
                        id="salaryMin"
                        type="number"
                        min="0"
                        placeholder="3,000"
                        value={salaryMin}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || parseFloat(value) >= 0) {
                            setSalaryMin(value);
                          }
                        }}
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="salaryMax">Max Salary ({selectedCurrency?.symbol})</Label>
                      <Input
                        id="salaryMax"
                        type="number"
                        min="0"
                        placeholder="5,000"
                        value={salaryMax}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === '' || parseFloat(value) >= 0) {
                            setSalaryMax(value);
                          }
                        }}
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>3 Key Requirements *</Label>
                    <Input
                      placeholder="1. e.g. 3+ years of experience in React"
                      value={req1}
                      onChange={(e) => setReq1(e.target.value)}
                      className="h-11"
                    />
                    <Input
                      placeholder="2. e.g. Strong communication skills"
                      value={req2}
                      onChange={(e) => setReq2(e.target.value)}
                      className="h-11"
                    />
                    <Input
                      placeholder="3. e.g. Bachelor's degree in Computer Science"
                      value={req3}
                      onChange={(e) => setReq3(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  {/* How to Apply */}
                  <div className="space-y-3">
                    <Label>How to Apply (Select one or more)</Label>
                    <div className="space-y-3">
                      {/* Email Option */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={applyMethods.includes("email")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setApplyMethods(prev => [...prev, "email"]);
                              } else {
                                setApplyMethods(prev => prev.filter(m => m !== "email"));
                              }
                            }}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm">Email CV to</span>
                        </label>
                        {applyMethods.includes("email") && (
                          <Input
                            placeholder="careers@company.com"
                            value={applyValues.email}
                            onChange={(e) => setApplyValues(prev => ({ ...prev, email: e.target.value }))}
                            type="email"
                            className="h-10 ml-6"
                          />
                        )}
                      </div>

                      {/* URL Option */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={applyMethods.includes("url")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setApplyMethods(prev => [...prev, "url"]);
                              } else {
                                setApplyMethods(prev => prev.filter(m => m !== "url"));
                              }
                            }}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm">Apply at URL</span>
                        </label>
                        {applyMethods.includes("url") && (
                          <Input
                            placeholder="https://company.com/careers"
                            value={applyValues.url}
                            onChange={(e) => setApplyValues(prev => ({ ...prev, url: e.target.value }))}
                            type="url"
                            className="h-10 ml-6"
                          />
                        )}
                      </div>

                      {/* Phone Option */}
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={applyMethods.includes("phone")}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setApplyMethods(prev => [...prev, "phone"]);
                              } else {
                                setApplyMethods(prev => prev.filter(m => m !== "phone"));
                              }
                            }}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-sm">Call/WhatsApp</span>
                        </label>
                        {applyMethods.includes("phone") && (
                          <Input
                            placeholder="+233 XX XXX XXXX"
                            value={applyValues.phone}
                            onChange={(e) => setApplyValues(prev => ({ ...prev, phone: e.target.value }))}
                            type="tel"
                            className="h-10 ml-6"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleNextStep}
                    className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    size="lg"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </>
              ) : (
                <>
                  {/* Contact Information - Step 2 */}
                  <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-blue-50 border border-green-100 space-y-4">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <User className="w-4 h-4 text-green-600" />
                      Your Information
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        placeholder="e.g. Kwame Asante"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="h-10 bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="e.g. kwame@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-10 bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="flex gap-2">
                        <Select value={countryCode} onValueChange={setCountryCode}>
                          <SelectTrigger className="w-[130px] h-10 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {COUNTRY_CODES.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.flag} {country.code}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="244 123 456"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="h-10 bg-white flex-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="p-4 rounded-lg bg-gray-50 border space-y-2">
                    <h4 className="font-medium text-gray-700 text-sm">Job Summary</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p><span className="text-gray-500">Title:</span> {jobTitle}</p>
                      {companyName && <p><span className="text-gray-500">Company:</span> {companyName}</p>}
                      {salaryMin && salaryMax && (
                        <p><span className="text-gray-500">Salary:</span> {selectedCurrency?.symbol}{salaryMin} - {selectedCurrency?.symbol}{salaryMax}</p>
                      )}
                    </div>
                  </div>

                  {/* reCAPTCHA */}
                  <div className="flex justify-center">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={(token) => setRecaptchaToken(token)}
                      onExpired={() => setRecaptchaToken(null)}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => setStep(1)}
                      variant="outline"
                      className="flex-1 h-12"
                      size="lg"
                    >
                      <ArrowLeft className="w-5 h-5 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleGenerate}
                      disabled={isGenerating || !recaptchaToken}
                      className="flex-1 h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      size="lg"
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-5 h-5 mr-2" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Generated Content / Loader */}
          <div className="space-y-6">
            {isGenerating ? (
              /* Fun Animated Loader */
              <Card className="shadow-lg h-full min-h-[400px] flex items-center justify-center border-0 bg-white overflow-hidden">
                <CardContent className="text-center py-12 px-8 relative">
                  {/* Animated Background Circles */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-100 rounded-full opacity-50 animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-100 rounded-full opacity-50 animate-pulse" style={{ animationDelay: "0.5s" }} />
                    <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-green-100 rounded-full opacity-50 animate-pulse" style={{ animationDelay: "1s" }} />
                  </div>
                  
                  {/* Main Loader */}
                  <div className="relative z-10">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6 animate-pulse">
                      <span className="text-4xl">{currentLoadingMessage.emoji}</span>
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      Creating Magic
                    </h3>
                    
                    <p className="text-gray-600 mb-6 min-h-[24px] transition-all duration-300">
                      {currentLoadingMessage.text}
                    </p>
                    
                    {/* Progress Dots */}
                    <div className="flex justify-center gap-2 mb-4">
                      {LOADING_MESSAGES.slice(0, 5).map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i <= loadingMessageIndex % 5
                              ? "bg-gradient-to-r from-blue-600 to-purple-600"
                              : "bg-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    
                    <p className="text-sm text-gray-400">
                      This usually takes 15-30 seconds
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : generatedContent ? (
              <>
                {/* Social Graphic */}
                {generatedContent.imageUrl && (
                  <Card className="shadow-lg overflow-hidden border-0">
                    <CardHeader className="pb-3 bg-white">
                      <CardTitle className="text-lg flex items-center justify-between">
                        Social Media Graphic
                        <Button size="sm" variant="outline" onClick={handleDownloadClick}>
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <img
                        src={generatedContent.imageUrl}
                        alt="Generated job post graphic"
                        className="w-full aspect-square object-cover"
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Share Buttons */}
                <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-purple-600">
                  <CardContent className="py-4">
                    <p className="text-white text-sm font-medium mb-3 text-center">Share to Social Media</p>
                    <div className="flex justify-center gap-3">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => shareToSocial("linkedin")}
                        className="bg-white/20 hover:bg-white/30 text-white border-0"
                      >
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => shareToSocial("twitter")}
                        className="bg-white/20 hover:bg-white/30 text-white border-0"
                      >
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                        X/Twitter
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => shareToSocial("facebook")}
                        className="bg-white/20 hover:bg-white/30 text-white border-0"
                      >
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                        </svg>
                        Facebook
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => shareToSocial("instagram")}
                        className="bg-white/20 hover:bg-white/30 text-white border-0"
                      >
                        <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        Instagram
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* One-liner */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      Witty One-liner
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(generatedContent.oneLiner, "One-liner")}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-medium">{generatedContent.oneLiner}</p>
                  </CardContent>
                </Card>

                {/* Social Post Preview */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      Social Post Preview
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(generatedContent.socialCaption, "Caption")}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy Caption
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Preview Card - mimics social media post */}
                    <div className="border rounded-lg overflow-hidden bg-gray-50">
                      {/* Post Header */}
                      <div className="p-3 flex items-center gap-3 bg-white border-b">
                        {logo ? (
                          <img src={logo} alt="Company logo" className="w-10 h-10 rounded-full object-cover" />
                        ) : (
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                            style={{ backgroundColor: primaryColor }}
                          >
                            {companyName ? companyName.charAt(0).toUpperCase() : "C"}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-sm">{companyName || "Your Company"}</p>
                          <p className="text-xs text-gray-500">Just now • 🌍</p>
                        </div>
                      </div>
                      
                      {/* Post Caption */}
                      <div className="p-3 bg-white">
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{generatedContent.socialCaption}</p>
                      </div>
                      
                      {/* Post Image */}
                      {generatedContent.imageUrl && (
                        <img
                          src={generatedContent.imageUrl}
                          alt="Job post graphic"
                          className="w-full aspect-square object-cover"
                        />
                      )}
                      
                      {/* Post Actions - decorative */}
                      <div className="p-3 flex items-center gap-6 bg-white border-t text-gray-500">
                        <span className="text-xs flex items-center gap-1">👍 Like</span>
                        <span className="text-xs flex items-center gap-1">💬 Comment</span>
                        <span className="text-xs flex items-center gap-1">🔄 Share</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Full Description */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      Full Job Description
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(generatedContent.description, "Description")}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={generatedContent.description}
                      readOnly
                      className="min-h-[200px] resize-none"
                    />
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="shadow-lg h-full min-h-[400px] flex items-center justify-center border-0 bg-white">
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ready to Generate</h3>
                  <p className="text-gray-500 max-w-sm">
                    Fill in your job details on the left and click generate to create your professional job post.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p>Powered by <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Kuajiri AI</span> • Create professional job posts in seconds</p>
        </footer>
      </main>

      {/* Waitlist Popup for Job Posters */}
      <Dialog open={showWaitlistPopup} onOpenChange={setShowWaitlistPopup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">
              Supercharge Your Hiring with Kuajiri AI
            </DialogTitle>
            <DialogDescription className="text-center">
              Join our waitlist to access AI-powered recruitment tools that help you find the best candidates faster.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>AI-powered candidate matching</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Automated job post distribution</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Smart applicant screening</span>
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

export default JobPostGenerator;
