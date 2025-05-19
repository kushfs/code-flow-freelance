
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types';
import { getAllJobs } from '@/services/mockDataService';
import JobList from '@/components/jobs/JobList';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const featuredJobs = getAllJobs()
    .filter(job => job.status === 'open')
    .slice(0, 3);

  const handleGetStarted = () => {
    if (user) {
      if (user.role === UserRole.RECRUITER) {
        navigate('/recruiter/dashboard');
      } else {
        navigate('/developer/dashboard');
      }
    } else {
      navigate('/register');
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Connect. Collaborate. Create.
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              DevMatch connects top developers with recruiters worldwide. 
              Find your next project or the perfect talent for your team.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button onClick={handleGetStarted} size="lg">
                Get Started
              </Button>
              <Button variant="outline" size="lg" onClick={() => navigate('/jobs')}>
                Browse Jobs
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* For Developers */}
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-700">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Developers</h3>
              <p className="text-gray-700 mb-4">
                Create a profile showcasing your skills, browse projects that match your expertise, and submit proposals to recruiters.
              </p>
              <Button variant="link" onClick={() => navigate('/register?role=developer')}>
                Join as a Developer
              </Button>
            </div>
            
            {/* For Recruiters */}
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-700">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">For Recruiters</h3>
              <p className="text-gray-700 mb-4">
                Post projects, review applications from qualified developers, and select the perfect candidate for your needs.
              </p>
              <Button variant="link" onClick={() => navigate('/register?role=recruiter')}>
                Join as a Recruiter
              </Button>
            </div>
            
            {/* Collaboration */}
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-brand-700">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaborate</h3>
              <p className="text-gray-700 mb-4">
                Work together seamlessly through our platform, with built-in messaging, milestone tracking, and payments.
              </p>
              <Button variant="link" onClick={() => navigate('/about')}>
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Featured Jobs</h2>
            <Button variant="outline" onClick={() => navigate('/jobs')}>
              View All Jobs
            </Button>
          </div>
          
          <JobList jobs={featuredJobs} />
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-brand-600 mb-2">1,000+</div>
              <div className="text-gray-700">Developers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600 mb-2">500+</div>
              <div className="text-gray-700">Recruiters</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600 mb-2">10,000+</div>
              <div className="text-gray-700">Jobs Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-600 mb-2">$5M+</div>
              <div className="text-gray-700">Paid to Developers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join DevMatch today and start connecting with the perfect developers or finding your next project.
          </p>
          <Button size="lg" variant="secondary" onClick={handleGetStarted}>
            Create Your Account
          </Button>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
