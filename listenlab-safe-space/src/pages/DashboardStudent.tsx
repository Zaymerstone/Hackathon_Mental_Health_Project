import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  GraduationCap, 
  Award, 
  Shield, 
  MessageCircle,
  TrendingUp,
  Moon,
  Star,
  BookOpen,
  Briefcase,
  Users,
  BookMarked,
  LogOut,
  Headphones,
  Flame,
  Zap
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/contexts/StudentContext";
import { useState } from "react";
import { toast } from "sonner";
import { useBadgeAwarder } from "@/hooks/useBadgeAwarder";
import { useOnlineTimeTracker } from "@/hooks/useOnlineTimeTracker";
import { useLevelProgress } from "@/hooks/useLevelProgress";

// Map badge icon_url to Lucide icons
const getBadgeIcon = (iconUrl: string | null) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "headphones": Headphones,
    "heart": Heart,
    "moon": Moon,
    "flame": Flame,
  };
  return iconMap[iconUrl || ""] || Award;
};

const DashboardStudent = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { profile, badges, trainings, completedTrainings, isLoading } = useStudent();
  
  // Auto-award badges based on conditions
  useBadgeAwarder();
  
  // Track online time
  const { hoursOnline } = useOnlineTimeTracker();

  // Level progress tracking
  const { currentLevel, nextLevel, progressPercent, xpToNextLevel } = useLevelProgress(profile?.xp ?? 0);

  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    
    setIsSigningOut(true);
    const { error } = await signOut();
    
    if (error) {
      toast.error("Failed to sign out. Please try again.");
      setIsSigningOut(false);
      return;
    }
    
    toast.success("Signed out successfully");
    navigate("/", { replace: true });
  };

  // Calculate stats from profile
  const stats = {
    xp: profile?.xp ?? 0,
    level: profile?.current_level ?? 1,
    sessionsCompleted: profile?.weekly_session_count ?? 0,
    hoursListened: hoursOnline,
  };

  // Get first 4 badges for display (earned + locked)
  const displayBadges = badges.slice(0, 4).map((badge) => ({
    name: badge.name,
    description: badge.description,
    icon: getBadgeIcon(badge.icon_url),
    earned: badge.earned,
  }));

  if (isLoading) {
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                Listen<span className="text-primary">Lab</span>
              </span>
            </button>
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
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Student Listener Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back{profile?.full_name ? `, ${profile.full_name.split(' ')[0]}` : ''}! Ready to make a difference?
              </p>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total XP</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.xp}</p>
          </div>
          
          <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <Star className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Level</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.level}</p>
            {currentLevel && (
              <p className="text-xs text-muted-foreground mt-1">{currentLevel.name}</p>
            )}
          </div>
          
          <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Sessions</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.sessionsCompleted}</p>
          </div>
          
          <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Hours</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{stats.hoursListened}</p>
          </div>
        </div>

        {/* Level Progress Bar */}
        <div className="bg-card rounded-xl p-6 border border-border/50 shadow-soft mb-8">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-semibold text-foreground">Level Progress</span>
            </div>
            {nextLevel ? (
              <span className="text-sm text-muted-foreground">
                {xpToNextLevel} XP to Level {nextLevel.level}
              </span>
            ) : (
              <span className="text-sm text-primary font-medium">Max Level!</span>
            )}
          </div>
          <Progress value={progressPercent} className="h-3" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Level {currentLevel?.level ?? 1}: {currentLevel?.name ?? 'Newcomer'}</span>
            {nextLevel && <span>Level {nextLevel.level}: {nextLevel.name}</span>}
          </div>
        </div>

        {/* Main action */}
        {(() => {
          const allTrainingComplete = trainings.length > 0 && completedTrainings.length === trainings.length;
          const remainingModules = trainings.length - completedTrainings.length;
          
          return (
            <div className={`bg-gradient-to-br ${allTrainingComplete ? 'from-primary/5 to-primary/10' : 'from-muted/50 to-muted/30'} rounded-2xl p-8 mb-8 border ${allTrainingComplete ? 'border-primary/20' : 'border-border/50'}`}>
              <div className="text-center max-w-md mx-auto">
                <div className={`w-16 h-16 rounded-2xl ${allTrainingComplete ? 'bg-primary/10' : 'bg-muted'} flex items-center justify-center mx-auto mb-4`}>
                  <MessageCircle className={`w-8 h-8 ${allTrainingComplete ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  {allTrainingComplete ? 'Ready to Listen?' : 'Complete Training First'}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {allTrainingComplete 
                    ? 'Connect with someone who needs your empathetic ear. Every conversation makes a difference.'
                    : `Complete all ${trainings.length} training modules before you can start listening sessions. ${remainingModules} module${remainingModules !== 1 ? 's' : ''} remaining.`
                  }
                </p>
                {allTrainingComplete ? (
                  <Link to="/realtime-chat">
                    <Button variant="hero" size="xl">
                      Start Listening
                    </Button>
                  </Link>
                ) : (
                  <Link to="/training-curriculum">
                    <Button variant="outline" size="xl">
                      Continue Training
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          );
        })()}

        {/* Badges section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Your Badges
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {displayBadges.length > 0 ? (
              displayBadges.map((badge) => (
                <div 
                  key={badge.name}
                  className={`bg-card rounded-xl p-4 border text-center ${
                    badge.earned 
                      ? "border-primary/30 shadow-soft" 
                      : "border-border/50 opacity-50"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center ${
                    badge.earned ? "bg-primary/10" : "bg-muted"
                  }`}>
                    <badge.icon className={`w-5 h-5 ${badge.earned ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <p className="text-sm font-medium text-foreground">{badge.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {badge.earned ? "Earned" : "Locked"}
                  </p>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center py-8 text-muted-foreground">
                Complete sessions to earn badges!
              </div>
            )}
          </div>
        </div>

        {/* Training Curriculum Card */}
        <Link to="/training-curriculum" className="block mb-8">
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-6 border border-amber-500/20 shadow-soft hover:shadow-md hover:border-amber-500/30 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <BookMarked className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">Training Curriculum →</h3>
                <p className="text-sm text-muted-foreground">
                  Complete the ListenLab listening skills program before going live.
                </p>
              </div>
            </div>
          </div>
        </Link>

        {/* Portfolio & Forum Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Portfolio Card */}
          <Link to="/portfolio" className="block">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20 shadow-soft hover:shadow-md hover:border-primary/30 transition-all duration-300 h-full">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">View My Portfolio</h3>
                  <p className="text-sm text-muted-foreground">
                    Showcase your listening achievements for internships, practicum credit, or graduate applications.
                  </p>
                </div>
              </div>
            </div>
          </Link>

          {/* Peer Forum Card */}
          <Link to="/student-forum" className="block">
            <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-xl p-6 border border-border/50 shadow-soft hover:shadow-md hover:border-primary/20 transition-all duration-300 h-full">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">Peer Support Forum</h3>
                  <p className="text-sm text-muted-foreground">
                    Ask questions, get feedback from fellow psychology students.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Safety guidelines link */}
        <div className="bg-secondary/50 rounded-xl p-6 border border-border/50">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Safety Guidelines</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Review our safety protocols and best practices for supporting others.
              </p>
              <Link to="/safety-student">
                <Button variant="outline" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Guidelines
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardStudent;
