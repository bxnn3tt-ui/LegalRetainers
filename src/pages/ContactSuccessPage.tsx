import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";

const ContactSuccessPage = () => {
  const location = useLocation();
  const submissionData = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Message Sent | LegalRetainers"
        description="Your message has been submitted successfully."
        noIndex={true}
      />
      <StructuredData type="webPage" data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Message Sent Successfully",
        "url": "https://legalretainers.com/contact-success"
      }} />
      <Header />
      
      <main className="py-8">
        <div className="lr-width-container">
          <div className="lr-panel lr-panel--confirmation bg-primary text-primary-foreground p-8 text-center mb-8">
            <CheckCircle className="h-16 w-16 mx-auto mb-4" />
            <h1 className="lr-panel__title lr-heading-l mb-4 text-white">
              Thanks for reaching out
            </h1>
            <div className="lr-panel__body lr-body-l text-white/90">
              Reference<br />
              <strong className="lr-heading-m text-white">{submissionData?.referenceNumber || 'Contact Form'}</strong>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="lr-heading-m">What's next</h2>
            <p className="lr-body mb-6">
              We'll get back to you within a few hours during business hours.
            </p>

            {submissionData && (
              <div className="bg-muted/50 p-6 rounded-none mb-8">
                <h3 className="lr-heading-s mb-4">Your submission details</h3>
                <dl className="lr-summary-list">
                  <div className="flex justify-between py-2 border-b">
                    <dt className="lr-body font-medium">Name</dt>
                    <dd className="lr-body">{submissionData.firstName} {submissionData.lastName}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="lr-body font-medium">Email</dt>
                    <dd className="lr-body">{submissionData.email}</dd>
                  </div>
                  {submissionData.phone && (
                    <div className="flex justify-between py-2 border-b">
                      <dt className="lr-body font-medium">Phone</dt>
                      <dd className="lr-body">{submissionData.phone}</dd>
                    </div>
                  )}
                  <div className="flex justify-between py-2 border-b">
                    <dt className="lr-body font-medium">Inquiry type</dt>
                    <dd className="lr-body">{submissionData.inquiryType}</dd>
                  </div>
                </dl>
              </div>
            )}

            <div className="border-l-4 p-4 mb-8" style={{ backgroundColor: '#85994b20', borderColor: '#00703c' }}>
              <p className="lr-body-s">
                <strong>Need urgent assistance?</strong> Call us directly at{" "}
                <a href="tel:305-900-5954" className="lr-link">305-900-5954</a>
              </p>
            </div>

            <div className="flex gap-4">
              <Link to="/">
                <Button variant="default" className="lr-focus">
                  Return to homepage
                </Button>
              </Link>
              <Link to="/cases">
                <Button variant="outline" className="lr-focus">
                  Browse cases
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

export default ContactSuccessPage;
