import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/supabase-client";
import {
  Heart,
  GraduationCap,
  Award,
  Shield,
  MessageCircle,
  TrendingUp,
  Star,
  BookOpen,
  Briefcase,
  Users,
  BookMarked,
} from "lucide-react";

interface StudentProfile {
  id: string;
  full_name: string;
  institution_name: string;
  program_name: string;
  xp: number;
  level: number;
  total_sessions: number;
  total_hours: number;
  modules_completed: number;
  can_listen: boolean;
}

const DashboardStudent = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get current user
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        // User not authenticated, redirect to login
        navigate("/login/student");
        return;
      }

      // Fetch student profile - use array query to avoid .single() errors with RLS
      // This safely handles cases where 0 or 1 rows are returned
      const { data: profileArray, error: profileError } = await supabase
        .from("student_profile")
        .select("*")
        .eq("id", user.id)
        .limit(1);

      // Check for actual errors (network errors, RLS permission errors, etc.)
      if (profileError) {
        // Check if it's a permission/RLS error
        if (
          profileError.code === "42501" ||
          profileError.message.includes("permission")
        ) {
          throw new Error(
            "Permission denied. Please ensure your RLS policies allow authenticated users to read their own profile."
          );
        }
        throw profileError;
      }

      // Safely extract profile from array
      const profileData =
        profileArray && profileArray.length > 0 ? profileArray[0] : null;

      // Handle case where profile doesn't exist
      if (!profileData) {
        // Profile doesn't exist - this might happen if it wasn't created during signup
        // Try to create it with user metadata if available
        const metadata = user.user_metadata || {};
        const { data: newProfile, error: createError } = await supabase
          .from("student_profile")
          .insert({
            id: user.id,
            full_name:
              metadata.full_name || user.email?.split("@")[0] || "Student",
            institution_name: metadata.institution_name || "",
            program_name: metadata.program_name || "",
          })
          .select()
          .single();

        if (createError) {
          // If creation fails (likely RLS), log but don't throw - user can still see dashboard
          console.warn("Could not create profile automatically:", createError);
          setError(
            "Profile not found. Please contact support to set up your profile."
          );
          return;
        }

        if (newProfile) {
          setProfile(newProfile);
          return;
        }

        // If we still don't have a profile, show error but don't crash
        setError("Profile not found. Please contact support.");
        return;
      }

      // Profile found successfully
      setProfile(profileData);
    } catch (err) {
      console.error("Error fetching profile:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Failed to load profile";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  const stats = profile
    ? {
        xp: profile.xp || 0,
        level: profile.level || 1,
        sessionsCompleted: profile.total_sessions || 0,
        hoursListened: profile.total_hours || 0,
      }
    : {
        xp: 0,
        level: 1,
        sessionsCompleted: 0,
        hoursListened: 0,
      };

  const badges = [
    { name: "First Listen", icon: MessageCircle, earned: true },
    { name: "Empathy Pro", icon: Heart, earned: true },
    { name: "Night Owl", icon: Star, earned: false },
    { name: "Streak Master", icon: TrendingUp, earned: false },
  ];

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
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* Welcome section */}
        {!loading && profile && (
          <>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Welcome, {profile.full_name}!
                  </h1>
                  <p className="text-muted-foreground">
                    {profile.institution_name} • {profile.program_name}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Stats grid */}
        {!loading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Total XP</span>
              </div>
              <p className="text-3xl font-bold text-foreground">{stats.xp}</p>
            </div>

            <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft">
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Level</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {stats.level}
              </p>
            </div>

            <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft">
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Sessions</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {stats.sessionsCompleted}
              </p>
            </div>

            <div className="bg-card rounded-xl p-5 border border-border/50 shadow-soft">
              <div className="flex items-center gap-3 mb-2">
                <Heart className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Hours</span>
              </div>
              <p className="text-3xl font-bold text-foreground">
                {stats.hoursListened}
              </p>
            </div>
          </div>
        )}

        {/* Main action */}
        {!loading && (
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 mb-8 border border-primary/20">
            <div className="text-center max-w-md mx-auto">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Ready to Listen?
              </h2>
              <p className="text-muted-foreground mb-6">
                Connect with someone who needs your empathetic ear. Every
                conversation makes a difference.
              </p>
              <Link to="/chat">
                <Button variant="hero" size="xl">
                  Start Listening
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Badges section */}
        {!loading && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              Your Badges
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.name}
                  className={`bg-card rounded-xl p-4 border text-center ${
                    badge.earned
                      ? "border-primary/30 shadow-soft"
                      : "border-border/50 opacity-50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center ${
                      badge.earned ? "bg-primary/10" : "bg-muted"
                    }`}
                  >
                    <badge.icon
                      className={`w-5 h-5 ${
                        badge.earned ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {badge.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {badge.earned ? "Earned" : "Locked"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Training Curriculum Card */}
        {!loading && (
          <Link
            to="/dashboard/student/training-curriculum"
            className="block mb-8"
          >
            <div className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 rounded-xl p-6 border border-amber-500/20 shadow-soft hover:shadow-md hover:border-amber-500/30 transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <BookMarked className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    Training Curriculum →
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Complete the ListenLab listening skills program before going
                    live.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Portfolio & Forum Shortcuts */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Portfolio Card */}
            <Link to="/dashboard/student/portfolio" className="block">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20 shadow-soft hover:shadow-md hover:border-primary/30 transition-all duration-300 h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      View My Portfolio
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Showcase your listening achievements for internships,
                      practicum credit, or graduate applications.
                    </p>
                  </div>
                </div>
              </div>
            </Link>

            {/* Peer Forum Card */}
            <Link to="/student-forum" className="block">
              <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-xl p-6 border border-border/50 shadow-soft hover:shadow-md hover:border-primary/20 transition-all duration-300 h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      Peer Support Forum
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Ask questions, get feedback from fellow psychology
                      students.
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Safety guidelines link */}
        {!loading && (
          <div className="bg-secondary/50 rounded-xl p-6 border border-border/50">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  Safety Guidelines
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Review our safety protocols and best practices for supporting
                  others.
                </p>
                <Link to="/safety-student">
                  <Button variant="outline" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read Guidelines
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardStudent;
