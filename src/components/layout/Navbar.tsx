
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

const Navbar = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-brand-700">DevMatch</span>
          </Link>

          {user && (
            <nav className="hidden md:flex space-x-4">
              {user.role === UserRole.RECRUITER && (
                <>
                  <Link to="/recruiter/dashboard" className="text-gray-700 hover:text-brand-600 transition-colors">Dashboard</Link>
                  <Link to="/recruiter/post-job" className="text-gray-700 hover:text-brand-600 transition-colors">Post Job</Link>
                  <Link to="/recruiter/applications" className="text-gray-700 hover:text-brand-600 transition-colors">Applications</Link>
                </>
              )}
              {user.role === UserRole.DEVELOPER && (
                <>
                  <Link to="/developer/dashboard" className="text-gray-700 hover:text-brand-600 transition-colors">Dashboard</Link>
                  <Link to="/developer/jobs" className="text-gray-700 hover:text-brand-600 transition-colors">Find Jobs</Link>
                  <Link to="/developer/applications" className="text-gray-700 hover:text-brand-600 transition-colors">My Applications</Link>
                </>
              )}
            </nav>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="hidden md:inline text-sm text-gray-600">
                Hello, {user.name}
              </span>
              <Link to="/profile">
                <Button variant="outline" size="sm">Profile</Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button variant="default" size="sm">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
