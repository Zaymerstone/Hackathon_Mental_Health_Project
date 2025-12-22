import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Heart } from "lucide-react";

interface ProtectedSeekerRouteProps {
  children: React.ReactNode;
}

export const ProtectedSeekerRoute: React.FC<ProtectedSeekerRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const { loading, isAuthenticated, userType } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/login/seeker", { replace: true });
      } else if (userType && userType !== "seeker") {
        // User is authenticated but not a seeker, redirect to appropriate dashboard
        navigate(`/dashboard/${userType}`, { replace: true });
      }
    }
  }, [loading, isAuthenticated, userType, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Heart className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Only render children if authenticated as a seeker
  if (!isAuthenticated || (userType && userType !== "seeker")) {
    return null;
  }

  return <>{children}</>;
};
