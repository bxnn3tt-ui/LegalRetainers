import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";

const OrderSuccessPage = () => {
  const location = useLocation();
  const orderData = location.state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Order Confirmed | LegalRetainers"
        description="Your case order has been submitted successfully."
        noIndex={true}
      />
      <StructuredData type="webPage" data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Order Submitted Successfully",
        "url": "https://legalretainers.com/order-success"
      }} />
      <Header />
      
      <main className="py-8">
        <div className="lr-width-container">
          <div className="lr-panel lr-panel--confirmation bg-primary text-primary-foreground p-8 text-center mb-8">
            <CheckCircle className="h-16 w-16 mx-auto mb-4" />
            <h1 className="lr-panel__title lr-heading-l mb-4 text-white">
              We got your order
            </h1>
            <div className="lr-panel__body lr-body-l text-white/90">
              Reference<br />
              <strong className="lr-heading-m text-white">{orderData?.orderReference || 'Case Order'}</strong>
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="lr-heading-m">What happens next</h2>
            <p className="lr-body mb-6">
              Our team will review your submission and contact you within 24-48 hours to discuss case availability and next steps.
            </p>

            {orderData && (
              <div className="bg-muted/50 p-6 rounded-none mb-8">
                <h3 className="lr-heading-s mb-4">Your order summary</h3>
                <dl className="lr-summary-list">
                  <div className="flex justify-between py-2 border-b">
                    <dt className="lr-body font-medium">Law firm</dt>
                    <dd className="lr-body">{orderData.firmName}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="lr-body font-medium">Attorney</dt>
                    <dd className="lr-body">{orderData.attorneyName}</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <dt className="lr-body font-medium">Email</dt>
                    <dd className="lr-body">{orderData.email}</dd>
                  </div>
                  {orderData.phone && (
                    <div className="flex justify-between py-2 border-b">
                      <dt className="lr-body font-medium">Phone</dt>
                      <dd className="lr-body">{orderData.phone}</dd>
                    </div>
                  )}
                  {orderData.selectedCases && (
                  <div className="flex justify-between py-2 border-b">
                    <dt className="lr-body font-medium">Cases requested</dt>
                    <dd className="lr-body">{orderData.selectedCases} case(s)</dd>
                  </div>
                  )}
                </dl>
              </div>
            )}

            <div className="border-l-4 p-4 mb-8" style={{ backgroundColor: '#85994b20', borderColor: '#00703c' }}>
              <h3 className="lr-body font-medium mb-2">Important information</h3>
              <ul className="lr-body-s space-y-1">
                <li>• Case availability is subject to confirmation by LegalRetainers</li>
                <li>• Payment terms will be finalized upon case transfer initiation</li>
                <li>• All cases undergo quality screening before transfer</li>
                <li>• Cases are transferred exclusively to your firm — no competing attorneys</li>
              </ul>
            </div>

            <div className="flex gap-4">
              <Link to="/">
                <Button variant="default" className="lr-focus">
                  Return to homepage
                </Button>
              </Link>
              <Link to="/cases">
                <Button variant="outline" className="lr-focus">
                  Browse more cases
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

export default OrderSuccessPage;
