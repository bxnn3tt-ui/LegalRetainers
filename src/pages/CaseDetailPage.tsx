import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Clock, FileText, Calendar, AlertTriangle } from "lucide-react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cases, practiceAreas, type CaseType } from "@/data/cases";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const CaseDetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const { slug } = useParams<{ slug: string }>();
  const caseItem = cases.find((c: CaseType) => c.slug === slug);
  
  const getPracticeAreaName = (practiceAreaId: string) => {
    const area = practiceAreas.find(pa => pa.id === practiceAreaId);
    return area ? area.name : practiceAreaId;
  };

  if (!caseItem) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="py-8">
          <div className="lr-width-container text-center">
            <h1 className="lr-heading-l mb-4">Case Not Found</h1>
            <p className="lr-body mb-6">The case type you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/cases">Browse All Cases</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const statusColors = {
    available: "text-white border-0",
    "high-volume": "text-white border-0",
    urgent: "text-white border-0",
    limited: "text-white border-0"
  };
  const statusBgColors: Record<string, string> = {
    available: "#00703c",
    "high-volume": "#f47738",
    urgent: "#d4351c",
    limited: "#d4351c"
  };

  const statusLabels = {
    available: "Available",
    "high-volume": "High Volume",
    urgent: "Urgent",
    limited: "Limited"
  };

  // Shorten case title to max 3 words for breadcrumb
  const shortenTitle = (title: string) => {
    const words = title.split(' ');
    if (words.length <= 3) return title;
    return words.slice(0, 3).join(' ');
  };

  // Manual breadcrumb overrides for cases with messy shortened titles
  const breadcrumbOverrides: Record<string, string> = {
    "dog-bites-animal-attacks": "Dog Bites",
    "youth-organization-sports-abuse": "Youth Sports Abuse",
    "correctional-facility-abuse": "Jail Abuse",
    "sex-trafficking-exploitation": "Sex Trafficking"
  };

  const breadcrumbItems = [
    { label: "Cases", href: "/cases" },
    { label: breadcrumbOverrides[caseItem.slug] || shortenTitle(caseItem.title), href: `/cases/${caseItem.slug}` }
  ];

  const breadcrumbSchema = {
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
        "name": "Cases",
        "@id": "https://legalretainers.com/cases"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": shortenTitle(caseItem.title),
        "@id": `https://legalretainers.com/cases/${caseItem.slug}`
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://legalretainers.com/cases/${caseItem.slug}`,
    "name": caseItem.title,
    "description": caseItem.description,
    "provider": {
      "@type": "Organization",
      "@id": "https://legalretainers.com/#organization",
      "name": "LegalRetainers"
    },
    "areaServed": caseItem.geography.map(state => ({
      "@type": "State",
      "name": state
    })),
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": caseItem.purchasePrice > 0 ? caseItem.purchasePrice.toString() : undefined,
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "USD",
        "valueAddedTaxIncluded": false
      },
      "availability": caseItem.status === "available" || caseItem.status === "high-volume" ? "https://schema.org/InStock" : "https://schema.org/LimitedAvailability",
      "itemOffered": {
        "@type": "Service",
        "name": caseItem.title,
        "description": caseItem.summary
      }
    },
    "availableChannel": {
      "@type": "ServiceChannel",
      "serviceUrl": "https://legalretainers.com/request-clients",
      "servicePhone": "+1-305-900-5954"
    }
  };

  // Generate Event schema for deadline-driven cases (mass torts with SOL deadlines)
  const eventSchema = caseItem.status === 'urgent' ? {
    "@context": "https://schema.org",
    "@type": "Event",
    "@id": `https://legalretainers.com/events/${caseItem.slug}-deadline`,
    "name": `${caseItem.title} - Filing Deadline Alert`,
    "description": `Urgent: Statute of limitations deadline approaching for ${caseItem.title}. Limited time to acquire signed cases.`,
    "startDate": "2026-03-31",
    "eventStatus": "https://schema.org/EventScheduled",
    "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
    "organizer": {
      "@type": "Organization",
      "@id": "https://legalretainers.com/#organization"
    },
    "location": {
      "@type": "VirtualLocation",
      "url": `https://legalretainers.com/cases/${caseItem.slug}`
    },
    "about": {
      "@type": "Thing",
      "name": "Legal Filing Deadline"
    }
  } : null;

  // Generate Product schema for case (enables product rich results)
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://legalretainers.com/cases/${caseItem.slug}#product`,
    "name": caseItem.title,
    "description": caseItem.summary,
    "url": `https://legalretainers.com/cases/${caseItem.slug}`,
    "category": getPracticeAreaName(caseItem.practiceArea),
    "brand": {
      "@type": "Organization",
      "@id": "https://legalretainers.com/#organization"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": "500",
      "highPrice": "5000",
      "priceValidUntil": "2026-12-31",
      "availability": caseItem.status === 'available' || caseItem.status === 'high-volume' 
        ? "https://schema.org/InStock" 
        : "https://schema.org/LimitedAvailability",
      "seller": {
        "@type": "Organization",
        "@id": "https://legalretainers.com/#organization"
      }
    },
    "areaServed": caseItem.geography.map(state => ({
      "@type": "State",
      "name": state
    }))
  };

  // Generate FAQ schema from eligibility points
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What are the eligibility requirements for ${caseItem.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": caseItem.eligibilityPoints.join('; ')
        }
      },
      {
        "@type": "Question",
        "name": `What documents are needed for ${caseItem.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": caseItem.documents.join('; ')
        }
      },
      {
        "@type": "Question",
        "name": `What is the case value range for ${caseItem.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The typical case value range is ${caseItem.caseValue}`
        }
      },
      {
        "@type": "Question",
        "name": `Which states are covered for ${caseItem.title}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Geographic coverage includes: ${caseItem.geography.join(', ')}`
        }
      }
    ]
  };

  return (
      <div className="bg-background">
      <SEOHead 
        title={`${caseItem.title} | LegalRetainers Case Marketplace`}
        description={caseItem.summary}
        keywords={`${caseItem.title}, ${getPracticeAreaName(caseItem.practiceArea)}, legal leads, law firm leads`}
        canonical={`https://legalretainers.com/cases/${caseItem.slug}`}
      />
      <StructuredData type="breadcrumbList" data={breadcrumbSchema} />
      <StructuredData type="service" data={serviceSchema} />
      <StructuredData type="product" data={productSchema} />
      <StructuredData type="faqPage" data={faqSchema} />
      {eventSchema && <StructuredData type="event" data={eventSchema} />}
      <Header />
      
      <main className="pt-8">
        <div className="lr-width-container pb-8">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-4">
            <div className="lg:col-span-2">
              {/* Hero Section */}
              <div className="mb-8">
          <div className="flex flex-wrap items-start gap-4 mb-4">
            <h1 className="lr-heading-xl flex-1 min-w-0 text-balance">{caseItem.title}</h1>
            <Badge className={`${statusColors[caseItem.status]} ml-2 sm:ml-0 font-bold text-[10px] tracking-wider`} style={{ backgroundColor: statusBgColors[caseItem.status] }}>
              {statusLabels[caseItem.status].toUpperCase()}
            </Badge>
          </div>
                <p className="lr-body-l text-muted-foreground">{caseItem.summary}</p>
              </div>

              {/* Quick Facts */}
              <Card className="mb-8 border-2 border-black">
                <CardHeader className="border-b-2 border-black">
                  <CardTitle className="lr-heading-m">Quick Facts</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <dt className="lr-body font-bold text-foreground">Practice Area</dt>
                      <dd className="lr-body text-black/70">{getPracticeAreaName(caseItem.practiceArea)}</dd>
                    </div>
                    <div>
                      <dt className="lr-body font-bold text-foreground">Status</dt>
                      <dd className="lr-body text-black/70">{statusLabels[caseItem.status]}</dd>
                    </div>
                    <div>
                      <dt className="lr-body font-bold text-foreground">Case Value Range</dt>
                      <dd className="lr-body text-black/70">{caseItem.caseValue}</dd>
                    </div>
                    <div>
                      <dt className="lr-body font-bold text-foreground">Geographic Coverage</dt>
                      <dd className="lr-body text-black/70">{caseItem.geography.join(", ")}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>

              {/* Detailed Information */}
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem value="eligibility" className="border-2 border-black rounded-none bg-white">
                  <AccordionTrigger className="lr-heading-s px-4 py-3 text-foreground font-bold hover:no-underline focus:bg-transparent focus:ring-0 focus:ring-offset-0">
                    Case Overview
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <p className="lr-body mb-4">{caseItem.description}</p>
                    <h4 className="lr-heading-s mb-3">Potential clients typically have:</h4>
                    <ul className="list-disc list-inside space-y-2 lr-body">
                      {caseItem.eligibilityPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="documents" className="border-2 border-black rounded-none bg-white">
                  <AccordionTrigger className="lr-heading-s px-4 py-3 text-foreground font-bold hover:no-underline focus:bg-transparent focus:ring-0 focus:ring-offset-0">
                    Client Documentation
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <p className="lr-body mb-4">
                      Clients for these cases typically possess the following documentation. 
                      Having these documents strengthens case viability and speeds up intake:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {caseItem.documents.map((doc, index) => (
                        <li key={index} className="flex items-center gap-2 lr-body">
                          <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="deadlines" className="border-2 border-black rounded-none bg-white">
                  <AccordionTrigger className="lr-heading-s px-4 py-3 text-foreground font-bold hover:no-underline focus:bg-transparent focus:ring-0 focus:ring-offset-0">
                    Case Timing & Geography
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <Alert className="mb-4">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Statute of limitations varies by jurisdiction. Time-sensitive opportunities require immediate action.
                      </AlertDescription>
                    </Alert>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h5 className="lr-body font-medium">Geographic Coverage</h5>
                          <p className="lr-body-s text-muted-foreground">{caseItem.geography.join(", ")}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <h5 className="lr-body font-medium">Priority Level</h5>
                          <p className="lr-body-s text-muted-foreground capitalize">{caseItem.priority}</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="next-steps" className="border-2 border-black rounded-none bg-white">
                  <AccordionTrigger className="lr-heading-s px-4 py-3 text-foreground font-bold hover:no-underline focus:bg-transparent focus:ring-0 focus:ring-offset-0">
                    Client Delivery Process
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4">
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center lr-body-s font-medium">
                          1
                        </div>
                        <div>
                          <h5 className="lr-body font-medium">Request Cases</h5>
                          <p className="lr-body-s text-muted-foreground">
                            Select case types for your practice areas.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center lr-body-s font-medium">
                          2
                        </div>
                        <div>
                          <h5 className="lr-body font-medium">Verification</h5>
                          <p className="lr-body-s text-muted-foreground">
                            We verify signed representation agreements and case eligibility.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center lr-body-s font-medium">
                          3
                        </div>
                        <div>
                          <h5 className="lr-body font-medium">Delivery</h5>
                          <p className="lr-body-s text-muted-foreground">
                            Complete case files with executed agreements delivered within 24-48 hours.
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {caseItem.recentUpdate && (
                  <AccordionItem value="updates" className="border-2 border-black rounded-none bg-white">
                    <AccordionTrigger className="lr-heading-s px-4 py-3 text-foreground font-bold hover:no-underline focus:bg-transparent focus:ring-0 focus:ring-offset-0">
                      Recent Updates
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4">
                      <p className="lr-body">{caseItem.recentUpdate}</p>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-8 space-y-4 lg:space-y-6">
                <Card className="border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <CardHeader className="border-b-2 border-black">
                    <CardTitle className="lr-heading-s">Request Signed Cases</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-6">
                     <div className="space-y-2">
                       <div className="flex justify-between lr-body-s">
                         <span className="font-bold">Value Range:</span>
                         <span className="font-medium">{caseItem.caseValue}</span>
                       </div>
                       <div className="flex justify-between lr-body-s">
                         <span className="font-bold">Priority:</span>
                         <span className="font-medium capitalize">{caseItem.priority}</span>
                       </div>
                     </div>
                    <Button variant="brutalist" size="lg" className="w-full" asChild>
                      <Link to={`/request-clients?case=${caseItem.slug}`}>
                        Request Clients
                      </Link>
                    </Button>
                    <div className="text-center lr-body-s text-black/70 font-medium">
                      Volume discounts available
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-black">
                  <CardHeader className="border-b-2 border-black">
                    <CardTitle className="lr-heading-s">Need Help?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 pt-6">
                     <div className="lr-body-s">
                       <span className="font-bold">Call us:</span><br />
                       305-900-5954
                     </div>
                     <div className="lr-body-s">
                       <span className="font-bold">Email:</span><br />
                       help@legalretainers.com
                     </div>
                     <p className="lr-body-s text-black/70 font-medium">
                       All consultations are confidential. Dedicated account managers available 24/7.
                     </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        <RelatedCases currentCase={caseItem} />
      </main>
      
      <Footer />
    </div>
  );
};

const RelatedCases = ({ currentCase }: { currentCase: CaseType }) => {
  const relatedCases = cases
    .filter(c => c.slug !== currentCase.slug)
    .filter(c => c.practiceArea === currentCase.practiceArea)
    .slice(0, 3);

  const otherCases = cases
    .filter(c => c.slug !== currentCase.slug && c.practiceArea !== currentCase.practiceArea)
    .slice(0, Math.max(0, 3 - relatedCases.length));

  const displayCases = [...relatedCases, ...otherCases].slice(0, 3);

  if (displayCases.length === 0) return null;

  const statusColors: Record<string, string> = {
    available: "text-white border-0",
    "high-volume": "text-white border-0",
    urgent: "text-white border-0",
    limited: "text-white border-0"
  };
  const statusBgColors: Record<string, string> = {
    available: "#00703c",
    "high-volume": "#f47738",
    urgent: "#d4351c",
    limited: "#d4351c"
  };

  const statusLabels: Record<string, string> = {
    available: "Available",
    "high-volume": "High Volume",
    urgent: "Urgent",
    limited: "Limited"
  };

  return (
    <section className="bg-primary py-12 mt-8">
      <div className="lr-width-container">
        <h2 className="lr-heading-l mb-6 text-white">Related Cases</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayCases.map(relatedCase => (
            <Link key={relatedCase.slug} to={`/cases/${relatedCase.slug}`} className="block group">
              <Card className="h-full bg-white border-2 border-black transition-all duration-200 hover:-translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <Badge className={`${statusColors[relatedCase.status]} font-bold text-[10px] tracking-wider`} style={{ backgroundColor: statusBgColors[relatedCase.status] }}>
                      {statusLabels[relatedCase.status].toUpperCase()}
                    </Badge>
                  </div>
                  <CardTitle className="lr-heading-s text-black group-hover:text-primary transition-colors">
                    {relatedCase.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="lr-body-s text-black/70 font-medium mb-4 line-clamp-2">
                    {relatedCase.summary}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold">Value:</span>
                    <span className="font-medium">{relatedCase.caseValue}</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button variant="brutalist-outline" className="bg-white" asChild>
            <Link to="/cases">View All Cases</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseDetailPage;