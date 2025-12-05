import PageLayout from "@/components/layout/PageLayout";
import { Mail, MapPin, Heart } from "lucide-react";

const Contact = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-muted-foreground">
              For partnerships, questions, or university collaboration
            </p>
          </div>

          {/* Contact Cards */}
          <div className="space-y-6">
            <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-soft hover:shadow-card transition-shadow duration-300">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Omri Zalait
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">Co-founder</p>
                  <a 
                    href="mailto:omri.zalait@etu.sorbonne-universite.fr"
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    omri.zalait@etu.sorbonne-universite.fr
                  </a>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>Sorbonne Université, Paris</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-soft hover:shadow-card transition-shadow duration-300">
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-1">
                    Egor Nesterov
                  </h2>
                  <p className="text-sm text-muted-foreground mb-3">Co-founder</p>
                  <a 
                    href="mailto:egor.nesterov@etu.u-paris.fr"
                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                  >
                    egor.nesterov@etu.u-paris.fr
                  </a>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>Université Paris Cité, Paris</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-sm">
              We typically respond within 24-48 hours.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Contact;