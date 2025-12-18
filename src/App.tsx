
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrencyProvider } from "./contexts/CurrencyContext";
import Index from "./pages/Index";
import JobseekerHomepage from "./pages/JobseekerHomepage";
import RecruiterHomepage from "./pages/RecruiterHomepage";
import RecruiterWaitlistLanding from "./pages/RecruiterWaitlistLanding";
import Pricing from "./pages/Pricing";
import Demo from "./pages/Demo";
import DemoVideo from "./pages/DemoVideo";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Waitlist from "./pages/Waitlist";
import WaitlistLanding from "./pages/WaitlistLanding";
import JobPostGenerator from "./pages/JobPostGenerator";
import SalaryCheck from "./pages/SalaryCheck";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CurrencyProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WaitlistLanding />} />
            <Route path="/waitlist" element={<Waitlist />} />
            <Route path="/jobseeker-homepage" element={<JobseekerHomepage />} />
            <Route path="/recruiter" element={<RecruiterWaitlistLanding />} />
            <Route path="/recruiter-waitlist" element={<RecruiterHomepage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/demo-video" element={<DemoVideo />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/job-post-generator" element={<JobPostGenerator />} />
            <Route path="/salary-checker" element={<SalaryCheck />} />
            <Route path="/home" element={<Index />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </CurrencyProvider>
  </QueryClientProvider>
);

export default App;