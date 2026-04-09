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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      return;
    }
    if (name) {
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
      <StructuredData type="glossary" />
      <StructuredData type="llmOptimizedPage" data={{
        pageName: "LegalRetainers - Signed Cases on Demand for Law Firms",
        pageDescription: "LegalRetainers helps plaintiff law firms review signed case opportunities with supporting intake details and clear next steps.",
        pageUrl: "https://legalretainers.com",
        pageType: "HomePage",
        additionalData: {
          keywords: ["signed legal cases", "pre-qualified clients", "law firm cases", "case acquisition"],
          mentions: ["Motor Vehicle Accidents", "SSDI and SSI Disability Claims", "Slip and Fall Cases", "Dog Bite and Animal Attack Cases"],
          lastReviewed: "2026-04-09"
        }
      }} />
      <Header />

      <main>
        <div className="lg:grid lg:min-h-[calc(100vh-82px)] lg:grid-rows-[minmax(0,1fr)_auto]">
          {/* Hero Section - desktop keeps a stable first-screen composition without forcing the content into awkward vertical centering */}
          <section className="bg-primary text-primary-foreground py-8 md:py-12 lg:py-14">
            <div className="lr-width-container lg:flex lg:h-full lg:items-start">
              <div className="grid lg:grid-cols-2 gap-8 xl:gap-10 2xl:gap-12 3xl:gap-16 items-center w-full">
              <div className="space-y-4 md:space-y-8 lg:space-y-6">
                <div>
                  <h1 className="text-5xl font-bold leading-tight sm:text-6xl lg:text-[48px] lg:leading-[50px] 2xl:text-[56px] 2xl:leading-[60px] 3xl:text-[64px] 3xl:leading-[68px] lg:font-bold mb-6 text-white">Grow Your Firm With Cases on Demand</h1>
                  <p className="text-lg sm:lr-body-l 2xl:text-[22px] 2xl:leading-[32px] 3xl:text-[24px] 3xl:leading-[36px] text-white/90 mb-6 max-w-2xl 2xl:max-w-3xl">
                    Choose the case types your firm wants to review. We help you start with signed opportunities, cleaner intake context, and a simpler handoff to your team.
                  </p>
                </div>

                {/* Mass Tort Selection */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold sm:text-3xl lg:text-[24px] lg:leading-[30px] 2xl:text-[28px] 2xl:leading-[36px] 3xl:text-[32px] 3xl:leading-[40px] text-white mb-4">Start With Practice Fit</h3>
                  <MassTortDropdown onSelect={handleCaseSelect} />
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={handleStartClaim} variant="outline-stable" className="font-medium text-lg">
                    Check Availability
                  </Button>
                  <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/10 lr-focus text-lg" asChild>
                    <Link to="/cases">Browse All Cases</Link>
                  </Button>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden">
                <img src={heroConsultation} alt="Attorney consulting with client about legal case, both reviewing documents at desk" className="w-full h-80 lg:h-[360px] 2xl:h-96 3xl:h-[430px] object-cover" width="800" height="600" loading="eager" />
              <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-sm backdrop-blur-sm rounded-lg p-6 shadow-lg" style={{
                backgroundColor: "hsla(51, 100%, 50%, 0.85)"
              }}>
                  <h3 className="lr-heading-s text-black mb-4 font-semibold">What Firms Want</h3>
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

          <section className="hidden bg-background lg:block lg:pb-0 lg:pt-10">
            <div className="lr-width-container">
              <h2 className="lr-heading-xl mb-0">Find Your Practice Area</h2>
              <p className="lr-body-l text-muted-foreground max-w-2xl mt-[8px]">
                Start with the matters that fit your practice, your capacity, and the work your team wants to review.
              </p>
            </div>
          </section>
        </div>

        {/* Case Finder Section */}
        <section className="py-10 lg:pt-6 lg:pb-10">
          <div className="lr-width-container">
            <div className="mb-8 lg:hidden">
              <h2 className="lr-heading-xl mb-4 lg:hidden">Find Your Practice Area</h2>
              <p className="lr-body-l text-muted-foreground max-w-2xl">
                Start with the matters that fit your practice, your capacity, and the work your team wants to review.
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
            <h2 className="lr-heading-l text-center mb-12 text-white">What You Can Expect</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
              <div className="bg-white p-4 sm:p-6 md:p-8 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                <div className="inline-block bg-[#FFD900] text-primary border border-black px-3 py-1 text-[10px] font-bold tracking-wider uppercase mb-4">Review Standards</div>
                <h3 className="lr-heading-m mb-4">A Better First Review</h3>
                <ul className="space-y-3 lr-body">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    Signed opportunities organized for faster review
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    Intake details and documentation available for the matter
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    Clearer handoff once your team confirms fit
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 sm:p-6 md:p-8 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                <div className="inline-block bg-black text-white px-3 py-1 text-[10px] font-bold tracking-wider uppercase mb-4">Important Notice</div>
                <h3 className="lr-heading-m mb-4">Professional Use Only</h3>
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
