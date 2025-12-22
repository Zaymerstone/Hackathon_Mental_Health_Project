import PageLayout from "@/components/layout/PageLayout";
import { Shield, Lock, Eye, Database, Trash2 } from "lucide-react";

const Privacy = () => {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground">
              Your privacy is fundamental to ListenLab. Here's how we protect it.
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-gray max-w-none">
            <div className="bg-card rounded-2xl p-8 border border-border/50 shadow-soft mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Data Collection</h2>
                  <p className="text-muted-foreground">
                    We collect only the minimum information necessary to provide our service. 
                    For help-seekers, this means only a username - no email, no personal details. 
                    For student listeners, we collect basic account information for verification purposes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Anonymous Conversations</h2>
                  <p className="text-muted-foreground">
                    All conversations on ListenLab are anonymous. We do not store chat logs 
                    permanently or associate them with identifiable information. Your conversations 
                    are encrypted in transit and not retained after sessions end.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Database className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Data Storage</h2>
                  <p className="text-muted-foreground">
                    Account data is stored securely using industry-standard encryption. 
                    We never sell or share your personal information with third parties. 
                    Your data is stored on secure servers with restricted access.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-2">Your Rights</h2>
                  <p className="text-muted-foreground">
                    You have the right to access, modify, or delete your data at any time. 
                    Simply contact our support team or use the account settings to manage your information. 
                    Account deletion is permanent and removes all associated data.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Last updated: January 2025. If you have questions about our privacy practices, 
              please reach out to us.
            </p>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Privacy;
