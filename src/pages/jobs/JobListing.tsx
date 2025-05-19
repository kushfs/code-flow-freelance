
import MainLayout from '@/components/layout/MainLayout';
import JobList from '@/components/jobs/JobList';
import { getAllJobs } from '@/services/mockDataService';

const JobListing = () => {
  const allJobs = getAllJobs().filter(job => job.status === 'open');
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">All Available Jobs</h1>
        </div>
        
        <JobList jobs={allJobs} />
      </div>
    </MainLayout>
  );
};

export default JobListing;
