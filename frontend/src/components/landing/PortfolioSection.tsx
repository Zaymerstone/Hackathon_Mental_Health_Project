import { Award, Briefcase, GraduationCap, TrendingUp, FileText, Users } from "lucide-react";

const PortfolioSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary mb-6">
            <Briefcase className="w-4 h-4" />
            Professional Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Build your professional portfolio
          </h2>
          <p className="text-lg text-muted-foreground">
            Every conversation you have contributes to your professional growth. 
            Showcase your empathetic listening skills to the world.
          </p>
        </div>

        {/* Portfolio features */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          <div className="group bg-card rounded-2xl p-7 border border-border/50 shadow-soft hover:shadow-card hover:border-primary/20 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Track Your Progress
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              XP points, levels, and milestones that visualize your growth as an empathetic listener over time.
            </p>
          </div>

          <div className="group bg-card rounded-2xl p-7 border border-border/50 shadow-soft hover:shadow-card hover:border-primary/20 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Earn Badges & Certifications
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Collect achievement badges that demonstrate specific skills and competencies in active listening.
            </p>
          </div>

          <div className="group bg-card rounded-2xl p-7 border border-border/50 shadow-soft hover:shadow-card hover:border-primary/20 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Reflection Journal
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Document your insights and learning moments to demonstrate professional development and self-awareness.
            </p>
          </div>
        </div>

        {/* Showcase card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-card to-secondary/20 rounded-3xl p-8 md:p-10 border border-border/50 shadow-card">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Impress those who matter
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Your ListenLab portfolio can be shared with internship supervisors, university professors, 
                  graduate school admissions committees, and potential employers to demonstrate real-world 
                  experience in empathetic communication.
                </p>
                <div className="flex flex-wrap gap-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 text-sm text-muted-foreground border border-border/50">
                    <GraduationCap className="w-4 h-4 text-primary" />
                    Master's Admissions
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 text-sm text-muted-foreground border border-border/50">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Job Applications
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 text-sm text-muted-foreground border border-border/50">
                    <Users className="w-4 h-4 text-primary" />
                    Internship Reviews
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Award className="w-16 h-16 md:w-20 md:h-20 text-primary/60" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;