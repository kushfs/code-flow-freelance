
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserRole } from '@/types';
import { supabase } from '@/integrations/supabase/client';

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: user?.location || '',
    bio: user?.bio || '',
    skills: user?.skills ? user?.skills.join(', ') : '',
    hourlyRate: user?.hourlyRate ? String(user?.hourlyRate) : '',
    experience: user?.experience || '',
    company: user?.company || '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        location: user.location || '',
        bio: user.bio || '',
        skills: user.skills ? user.skills.join(', ') : '',
        hourlyRate: user.hourlyRate ? String(user.hourlyRate) : '',
        experience: user.experience || '',
        company: user.company || '',
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to update your profile",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const nameParts = formData.name.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
      const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(Boolean);
      const yearsExperience = formData.experience ? 
        parseInt(formData.experience.replace(/[^0-9]/g, '')) : 
        null;
      
      // Try to update in Supabase
      const { error } = await supabase
        .from('users')
        .update({
          first_name: firstName,
          last_name: lastName,
          location: formData.location,
          bio: formData.bio,
          skills: skillsArray,
          hourly_rate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : null,
          years_experience: yearsExperience,
          company: formData.company,
        })
        .eq('id', user.id);
      
      if (error) {
        console.error('Error updating profile:', error);
      }
      
      // Update local storage for demo mode
      const updatedUser = {
        ...user,
        name: formData.name,
        location: formData.location,
        bio: formData.bio,
        skills: skillsArray,
        hourlyRate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : undefined,
        experience: formData.experience,
        company: formData.company,
      };
      
      localStorage.setItem('freelance_user', JSON.stringify(updatedUser));
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      
      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Common fields for both roles */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                  />
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us about yourself..."
                />
              </div>

              {/* Developer-specific fields */}
              {user.role === UserRole.DEVELOPER && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="skills">Skills (comma separated)</Label>
                      <Input 
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        placeholder="React, TypeScript, Node.js..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                      <Input 
                        id="hourlyRate"
                        name="hourlyRate"
                        type="number"
                        value={formData.hourlyRate}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Experience</Label>
                      <Input 
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        placeholder="5 years"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Recruiter-specific fields */}
              {user.role === UserRole.RECRUITER && (
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input 
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <Button type="button" variant="outline" onClick={() => navigate('/profile')}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EditProfile;
