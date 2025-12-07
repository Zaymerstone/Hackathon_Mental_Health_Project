import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GraduationCap, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/supabase-client";
import { useToast } from "@/hooks/use-toast";

const LoginStudent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Check if user is already logged in
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard/student");
      }
    };
    checkSession();
  }, [navigate]);

  // Handle email confirmation redirect
  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const accessToken = searchParams.get("access_token");
      const refreshToken = searchParams.get("refresh_token");
      const type = searchParams.get("type");

      if (type === "signup" && accessToken && refreshToken) {
        // Set the session from the confirmation link
        const { error: sessionError } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (sessionError) {
          toast({
            title: "Confirmation failed",
            description: sessionError.message,
            variant: "destructive",
          });
          return;
        }

        // Check if profile exists, create if not
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          // Use array query to avoid .single() errors with RLS
          const { data: profileArray } = await supabase
            .from("student_profile")
            .select("id")
            .eq("id", user.id)
            .limit(1);

          const hasExistingProfile = profileArray && profileArray.length > 0;

          if (!hasExistingProfile) {
            // Try to create profile with metadata from signup
            const metadata = user.user_metadata || {};
            const { error: profileError } = await supabase
              .from("student_profile")
              .insert({
                id: user.id,
                full_name: metadata.full_name || "",
                institution_name: metadata.institution_name || "",
                program_name: metadata.program_name || "",
              });

            if (profileError) {
              console.error("Profile creation error:", profileError);
              // Continue anyway - profile might be created by trigger
            }
          }

          toast({
            title: "Email confirmed!",
            description: "Your account has been activated. Welcome!",
          });

          navigate("/dashboard/student");
        }
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (!data.user) {
        toast({
          title: "Login failed",
          description: "No user data returned. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Check if user has a student profile - use array query to avoid .single() errors
      const { data: profileArray, error: profileError } = await supabase
        .from("student_profile")
        .select("id")
        .eq("id", data.user.id)
        .limit(1);

      // Only log actual errors, not "not found" cases
      if (profileError && profileError.code !== "PGRST116") {
        // Non-"not found" errors might indicate RLS issues, but don't block login
        console.warn("Profile check warning:", profileError);
      }

      // Profile exists if array has at least one item
      const hasProfile = profileArray && profileArray.length > 0;

      toast({
        title: "Welcome back!",
        description: "You've been logged in successfully.",
      });

      navigate("/dashboard/student");
    } catch (err) {
      console.error("Login error:", err);
      toast({
        title: "Login failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gradient-hero">
      {/* Header */}
      <header className="p-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-card border border-border/50">
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <GraduationCap className="w-8 h-8 text-primary" />
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Student Listener Login
              </h1>
              <p className="text-muted-foreground">
                Welcome back, future listener
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@university.edu"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="h-12 rounded-xl bg-background/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="h-12 rounded-xl bg-background/50 pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Sign up link */}
            <p className="text-center text-sm text-muted-foreground mt-8">
              Don't have an account?{" "}
              <Link
                to="/signup/student"
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                Sign up as Student
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginStudent;
