import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Scale, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
export const DualConversionForm = () => {
  return <section className="my-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Law Firms Section */}
        <Card className="border-2 rounded-none">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/10 rounded-none">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="lr-heading-m mb-0">For Law Firms</h3>
            </div>
            
            <h4 className="lr-heading-s mb-4">
              Simplify Your Retainer Process
            </h4>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Receive pre-qualified signed clients</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Pay only for verified retainers</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Target specific practice areas</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Scale intake without extra staffing</span>
              </li>
            </ul>

            <Button asChild variant="lr" className="w-full mb-3" size="lg">
              <Link to="/contact">Get Demo</Link>
            </Button>
            
            <p className="text-sm text-muted-foreground text-center">No setup fees • Pay per signed case</p>
          </CardContent>
        </Card>

        {/* Injured Claimants Section */}
        <Card className="border-2 rounded-none bg-primary/5">
          <CardContent className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary rounded-none">
                <Scale className="h-8 w-8 text-primary-foreground" />
              </div>
              <h3 className="lr-heading-m mb-0">For Injured Claimants</h3>
            </div>
            
            <h4 className="lr-heading-s mb-4">Get Matched With a Law Firm That Can Help</h4>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>No upfront costs</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Free case evaluation</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Speak with experienced PI attorneys</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>Get the compensation you deserve</span>
              </li>
            </ul>

            <Button asChild variant="lr" className="w-full mb-3 bg-[--lr-primary] hover:bg-[--lr-primary]/90" size="lg">
              <Link to="/request-cases">Start Your Free Claim Review</Link>
            </Button>
            
            <div className="text-sm text-muted-foreground text-center">
              
              
              <span>Available 24/7  •  100% confidential</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Schema.org markup for contact options */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LegalService",
        "name": "LegalRetainers",
        "url": "https://legalretainers.com",
        "contactPoint": [{
          "@type": "ContactPoint",
          "telephone": "+1-305-900-5954",
          "contactType": "customer service",
          "areaServed": "US",
          "availableLanguage": "en"
        }]
      })
    }} />
    </section>;
};