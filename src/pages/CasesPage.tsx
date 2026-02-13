import { useEffect } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { CaseFinder } from "@/components/case-finder";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { cases } from "@/data/cases";

const CasesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const breadcrumbItems = [
    { label: "Cases", href: "/cases" }
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
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Browse Legal Cases | Personal Injury, Mass Torts & More | LegalRetainers"
        description="Browse available pre-signed legal cases across 18 practice areas. Personal injury, mass torts, institutional abuse, and consumer protection cases with 24-48 hour delivery."
        canonical="https://legalretainers.com/cases"
        keywords="legal cases, personal injury cases, mass tort cases, signed retainer cases, law firm case acquisition, pre-qualified clients"
      />
      <StructuredData type="legalService" />
      <StructuredData type="breadcrumbList" data={breadcrumbSchema} />
      <StructuredData type="llmOptimizedPage" data={{
        pageName: "Pre-Signed Legal Cases Marketplace",
        pageDescription: "Browse and acquire pre-signed legal cases across personal injury, mass torts, and institutional abuse. 24-48 hour delivery.",
        pageUrl: "https://legalretainers.com/cases",
        pageType: "CollectionPage",
        additionalData: {
          keywords: ["legal cases", "signed cases", "case acquisition", "law firm leads"],
          mentions: ["Personal Injury", "Mass Tort", "Medical Malpractice", "Product Liability", "Employment Law"]
        }
      }} />
      <StructuredData type="collectionPage" data={{
        name: "Legal Case Marketplace",
        description: "Browse signed legal cases across all practice areas. Each case includes a client who has already signed representation with your firm receiving exclusive rights.",
        url: "https://legalretainers.com/cases",
        items: cases.map(caseItem => ({
          name: caseItem.title,
          description: caseItem.summary,
          url: `/cases/${caseItem.slug}`
        }))
      }} />
      <StructuredData type="service" data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Available Legal Cases",
        "description": "Browse signed legal cases across all practice areas",
        "numberOfItems": cases.length,
        "itemListElement": cases.map((caseItem, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Product",
            "@id": `https://legalretainers.com/cases/${caseItem.slug}`,
            "name": caseItem.title,
            "description": caseItem.summary,
            "brand": {
              "@type": "Organization",
              "@id": "https://legalretainers.com/#organization"
            },
            "offers": {
              "@type": "AggregateOffer",
              "priceCurrency": "USD",
              "availability": caseItem.status === "available" || caseItem.status === "high-volume" 
                ? "https://schema.org/InStock" 
                : "https://schema.org/LimitedAvailability"
            }
          }
        }))
      }} />
      <Header />

      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="lr-width-container">
          <Breadcrumbs items={breadcrumbItems} variant="light" />
          <h1 className="lr-heading-xl mb-4 text-white">Pre-Signed Legal Cases</h1>
          <p className="lr-body-l text-white/90 max-w-3xl">
            Acquire clients who have already signed representation agreements with your firm. 
            Each case includes exclusive rights, complete documentation, and verified eligibility.
          </p>
        </div>
      </section>
      
      <main className="py-8 md:py-12">
        <div className="lr-width-container">
          <CaseFinder />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CasesPage;
