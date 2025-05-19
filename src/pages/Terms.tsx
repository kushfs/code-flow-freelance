
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

const Terms = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-brand-700 mb-6">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">1. Introduction</h2>
              <p>
                Welcome to DevMatch ("we," "our," or "us"). By accessing or using our platform, you agree to be bound 
                by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these 
                terms, you are prohibited from using or accessing the site.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">2. User Accounts</h2>
              <p className="mb-3">
                When you create an account with us, you must provide accurate and complete information. You are responsible 
                for safeguarding the password and for all activities that occur under your account.
              </p>
              <p>
                We reserve the right to disable any user account if we believe you have violated any provision of these Terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">3. Developer Services</h2>
              <p className="mb-3">
                Developers on our platform offer their services as independent contractors, not as employees of DevMatch. 
                We do not guarantee the quality, safety, or legality of services provided.
              </p>
              <p>
                Developers are responsible for the quality of their work, meeting deadlines, and complying with all applicable 
                laws and regulations related to their services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">4. Recruiter Responsibilities</h2>
              <p className="mb-3">
                Recruiters must provide clear project requirements and expectations. Payment terms must be agreed upon 
                before work begins and payments must be made according to the agreed schedule.
              </p>
              <p>
                Recruiters are responsible for evaluating and selecting developers based on their own criteria and judgment.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">5. Fees and Payments</h2>
              <p className="mb-3">
                DevMatch charges a service fee for facilitating the connection between developers and recruiters. This fee 
                is calculated as a percentage of the total project value.
              </p>
              <p>
                All payments must be processed through our platform. Attempts to circumvent our payment system are prohibited 
                and may result in account termination.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">6. Dispute Resolution</h2>
              <p>
                In the event of a dispute between developers and recruiters, both parties agree to first attempt to resolve 
                the issue through our platform's dispute resolution process before seeking external remedies.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">7. Intellectual Property</h2>
              <p>
                Unless otherwise specified, all intellectual property rights for work completed through our platform transfer 
                to the recruiter upon full payment, subject to any third-party licenses included in the deliverables.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">8. Limitation of Liability</h2>
              <p>
                DevMatch is not liable for any damages or losses resulting from your use of the platform or any services 
                arranged through the platform. We are not responsible for the quality, safety, or legality of services provided 
                by developers.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">9. Modifications to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Your continued use of the platform after any changes 
                constitutes acceptance of the new terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold text-brand-700 mb-3">10. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at kushagrasinha140@gmail.com.
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

export default Terms;
