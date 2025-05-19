
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">My Profile</CardTitle>
                <CardDescription>Your personal information</CardDescription>
              </div>
              <Link to="/profile/edit">
                <Button variant="outline">Edit Profile</Button>
              </Link>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="text-2xl bg-brand-100 text-brand-600">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Profile Details */}
              <div className="flex-grow space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <p className="text-gray-500">
                    {user.role === UserRole.DEVELOPER ? 'Developer' : 'Recruiter'}
                    {user.role === UserRole.DEVELOPER && user.experience && ` · ${user.experience}`}
                    {user.location && ` · ${user.location}`}
                  </p>
                </div>

                {user.bio && (
                  <div>
                    <h3 className="font-medium text-gray-900">About</h3>
                    <p className="text-gray-700 mt-1">{user.bio}</p>
                  </div>
                )}

                {/* Developer-specific information */}
                {user.role === UserRole.DEVELOPER && (
                  <>
                    {user.skills && user.skills.length > 0 && (
                      <div>
                        <h3 className="font-medium text-gray-900">Skills</h3>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {user.skills.map((skill, index) => (
                            <span 
                              key={index} 
                              className="bg-brand-50 text-brand-700 text-sm px-3 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {user.hourlyRate && (
                      <div>
                        <h3 className="font-medium text-gray-900">Hourly Rate</h3>
                        <p className="text-gray-700 mt-1">${user.hourlyRate}/hour</p>
                      </div>
                    )}
                  </>
                )}

                {/* Recruiter-specific information */}
                {user.role === UserRole.RECRUITER && user.company && (
                  <div>
                    <h3 className="font-medium text-gray-900">Company</h3>
                    <p className="text-gray-700 mt-1">{user.company}</p>
                  </div>
                )}

                <Separator />

                <div>
                  <h3 className="font-medium text-gray-900">Contact Information</h3>
                  <div className="mt-1 space-y-1">
                    <p className="text-gray-700">Email: {user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Profile;
