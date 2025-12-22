import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentProvider } from "@/contexts/StudentContext";
import { ProtectedStudentRoute } from "@/components/auth/ProtectedStudentRoute";
import { ProtectedSeekerRoute } from "@/components/auth/ProtectedSeekerRoute";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import LoginStudent from "./pages/LoginStudent";
import LoginSeeker from "./pages/LoginSeeker";
import LoginInstructor from "./pages/LoginInstructor";
import SignUpStudent from "./pages/SignUpStudent";
import SignUpSeeker from "./pages/SignUpSeeker";
import SignUpInstructor from "./pages/SignUpInstructor";
import DashboardStudent from "./pages/DashboardStudent";
import DashboardSeeker from "./pages/DashboardSeeker";
import DashboardInstructor from "./pages/DashboardInstructor";
import StudentCommunity from "./pages/StudentCommunity";
import StudentPortfolio from "./pages/StudentPortfolio";
import StudentPortfolioEdit from "./pages/StudentPortfolioEdit";
import StudentNotebook from "./pages/StudentNotebook";
import Portfolio from "./pages/Portfolio";
import StudentForum from "./pages/StudentForum";
import StudentForumPost from "./pages/StudentForumPost";
import Chat from "./pages/Chat";
import RealtimeChat from "./pages/RealtimeChat";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Safety from "./pages/Safety";
import ForUniversities from "./pages/ForUniversities";
import UniversityLogin from "./pages/UniversityLogin";
import UniversitySignup from "./pages/UniversitySignup";
import UniversityDashboard from "./pages/UniversityDashboard";
import TrainingCurriculum from "./pages/TrainingCurriculum";
import TrainingModuleDetail from "./pages/TrainingModuleDetail";
import PortfolioList from "./pages/PortfolioList";
import PortfolioDetail from "./pages/PortfolioDetail";
import ActivityLogList from "./pages/ActivityLogList";
import ActivityLogDetail from "./pages/ActivityLogDetail";
import SafetyStudent from "./pages/SafetyStudent";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper component for protected student routes
const ProtectedStudentPage = ({ children }: { children: React.ReactNode }) => (
  <StudentProvider>
    <ProtectedStudentRoute>{children}</ProtectedStudentRoute>
  </StudentProvider>
);

// Wrapper component for protected seeker routes
const ProtectedSeekerPage = ({ children }: { children: React.ReactNode }) => (
  <ProtectedSeekerRoute>{children}</ProtectedSeekerRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login/student" element={<LoginStudent />} />
          <Route path="/login/seeker" element={<LoginSeeker />} />
          <Route path="/login/instructor" element={<LoginInstructor />} />
          <Route path="/signup/student" element={<SignUpStudent />} />
          <Route path="/signup/seeker" element={<SignUpSeeker />} />
          <Route path="/signup/instructor" element={<SignUpInstructor />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/for-universities" element={<ForUniversities />} />
          <Route path="/university-login" element={<UniversityLogin />} />
          <Route path="/university-signup" element={<UniversitySignup />} />
          <Route path="/contact" element={<Contact />} />

          {/* Protected student routes */}
          <Route path="/dashboard/student" element={<ProtectedStudentPage><DashboardStudent /></ProtectedStudentPage>} />
          <Route path="/student/portfolio" element={<ProtectedStudentPage><StudentPortfolio /></ProtectedStudentPage>} />
          <Route path="/student/portfolio/edit" element={<ProtectedStudentPage><StudentPortfolioEdit /></ProtectedStudentPage>} />
          <Route path="/student/notebook" element={<ProtectedStudentPage><StudentNotebook /></ProtectedStudentPage>} />
          <Route path="/portfolio" element={<ProtectedStudentPage><Portfolio /></ProtectedStudentPage>} />
          <Route path="/training-curriculum" element={<ProtectedStudentPage><TrainingCurriculum /></ProtectedStudentPage>} />
          <Route path="/training-module/:moduleId" element={<ProtectedStudentPage><TrainingModuleDetail /></ProtectedStudentPage>} />
          <Route path="/community/students" element={<ProtectedStudentPage><StudentCommunity /></ProtectedStudentPage>} />
          <Route path="/student-forum" element={<ProtectedStudentPage><StudentForum /></ProtectedStudentPage>} />
          <Route path="/student-forum/post/:id" element={<ProtectedStudentPage><StudentForumPost /></ProtectedStudentPage>} />
          <Route path="/chat" element={<ProtectedStudentPage><Chat /></ProtectedStudentPage>} />
          <Route path="/realtime-chat" element={<ProtectedStudentPage><RealtimeChat /></ProtectedStudentPage>} />
          <Route path="/safety-student" element={<ProtectedStudentPage><SafetyStudent /></ProtectedStudentPage>} />

          {/* Protected seeker routes */}
          <Route path="/dashboard/seeker" element={<ProtectedSeekerPage><DashboardSeeker /></ProtectedSeekerPage>} />
          <Route path="/seeker/chat" element={<ProtectedSeekerPage><RealtimeChat /></ProtectedSeekerPage>} />
          <Route path="/dashboard/instructor" element={<DashboardInstructor />} />
          <Route path="/university-dashboard" element={<UniversityDashboard />} />
          <Route path="/portfolio-list" element={<PortfolioList />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/activity-log-list" element={<ActivityLogList />} />
          <Route path="/activity-log/:id" element={<ActivityLogDetail />} />

          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
