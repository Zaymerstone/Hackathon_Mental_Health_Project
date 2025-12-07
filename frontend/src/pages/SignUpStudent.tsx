import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Heart,
  User,
  Mail,
  Lock,
  ArrowRight,
  GraduationCap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/supabase-client";

const SignUpStudent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [institutionName, setInstitutionName] = useState("");
  const [programName, setProgramName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: "student",
            institution_name: institutionName,
            program_name: programName,
          },
        },
      });

      if (error) {
        toast({
          title: "Could not create account",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      const user = data.user;

      if (!user) {
        toast({
          title: "Signup error",
          description: "We could not create your account. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Wait a bit for the session to be established
      // Then try to insert the profile
      // If email confirmation is required, the profile will be created after email confirmation
      // via a database trigger, or we handle it differently

      // Check if we have an active session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session && session.user) {
        // User has an active session, try to insert profile
        // NOTE: This requires an RLS policy that allows:
        // INSERT ON student_profile FOR authenticated users WHERE id = auth.uid()
        const { error: profileError } = await supabase
          .from("student_profile")
          .insert({
            id: user.id,
            full_name: name,
            institution_name: institutionName,
            program_name: programName,
          });

        if (profileError) {
          console.error("Profile insert error:", profileError);

          // Check if profile already exists (maybe created by a database trigger)
          const { data: existingProfile } = await supabase
            .from("student_profile")
            .select("id")
            .eq("id", user.id)
            .single();

          if (!existingProfile) {
            // Profile doesn't exist and couldn't be created due to RLS policy
            // SOLUTION: You need to either:
            // 1. Create a database trigger that auto-creates student_profile on user signup
            // 2. Add an RLS policy: CREATE POLICY "Users can insert own profile" ON student_profile FOR INSERT TO authenticated WITH CHECK (id = auth.uid());
            toast({
              title: "Profile setup failed",
              description: `RLS policy error: ${profileError.message}. Please ensure your database has the proper RLS policies or triggers set up.`,
              variant: "destructive",
            });
            return;
          }
          // Profile exists (created by trigger), continue
        }
      } else {
        // No active session - email confirmation required
        // The profile should be created via a database trigger after email confirmation
        // OR you need to handle profile creation after the user confirms their email
        toast({
          title: "Check your email",
          description:
            "Please confirm your email address to complete signup. Your profile will be created after you confirm your email.",
        });
        navigate("/login/student");
        return;
      }

      toast({
        title: "Welcome to ListenLab!",
        description: "Your student listener account has been created.",
      });

      navigate("/dashboard/student");
    } catch (err) {
      console.error(err);
      toast({
        title: "Unexpected error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Heart className="w-5 h-5 text-primary" />
          </div>
          <span className="text-2xl font-semibold text-foreground">
            Listen<span className="text-primary">Lab</span>
          </span>
        </Link>

        {/* Card */}
        <div className="bg-card rounded-2xl p-8 shadow-card border border-border/50 gradient-card-student">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Welcome future Listener!
            </h1>
            <p className="text-muted-foreground">
              Create your student account to start making a difference
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="institution">Institution Name</Label>
              <div className="relative">
                <Input
                  id="institution"
                  type="text"
                  placeholder="Your university / college"
                  value={institutionName}
                  onChange={(e) => setInstitutionName(e.target.value)}
                  className="pl-3"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="program">Program Name</Label>
              <div className="relative">
                <Input
                  id="program"
                  type="text"
                  placeholder="e.g. Psychology, Counseling"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  className="pl-3"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="student"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create Account"}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login/student"
                className="text-primary hover:underline font-medium"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpStudent;
