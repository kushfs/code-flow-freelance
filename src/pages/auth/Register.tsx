
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import RegisterForm from '@/components/auth/RegisterForm';
import { UserRole } from '@/types';

const Register = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to appropriate dashboard
  useEffect(() => {
    if (user) {
      if (user.role === UserRole.RECRUITER) {
        navigate('/recruiter/dashboard');
      } else if (user.role === UserRole.DEVELOPER) {
        navigate('/developer/dashboard');
      }
    }
  }, [user, navigate]);

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <RegisterForm />
      </div>
    </MainLayout>
  );
};

export default Register;
