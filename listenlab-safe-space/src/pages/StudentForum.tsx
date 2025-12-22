import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  MessageCircle,
  Plus,
  User,
  Clock,
  ChevronRight,
  X,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useStudent } from "@/contexts/StudentContext";
import { toast } from "sonner";
import { getRelativeTime } from "@/lib/timeUtils";

// XP for creating a forum post (same as comment - helping peers)
const XP_POST_CREATION = 10;

interface ForumPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  student_id: string;
  author_name: string;
  author_university: string | null;
  comment_count: number;
}

const StudentForum = () => {
  const { profile, updateProfile } = useStudent();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [publishing, setPublishing] = useState(false);

  const fetchPosts = async () => {
    try {
      // Fetch posts (author display info is stored on the post itself)
      const { data: postsData, error: postsError } = await supabase
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
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      // Fetch comment counts for all posts
      const { data: commentsData, error: commentsError } = await supabase
        .from('forum_comments')
        .select('post_id');

      if (commentsError) throw commentsError;

      // Count comments per post
      const commentCounts: Record<string, number> = {};
      commentsData?.forEach(comment => {
        commentCounts[comment.post_id] = (commentCounts[comment.post_id] || 0) + 1;
      });

      const formattedPosts: ForumPost[] = (postsData || []).map((post: any) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        created_at: post.created_at,
        student_id: post.student_id,
        author_name: post.author_name || 'Anonymous',
        author_university: post.author_university || null,
        comment_count: commentCounts[post.id] || 0,
      }));

      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();

    // Subscribe to realtime updates for posts and comments
    const postsChannel = supabase
      .channel('forum-posts-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'forum_posts'
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    const commentsChannel = supabase
      .channel('forum-comments-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'forum_comments'
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(postsChannel);
      supabase.removeChannel(commentsChannel);
    };
  }, []);

  const handlePublish = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }

    if (!profile?.id) {
      toast.error('You must be logged in to create a post');
      return;
    }

    setPublishing(true);
    try {
      const { error } = await supabase
        .from('forum_posts')
        .insert({
          student_id: profile.id,
          title: newPostTitle.trim(),
          content: newPostContent.trim(),
          author_name: profile.full_name || 'Anonymous',
          author_university: profile.university_name || null,
        });

      if (error) throw error;

      // Award XP for creating a post
      const newXp = (profile.xp || 0) + XP_POST_CREATION;
      await supabase
        .from('students')
        .update({ xp: newXp })
        .eq('id', profile.id);
      await updateProfile({ xp: newXp });

      toast.success(`Post published! +${XP_POST_CREATION} XP`);
      setShowCreatePost(false);
      setNewPostTitle("");
      setNewPostContent("");
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to publish post');
    } finally {
      setPublishing(false);
    }
  };

  const getPreview = (content: string): string => {
    const maxLength = 150;
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength).trim() + '...';
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
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-12">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No posts yet</h3>
            <p className="text-muted-foreground mb-4">Be the first to start a discussion!</p>
            <Button variant="hero" onClick={() => setShowCreatePost(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Post
            </Button>
          </div>
        ) : (
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
                        {getPreview(post.content)}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          <span>{post.author_name}</span>
                        </div>
                        {post.author_university && (
                          <>
                            <span className="text-border">•</span>
                            <span>{post.author_university}</span>
                          </>
                        )}
                        <span className="text-border">•</span>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{getRelativeTime(post.created_at)}</span>
                        </div>
                        <span className="text-border">•</span>
                        <div className="flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{post.comment_count} {post.comment_count === 1 ? 'reply' : 'replies'}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
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
                  disabled={publishing}
                >
                  Cancel
                </Button>
                <Button 
                  variant="hero" 
                  onClick={handlePublish}
                  className="flex-1"
                  disabled={publishing}
                >
                  {publishing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Publishing...
                    </>
                  ) : (
                    'Publish'
                  )}
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
