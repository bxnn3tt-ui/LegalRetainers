import { Card, CardContent } from '@/components/ui/card';

interface BlogSummaryCardProps {
  title: string;
  items: string[];
  className?: string;
}

export const BlogSummaryCard = ({ title, items, className }: BlogSummaryCardProps) => {
  return (
    <Card className={`my-8 ${className || ''}`}>
      <CardContent className="p-6">
        <h3 className="lr-heading-s mb-4">{title}</h3>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={index} className="lr-body flex gap-3">
              <span className="text-primary font-bold flex-shrink-0" aria-hidden="true">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
