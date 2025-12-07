import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Heart,
  GraduationCap,
  Award,
  Shield,
  MessageCircle,
  TrendingUp,
  Star,
  BookOpen,
  Briefcase,
  Users,
  BookMarked,
} from "lucide-react";

const DashboardStudent = () => {
  // Mock data - will be replaced with real data from Supabase
  const stats = {
    xp: 1250,
    level: 5,
    sessionsCompleted: 23,
    hoursListened: 18,
  };

  const badges = [
    { name: "First Listen", icon: MessageCircle, earned: true },
    { name: "Empathy Pro", icon: Heart, earned: true },
    { name: "Night Owl", icon: Star, earned: false },
    { name: "Streak Master", icon: TrendingUp, earned: false },
  ];

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
            <Link to="/">
              <Button variant="ghost" size="sm">
                Sign Out
              </Button>
            </Link>
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
              <h1 className="text-2xl font-bold text-foreground">
                Student Listener Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back! Ready to make a difference?
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
          </div>

          <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Sessions</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {stats.sessionsCompleted}
            </p>
          </div>

          <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Hours</span>
            </div>
            <p className="text-3xl font-bold text-foreground">
              {stats.hoursListened}
            </p>
          </div>
        </div>

        {/* Main action */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-8 border border-primary/20">
          <div className="text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Ready to Listen?
            </h2>
            <p className="text-muted-foreground mb-6">
              Connect with someone who needs your empathetic ear. Every
              conversation makes a difference.
            </p>
            <Link to="/chat">
              <Button variant="hero" size="xl">
                Start Listening
              </Button>
            </Link>
          </div>
        </div>

        {/* Badges section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Your Badges
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className={`bg-card rounded-xl p-4 border text-center ${
                  badge.earned
                    ? "border-primary/30 shadow-soft"
                    : "border-border/50 opacity-50"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center ${
                    badge.earned ? "bg-primary/10" : "bg-muted"
                  }`}
                >
                  <badge.icon
                    className={`w-5 h-5 ${
                      badge.earned ? "text-primary" : "text-muted-foreground"
                    }`}
                  />
                </div>
                <p className="text-sm font-medium text-foreground">
                  {badge.name}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {badge.earned ? "Earned" : "Locked"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Training Curriculum Card */}
        <Link
          to="/dashboard/student/training-curriculum"
          className="block mb-8"
        >
          <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-6 border border-amber-500/20 shadow-soft hover:shadow-md hover:border-amber-500/30 transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <BookMarked className="w-6 h-6 text-amber-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  Training Curriculum →
                </h3>
                <p className="text-sm text-muted-foreground">
                  Complete the ListenLab listening skills program before going
                  live.
                </p>
              </div>
            </div>
          </div>
        </Link>

        {/* Portfolio & Forum Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Portfolio Card */}
          <Link to="/dashboard/student/portfolio" className="block">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20 shadow-soft hover:shadow-md hover:border-primary/30 transition-all duration-300 h-full">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    View My Portfolio
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Showcase your listening achievements for internships,
                    practicum credit, or graduate applications.
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
                  <h3 className="font-semibold text-foreground mb-1">
                    Peer Support Forum
                  </h3>
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
              <h3 className="font-semibold text-foreground mb-1">
                Safety Guidelines
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Review our safety protocols and best practices for supporting
                others.
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
