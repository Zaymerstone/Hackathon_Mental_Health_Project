import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface HeaderProps {
  onGetStartedClick?: () => void;
}

const Header = ({ onGetStartedClick }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              Listen<span className="text-primary">Lab</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/for-universities"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              For Universities
            </Link>
            <Link
              to="/safety"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Safety
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Link to="/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Button variant="hero" size="sm" onClick={onGetStartedClick}>
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
