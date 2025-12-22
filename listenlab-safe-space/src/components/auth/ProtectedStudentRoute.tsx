import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { GraduationCap } from "lucide-react";

interface ProtectedStudentRouteProps {
  children: React.ReactNode;
}

export const ProtectedStudentRoute: React.FC<ProtectedStudentRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, userType } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/login/student", { replace: true });
      } else if (userType && userType !== "student") {
        // User is authenticated but not a student, redirect to appropriate dashboard
        navigate(`/dashboard/${userType}`, { replace: true });
      }
    }
  }, [loading, isAuthenticated, userType, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated as a student
  if (!isAuthenticated || (userType && userType !== "student")) {
    return null;
  }

  return <>{children}</>;
};
