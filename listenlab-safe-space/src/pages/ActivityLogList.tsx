import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  FileText,
  ChevronRight,
  ArrowLeft,
  Clock,
  BookOpen
} from "lucide-react";

const ActivityLogList = () => {
  // Placeholder student data
  const students = [
    { 
      id: "placeholder-1", 
      name: "Emma Thompson", 
      lastActivity: "2 hours ago",
      totalReflections: 24,
      totalSessions: 34
    },
    { 
      id: "placeholder-2", 
      name: "James Wilson", 
      lastActivity: "Yesterday",
      totalReflections: 18,
      totalSessions: 28
    },
    { 
      id: "placeholder-3", 
      name: "Sophie Chen", 
      lastActivity: "3 hours ago",
      totalReflections: 32,
      totalSessions: 45
    },
    { 
      id: "placeholder-4", 
      name: "Michael Brown", 
      lastActivity: "3 days ago",
      totalReflections: 8,
      totalSessions: 12
    },
    { 
      id: "placeholder-5", 
      name: "Isabella Garcia", 
      lastActivity: "5 hours ago",
      totalReflections: 21,
      totalSessions: 31
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
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center">
              <FileText className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Student Activity Logs</h1>
              <p className="text-muted-foreground">
                Review session reflections and activity logs (read-only)
              </p>
            </div>
          </div>
        </div>

        {/* Students List */}
        <div className="space-y-4">
          {students.map((student) => (
            <Link 
              key={student.id}
              to={`/activity-log/${student.id}`}
              className="block"
            >
              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft hover:shadow-md hover:border-amber-500/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-amber-600">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{student.name}</h3>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        Last activity: {student.lastActivity}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-muted-foreground mb-1">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <p className="text-lg font-bold text-foreground">{student.totalReflections}</p>
                      <p className="text-xs text-muted-foreground">Reflections</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center gap-1 text-muted-foreground mb-1">
                        <FileText className="w-4 h-4" />
                      </div>
                      <p className="text-lg font-bold text-foreground">{student.totalSessions}</p>
                      <p className="text-xs text-muted-foreground">Sessions</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-amber-600" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default ActivityLogList;