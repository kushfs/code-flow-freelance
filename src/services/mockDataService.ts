
import { Job, Application, User, JobStatus, ApplicationStatus, UserRole, Payment, Review } from '../types';

// Sample recruiter users
const recruiters: User[] = [
  {
    id: 'r1',
    name: 'John Recruiter',
    email: 'recruiter@example.com',
    role: UserRole.RECRUITER,
    company: 'TechCorp',
    location: 'New York',
    createdAt: new Date('2023-01-15')
  },
  {
    id: 'r2',
    name: 'Sarah Hiring',
    email: 'sarah@techhire.com',
    role: UserRole.RECRUITER,
    company: 'TechHire',
    location: 'Boston',
    createdAt: new Date('2022-11-05')
  }
];

// Sample developer users
const developers: User[] = [
  {
    id: 'd1',
    name: 'Jane Developer',
    email: 'developer@example.com',
    role: UserRole.DEVELOPER,
    skills: ['React', 'TypeScript', 'Node.js'],
    experience: '5 years',
    hourlyRate: 50,
    location: 'San Francisco',
    bio: 'Full stack developer with expertise in React and Node.js',
    createdAt: new Date('2022-09-20')
  },
  {
    id: 'd2',
    name: 'Mike Coder',
    email: 'mike@coder.dev',
    role: UserRole.DEVELOPER,
    skills: ['Python', 'Django', 'PostgreSQL'],
    experience: '3 years',
    hourlyRate: 45,
    location: 'Chicago',
    bio: 'Backend developer specialized in Python and data engineering',
    createdAt: new Date('2023-02-10')
  },
  {
    id: 'd3',
    name: 'Alex Designer',
    email: 'alex@uidesign.co',
    role: UserRole.DEVELOPER,
    skills: ['UI/UX', 'Figma', 'React', 'CSS'],
    experience: '4 years',
    hourlyRate: 55,
    location: 'Los Angeles',
    bio: 'Frontend developer with strong design background',
    createdAt: new Date('2022-12-05')
  }
];

// Sample jobs
const jobs: Job[] = [
  {
    id: 'j1',
    title: 'React Developer for SaaS Platform',
    description: 'Looking for an experienced React developer to build out new features for our SaaS platform. The project involves implementing a dashboard with various data visualizations and interactive components.',
    requiredSkills: ['React', 'TypeScript', 'CSS'],
    budget: 5000,
    duration: '2 months',
    status: JobStatus.OPEN,
    recruiterId: 'r1',
    location: 'Remote',
    createdAt: new Date('2025-05-01')
  },
  {
    id: 'j2',
    title: 'Backend Developer for API Development',
    description: 'We need a backend developer to create RESTful APIs for our mobile application. The ideal candidate should have experience with Node.js and MongoDB.',
    requiredSkills: ['Node.js', 'Express', 'MongoDB'],
    budget: 4000,
    duration: '1.5 months',
    status: JobStatus.OPEN,
    recruiterId: 'r2',
    location: 'Remote',
    createdAt: new Date('2025-05-05')
  },
  {
    id: 'j3',
    title: 'Full Stack Developer for E-commerce Site',
    description: 'Looking for a full stack developer to help build our e-commerce platform. The project involves frontend work with React and backend work with Node.js and PostgreSQL.',
    requiredSkills: ['React', 'Node.js', 'PostgreSQL'],
    budget: 7000,
    duration: '3 months',
    status: JobStatus.OPEN,
    recruiterId: 'r1',
    location: 'Hybrid - New York',
    createdAt: new Date('2025-05-10')
  },
  {
    id: 'j4',
    title: 'UI/UX Developer for Mobile App',
    description: 'We are seeking a UI/UX developer who can help improve the user experience of our mobile application. The candidate should have experience with mobile design principles and React Native.',
    requiredSkills: ['UI/UX', 'React Native', 'Figma'],
    budget: 3500,
    duration: '1 month',
    status: JobStatus.IN_PROGRESS,
    recruiterId: 'r2',
    location: 'Remote',
    createdAt: new Date('2025-05-02')
  },
  {
    id: 'j5',
    title: 'Python Developer for Data Analysis',
    description: 'We need a Python developer to create data analysis scripts and visualizations for our marketing team. Experience with pandas, numpy, and matplotlib is required.',
    requiredSkills: ['Python', 'pandas', 'Data Visualization'],
    budget: 3000,
    duration: '1 month',
    status: JobStatus.COMPLETED,
    recruiterId: 'r1',
    location: 'Remote',
    createdAt: new Date('2025-04-15')
  }
];

