import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, Heart, ArrowRight, Shield, Award, MessageCircle } from "lucide-react";

const RoleSelectionSection = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <section ref={ref} className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How would you like to connect?
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're here to practice your listening skills or seeking support, 
            ListenLab welcomes you.
          </p>
        </div>

        {/* Role cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Student Listener Card */}
          <div className="group relative bg-card rounded-2xl p-8 shadow-card border border-border/50 hover:shadow-glow hover:border-primary/20 transition-all duration-300 gradient-card-student">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Student Listener
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Psychology students looking to develop empathetic listening skills 
                in a real-world setting while making a meaningful difference.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Award className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Earn XP and badges</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Guided safety protocols</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MessageCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Practice active listening</span>
                </li>
              </ul>

              <Link to="/signup/student">
                <Button variant="student" size="lg" className="w-full group/btn">
                  Sign Up as Student
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Help-Seeker Card */}
          <div className="group relative bg-card rounded-2xl p-8 shadow-card border border-border/50 hover:shadow-glow hover:border-primary/20 transition-all duration-300 gradient-card-seeker">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-2xl font-semibold text-foreground mb-3">
                Help-Seeker
              </h3>
              
              <p className="text-muted-foreground mb-6">
                Anyone looking for a compassionate ear. Connect anonymously with 
                trained listeners who are here to support you.
              </p>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>100% anonymous</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Heart className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Judgment-free zone</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MessageCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Connect anytime</span>
                </li>
              </ul>

              <Link to="/signup/seeker">
                <Button variant="seeker" size="lg" className="w-full group/btn">
                  Find a Listener
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Sign In links */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Already have an account?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/login/student">
              <Button variant="ghost" size="lg">
                Student Login
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/login/seeker">
              <Button variant="ghost" size="lg">
                Help-Seeker Login
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
});

RoleSelectionSection.displayName = "RoleSelectionSection";

export default RoleSelectionSection;
