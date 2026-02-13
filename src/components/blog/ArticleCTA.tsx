import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArticleCTAProps {
  variant?: 'inline' | 'bottom';
}

export const ArticleCTA = ({ variant = 'inline' }: ArticleCTAProps) => {
  if (variant === 'inline') {
    return (
      <aside className="bg-primary text-white p-6 my-8" aria-label="Request cases call to action">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <p className="font-bold text-lg mb-1">Looking for pre-signed legal cases?</p>
            <p className="text-white/90 text-sm">Get exclusive, qualified cases delivered within 24-48 hours.</p>
          </div>
          <Button 
            asChild 
            variant="secondary" 
            className="bg-[#FFD900] text-primary hover:bg-[#FFD900]/90 font-semibold whitespace-nowrap"
          >
            <Link to="/request-clients">
              Request Cases <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </aside>
    );
  }

  return (
    <section className="bg-primary py-12 my-8 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8" aria-labelledby="cta-heading">
      <div className="max-w-2xl mx-auto text-center">
        <h2 id="cta-heading" className="lr-heading-l mb-4 text-white">Ready to Grow Your Caseload?</h2>
        <p className="lr-body-l text-white/90 mb-6">
          Join law firms across the country who trust LegalRetainers for pre-qualified, signed cases delivered fast.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-[#FFD900] text-primary hover:bg-[#FFD900]/90 font-semibold">
            <Link to="/request-clients">
              Request Cases <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white/10">
            <Link to="/contact">
              <Phone className="mr-2 h-4 w-4" /> Contact Us
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};