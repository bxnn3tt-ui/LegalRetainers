import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CTAInlineProps {
  title?: string;
  description?: string;
  buttonText?: string;
  phone?: string;
  variant?: 'full' | 'compact' | 'sidebar';
}

export const CTAInline = ({
  title = "Get Your Free Case Review",
  description = "No fees unless we win. Speak with an experienced attorney today.",
  buttonText = "GET FREE CONSULTATION",
  phone = "305-900-5954",
  variant = 'full'
}: CTAInlineProps) => {
  if (variant === 'sidebar') {
    return (
      <Card className="p-6 bg-[hsl(var(--warning))] border-none">
        <div className="text-center space-y-4">
          <h3 className="font-bold text-xl">Injured?</h3>
          <p className="text-sm">Get your free case review now. No fees unless we win.</p>
          <Button 
            size="lg" 
            className="w-full bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-white font-bold"
          >
            {buttonText}
          </Button>
          <div className="flex items-center justify-center gap-2 text-sm font-semibold pt-2">
            <Phone className="h-4 w-4" />
            <a href={`tel:${phone.replace(/\D/g, '')}`} className="hover:underline">
              {phone}
            </a>
          </div>
        </div>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <Card className="p-6 bg-[hsl(var(--warning))] border-none my-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex-1 text-center md:text-left">
            <h3 className="font-bold text-lg mb-1">{title}</h3>
            <p className="text-sm">{description}</p>
          </div>
          <Button 
            size="lg" 
            className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-white font-bold whitespace-nowrap"
          >
            {buttonText}
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 bg-[hsl(var(--warning))] border-none my-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h3 className="font-bold text-2xl">{title}</h3>
        <p className="text-lg">{description}</p>
        <Button 
          size="lg" 
          className="bg-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/90 text-white font-bold text-lg px-8 py-6 h-auto"
        >
          {buttonText}
        </Button>
        <div className="flex items-center justify-center gap-2 text-base font-semibold pt-2">
          <Phone className="h-5 w-5" />
          <a href={`tel:${phone.replace(/\D/g, '')}`} className="hover:underline">
            {phone}
          </a>
        </div>
        <p className="text-sm text-muted-foreground">Available 24/7 • Free Consultation • No Fees Unless We Win</p>
      </div>
    </Card>
  );
};