// Sample applications
const applications: Application[] = [
  {
    id: 'a1',
    jobId: 'j1',
    developerId: 'd1',
    proposal: 'I have extensive experience with React and TypeScript, and I have built several dashboards with complex data visualizations. I am confident I can deliver this project successfully.',
    status: ApplicationStatus.PENDING,
    createdAt: new Date('2025-05-02')
  },
  {
    id: 'a2',
    jobId: 'j2',
    developerId: 'd2',
    proposal: 'I specialize in Node.js and MongoDB development, and I have created many RESTful APIs for various clients. I am very interested in this project.',
    status: ApplicationStatus.ACCEPTED,
    createdAt: new Date('2025-05-06')
  },
  {
    id: 'a3',
    jobId: 'j3',
    developerId: 'd1',
    proposal: 'As a full stack developer with expertise in both React and Node.js, I believe I am a perfect fit for this project. I also have experience with PostgreSQL.',
    status: ApplicationStatus.PENDING,
    createdAt: new Date('2025-05-11')
  },
  {
    id: 'a4',
    jobId: 'j4',
    developerId: 'd3',
    proposal: 'I have a strong background in UI/UX design and development, particularly for mobile applications. I would love to help improve your app\'s user experience.',
    status: ApplicationStatus.ACCEPTED,
    createdAt: new Date('2025-05-03')
  }
];

// Sample payments
const payments: Payment[] = [
  {
    id: 'p1',
    jobId: 'j5',
    amount: 3000,
    commission: 300, // 10% commission
    status: 'completed',
    developerId: 'd2',
    recruiterId: 'r1',
    createdAt: new Date('2025-05-10')
  },
  {
    id: 'p2',
    jobId: 'j4',
    amount: 1750, // 50% upfront payment
    commission: 175, // 10% commission
    status: 'completed',
    developerId: 'd3',
    recruiterId: 'r2',
    createdAt: new Date('2025-05-05')
  }
];

// Sample reviews
const reviews: Review[] = [
  {
    id: 'rv1',
    fromUserId: 'r1',
    toUserId: 'd2',
    rating: 5,
    comment: 'Excellent work! Delivered the project on time and with high quality. Would definitely hire again.',
    jobId: 'j5',
    createdAt: new Date('2025-05-11')
  }
];

// Helper function to get all users
export const getAllUsers = (): User[] => {
  return [...recruiters, ...developers];
};

// Helper function to get user by ID
export const getUserById = (userId: string): User | undefined => {
  return getAllUsers().find(user => user.id === userId);
};

// Helper function to get all jobs
export const getAllJobs = (): Job[] => {
  return jobs.map(job => ({
    ...job,
    recruiter: getUserById(job.recruiterId) as User,
    applications: getApplicationsByJobId(job.id)
  }));
};

// Helper function to get jobs by recruiter ID
export const getJobsByRecruiterId = (recruiterId: string): Job[] => {
  return getAllJobs().filter(job => job.recruiterId === recruiterId);
};

// Helper function to get all applications
export const getAllApplications = (): Application[] => {
  return applications.map(app => ({
    ...app,
    developer: getUserById(app.developerId) as User
  }));
};

// Helper function to get applications by job ID
export const getApplicationsByJobId = (jobId: string): Application[] => {
  return getAllApplications().filter(app => app.jobId === jobId);
};

// Helper function to get applications by developer ID
export const getApplicationsByDeveloperId = (developerId: string): Application[] => {
  return getAllApplications().filter(app => app.developerId === developerId);
};

