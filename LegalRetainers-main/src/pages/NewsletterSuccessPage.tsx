import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";

const NewsletterSuccessPage = () => {
  const location = useLocation();
  const subscriptionData = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Newsletter Subscription Confirmed | LegalRetainers"
        description="You've successfully subscribed to our newsletter."
        noIndex={true}
      />
      <StructuredData type="webPage" data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Newsletter Subscription Confirmed",
        "url": "https://legalretainers.com/newsletter-success"
      }} />
      <Header />
      
      <main className="py-8">
        <div className="lr-width-container">
          <div className="lr-panel lr-panel--confirmation bg-primary text-primary-foreground p-8 text-center mb-8">
            <CheckCircle className="h-16 w-16 mx-auto mb-4" />
            <h1 className="lr-panel__title lr-heading-l mb-4 text-white">
              You're on the list
            </h1>
            <div className="lr-panel__body lr-body-l text-white/90">
              Welcome aboard, {subscriptionData?.name || 'subscriber'}
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="lr-heading-m">What's next</h2>
            <p className="lr-body mb-6">
              Keep an eye on your inbox for case updates, deadlines, and news worth knowing.
            </p>

            {subscriptionData && (
              <div className="bg-muted/50 p-6 rounded-none mb-8">
                <h3 className="lr-heading-s mb-4">Your subscription details</h3>
                <dl className="lr-summary-list">
                  <div className="flex justify-between py-2 border-b">
                    <dt className="lr-body font-medium">Name</dt>
                    <dd className="lr-body">{subscriptionData.name}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="lr-body font-medium">Email</dt>
                    <dd className="lr-body">{subscriptionData.email}</dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="border-l-4 p-4 mb-8" style={{ backgroundColor: '#85994b20', borderColor: '#00703c' }}>
              <p className="lr-body-s">
                <strong>Privacy first:</strong> You can unsubscribe at any time using the link in any newsletter email. We respect your privacy and will never share your information.
              </p>
            </div>

            <div className="flex gap-4">
              <Link to="/updates">
                <Button variant="default" className="lr-focus">
                  View latest updates
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" className="lr-focus">
                  Return to homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NewsletterSuccessPage;
