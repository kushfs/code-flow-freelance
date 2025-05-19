
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

// Mock application data
const mockApplications = [
  {
    id: 'app1',
    jobId: 'job1',
    jobTitle: 'Senior React Developer',
    company: 'TechCorp',
    appliedDate: new Date(2025, 4, 10),
    status: 'pending',
    proposal: 'I am interested in this position and believe my 5 years of React experience makes me a good fit.'
  },
  {
    id: 'app2',
    jobId: 'job2',
    jobTitle: 'Frontend Engineer',
    company: 'StartupX',
    appliedDate: new Date(2025, 4, 8),
    status: 'accepted',
    proposal: 'With my experience in React and TypeScript, I can contribute immediately to your project.'
  },
  {
    id: 'app3',
    jobId: 'job3',
    jobTitle: 'Full Stack Developer',
    company: 'InnovateNow',
    appliedDate: new Date(2025, 4, 5),
    status: 'rejected',
    proposal: 'I have extensive experience with both frontend and backend technologies.'
  }
];

// Mock job applications data for recruiters
const mockRecruiterApplications = [
  {
    id: 'app4',
    jobId: 'job4',
    jobTitle: 'UI Designer',
    applicantName: 'Jane Developer',
    applicantEmail: 'jane@example.com',
    appliedDate: new Date(2025, 4, 12),
    status: 'pending',
    proposal: 'I have 3 years of UI/UX design experience and would love to join your team.'
  },
  {
    id: 'app5',
    jobId: 'job5',
    jobTitle: 'Backend Developer',
    applicantName: 'John Coder',
    applicantEmail: 'john@example.com',
    appliedDate: new Date(2025, 4, 11),
    status: 'accepted',
    proposal: 'I specialize in Node.js and have built several production APIs.'
  }
];

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // In a real app, fetch applications from API
    // For now, use mock data
    if (user?.role === UserRole.DEVELOPER) {
      setApplications(mockApplications);
    } else if (user?.role === UserRole.RECRUITER) {
      setApplications(mockRecruiterApplications);
    }
  }, [user]);

  if (!user) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'accepted':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {user.role === UserRole.DEVELOPER ? 'My Applications' : 'Applications to My Jobs'}
          </h1>

          {applications.length === 0 ? (
            <Card>
              <CardContent className="py-12">
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No applications found</h3>
                  <p className="text-gray-600 mb-6">
                    {user.role === UserRole.DEVELOPER 
                      ? "You haven't applied to any jobs yet." 
                      : "You don't have any applications for your job postings yet."}
                  </p>
                  <Link to={user.role === UserRole.DEVELOPER ? "/jobs" : "/recruiter/post-job"}>
                    <Button>
                      {user.role === UserRole.DEVELOPER ? "Browse Jobs" : "Post a Job"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {applications.map((app: any) => (
                <Card key={app.id}>
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>
                          {app.jobTitle}
                        </CardTitle>
                        <CardDescription>
                          {user.role === UserRole.DEVELOPER 
                            ? `${app.company} • Applied on ${format(app.appliedDate, 'MMMM d, yyyy')}` 
                            : `From: ${app.applicantName} • Applied on ${format(app.appliedDate, 'MMMM d, yyyy')}`}
                        </CardDescription>
                      </div>
                      <div>{getStatusBadge(app.status)}</div>
                    </div>
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-4">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium text-gray-900 mb-2">Proposal</h3>
                      <p className="text-gray-700">{app.proposal}</p>
                    </div>
                    
                    <div className="flex justify-end gap-3">
                      <Link to={`/jobs/${app.jobId}`}>
                        <Button variant="outline">View Job</Button>
                      </Link>
                      {user.role === UserRole.RECRUITER && app.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button variant="outline" className="text-green-600 hover:bg-green-50">Accept</Button>
                          <Button variant="outline" className="text-red-600 hover:bg-red-50">Decline</Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyApplications;
