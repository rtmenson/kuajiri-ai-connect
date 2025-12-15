import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Copy, Download, Share2, Sparkles, ArrowLeft, Clock, Upload, Palette, X, User } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

const JobPostGenerator = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [req1, setReq1] = useState("");
  const [req2, setReq2] = useState("");
  const [req3, setReq3] = useState("");
  const [brandColor, setBrandColor] = useState("#2563eb");
  const [logo, setLogo] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [currency, setCurrency] = useState("GHC");
  const [shortDescription, setShortDescription] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [account, setAccount] = useState<JobPosterAccount | null>(null);
  const [accountForm, setAccountForm] = useState({ fullName: "", email: "", phone: "" });
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const rgb = hexToRgb(brandColor);

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

  const handleGenerate = async () => {
    if (!jobTitle || !salaryMin || !salaryMax || !req1 || !req2 || !req3) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-job-post", {
        body: {
          jobTitle,
          salaryMin: parseInt(salaryMin),
          salaryMax: parseInt(salaryMax),
          requirements: [req1, req2, req3],
          brandColor,
          companyName: companyName || "Your Company",
          hasLogo: !!logo,
          currency,
          shortDescription,
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
    if (!account) {
      setShowAccountModal(true);
    } else {
      downloadImage();
    }
  };

  const handleCreateAccount = async () => {
    if (!accountForm.fullName || !accountForm.email || !accountForm.phone) {
      toast.error("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(accountForm.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsCreatingAccount(true);
    try {
      const { error } = await supabase.from("waitlist_submissions").insert({
        full_name: accountForm.fullName,
        email: accountForm.email,
        phone: accountForm.phone,
        user_type: "job_poster",
      });

      if (error) throw error;

      setAccount(accountForm);
      setShowAccountModal(false);
      toast.success("Account created! You can now download your job post.");
      downloadImage();
    } catch (error: any) {
      console.error("Account creation error:", error);
      if (error.message?.includes("duplicate")) {
        // User already exists, allow download
        setAccount(accountForm);
        setShowAccountModal(false);
        toast.success("Welcome back! Downloading your job post...");
        downloadImage();
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    } finally {
      setIsCreatingAccount(false);
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Job Details
              </CardTitle>
              <CardDescription>Fill in the basics and we'll handle the rest</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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

                {/* Brand Color */}
                <div className="space-y-2">
                  <Label>Brand Color</Label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {PRESET_COLORS.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setBrandColor(color.value)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${
                          brandColor === color.value
                            ? "border-gray-900 scale-110"
                            : "border-transparent hover:scale-105"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                    <div className="relative">
                      <input
                        type="color"
                        value={brandColor}
                        onChange={(e) => setBrandColor(e.target.value)}
                        className="w-8 h-8 rounded-full cursor-pointer border-2 border-gray-200"
                      />
                    </div>
                  </div>
                  {/* Color Value Display */}
                  <div className="flex items-center gap-3 p-2 bg-white rounded-lg border text-sm">
                    <div
                      className="w-6 h-6 rounded border"
                      style={{ backgroundColor: brandColor }}
                    />
                    <div className="flex-1 grid grid-cols-2 gap-2 text-xs">
                      <div className="font-mono">
                        <span className="text-gray-500">HEX:</span> {brandColor.toUpperCase()}
                      </div>
                      {rgb && (
                        <div className="font-mono">
                          <span className="text-gray-500">RGB:</span> {rgb.r}, {rgb.g}, {rgb.b}
                        </div>
                      )}
                    </div>
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
                  <Label htmlFor="salaryMin">Min Salary ({selectedCurrency?.symbol}) *</Label>
                  <Input
                    id="salaryMin"
                    type="number"
                    placeholder="3,000"
                    value={salaryMin}
                    onChange={(e) => setSalaryMin(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="salaryMax">Max Salary ({selectedCurrency?.symbol}) *</Label>
                  <Input
                    id="salaryMax"
                    type="number"
                    placeholder="5,000"
                    value={salaryMax}
                    onChange={(e) => setSalaryMax(e.target.value)}
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

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Magic...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Job Post
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Content */}
          <div className="space-y-6">
            {generatedContent ? (
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
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
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
                        X
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

                {/* Social Caption */}
                <Card className="shadow-lg border-0 bg-white">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      Social Caption
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(generatedContent.socialCaption, "Caption")}
                      >
                        <Copy className="w-4 h-4 mr-1" />
                        Copy
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{generatedContent.socialCaption}</p>
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

      {/* Account Creation Modal */}
      <Dialog open={showAccountModal} onOpenChange={setShowAccountModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-blue-600" />
              Create Job Poster Account
            </DialogTitle>
            <DialogDescription>
              Create a free account to download your job post and access more features.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                placeholder="e.g. Kwame Asante"
                value={accountForm.fullName}
                onChange={(e) => setAccountForm({ ...accountForm, fullName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                placeholder="e.g. kwame.asante@company.com"
                value={accountForm.email}
                onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                placeholder="e.g. +233 24 123 4567"
                value={accountForm.phone}
                onChange={(e) => setAccountForm({ ...accountForm, phone: e.target.value })}
              />
            </div>
            <Button
              onClick={handleCreateAccount}
              disabled={isCreatingAccount}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              {isCreatingAccount ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account & Download"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobPostGenerator;
