import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Users, 
  Briefcase, 
  Award, 
  TrendingUp,
  FileText,
  Eye,
  Clock,
  Star,
  Target,
  ChevronRight
} from "lucide-react";

const UniversityDashboard = () => {
  // Demo mode - no real authentication
  const isDemoMode = true;

  // Placeholder student data
  const linkedStudents = [
    { id: "placeholder-1", name: "Emma Thompson", xp: 2450, sessions: 34, status: "Active" },
    { id: "placeholder-2", name: "James Wilson", xp: 1820, sessions: 28, status: "Active" },
    { id: "placeholder-3", name: "Sophie Chen", xp: 3100, sessions: 45, status: "Active" },
    { id: "placeholder-4", name: "Michael Brown", xp: 980, sessions: 12, status: "Inactive" },
    { id: "placeholder-5", name: "Isabella Garcia", xp: 2200, sessions: 31, status: "Active" },
  ];

  const practicumStats = [
    { label: "Total Sessions Completed", value: "150", icon: Clock, color: "from-blue-500/20 to-blue-600/10" },
    { label: "XP Progress Overview", value: "10,550", icon: TrendingUp, color: "from-green-500/20 to-green-600/10" },
    { label: "Badge Distribution", value: "47", icon: Award, color: "from-amber-500/20 to-amber-600/10" },
    { label: "Student Milestones", value: "23", icon: Target, color: "from-purple-500/20 to-purple-600/10" },
  ];

  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Demo Banner */}
        {isDemoMode && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 mb-8">
            <p className="text-center text-foreground">
              <span className="font-semibold">Demo Access</span> — Contact us to enable full authenticated university integration.
            </p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <a 
                href="mailto:omri.zalait@etu.sorbonne-universite.fr" 
                className="text-sm text-primary hover:underline"
              >
                omri.zalait@etu.sorbonne-universite.fr
              </a>
              <span className="text-muted-foreground">|</span>
              <a 
                href="mailto:egor.nesterov@etu.u-paris.fr" 
                className="text-sm text-primary hover:underline"
              >
                egor.nesterov@etu.u-paris.fr
              </a>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                University Dashboard
              </h1>
              <p className="text-muted-foreground">
                Monitor student progress and practicum activity
              </p>
            </div>
          </div>
        </div>

        {/* Practicum Overview Cards */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-foreground mb-5">
            Practicum Overview
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {practicumStats.map((stat, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-br ${stat.color} rounded-2xl p-6 border border-border/30`}
              >
                <stat.icon className="w-8 h-8 text-foreground/70 mb-3" />
                <p className="text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Linked Students */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Linked Students
            </h2>
            <span className="text-sm text-muted-foreground">
              {linkedStudents.length} students
            </span>
          </div>
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                      Student Name
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                      XP
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                      Sessions
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {linkedStudents.map((student) => (
                    <tr 
                      key={student.id} 
                      className="border-b border-border/30 last:border-0 hover:bg-muted/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                          <span className="font-medium text-foreground">
                            {student.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="text-foreground font-medium">
                          {student.xp.toLocaleString()}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-foreground">
                        {student.sessions}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          student.status === "Active" 
                            ? "bg-green-500/10 text-green-600" 
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Link to={`/portfolio/${student.id}`}>
                          <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                            View Portfolio
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* View Student Portfolios */}
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                View Student Portfolios
              </h3>
            </div>
            <div className="space-y-3">
              {linkedStudents.slice(0, 3).map((student) => (
                <Link 
                  key={student.id}
                  to={`/portfolio/${student.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {student.name}'s Portfolio
                    </span>
                  </div>
                  <Eye className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              ))}
              <Link to="/portfolio-list">
                <Button variant="outline" size="sm" className="w-full mt-2 rounded-xl">
                  View All Portfolios
                </Button>
              </Link>
            </div>
          </div>

          {/* View Activity Logs */}
          <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                View Activity Logs
              </h3>
            </div>
            <div className="space-y-3">
              {linkedStudents.slice(0, 3).map((student) => (
                <Link 
                  key={student.id}
                  to={`/activity-log/${student.id}`}
                  className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-amber-600">
                        {student.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {student.name}'s Activity Log
                    </span>
                  </div>
                  <Eye className="w-4 h-4 text-muted-foreground group-hover:text-amber-600 transition-colors" />
                </Link>
              ))}
              <Link to="/activity-log-list">
                <Button variant="outline" size="sm" className="w-full mt-2 rounded-xl">
                  View All Activity Logs
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default UniversityDashboard;