// Helper function to get job by ID
export const getJobById = (jobId: string): Job | undefined => {
  const job = jobs.find(job => job.id === jobId);
  if (job) {
    return {
      ...job,
      recruiter: getUserById(job.recruiterId) as User,
      applications: getApplicationsByJobId(job.id)
    };
  }
  return undefined;
};

// Helper function to get payment by job ID
export const getPaymentByJobId = (jobId: string): Payment | undefined => {
  return payments.find(payment => payment.jobId === jobId);
};

// Helper function to get reviews for a user
export const getReviewsForUser = (userId: string): Review[] => {
  return reviews.filter(review => review.toUserId === userId);
};

// Helper function to add a new job
export const addJob = (job: Omit<Job, 'id' | 'createdAt'>): Job => {
  const newJob: Job = {
    ...job,
    id: `j${jobs.length + 1}`,
    createdAt: new Date(),
  };
  
  jobs.push(newJob);
  return newJob;
};

// Helper function to add a new application
export const addApplication = (application: Omit<Application, 'id' | 'createdAt' | 'status'>): Application => {
  const newApplication: Application = {
    ...application,
    id: `a${applications.length + 1}`,
    createdAt: new Date(),
    status: ApplicationStatus.PENDING,
  };
  
  applications.push(newApplication);
  return newApplication;
};

// Helper function to update application status
export const updateApplicationStatus = (applicationId: string, status: ApplicationStatus): Application | undefined => {
  const applicationIndex = applications.findIndex(app => app.id === applicationId);
  if (applicationIndex !== -1) {
    applications[applicationIndex].status = status;
    if (status === ApplicationStatus.ACCEPTED) {
      // If accepted, update job status
      const jobId = applications[applicationIndex].jobId;
      const jobIndex = jobs.findIndex(job => job.id === jobId);
      if (jobIndex !== -1) {
        jobs[jobIndex].status = JobStatus.IN_PROGRESS;
      }
    }
    return applications[applicationIndex];
  }
  return undefined;
};

// Helper function to complete a job
export const completeJob = (jobId: string, rating: number, comment: string): boolean => {
  const jobIndex = jobs.findIndex(job => job.id === jobId);
  if (jobIndex !== -1) {
    jobs[jobIndex].status = JobStatus.COMPLETED;
    
    // Create payment record
    const job = jobs[jobIndex];
    const application = applications.find(app => app.jobId === jobId && app.status === ApplicationStatus.ACCEPTED);
    
    if (application) {
      const commission = job.budget * 0.1; // 10% commission
      const newPayment: Payment = {
        id: `p${payments.length + 1}`,
        jobId,
        amount: job.budget,
        commission,
        status: 'completed',
        developerId: application.developerId,
        recruiterId: job.recruiterId,
        createdAt: new Date()
      };
      payments.push(newPayment);
      
      // Create review
      const newReview: Review = {
        id: `rv${reviews.length + 1}`,
        fromUserId: job.recruiterId,
        toUserId: application.developerId,
        rating,
        comment,
        jobId,
        createdAt: new Date()
      };
      reviews.push(newReview);
      
      return true;
    }
  }
  return false;
};

// Helper function to get completed jobs by recruiter
export const getCompletedJobsByRecruiterId = (recruiterId: string): Job[] => {
  return getAllJobs().filter(job => job.recruiterId === recruiterId && job.status === JobStatus.COMPLETED);
};

// Helper function to get completed jobs by developer
export const getCompletedJobsByDeveloperId = (developerId: string): Job[] => {
  const developerApplications = getApplicationsByDeveloperId(developerId).filter(app => app.status === ApplicationStatus.ACCEPTED);
  return developerApplications.map(app => getJobById(app.jobId)!).filter(job => job.status === JobStatus.COMPLETED);
};

// Helper function to get earnings by developer
export const getEarningsByDeveloperId = (developerId: string): number => {
  return payments
    .filter(payment => payment.developerId === developerId && payment.status === 'completed')
    .reduce((total, payment) => total + (payment.amount - payment.commission), 0);
};

// Helper function to get total commission earned
export const getTotalCommission = (): number => {
  return payments
    .filter(payment => payment.status === 'completed')
    .reduce((total, payment) => total + payment.commission, 0);
};
