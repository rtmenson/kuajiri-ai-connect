import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, FileText, X, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const ToolsPromoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Check if user has already seen the modal this session
      const hasSeenModal = sessionStorage.getItem('toolsPromoModalSeen');
      if (!hasSeenModal) {
        setIsOpen(true);
        sessionStorage.setItem('toolsPromoModalSeen', 'true');
      }
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-purple-600" />
            Try Our Free Tools
          </DialogTitle>
        </DialogHeader>
        
        <p className="text-muted-foreground text-sm mb-4">
          While you wait for launch, explore our free career tools to help you make smarter decisions.
        </p>

        <div className="grid gap-3">
          <Link to="/salary-checker" onClick={() => setIsOpen(false)}>
            <Button 
              variant="outline" 
              className="w-full justify-start h-auto py-4 px-4 hover:bg-blue-50 hover:border-blue-300 transition-all"
            >
              <Calculator className="h-8 w-8 text-blue-600 mr-4 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-foreground">Salary Checker</div>
                <div className="text-xs text-muted-foreground">
                  Find out if you're being paid fairly for your role
                </div>
              </div>
            </Button>
          </Link>

          <Link to="/job-post-generator" onClick={() => setIsOpen(false)}>
            <Button 
              variant="outline" 
              className="w-full justify-start h-auto py-4 px-4 hover:bg-purple-50 hover:border-purple-300 transition-all"
            >
              <FileText className="h-8 w-8 text-purple-600 mr-4 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-foreground">Job Post Generator</div>
                <div className="text-xs text-muted-foreground">
                  Create professional job posts with AI in seconds
                </div>
              </div>
            </Button>
          </Link>
        </div>

        <Button 
          variant="ghost" 
          className="mt-2 text-muted-foreground"
          onClick={() => setIsOpen(false)}
        >
          Maybe later
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default ToolsPromoModal;
