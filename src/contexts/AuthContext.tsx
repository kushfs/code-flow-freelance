
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('freelance_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Failed to parse stored user:', err);
      }
    }
    setIsLoading(false);
  }, []);

  // For our mock auth system:
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock login - in a real app, this would be an API call
      // For now, create some sample users you can log in as
      const mockUsers: Record<string, User> = {
        'recruiter@example.com': {
          id: 'r1',
          name: 'John Recruiter',
          email: 'recruiter@example.com',
          role: UserRole.RECRUITER,
          company: 'TechCorp',
          location: 'New York',
          createdAt: new Date()
        },
        'developer@example.com': {
          id: 'd1',
          name: 'Jane Developer',
          email: 'developer@example.com',
          role: UserRole.DEVELOPER,
          skills: ['React', 'TypeScript', 'Node.js'],
          experience: '5 years',
          hourlyRate: 50,
          location: 'San Francisco',
          bio: 'Full stack developer with expertise in React and Node.js',
          createdAt: new Date()
        }
      };
      
      // Simulate server delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (mockUsers[email] && password === 'password') {
        const loggedInUser = mockUsers[email];
        setUser(loggedInUser);
        localStorage.setItem('freelance_user', JSON.stringify(loggedInUser));
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock registration - in a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Simulate user creation
      const newUser: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        role,
        createdAt: new Date()
      };
      
      setUser(newUser);
      localStorage.setItem('freelance_user', JSON.stringify(newUser));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during registration');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('freelance_user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
