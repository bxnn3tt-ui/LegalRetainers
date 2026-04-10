import { useEffect } from "react";
import { Shield, Clock, Users, CheckCircle2, Heart, Briefcase } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { MassTortDropdown } from "@/components/mass-tort-dropdown";
import { Link, useNavigate } from "react-router-dom";

const heroConsultation = "/hero-consultation.jpg";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();

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
        <div className="lg:grid lg:min-h-[calc(100dvh-82px)] lg:grid-rows-[minmax(0,1fr)_auto]">
          <section className="bg-primary text-primary-foreground py-8 md:py-12 lg:py-12">
            <div className="lr-width-container lg:flex lg:h-full lg:items-center">
              <div className="grid w-full items-center gap-8 lg:grid-cols-2 xl:gap-12 2xl:gap-16">
                <div className="max-w-[38rem] space-y-4 md:space-y-8 lg:space-y-6">
                  <div>
                    <h1 className="mb-6 text-[clamp(3rem,4.4vw,4.6rem)] font-bold leading-[0.98] text-white">
                      Grow Your Firm With Cases on Demand
                    </h1>
                    <p className="mb-6 max-w-2xl text-[1.25rem] leading-7 text-white/90 sm:text-[1.375rem] sm:leading-8 lg:max-w-[31rem] xl:max-w-[32rem]">
                      Find your case type and we'll connect your firm with pre-qualified clients. Each case is vetted for eligibility and delivered directly to your intake team - often within 24-48 hours.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="mb-4 text-2xl font-bold text-white sm:text-3xl lg:text-[24px] lg:leading-[30px] xl:text-[28px] xl:leading-[34px]">
                      Start With Practice Fit
                    </h3>
                    <MassTortDropdown />
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <Button size="lg" onClick={handleStartClaim} variant="outline-stable" className="text-lg font-medium">
                      Check Availability
                    </Button>
                    <Button size="lg" variant="ghost" className="lr-focus border-white text-lg text-white hover:bg-white/10" asChild>
                      <Link to="/cases">Browse All Cases</Link>
                    </Button>
                  </div>
                </div>

                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={heroConsultation}
                    alt="Attorney consulting with client about legal case, both reviewing documents at desk"
                    className="w-full h-80 lg:h-[360px] 2xl:h-96 3xl:h-[430px] object-cover"
                    width="800"
                    height="600"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div
                    className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-sm backdrop-blur-sm rounded-lg p-6 shadow-lg"
                    style={{ backgroundColor: "hsla(51, 100%, 50%, 0.85)" }}
                  >
                    <h3 className="lr-heading-s text-black mb-4 font-semibold">Why Firms Choose Us</h3>
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

          <section className="hidden bg-background lg:block lg:pt-10 lg:pb-2">
            <div className="lr-width-container">
              <h2 className="lr-heading-xl mb-0">Find Your Practice Area</h2>
            </div>
          </section>
        </div>

        <section className="py-10 lg:pt-0 lg:pb-10">
          <div className="lr-width-container">
            <div className="mb-8">
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
