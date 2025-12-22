import { Link, useParams } from "react-router-dom";
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
  BookOpen,
  CheckCircle,
  Quote,
  User,
  ArrowLeft
} from "lucide-react";

const PortfolioDetail = () => {
  const { id } = useParams();

  // Placeholder data based on ID
  const studentsData: Record<string, {
    name: string;
    university: string;
    xp: number;
    maxXp: number;
    level: number;
    totalSessions: number;
    totalHours: number;
    reflectionEntries: number;
    milestonesReached: number;
  }> = {
    "placeholder-1": {
      name: "Emma Thompson",
      university: "Sorbonne University",
      xp: 2450,
      maxXp: 3000,
      level: 7,
      totalSessions: 34,
      totalHours: 26,
      reflectionEntries: 24,
      milestonesReached: 12,
    },
    "placeholder-2": {
      name: "James Wilson",
      university: "University of Paris",
      xp: 1820,
      maxXp: 2500,
      level: 5,
      totalSessions: 28,
      totalHours: 21,
      reflectionEntries: 18,
      milestonesReached: 8,
    },
    "placeholder-3": {
      name: "Sophie Chen",
      university: "Sorbonne University",
      xp: 3100,
      maxXp: 3500,
      level: 9,
      totalSessions: 45,
      totalHours: 38,
      reflectionEntries: 32,
      milestonesReached: 15,
    },
  };

  const profile = studentsData[id || ""] || studentsData["placeholder-1"];

  const badges = [
    { name: "First Listen", icon: MessageCircle, earned: true, description: "Completed first session" },
    { name: "Empathy Pro", icon: Heart, earned: true, description: "Received 5-star feedback" },
    { name: "Night Owl", icon: Star, earned: true, description: "Listened after 10 PM" },
    { name: "Streak Master", icon: TrendingUp, earned: true, description: "7-day listening streak" },
    { name: "Milestone 10", icon: Award, earned: true, description: "Completed 10 sessions" },
    { name: "Deep Listener", icon: BookOpen, earned: profile.level >= 7, description: "30+ minute session" },
    { name: "Weekend Warrior", icon: Clock, earned: profile.level >= 5, description: "Listen on weekends" },
    { name: "Reflection Star", icon: Quote, earned: profile.level >= 9, description: "Write 20 reflections" },
  ];

  const skills = [
    "Empathy",
    "Reflective Listening",
    "Cultural Sensitivity",
    "Non-directive Support",
    "Emotional Validation",
    "Crisis Recognition",
    "Active Listening",
    "Boundary Setting",
  ];

  const reflections = [
    {
      date: "Nov 28, 2024",
      text: "Today I learned the importance of silence in active listening. Sometimes the most powerful thing we can do is simply be present without filling every moment with words.",
    },
    {
      date: "Nov 25, 2024",
      text: "Encountered a challenging situation where the person needed more than I could provide. I successfully used the escalation protocol and connected them with professional resources.",
    },
  ];

  const xpPercentage = (profile.xp / profile.maxXp) * 100;

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
            <Link to="/university-dashboard">
              <Button variant="ghost" size="sm">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          to="/portfolio-list" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolios
        </Link>

        {/* Profile Header */}
        <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-secondary/20 rounded-3xl p-8 mb-8 border border-primary/20 shadow-soft">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center shadow-lg">
              <User className="w-12 h-12 text-primary" />
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-3xl font-bold text-foreground mb-1">{profile.name}</h1>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">{profile.university}</span>
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
                <span className="text-sm text-muted-foreground">Progress to Level {profile.level + 1}</span>
                <span className="text-sm font-medium text-foreground">{profile.xp} / {profile.maxXp} XP</span>
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
                <p className="text-3xl font-bold text-primary">{profile.level}</p>
                <p className="text-xs text-muted-foreground">Current Level</p>
              </div>
              <div className="text-center px-6 py-3 bg-secondary rounded-xl">
                <p className="text-3xl font-bold text-foreground">{profile.xp}</p>
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
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {badges.map((badge) => (
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
            </div>

            {/* Skills Demonstrated */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Skills Demonstrated
              </h2>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 text-primary text-sm font-medium border border-primary/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Highlighted Reflections */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Quote className="w-5 h-5 text-primary" />
                Highlighted Reflections
              </h2>
              <div className="space-y-4">
                {reflections.map((reflection, idx) => (
                  <div 
                    key={idx}
                    className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-xl p-5 border border-border/30"
                  >
                    <p className="text-xs text-primary font-medium mb-2">{reflection.date}</p>
                    <p className="text-sm text-foreground leading-relaxed italic">"{reflection.text}"</p>
                  </div>
                ))}
              </div>
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
                  <span className="font-bold text-foreground">{profile.totalSessions}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Hours</span>
                  </div>
                  <span className="font-bold text-foreground">{profile.totalHours}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Reflections</span>
                  </div>
                  <span className="font-bold text-foreground">{profile.reflectionEntries}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Milestones</span>
                  </div>
                  <span className="font-bold text-foreground">{profile.milestonesReached}</span>
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

export default PortfolioDetail;