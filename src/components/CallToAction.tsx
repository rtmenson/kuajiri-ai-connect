
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Find Your Ideal Job or Perfect Candidate?
          </h2>
          <p className="text-lg text-blue-100 mb-12 max-w-3xl mx-auto">
            Join the community of job seekers and employers who have already discovered their perfect matches with Kuajiri AI.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://app.kuajiriapp.com/" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-base font-medium">
                Get Started for Free
              </Button>
            </a>
            <Link to="/demo">
              <Button size="lg" variant="outline" className="px-8 py-3 text-base border-2 border-white text-white bg-white/10">
                Access a Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
