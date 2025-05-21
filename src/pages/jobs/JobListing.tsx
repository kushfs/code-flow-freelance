
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import JobList from '@/components/jobs/JobList';
import { getAllJobs } from '@/services/mockDataService';
import { Job } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const JobListing = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // First try to get jobs from Supabase
        const { data: supabaseJobs, error } = await supabase
          .from('jobs')
          .select(`
            *,
            recruiter:recruiter_id (
              id, first_name, last_name, email, company, location
            )
          `)
          .eq('status', 'open')
          .order('created_at', { ascending: false });
          
        if (error) {
          console.error("Error fetching from Supabase:", error);
          throw error;
        }
        
        // Transform Supabase data to match our Job type
        if (supabaseJobs && supabaseJobs.length > 0) {
          const transformedJobs = supabaseJobs.map((job: any): Job => ({
            id: job.id,
            title: job.title,
            description: job.description,
            requiredSkills: job.required_skills || [],
            budget: job.budget,
            duration: job.duration || undefined,
            status: job.status,
            recruiterId: job.recruiter_id,
            location: job.location || undefined,
            createdAt: new Date(job.created_at),
            recruiter: job.recruiter ? {
              id: job.recruiter.id,
              name: `${job.recruiter.first_name} ${job.recruiter.last_name}`,
              email: job.recruiter.email,
              role: 'recruiter',
              company: job.recruiter.company,
              location: job.recruiter.location,
              createdAt: new Date()
            } : undefined
          }));
          
          console.log("Jobs loaded from Supabase:", transformedJobs);
          setJobs(transformedJobs);
        } else {
          // Fallback to mock data if no jobs found in Supabase
          console.log("No jobs found in Supabase, using mock data");
          const mockJobs = getAllJobs().filter(job => job.status === 'open');
          setJobs(mockJobs);
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        toast({
          variant: "destructive",
          title: "Error fetching jobs",
          description: "Using fallback data instead."
        });
        
        // Fallback to mock data on error
        const mockJobs = getAllJobs().filter(job => job.status === 'open');
        setJobs(mockJobs);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobs();
  }, [toast]);
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">All Available Jobs</h1>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <p className="text-gray-500">Loading jobs...</p>
          </div>
        ) : (
          <JobList jobs={jobs} />
        )}
      </div>
    </MainLayout>
  );
};

export default JobListing;
