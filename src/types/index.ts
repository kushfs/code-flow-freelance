
export enum UserRole {
  RECRUITER = 'recruiter',
  DEVELOPER = 'developer',
  ADMIN = 'admin'
}

export enum JobStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

export enum ApplicationStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  skills?: string[];
  experience?: string;
  hourlyRate?: number;
  company?: string;
  location?: string;
  createdAt: Date;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  budget: number;
  duration?: string;
  status: JobStatus;
  recruiterId: string;
  recruiter?: User;
  location?: string;
  createdAt: Date;
  applications?: Application[];
}

export interface Application {
  id: string;
  jobId: string;
  developerId: string;
  developer?: User;
  proposal: string;
  status: ApplicationStatus;
  createdAt: Date;
}

export interface Payment {
  id: string;
  jobId: string;
  amount: number;
  commission: number;
  status: 'pending' | 'completed';
  developerId: string;
  recruiterId: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  fromUserId: string;
  toUserId: string;
  rating: number;
  comment: string;
  jobId: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}
