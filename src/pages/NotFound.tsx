
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold text-brand-600 mb-4">404</h1>
        <h2 className="text-2xl font-medium text-gray-900 mb-6">Page Not Found</h2>
        <p className="text-gray-600 max-w-md text-center mb-8">
          The page you're looking for doesn't exist or has been moved to another URL.
        </p>
        <div className="flex gap-4">
          <Link to="/">
            <Button>Return Home</Button>
          </Link>
          <Link to="/jobs">
            <Button variant="outline">Browse Jobs</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
