
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-medium mb-4">DevMatch</h3>
            <p className="text-gray-600 text-sm">
              Connecting top developers with the best recruiters worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase text-gray-500 mb-4">For Developers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/developer/jobs" className="text-gray-700 hover:text-brand-600 transition-colors">Find Jobs</Link></li>
              <li><Link to="/register?role=developer" className="text-gray-700 hover:text-brand-600 transition-colors">Create Profile</Link></li>
              <li><Link to="/developer/dashboard" className="text-gray-700 hover:text-brand-600 transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase text-gray-500 mb-4">For Recruiters</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/recruiter/post-job" className="text-gray-700 hover:text-brand-600 transition-colors">Post a Job</Link></li>
              <li><Link to="/register?role=recruiter" className="text-gray-700 hover:text-brand-600 transition-colors">Create Account</Link></li>
              <li><Link to="/recruiter/dashboard" className="text-gray-700 hover:text-brand-600 transition-colors">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-medium uppercase text-gray-500 mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-700 hover:text-brand-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-700 hover:text-brand-600 transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-gray-700 hover:text-brand-600 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-700 hover:text-brand-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-8 pt-4">
          <p className="text-sm text-gray-500 text-center">
            &copy; {new Date().getFullYear()} DevMatch. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
