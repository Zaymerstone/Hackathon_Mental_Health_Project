import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Heart, 
  BookOpen, 
  Plus, 
  Download,
  Calendar,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Save,
  GraduationCap,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useStudent } from "@/contexts/StudentContext";
import { format } from "date-fns";
import { toast } from "sonner";

const StudentNotebook = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { reflections, isLoading, addReflection } = useStudent();
  
  const [showForm, setShowForm] = useState(false);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [newEntry, setNewEntry] = useState({
    title: "",
    learned: "",
    challenging: "",
    differently: "",
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.title || !newEntry.learned) return;
    if (isSubmitting) return;

    setIsSubmitting(true);
    
    // Combine fields into content for the database
    const content = `${newEntry.title}\n\n${newEntry.learned}`;
    
    const { error } = await addReflection({
      content,
      what_learned: newEntry.learned,
      challenges: newEntry.challenging || undefined,
    });

    if (error) {
      toast.error("Failed to save reflection");
    } else {
      toast.success("Reflection saved!");
      setNewEntry({ title: "", learned: "", challenging: "", differently: "" });
      setShowForm(false);
    }
    
    setIsSubmitting(false);
  };

  const handleDownloadLog = () => {
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCA2MTIgNzkyXS9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNCAwIFI+Pj4+L0NvbnRlbnRzIDUgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4KZW5kb2JqCjUgMCBvYmoKPDwvTGVuZ3RoIDQ0Pj5zdHJlYW0KQlQKL0YxIDI0IFRmCjEwMCA3MDAgVGQKKEFjdGl2aXR5IExvZykgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoyIDAgb2JqCjw8L1R5cGUvUGFnZXMvS2lkc1szIDAgUl0vQ291bnQgMT4+CmVuZG9iagoxIDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+CmVuZG9iago2IDAgb2JqCjw8L1Byb2R1Y2VyKExpc3RlbkxhYik+PgplbmRvYmoKeHJlZgowIDcKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMzQwIDAwMDAwIG4gCjAwMDAwMDAyOTEgMDAwMDAgbiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMTQ4IDAwMDAwIG4gCjAwMDAwMDAyMTUgMDAwMDAgbiAKMDAwMDAwMDM4OSAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgNy9Sb290IDEgMCBSL0luZm8gNiAwIFI+PgpzdGFydHhyZWYKNDMyCiUlRU9G';
    link.download = 'activity-log.pdf';
    link.click();
  };

  // Calculate XP from reflections (30 XP per reflection)
  const xpPerReflection = 30;
  const totalXp = reflections.length * xpPerReflection;

  // Parse entries from reflections
  const entries = reflections.map((r) => {
    const lines = r.content.split('\n\n');
    const title = lines[0] || "Reflection";
    
    return {
      id: r.id,
      date: format(new Date(r.created_at), "MMMM d, yyyy"),
      title,
      learned: r.what_learned || lines[1] || "",
      challenging: r.challenges || "",
      differently: "", // Not stored in current schema
      xpEarned: xpPerReflection,
    };
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
            <GraduationCap className="w-6 h-6 text-primary" />
          </div>
          <p className="text-muted-foreground">Loading notebook...</p>
        </div>
      </div>
    );
  }

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
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Reflection Notebook</h1>
              <p className="text-muted-foreground">Track your learning journey and build your practicum log.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleDownloadLog}>
              <Download className="w-4 h-4 mr-2" />
              Download Activity Log (PDF)
            </Button>
            <Button variant="hero" onClick={() => setShowForm(!showForm)}>
              <Plus className="w-4 h-4 mr-2" />
              New Reflection
            </Button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-card rounded-xl p-4 border border-border/50 shadow-soft mb-8 flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Total Reflections:</span>
            <span className="font-semibold text-foreground">{entries.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">XP from Reflections:</span>
            <span className="font-semibold text-foreground">{totalXp}</span>
          </div>
        </div>

        {/* New Entry Form */}
        {showForm && (
          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft mb-8 animate-fade-up">
            <h2 className="text-lg font-semibold text-foreground mb-4">Add New Reflection</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Give your reflection a title..."
                  value={newEntry.title}
                  onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                  className="h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="learned">What did you learn?</Label>
                <Textarea
                  id="learned"
                  placeholder="Describe what you learned from this experience..."
                  value={newEntry.learned}
                  onChange={(e) => setNewEntry({ ...newEntry, learned: e.target.value })}
                  rows={3}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="challenging">What was challenging?</Label>
                <Textarea
                  id="challenging"
                  placeholder="What difficulties did you face?"
                  value={newEntry.challenging}
                  onChange={(e) => setNewEntry({ ...newEntry, challenging: e.target.value })}
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="differently">What would you do differently next time?</Label>
                <Textarea
                  id="differently"
                  placeholder="How might you approach this differently?"
                  value={newEntry.differently}
                  onChange={(e) => setNewEntry({ ...newEntry, differently: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-4 pt-2">
                <Button type="submit" variant="hero" disabled={isSubmitting}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSubmitting ? "Saving..." : `Save Reflection (+${xpPerReflection} XP)`}
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}

        {/* Entries List */}
        <div className="space-y-4">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <div 
                key={entry.id} 
                className="bg-card rounded-2xl border border-border/50 shadow-soft overflow-hidden"
              >
                <button
                  onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{entry.title}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {entry.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          +{entry.xpEarned} XP
                        </span>
                      </div>
                    </div>
                  </div>
                  {expandedEntry === entry.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>

                {expandedEntry === entry.id && (
                  <div className="px-6 pb-6 space-y-4 border-t border-border/50 pt-4 animate-fade-in">
                    {entry.learned && (
                      <div>
                        <h4 className="text-sm font-medium text-primary mb-2">What I learned</h4>
                        <p className="text-muted-foreground">{entry.learned}</p>
                      </div>
                    )}
                    {entry.challenging && (
                      <div>
                        <h4 className="text-sm font-medium text-primary mb-2">What was challenging</h4>
                        <p className="text-muted-foreground">{entry.challenging}</p>
                      </div>
                    )}
                    {entry.differently && (
                      <div>
                        <h4 className="text-sm font-medium text-primary mb-2">What I'd do differently</h4>
                        <p className="text-muted-foreground">{entry.differently}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No reflections yet. Add your first one!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentNotebook;
