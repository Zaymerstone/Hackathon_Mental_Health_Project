import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Users, 
  BarChart3, 
  Shield, 
  Award,
  BookOpen,
  CheckCircle,
  ArrowRight,
  FileText,
  MessageCircle,
  TrendingUp,
  Clock,
  Globe,
  Heart,
  Layers,
  Download
} from "lucide-react";

const ForUniversities = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary mb-6">
            <GraduationCap className="w-4 h-4" />
            Partner with ListenLab
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Empower your psychology program
          </h1>
          <p className="text-xl text-muted-foreground">
            Give your students real-world experience in empathetic listening while 
            providing a valuable mental wellness resource for your campus community.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Practical Training</h3>
            <p className="text-muted-foreground">
              Students gain hands-on experience with active listening techniques in a 
              supervised, safe environment.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Progress Tracking</h3>
            <p className="text-muted-foreground">
              Comprehensive analytics and reporting tools help faculty monitor student 
              development and program impact.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Safety First</h3>
            <p className="text-muted-foreground">
              Built-in safety protocols and escalation procedures protect both students 
              and help-seekers.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Campus Wellness</h3>
            <p className="text-muted-foreground">
              Provide an accessible mental wellness resource for your entire campus 
              community, 24/7.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Gamified Learning</h3>
            <p className="text-muted-foreground">
              XP points, badges, and levels keep students engaged while developing 
              critical therapeutic skills.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Curriculum Integration</h3>
            <p className="text-muted-foreground">
              Easily integrate ListenLab into existing courses as a practical component 
              of psychology education.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border/50 shadow-soft mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            How Partnership Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-semibold">
                1
              </div>
              <h3 className="font-semibold text-foreground mb-2">Onboarding</h3>
              <p className="text-sm text-muted-foreground">
                We work with your department to customize the platform and train faculty supervisors.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-semibold">
                2
              </div>
              <h3 className="font-semibold text-foreground mb-2">Student Training</h3>
              <p className="text-sm text-muted-foreground">
                Students complete our comprehensive listening skills curriculum before going live.
              </p>
            </div>
            <div className="text-center">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 font-semibold">
                3
              </div>
              <h3 className="font-semibold text-foreground mb-2">Launch & Support</h3>
              <p className="text-sm text-muted-foreground">
                Your program goes live with ongoing support, analytics, and regular check-ins.
              </p>
            </div>
          </div>
        </div>

        {/* Course Integration Section */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Course Integration Modules
            </h2>
            <p className="text-muted-foreground">
              ListenLab provides plug-and-play modules designed to integrate seamlessly 
              into your existing psychology curriculum.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
              <MessageCircle className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Reflective Listening</h3>
              <p className="text-sm text-muted-foreground">
                Core module teaching students to reflect back emotions and content accurately.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
              <Heart className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Communication Skills</h3>
              <p className="text-sm text-muted-foreground">
                Advanced techniques for building rapport and maintaining therapeutic presence.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
              <Shield className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Ethical Boundaries</h3>
              <p className="text-sm text-muted-foreground">
                Training on maintaining professional boundaries in peer support settings.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
              <Globe className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Cultural Communication</h3>
              <p className="text-sm text-muted-foreground">
                Developing cultural sensitivity and inclusive listening practices.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
              <BookOpen className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Structured Reflection</h3>
              <p className="text-sm text-muted-foreground">
                Guided reflection exercises to process and learn from each interaction.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 border border-primary/20">
              <Layers className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold text-foreground mb-2">Crisis Recognition</h3>
              <p className="text-sm text-muted-foreground">
                Identifying signs of crisis and proper escalation procedures.
              </p>
            </div>
          </div>
        </div>

        {/* Instructor Dashboard Overview */}
        <div className="bg-card rounded-2xl p-8 md:p-12 border border-border/50 shadow-soft mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Instructor Dashboard
            </h2>
            <p className="text-muted-foreground">
              A comprehensive dashboard giving instructors real-time visibility into 
              student progress and engagement.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-muted/50 rounded-xl">
              <BarChart3 className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Student Analytics</h3>
              <p className="text-xs text-muted-foreground">
                Track sessions, XP, and engagement metrics
              </p>
            </div>
            
            <div className="text-center p-6 bg-muted/50 rounded-xl">
              <FileText className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Reflections</h3>
              <p className="text-xs text-muted-foreground">
                Review student learning reflections
              </p>
            </div>
            
            <div className="text-center p-6 bg-muted/50 rounded-xl">
              <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">Practicum Logs</h3>
              <p className="text-xs text-muted-foreground">
                Structured activity documentation
              </p>
            </div>
            
            <div className="text-center p-6 bg-muted/50 rounded-xl">
              <Award className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-foreground mb-1">XP & Badges</h3>
              <p className="text-xs text-muted-foreground">
                Gamified progress tracking
              </p>
            </div>
          </div>
        </div>

        {/* Practicum Report System */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-secondary/30 to-secondary/50 rounded-2xl p-8 border border-border/50">
            <Download className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Practicum Report System
            </h2>
            <p className="text-muted-foreground mb-6">
              Instructors can download comprehensive practicum-style activity reports 
              documenting each student's listening practice. Reports include session 
              counts, hours logged, reflection summaries, and skill development metrics.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                PDF export for academic records
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Individual and cohort reports
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Competency assessment mapping
              </li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-accent/30 to-accent/50 rounded-2xl p-8 border border-border/50">
            <Heart className="w-12 h-12 text-primary mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Campus Wellness Integration
            </h2>
            <p className="text-muted-foreground mb-6">
              Universities can deploy ListenLab as a 24/7 structured safe-space for 
              campus mental wellness. Students get anonymous access to peer support, 
              while psychology students gain practical experience.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Anonymous peer support access
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Crisis escalation protocols
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Integration with campus resources
              </li>
            </ul>
          </div>
        </div>

        {/* University Representative Access */}
        <div className="bg-card/60 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-border/50 shadow-soft mb-16">
          <div className="text-center max-w-xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-5">
              <GraduationCap className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">
              🎓 University Representative Access
            </h2>
            <p className="text-muted-foreground mb-6">
              Already partnered with ListenLab? Access your institution's dashboard to monitor 
              student progress and manage your program.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/university-login">
                <Button variant="default" size="lg" className="rounded-xl px-8">
                  University Login
                </Button>
              </Link>
              <Link to="/university-signup">
                <Button variant="outline" size="lg" className="rounded-xl px-8">
                  Create University Account
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 md:p-12 border border-primary/20">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Ready to transform psychology education?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join universities worldwide using ListenLab to bridge the gap between 
            classroom learning and real-world practice.
          </p>
          <Link to="/contact">
            <Button variant="hero" size="xl">
              Contact Us
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Free pilot program
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              Dedicated support
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-primary" />
              FERPA compliant
            </span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ForUniversities;
