import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/supabase-client";
import {
  Heart,
  MessageCircle,
  Plus,
  User,
  Clock,
  ChevronRight,
  X,
} from "lucide-react";

interface ForumPost {
  id: number;
  title: string;
  content: string;
  created_at: string;
  student_id: string;
  student_profile?: {
    full_name: string;
  };
}

const StudentForum = () => {
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch posts from Supabase
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("forum_posts")
        .select(
          `
          id,
          title,
          content,
          created_at,
          student_id,
          student_profile:student_id (
            full_name
          )
        `
        )
        .order("created_at", { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      // Transform the nested structure
      const transformedPosts = (data || []).map(
        (post: {
          id: number;
          title: string;
          content: string;
          created_at: string;
          student_id: string;
          student_profile:
            | { full_name: string }
            | { full_name: string }[]
            | null;
        }) => ({
          ...post,
          student_profile: Array.isArray(post.student_profile)
            ? post.student_profile[0]
            : post.student_profile,
        })
      );

      setPosts(transformedPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch posts";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      setError("Please fill in both title and content");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      // Get current user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        throw new Error("You must be logged in to create a post");
      }

      // Insert new post
      const { error: insertError } = await supabase.from("forum_posts").insert({
        student_id: user.id,
        title: newPostTitle.trim(),
        content: newPostContent.trim(),
      });

      if (insertError) {
        throw insertError;
      }

      // Reset form and close modal
      setShowCreatePost(false);
      setNewPostTitle("");
      setNewPostContent("");

      // Refetch posts
      await fetchPosts();
    } catch (err) {
      console.error("Error creating post:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create post";
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  // Helper function to format timestamp
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;

    return date.toLocaleDateString();
  };

  // Helper function to truncate content
  const truncateContent = (content: string, maxLength: number = 150) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + "...";
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
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  Sign Out
                </Button>
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
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Peer Support Forum
              </h1>
              <p className="text-muted-foreground">
                For Psychology Students — Share experiences, ask questions, grow
                together.
              </p>
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

        {/* Error State */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading posts...</p>
          </div>
        )}

        {/* Posts List */}
        {!loading && (
          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  No posts yet. Be the first to create one!
                </p>
              </div>
            ) : (
              posts.map((post) => (
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
                          {truncateContent(post.content)}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5" />
                            <span>
                              {post.student_profile?.full_name ||
                                post.student_id}
                            </span>
                          </div>
                          <span className="text-border">•</span>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{formatTimestamp(post.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        )}
      </main>

      {/* Create Post Modal */}
      {showCreatePost && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">
                Create New Post
              </h2>
              <button
                onClick={() => setShowCreatePost(false)}
                className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              {error && showCreatePost && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Post Title
                </label>
                <input
                  type="text"
                  value={newPostTitle}
                  onChange={(e) => {
                    setNewPostTitle(e.target.value);
                    setError(null);
                  }}
                  placeholder="What's on your mind?"
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Content
                </label>
                <textarea
                  value={newPostContent}
                  onChange={(e) => {
                    setNewPostContent(e.target.value);
                    setError(null);
                  }}
                  placeholder="Share your thoughts, questions, or experiences..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                  disabled={submitting}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreatePost(false);
                    setError(null);
                    setNewPostTitle("");
                    setNewPostContent("");
                  }}
                  className="flex-1"
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  variant="hero"
                  onClick={handlePublish}
                  className="flex-1"
                  disabled={submitting}
                >
                  {submitting ? "Publishing..." : "Publish"}
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
