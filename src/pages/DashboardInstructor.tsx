import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Users, 
  BarChart3, 
  Download,
  GraduationCap,
  MessageCircle,
  Award,
  Clock,
  FileText,
  TrendingUp
} from "lucide-react";

const DashboardInstructor = () => {
  // Mock data - will be replaced with real data from Supabase
  const analytics = {
    totalStudents: 24,
    sessionsCompleted: 156,
    activeThisWeek: 18,
  };

  const students = [
    { name: "Emma Johnson", sessions: 12, xp: 1450, badges: 5, lastActive: "2 hours ago", reflections: 8 },
    { name: "Lucas Martin", sessions: 8, xp: 980, badges: 3, lastActive: "1 day ago", reflections: 5 },
    { name: "Sophie Chen", sessions: 15, xp: 1820, badges: 7, lastActive: "30 min ago", reflections: 12 },
    { name: "Noah Williams", sessions: 6, xp: 720, badges: 2, lastActive: "3 days ago", reflections: 4 },
    { name: "Olivia Davis", sessions: 10, xp: 1200, badges: 4, lastActive: "5 hours ago", reflections: 7 },
  ];

  const handleDownloadReport = () => {
    // Placeholder - will generate real PDF later
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCA2MTIgNzkyXS9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNCAwIFI+Pj4+L0NvbnRlbnRzIDUgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4KZW5kb2JqCjUgMCBvYmoKPDwvTGVuZ3RoIDQ0Pj5zdHJlYW0KQlQKL0YxIDI0IFRmCjEwMCA3MDAgVGQKKFByYWN0aWN1bSBSZXBvcnQpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0tpZHNbMyAwIFJdL0NvdW50IDE+PgplbmRvYmoKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKNiAwIG9iago8PC9Qcm9kdWNlcihMaXN0ZW5MYWIpPj4KZW5kb2JqCnhyZWYKMCA3CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDM0MCAwMDAwMCBuIAowMDAwMDAwMjkxIDAwMDAwIG4gCjAwMDAwMDAwMDkgMDAwMDAgbiAKMDAwMDAwMDE0OCAwMDAwMCBuIAowMDAwMDAwMjE1IDAwMDAwIG4gCjAwMDAwMDAzODkgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDcvUm9vdCAxIDAgUi9JbmZvIDYgMCBSPj4Kc3RhcnR4cmVmCjQzMgolJUVPRg==';
    link.download = 'practicum-report.pdf';
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
            <Link to="/">
              <Button variant="ghost" size="sm">Sign Out</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center">
              <Users className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Instructor Dashboard</h1>
              <p className="text-muted-foreground">Monitor student progress and practicum activity.</p>
            </div>
          </div>
        </div>

        {/* Analytics cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Total Students</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{analytics.totalStudents}</p>
          </div>
          
          <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Sessions Completed</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{analytics.sessionsCompleted}</p>
          </div>
          
          <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">Active This Week</span>
            </div>
            <p className="text-3xl font-bold text-foreground">{analytics.activeThisWeek}</p>
          </div>
        </div>

        {/* Student Activity Table */}
        <div className="bg-card rounded-2xl border border-border/50 shadow-soft mb-8 overflow-hidden">
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Student Activity
              </h2>
              <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                <Download className="w-4 h-4 mr-2" />
                Download Practicum Report (PDF)
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Student Name</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Sessions</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">XP</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Badges</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Last Active</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Reflections</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {students.map((student, index) => (
                  <tr key={index} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-foreground">{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-foreground">{student.sessions}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-foreground">
                        <TrendingUp className="w-3 h-3 text-primary" />
                        {student.xp}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-foreground">
                        <Award className="w-3 h-3 text-primary" />
                        {student.badges}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-muted-foreground text-sm">
                        <Clock className="w-3 h-3" />
                        {student.lastActive}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-foreground">
                        <FileText className="w-3 h-3 text-primary" />
                        {student.reflections}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Practicum Reports</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Generate detailed practicum-style activity logs for your students.
                </p>
                <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                  <Download className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>
            </div>
          </div>

          <Link to="/for-universities" className="block">
            <div className="bg-secondary/50 rounded-2xl p-6 border border-border/50 hover:shadow-soft transition-all h-full">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">University Resources</h3>
                  <p className="text-sm text-muted-foreground">
                    Learn more about ListenLab's university partnership program and curriculum integration.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DashboardInstructor;
