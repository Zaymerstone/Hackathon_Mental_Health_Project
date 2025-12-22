import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  GraduationCap, 
  Award, 
  MessageCircle,
  TrendingUp,
  Star,
  Clock,
  Download,
  Edit,
  CheckCircle,
  Quote,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/contexts/StudentContext";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

// Map badge names to icons
const getBadgeIcon = (badgeName: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "First Listen": MessageCircle,
    "Empathy Pro": Heart,
    "Night Owl": Star,
    "Streak Master": TrendingUp,
    "Active Listener": MessageCircle,
    "Milestone 10": Award,
  };
  return iconMap[badgeName] || Award;
};

// Skills derived from completed training modules
const skills = [
  "Active Listening",
  "Empathetic Responding",
  "Crisis Recognition",
  "Cultural Sensitivity",
  "Reflective Practice",
  "Emotional Regulation",
];

const StudentPortfolio = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { profile, earnedBadges, reflections, isLoading } = useStudent();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    setIsSigningOut(true);
    const { error } = await signOut();
    if (error) {
      toast.error("Failed to sign out");
      setIsSigningOut(false);
      return;
    }
    toast.success("Signed out successfully");
    navigate("/", { replace: true });
  };

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCA2MTIgNzkyXS9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNCAwIFI+Pj4+L0NvbnRlbnRzIDUgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4KZW5kb2JqCjUgMCBvYmoKPDwvTGVuZ3RoIDQ0Pj5zdHJlYW0KQlQKL0YxIDI0IFRmCjEwMCA3MDAgVGQKKFN0dWRlbnQgUG9ydGZvbGlvKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZS9QYWdlcy9LaWRzWzMgMCBSXS9Db3VudCAxPj4KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDIgMCBSPj4KZW5kb2JqCjYgMCBvYmoKPDwvUHJvZHVjZXIoTGlzdGVuTGFiKT4+CmVuZG9iagp4cmVmCjAgNwowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAzNDAgMDAwMDAgbiAKMDAwMDAwMDI5MSAwMDAwMCBuIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAxNDggMDAwMDAgbiAKMDAwMDAwMDIxNSAwMDAwMCBuIAowMDAwMDAwMzg5IDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA3L1Jvb3QgMSAwIFIvSW5mbyA2IDAgUj4+CnN0YXJ0eHJlZgo0MzIKJSVFT0Y=';
    link.download = 'student-portfolio.pdf';
    link.click();
  };

  // Format joined date
  const joinedDate = profile?.created_at 
    ? format(new Date(profile.created_at), "MMMM yyyy")
    : "";

  // Get latest 3 reflections for display
  const displayReflections = reflections.slice(0, 3).map((r) => ({
    date: format(new Date(r.created_at), "MMM d, yyyy"),
    excerpt: r.content.length > 150 ? r.content.slice(0, 150) + "..." : r.content,
  }));

  // Map earned badges with icons
  const displayBadges = earnedBadges.map((badge) => ({
    name: badge.name,
    icon: getBadgeIcon(badge.name),
    description: badge.description || "Achievement unlocked",
    earned: true,
  }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                Listen<span className="text-primary">Lab</span>
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link to="/dashboard/student">
                <Button variant="ghost" size="sm">Dashboard</Button>
              </Link>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSignOut}
                disabled={isSigningOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                {isSigningOut ? "Signing out..." : "Sign Out"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-8 border border-primary/20">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center">
                <GraduationCap className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-1">
                  {profile?.full_name || "Student"}
                </h1>
                <p className="text-muted-foreground">{profile?.university_name || "University"}</p>
                <p className="text-sm text-muted-foreground">Psychology Student</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link to="/student/portfolio/edit">
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Portfolio
                </Button>
              </Link>
              <Button variant="hero" size="sm" onClick={handleDownloadPDF}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft text-center">
                <TrendingUp className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{profile?.xp ?? 0}</p>
                <p className="text-xs text-muted-foreground">Total XP</p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft text-center">
                <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{profile?.current_level ?? 1}</p>
                <p className="text-xs text-muted-foreground">Level</p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft text-center">
                <MessageCircle className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{profile?.weekly_session_count ?? 0}</p>
                <p className="text-xs text-muted-foreground">Sessions</p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft text-center">
                <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">0</p>
                <p className="text-xs text-muted-foreground">Hours</p>
              </div>
            </div>

            {/* Skills Demonstrated */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Skills Demonstrated
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Achievements
              </h2>
              {displayBadges.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {displayBadges.map((badge) => (
                    <div 
                      key={badge.name}
                      className="bg-muted/50 rounded-xl p-4 text-center hover:bg-muted transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                        <badge.icon className="w-6 h-6 text-primary" />
                      </div>
                      <p className="font-medium text-foreground text-sm">{badge.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Complete sessions to earn achievements!
                </p>
              )}
            </div>

            {/* Reflection Snippets */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Quote className="w-5 h-5 text-primary" />
                Selected Reflections
              </h2>
              {displayReflections.length > 0 ? (
                <div className="space-y-4">
                  {displayReflections.map((reflection, idx) => (
                    <div 
                      key={idx}
                      className="bg-muted/30 rounded-xl p-4 border-l-4 border-primary/30"
                    >
                      <p className="text-xs text-muted-foreground mb-2">{reflection.date}</p>
                      <p className="text-sm text-foreground italic">"{reflection.excerpt}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Add reflections to showcase your learning journey!
                </p>
              )}
              <Link to="/student/notebook" className="block mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View All Reflections
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4">Portfolio Summary</h2>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member Since</span>
                  <span className="text-foreground font-medium">{joinedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">University</span>
                  <span className="text-foreground font-medium">
                    {profile?.university_name || "Not specified"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Language</span>
                  <span className="text-foreground font-medium">
                    {profile?.preferred_language || "English"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Badges Earned</span>
                  <span className="text-foreground font-medium">{earnedBadges.length}</span>
                </div>
              </div>

              <div className="border-t border-border/50 mt-6 pt-6">
                <p className="text-xs text-muted-foreground mb-4">
                  Share your portfolio with supervisors, professors, or admissions committees.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Copy Portfolio Link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentPortfolio;
