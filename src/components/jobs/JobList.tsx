
import { useState, useMemo } from 'react';
import JobCard from './JobCard';
import { Job } from '@/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface JobListProps {
  jobs: Job[];
  showApplyButton?: boolean;
}

const JobList = ({ jobs, showApplyButton = true }: JobListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');

  // Extract unique skills from all jobs
  const allSkills = useMemo(() => {
    const skillSet = new Set<string>();
    jobs.forEach(job => {
      job.requiredSkills.forEach(skill => skillSet.add(skill));
    });
    return Array.from(skillSet).sort();
  }, [jobs]);

  // Filter and sort jobs
  const filteredJobs = useMemo(() => {
    let result = [...jobs];
    
    // Filter by search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(lowerSearchTerm) || 
        job.description.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Filter by skill
    if (skillFilter) {
      result = result.filter(job => 
        job.requiredSkills.some(skill => 
          skill.toLowerCase() === skillFilter.toLowerCase()
        )
      );
    }
    
    // Sort jobs
    result.sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortOrder === 'oldest') {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortOrder === 'budget_high') {
        return b.budget - a.budget;
      } else {
        return a.budget - b.budget;
      }
    });
    
    return result;
  }, [jobs, searchTerm, skillFilter, sortOrder]);

  return (
    <div>
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="search" className="text-sm font-medium text-gray-700 block mb-1">
              Search
            </label>
            <Input
              id="search"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="skill" className="text-sm font-medium text-gray-700 block mb-1">
              Filter by Skill
            </label>
            <Select value={skillFilter} onValueChange={setSkillFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All skills" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All skills</SelectItem>
                {allSkills.map((skill) => (
                  <SelectItem key={skill} value={skill}>
                    {skill}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="sort" className="text-sm font-medium text-gray-700 block mb-1">
              Sort by
            </label>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger>
                <SelectValue placeholder="Newest first" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest first</SelectItem>
                <SelectItem value="oldest">Oldest first</SelectItem>
                <SelectItem value="budget_high">Budget: High to low</SelectItem>
                <SelectItem value="budget_low">Budget: Low to high</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No jobs found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} showApplyButton={showApplyButton} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
