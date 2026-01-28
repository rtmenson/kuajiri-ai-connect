
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Zap, ChevronDown, Calculator, FileText } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CountryFlag from './CountryFlag';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (sectionId: string) => {
    const currentPath = location.pathname;
    
    if (currentPath === '/recruiter') {
      // On recruiter page, scroll to recruiter sections
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (currentPath !== '/') {
      // Navigate to home page and then scroll to section
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Scroll to section on current page
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const handlePricingClick = () => {
    navigate('/pricing');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    setIsMenuOpen(false);
  };

  const handleRecruiterClick = () => {
    navigate('/recruiter');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
    setIsMenuOpen(false);
  };

  const handleToolClick = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    setIsToolsOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center relative">
                <div className="absolute inset-0 border-2 border-blue-600 rounded-full"></div>
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Kuajiri AI
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation - centered */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex items-center space-x-8">
              <button 
                onClick={() => handleNavClick('benefits')} 
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                Benefits
              </button>
              <button 
                onClick={() => handleNavClick('how-it-works')} 
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                How It Works
              </button>
              <button onClick={handleRecruiterClick} className="text-gray-600 hover:text-blue-600 transition-colors text-sm">For Recruiters</button>
              
              {/* Tools Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-gray-600 hover:text-blue-600 transition-colors text-sm outline-none">
                  Tools
                  <ChevronDown className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="bg-white border shadow-lg z-50">
                  <DropdownMenuItem 
                    onClick={() => handleToolClick('/salary-checker')}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Calculator className="h-4 w-4 text-blue-600" />
                    <div>
                      <p className="font-medium">Salary Checker</p>
                      <p className="text-xs text-gray-500">Check your market value</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleToolClick('/job-post-generator')}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <FileText className="h-4 w-4 text-purple-600" />
                    <div>
                      <p className="font-medium">Job Post Generator</p>
                      <p className="text-xs text-gray-500">Create job posts with AI</p>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <CountryFlag />
            <div className="flex items-center space-x-2">
              <a href="https://app.kuajiriapp.com/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="text-sm border-blue-600 text-blue-600 hover:bg-blue-50">Sign In</Button>
              </a>
              {location.pathname === '/recruiter' ? (
                <a href="https://app.kuajiriapp.com/" target="_blank" rel="noopener noreferrer">
                  <Button className="text-sm">Sign up</Button>
                </a>
              ) : (
              <a href="https://discord.gg/r9r2ntjV" target="_blank" rel="noopener noreferrer">
                  <Button className="text-sm">Join our community</Button>
                </a>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <CountryFlag />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              <button 
                onClick={() => handleNavClick('benefits')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 text-sm"
              >
                Benefits
              </button>
              <button 
                onClick={() => handleNavClick('how-it-works')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 text-sm"
              >
                How It Works
              </button>
              <button onClick={handleRecruiterClick} className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">For Recruiters</button>
              
              {/* Mobile Tools Section */}
              <div className="border-t pt-2 mt-2">
                <button 
                  onClick={() => setIsToolsOpen(!isToolsOpen)}
                  className="flex items-center justify-between w-full px-3 py-2 text-gray-600 hover:text-gray-900 text-sm"
                >
                  <span className="font-medium">Tools</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isToolsOpen ? 'rotate-180' : ''}`} />
                </button>
                {isToolsOpen && (
                  <div className="pl-4 space-y-1">
                    <button 
                      onClick={() => handleToolClick('/salary-checker')}
                      className="flex items-center gap-2 w-full px-3 py-2 text-gray-600 hover:text-blue-600 text-sm"
                    >
                      <Calculator className="h-4 w-4" />
                      Salary Checker
                    </button>
                    <button 
                      onClick={() => handleToolClick('/job-post-generator')}
                      className="flex items-center gap-2 w-full px-3 py-2 text-gray-600 hover:text-blue-600 text-sm"
                    >
                      <FileText className="h-4 w-4" />
                      Job Post Generator
                    </button>
                  </div>
                )}
              </div>
              
              <div className="px-3 py-2 space-y-2">
                <a href="https://app.kuajiriapp.com/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="text-sm border-blue-600 text-blue-600 hover:bg-blue-50">Sign In</Button>
                </a>
                <div></div>
                {location.pathname === '/recruiter' ? (
                  <a href="https://app.kuajiriapp.com/" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full text-sm">Sign up</Button>
                  </a>
                ) : (
                <a href="https://discord.gg/r9r2ntjV" target="_blank" rel="noopener noreferrer">
                    <Button className="w-full text-sm">Join our community</Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
