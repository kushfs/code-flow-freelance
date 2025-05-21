
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data from Supabase profiles
  const fetchUserData = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user data:', error);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error fetching user data:', err);
      return null;
    }
  };

  // Get or create user profile
  const getOrCreateUserProfile = async (authUser: any): Promise<User | null> => {
    if (!authUser) return null;
    
    // Check if user exists in profiles table
    let userData = await fetchUserData(authUser.id);
    
    if (!userData) {
      // For demo purposes, create a mock profile if none exists
      // In a production app, you would handle this differently
      const defaultUser: Partial<User> = {
        id: authUser.id,
        name: authUser.user_metadata?.name || 'User',
        email: authUser.email,
        role: UserRole.DEVELOPER,
        createdAt: new Date()
      };
      
      setUser(defaultUser as User);
      return defaultUser as User;
    }
    
    // Map database structure to User type
    const mappedUser: User = {
      id: userData.id,
      name: `${userData.first_name} ${userData.last_name}`.trim(),
      email: userData.email,
      role: userData.role as UserRole,
      skills: userData.skills || [],
      experience: userData.years_experience ? `${userData.years_experience} years` : undefined,
      hourlyRate: userData.hourly_rate,
      company: userData.company || undefined,
      location: userData.location,
      bio: userData.bio,
      createdAt: new Date(userData.created_at)
    };
    
    return mappedUser;
  };

  useEffect(() => {
    const initAuth = async () => {
      setIsLoading(true);
      
      try {
        // Check for existing session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          const userData = await getOrCreateUserProfile(session.user);
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    initAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          const userData = await getOrCreateUserProfile(session.user);
          setUser(userData);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Using Supabase for authentication
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      const userData = await getOrCreateUserProfile(data.user);
      setUser(userData);
      
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login');
      
      // For demo purposes, fallback to mock accounts if Supabase auth fails
      if (email === 'recruiter@example.com' || email === 'developer@example.com') {
        console.log('Using mock account...');
        
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
        
        if (mockUsers[email] && password === 'password') {
          const loggedInUser = mockUsers[email];
          setUser(loggedInUser);
          localStorage.setItem('freelance_user', JSON.stringify(loggedInUser));
        } else {
          throw new Error('Invalid email or password');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Using Supabase for registration
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: name.split(' ')[0],
            last_name: name.split(' ').slice(1).join(' '),
            role: role
          }
        }
      });
      
      if (error) throw error;
      
      // If successful, set the user
      const newUser: User = {
        id: data.user?.id || `user_${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        role,
        createdAt: new Date()
      };
      
      setUser(newUser);
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully."
      });
      
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'An error occurred during registration');
      
      // For demo purposes, create a mock user if Supabase fails
      const newUser: User = {
        id: `user_${Math.random().toString(36).substr(2, 9)}`,
        name,
        email,
        role,
        createdAt: new Date()
      };
      
      setUser(newUser);
      localStorage.setItem('freelance_user', JSON.stringify(newUser));
      toast({
        title: "Demo mode",
        description: "Using mock registration (demo mode)"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      localStorage.removeItem('freelance_user');
    } catch (err) {
      console.error('Error signing out:', err);
    }
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
