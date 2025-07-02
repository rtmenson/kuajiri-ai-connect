
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Play } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const DemoVideo = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Link to="/demo">
                <Button variant="ghost" className="mb-4">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Demo Form
                </Button>
              </Link>
              
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Kuajiri AI Demo
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Watch how our AI-powered platform revolutionizes job matching for both job seekers and employers.
                </p>
              </div>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="mr-2 h-5 w-5 text-blue-600" />
                  Product Demo Video
                </CardTitle>
                <CardDescription>
                  Learn how Kuajiri AI can transform your hiring process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-70" />
                    <p className="text-lg mb-2">Demo Video Coming Soon</p>
                    <p className="text-sm opacity-70">
                      Our comprehensive product demonstration will be available here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What You'll Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• How AI matching works</li>
                    <li>• Setting up your company profile</li>
                    <li>• Managing job postings</li>
                    <li>• Reviewing candidate matches</li>
                    <li>• Analytics and reporting features</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Next Steps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Ready to get started with Kuajiri AI?
                  </p>
                  <div className="space-y-2">
                    <a href="https://app.kuajiriapp.com/" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full">
                        Start Free Trial
                      </Button>
                    </a>
                    <Link to="/pricing">
                      <Button variant="outline" className="w-full">
                        View Pricing Plans
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DemoVideo;
