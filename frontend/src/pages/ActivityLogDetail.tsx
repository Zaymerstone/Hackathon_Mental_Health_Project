import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  FileText,
  ArrowLeft,
  Download,
  Calendar,
  Clock,
  MessageCircle
} from "lucide-react";

const ActivityLogDetail = () => {
  const { id } = useParams();

  // Placeholder data based on ID
  const studentNames: Record<string, string> = {
    "placeholder-1": "Emma Thompson",
    "placeholder-2": "James Wilson",
    "placeholder-3": "Sophie Chen",
    "placeholder-4": "Michael Brown",
    "placeholder-5": "Isabella Garcia",
  };

  const studentName = studentNames[id || ""] || "Student";

  // Placeholder reflections
  const reflections = [
    {
      id: 1,
      date: "Nov 28, 2024",
      duration: "45 min",
      content: "Today I practiced active listening with a student who was feeling overwhelmed with exams. I focused on using reflective statements and validation. The conversation flowed naturally, and I could see the person visibly relax as they felt heard. Key learning: silence is powerful.",
      mood: "Positive",
    },
    {
      id: 2,
      date: "Nov 25, 2024",
      duration: "30 min",
      content: "Challenging session today. The person was discussing some difficult family dynamics. I had to be very careful not to offer advice and instead focus on empathy and validation. I successfully redirected when they asked for my opinion.",
      mood: "Reflective",
    },
    {
      id: 3,
      date: "Nov 22, 2024",
      duration: "35 min",
      content: "Worked on cultural sensitivity today. Spoke with someone from a different background than mine. I made sure to ask clarifying questions rather than making assumptions. The person appreciated my genuine curiosity and openness.",
      mood: "Learning",
    },
    {
      id: 4,
      date: "Nov 19, 2024",
      duration: "50 min",
      content: "Longer session today. The person needed time to process their thoughts. I practiced comfortable silence and minimal encouragers. By the end, they had worked through their issue largely on their own - I just provided the space.",
      mood: "Fulfilled",
    },
    {
      id: 5,
      date: "Nov 15, 2024",
      duration: "25 min",
      content: "Quick check-in session. Practiced summarizing and paraphrasing. The person felt understood and validated. Sometimes short sessions can be just as impactful as longer ones.",
      mood: "Positive",
    },
  ];

  const handleDownloadPDF = () => {
    // Placeholder - would generate PDF
    console.log("Downloading activity log PDF...");
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
            <Link to="/university-dashboard">
              <Button variant="ghost" size="sm">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
        <Link 
          to="/activity-log-list" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Activity Logs
        </Link>

        {/* Page Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-600/10 flex items-center justify-center">
              <span className="text-xl font-bold text-amber-600">
                {studentName.charAt(0)}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">{studentName}'s Activity Log</h1>
              <p className="text-muted-foreground">
                Read-only view of session reflections
              </p>
            </div>
          </div>
          <Button 
            variant="hero" 
            onClick={handleDownloadPDF}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download Activity Log (PDF)
          </Button>
        </div>

        {/* Read-only notice */}
        <div className="bg-secondary/30 rounded-xl p-4 mb-8 border border-border/50">
          <p className="text-sm text-muted-foreground text-center">
            This is a read-only view. Only students can add or edit reflections.
          </p>
        </div>

        {/* Reflections */}
        <div className="space-y-6">
          {reflections.map((reflection) => (
            <div 
              key={reflection.id}
              className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {reflection.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {reflection.duration}
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {reflection.mood}
                </span>
              </div>
              <p className="text-foreground leading-relaxed">
                {reflection.content}
              </p>
            </div>
          ))}
        </div>

        {/* Summary stats */}
        <div className="mt-8 bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-2xl p-6 border border-amber-500/20">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-amber-600" />
            Summary
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-foreground">{reflections.length}</p>
              <p className="text-sm text-muted-foreground">Total Reflections</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">3h 5m</p>
              <p className="text-sm text-muted-foreground">Total Session Time</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">37 min</p>
              <p className="text-sm text-muted-foreground">Avg. Duration</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActivityLogDetail;