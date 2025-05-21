
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { addJob } from '@/services/mockDataService';
import { JobStatus } from '@/types';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const JobPostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('Remote');
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAddSkill = () => {
    if (skill && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((s) => s !== skillToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to post a job",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Prepare job data
      const jobData = {
        title,
        description,
        required_skills: skills,
        budget: parseFloat(budget),
        duration,
        status: 'open',
        recruiter_id: user.id,
        location,
      };
      
      console.log("Submitting job with data:", jobData);
      
      // Insert into Supabase
      const { data: jobResult, error } = await supabase
        .from('jobs')
        .insert(jobData)
        .select()
        .single();
      
      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }
      
      console.log("Job posted successfully:", jobResult);
      
      toast({
        title: "Job Posted",
        description: "Your job has been successfully posted.",
      });
      
      // Navigate to the job details page
      if (jobResult) {
        navigate(`/jobs/${jobResult.id}`);
      } else {
        throw new Error("Failed to retrieve job data after posting");
      }
    } catch (error) {
      console.error('Error posting job:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error posting your job. Using fallback method.",
      });
      
      // Fallback to mock data
      const newJob = addJob({
        title,
        description,
        requiredSkills: skills,
        budget: parseFloat(budget),
        duration,
        status: JobStatus.OPEN,
        recruiterId: user.id,
        location,
      });
      
      navigate(`/jobs/${newJob.id}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-xl font-semibold mb-6">Post a New Job</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., React Developer for E-commerce Project"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Job Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the job requirements, responsibilities, and any other relevant details..."
              rows={6}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="budget">Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="e.g., 5000"
                min="0"
                step="100"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="duration">Duration (optional)</Label>
              <Input
                id="duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 2 months"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Remote, New York, etc."
            />
          </div>
          
          <div>
            <Label htmlFor="skills">Required Skills</Label>
            <div className="flex space-x-2">
              <Input
                id="skills"
                value={skill}
                onChange={(e) => setSkill(e.target.value)}
                placeholder="e.g., React"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <Button type="button" onClick={handleAddSkill} variant="outline">
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="px-2 py-1">
                  {skill}
                  <button
                    type="button"
                    className="ml-2 text-gray-500 hover:text-gray-700"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    &times;
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post Job"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobPostForm;
