
const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kuajiri AI
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end space-x-6 mb-6 md:mb-0">
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">Contact</a>
          </div>
        </div>
        
        <div className="text-center pt-8 border-t">
          <p className="text-gray-600">
            © 2025 Kuajiri AI. All rights reserved. Empowering careers with intelligent matching.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
