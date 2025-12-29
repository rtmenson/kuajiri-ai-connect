
import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfService = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Effective Date: 29th December, 2025
              </p>
              
              <div className="text-gray-700 mb-8">
                <p className="mb-6">
                  Welcome to Kuajiri AI! These Terms of Service ("Terms") govern your use of our AI-powered job matching platform and related tools. By accessing or using Kuajiri AI, you agree to comply with these Terms.
                </p>
              </div>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Acceptance of Terms</h2>
                <p className="text-gray-600 mb-4">
                  By using Kuajiri AI, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use our services.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Services Provided</h2>
                <p className="text-gray-600 mb-4">
                  Kuajiri AI connects job seekers with job opportunities using AI-driven matching algorithms. We do not guarantee employment, job placement, or the accuracy of job listings.
                </p>
                <p className="text-gray-600 mb-4">
                  Additionally, we provide the following free tools:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li><strong>Salary Checker:</strong> A tool that provides salary benchmarking information based on job titles, experience levels, and locations. Salary data is provided for informational purposes only and does not constitute a guarantee of actual market rates.</li>
                  <li><strong>Job Post Generator:</strong> An AI-powered tool that helps employers and recruiters create professional job postings. Generated content should be reviewed and customized before use.</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">User Responsibilities</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>For Job Seekers:</strong> You must provide accurate and up-to-date information in your CV and profile.</li>
                  <li><strong>For Employers & Recruiters:</strong> You must post legitimate job opportunities and comply with applicable employment laws.</li>
                  <li><strong>Prohibited Activities:</strong> Users must not engage in fraudulent activities, misrepresent themselves, or misuse the platform.</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Account Registration</h2>
                <p className="text-gray-600 mb-4">
                  Users may be required to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and activities under your account.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Privacy Policy</h2>
                <p className="text-gray-600 mb-4">
                  Your use of Kuajiri AI is subject to our Privacy Policy, which explains how we collect, use, and protect your data.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Fees and Payments</h2>
                <p className="text-gray-600 mb-4">
                  Certain services may require payment. Kuajiri AI reserves the right to modify pricing at any time. Payments made are non-refundable unless stated otherwise.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Intellectual Property</h2>
                <p className="text-gray-600 mb-4">
                  Kuajiri AI and its content, including but not limited to logos, text, and software, are the intellectual property of Kuajiri AI. Unauthorized use or reproduction is prohibited.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Disclaimers and Limitation of Liability</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Kuajiri AI provides services "as is" without warranties of any kind.</li>
                  <li>We are not responsible for the accuracy of job postings or the outcome of job applications.</li>
                  <li>Salary information provided by the Salary Checker tool is for informational purposes only and may not reflect actual market conditions.</li>
                  <li>Job posts generated by our AI tool are suggestions and should be reviewed for accuracy and compliance with local employment laws before use.</li>
                  <li>Kuajiri AI is not liable for any damages resulting from your use of the platform or its tools.</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Termination</h2>
                <p className="text-gray-600 mb-4">
                  Kuajiri AI reserves the right to suspend or terminate accounts that violate these Terms or engage in prohibited activities.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Governing Law</h2>
                <p className="text-gray-600 mb-4">
                  These Terms shall be governed by and interpreted in accordance with the laws of Ghana.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Changes to Terms</h2>
                <p className="text-gray-600 mb-4">
                  We may update these Terms from time time. Continued use of Kuajiri AI constitutes acceptance of the revised Terms.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  For any questions regarding these Terms, please contact us at contact@kuajiriapp.com.
                </p>
                <p className="text-gray-600">
                  By using Kuajiri AI, you acknowledge that you have read and understood these Terms and agree to abide by them.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
