import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Zap, MessageCircle, Mail, Send, ChevronDown } from "lucide-react";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const WAITLIST_URL = "https://kuajiriapp.com";

const COUNTRY_CODES = [
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
  { code: "+1", country: "USA", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+86", country: "China", flag: "🇨🇳" },
];

const baseSchema = {
  userType: z.enum(["jobseeker", "jobposter"], {
    required_error: "Please select your user type",
  }),
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().min(5, "Please enter a valid phone number").max(20),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  companyName: z.string().optional(),
};

const waitlistSchema = z.object(baseSchema).refine(
  (data) => {
    if (data.userType === "jobposter") {
      return data.companyName && data.companyName.trim().length >= 2;
    }
    return true;
  },
  {
    message: "Company name must be at least 2 characters",
    path: ["companyName"],
  }
);

type WaitlistFormData = z.infer<typeof waitlistSchema>;

const Waitlist = () => {
  const [searchParams] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAlreadyOnList, setIsAlreadyOnList] = useState(false);
  const [formData, setFormData] = useState<WaitlistFormData | null>(null);
  const [sharePhone, setSharePhone] = useState("");
  const [shareEmail, setShareEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+233");
  const [shareCountryCode, setShareCountryCode] = useState("+233");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { toast } = useToast();

  // Pre-select user type from URL query param
  const defaultUserType = searchParams.get("type") === "jobposter" ? "jobposter" : undefined;

  // Detect country from IP
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const countryMapping: Record<string, string> = {
          'GH': '+233',
          'US': '+1',
          'GB': '+44',
          'NG': '+234',
          'ZA': '+27',
          'KE': '+254',
          'DE': '+49',
          'FR': '+33',
          'IN': '+91',
          'CN': '+86',
        };
        
        const detectedCode = countryMapping[data.country_code] || '+1';
        setCountryCode(detectedCode);
        setShareCountryCode(detectedCode);
      } catch (error) {
        console.log('Could not detect country:', error);
      }
    };

    detectCountry();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      phone: "",
      companyName: "",
      userType: defaultUserType,
    },
  });

  const userType = watch("userType");

  // Update the phone field when country code or phone number changes
  useEffect(() => {
    setValue("phone", `${countryCode}${phoneNumber}`);
  }, [countryCode, phoneNumber, setValue]);

  const invitationMessage = `Hi, I just signed up for Kuajiri AI. It's a job platform that uses AI to match job seekers with job opportunities. You can join here: ${WAITLIST_URL}`;
  const emailSubject = "Join Kuajiri AI - AI-Powered Job Matching";

  const handleShareWhatsApp = () => {
    if (!sharePhone.trim()) {
      toast({ title: "Please enter a phone number", variant: "destructive" });
      return;
    }
    const url = `https://api.whatsapp.com/send/?text=${encodeURIComponent(invitationMessage)}`;
    window.open(url, "_blank");
  };

  const handleShareSMS = () => {
    if (!sharePhone.trim()) {
      toast({ title: "Please enter a phone number", variant: "destructive" });
      return;
    }
    const fullPhone = `${shareCountryCode}${sharePhone}`;
    const url = `sms:${fullPhone}?body=${encodeURIComponent(invitationMessage)}`;
    window.open(url, "_blank");
  };

  const handleShareEmail = (client: 'default' | 'gmail' | 'outlook' | 'yahoo') => {
    if (!shareEmail.trim()) {
      toast({ title: "Please enter an email address", variant: "destructive" });
      return;
    }
    
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(invitationMessage);
    
    let url = '';
    switch (client) {
      case 'gmail':
        url = `https://mail.google.com/mail/?view=cm&to=${shareEmail}&su=${subject}&body=${body}`;
        break;
      case 'outlook':
        url = `https://outlook.live.com/mail/0/deeplink/compose?to=${shareEmail}&subject=${subject}&body=${body}`;
        break;
      case 'yahoo':
        url = `https://compose.mail.yahoo.com/?to=${shareEmail}&subject=${subject}&body=${body}`;
        break;
      default:
        url = `mailto:${shareEmail}?subject=${subject}&body=${body}`;
    }
    window.open(url, "_blank");
  };

  const onSubmit = async (data: WaitlistFormData) => {
    try {
      // Check if email already exists
      const { data: existingEntry } = await supabase
        .from("waitlist_submissions")
        .select("email, full_name")
        .eq("email", data.email)
        .maybeSingle();

      if (existingEntry) {
        // User already on the list - show friendly message
        setFormData({ ...data, fullName: existingEntry.full_name });
        setIsAlreadyOnList(true);
        setIsSubmitted(true);
        reset();
        return;
      }

      const { error } = await supabase
        .from("waitlist_submissions")
        .insert({
          user_type: data.userType,
          full_name: data.fullName,
          phone: data.phone,
          email: data.email,
        });

      if (error) throw error;

      setFormData(data);
      setIsAlreadyOnList(false);
      setIsSubmitted(true);
      reset();
      
      toast({
        title: "Success!",
        description: "You've been added to the waitlist.",
      });
    } catch (error) {
      console.error("Error submitting to waitlist:", error);
      toast({
        title: "Error",
        description: "Failed to join waitlist. Please try again.",
        variant: "destructive",
      });
    }
  };

  const selectedCountry = COUNTRY_CODES.find(c => c.code === countryCode) || COUNTRY_CODES[0];
  const selectedShareCountry = COUNTRY_CODES.find(c => c.code === shareCountryCode) || COUNTRY_CODES[0];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      {/* Banner */}
      <div className="w-full py-3 px-4 border-b border-border/50" style={{ backgroundColor: '#111827' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-xs md:text-sm font-normal text-center text-gray-300">
            Coming Soon. Sign Up To Be The First To Know.
          </p>
        </div>
      </div>
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="inline-flex items-center px-6 py-3 bg-blue-100/80 text-blue-800 rounded-full text-sm font-medium backdrop-blur-sm border border-blue-200/50">
                <Zap className="h-4 w-4 mr-2" />
                AI-Powered Matching
              </span>
              
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Perfect Matches.</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Every Time.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Our advanced AI proactively connects job seekers with their ideal opportunities and helps employers find the perfect candidates. Experience the future of recruitment today.
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            {!isSubmitted ? (
            <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 space-y-8 animate-fade-in">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <Zap className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Join the Waitlist
                  </h1>
                </div>
                <p className="text-muted-foreground">
                  Be the first to know when we launch
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">I am a</Label>
                  <RadioGroup
                    value={userType}
                    onValueChange={(value) => setValue("userType", value as "jobseeker" | "jobposter")}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div>
                      <RadioGroupItem
                        value="jobseeker"
                        id="jobseeker"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="jobseeker"
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                      >
                        <span className="text-sm font-medium">Job Seeker</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem
                        value="jobposter"
                        id="jobposter"
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor="jobposter"
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-background p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                      >
                        <span className="text-sm font-medium">Job Poster</span>
                      </Label>
                    </div>
                  </RadioGroup>
                  {errors.userType && (
                    <p className="text-sm text-destructive">{errors.userType.message}</p>
                  )}
                </div>

                {userType === "jobposter" && (
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      {...register("companyName")}
                      placeholder="Shell Ghana Ltd"
                      className="h-11"
                    />
                    {errors.companyName && (
                      <p className="text-sm text-destructive">{errors.companyName.message}</p>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    placeholder="Kojo Nti"
                    className="h-11"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {userType === "jobposter" ? "Company Phone Number" : "Phone Number"}
                  </Label>
                  <div className="flex gap-2">
                    <Select value={countryCode} onValueChange={setCountryCode}>
                      <SelectTrigger className="w-[120px] h-11">
                        <SelectValue>
                          <span className="flex items-center gap-1">
                            <span>{selectedCountry.flag}</span>
                            <span className="text-sm">{selectedCountry.code}</span>
                          </span>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="bg-background border border-border z-50">
                        {COUNTRY_CODES.map((country) => (
                          <SelectItem key={country.code} value={country.code}>
                            <span className="flex items-center gap-2">
                              <span>{country.flag}</span>
                              <span>{country.code}</span>
                              <span className="text-muted-foreground text-xs">{country.country}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      id="phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="XX XXX XXXX"
                      className="h-11 flex-1"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    {userType === "jobposter" ? "Company Email Address" : "Email Address"}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder={userType === "jobposter" ? "hr@company.com" : "kojo.nti@example.com"}
                    className="h-11"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Joining..." : "Join Waitlist"}
                </Button>
              </form>
            </div>
          ) : (
            <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 text-center space-y-6 animate-scale-in">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-500/10 p-3">
                  <CheckCircle2 className="w-16 h-16 text-green-500" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">
                  {isAlreadyOnList ? "Great news! You're already on the list! 🎉" : "You're on the list!"}
                </h2>
                <p className="text-muted-foreground">
                  {isAlreadyOnList 
                    ? `Hey ${formData?.fullName}, we already have you on our waitlist!` 
                    : `Thank you for joining our waitlist, ${formData?.fullName}!`}
                </p>
                <p className="text-sm text-muted-foreground">
                  We'll contact you at <span className="font-medium text-foreground">{formData?.email}</span> as soon as the beta is released.
                </p>
              </div>

              {/* Share Section */}
              <div className="border-t border-border pt-6 space-y-4">
                <p className="text-sm font-medium text-foreground">Share Kuajiri AI with a friend</p>
                
                <div className="space-y-4">
                  {/* Phone sharing */}
                  <div className="space-y-3">
                    <Label className="text-xs text-muted-foreground">Share via WhatsApp or SMS</Label>
                    <div className="flex gap-2">
                      <Select value={shareCountryCode} onValueChange={setShareCountryCode}>
                        <SelectTrigger className="w-[110px] h-10 flex-shrink-0">
                          <SelectValue>
                            <span className="flex items-center gap-1">
                              <span>{selectedShareCountry.flag}</span>
                              <span className="text-xs">{selectedShareCountry.code}</span>
                            </span>
                          </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-border z-50">
                          {COUNTRY_CODES.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              <span className="flex items-center gap-2">
                                <span>{country.flag}</span>
                                <span>{country.code}</span>
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input
                        value={sharePhone}
                        onChange={(e) => setSharePhone(e.target.value)}
                        placeholder="Phone number"
                        className="h-10 flex-1"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShareWhatsApp}
                        className="flex items-center gap-2 h-10 flex-1"
                      >
                        <MessageCircle className="w-4 h-4" />
                        WhatsApp
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShareSMS}
                        className="flex items-center gap-2 h-10 flex-1"
                      >
                        <Send className="w-4 h-4" />
                        SMS
                      </Button>
                    </div>
                  </div>

                  {/* Email sharing */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Share via Email</Label>
                    <div className="flex gap-2">
                      <Input
                        value={shareEmail}
                        onChange={(e) => setShareEmail(e.target.value)}
                        placeholder="Enter email address"
                        type="email"
                        className="h-10 flex-1"
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1 h-10"
                          >
                            <Mail className="w-4 h-4" />
                            Send
                            <ChevronDown className="w-3 h-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-background border border-border z-50">
                          <DropdownMenuItem onClick={() => handleShareEmail('default')}>
                            <Mail className="w-4 h-4 mr-2" />
                            Default Email App
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareEmail('gmail')}>
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                              <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z" fill="#EA4335"/>
                            </svg>
                            Gmail
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareEmail('outlook')}>
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C14 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="#0078D4"/>
                            </svg>
                            Outlook
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleShareEmail('yahoo')}>
                            <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13.41 16.09V20H10.74V16.09L6 7H9.03L12 12.74L14.97 7H18L13.41 16.09Z" fill="#720E9E"/>
                            </svg>
                            Yahoo Mail
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Waitlist;
