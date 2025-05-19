
import MainLayout from '@/components/layout/MainLayout';
import JobPostForm from '@/components/jobs/JobPostForm';

const PostJob = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
          <JobPostForm />
        </div>
      </div>
    </MainLayout>
  );
};

export default PostJob;
