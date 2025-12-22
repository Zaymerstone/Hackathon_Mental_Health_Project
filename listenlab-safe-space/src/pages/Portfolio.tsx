import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Heart, 
  GraduationCap, 
  Award, 
  MessageCircle,
  TrendingUp,
  Star,
  Clock,
  Download,
  BookOpen,
  CheckCircle,
  Quote,
  User,
  Users,
  Plus,
  X,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/contexts/StudentContext";
import { useBadgeAwarder } from "@/hooks/useBadgeAwarder";
import { useOnlineTimeTracker } from "@/hooks/useOnlineTimeTracker";
import { format } from "date-fns";
import { toast } from "sonner";

// Map badge names to icons
const getBadgeIcon = (badgeName: string) => {
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    "First Listen": MessageCircle,
    "Empathy Pro": Heart,
    "Night Owl": Star,
    "Streak Master": TrendingUp,
    "Milestone 10": Award,
    "Deep Listener": BookOpen,
    "Weekend Warrior": Clock,
    "Reflection Star": Quote,
    "Active Listener": MessageCircle,
  };
  return iconMap[badgeName] || Award;
};

const Portfolio = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { profile, badges, earnedBadges, reflections, achievedMilestones, skills, isLoading, addReflection, refetch, forumCommentsCount } = useStudent();
  
  // Auto-award badges based on conditions
  useBadgeAwarder();
  
  // Track online time
  const { hoursOnline } = useOnlineTimeTracker();
  
  const [showReflectionForm, setShowReflectionForm] = useState(false);
  const [newReflection, setNewReflection] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const handleSaveReflection = async () => {
    if (!newReflection.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    const { error } = await addReflection({
      content: newReflection,
      what_learned: newReflection,
    });

    if (error) {
      toast.error("Failed to save reflection");
    } else {
      toast.success("Reflection saved!");
      setNewReflection("");
      setShowReflectionForm(false);
    }
    setIsSubmitting(false);
  };

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

  // Calculate XP progress
  const currentXp = profile?.xp ?? 0;
  const currentLevel = profile?.current_level ?? 1;
  const xpForNextLevel = currentLevel * 500; // 500 XP per level
  const xpPercentage = Math.min((currentXp % 500) / 500 * 100, 100);

  // Map badges with icons
  const displayBadges = badges.map((badge) => ({
    name: badge.name,
    icon: getBadgeIcon(badge.name),
    earned: badge.earned,
    description: badge.description || "Achievement",
  }));

  // Get all reflections for display
  const displayReflections = reflections.map((r) => ({
    id: r.id,
    date: format(new Date(r.created_at), "MMM d, yyyy"),
    text: r.content,
  }));

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
        {/* New Reflection Button - Students only */}
        <div className="flex justify-end mb-4">
          <Button 
            variant="hero" 
            onClick={() => setShowReflectionForm(true)}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            New Reflection
          </Button>
        </div>

        {/* Reflection Form Modal */}
        {showReflectionForm && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-elegant max-w-lg w-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">New Reflection</h3>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowReflectionForm(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <Textarea
                value={newReflection}
                onChange={(e) => setNewReflection(e.target.value)}
                placeholder="Write about your listening session... What did you learn? What challenges did you face?"
                rows={6}
                className="mb-4"
              />
              <div className="flex gap-3">
                <Button 
                  variant="hero" 
                  className="flex-1"
                  onClick={handleSaveReflection}
                  disabled={isSubmitting || !newReflection.trim()}
                >
                  {isSubmitting ? "Saving..." : "Save Reflection"}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowReflectionForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Profile Header */}
        <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/20 rounded-3xl p-8 mb-8 border border-primary/20 shadow-soft">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center shadow-lg">
              <User className="w-12 h-12 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-foreground mb-1">
                {profile?.full_name || "Student"}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">
                  {profile?.university_name || "University"}
                </span>
              </div>
              <p className="text-sm text-primary font-medium">Psychology Student — Active Listener</p>
            </div>
          </div>
        </div>

        {/* XP & Level Section */}
        <div className="bg-card rounded-2xl p-6 mb-8 border border-border/50 shadow-soft">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            Experience & Level
          </h2>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 w-full">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Progress to Level {currentLevel + 1}</span>
                <span className="text-sm font-medium text-foreground">{currentXp} XP</span>
              </div>
              <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                  style={{ width: `${xpPercentage}%` }}
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center px-6 py-3 bg-primary/10 rounded-xl">
                <p className="text-3xl font-bold text-primary">{currentLevel}</p>
                <p className="text-xs text-muted-foreground">Current Level</p>
              </div>
              <div className="text-center px-6 py-3 bg-secondary rounded-xl">
                <p className="text-3xl font-bold text-foreground">{currentXp}</p>
                <p className="text-xs text-muted-foreground">Total XP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Badges Section */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Badges Collection
              </h2>
              {displayBadges.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {displayBadges.map((badge) => (
                    <div 
                      key={badge.name}
                      className={`rounded-xl p-4 text-center transition-all duration-300 ${
                        badge.earned 
                          ? "bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 shadow-soft" 
                          : "bg-muted/30 border border-border/30 opacity-50 grayscale"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg mx-auto mb-3 flex items-center justify-center ${
                        badge.earned ? "bg-primary/20" : "bg-muted"
                      }`}>
                        <badge.icon className={`w-6 h-6 ${badge.earned ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <p className="font-medium text-foreground text-sm">{badge.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Complete sessions to earn badges!
                </p>
              )}
            </div>

            {/* Skills Demonstrated */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Skills Demonstrated
              </h2>
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill) => (
                    <span 
                      key={skill.id}
                      className={`px-4 py-2 rounded-full text-sm font-medium border ${
                        skill.unlocked 
                          ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary border-primary/20" 
                          : "bg-muted/30 text-muted-foreground border-border/30 opacity-60"
                      }`}
                      title={skill.description || undefined}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Complete training to unlock skills!
                </p>
              )}
            </div>

            {/* Highlighted Reflections */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Quote className="w-5 h-5 text-primary" />
                Highlighted Reflections
              </h2>
              {displayReflections.length > 0 ? (
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  {displayReflections.map((reflection) => (
                    <div 
                      key={reflection.id}
                      className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-xl p-5 border border-border/30"
                    >
                      <p className="text-xs text-primary font-medium mb-2">{reflection.date}</p>
                      <p className="text-sm text-foreground leading-relaxed italic">"{reflection.text}"</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Add reflections to showcase your learning journey!
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Cards */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
              <h2 className="text-lg font-semibold text-foreground mb-4">Statistics</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Sessions</span>
                  </div>
                  <span className="font-bold text-foreground">{profile?.weekly_session_count ?? 0}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Hours</span>
                  </div>
                  <span className="font-bold text-foreground">{hoursOnline}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Reflections</span>
                  </div>
                  <span className="font-bold text-foreground">{reflections.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Comments</span>
                  </div>
                  <span className="font-bold text-foreground">{forumCommentsCount}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Milestones</span>
                  </div>
                  <span className="font-bold text-foreground">{earnedBadges.length}</span>
                </div>
              </div>
            </div>

            {/* Export Button */}
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full"
              disabled
            >
              <Download className="w-4 h-4 mr-2" />
              Export Portfolio as PDF (Coming Soon)
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
