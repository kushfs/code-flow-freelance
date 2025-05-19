
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import JobCard from '@/components/jobs/JobCard';
import { getJobsByRecruiterId, getTotalCommission } from '@/services/mockDataService';
import { JobStatus } from '@/types';

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedTab, setSelectedTab] = useState<'active' | 'completed'>('active');
  
  if (!user) {
    return null;
  }
  
  // Get jobs posted by the recruiter
  const recruiterJobs = getJobsByRecruiterId(user.id);
  
  // Filter jobs based on selected tab
  const activeJobs = recruiterJobs.filter(job => job.status !== JobStatus.COMPLETED);
  const completedJobs = recruiterJobs.filter(job => job.status === JobStatus.COMPLETED);
  
  const displayJobs = selectedTab === 'active' ? activeJobs : completedJobs;
  
  // Calculate statistics
  const totalJobsPosted = recruiterJobs.length;
  const totalActiveJobs = activeJobs.length;
  const totalCompletedJobs = completedJobs.length;
  
  // Get total amount spent on completed jobs
  const totalSpent = completedJobs.reduce((total, job) => total + job.budget, 0);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome, {user.name}!</h1>
          <p className="text-gray-600">Manage your job postings and find the right developers for your projects.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-gray-500">Jobs Posted</div>
              <div className="text-2xl font-bold mt-1">{totalJobsPosted}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-gray-500">Active Jobs</div>
              <div className="text-2xl font-bold mt-1">{totalActiveJobs}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-gray-500">Completed Jobs</div>
              <div className="text-2xl font-bold mt-1">{totalCompletedJobs}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-gray-500">Total Spent</div>
              <div className="text-2xl font-bold mt-1">${totalSpent.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => navigate('/recruiter/post-job')}>
                Post a New Job
              </Button>
              <Button variant="outline" onClick={() => navigate('/recruiter/applications')}>
                View Applications
              </Button>
              <Button variant="outline" onClick={() => navigate('/developer/profiles')}>
                Browse Developers
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Jobs Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedTab('active')}
                className={`pb-2 font-medium ${
                  selectedTab === 'active' 
                    ? 'text-brand-600 border-b-2 border-brand-600' 
                    : 'text-gray-600'
                }`}
              >
                Active Jobs
              </button>
              <button
                onClick={() => setSelectedTab('completed')}
                className={`pb-2 font-medium ${
                  selectedTab === 'completed' 
                    ? 'text-brand-600 border-b-2 border-brand-600' 
                    : 'text-gray-600'
                }`}
              >
                Completed Jobs
              </button>
            </div>
            
            <Link to="/recruiter/jobs">
              <Button variant="ghost">View All Jobs</Button>
            </Link>
          </div>
          
          {displayJobs.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">
                {selectedTab === 'active' 
                  ? "You don't have any active jobs." 
                  : "You don't have any completed jobs yet."}
              </p>
              {selectedTab === 'active' && (
                <Button onClick={() => navigate('/recruiter/post-job')}>
                  Post Your First Job
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayJobs.map((job) => (
                <JobCard key={job.id} job={job} showApplyButton={false} />
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default RecruiterDashboard;
