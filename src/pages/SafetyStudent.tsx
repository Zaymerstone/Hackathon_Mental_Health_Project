import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, AlertCircle, Phone, Heart, BookOpen, Users } from "lucide-react";

const SafetyStudent = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header - Student logged-in layout */}
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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Safety Guidelines</h1>
            <p className="text-lg text-muted-foreground">
              Your safety and wellbeing are our top priorities. Here's how we keep ListenLab safe.
            </p>
          </div>

          {/* Crisis notice */}
          <div className="bg-destructive/10 border border-destructive/30 rounded-2xl p-6 mb-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">In Crisis?</h2>
                <p className="text-muted-foreground mb-4">
                  If you or someone you know is in immediate danger, please contact emergency 
                  services or a crisis helpline immediately. ListenLab is not equipped to handle emergencies.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="tel:911">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency: 911
                    </Button>
                  </a>
                  <a 
                    href="https://www.iasp.info/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4 mr-2" />
                      International Suicide Prevention Association
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-soft">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Community Standards</h2>
                  <ul className="text-muted-foreground space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Be respectful and kind in all interactions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Never share personal identifying information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Report any inappropriate or harmful behavior</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Maintain confidentiality of conversations</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">For Student Listeners</h2>
                  <ul className="text-muted-foreground space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Complete all required training modules before listening</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Recognize your limits - you're not a therapist</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Refer users to professional resources when needed</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Take breaks to protect your own mental health</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">For Help-Seekers</h2>
                  <ul className="text-muted-foreground space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Share what you're comfortable with - there's no pressure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Know that this is peer support, not professional therapy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>End conversations any time if you feel uncomfortable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Seek professional help for serious mental health needs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-xl p-6 text-center">
              <p className="text-muted-foreground">
                If you ever feel unsafe or witness inappropriate behavior, please report it immediately. 
                We take all reports seriously and act quickly to maintain a safe environment.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SafetyStudent;