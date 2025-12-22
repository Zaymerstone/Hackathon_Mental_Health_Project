import PageLayout from "@/components/layout/PageLayout";
import { FileText, Users, AlertTriangle, Scale } from "lucide-react";

const Terms = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Terms of Service</h1>
            <p className="text-lg text-muted-foreground">
              Please read these terms carefully before using ListenLab.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-soft">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Service Description</h2>
                  <p className="text-muted-foreground">
                    ListenLab is a peer support platform connecting psychology students with 
                    individuals seeking emotional support. Our service provides a space for 
                    empathetic listening and is not a substitute for professional mental health care.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Scale className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">User Responsibilities</h2>
                  <p className="text-muted-foreground mb-4">
                    By using ListenLab, you agree to:
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Treat all users with respect and kindness</li>
                    <li>Not share personally identifiable information</li>
                    <li>Report any concerning behavior to our team</li>
                    <li>Understand that listeners are not licensed therapists</li>
                    <li>Seek professional help for serious mental health concerns</li>
                  </ul>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Limitations</h2>
                  <p className="text-muted-foreground">
                    ListenLab is not a crisis service. If you or someone you know is in immediate 
                    danger, please contact emergency services or a crisis hotline. Our listeners 
                    provide emotional support but are not qualified to handle medical emergencies 
                    or provide clinical treatment.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-secondary/30 rounded-xl p-6 border border-border/50">
              <p className="text-sm text-muted-foreground">
                By creating an account or using ListenLab, you acknowledge that you have read, 
                understood, and agree to be bound by these Terms of Service. We reserve the right 
                to update these terms at any time.
              </p>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Last updated: January 2025
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Terms;
