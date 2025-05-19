
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const Privacy = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-brand-700 mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">1. Introduction</h2>
              <p>
                At DevMatch, we respect your privacy and are committed to protecting your personal data. This Privacy Policy 
                explains how we collect, use, and safeguard your information when you use our platform.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">2. Information We Collect</h2>
              <p className="mb-3">We collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Account information (name, email, password)</li>
                <li>Profile information (skills, experience, portfolio)</li>
                <li>Communication data (messages between users)</li>
                <li>Transaction data (payment details, job contracts)</li>
                <li>Usage data (how you interact with our platform)</li>
                <li>Device information (IP address, browser type)</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">3. How We Use Your Information</h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and improve our services</li>
                <li>Process transactions and payments</li>
                <li>Connect developers and recruiters</li>
                <li>Communicate with you about our services</li>
                <li>Monitor and analyze usage patterns</li>
                <li>Prevent fraudulent activities</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">4. Information Sharing</h2>
              <p className="mb-3">
                We share your information only in specific circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With other users as necessary for platform functionality (e.g., developers see recruiter job listings)</li>
                <li>With service providers who perform services on our behalf</li>
                <li>If required by law or to protect our rights</li>
                <li>In connection with a business transfer or acquisition</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">5. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, 
                and we cannot guarantee absolute security.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">6. Your Privacy Rights</h2>
              <p className="mb-3">
                Depending on your location, you may have rights regarding your personal information, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access to your personal data</li>
                <li>Correction of inaccurate data</li>
                <li>Deletion of your data</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">7. Cookies and Tracking</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our platform. You can set 
                your browser to refuse all or some browser cookies, but this may affect the functionality of our service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">8. Children's Privacy</h2>
              <p>
                Our platform is not intended for children under 16 years of age. We do not knowingly collect personal 
                information from children under 16.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">9. Changes to This Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">10. Contact Information</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at kushagrasinha140@gmail.com.
              </p>
            </section>
            
            <div className="border-t border-gray-200 pt-6 mt-6">
              <p className="text-sm text-gray-600">
                Last updated: May 19, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Privacy;
