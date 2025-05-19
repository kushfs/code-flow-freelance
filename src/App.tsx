
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import JobListing from "./pages/jobs/JobListing";
import JobDetails from "./pages/jobs/JobDetails";
import JobApplication from "./pages/jobs/JobApplication";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import PostJob from "./pages/recruiter/PostJob";
import DeveloperDashboard from "./pages/developer/DeveloperDashboard";
import NotFound from "./pages/NotFound";
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import MyApplications from "./pages/developer/MyApplications";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { UserRole } from "./types";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/jobs" element={<JobListing />} />
            <Route path="/jobs/:jobId" element={<JobDetails />} />
            
            {/* Profile Routes */}
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile/edit" 
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              } 
            />
            
            {/* Developer Routes */}
            <Route 
              path="/jobs/:jobId/apply" 
              element={
                <ProtectedRoute allowedRoles={[UserRole.DEVELOPER]}>
                  <JobApplication />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/developer/dashboard" 
              element={
                <ProtectedRoute allowedRoles={[UserRole.DEVELOPER]}>
                  <DeveloperDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/developer/jobs" 
              element={
                <ProtectedRoute allowedRoles={[UserRole.DEVELOPER]}>
                  <JobListing />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/developer/applications" 
              element={
                <ProtectedRoute allowedRoles={[UserRole.DEVELOPER]}>
                  <MyApplications />
                </ProtectedRoute>
              } 
            />
            
            {/* Recruiter Routes */}
            <Route 
              path="/recruiter/dashboard" 
              element={
                <ProtectedRoute allowedRoles={[UserRole.RECRUITER]}>
                  <RecruiterDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recruiter/post-job" 
              element={
                <ProtectedRoute allowedRoles={[UserRole.RECRUITER]}>
                  <PostJob />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/recruiter/applications" 
              element={
                <ProtectedRoute allowedRoles={[UserRole.RECRUITER]}>
                  <MyApplications />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
