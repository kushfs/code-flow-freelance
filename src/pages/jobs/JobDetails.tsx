
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { getJobById, getApplicationsByJobId } from '@/services/mockDataService';
import { Job, UserRole, ApplicationStatus } from '@/types';
import { useToast } from '@/components/ui/use-toast';

const JobDetails = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if current user has already applied
  const hasApplied = user?.role === UserRole.DEVELOPER && 
    job?.applications?.some(app => app.developerId === user.id);
  
  // Check if current user is the recruiter who posted the job
  const isRecruiter = user?.id === job?.recruiterId;

  useEffect(() => {
    if (jobId) {
      const jobData = getJobById(jobId);
      
      if (jobData) {
        setJob(jobData);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Job not found",
        });
        navigate('/jobs');
      }
      
      setLoading(false);
    }
  }, [jobId, navigate, toast]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <div className="text-center">Loading job details...</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!job) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <div className="text-center">Job not found</div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Job Header */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{job.title}</h1>
              <Badge variant={job.status === 'open' ? 'default' : 'outline'} className="ml-2">
                {job.status === 'open' ? 'Open' : job.status === 'in_progress' ? 'In Progress' : 'Completed'}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-y-2 text-sm text-gray-600">
              <div className="flex items-center mr-4">
                <span className="font-medium">Posted on:</span>
                <span className="ml-1">{formatDate(job.createdAt)}</span>
              </div>
              <div className="flex items-center mr-4">
                <span className="font-medium">Budget:</span>
                <span className="ml-1">${job.budget.toLocaleString()}</span>
              </div>
              {job.duration && (
                <div className="flex items-center mr-4">
                  <span className="font-medium">Duration:</span>
                  <span className="ml-1">{job.duration}</span>
                </div>
              )}
              {job.location && (
                <div className="flex items-center">
                  <span className="font-medium">Location:</span>
                  <span className="ml-1">{job.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Column - Job Details */}
            <div className="md:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                    <div className="whitespace-pre-line">{job.description}</div>

                    <h3 className="text-lg font-semibold mt-6 mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {job.requiredSkills.map((skill, index) => (
                        <Badge key={index} variant="outline">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Recruiter Info & Actions */}
            <div>
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">About the Recruiter</h3>
                  <div className="mb-4">
                    <div className="font-medium">{job.recruiter?.name}</div>
                    {job.recruiter?.company && (
                      <div className="text-gray-600">{job.recruiter.company}</div>
                    )}
                    {job.recruiter?.location && (
                      <div className="text-gray-600">{job.recruiter.location}</div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Actions Card */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-3">Actions</h3>
                  
                  {user ? (
                    <>
                      {user.role === UserRole.DEVELOPER && (
                        <>
                          {job.status === 'open' ? (
                            hasApplied ? (
                              <div className="text-gray-600 mb-4">
                                You have already applied for this job.
                              </div>
                            ) : (
                              <Button 
                                className="w-full mb-3"
                                onClick={() => navigate(`/jobs/${job.id}/apply`)}
                              >
                                Apply for this Job
                              </Button>
                            )
                          ) : (
                            <div className="text-gray-600 mb-4">
                              This job is no longer accepting applications.
                            </div>
                          )}
                        </>
                      )}
                      
                      {isRecruiter && (
                        <Button 
                          className="w-full mb-3"
                          onClick={() => navigate(`/recruiter/jobs/${job.id}/applications`)}
                        >
                          View Applications ({job.applications?.length || 0})
                        </Button>
                      )}
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate('/jobs')}
                      >
                        Back to All Jobs
                      </Button>
                    </>
                  ) : (
                    <>
                      <div className="text-gray-600 mb-4">
                        You need to be logged in to apply for this job.
                      </div>
                      <Button 
                        className="w-full mb-3"
                        onClick={() => navigate('/login')}
                      >
                        Log In to Apply
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => navigate('/register')}
                      >
                        Create an Account
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobDetails;
