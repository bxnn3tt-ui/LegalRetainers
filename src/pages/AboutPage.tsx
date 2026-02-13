import { Shield, Users, Clock, CheckCircle, ExternalLink } from "lucide-react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";
import { Breadcrumbs } from "@/components/Breadcrumbs";
const AboutPage = () => {
  return <div className="min-h-screen bg-background">
      <SEOHead title="About LegalRetainers | Pre-Signed Case Delivery for Law Firms" description="Learn how LegalRetainers delivers pre-qualified, signed legal cases to plaintiff law firms. 24-48 hour delivery with complete documentation and exclusive representation rights." canonical="https://legalretainers.com/about" keywords="legal case provider, signed case delivery, law firm case acquisition, pre-qualified clients, exclusive cases" />
      <StructuredData type="organization" />
      <StructuredData type="aboutPage" />
      <StructuredData type="llmOptimizedPage" data={{
        pageName: "About LegalRetainers - Signed Cases for Law Firms",
        pageDescription: "Learn why 1,000+ law firms trust LegalRetainers for pre-signed case delivery. Get pre-qualified clients ready to work in 24-48 hours.",
        pageUrl: "https://legalretainers.com/about",
        pageType: "AboutPage",
        additionalData: {
          keywords: ["signed cases", "law firm cases", "pre-qualified clients", "legal lead generation"],
          mentions: ["Personal Injury Law", "Mass Tort Litigation", "Medical Malpractice", "Case Acquisition"]
        }
      }} />
      <StructuredData type="breadcrumbList" data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://legalretainers.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About",
            "item": "https://legalretainers.com/about"
          }
        ]
      }} />
      <StructuredData type="faqPage" data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does LegalRetainers verify case quality?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Every client is pre-qualified, signed, and verified by our legal team. Clients are ready to work immediately, eliminating intake uncertainty and allowing your firm to focus on case strategy from day one."
            }
          },
          {
            "@type": "Question",
            "name": "What is your delivery timeframe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Signed cases are delivered within 24-48 hours of request. All documentation, signed agreements, and client contact information provided immediately so you can begin case work without delay."
            }
          },
          {
            "@type": "Question",
            "name": "Do you offer exclusive representation rights?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Your firm receives 100% exclusive rights to each case. No competing attorneys, no shared clients—just clean, exclusive representation delivered directly to your practice."
            }
          },
          {
            "@type": "Question",
            "name": "What practice areas do you serve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We serve personal injury, mass tort, institutional abuse, and employment law practices nationwide with signed cases across all major case types including motor vehicle accidents, medical malpractice, and mass tort litigation."
            }
          }
        ]
      }} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": "How to Get Signed Cases from LegalRetainers",
            "description": "Step-by-step guide to receiving pre-qualified, signed legal cases for your law firm",
            "step": [
              {
                "@type": "HowToStep",
                "position": 1,
                "name": "Request Clients",
                "text": "Browse available case types and request signed cases for your practice areas through our online case marketplace.",
                "url": "https://legalretainers.com/cases"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Receive Signed Agreements",
                "text": "Get signed cases, complete client documentation, and all case details delivered securely within 24-48 hours.",
                "url": "https://legalretainers.com/about"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Begin Representation",
                "text": "Start working the case immediately—intake is complete and clients are ready to work with your firm.",
                "url": "https://legalretainers.com/about"
              }
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Review",
            "itemReviewed": {
              "@type": "Organization",
              "@id": "https://legalretainers.com/#organization"
            },
            "reviewRating": {
              "@type": "Rating",
              "ratingValue": "5",
              "bestRating": "5"
            },
            "author": {
              "@type": "Organization",
              "name": "PI Law Firm Network"
            },
            "reviewBody": "LegalRetainers delivers exactly what they promise - pre-qualified, signed cases ready to work. Their 24-48 hour delivery window and exclusive representation guarantee sets them apart in the legal case acquisition market."
          })}
        </script>
      </Helmet>
      <StructuredData type="breadcrumbList" data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "@id": "https://legalretainers.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "About",
            "@id": "https://legalretainers.com/about"
          }
        ]
      }} />
      <Header />

      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="lr-width-container">
          <Breadcrumbs items={[{ label: "About", href: "/about" }]} variant="light" />
          <h1 className="lr-heading-xl mb-4 text-white">Why Law Firms Trust LegalRetainers</h1>
          <p className="lr-body-l text-white/90 max-w-2xl">LegalRetainers delivers signed cases to plaintiff law firms nationwide. Skip intake—start working immediately with clients who are pre-qualified, already signed, and ready to work.</p>
        </div>
      </section>
      
      <main className="py-8 md:py-12">
        <div className="lr-width-container">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
            <div>
              <h2 className="lr-heading-l mb-6">Our Commitment to You</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Shield className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="lr-heading-s mb-2">Quality Assurance</h3>
                    <p className="lr-body text-muted-foreground">Every client is pre-qualified, signed, and verified by our legal team. Clients are ready to work immediately, eliminating intake uncertainty and allowing your firm to focus on case strategy from day one.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="lr-heading-s mb-2">Exclusive Representation Rights</h3>
                    <p className="lr-body text-muted-foreground">Your firm receives 100% exclusive rights to each case. No competing attorneys, no shared clients—just clean, exclusive representation delivered directly to your practice.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="lr-heading-s mb-2">Rapid Case Onboarding</h3>
                    <p className="lr-body text-muted-foreground">Signed cases are delivered within 24-48 hours of request. All documentation, signed agreements, and client contact information provided immediately so you can begin case work without delay.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="lr-heading-m">How It Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center lr-body-s font-medium flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="lr-heading-s">Request Clients</h4>
                      <p className="lr-body-s text-muted-foreground">
                        Browse available case types and request signed cases for your practice areas.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center lr-body-s font-medium flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="lr-heading-s">Receive Signed Agreements</h4>
                      <p className="lr-body-s text-muted-foreground">
                        Get signed cases, complete client documentation, and all case details delivered securely.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center lr-body-s font-medium flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="lr-heading-s">Begin Representation</h4>
                      <p className="lr-body-s text-muted-foreground">
                        Start working the case immediately—intake is complete and clients are ready to work with your firm.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="lr-heading-l mb-8 text-center">Recognition & Trust</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <ExternalLink className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="lr-heading-s mb-2">Preferred by Firms</h3>
                  <p className="lr-body-s text-muted-foreground">Recognized for streamlining case acquisition through instant signed case delivery, saving firms time and money on intake.</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="lr-heading-s mb-2">Trusted Partners</h3>
                  <p className="lr-body-s text-muted-foreground">Network of established law firms with successful track records in PI &amp; mass tort litigation.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-muted/50 p-8 rounded-none">
            <h2 className="lr-heading-l mb-6">Important Legal Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="lr-heading-s mb-3">Editorial Standards</h3>
                <ul className="space-y-2 lr-body-s">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    All content written and reviewed by legal professionals
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    Regular updates to reflect current legal developments
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    Sources cited and fact-checked for accuracy
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="lr-heading-s mb-3">Disclaimers</h3>
                <ul className="space-y-2 lr-body-s text-muted-foreground">
                  <li>• This website contains attorney advertising</li>
                  <li>• Information provided is not legal advice</li>
                  <li>• Prior results do not guarantee future outcomes</li>
                  <li>• Case quality may vary by individual circumstances</li>
                  <li>• Services provided to licensed attorneys only</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default AboutPage;
