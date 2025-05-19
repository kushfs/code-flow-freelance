
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getApplicationsByDeveloperId, getCompletedJobsByDeveloperId, getEarningsByDeveloperId } from '@/services/mockDataService';
import { ApplicationStatus } from '@/types';

const DeveloperDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [selectedTab, setSelectedTab] = useState<'applications' | 'jobs'>('applications');
  
  if (!user) {
    return null;
  }
  
  // Get developer's applications
  const applications = getApplicationsByDeveloperId(user.id);
  
  // Get completed jobs
  const completedJobs = getCompletedJobsByDeveloperId(user.id);
  
  // Get earnings
  const earnings = getEarningsByDeveloperId(user.id);
  
  // Calculate statistics
  const totalApplications = applications.length;
  const acceptedApplications = applications.filter(app => app.status === ApplicationStatus.ACCEPTED).length;
  const completedJobsCount = completedJobs.length;
  
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Welcome, {user.name}!</h1>
          <p className="text-gray-600">Find jobs, track your applications, and manage your projects all in one place.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-gray-500">Total Applications</div>
              <div className="text-2xl font-bold mt-1">{totalApplications}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-gray-500">Accepted Applications</div>
              <div className="text-2xl font-bold mt-1">{acceptedApplications}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-gray-500">Completed Jobs</div>
              <div className="text-2xl font-bold mt-1">{completedJobsCount}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-sm font-medium text-gray-500">Total Earnings</div>
              <div className="text-2xl font-bold mt-1">${earnings.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Quick Actions */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <h2 className="text-lg font-medium mb-4">Quick Actions</h2>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => navigate('/developer/jobs')}>
                Find Jobs
              </Button>
              <Button variant="outline" onClick={() => navigate('/developer/applications')}>
                My Applications
              </Button>
              <Button variant="outline" onClick={() => navigate('/profile')}>
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Applications/Jobs Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedTab('applications')}
                className={`pb-2 font-medium ${
                  selectedTab === 'applications' 
                    ? 'text-brand-600 border-b-2 border-brand-600' 
                    : 'text-gray-600'
                }`}
              >
                Recent Applications
              </button>
              <button
                onClick={() => setSelectedTab('jobs')}
                className={`pb-2 font-medium ${
                  selectedTab === 'jobs' 
                    ? 'text-brand-600 border-b-2 border-brand-600' 
                    : 'text-gray-600'
                }`}
              >
                Completed Jobs
              </button>
            </div>
            
            <Link to={selectedTab === 'applications' ? '/developer/applications' : '/developer/completed-jobs'}>
              <Button variant="ghost">View All</Button>
            </Link>
          </div>
          
          {(selectedTab === 'applications' && applications.length === 0) || 
           (selectedTab === 'jobs' && completedJobs.length === 0) ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">
                {selectedTab === 'applications' 
                  ? "You haven't applied to any jobs yet." 
                  : "You don't have any completed jobs yet."}
              </p>
              {selectedTab === 'applications' && (
                <Button onClick={() => navigate('/developer/jobs')}>
                  Browse Available Jobs
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {selectedTab === 'applications' ? (
                // Recent Applications
                applications.slice(0, 5).map((application) => (
                  <Card key={application.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold mb-1">
                            <Link to={`/jobs/${application.jobId}`} className="hover:text-brand-600 hover:underline">
                              {/* In a real app, we would get the job title here */}
                              Job Application
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-600">
                            Applied on {new Date(application.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={
                          application.status === ApplicationStatus.ACCEPTED ? 'default' : 
                          application.status === ApplicationStatus.REJECTED ? 'destructive' : 
                          'outline'
                        }>
                          {application.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                // Completed Jobs
                completedJobs.slice(0, 5).map((job) => (
                  <Card key={job.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold mb-1">
                            <Link to={`/jobs/${job.id}`} className="hover:text-brand-600 hover:underline">
                              {job.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray-600">
                            Completed job for {job.recruiter?.name || 'Unknown recruiter'}
                          </p>
                        </div>
                        <div className="font-medium">${job.budget.toLocaleString()}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default DeveloperDashboard;
