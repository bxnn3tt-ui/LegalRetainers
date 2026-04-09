import { FileCheck, Users, Clock, CheckCircle, ExternalLink } from "lucide-react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { Breadcrumbs } from "@/components/Breadcrumbs";
const AboutPage = () => {
  return <div className="min-h-screen bg-background">
      <SEOHead title="About LegalRetainers | Signed Case Intake for Law Firms" description="Learn how LegalRetainers helps plaintiff law firms review signed case opportunities with documentation, intake context, and a faster path to evaluation." canonical="https://legalretainers.com/about" keywords="legal case provider, signed case intake, law firm case acquisition, pre-qualified clients, legal intake support" />
      <StructuredData type="organization" />
      <StructuredData type="aboutPage" />
      <StructuredData type="llmOptimizedPage" data={{
        pageName: "About LegalRetainers - Signed Cases for Law Firms",
        pageDescription: "Learn how LegalRetainers helps plaintiff law firms review signed case opportunities with documentation and a faster intake process.",
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
              "text": "We focus on signed case opportunities with intake details and supporting documentation so your firm can evaluate fit faster and spend less time chasing basic intake information."
            }
          },
          {
            "@type": "Question",
            "name": "What is your delivery timeframe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We move quickly once a fit is confirmed. Timing depends on the case type and records available, but our goal is to help your team review viable matters without unnecessary intake delay."
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
              "text": "We support plaintiff firms across personal injury, mass tort, institutional abuse, and related practice areas, with case availability depending on current intake and documentation."
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
                "text": "Review available case types and tell us which opportunities fit your practice.",
                "url": "https://legalretainers.com/cases"
              },
              {
                "@type": "HowToStep",
                "position": 2,
                "name": "Receive Signed Agreements",
                "text": "If the fit is right, receive the signed paperwork and supporting intake materials available for that matter.",
                "url": "https://legalretainers.com/about"
              },
              {
                "@type": "HowToStep",
                "position": 3,
                "name": "Begin Representation",
                "text": "Your team reviews the file, confirms fit, and decides whether to move forward.",
                "url": "https://legalretainers.com/about"
              }
            ]
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
          <div className="max-w-4xl">
            <h1 className="lr-heading-xl mb-4 text-white">About LegalRetainers</h1>
            <p className="lr-body-l text-white/90 max-w-3xl">
              LegalRetainers helps law firms cut down on intake friction by organizing signed case opportunities, supporting records, and fit-related details into a clearer handoff.
              The goal is simple: help your team decide faster whether a matter belongs in the practice.
            </p>
          </div>
        </div>
      </section>
      
      <main className="py-8 md:py-12">
        <div className="lr-width-container">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
            <div>
              <h2 className="lr-heading-l mb-6">Why Firms Work With LegalRetainers</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <FileCheck className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="lr-heading-s mb-2">Less Intake Guesswork</h3>
                    <p className="lr-body text-muted-foreground">A case opportunity is only useful if your team can evaluate it quickly. We aim to present signed matters with enough context and documentation to help you make a smart first decision.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="lr-heading-s mb-2">Better Practice Fit</h3>
                    <p className="lr-body text-muted-foreground">The goal is not to flood your intake team. It is to help you review matters that match your practice, your capacity, and your appetite for the work.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="lr-heading-s mb-2">Speed Matters, But Fit Matters More</h3>
                    <p className="lr-body text-muted-foreground">We move fast when the fit is clear, but not at the expense of clarity. The right case in the right hands beats a rushed handoff every time.</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Card className="border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="lr-heading-m">How the Process Works</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center lr-body-s font-medium flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="lr-heading-s">Start With Practice Fit</h4>
                      <p className="lr-body-s text-muted-foreground">
                        Tell us which case types, jurisdictions, and matter profiles make sense for your team.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center lr-body-s font-medium flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="lr-heading-s">Review the Intake Package</h4>
                      <p className="lr-body-s text-muted-foreground">
                        We share the signed paperwork and the supporting intake materials available for the matter so your team can evaluate it efficiently.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center lr-body-s font-medium flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="lr-heading-s">Decide With Confidence</h4>
                      <p className="lr-body-s text-muted-foreground">
                        Once your team confirms fit, you can decide whether to move forward without rebuilding the intake file from scratch.
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
