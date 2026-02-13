import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { StructuredData } from "@/components/StructuredData";
const NotFound = () => {
  const location = useLocation();
  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);
  return <div className="min-h-screen bg-background">
      <SEOHead 
        title="Page Not Found | LegalRetainers"
        description="The page you are looking for could not be found."
        noIndex={true}
      />
      <StructuredData type="webPage" data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Page Not Found",
        "url": typeof window !== 'undefined' ? window.location.href : "https://legalretainers.com"
      }} />
      <Header />
      <main className="py-16">
        <div className="lr-width-container text-center">
          <h1 className="lr-heading-xl mb-4">Page not found</h1>
          <p className="lr-body-l text-muted-foreground mb-8">
            The page you were looking for could not be found.
          </p>
          <div className="space-y-4">
            <Button asChild>
              <Link to="/">Return to home</Link>
            </Button>
            <div>
              <p className="lr-body-s text-muted-foreground">
                Or try one of these pages:
              </p>
              <div className="flex justify-center gap-4 mt-2">
                <Link to="/cases" className="lr-link lr-focus">Find cases</Link>
                <Link to="/request-clients" className="lr-link lr-focus">Request clients</Link>
                <Link to="/contact" className="lr-link lr-focus">Contact us</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default NotFound;