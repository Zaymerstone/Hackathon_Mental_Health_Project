import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Heart, 
  ArrowLeft, 
  CheckCircle, 
  Play, 
  BookOpen,
  Clock,
  Video,
  FileText,
  LogOut,
  GraduationCap
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/contexts/StudentContext";
import { useYouTubeProgress } from "@/hooks/useYouTubeProgress";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const TrainingModuleDetail = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { trainings, profile, refetch, isLoading, completeTraining } = useStudent();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [readingCompleted, setReadingCompleted] = useState(false);
  const awardingXpRef = useRef(false);

  // Reset per-module XP guard when switching modules
  useEffect(() => {
    awardingXpRef.current = false;
  }, [moduleId]);

  // Find the current module
  const module = trainings.find(t => t.id === moduleId);

  // Get existing progress from database
  useEffect(() => {
    const loadProgress = async () => {
      if (!profile?.id || !moduleId) return;
      
      const { data } = await supabase
        .from('student_trainings')
        .select('video_completed, reading_completed, completed_at')
        .eq('student_id', profile.id)
        .eq('module_id', moduleId)
        .maybeSingle();
      
      if (data) {
        setVideoCompleted(data.video_completed || false);
        setReadingCompleted(data.reading_completed || false);
        
        // Auto-complete if both are done but completed_at is missing
        if (data.video_completed && data.reading_completed && !data.completed_at) {
          await supabase.from('student_trainings').update({
            completed_at: new Date().toISOString(),
          }).eq('student_id', profile.id).eq('module_id', moduleId);
          
          refetch();
        }
      }
    };
    
    loadProgress();
  }, [profile?.id, moduleId]);

  // Auto-complete module when both video and reading are done
  const checkAndCompleteModule = async (newVideoComplete: boolean, newReadingComplete: boolean) => {
    if (!profile?.id || !moduleId) return;
    if (newVideoComplete && newReadingComplete) {
      await supabase.from('student_trainings').upsert({
        student_id: profile.id,
        module_id: moduleId,
        video_completed: true,
        reading_completed: true,
        completed_at: new Date().toISOString(),
      }, { onConflict: 'student_id,module_id' });

      // Award +20 XP once per module completion (centralized in StudentContext)
      if (!module?.completed && !awardingXpRef.current) {
        awardingXpRef.current = true;
        const { error } = await completeTraining(moduleId);
        if (error) {
          awardingXpRef.current = false;
        }
      }

      toast.success("Module completed! 🎓");
      refetch();
    }
  };

  // YouTube progress tracking
  const { progress: videoProgress, isComplete: videoWatched, iframeId, getEmbedUrl } = useYouTubeProgress({
    videoUrl: (module as any)?.video_url || '',
    requiredPercentage: 90,
    onComplete: async () => {
      if (!profile?.id || !moduleId || videoCompleted) return;
      
      await supabase.from('student_trainings').upsert({
        student_id: profile.id,
        module_id: moduleId,
        video_completed: true,
      }, { onConflict: 'student_id,module_id' });
      
      setVideoCompleted(true);
      toast.success("Video completed! 🎉");
      
      // Check if module should auto-complete
      checkAndCompleteModule(true, readingCompleted);
    },
  });

  // Scroll progress tracking for reading
  const { progress: readingProgress, isComplete: readingRead, containerRef } = useScrollProgress({
    requiredPercentage: 95,
    onComplete: async () => {
      if (!profile?.id || !moduleId || readingCompleted) return;
      
      await supabase.from('student_trainings').upsert({
        student_id: profile.id,
        module_id: moduleId,
        reading_completed: true,
      }, { onConflict: 'student_id,module_id' });
      
      setReadingCompleted(true);
      toast.success("Reading completed! 📚");
      
      // Check if module should auto-complete
      checkAndCompleteModule(videoCompleted, true);
    },
  });

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

  const handleCompleteModule = async () => {
    if (!profile?.id || !moduleId) return;

    setIsSaving(true);

    const { error } = await supabase.from('student_trainings').upsert({
      student_id: profile.id,
      module_id: moduleId,
      completed_at: new Date().toISOString(),
      video_completed: true,
      reading_completed: true,
    }, { onConflict: 'student_id,module_id' });

    if (error) {
      toast.error("Failed to complete module");
      setIsSaving(false);
      return;
    }

    // Award +20 XP once per module completion (centralized in StudentContext)
    if (!module?.completed && !awardingXpRef.current) {
      awardingXpRef.current = true;
      const { error: xpErr } = await completeTraining(moduleId);
      if (xpErr) {
        awardingXpRef.current = false;
      }
    }

    toast.success("Module completed! 🎓");
    refetch();
    navigate('/training-curriculum');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading module...</p>
        </div>
      </div>
    );
  }

  if (!module) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Module not found</p>
          <Link to="/training-curriculum">
            <Button variant="outline" className="mt-4">Back to Curriculum</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isVideoComplete = videoCompleted || videoWatched;
  const isReadingComplete = readingCompleted || readingRead;
  const canComplete = isVideoComplete && isReadingComplete;
  const isAlreadyCompleted = module.completed;


  // Parse reading content as markdown-like text
  const readingContent = (module as any)?.reading_content || '';

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
          to="/training-curriculum" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Curriculum
        </Link>

        {/* Module Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {isAlreadyCompleted && (
              <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium">
                <CheckCircle className="w-3 h-3" />
                Completed
              </div>
            )}
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{module.name}</h1>
          <p className="text-muted-foreground">{module.description}</p>
          <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {(module as any)?.duration_minutes || 45} min
            </span>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="bg-card rounded-xl p-6 border border-border/50 mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Your Progress</h2>
          <div className="space-y-4">
            {/* Video Progress */}
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isVideoComplete ? 'bg-primary/20' : 'bg-muted'
              }`}>
                {isVideoComplete ? (
                  <CheckCircle className="w-5 h-5 text-primary" />
                ) : (
                  <Video className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">Watch Video</span>
                  <span className="text-xs text-muted-foreground">
                    {isVideoComplete ? '100%' : `${videoProgress}%`}
                  </span>
                </div>
                <Progress value={isVideoComplete ? 100 : videoProgress} className="h-2" />
              </div>
            </div>

            {/* Reading Progress */}
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isReadingComplete ? 'bg-primary/20' : 'bg-muted'
              }`}>
                {isReadingComplete ? (
                  <CheckCircle className="w-5 h-5 text-primary" />
                ) : (
                  <FileText className="w-5 h-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground">Read Materials</span>
                  <span className="text-xs text-muted-foreground">
                    {isReadingComplete ? '100%' : `${readingProgress}%`}
                  </span>
                </div>
                <Progress value={isReadingComplete ? 100 : readingProgress} className="h-2" />
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Play className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Video Lesson</h2>
            {isVideoComplete && (
              <CheckCircle className="w-5 h-5 text-primary ml-2" />
            )}
          </div>
          <div className="aspect-video bg-black rounded-xl overflow-hidden">
            <iframe
              id={iframeId}
              src={getEmbedUrl()}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={module.name}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Watch at least 90% of the video to mark as complete
          </p>
        </div>

        {/* Reading Materials */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Reading Materials</h2>
            {isReadingComplete && (
              <CheckCircle className="w-5 h-5 text-primary ml-2" />
            )}
          </div>
          <div 
            ref={containerRef}
            className="bg-card rounded-xl border border-border/50 p-6 max-h-[500px] overflow-y-auto prose prose-sm dark:prose-invert max-w-none"
          >
            {readingContent.split('\n').map((line: string, index: number) => {
              const trimmedLine = line.trim();
              
              if (trimmedLine.startsWith('# ')) {
                return <h1 key={index} className="text-2xl font-bold text-foreground mt-6 mb-4">{trimmedLine.slice(2)}</h1>;
              }
              if (trimmedLine.startsWith('## ')) {
                return <h2 key={index} className="text-xl font-semibold text-foreground mt-5 mb-3">{trimmedLine.slice(3)}</h2>;
              }
              if (trimmedLine.startsWith('### ')) {
                return <h3 key={index} className="text-lg font-medium text-foreground mt-4 mb-2">{trimmedLine.slice(4)}</h3>;
              }
              if (trimmedLine.startsWith('- ')) {
                return <li key={index} className="text-muted-foreground ml-4">{trimmedLine.slice(2)}</li>;
              }
              if (trimmedLine === '') {
                return <br key={index} />;
              }
              return <p key={index} className="text-muted-foreground mb-2">{trimmedLine}</p>;
            })}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Scroll through all the reading materials to mark as complete
          </p>
        </div>

        {/* Complete Button */}
        <div className="bg-card rounded-xl p-6 border border-border/50">
          {isAlreadyCompleted ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Module Completed!</h3>
              <p className="text-muted-foreground mb-4">
                You have successfully completed this training module.
              </p>
              <Link to="/training-curriculum">
                <Button variant="outline">Back to Curriculum</Button>
              </Link>
            </div>
          ) : canComplete ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-foreground mb-2">Ready to Complete!</h3>
              <p className="text-muted-foreground mb-4">
                You've watched the video and read all materials. Click below to mark this module as complete.
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                onClick={handleCompleteModule}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Complete Module'}
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Complete All Requirements</h3>
              <p className="text-muted-foreground">
                Watch the full video and read all materials to complete this module.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TrainingModuleDetail;
