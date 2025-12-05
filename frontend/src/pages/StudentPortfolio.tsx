import { Link } from "react-router-dom";
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
  Quote
} from "lucide-react";

const StudentPortfolio = () => {
  // Mock data - will be replaced with real data from Supabase
  const profile = {
    name: "Emma Johnson",
    university: "Sorbonne University",
    program: "Psychology (B.S.)",
    xp: 1450,
    level: 5,
    totalSessions: 23,
    totalHours: 18,
    joinedDate: "September 2024",
  };

  const badges = [
    { name: "First Listen", icon: MessageCircle, earned: true, description: "Completed first session" },
    { name: "Empathy Pro", icon: Heart, earned: true, description: "Received 5-star feedback" },
    { name: "Night Owl", icon: Star, earned: true, description: "Listened after 10 PM" },
    { name: "Streak Master", icon: TrendingUp, earned: true, description: "7-day listening streak" },
    { name: "Milestone 10", icon: Award, earned: true, description: "Completed 10 sessions" },
  ];

  const skills = [
    "Active Listening",
    "Empathetic Responding",
    "Crisis Recognition",
    "Cultural Sensitivity",
    "Reflective Practice",
    "Emotional Regulation",
  ];

  const reflections = [
    {
      date: "Nov 28, 2024",
      excerpt: "Today I learned the importance of silence in active listening. Sometimes the most powerful thing is to simply be present...",
    },
    {
      date: "Nov 25, 2024",
      excerpt: "Encountered a challenging situation where the person needed more than I could provide. I successfully used the escalation protocol...",
    },
    {
      date: "Nov 22, 2024",
      excerpt: "Practiced validation techniques and noticed how powerful 'I hear you' can be when delivered genuinely...",
    },
  ];

  const handleDownloadPDF = () => {
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCA2MTIgNzkyXS9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNCAwIFI+Pj4+L0NvbnRlbnRzIDUgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4KZW5kb2JqCjUgMCBvYmoKPDwvTGVuZ3RoIDQ0Pj5zdHJlYW0KQlQKL0YxIDI0IFRmCjEwMCA3MDAgVGQKKFN0dWRlbnQgUG9ydGZvbGlvKSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZS9QYWdlcy9LaWRzWzMgMCBSXS9Db3VudCAxPj4KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDIgMCBSPj4KZW5kb2JqCjYgMCBvYmoKPDwvUHJvZHVjZXIoTGlzdGVuTGFiKT4+CmVuZG9iagp4cmVmCjAgNwowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAzNDAgMDAwMDAgbiAKMDAwMDAwMDI5MSAwMDAwMCBuIAowMDAwMDAwMDA5IDAwMDAwIG4gCjAwMDAwMDAxNDggMDAwMDAgbiAKMDAwMDAwMDIxNSAwMDAwMCBuIAowMDAwMDAwMzg5IDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA3L1Jvb3QgMSAwIFIvSW5mbyA2IDAgUj4+CnN0YXJ0eHJlZgo0MzIKJSVFT0Y=';
    link.download = 'student-portfolio.pdf';
    link.click();
  };

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
              <Link to="/">
                <Button variant="ghost" size="sm">Sign Out</Button>
              </Link>
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
                <h1 className="text-2xl font-bold text-foreground mb-1">{profile.name}</h1>
                <p className="text-muted-foreground">{profile.university}</p>
                <p className="text-sm text-muted-foreground">{profile.program}</p>
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
                <p className="text-2xl font-bold text-foreground">{profile.xp}</p>
                <p className="text-xs text-muted-foreground">Total XP</p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft text-center">
                <Star className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{profile.level}</p>
                <p className="text-xs text-muted-foreground">Level</p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft text-center">
                <MessageCircle className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{profile.totalSessions}</p>
                <p className="text-xs text-muted-foreground">Sessions</p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft text-center">
                <Clock className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-2xl font-bold text-foreground">{profile.totalHours}</p>
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {badges.filter(b => b.earned).map((badge) => (
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
            </div>

            {/* Reflection Snippets */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Quote className="w-5 h-5 text-primary" />
                Selected Reflections
              </h2>
              <div className="space-y-4">
                {reflections.map((reflection, idx) => (
                  <div 
                    key={idx}
                    className="bg-muted/30 rounded-xl p-4 border-l-4 border-primary/30"
                  >
                    <p className="text-xs text-muted-foreground mb-2">{reflection.date}</p>
                    <p className="text-sm text-foreground italic">"{reflection.excerpt}"</p>
                  </div>
                ))}
              </div>
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
                  <span className="text-foreground font-medium">{profile.joinedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">University</span>
                  <span className="text-foreground font-medium">{profile.university}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Program</span>
                  <span className="text-foreground font-medium">{profile.program}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Badges Earned</span>
                  <span className="text-foreground font-medium">{badges.filter(b => b.earned).length}</span>
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
