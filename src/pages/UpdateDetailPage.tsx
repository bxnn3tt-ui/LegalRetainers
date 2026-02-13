import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { updates, practiceAreas } from "@/data/cases";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import NotFound from "./NotFound";
const UpdateDetailPage = () => {
  const {
    id
  } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const update = updates.find(u => u.id === id);
  if (!update) {
    return <NotFound />;
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const categoryName = practiceAreas.find(a => a.id === update.category)?.name || update.category;
  
  const breadcrumbItems = [
    { label: "Legal Updates", href: "/updates" },
    { label: update.title, href: `/updates/${update.id}` }
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
        "name": "Legal Updates",
        "@id": "https://legalretainers.com/updates"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": update.title,
        "@id": `https://legalretainers.com/updates/${update.id}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `https://legalretainers.com/updates/${update.id}`,
    "headline": update.title,
    "description": update.summary,
    "datePublished": update.date,
    "dateModified": update.date,
    "author": {
      "@type": "Organization",
      "@id": "https://legalretainers.com/#organization",
      "name": "LegalRetainers"
    },
    "publisher": {
      "@type": "Organization",
      "@id": "https://legalretainers.com/#organization",
      "name": "LegalRetainers",
      "logo": {
        "@type": "ImageObject",
        "url": "https://legalretainers.com/logo.png"
      }
    },
    "articleSection": categoryName
  };

  const faqSchema = update.id === "roblox-sexual-abuse-grooming-lawsuit-2025" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the Roblox lawsuit about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Roblox lawsuits allege that Roblox Corporation knowingly created and maintained an unsafe platform that enables child predators to groom, exploit, and sexually abuse minors. Families and state attorneys general are pursuing legal action for negligence, product liability, consumer protection violations, and failure to implement adequate safety measures despite knowing the risks."
        }
      },
      {
        "@type": "Question",
        "name": "How many children have been harmed on Roblox?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Roblox reported 13,316 incidents of child exploitation to the National Center for Missing and Exploited Children (NCMEC) in 2023 alone, a dramatic increase from 3,000 in 2022. At least 24 predators have been arrested since 2018 for abducting or abusing victims they met on Roblox."
        }
      },
      {
        "@type": "Question",
        "name": "Can I sue Roblox if my child was groomed on the platform?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. If your child was groomed, sexually exploited, or abused by a predator who made initial contact through Roblox, you may be able to file a lawsuit against the company for negligence and failure to protect your child. Many families across all 50 states are currently pursuing legal claims."
        }
      },
      {
        "@type": "Question",
        "name": "What compensation can victims receive in a Roblox lawsuit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Compensation varies based on the severity of harm but typically ranges from $200,000 to $5 million or more. Damages can include medical expenses, therapy costs, pain and suffering, mental anguish, loss of enjoyment of life, and in cases of gross negligence, punitive damages."
        }
      },
      {
        "@type": "Question",
        "name": "How do predators groom children on Roblox?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Predators follow a predictable pattern: Initial contact on Roblox, building trust through conversation and virtual gifts, moving communication to Discord or Snapchat, escalating to sexual content and requests for explicit images, and in severe cases, arranging in-person meetings."
        }
      },
      {
        "@type": "Question",
        "name": "How long do I have to file a Roblox lawsuit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Statutes of limitations vary significantly by state. Many states have extended deadlines for child sexual abuse claims—some allowing victims to file until age 40 or beyond. Consult an attorney immediately to determine your specific deadline."
        }
      },
      {
        "@type": "Question",
        "name": "What evidence do I need for a Roblox lawsuit?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Strong cases include screenshots of Roblox conversations, messages from secondary platforms like Discord, account information, reports made to Roblox or police, medical/therapy records documenting harm, and witness statements. Preserve all evidence immediately and do not delete accounts or messages."
        }
      },
      {
        "@type": "Question",
        "name": "Does Roblox have adequate safety features?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "While Roblox has implemented over 100 safety features in 2024, critics argue these measures came too late and are insufficiently enforced. The dramatic increase in reported exploitation incidents from 3,000 in 2022 to 13,316 in 2023 suggests safety measures remain inadequate."
        }
      },
      {
        "@type": "Question",
        "name": "What age groups are most at risk on Roblox?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Children ages 7-15 are most at risk, with the highest concentration of victims in the 9-12 age range. Approximately 40% of Roblox's 380+ million monthly users are under age 13, making them particularly vulnerable to grooming tactics."
        }
      },
      {
        "@type": "Question",
        "name": "How can parents protect their children on Roblox?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Enable maximum parental controls, disable chat or limit to friends-only, monitor friend lists, require gaming in shared family spaces, regularly review activity logs, teach children about grooming tactics, and watch for warning signs like secretiveness or personality changes."
        }
      }
    ]
  } : null;

  return <div className="min-h-screen bg-background">
      <SEOHead 
        title={`${update.title} | LegalRetainers Legal Updates`} 
        description={update.summary} 
        canonical={`https://legalretainers.com/updates/${update.id}`} 
        keywords={`${update.category}, legal update, ${update.title}`}
        ogType="article"
        publishedTime={update.date}
        modifiedTime={update.date}
        author="LegalRetainers"
        section={categoryName}
      />
      <StructuredData type="breadcrumbList" data={breadcrumbSchema} />
      <StructuredData type="article" data={articleSchema} />
      {faqSchema && <StructuredData type="faqPage" data={faqSchema} />}
      <Header />
      
      <main className="py-8">
        <div className="lr-width-container">
          <Breadcrumbs items={breadcrumbItems} />

          <article>
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Badge variant="secondary">{categoryName}</Badge>
                <div className="flex items-center gap-1 lr-body-s text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {formatDate(update.date)}
                </div>
              </div>
              <h1 className="lr-heading-xl mb-4">{update.title}</h1>
              <p className="lr-body-l text-muted-foreground">
                {update.summary}
              </p>
            </header>

            <Alert className="mb-8">
              <AlertDescription className="lr-body">
                <strong>Disclaimer:</strong> The information provided here is for educational purposes only 
                and does not constitute legal advice. Consult with a qualified attorney for advice 
                specific to your situation.
              </AlertDescription>
            </Alert>

            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: update.content }}>
            </div>

            {update.caseSlug && <div className="mt-12 p-6 bg-muted/50 rounded-none">
                <h2 className="lr-heading-m mb-4">Related Case</h2>
                <p className="lr-body mb-4">
                  Learn more about the case related to this update.
                </p>
                <Link to={`/cases/${update.caseSlug}`}>
                  <Button className="lr-focus">View Case Details</Button>
                </Link>
              </div>}

            <div className="mt-12 p-6 bg-primary/5 border-l-4 border-primary">
              <h2 className="lr-heading-m mb-4">Have Questions About This Update?</h2>
              <p className="lr-body mb-4">
                Our team is here to help you understand how this legal development might affect you.
              </p>
              <Link to="/contact">
                <Button className="lr-focus">Contact Us</Button>
              </Link>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default UpdateDetailPage;