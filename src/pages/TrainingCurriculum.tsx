import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  BookOpen, 
  Headphones, 
  Heart as HeartIcon,
  Globe,
  Shield,
  Scale,
  AlertTriangle,
  CheckCircle,
  Play,
  ArrowLeft
} from "lucide-react";

const TrainingCurriculum = () => {
  const [completedModules, setCompletedModules] = useState<string[]>(["active-listening"]);

  const modules = [
    {
      id: "active-listening",
      title: "Active Listening Essentials",
      description: "Learn the foundational techniques of active listening, including verbal and non-verbal cues, and how to create a safe space for conversation.",
      icon: Headphones,
      duration: "45 min",
      color: "from-blue-500/20 to-blue-600/10",
    },
    {
      id: "empathy",
      title: "Empathy & Validation",
      description: "Develop your ability to understand and share feelings, while validating emotions without judgment or problem-solving.",
      icon: HeartIcon,
      duration: "50 min",
      color: "from-rose-500/20 to-rose-600/10",
    },
    {
      id: "cultural-sensitivity",
      title: "Cultural Sensitivity",
      description: "Understand diverse backgrounds, perspectives, and communication styles to provide inclusive and respectful support.",
      icon: Globe,
      duration: "40 min",
      color: "from-emerald-500/20 to-emerald-600/10",
    },
    {
      id: "de-escalation",
      title: "De-escalation Basics",
      description: "Learn techniques to help calm heightened emotions and guide conversations toward a more grounded state.",
      icon: Shield,
      duration: "55 min",
      color: "from-amber-500/20 to-amber-600/10",
    },
    {
      id: "ethical-boundaries",
      title: "Ethical Boundaries",
      description: "Understand the limits of peer support, maintain appropriate boundaries, and recognize when to refer to professionals.",
      icon: Scale,
      duration: "35 min",
      color: "from-purple-500/20 to-purple-600/10",
    },
    {
      id: "crisis-awareness",
      title: "Crisis Awareness (Non-clinical)",
      description: "Recognize warning signs of crisis situations and learn appropriate response protocols and referral procedures.",
      icon: AlertTriangle,
      duration: "60 min",
      color: "from-red-500/20 to-red-600/10",
    },
  ];

  const isCompleted = (moduleId: string) => completedModules.includes(moduleId);

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
        <Link 
          to="/dashboard/student" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Training Curriculum</h1>
              <p className="text-muted-foreground">
                Complete all modules to become a certified ListenLab listener
              </p>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="bg-card rounded-xl p-4 border border-border/50 shadow-soft mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Your Progress</span>
              <span className="text-sm font-medium text-foreground">
                {completedModules.length} / {modules.length} modules completed
              </span>
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                style={{ width: `${(completedModules.length / modules.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => {
            const completed = isCompleted(module.id);
            return (
              <div 
                key={module.id}
                className={`bg-gradient-to-br ${module.color} rounded-2xl p-6 border ${
                  completed ? "border-primary/30" : "border-border/30"
                } shadow-soft transition-all duration-300 hover:shadow-md hover:scale-[1.02]`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    completed ? "bg-primary/20" : "bg-background/50"
                  }`}>
                    <module.icon className={`w-6 h-6 ${completed ? "text-primary" : "text-foreground/70"}`} />
                  </div>
                  {completed && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                      <CheckCircle className="w-3 h-3" />
                      Completed
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {module.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {module.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Duration: {module.duration}
                  </span>
                  <Button 
                    variant={completed ? "outline" : "hero"} 
                    size="sm"
                    className="gap-2"
                  >
                    <Play className="w-3 h-3" />
                    {completed ? "Review" : "Start Module"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-10 bg-secondary/30 rounded-xl p-6 border border-border/50 text-center">
          <p className="text-muted-foreground text-sm">
            Complete all training modules before you can start listening sessions. 
            Your progress is saved automatically.
          </p>
        </div>
      </main>
    </div>
  );
};

export default TrainingCurriculum;