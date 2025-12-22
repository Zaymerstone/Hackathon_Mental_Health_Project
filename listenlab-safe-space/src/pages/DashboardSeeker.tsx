import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Heart, 
  Shield, 
  MessageCircle,
  Sparkles,
  Sun,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "sonner";

const DashboardSeeker = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();

  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    if (isSigningOut) return;
    
    setIsSigningOut(true);
    const { error } = await signOut();
    
    if (error) {
      toast.error("Failed to sign out. Please try again.");
      setIsSigningOut(false);
      return;
    }
    
    toast.success("Signed out successfully");
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button 
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-semibold text-foreground">
                Listen<span className="text-primary">Lab</span>
              </span>
            </button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSignOut}
              disabled={isSigningOut}
            >
              <LogOut className="w-4 h-4 mr-2" />
              {isSigningOut ? "Signing out..." : "Sign Out"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-6">
            <Sun className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Welcome to your safe space
          </h1>
          <p className="text-lg text-muted-foreground">
            We're glad you're here. Whenever you're ready, a caring listener is waiting 
            to hear you — no judgment, just support.
          </p>
        </div>

        {/* Main action card */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="bg-gradient-to-br from-secondary/50 to-accent/30 rounded-2xl p-8 border border-border/50 shadow-card text-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-3">
              Ready to talk?
            </h2>
            <p className="text-muted-foreground mb-6">
              Connect with a trained listener who's here to support you. 
              Take all the time you need.
            </p>
            <Link to="/seeker/chat">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Find a Listener
                <Heart className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-card rounded-xl p-6 border border-border/50 shadow-soft">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Your privacy matters</h3>
            <p className="text-sm text-muted-foreground">
              All conversations are completely anonymous. Your identity is always protected.
            </p>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border/50 shadow-soft">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Trained listeners</h3>
            <p className="text-sm text-muted-foreground">
              Our listeners are psychology students trained in empathetic listening techniques.
            </p>
          </div>
        </div>

        {/* Encouraging message */}
        <div className="text-center mt-12 py-8">
          <p className="text-muted-foreground italic">
            "It takes courage to reach out. You've already taken the first step."
          </p>
        </div>
      </main>
    </div>
  );
};

export default DashboardSeeker;
