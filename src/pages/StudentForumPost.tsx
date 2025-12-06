import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ArrowLeft,
  User,
  Clock,
  MessageCircle,
  Send,
  Loader2,
  AlertCircle
} from "lucide-react";
import { getForumPostById, getCommentsForPost, createForumComment, type ForumPost, type ForumComment } from "../../backend/forumService";
import { supabase } from "@/integrations/supabase/client";

// Helper function to format relative time
const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
};

const StudentForumPost = () => {
  const { id } = useParams();
  const [newComment, setNewComment] = useState("");
  const [post, setPost] = useState<ForumPost | null>(null);
  const [comments, setComments] = useState<ForumComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [postingComment, setPostingComment] = useState(false);
  const [studentInfo, setStudentInfo] = useState<Record<string, { name: string; university: string }>>({});

  // Fetch post and comments on mount
  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("Post ID is required");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch post
        const fetchedPost = await getForumPostById(id);
        setPost(fetchedPost);

        // Fetch comments
        const fetchedComments = await getCommentsForPost(id);
        setComments(fetchedComments);

        // Fetch student info for post author and comment authors
        const studentIds = new Set<string>();
        studentIds.add(fetchedPost.student_id);
        fetchedComments.forEach(comment => studentIds.add(comment.student_id));

        const studentInfoMap: Record<string, { name: string; university: string }> = {};
        
        for (const studentId of studentIds) {
          try {
            // Try to get student info from a students table
            const { data: studentData, error: studentError } = await supabase
              .from('students')
              .select('name, university')
              .eq('id', studentId)
              .single();
            
            if (studentData && !studentError) {
              studentInfoMap[studentId] = {
                name: studentData.name || "Student",
                university: studentData.university || "University"
              };
            } else {
              // Fallback to placeholder
              studentInfoMap[studentId] = {
                name: "Student",
                university: "University"
              };
            }
          } catch (err) {
            studentInfoMap[studentId] = {
              name: "Student",
              university: "University"
            };
          }
        }
        setStudentInfo(studentInfoMap);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load post");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleAddComment = async () => {
    if (!id || !newComment.trim()) {
      setError("Please enter a comment");
      return;
    }

    try {
      setPostingComment(true);
      setError(null);

      // Get current user
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error("You must be logged in to add a comment");
      }

      await createForumComment(user.id, id, newComment.trim());
      
      // Refresh comments
      const fetchedComments = await getCommentsForPost(id);
      setComments(fetchedComments);
      
      setNewComment("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add comment");
      console.error("Error adding comment:", err);
    } finally {
      setPostingComment(false);
    }
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

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-destructive/10 border border-destructive/20 rounded-xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-destructive shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : !post ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Post not found</p>
          </div>
        ) : (
          <>
            {/* Post Content */}
            <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-soft mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium text-foreground">
                    {studentInfo[post.student_id]?.name || "Student"}
                  </span>
                </div>
                <span className="text-border">•</span>
                <span>{studentInfo[post.student_id]?.university || "University"}</span>
                <span className="text-border">•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{formatRelativeTime(post.created_at)}</span>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-foreground whitespace-pre-wrap leading-relaxed">{post.content}</p>
              </div>
            </div>
          </>
        )}

        {/* Comments Section */}
        {!loading && post && (
          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
            <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              Comments ({comments.length})
            </h2>

            {/* Comments List */}
            <div className="space-y-4 mb-6">
              {comments.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map((comment) => {
                  const student = studentInfo[comment.student_id] || { name: "Student", university: "University" };
                  return (
                    <div 
                      key={comment.id}
                      className="bg-secondary/50 rounded-xl p-4 border border-border/30"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{student.name}</p>
                          <p className="text-xs text-muted-foreground">{formatRelativeTime(comment.created_at)}</p>
                        </div>
                      </div>
                      <p className="text-sm text-foreground leading-relaxed pl-11">{comment.content}</p>
                    </div>
                  );
                })
              )}
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
                  disabled={postingComment}
                />
                <Button 
                  variant="hero" 
                  onClick={handleAddComment}
                  className="self-end"
                  disabled={postingComment || !newComment.trim()}
                >
                  {postingComment ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default StudentForumPost;
