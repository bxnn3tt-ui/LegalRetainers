import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
  title?: string;
}

export const FAQAccordion = ({ faqs, title = "Frequently Asked Questions" }: FAQAccordionProps) => {
  return (
    <section className="my-12" id="faq-section">
      <h2 className="lr-heading-l mb-6" id="frequently-asked-questions">{title}</h2>
      
      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem 
            key={index} 
            value={`item-${index}`}
            className="border-2 border-border rounded-none px-6 bg-card"
          >
            <AccordionTrigger className="text-left font-semibold lr-body hover:text-primary focus:bg-transparent focus:ring-0 focus:ring-offset-0">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="lr-body text-muted-foreground pt-2">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
