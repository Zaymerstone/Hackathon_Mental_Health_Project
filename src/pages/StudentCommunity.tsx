import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Heart, 
  MessageCircle, 
  Users, 
  TrendingUp,
  Star,
  Award,
  Send,
  Clock,
  GraduationCap
} from "lucide-react";

interface Post {
  id: number;
  author: string;
  university: string;
  xp: number;
  title: string;
  description: string;
  replies: number;
  timestamp: string;
  comments: { author: string; text: string; timestamp: string }[];
}

const StudentCommunity = () => {
  const [newPost, setNewPost] = useState({ title: "", description: "" });
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({});
  const [userXp, setUserXp] = useState(1250);
  
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Emma J.",
      university: "Sorbonne University",
      xp: 1450,
      title: "How do you handle long silences during sessions?",
      description: "Sometimes the person I'm listening to goes quiet for a while. I'm never sure if I should wait or gently prompt them. What works for you?",
      replies: 5,
      timestamp: "2 hours ago",
      comments: [
        { author: "Lucas M.", text: "I usually wait about 10-15 seconds before offering a gentle prompt like 'Take your time.'", timestamp: "1 hour ago" },
        { author: "Sophie C.", text: "Silence can be powerful! I've learned to be comfortable with it.", timestamp: "45 min ago" },
      ]
    },
    {
      id: 2,
      author: "Noah W.",
      university: "University of Paris",
      xp: 980,
      title: "Dealing with emotional burnout",
      description: "After several intense sessions, I've been feeling emotionally drained. How do you practice self-care while being a listener?",
      replies: 8,
      timestamp: "1 day ago",
      comments: [
        { author: "Olivia D.", text: "I always take a 15-minute break between sessions for breathing exercises.", timestamp: "20 hours ago" },
      ]
    },
    {
      id: 3,
      author: "Sophie C.",
      university: "Sorbonne University",
      xp: 1820,
      title: "Tips for active listening validation phrases",
      description: "I'm building a list of validation phrases that feel natural. Share your favorites!",
      replies: 12,
      timestamp: "3 days ago",
      comments: []
    },
  ]);

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.description) return;

    const post: Post = {
      id: posts.length + 1,
      author: "You",
      university: "Your University",
      xp: userXp,
      title: newPost.title,
      description: newPost.description,
      replies: 0,
      timestamp: "Just now",
      comments: []
    };

    setPosts([post, ...posts]);
    setUserXp(prev => prev + 2); // +2 XP for posting
    setNewPost({ title: "", description: "" });
  };

  const handleComment = (postId: number) => {
    const text = commentText[postId];
    if (!text) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          replies: post.replies + 1,
          comments: [...post.comments, { author: "You", text, timestamp: "Just now" }]
        };
      }
      return post;
    }));

    setUserXp(prev => prev + 1); // +1 XP for commenting
    setCommentText({ ...commentText, [postId]: "" });
  };

  const level = Math.floor(userXp / 300) + 1;
  const xpProgress = (userXp % 300) / 300 * 100;

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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">StudyCircle Community</h1>
                  <p className="text-muted-foreground">Connect and learn with fellow psychology students.</p>
                </div>
              </div>
            </div>

            {/* Post Form */}
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Post a Question
                <span className="text-xs text-muted-foreground font-normal ml-2">+2 XP</span>
              </h2>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="What would you like to discuss?"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Share more details about your question..."
                    value={newPost.description}
                    onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <Button type="submit" variant="hero">
                  <Send className="w-4 h-4 mr-2" />
                  Post
                </Button>
              </form>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {posts.map((post) => (
                <div key={post.id} className="bg-card rounded-2xl border border-border/50 shadow-soft overflow-hidden">
                  <div className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{post.author}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <GraduationCap className="w-3 h-3" />
                            <span>{post.university}</span>
                            <span>•</span>
                            <TrendingUp className="w-3 h-3" />
                            <span>{post.xp} XP</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.timestamp}
                      </span>
                    </div>

                    {/* Post Content */}
                    <h3 className="text-lg font-semibold text-foreground mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.description}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {post.replies} replies
                      </span>
                    </div>
                  </div>

                  {/* Comments */}
                  {post.comments.length > 0 && (
                    <div className="border-t border-border/50 bg-muted/30 p-4 space-y-3">
                      {post.comments.map((comment, idx) => (
                        <div key={idx} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-medium text-secondary-foreground">
                              {comment.author.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground">{comment.author}</span>
                              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{comment.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Comment Input */}
                  <div className="border-t border-border/50 p-4">
                    <div className="flex gap-3">
                      <Input
                        placeholder="Add a comment... (+1 XP)"
                        value={commentText[post.id] || ""}
                        onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                        className="flex-1"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleComment(post.id)}
                        disabled={!commentText[post.id]}
                      >
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* XP Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft sticky top-24">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Your Progress
              </h2>

              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Star className="w-10 h-10 text-primary" />
                </div>
                <p className="text-3xl font-bold text-foreground">{userXp} XP</p>
                <p className="text-sm text-muted-foreground">Level {level}</p>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-xs text-muted-foreground mb-2">
                  <span>Progress to Level {level + 1}</span>
                  <span>{Math.round(xpProgress)}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>

              {/* Badges */}
              <div>
                <h3 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-primary" />
                  Recent Badges
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="aspect-square rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div className="aspect-square rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <div className="aspect-square rounded-lg bg-muted flex items-center justify-center">
                    <Star className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentCommunity;
