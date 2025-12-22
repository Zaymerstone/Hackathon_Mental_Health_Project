import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
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
  ArrowLeft,
  GraduationCap,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/contexts/StudentContext";
import { useState } from "react";
import { toast } from "sonner";

// Map module names to icons and colors
const getModuleConfig = (moduleName: string) => {
  const configs: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
    "Active Listening Essentials": { icon: Headphones, color: "from-blue-500/20 to-blue-600/10" },
    "Empathy & Validation": { icon: HeartIcon, color: "from-rose-500/20 to-rose-600/10" },
    "Cultural Sensitivity": { icon: Globe, color: "from-emerald-500/20 to-emerald-600/10" },
    "De-escalation Basics": { icon: Shield, color: "from-amber-500/20 to-amber-600/10" },
    "Ethical Boundaries": { icon: Scale, color: "from-purple-500/20 to-purple-600/10" },
    "Crisis Awareness (Non-clinical)": { icon: AlertTriangle, color: "from-red-500/20 to-red-600/10" },
    "Boundaries Training": { icon: Scale, color: "from-purple-500/20 to-purple-600/10" },
  };
  return configs[moduleName] || { icon: BookOpen, color: "from-gray-500/20 to-gray-600/10" };
};

// Default module durations (can be stored in DB later)
const getModuleDuration = (moduleName: string) => {
  const durations: Record<string, string> = {
    "Active Listening Essentials": "45 min",
    "Empathy & Validation": "50 min",
    "Cultural Sensitivity": "40 min",
    "De-escalation Basics": "55 min",
    "Ethical Boundaries": "35 min",
    "Crisis Awareness (Non-clinical)": "60 min",
    "Boundaries Training": "40 min",
  };
  return durations[moduleName] || "30 min";
};

const TrainingCurriculum = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { trainings, completedTrainings, isLoading } = useStudent();
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading curriculum...</p>
        </div>
      </div>
    );
  }

  const modules = trainings.map((training: any) => {
    const config = getModuleConfig(training.name);
    return {
      id: training.id,
      title: training.name,
      description: training.description || "Complete this module to progress.",
      icon: config.icon,
      duration: training.duration_minutes ? `${training.duration_minutes} min` : getModuleDuration(training.name),
      color: config.color,
      completed: training.completed,
      videoCompleted: training.video_completed || false,
      readingCompleted: training.reading_completed || false,
    };
  });

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
                {completedTrainings.length} / {trainings.length} modules completed
              </span>
            </div>
            <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-500"
                style={{ width: trainings.length > 0 ? `${(completedTrainings.length / trainings.length) * 100}%` : '0%' }}
              />
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        {modules.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {modules.map((module) => {
              const ModuleIcon = module.icon;
              return (
                <div 
                  key={module.id}
                  className={`bg-gradient-to-br ${module.color} rounded-2xl p-6 border ${
                    module.completed ? "border-primary/30" : "border-border/30"
                  } shadow-soft transition-all duration-300 hover:shadow-md hover:scale-[1.02]`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      module.completed ? "bg-primary/20" : "bg-background/50"
                    }`}>
                      <ModuleIcon className={`w-6 h-6 ${module.completed ? "text-primary" : "text-foreground/70"}`} />
                    </div>
                    {module.completed && (
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
                    <Link to={`/training-module/${module.id}`}>
                      <Button 
                        variant={module.completed ? "outline" : "hero"} 
                        size="sm"
                        className="gap-2"
                      >
                        <Play className="w-3 h-3" />
                        {module.completed ? "Review" : "Start Module"}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No training modules available yet.</p>
          </div>
        )}

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
