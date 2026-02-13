import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { ChevronDown } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headingElements = doc.querySelectorAll('h2');
    
    const items: TOCItem[] = Array.from(headingElements).map((heading, index) => {
      const id = heading.id || `heading-${index}`;
      const level = parseInt(heading.tagName.charAt(1));
      return {
        id,
        text: heading.textContent || '',
        level
      };
    });
    
    setHeadings(items);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    const headingElements = document.querySelectorAll('h2[id]');
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const previousElement = element.previousElementSibling;
      const targetElement = previousElement || element;
      
      const offset = isMobile ? 150 : 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      element.setAttribute('tabindex', '-1');
      element.focus({ preventScroll: true });
    }
    setIsOpen(false);
  };

  if (headings.length === 0) return null;

  return (
    <div className="mb-8 border-y border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="toc-content"
        aria-label="Toggle table of contents"
        className="w-full py-4 text-left flex items-center justify-between group"
      >
        <span className="text-sm font-bold text-foreground uppercase tracking-wide">
          In this article
        </span>
        <ChevronDown 
          className={cn(
            "h-4 w-4 text-foreground transition-transform duration-200",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      
      {isOpen && (
        <nav 
          id="toc-content"
          aria-label="Article table of contents"
          role="navigation"
          className="pb-4"
        >
          <ul role="list" className="space-y-2">
            {headings.map((heading) => (
              <li key={heading.id}>
                <button
                  onClick={() => scrollToHeading(heading.id)}
                  aria-current={activeId === heading.id ? "location" : undefined}
                  aria-label={`Jump to section: ${heading.text}`}
                  className={cn(
                    "text-left text-sm transition-colors",
                    activeId === heading.id 
                      ? "text-primary font-medium" 
                      : "text-foreground hover:text-primary"
                  )}
                >
                  {heading.text}
                  {activeId === heading.id && (
                    <span className="sr-only"> (current section)</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};