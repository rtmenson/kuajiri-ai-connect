
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
                  Kuajiri AI for Employers
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  See how our AI-powered recruitment platform helps employers, HR teams, and recruiting agencies find the perfect candidates in record time.
                </p>
              </div>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="mr-2 h-5 w-5 text-blue-600" />
                  Recruitment Demo Video
                </CardTitle>
                <CardDescription>
                  Discover how Kuajiri AI streamlines your hiring process and improves candidate matching
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-70" />
                    <p className="text-lg mb-2">Demo Video Coming Soon</p>
                    <p className="text-sm opacity-70">
                      Our comprehensive recruitment platform demonstration will be available here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">What You'll Discover</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• AI-powered candidate matching technology</li>
                    <li>• Streamlined job posting and management</li>
                    <li>• Advanced candidate screening features</li>
                    <li>• Real-time recruitment analytics</li>
                    <li>• Integration with existing HR systems</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ready to Transform Your Hiring?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">
                    Join hundreds of employers who have revolutionized their recruitment process with Kuajiri AI.
                  </p>
                  <div className="space-y-2">
                    <a href="https://app.kuajiriapp.com/" target="_blank" rel="noopener noreferrer">
                      <Button className="w-full">
                        Start Hiring Smarter
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
