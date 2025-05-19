
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { getJobById, addApplication, getApplicationsByDeveloperId } from '@/services/mockDataService';
import { Job, UserRole } from '@/types';
import { useToast } from '@/components/ui/use-toast';

const JobApplication = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [proposal, setProposal] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Redirect if not logged in or not a developer
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (user.role !== UserRole.DEVELOPER) {
      navigate('/');
      return;
    }
    
    if (jobId) {
      const jobData = getJobById(jobId);
      
      if (jobData) {
        // Check if job is still open
        if (jobData.status !== 'open') {
          toast({
            variant: "destructive",
            title: "Error",
            description: "This job is no longer accepting applications.",
          });
          navigate(`/jobs/${jobId}`);
          return;
        }
        
        // Check if user has already applied
        const developerApplications = getApplicationsByDeveloperId(user.id);
        const hasApplied = developerApplications.some(app => app.jobId === jobId);
        
        if (hasApplied) {
          toast({
            variant: "destructive",
            title: "Already Applied",
            description: "You have already applied for this job.",
          });
          navigate(`/jobs/${jobId}`);
          return;
        }
        
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
  }, [jobId, user, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!user || !job) {
      setError('You must be logged in to apply');
      return;
    }
    
    if (!proposal.trim()) {
      setError('Please provide a proposal');
      return;
    }
    
    setSubmitting(true);
    
    try {
      addApplication({
        jobId: job.id,
        developerId: user.id,
        proposal: proposal.trim(),
      });
      
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted.",
      });
      
      navigate(`/jobs/${jobId}`);
    } catch (error) {
      setError('Failed to submit application. Please try again.');
      console.error('Error submitting application:', error);
    } finally {
      setSubmitting(false);
    }
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
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Apply for: {job.title}</h1>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="mb-2">
                <span className="font-semibold">Budget:</span>{' '}
                <span>${job.budget.toLocaleString()}</span>
              </div>
              {job.duration && (
                <div className="mb-2">
                  <span className="font-semibold">Duration:</span>{' '}
                  <span>{job.duration}</span>
                </div>
              )}
              <div className="mb-4">
                <span className="font-semibold">Posted by:</span>{' '}
                <span>{job.recruiter?.name}</span>
                {job.recruiter?.company && (
                  <span> ({job.recruiter.company})</span>
                )}
              </div>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-2">Job Description:</h3>
                <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold mb-4">Your Proposal</h2>
              
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <Label htmlFor="proposal" className="block mb-2">
                    Explain why you're a good fit for this job
                  </Label>
                  <Textarea
                    id="proposal"
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    placeholder="Describe your experience, skills, and why you're interested in this job..."
                    rows={8}
                    required
                  />
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate(`/jobs/${jobId}`)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default JobApplication;
