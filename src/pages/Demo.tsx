
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle } from "lucide-react";

interface DemoFormData {
  companyName: string;
  contactName: string;
  companyEmail: string;
  phoneNumber: string;
}

const Demo = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DemoFormData>({
    defaultValues: {
      companyName: '',
      contactName: '',
      companyEmail: '',
      phoneNumber: '',
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
      </div>
      
      <Header />
      
      <main className="pt-20 pb-16 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                See Kuajiri AI in Action
              </h1>
              <p className="text-gray-600">
                Discover how our AI-powered platform can revolutionize your recruitment process and help you find the perfect candidates faster.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Request Your Demo</CardTitle>
                <CardDescription>
                  Enter your details below to access our exclusive demo for employers and recruiting professionals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                      name="companyEmail"
                      rules={{
                        required: "Company email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Please enter a valid email address"
                        }
                      }}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Email</FormLabel>
                          <FormControl>
                            <Input 
                              type="email"
                              placeholder="company@example.com" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phoneNumber"
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
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Demo;
