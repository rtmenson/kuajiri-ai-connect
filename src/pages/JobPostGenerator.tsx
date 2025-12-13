import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Copy, Download, Share2, Sparkles, ArrowLeft, Clock } from "lucide-react";
import { Link } from "react-router-dom";

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

const JobPostGenerator = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [salaryMin, setSalaryMin] = useState("");
  const [salaryMax, setSalaryMax] = useState("");
  const [req1, setReq1] = useState("");
  const [req2, setReq2] = useState("");
  const [req3, setReq3] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);

  const handleGenerate = async () => {
    if (!jobTitle || !salaryMin || !salaryMax || !req1 || !req2 || !req3) {
      toast.error("Please fill in all fields");
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

  const downloadImage = () => {
    if (generatedContent?.imageUrl) {
      const link = document.createElement("a");
      link.href = generatedContent.imageUrl;
      link.download = `${generatedContent.jobTitle.replace(/\s+/g, "-")}-hiring-post.png`;
      link.click();
      toast.success("Image downloaded!");
    }
  };

  const shareToLinkedIn = () => {
    const text = encodeURIComponent(generatedContent?.socialCaption || "");
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}&summary=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold">Kuajiri AI</span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Clock className="w-4 h-4" />
            60 seconds to create. 61 seconds to post everywhere.
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Job Post Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Enter your job details and let AI create a professional description, 
            eye-catching graphic, and viral social media copy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Job Details
              </CardTitle>
              <CardDescription>Fill in the basics and we'll handle the rest</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g. Senior Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="h-11"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="salaryMin">Min Salary (GH₵)</Label>
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
                  <Label htmlFor="salaryMax">Max Salary (GH₵)</Label>
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
                <Label>3 Key Requirements</Label>
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
                className="w-full h-12 text-lg font-semibold"
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
                  <Card className="shadow-lg overflow-hidden">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center justify-between">
                        Social Media Graphic
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={downloadImage}>
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        </div>
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

                {/* One-liner */}
                <Card className="shadow-lg">
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
                <Card className="shadow-lg">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center justify-between">
                      Social Caption
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(generatedContent.socialCaption, "Caption")}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                        <Button size="sm" variant="outline" onClick={shareToLinkedIn}>
                          <Share2 className="w-4 h-4 mr-1" />
                          LinkedIn
                        </Button>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{generatedContent.socialCaption}</p>
                  </CardContent>
                </Card>

                {/* Full Description */}
                <Card className="shadow-lg">
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
              <Card className="shadow-lg h-full min-h-[400px] flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ready to Generate</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Fill in your job details on the left and click generate to create your professional job post.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <p>Powered by Kuajiri AI • Create professional job posts in seconds</p>
        </footer>
      </main>
    </div>
  );
};

export default JobPostGenerator;
