
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (sectionId: string) => {
    if (location.pathname !== '/') {
      // Navigate to home page with hash
      window.location.href = `/#${sectionId}`;
    } else {
      // Scroll to section on current page
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
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
                onClick={() => handleNavClick('features')} 
                className="text-gray-600 hover:text-blue-600 transition-colors text-sm"
              >
                Features
              </button>
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
              <Link to="/pricing" className="text-gray-600 hover:text-blue-600 transition-colors text-sm">Pricing</Link>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" className="text-sm border-blue-600 text-blue-600 hover:bg-blue-50">Sign In</Button>
            <Button className="text-sm">Start Free Trial</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
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
                onClick={() => handleNavClick('features')} 
                className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 text-sm"
              >
                Features
              </button>
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
              <Link to="/pricing" className="block px-3 py-2 text-gray-600 hover:text-gray-900 text-sm">Pricing</Link>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" className="w-full text-sm border-blue-600 text-blue-600 hover:bg-blue-50">Sign In</Button>
                <Button className="w-full text-sm">Start Free Trial</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
