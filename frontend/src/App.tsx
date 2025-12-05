import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Safety from "./pages/Safety";
import ForUniversities from "./pages/ForUniversities";
import UniversityLogin from "./pages/UniversityLogin";
import UniversitySignup from "./pages/UniversitySignup";
import UniversityDashboard from "./pages/UniversityDashboard";
import TrainingCurriculum from "./pages/TrainingCurriculum";
import PortfolioList from "./pages/PortfolioList";
import PortfolioDetail from "./pages/PortfolioDetail";
import ActivityLogList from "./pages/ActivityLogList";
import ActivityLogDetail from "./pages/ActivityLogDetail";
import SafetyStudent from "./pages/SafetyStudent";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login/student" element={<LoginStudent />} />
          <Route path="/login/seeker" element={<LoginSeeker />} />
          <Route path="/login/instructor" element={<LoginInstructor />} />
          <Route path="/signup/student" element={<SignUpStudent />} />
          <Route path="/signup/seeker" element={<SignUpSeeker />} />
          <Route path="/signup/instructor" element={<SignUpInstructor />} />
          <Route path="/dashboard/student" element={<DashboardStudent />} />
          <Route path="/dashboard/seeker" element={<DashboardSeeker />} />
          <Route path="/dashboard/instructor" element={<DashboardInstructor />} />
          <Route path="/community/students" element={<StudentCommunity />} />
          <Route path="/student/portfolio" element={<StudentPortfolio />} />
          <Route path="/student/portfolio/edit" element={<StudentPortfolioEdit />} />
          <Route path="/student/notebook" element={<StudentNotebook />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/student-forum" element={<StudentForum />} />
          <Route path="/student-forum/post/:id" element={<StudentForumPost />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/safety" element={<Safety />} />
          <Route path="/for-universities" element={<ForUniversities />} />
          <Route path="/university-login" element={<UniversityLogin />} />
          <Route path="/university-signup" element={<UniversitySignup />} />
          <Route path="/university-dashboard" element={<UniversityDashboard />} />
          <Route path="/training-curriculum" element={<TrainingCurriculum />} />
          <Route path="/portfolio-list" element={<PortfolioList />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/activity-log-list" element={<ActivityLogList />} />
          <Route path="/activity-log/:id" element={<ActivityLogDetail />} />
          <Route path="/safety-student" element={<SafetyStudent />} />
          <Route path="/contact" element={<Contact />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
