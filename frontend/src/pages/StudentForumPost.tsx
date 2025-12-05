import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ArrowLeft,
  User,
  Clock,
  MessageCircle,
  Send
} from "lucide-react";

const StudentForumPost = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");

  // Mock data - will be replaced with real data from Supabase
  const postsData: Record<string, {
    title: string;
    author: string;
    university: string;
    content: string;
    timestamp: string;
    comments: Array<{ author: string; content: string; timestamp: string }>;
  }> = {
    "1": {
      title: "How do you handle silence during sessions?",
      author: "Sarah M.",
      university: "Sorbonne University",
      content: `I've noticed that sometimes people need space to think, but I'm not sure how long to wait before saying something.

In my training, we learned that silence can be a powerful tool, but in practice, I find myself getting uncomfortable after about 10 seconds. Does anyone have tips for:

1. How to become more comfortable with silence?
2. Signs that indicate if the silence is helpful or awkward?
3. Gentle ways to break silence if needed?

I'd love to hear about your experiences and what has worked for you!`,
      timestamp: "2 hours ago",
      comments: [
        {
          author: "James L.",
          content: "Great question! I've found that counting slowly in my head helps me stay calm during silence. Usually by the time I reach 15-20, the person starts speaking again.",
          timestamp: "1 hour ago",
        },
        {
          author: "Maya K.",
          content: "I try to observe their body language during silence. If they seem contemplative (looking away, thinking), I let it continue. If they seem uncomfortable, I might gently reflect back what they said.",
          timestamp: "45 minutes ago",
        },
        {
          author: "Alex T.",
          content: "One thing that helped me was practicing silence in my personal life first. Try having a conversation with a friend where you consciously allow more pauses. It becomes more natural over time!",
          timestamp: "30 minutes ago",
        },
      ],
    },
    "2": {
      title: "Tips for recognizing when to escalate?",
      author: "James L.",
      university: "University of Paris",
      content: `I had a session yesterday where I wasn't sure if the person needed professional help or just wanted to vent.

They mentioned feeling hopeless, but when I asked follow-up questions, they said they weren't thinking about harming themselves. Still, I felt uncertain.

What are the key signs you look for when deciding whether to:
- Continue the conversation normally
- Suggest professional resources
- Immediately escalate to crisis support

Any frameworks or checklists you use?`,
      timestamp: "5 hours ago",
      comments: [
        {
          author: "Emma J.",
          content: "The safety protocol training covers this well, but in practice I always err on the side of caution. If someone mentions hopelessness, I gently share crisis resources even if they say they're okay.",
          timestamp: "4 hours ago",
        },
        {
          author: "Sarah M.",
          content: "I use the SLAP method - Specificity, Lethality, Availability, Proximity. The more specific their thoughts, the more urgent the escalation needs to be.",
          timestamp: "3 hours ago",
        },
      ],
    },
  };

  const post = postsData[id || "1"] || postsData["1"];

  const handleAddComment = () => {
    // UI only - no actual submission
    setNewComment("");
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
        {/* Back Button */}
        <Link 
          to="/student-forum"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Forum
        </Link>

        {/* Post Content */}
        <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-soft mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-4">{post.title}</h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium text-foreground">{post.author}</span>
            </div>
            <span className="text-border">•</span>
            <span>{post.university}</span>
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.timestamp}</span>
            </div>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-foreground whitespace-pre-wrap leading-relaxed">{post.content}</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
          <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Comments ({post.comments.length})
          </h2>

          {/* Comments List */}
          <div className="space-y-4 mb-6">
            {post.comments.map((comment, idx) => (
              <div 
                key={idx}
                className="bg-secondary/50 rounded-xl p-4 border border-border/30"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">{comment.timestamp}</p>
                  </div>
                </div>
                <p className="text-sm text-foreground leading-relaxed pl-11">{comment.content}</p>
              </div>
            ))}
          </div>

          {/* Add Comment */}
          <div className="pt-4 border-t border-border/50">
            <label className="block text-sm font-medium text-foreground mb-2">
              Add a Comment
            </label>
            <div className="flex gap-3">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={3}
                className="flex-1 px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
              />
              <Button 
                variant="hero" 
                onClick={handleAddComment}
                className="self-end"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This is a UI placeholder. Comments are not saved.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentForumPost;
