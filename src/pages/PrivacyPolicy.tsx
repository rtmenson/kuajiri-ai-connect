import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
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
              Privacy Policy
            </h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 mb-6">
                Effective Date: 26th June, 2025
              </p>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Introduction</h2>
                <p className="text-gray-600 mb-4">
                  Kuajiri ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our USSD-based application. By using our services, you consent to the data practices described in this policy.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Information We Collect</h2>
                <p className="text-gray-600 mb-4">
                  When you interact with our USSD service, we may collect the following personal information:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Name</li>
                  <li>Phone number</li>
                  <li>Email address</li>
                  <li>Gender</li>
                  <li>Religion</li>
                  <li>Job history</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">How We Use Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use the information collected to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provide and manage our services</li>
                  <li>Personalize user experience</li>
                  <li>Improve our application and customer support</li>
                  <li>Communicate updates and notifications</li>
                  <li>Conduct research and data analysis</li>
                  <li>Comply with legal and regulatory requirements</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Data Sharing and Disclosure</h2>
                <p className="text-gray-600 mb-4">
                  We do not sell or rent your personal information. However, we may share your data in the following cases:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>With Service Providers:</strong> To assist in service delivery, provided they adhere to confidentiality obligations.</li>
                  <li><strong>For Legal Compliance:</strong> If required by law, court order, or governmental authority.</li>
                  <li><strong>With Your Consent:</strong> When you authorize us to share your information.</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Data Security</h2>
                <p className="text-gray-600 mb-4">
                  We implement appropriate security measures to protect your information from unauthorized access, loss, or misuse. However, no system can guarantee absolute security. You are responsible for keeping your access credentials secure.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Data Retention</h2>
                <p className="text-gray-600 mb-4">
                  We retain your data only as long as necessary to fulfill the purposes outlined in this policy or as required by law. When no longer needed, we securely delete or anonymize the data.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">User Rights</h2>
                <p className="text-gray-600 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Access, update, or correct your personal information</li>
                  <li>Request the deletion of your data, subject to legal obligations</li>
                  <li>Withdraw consent for data processing where applicable</li>
                  <li>Lodge a complaint with the relevant data protection authority</li>
                </ul>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Children's Privacy</h2>
                <p className="text-gray-600 mb-4">
                  Our service is not intended for individuals under 18 years of age. If we become aware that we have collected data from a minor without parental consent, we will take steps to delete such information.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Changes to This Privacy Policy</h2>
                <p className="text-gray-600 mb-4">
                  We may update this Privacy Policy periodically. We will notify users of significant changes through our service or other communication channels. Continued use of our service after such updates constitutes acceptance of the revised policy.
                </p>
              </section>
              
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Contact Information</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions or concerns about this Privacy Policy, please contact us at:
                </p>
                <p className="text-gray-600 mb-4">
                  Email: contact@kuajiriapp.com
                </p>
                <p className="text-gray-600">
                  By using Kuajiri AI, you acknowledge that you have read and understood this Privacy Policy and agree to its terms.
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

export default PrivacyPolicy;
