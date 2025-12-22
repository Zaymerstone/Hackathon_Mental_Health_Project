import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  ArrowLeft,
  User,
  Clock,
  MessageCircle,
  Send,
  Loader2,
  Trash2,
  Reply,
  CornerDownRight
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "@/contexts/StudentContext";
import { toast } from "sonner";
import { getRelativeTime } from "@/lib/timeUtils";
import { XP_VALUES } from "@/hooks/useXpAwarder";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  student_id: string;
  author_name: string;
  author_university: string | null;
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  student_id: string;
  author_name: string;
  parent_comment_id: string | null;
  replies?: Comment[];
}

const StudentForumPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { profile, refetch } = useStudent();
  const [post, setPost] = useState<ForumPost | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: string; author: string } | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState<string | null>(null);

  const fetchPost = async () => {
    if (!id) return;

    try {
      const { data: postData, error: postError } = await supabase
        .from('forum_posts')
        .select(`
          id,
          title,
          content,
          created_at,
          student_id,
          author_name,
          author_university
        `)
        .eq('id', id)
        .maybeSingle();

      if (postError) throw postError;

      if (!postData) {
        toast.error('Post not found');
        navigate('/student-forum');
        return;
      }

      setPost({
        id: postData.id,
        title: postData.title,
        content: postData.content,
        created_at: postData.created_at,
        student_id: postData.student_id,
        author_name: (postData as any).author_name || 'Anonymous',
        author_university: (postData as any).author_university || null,
      });

      await fetchComments();
    } catch (error) {
      console.error('Error fetching post:', error);
      toast.error('Failed to load post');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    if (!id) return;

    try {
      const { data: commentsData, error: commentsError } = await supabase
        .from('forum_comments')
        .select(`
          id,
          content,
          created_at,
          student_id,
          parent_comment_id,
          author_name
        `)
        .eq('post_id', id)
        .order('created_at', { ascending: true });

      if (commentsError) throw commentsError;

      // Organize comments into a tree structure
      const allComments: Comment[] = (commentsData || []).map((comment: any) => ({
        id: comment.id,
        content: comment.content,
        created_at: comment.created_at,
        student_id: comment.student_id,
        author_name: comment.author_name || 'Anonymous',
        parent_comment_id: comment.parent_comment_id,
        replies: [],
      }));

      // Build tree: separate top-level comments and replies
      const topLevelComments: Comment[] = [];
      const repliesMap: Record<string, Comment[]> = {};

      allComments.forEach(comment => {
        if (comment.parent_comment_id) {
          if (!repliesMap[comment.parent_comment_id]) {
            repliesMap[comment.parent_comment_id] = [];
          }
          repliesMap[comment.parent_comment_id].push(comment);
        } else {
          topLevelComments.push(comment);
        }
      });

      // Attach replies to their parent comments
      topLevelComments.forEach(comment => {
        comment.replies = repliesMap[comment.id] || [];
      });

      setComments(topLevelComments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleDeletePost = async () => {
    if (!post || post.student_id !== profile?.id) return;

    if (!confirm('Are you sure you want to delete this post?')) return;

    setDeleting(true);
    try {
      const { error } = await supabase
        .from('forum_posts')
        .delete()
        .eq('id', post.id);

      if (error) throw error;

      toast.success('Post deleted successfully');
      navigate('/student-forum');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    } finally {
      setDeleting(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    if (!profile?.id) {
      toast.error('You must be logged in to comment');
      return;
    }

    if (!id) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('forum_comments')
        .insert({
          post_id: id,
          student_id: profile.id,
          content: newComment.trim(),
          parent_comment_id: null,
          author_name: profile.full_name || 'Anonymous',
        });

      if (error) throw error;

      // Award XP for writing a comment
      const newXp = (profile.xp || 0) + XP_VALUES.WRITE_COMMENT;
      await supabase
        .from('students')
        .update({ xp: newXp })
        .eq('id', profile.id);

      toast.success(`Comment added! +${XP_VALUES.WRITE_COMMENT} XP`);
      setNewComment("");
      await fetchComments();
      refetch(); // Update forum comments count in context
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddReply = async (parentCommentId: string) => {
    if (!replyContent.trim()) {
      toast.error('Please enter a reply');
      return;
    }

    if (!profile?.id) {
      toast.error('You must be logged in to reply');
      return;
    }

    if (!id) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from('forum_comments')
        .insert({
          post_id: id,
          student_id: profile.id,
          content: replyContent.trim(),
          parent_comment_id: parentCommentId,
          author_name: profile.full_name || 'Anonymous',
        });

      if (error) throw error;

      // Award XP for writing a reply
      const newXp = (profile.xp || 0) + XP_VALUES.WRITE_COMMENT;
      await supabase
        .from('students')
        .update({ xp: newXp })
        .eq('id', profile.id);

      toast.success(`Reply added! +${XP_VALUES.WRITE_COMMENT} XP`);
      setReplyContent("");
      setReplyTo(null);
      await fetchComments();
      refetch(); // Update forum comments count in context
    } catch (error) {
      console.error('Error adding reply:', error);
      toast.error('Failed to add reply');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    setDeletingCommentId(commentId);
    try {
      const { error } = await supabase
        .from('forum_comments')
        .delete()
        .eq('id', commentId);

      if (error) throw error;

      toast.success('Comment deleted');
      await fetchComments();
      refetch(); // Update forum comments count in context
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
    } finally {
      setDeletingCommentId(null);
    }
  };

  // Get total comment count (including replies)
  const getTotalCommentCount = (): number => {
    let count = 0;
    comments.forEach(comment => {
      count += 1 + (comment.replies?.length || 0);
    });
    return count;
  };

  const renderComment = (comment: Comment, isReply = false) => {
    const isAuthor = comment.student_id === profile?.id;
    const isDeleting = deletingCommentId === comment.id;

    return (
      <div 
        key={comment.id}
        className={`${isReply ? 'ml-8 border-l-2 border-primary/20 pl-4' : ''}`}
      >
        <div className="bg-secondary/50 rounded-xl p-4 border border-border/30">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{comment.author_name}</p>
                <p className="text-xs text-muted-foreground">{getRelativeTime(comment.created_at)}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {!isReply && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyTo({ id: comment.id, author: comment.author_name })}
                  className="text-muted-foreground hover:text-primary h-8 px-2"
                >
                  <Reply className="w-4 h-4" />
                </Button>
              )}
              {isAuthor && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteComment(comment.id)}
                  disabled={isDeleting}
                  className="text-muted-foreground hover:text-destructive h-8 px-2"
                >
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
          <p className="text-sm text-foreground leading-relaxed pl-11">{comment.content}</p>
        </div>

        {/* Reply Input for this comment */}
        {replyTo?.id === comment.id && (
          <div className="mt-3 ml-8 pl-4 border-l-2 border-primary/30">
            <div className="flex items-start gap-2">
              <CornerDownRight className="w-4 h-4 text-primary mt-3 shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-2">
                  Replying to <span className="font-medium text-foreground">{replyTo.author}</span>
                </p>
                <div className="flex gap-2">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write your reply..."
                    rows={2}
                    className="flex-1 px-3 py-2 rounded-lg bg-secondary border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none text-sm"
                  />
                  <div className="flex flex-col gap-1">
                    <Button 
                      variant="hero" 
                      size="sm"
                      onClick={() => handleAddReply(comment.id)}
                      disabled={submitting}
                      className="h-8"
                    >
                      {submitting ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Send className="w-3 h-3" />
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setReplyTo(null);
                        setReplyContent("");
                      }}
                      className="h-8 text-xs"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Render Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-3 space-y-3">
            {comment.replies.map(reply => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">Post not found</h2>
          <Link to="/student-forum">
            <Button variant="hero">Back to Forum</Button>
          </Link>
        </div>
      </div>
    );
  }

  const isAuthor = post.student_id === profile?.id;

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
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold text-foreground">{post.title}</h1>
            {isAuthor && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDeletePost}
                disabled={deleting}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                {deleting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border/50">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span className="font-medium text-foreground">{post.author_name}</span>
            </div>
            {post.author_university && (
              <>
                <span className="text-border">•</span>
                <span>{post.author_university}</span>
              </>
            )}
            <span className="text-border">•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{getRelativeTime(post.created_at)}</span>
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
            Replies ({getTotalCommentCount()})
          </h2>

          {/* Add Comment */}
          <div className="mb-6 pb-6 border-b border-border/50">
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
                disabled={submitting || !newComment.trim()}
                className="self-end"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Comments List */}
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => renderComment(comment))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentForumPost;
