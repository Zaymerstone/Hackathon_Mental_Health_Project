import { useState } from "react";
import { Link } from "react-router-dom";
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
  Save
} from "lucide-react";

interface ReflectionEntry {
  id: number;
  date: string;
  title: string;
  learned: string;
  challenging: string;
  differently: string;
  xpEarned: number;
}

const StudentNotebook = () => {
  const [showForm, setShowForm] = useState(false);
  const [expandedEntry, setExpandedEntry] = useState<number | null>(null);
  const [newEntry, setNewEntry] = useState({
    title: "",
    learned: "",
    challenging: "",
    differently: "",
  });

  const [entries, setEntries] = useState<ReflectionEntry[]>([
    {
      id: 1,
      date: "November 28, 2024",
      title: "The Power of Silence",
      learned: "Today I learned that silence isn't empty - it's full of answers. When I allowed space for silence, my conversation partner felt more comfortable sharing deeper thoughts.",
      challenging: "Resisting the urge to fill every pause with words or questions. My natural instinct is to keep the conversation flowing.",
      differently: "Next time, I'll count to 10 in my head before speaking after a pause, to make sure I'm giving enough space.",
      xpEarned: 25,
    },
    {
      id: 2,
      date: "November 25, 2024",
      title: "Handling Crisis Situations",
      learned: "Practiced using the escalation protocol for the first time. Understanding when to involve professional resources is crucial.",
      challenging: "Recognizing the signs that someone might need more help than I can provide as a peer listener.",
      differently: "I'll review the crisis indicators checklist before each session to keep them fresh in my mind.",
      xpEarned: 30,
    },
    {
      id: 3,
      date: "November 22, 2024",
      title: "Validation Techniques",
      learned: "Simple phrases like 'That sounds really difficult' can have a profound impact when delivered with genuine care.",
      challenging: "Making validation feel authentic rather than scripted or mechanical.",
      differently: "Focus on connecting with the emotion behind their words, not just acknowledging the words themselves.",
      xpEarned: 20,
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEntry.title || !newEntry.learned) return;

    const entry: ReflectionEntry = {
      id: entries.length + 1,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      title: newEntry.title,
      learned: newEntry.learned,
      challenging: newEntry.challenging,
      differently: newEntry.differently,
      xpEarned: 25,
    };

    setEntries([entry, ...entries]);
    setNewEntry({ title: "", learned: "", challenging: "", differently: "" });
    setShowForm(false);
  };

  const handleDownloadLog = () => {
    const link = document.createElement('a');
    link.href = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL01lZGlhQm94WzAgMCA2MTIgNzkyXS9SZXNvdXJjZXM8PC9Gb250PDwvRjEgNCAwIFI+Pj4+L0NvbnRlbnRzIDUgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4KZW5kb2JqCjUgMCBvYmoKPDwvTGVuZ3RoIDQ0Pj5zdHJlYW0KQlQKL0YxIDI0IFRmCjEwMCA3MDAgVGQKKEFjdGl2aXR5IExvZykgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoyIDAgb2JqCjw8L1R5cGUvUGFnZXMvS2lkc1szIDAgUl0vQ291bnQgMT4+CmVuZG9iagoxIDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+CmVuZG9iago2IDAgb2JqCjw8L1Byb2R1Y2VyKExpc3RlbkxhYik+PgplbmRvYmoKeHJlZgowIDcKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMzQwIDAwMDAwIG4gCjAwMDAwMDAyOTEgMDAwMDAgbiAKMDAwMDAwMDAwOSAwMDAwMCBuIAowMDAwMDAwMTQ4IDAwMDAwIG4gCjAwMDAwMDAyMTUgMDAwMDAgbiAKMDAwMDAwMDM4OSAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgNy9Sb290IDEgMCBSL0luZm8gNiAwIFI+PgpzdGFydHhyZWYKNDMyCiUlRU9G';
    link.download = 'activity-log.pdf';
    link.click();
  };

  const totalXp = entries.reduce((sum, entry) => sum + entry.xpEarned, 0);

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
                <Button type="submit" variant="hero">
                  <Save className="w-4 h-4 mr-2" />
                  Save Reflection (+25 XP)
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
          {entries.map((entry) => (
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
                  <div>
                    <h4 className="text-sm font-medium text-primary mb-2">What I learned</h4>
                    <p className="text-muted-foreground">{entry.learned}</p>
                  </div>
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
          ))}
        </div>
      </main>
    </div>
  );
};

export default StudentNotebook;
