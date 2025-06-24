
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Experience the Future of Hiring?
          </h2>
          <p className="text-lg text-blue-100 mb-12 max-w-3xl mx-auto">
            Join thousands of job seekers and employers who have already discovered their perfect matches with Kuajiri AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-base font-medium">
              Get Started for Free
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 text-base border-2 border-white text-white hover:bg-white/10">
              Schedule a Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
