import { Heart, Users, Lightbulb, Globe } from "lucide-react";

const WhySection = () => {
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why we built ListenLab
          </h2>
          <p className="text-lg text-muted-foreground">
            We believe everyone deserves to be heard, and every aspiring psychologist 
            deserves real practice in the art of listening.
          </p>
        </div>

        {/* Why cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-6">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Bridging the gap
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Psychology students often lack opportunities to practice their skills in real-world settings 
              before graduation. ListenLab provides a safe, supervised environment to develop empathetic 
              listening abilities while making a meaningful difference.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center mb-6">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Everyone deserves support
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Not everyone can afford therapy or has access to mental health resources. 
              ListenLab offers a free, anonymous space where anyone can find a compassionate 
              ear when they need it most.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/50 flex items-center justify-center mb-6">
              <Lightbulb className="w-6 h-6 text-accent-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Learning by doing
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              The best way to learn is through practice. Our gamified system provides 
              feedback, milestones, and reflections that help students develop into 
              skilled, confident listeners.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-soft">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center mb-6">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              A global community
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              ListenLab connects people from around the world, creating a diverse 
              community where students gain cross-cultural experience and help-seekers 
              find support across time zones.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;