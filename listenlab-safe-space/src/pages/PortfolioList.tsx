import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  GraduationCap, 
  Briefcase,
  ChevronRight,
  ArrowLeft,
  TrendingUp,
  Award
} from "lucide-react";

const PortfolioList = () => {
  // Placeholder student data
  const students = [
    { 
      id: "placeholder-1", 
      name: "Emma Thompson", 
      university: "Sorbonne University",
      xp: 2450, 
      sessions: 34, 
      level: 7,
      badges: 12
    },
    { 
      id: "placeholder-2", 
      name: "James Wilson", 
      university: "University of Paris",
      xp: 1820, 
      sessions: 28, 
      level: 5,
      badges: 8
    },
    { 
      id: "placeholder-3", 
      name: "Sophie Chen", 
      university: "Sorbonne University",
      xp: 3100, 
      sessions: 45, 
      level: 9,
      badges: 15
    },
    { 
      id: "placeholder-4", 
      name: "Michael Brown", 
      university: "University of Paris",
      xp: 980, 
      sessions: 12, 
      level: 3,
      badges: 4
    },
    { 
      id: "placeholder-5", 
      name: "Isabella Garcia", 
      university: "Sorbonne University",
      xp: 2200, 
      sessions: 31, 
      level: 6,
      badges: 10
    },
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
            <Link to="/university-dashboard">
              <Button variant="ghost" size="sm">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          to="/university-dashboard" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Student Portfolios</h1>
              <p className="text-muted-foreground">
                View detailed portfolios of all linked students
              </p>
            </div>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {students.map((student) => (
            <Link 
              key={student.id}
              to={`/portfolio/${student.id}`}
              className="block"
            >
              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft hover:shadow-md hover:border-primary/30 transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{student.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <GraduationCap className="w-3 h-3" />
                      {student.university}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-secondary/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">XP</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{student.xp.toLocaleString()}</p>
                  </div>
                  <div className="bg-secondary/50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-4 h-4 text-primary" />
                      <span className="text-xs text-muted-foreground">Badges</span>
                    </div>
                    <p className="text-lg font-bold text-foreground">{student.badges}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Level {student.level} • {student.sessions} sessions
                  </span>
                  <ChevronRight className="w-5 h-5 text-primary" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default PortfolioList;