
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface DemoFormData {
  companyName: string;
  companyWebsite: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

const Demo = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DemoFormData>({
    defaultValues: {
      companyName: '',
      companyWebsite: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
    },
  });

  const onSubmit = async (data: DemoFormData) => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Demo form submitted:', data);
      
      toast({
        title: "Demo Access Granted!",
        description: "Redirecting you to the demo video...",
      });
      
      // Redirect directly to demo video
      navigate('/demo-video');
      
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-32 left-20 w-16 h-16 bg-blue-200/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-32 right-20 w-12 h-12 bg-purple-300/20 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-64 right-32 w-20 h-20 bg-blue-300/15 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-48 left-32 w-14 h-14 bg-purple-200/20 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-96 left-1/2 w-10 h-10 bg-blue-400/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-20 right-1/4 w-8 h-8 bg-purple-300/15 rounded-full animate-pulse" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-18 h-18 bg-blue-200/20 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
      
      <Header />
      
      <main className="pt-20 pb-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/20">
            <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Request Demo Access
            </h2>
            
            <Form {...form}>
              <form 
                name="Kuajiri AI Website"
                method="POST" 
                data-netlify="true"
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <input type="hidden" name="form-name" value="Kuajiri AI Website" />
                
                <FormField
                  control={form.control}
                  name="companyName"
                  rules={{
                    required: "Company name is required",
                    minLength: {
                      value: 2,
                      message: "Company name must be at least 2 characters"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter your company name" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="companyWebsite"
                  rules={{
                    required: "Company website is required",
                    pattern: {
                      value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                      message: "Please enter a valid website URL"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Website</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://www.yourcompany.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactName"
                  rules={{
                    required: "Company contact name is required",
                    minLength: {
                      value: 2,
                      message: "Company contact name must be at least 2 characters"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Contact Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your full name" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactEmail"
                  rules={{
                    required: "Company contact email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Please enter a valid email address"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Contact Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="contact@yourcompany.com" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPhone"
                  rules={{
                    required: "Company contact phone number is required",
                    pattern: {
                      value: /^[\+]?[1-9][\d]{0,15}$/,
                      message: "Please enter a valid phone number"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Contact Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          type="tel"
                          placeholder="+1 (555) 123-4567" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Access Demo"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Demo;
