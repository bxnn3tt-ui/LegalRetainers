import { useState, useEffect } from "react";
import { Shield, Clock, Users, Phone, Mail, Star, CheckCircle2, AlertTriangle, Scale, Heart, Briefcase } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { MassTortDropdown } from "@/components/mass-tort-dropdown";
import { Link, useNavigate } from "react-router-dom";
import heroConsultation from "@/assets/hero-consultation.jpg";
import justiceSymbol from "@/assets/justice-symbol.jpg";
import victoryCelebration from "@/assets/victory-celebration.jpg";
const Index = () => {
  // Force refresh to clear icon cache
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [selectedCase, setSelectedCase] = useState<string>("");
  const navigate = useNavigate();
  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && name) {
      try {
        const response = await fetch("/api/send-newsletter", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name,
            email
          })
        });
        if (response.ok) {
          setSubscribed(true);
          setEmail("");
          setName("");
        }
      } catch (error) {
        // Error handling without console logging
      }
    }
  };
  const handleCaseSelect = (caseSlug: string) => {
    setSelectedCase(caseSlug);
  };
  const handleStartClaim = () => {
    navigate("/request-clients");
  };
  return <div className="min-h-screen bg-background">
      <SEOHead title="Pre-Signed Legal Cases for Law Firms | LegalRetainers" description="Acquire pre-qualified, signed legal cases delivered within 24-48 hours. Complete documentation and exclusive representation rights included. Personal injury, mass torts, and more." keywords="signed legal cases, pre-qualified clients, case acquisition, personal injury cases, mass tort leads, exclusive law firm cases, 24-48 hour delivery" canonical="https://legalretainers.com" />
      <StructuredData type="organization" />
      <StructuredData type="professionalService" />
      <StructuredData type="localBusiness" />
      <StructuredData type="website" />
      <StructuredData type="siteNavigation" />
      <StructuredData type="homepage" />
      <StructuredData type="knowledgeGraph" />
      <StructuredData type="aggregateRating" />
      <StructuredData type="review" data={{
        authorName: "Michael Torres",
        authorTitle: "Managing Partner, Torres Law Group",
        reviewBody: "LegalRetainers has transformed our case acquisition. We receive pre-signed retainers within 24 hours, allowing us to focus on litigation instead of intake.",
        ratingValue: 5,
        datePublished: "2025-11-15"
      }} />
      <StructuredData type="review" data={{
        authorName: "Sarah Chen",
        authorTitle: "Senior Partner, Chen & Associates",
        reviewBody: "The quality of cases from LegalRetainers is exceptional. Every client comes with complete documentation and signed agreements. Our conversion rate has improved significantly.",
        ratingValue: 5,
        datePublished: "2025-12-02"
      }} />
      <StructuredData type="review" data={{
        authorName: "James Williams",
        authorTitle: "Founding Partner, Williams Legal",
        reviewBody: "Working with LegalRetainers has streamlined our entire intake process. The pre-qualified clients are exactly what we need for our personal injury practice.",
        ratingValue: 5,
        datePublished: "2026-01-08"
      }} />
      <StructuredData type="glossary" />
      <StructuredData type="llmOptimizedPage" data={{
        pageName: "LegalRetainers - Signed Cases on Demand for Law Firms",
        pageDescription: "Get signed cases delivered fast. Every client is pre-qualified, already signed, and ready to work. Skip intake—request exclusive cases today.",
        pageUrl: "https://legalretainers.com",
        pageType: "HomePage",
        additionalData: {
          keywords: ["signed legal cases", "pre-qualified clients", "law firm cases", "case acquisition"],
          mentions: ["Personal Injury", "Mass Tort", "Medical Malpractice", "Product Liability", "Employment Law"],
          lastReviewed: "2026-01-21"
        }
      }} />
      <Header />

      <main>
        {/* Hero Section - sized so "Find Your Practice Area" H2 is above fold on desktop */}
        <section className="bg-primary text-primary-foreground py-8 md:py-12 lg:min-h-[calc(100vh-200px)]">
          <div className="lr-width-container lg:h-full">
            <div className="grid lg:grid-cols-2 gap-8 2xl:gap-12 3xl:gap-16 items-center">
              <div className="space-y-4 md:space-y-8">
                <div>
                  <h1 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-[48px] lg:leading-[50px] 2xl:text-[56px] 2xl:leading-[60px] 3xl:text-[64px] 3xl:leading-[68px] lg:font-bold mb-6 text-white">Grow Your Firm With Cases on Demand</h1>
                  <p className="text-lg sm:lr-body-l 2xl:text-[22px] 2xl:leading-[32px] 3xl:text-[24px] 3xl:leading-[36px] text-white/90 mb-8 max-w-2xl 2xl:max-w-3xl">
                    Find your case type and we'll connect your firm with pre-qualified, e-signed clients. Each case is fully vetted for eligibility and delivered directly to your intake team — often within 24–48 hours.
                  </p>
                </div>

                {/* Mass Tort Selection */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold sm:text-3xl lg:text-[24px] lg:leading-[30px] 2xl:text-[28px] 2xl:leading-[36px] 3xl:text-[32px] 3xl:leading-[40px] text-white mb-4">Select Your Case Type:</h3>
                  <MassTortDropdown onSelect={handleCaseSelect} />
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={handleStartClaim} variant="outline-stable" className="font-medium text-lg">
                    Request Clients
                  </Button>
                  <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/10 lr-focus text-lg" asChild>
                    <Link to="/cases">Browse All Cases</Link>
                  </Button>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden">
                <img src={heroConsultation} alt="Attorney consulting with client about legal case, both reviewing documents at desk" className="w-full h-80 2xl:h-96 3xl:h-[450px] object-cover" width="800" height="600" loading="eager" />
                <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-sm backdrop-blur-sm rounded-lg p-6 shadow-lg" style={{
                backgroundColor: "hsla(51, 100%, 50%, 0.85)"
              }}>
                  <h3 className="lr-heading-s text-black mb-4 font-semibold">Why Choose Us</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-black/80">
                      <div className="flex-shrink-0 w-8 h-8 bg-black/10 rounded-full flex items-center justify-center">
                        <Shield className="h-4 w-4 text-black" />
                      </div>
                      <span className="lr-body-s">100% TCPA compliant</span>
                    </div>
                    <div className="flex items-center gap-3 text-black/80">
                      <div className="flex-shrink-0 w-8 h-8 bg-black/10 rounded-full flex items-center justify-center">
                        <Clock className="h-4 w-4 text-black" />
                      </div>
                      <span className="lr-body-s">Pre-screened by legal professionals</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Finder Section */}
        <section className="py-12 lg:pt-12">
          <div className="lr-width-container">
            <div className="mb-8 lg:mb-4">
              <h2 className="lr-heading-xl mb-4">Find Your Practice Area</h2>
              <p className="lr-body-l text-muted-foreground max-w-2xl">
                Browse our most common practice areas to find cases that match your situation and expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
              <Link to="/cases?category=personal-injury" className="block group">
                <Card className="text-center cursor-pointer h-full border-2 border-black shadow-none bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <CardHeader className="pb-2">
                    <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="lr-heading-s group-hover:text-primary transition-colors">Injury & Accidents</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="lr-body-s text-black/70 font-medium">
                      Car accidents, workplace injuries, slip & falls
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/cases?category=mass-tort" className="block group">
                <Card className="text-center cursor-pointer h-full border-2 border-black shadow-none bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <CardHeader className="pb-2">
                    <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="lr-heading-s group-hover:text-primary transition-colors">Mass Torts</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="lr-body-s text-black/70 font-medium">
                      Product liability, defective drugs, environmental contamination
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/cases?category=abuse" className="block group">
                <Card className="text-center cursor-pointer h-full border-2 border-black shadow-none bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <CardHeader className="pb-2">
                    <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="lr-heading-s group-hover:text-primary transition-colors">Institutional Abuse</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="lr-body-s text-black/70 font-medium">
                      Clergy abuse, institutional negligence, survivor claims
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/cases?category=employment" className="block group">
                <Card className="text-center cursor-pointer h-full border-2 border-black shadow-none bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <CardHeader className="pb-2">
                    <Briefcase className="h-12 w-12 text-primary mx-auto mb-4" />
                    <CardTitle className="lr-heading-s group-hover:text-primary transition-colors">Work & Benefits</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="lr-body-s text-black/70 font-medium">
                      Employment disputes, benefits denial, workplace exposure
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Legal Information Section */}
        <section className="py-16 bg-primary">
          <div className="lr-width-container">
            <h2 className="lr-heading-l text-center mb-12 text-white">Important Legal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <div className="bg-white p-4 sm:p-6 md:p-8 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                <div className="inline-block bg-[#FFD900] text-primary border border-black px-3 py-1 text-[10px] font-bold tracking-wider uppercase mb-4">Our Standards</div>
                <h3 className="lr-heading-m mb-4">Quality Assurance</h3>
                <ul className="space-y-3 lr-body">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    100% TCPA-compliant lead generation
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    Verified prospect information & jurisdiction
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    Secure, confidential delivery
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 sm:p-6 md:p-8 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                <div className="inline-block bg-black text-white px-3 py-1 text-[10px] font-bold tracking-wider uppercase mb-4">Legal Notice</div>
                <h3 className="lr-heading-m mb-4">Disclaimers</h3>
                <ul className="space-y-2 legal-text-mobile text-black/70 font-medium">
                  <li>• This website contains attorney advertising</li>
                  <li>• Information provided is not legal advice</li>
                  <li>• Prior results do not guarantee future outcomes</li>
                  <li>• Case quality may vary by individual circumstances</li>
                  <li>• Services provided to licensed attorneys only</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
      </main>

      <Footer />
    </div>;
};
export default Index;