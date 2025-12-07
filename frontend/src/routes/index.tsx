import { Routes, Route, Navigate } from "react-router-dom";
import { PATHS } from "./paths";

// Layout components
import StudentDashboardLayout from "./layouts/StudentDashboardLayout";
import HelpSeekerDashboardLayout from "./layouts/HelpSeekerDashboardLayout";
import UniversityDashboardLayout from "./layouts/UniversityDashboardLayout";

// Page components
import Index from "@/pages/Index";
import LoginStudent from "@/pages/LoginStudent";
import LoginSeeker from "@/pages/LoginSeeker";
import SignUpStudent from "@/pages/SignUpStudent";
import SignUpSeeker from "@/pages/SignUpSeeker";
import DashboardStudent from "@/pages/DashboardStudent";
import DashboardSeeker from "@/pages/DashboardSeeker";
import TrainingCurriculum from "@/pages/TrainingCurriculum";
import StudentPortfolio from "@/pages/StudentPortfolio";
import StudentForum from "@/pages/StudentForum";
import SafetyStudent from "@/pages/SafetyStudent";
import Chat from "@/pages/Chat";
import Safety from "@/pages/Safety";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import Contact from "@/pages/Contact";
import ForUniversities from "@/pages/ForUniversities";
import UniversityLogin from "@/pages/UniversityLogin";
import UniversitySignup from "@/pages/UniversitySignup";
import UniversityDashboard from "@/pages/UniversityDashboard";
import PortfolioList from "@/pages/PortfolioList";
import ActivityLogList from "@/pages/ActivityLogList";

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={PATHS.HOME} element={<Index />} />

      {/* Authentication Routes */}
      <Route path={PATHS.STUDENT_SIGNUP} element={<SignUpStudent />} />
      <Route path={PATHS.STUDENT_LOGIN} element={<LoginStudent />} />
      <Route path={PATHS.HELP_SEEKER_SIGNUP} element={<SignUpSeeker />} />
      <Route path={PATHS.HELP_SEEKER_LOGIN} element={<LoginSeeker />} />

      {/* Student Dashboard - Nested Routes */}
      <Route
        path={PATHS.STUDENT_DASHBOARD}
        element={<StudentDashboardLayout />}
      >
        <Route index element={<DashboardStudent />} />
        <Route path="training-curriculum" element={<TrainingCurriculum />} />
        <Route path="portfolio" element={<StudentPortfolio />} />
        <Route path="forum" element={<StudentForum />} />
        <Route path="safety" element={<SafetyStudent />} />
      </Route>

      {/* Help Seeker Dashboard - Nested Routes */}
      <Route
        path={PATHS.HELP_SEEKER_DASHBOARD}
        element={<HelpSeekerDashboardLayout />}
      >
        <Route index element={<DashboardSeeker />} />
      </Route>

      {/* University Dashboard - Nested Routes */}
      <Route
        path={PATHS.UNIVERSITY_DASHBOARD}
        element={<UniversityDashboardLayout />}
      >
        <Route index element={<UniversityDashboard />} />
      </Route>

      {/* Shared Routes */}
      <Route path={PATHS.CHAT} element={<Chat />} />

      {/* Public Pages */}
      <Route path={PATHS.SAFETY} element={<Safety />} />
      <Route path={PATHS.PRIVACY} element={<Privacy />} />
      <Route path={PATHS.TERMS} element={<Terms />} />
      <Route path={PATHS.CONTACT} element={<Contact />} />
      <Route path={PATHS.FOR_UNIVERSITIES} element={<ForUniversities />} />

      {/* University Routes */}
      <Route path={PATHS.UNIVERSITY_LOGIN} element={<UniversityLogin />} />
      <Route path={PATHS.UNIVERSITY_SIGNUP} element={<UniversitySignup />} />
      <Route
        path={PATHS.UNIVERSITY_PORTFOLIO_LIST}
        element={<PortfolioList />}
      />
      <Route
        path={PATHS.UNIVERSITY_ACTIVITY_LOG_LIST}
        element={<ActivityLogList />}
      />

      {/* 404 Fallback - Redirect to Home */}
      <Route path="*" element={<Navigate to={PATHS.HOME} replace />} />
    </Routes>
  );
};
