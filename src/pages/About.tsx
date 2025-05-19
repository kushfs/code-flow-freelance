
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-brand-700 mb-8">About DevMatch</h1>
          
          <div className="space-y-8">
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4 text-brand-700">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                DevMatch connects talented developers with recruiters and companies seeking skilled professionals. 
                Our platform streamlines the freelancing experience, making it easier than ever for developers to 
                find great opportunities and for recruiters to discover perfect candidates for their projects.
              </p>
              <p className="text-gray-700">
                We believe in creating a fair, transparent, and efficient marketplace where technical talent can thrive 
                and businesses can find the expertise they need to succeed in today's digital landscape.
              </p>
            </section>
            
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4 text-brand-700">Why Choose DevMatch?</h2>
              
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="border border-brand-100 rounded-lg p-6 bg-brand-50">
                  <h3 className="font-semibold text-lg mb-2 text-brand-700">For Developers</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Access to quality job listings</li>
                    <li>Fair compensation rates</li>
                    <li>Secure payment system</li>
                    <li>Profile showcasing</li>
                    <li>Skills verification</li>
                  </ul>
                </div>
                
                <div className="border border-brand-100 rounded-lg p-6 bg-brand-50">
                  <h3 className="font-semibold text-lg mb-2 text-brand-700">For Recruiters</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Verified developer profiles</li>
                    <li>Skill-based matching</li>
                    <li>Project management tools</li>
                    <li>Secure hiring process</li>
                    <li>Review system</li>
                  </ul>
                </div>
                
                <div className="border border-brand-100 rounded-lg p-6 bg-brand-50">
                  <h3 className="font-semibold text-lg mb-2 text-brand-700">Platform Benefits</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Transparent communication</li>
                    <li>Dispute resolution</li>
                    <li>Project milestones</li>
                    <li>Skill verification</li>
                    <li>Community support</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold mb-4 text-brand-700">Our Team</h2>
              <p className="text-gray-700 mb-6">
                DevMatch was created by passionate developers who understand the challenges of the tech job market. 
                Our team has worked with startups, agencies, and enterprise companies, giving us insight into the 
                needs of both developers and recruiters.
              </p>
              
              <div className="flex flex-col md:flex-row items-center justify-between mt-8 border-t border-gray-200 pt-8">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-xl font-semibold text-brand-700">Kushagra Sinha</h3>
                  <p className="text-gray-700 mb-2">Lead Developer & Founder</p>
                  <p className="text-gray-600 mb-4">
                    With extensive experience in web development and freelancing, 
                    Kushagra created DevMatch to solve real problems faced by developers
                    and recruiters in the marketplace.
                  </p>
                  <a 
                    href="https://kushagras.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-brand-600 hover:text-brand-800 font-medium"
                  >
                    View Portfolio →
                  </a>
                </div>
                <div className="bg-gray-200 rounded-full w-32 h-32 flex items-center justify-center">
                  <span className="text-gray-500 text-5xl">KS</span>
                </div>
              </div>
            </section>
            
            <div className="flex justify-center mt-12">
              <Link to="/contact">
                <Button size="lg" className="bg-brand-600 hover:bg-brand-700">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
