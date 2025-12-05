import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, GraduationCap, ArrowRight } from "lucide-react";

const SignIn = () => {
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
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
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-card border border-border/50">
          <div className="text-center mb-10">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Welcome back</h1>
            <p className="text-muted-foreground">How would you like to sign in?</p>
          </div>

          {/* Role selection cards */}
          <div className="grid gap-4">
            <Link to="/login/student" className="group">
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 hover:border-primary/40 hover:shadow-soft transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">Student Listener</h3>
                  <p className="text-sm text-muted-foreground">Sign in with your email</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>

            <Link to="/login/seeker" className="group">
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-secondary/50 to-secondary border border-primary/10 hover:border-primary/30 hover:shadow-soft transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-1">Help-Seeker</h3>
                  <p className="text-sm text-muted-foreground">Sign in with your username</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/" className="text-primary hover:underline font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;