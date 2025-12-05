import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  MessageCircle,
  Plus,
  User,
  Clock,
  ChevronRight,
  X
} from "lucide-react";

const StudentForum = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");

  // Mock data - will be replaced with real data from Supabase
  const posts = [
    {
      id: "1",
      title: "How do you handle silence during sessions?",
      author: "Sarah M.",
      university: "Sorbonne University",
      preview: "I've noticed that sometimes people need space to think, but I'm not sure how long to wait before...",
      timestamp: "2 hours ago",
      replies: 8,
    },
    {
      id: "2",
      title: "Tips for recognizing when to escalate?",
      author: "James L.",
      university: "University of Paris",
      preview: "I had a session yesterday where I wasn't sure if the person needed professional help or just wanted to vent...",
      timestamp: "5 hours ago",
      replies: 12,
    },
    {
      id: "3",
      title: "Cultural sensitivity in active listening",
      author: "Maya K.",
      university: "Sciences Po",
      preview: "Coming from a multicultural background, I've noticed that listening styles can vary significantly across cultures...",
      timestamp: "1 day ago",
      replies: 15,
    },
    {
      id: "4",
      title: "Managing your own emotions during heavy sessions",
      author: "Alex T.",
      university: "Sorbonne University",
      preview: "Sometimes the stories I hear really affect me. How do you all practice self-care and maintain boundaries...",
      timestamp: "2 days ago",
      replies: 23,
    },
    {
      id: "5",
      title: "Best practices for ending a session gracefully",
      author: "Emma J.",
      university: "University of Paris",
      preview: "I sometimes struggle with knowing how to wrap up a conversation in a way that feels natural and supportive...",
      timestamp: "3 days ago",
      replies: 9,
    },
  ];

  const handlePublish = () => {
    // UI only - no actual submission
    setShowCreatePost(false);
    setNewPostTitle("");
    setNewPostContent("");
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
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Peer Support Forum</h1>
              <p className="text-muted-foreground">For Psychology Students — Share experiences, ask questions, grow together.</p>
            </div>
            <Button 
              variant="hero" 
              onClick={() => setShowCreatePost(true)}
              className="shrink-0"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Post
            </Button>
          </div>
        </div>

        {/* Posts List */}
        <div className="space-y-4">
          {posts.map((post) => (
            <Link 
              key={post.id}
              to={`/student-forum/post/${post.id}`}
              className="block"
            >
              <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft hover:shadow-md hover:border-primary/20 transition-all duration-300 group">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.preview}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        <span>{post.author}</span>
                      </div>
                      <span className="text-border">•</span>
                      <span>{post.university}</span>
                      <span className="text-border">•</span>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{post.timestamp}</span>
                      </div>
                      <span className="text-border">•</span>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>{post.replies} replies</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Create New Post</h2>
              <button 
                onClick={() => setShowCreatePost(false)}
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Post Title
                </label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                  placeholder="What's on your mind?"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Content
                </label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder="Share your thoughts, questions, or experiences..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreatePost(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  variant="hero" 
                  onClick={handlePublish}
                  className="flex-1"
                >
                  Publish (UI Only)
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentForum;
