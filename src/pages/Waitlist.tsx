import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Zap } from "lucide-react";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const waitlistSchema = z.object({
  userType: z.enum(["jobseeker", "jobposter"], {
    required_error: "Please select your user type",
  }),
  fullName: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  phone: z.string().trim().min(9, "Please enter a valid phone number").max(15),
  email: z.string().trim().email("Please enter a valid email address").max(255),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

const Waitlist = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<WaitlistFormData | null>(null);
  const { toast } = useToast();

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
      phone: "+233",
    },
  });

  const userType = watch("userType");

  const onSubmit = async (data: WaitlistFormData) => {
    try {
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-primary/5">
      {/* Banner with Logo */}
      <div className="w-full py-8 px-4 border-b border-border/50 bg-muted/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Kuajiri AI
            </span>
          </div>
          <p className="text-sm md:text-base font-normal text-center text-muted-foreground">
            Coming Soon. Sign Up To Be The First To Know.
          </p>
        </div>
      </div>
      
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {!isSubmitted ? (
            <div className="bg-card border border-border rounded-2xl shadow-2xl p-8 space-y-8 animate-fade-in">
              <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                  Join the Waitlist
                </h1>
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

                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    {...register("fullName")}
                    placeholder="John Doe"
                    className="h-11"
                  />
                  {errors.fullName && (
                    <p className="text-sm text-destructive">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    {...register("phone")}
                    placeholder="+233 XX XXX XXXX"
                    className="h-11"
                  />
                  {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@example.com"
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
                <h2 className="text-2xl font-bold">You're on the list!</h2>
                <p className="text-muted-foreground">
                  Thank you for joining our waitlist, {formData?.fullName}!
                </p>
                <p className="text-sm text-muted-foreground">
                  We'll contact you at <span className="font-medium text-foreground">{formData?.email}</span> as soon as the beta is released.
                </p>
              </div>

              <div className="pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false);
                    reset({ phone: "+233" });
                  }}
                  className="w-full"
                >
                  Submit Another Entry
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Waitlist;
