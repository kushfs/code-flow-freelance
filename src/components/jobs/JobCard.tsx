
import { Link } from 'react-router-dom';
import { Job } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface JobCardProps {
  job: Job;
  showApplyButton?: boolean;
}

const JobCard = ({ job, showApplyButton = true }: JobCardProps) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Truncate description if it's too long
  const truncateDescription = (description: string, maxLength = 150) => {
    if (description.length <= maxLength) return description;
    return `${description.substring(0, maxLength)}...`;
  };

  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">
            <Link to={`/jobs/${job.id}`} className="hover:text-brand-600 hover:underline">
              {job.title}
            </Link>
          </h3>
          <Badge variant={job.status === 'open' ? 'default' : 'outline'} className="ml-2">
            {job.status === 'open' ? 'Open' : job.status === 'in_progress' ? 'In Progress' : 'Completed'}
          </Badge>
        </div>

        <div className="mb-4">
          <div className="flex items-center text-sm text-gray-600 mb-1">
            <span className="mr-2">Posted by:</span>
            <span className="font-medium">{job.recruiter?.name || 'Unknown'}</span>
            {job.recruiter?.company && (
              <span className="ml-1">({job.recruiter.company})</span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <span className="mr-2">Posted:</span>
            <span>{formatDate(job.createdAt)}</span>
            {job.location && (
              <>
                <span className="mx-2">•</span>
                <span>{job.location}</span>
              </>
            )}
          </div>
        </div>

        <p className="text-gray-700 mb-4">{truncateDescription(job.description)}</p>

        <div className="mb-2">
          <div className="text-sm font-medium text-gray-700">Required Skills:</div>
          <div className="flex flex-wrap gap-1 mt-1">
            {job.requiredSkills.map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs font-normal">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div className="font-medium text-gray-900">${job.budget.toLocaleString()}</div>
        <div className="flex space-x-2">
          <Link to={`/jobs/${job.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>
          {showApplyButton && job.status === 'open' && (
            <Link to={`/jobs/${job.id}/apply`}>
              <Button size="sm">
                Apply Now
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default JobCard;
