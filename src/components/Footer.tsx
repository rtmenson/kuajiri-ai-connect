
import { Zap } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#111827' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Zap className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Kuajiri AI
              </span>
            </div>
            <p className="text-sm text-gray-300 max-w-md">
              Revolutionizing recruitment with AI-powered precision matching for job seekers and employers.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end space-x-6 mb-6 md:mb-0">
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Contact</a>
          </div>
        </div>
        
        <div className="text-center pt-12 border-t border-gray-600 mt-4">
          <p className="text-gray-300 text-sm">
            © 2025 Kuajiri AI. All rights reserved. Empowering careers with intelligent matching.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
