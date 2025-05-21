
import { Job, User, JobStatus } from '@/types';

/**
 * Transforms a job record from Supabase to the application's Job type
 */
export const transformSupabaseJob = (job: any): Job => {
  const recruiter = job.recruiter ? {
    id: job.recruiter.id,
    name: `${job.recruiter.first_name} ${job.recruiter.last_name}`,
    email: job.recruiter.email,
    role: 'recruiter',
    company: job.recruiter.company,
    location: job.recruiter.location,
    createdAt: new Date()
  } as User : undefined;

  return {
    id: job.id,
    title: job.title,
    description: job.description,
    requiredSkills: job.required_skills || [],
    budget: job.budget,
    duration: job.duration || undefined,
    status: job.status as JobStatus,
    recruiterId: job.recruiter_id,
    location: job.location || undefined,
    createdAt: new Date(job.created_at),
    recruiter
  };
};
