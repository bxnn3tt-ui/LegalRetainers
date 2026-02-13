import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
export interface BreadcrumbItem {
  label: string;
  href: string;
}
interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  variant?: "default" | "light";
}
const truncateToWords = (text: string, maxWords: number): string => {
  const words = text.split(' ');
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(' ') + '...';
};

export const Breadcrumbs = ({
  items,
  variant = "default"
}: BreadcrumbsProps) => {
  const isLight = variant === "light";
  const textColor = isLight ? "text-white/80" : "text-muted-foreground";
  const linkColor = isLight ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground";
  const currentColor = isLight ? "text-white" : "text-foreground";
  
  return <nav aria-label="Breadcrumb" className="mb-6 text-sm leading-none">
      <span className={textColor}>
        <Link to="/" className={`${linkColor} transition-colors`}>Home</Link>
        <ChevronRight className="inline-block h-3 w-3 mx-1 align-middle" aria-hidden="true" />
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <span key={item.href}>
              {isLast ? (
                <>
                  <span className={`${currentColor} sm:hidden`} title={item.label}>
                    {truncateToWords(item.label, 4)}
                  </span>
                  <span className={`${currentColor} hidden sm:inline`} title={item.label}>
                    {item.label}
                  </span>
                </>
              ) : (
                <>
                  <Link to={item.href} className={`${linkColor} transition-colors`}>
                    {item.label}
                  </Link>
                  <ChevronRight className="inline-block h-3 w-3 mx-1 align-middle" aria-hidden="true" />
                </>
              )}
            </span>
          );
        })}
      </span>
    </nav>;
};